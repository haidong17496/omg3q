import fs from 'fs';
import { ALL_REAL_DATA } from './src/database/data/index.js';

console.log("🔄 Đang xử lý dữ liệu...");

const masterData = {
  version: 3, // Tăng version để App biết cần cập nhật schema
  // Map các trường config mới vào JSON
  categories: ALL_REAL_DATA.categories.map(c => ({
    id: c.id,
    code: c.code,
    name: c.name,
    icon: c.icon,
    sort_order: c.sort_order,
    viewConfig: c.viewConfig || {},
    layoutConfig: c.layoutConfig || {},
    galleryConfig: c.galleryConfig || {},
    filterConfig: c.filterConfig || {}
  })),
  qualities: ALL_REAL_DATA.qualities,
  upgradeTypes: ALL_REAL_DATA.upgradeTypes,
  resources: ALL_REAL_DATA.resources.map(r => ({
    code: r.code,
    name: r.name,
    shortName: r.shortName || r.name,
    unit: r.unit,
    qualityCode: r.qualityCode
  })),
};

const upgradeRows = ALL_REAL_DATA.upgradeData.map(item => {
  if (!item.amt || item.amt <= 0) return null;
  return [item.catId, item.type, item.quality, item.tier, item.step, item.res, item.amt];
}).filter(Boolean);

const finalDb = {
  info: { generated_at: new Date().toISOString(), total_rows: upgradeRows.length },
  master_data: masterData,
  upgrade_data: upgradeRows
};

fs.writeFileSync('upgrade_db.json', JSON.stringify(finalDb, null, 2), 'utf-8');
console.log(`✅ Đã tạo upgrade_db.json thành công!`);