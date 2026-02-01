// src/services/SyncService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../database/db';
import { CONFIG } from '../constants/Config';

/**
 * Helper xử lý chuỗi SQL an toàn, tránh lỗi khi dữ liệu chứa dấu nháy đơn
 */
const esc = (t) => {
  if (t === null || t === undefined) return 'NULL';
  return `'${t.toString().replace(/'/g, "''")}'`;
};

/**
 * Hàm kiểm tra phiên bản và thực hiện cập nhật Database
 */
export const checkAndUpdateDatabase = async () => {
  try {
    console.log("🔄 [SyncService] Đang kiểm tra phiên bản Database...");
    
    // 1. Lấy phiên bản Database hiện tại trong máy
    const localVer = await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.DB_VERSION) || "0";
    
    // 2. Lấy phiên bản mới nhất từ server thông qua link version.json động
    const verRes = await fetch(`${CONFIG.GITHUB.VERSION_JSON}?t=${Date.now()}`);
    if (!verRes.ok) throw new Error("Không thể kết nối máy chủ dữ liệu");
    
    const verJson = await verRes.json();
    const remoteVer = verJson.db_version;

    console.log(`📊 DB Version: Máy(${localVer}) | Server(${remoteVer})`);

    // 3. Nếu server có bản mới hơn hoặc máy chưa có data, thực hiện tải về
    if (parseInt(remoteVer) > parseInt(localVer) || localVer === "0") {
      console.log("⚡ [SyncService] Phát hiện bản mới, đang tải dữ liệu...");
      await downloadAndImportData(remoteVer);
    } else {
      console.log("✅ [SyncService] Dữ liệu SQLite đã là bản mới nhất.");
    }
  } catch (error) {
    console.warn("⚠️ [SyncService] Lỗi đồng bộ:", error.message);
  }
};

/**
 * Tải file JSON và nạp vào SQLite thông qua Transaction
 */
