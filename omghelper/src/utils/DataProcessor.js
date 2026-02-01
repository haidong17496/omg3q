// src/utils/DataProcessor.js
import { getAssetUrl, CONFIG } from '../constants/Config';
import { processSkillData } from './SkillFactory';

/**
 * Xử lý danh sách ảnh thông thường (Binh phù, Trang phục, Hồn thạch...)
 */
export const mapAssets = (list, folder, globalExt = CONFIG.APP.DEFAULT_IMAGE_EXT) => {
  if (!list) return [];
  return list.map(item => {
    // Ưu tiên dùng icon_slug nếu có, không thì dùng slug
    const iconName = item.icon_slug || item.slug;
    const ext = item.ext || globalExt;
    
    return {
      ...item,
      // Link Icon: base_url/folder/icons/name.ext
      thumb: getAssetUrl(`${folder}/icons/${iconName}.${ext}`),
      // Link Detail: base_url/folder/details/name_detail.ext
      detail: getAssetUrl(`${folder}/details/${item.slug}_detail.${ext}`)
    };
  });
};

/**
 * Xử lý danh sách Thiên Phú (Skill Tree)
 */
export const processTalentList = (list) => {
  const dataWithSkills = processSkillData(list || []);
  return dataWithSkills.map(item => {
    // Đối với Thiên Phú, bg_image thường chứa sẵn path từ JSON
    const fullUrl = getAssetUrl(item.bg_image);
    return {
      ...item,
      name: item.name ? item.name.replace(/^(THÁI KIM|BÀN KIM|LƯU KIM|TỬ KIM|ÁM KIM) - /gi, '') : 'Không tên',
      bg_image: fullUrl, 
      thumb: fullUrl, 
      detail: fullUrl 
    };
  });
};

/**
 * Xử lý danh sách hỗn hợp (Riêng cho Tướng)
 */
export const processHybridList = (list, folder, globalExt = CONFIG.APP.DEFAULT_IMAGE_EXT) => {
  const dataWithSkills = processSkillData(list || []);
  return dataWithSkills.map(item => {
    // Nếu là sơ đồ Thiên Phú (có layout_id)
    if (item.layout_id) {
      const fullBg = getAssetUrl(item.bg_image);
      return { ...item, bg_image: fullBg, thumb: fullBg, detail: fullBg };
    }
    
    // Nếu là Icon tướng bình thường
    const ext = item.ext || globalExt;
    return {
      ...item,
      thumb: getAssetUrl(`${folder}/icons/${item.slug}.${ext}`),
      detail: getAssetUrl(`${folder}/details/${item.slug}_detail.${ext}`)
    };
  });
};