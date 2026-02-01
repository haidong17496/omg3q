// src/database/queries.js
import { db } from './db';

const safeParse = (str) => {
  try { return str ? JSON.parse(str) : {}; } 
  catch (e) { return {}; }
};

export const getCategories = () => {
  try {
    const rows = db.getAllSync('SELECT * FROM categories ORDER BY sort_order ASC');
    return rows.map(row => ({
      ...row,
      viewConfig: safeParse(row.view_config),
      layoutConfig: safeParse(row.layout_config),
      galleryConfig: safeParse(row.gallery_config),
      filterConfig: safeParse(row.filter_config),
    }));
  } catch (e) { return []; }
};

export const getQualities = () => {
  try {
    return db.getAllSync('SELECT * FROM qualities WHERE is_hero = 1 ORDER BY id ASC');
  } catch (e) { return []; }
};

export const getAllQualities = () => {
  try {
    return db.getAllSync('SELECT * FROM qualities ORDER BY id ASC');
  } catch (e) { return []; }
};

export const getUpgradeTypes = () => {
  try {
    return db.getAllSync('SELECT * FROM upgrade_types ORDER BY id ASC');
  } catch (e) { return []; }
};

export const getAvailableTypeIds = (catId, qualId) => {
  if (!catId || !qualId) return [];
  try {
    const query = `SELECT DISTINCT upgrade_type_id FROM upgrade_data WHERE category_id = ? AND (quality_id = ? OR quality_id = (SELECT id FROM qualities WHERE code = 'common' LIMIT 1))`;
    return db.getAllSync(query, [catId, qualId]).map(r => r.upgrade_type_id);
  } catch (e) { return []; }
};

export const getAvailableQualIds = (catId) => {
  if (!catId) return [];
  try {
    const query = `SELECT DISTINCT quality_id FROM upgrade_data WHERE category_id = ?`;
    return db.getAllSync(query, [catId]).map(r => r.quality_id);
  } catch (e) { return []; }
};

export const getUpgradeMatrixData = (catId, typeId, qualId) => {
  if (!catId || !typeId || !qualId) return [];
  try {
    const query = `
      SELECT ud.tier, ud.step, ud.amount, 
             r.name as res_name, r.short_name as res_short_name,
             r.unit, r.code as res_code, 
             q.color_code as res_color, ud.category_id as catId
      FROM upgrade_data ud
      JOIN resources r ON ud.resource_id = r.id
      JOIN qualities q ON r.quality_id = q.id
      WHERE ud.category_id = ? AND ud.upgrade_type_id = ? 
      AND (ud.quality_id = ? OR ud.quality_id = (SELECT id FROM qualities WHERE code = 'common' LIMIT 1))
      ORDER BY ud.tier ASC, ud.step ASC, r.id ASC
    `;
    return db.getAllSync(query, [catId, typeId, qualId]);
  } catch (e) { return []; }
};

/**
 * CALCULATOR QUERY: Tính tổng nguyên liệu trong một chặng đường cụ thể
 * @param {number} catId - ID danh mục
 * @param {string} typeCode - Code loại nâng cấp
 * @param {string} qualCode - Code phẩm chất
 * @param {object} range - { startStepValue, endStepValue } (Value = tier * 100 + step)
 */
export const getResourceSumInRange = (catId, typeCode, qualCode, startVal = -1, endVal = 9999) => {
  try {
    const query = `
      SELECT r.code, r.name, r.short_name, r.unit, q.color_code as color, 
             SUM(ud.amount) as total
      FROM upgrade_data ud
      JOIN resources r ON ud.resource_id = r.id
      JOIN qualities q ON r.quality_id = q.id
      WHERE ud.category_id = ? 
        AND ud.upgrade_type_id = (SELECT id FROM upgrade_types WHERE code = ? LIMIT 1)
        AND ud.quality_id = (SELECT id FROM qualities WHERE code = ? LIMIT 1)
        AND (ud.tier * 100 + ud.step) > ?
        AND (ud.tier * 100 + ud.step) <= ?
      GROUP BY r.code
    `;
    return db.getAllSync(query, [catId, typeCode, qualCode, startVal, endVal]);
  } catch (e) {
    return [];
  }
};

/**
 * CALCULATOR QUERY: Lấy tất cả các mốc (Tier/Step) để user chọn điểm đầu/cuối
 */
export const getStepList = (catId, typeCode, qualCode) => {
  try {
    const query = `
      SELECT DISTINCT tier, step 
      FROM upgrade_data 
      WHERE category_id = ? 
        AND upgrade_type_id = (SELECT id FROM upgrade_types WHERE code = ? LIMIT 1)
        AND quality_id = (SELECT id FROM qualities WHERE code = ? LIMIT 1)
      ORDER BY tier ASC, step ASC
    `;
    return db.getAllSync(query, [catId, typeCode, qualCode]);
  } catch (e) { return []; }
};