const downloadAndImportData = async (newVersion) => {
  try {
    // Tải file upgrade_db.json từ GitHub
    const res = await fetch(CONFIG.GITHUB.UPGRADE_DB_JSON);
    if (!res.ok) throw new Error("Không thể tải file upgrade_db.json");
    
    const data = await res.json();
    const { master_data, upgrade_data } = data;

    // Sử dụng Transaction để đảm bảo tính toàn vẹn (thất bại sẽ tự rollback)
    db.withTransactionSync(() => {
      // 1. Xóa các bảng cũ để tái cấu trúc
      db.execSync(`
        DROP TABLE IF EXISTS upgrade_data; 
        DROP TABLE IF EXISTS resources; 
        DROP TABLE IF EXISTS upgrade_types; 
        DROP TABLE IF EXISTS qualities; 
        DROP TABLE IF EXISTS categories;
      `);
      
      // 2. Tạo cấu trúc bảng mới (bao gồm các cột JSON config cho Categories)
      db.execSync(`
        CREATE TABLE categories (
          id INTEGER PRIMARY KEY, 
          code TEXT, 
          name TEXT, 
          icon TEXT, 
          sort_order INTEGER, 
          view_config TEXT,    -- Chứa JSON: isSpecialTier, useStarLabel...
          layout_config TEXT,  -- Chứa JSON: mặc định số cột
          gallery_config TEXT, -- Chứa JSON: dataKey, groups...
          filter_config TEXT   -- Chứa JSON: qualityAlias...
        );
        CREATE TABLE qualities (
          id INTEGER PRIMARY KEY, 
          code TEXT, 
          name TEXT, 
          color_code TEXT, 
          is_hero INTEGER
        );
        CREATE TABLE upgrade_types (
          id INTEGER PRIMARY KEY, 
          code TEXT, 
          name TEXT
        );
        CREATE TABLE resources (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          code TEXT, 
          name TEXT, 
          short_name TEXT, 
          unit TEXT, 
          quality_id INTEGER
        );
        CREATE TABLE upgrade_data (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          category_id INTEGER, 
          upgrade_type_id INTEGER, 
          quality_id INTEGER, 
          tier INTEGER, 
          step INTEGER, 
          resource_id INTEGER, 
          amount INTEGER
        );
      `);

      // 3. Nạp dữ liệu Categories với các Object Config được Stringify
      if (master_data.categories.length) {
        const catValues = master_data.categories.map(c => {
          const vCfg = esc(JSON.stringify(c.viewConfig || {}));
          const lCfg = esc(JSON.stringify(c.layoutConfig || {}));
          const gCfg = esc(JSON.stringify(c.galleryConfig || {}));
          const fCfg = esc(JSON.stringify(c.filterConfig || {}));
          return `(${c.id}, ${esc(c.code)}, ${esc(c.name)}, ${esc(c.icon)}, ${c.sort_order}, ${vCfg}, ${lCfg}, ${gCfg}, ${fCfg})`;
        }).join(",");
        db.execSync(`INSERT INTO categories VALUES ${catValues}`);
      }

      // 4. Nạp dữ liệu Phẩm chất (Qualities)
      if (master_data.qualities.length) {
        const qualValues = master_data.qualities.map(q => 
          `(${q.id}, ${esc(q.code)}, ${esc(q.name)}, ${esc(q.color_code || q.color)}, ${q.is_hero})`
        ).join(",");
        db.execSync(`INSERT INTO qualities VALUES ${qualValues}`);
      }

      // 5. Nạp dữ liệu Loại nâng cấp (Upgrade Types)
      if (master_data.upgradeTypes.length) {
        const typeValues = master_data.upgradeTypes.map(t => 
          `(${t.id}, ${esc(t.code)}, ${esc(t.name)})`
        ).join(",");
        db.execSync(`INSERT INTO upgrade_types VALUES ${typeValues}`);
      }

      // 6. Xây dựng bản đồ Mapping để ánh xạ ID cho tài nguyên và dữ liệu chính
      const qualMap = {}; 
      master_data.qualities.forEach(q => qualMap[q.code] = q.id);
      
      const typeMap = {}; 
      master_data.upgradeTypes.forEach(t => typeMap[t.code] = t.id);
      
      const resMap = {}; 
      let resIdCounter = 1;
      
      if (master_data.resources.length) {
        const resValues = master_data.resources.map(r => {
          resMap[r.code] = resIdCounter++;
          return `(${esc(r.code)}, ${esc(r.name)}, ${esc(r.shortName)}, ${esc(r.unit)}, ${qualMap[r.qualityCode] || 1})`;
        }).join(",");
        db.execSync(`INSERT INTO resources (code, name, short_name, unit, quality_id) VALUES ${resValues}`);
      }

      // 7. Nạp dữ liệu nâng cấp chính (Upgrade Data) theo từng mảnh (Chunk)
      // Định dạng row: [categoryId, typeCode, qualityCode, tier, step, resourceCode, amount]
      const CHUNK_SIZE = 500;
      for (let i = 0; i < upgrade_data.length; i += CHUNK_SIZE) {
        const chunk = upgrade_data.slice(i, i + CHUNK_SIZE);
        const values = chunk.map(row => {
          const resId = resMap[row[5]];
          if (!resId) return null;
          return `(${row[0]}, ${typeMap[row[1]] || 1}, ${qualMap[row[2]] || 1}, ${row[3]}, ${row[4]}, ${resId}, ${row[6]})`;
        }).filter(Boolean).join(",");
        
        if (values.length) {
          db.execSync(`INSERT INTO upgrade_data (category_id, upgrade_type_id, quality_id, tier, step, resource_id, amount) VALUES ${values}`);
        }
      }
    });

    // 8. Lưu phiên bản mới vào máy sau khi nạp thành công
    await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.DB_VERSION, newVersion.toString());
    console.log("🎉 [SyncService] Database đã nạp thành công lên máy.");

  } catch (err) {
    console.error("❌ [SyncService] Lỗi khi nạp dữ liệu SQLite:", err);
    throw err;
  }
};