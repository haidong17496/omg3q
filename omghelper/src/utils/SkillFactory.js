// src/utils/SkillFactory.js
import { SKILL_LAYOUTS } from '../constants/SkillLayouts';

export const processSkillData = (rawData) => {
  if (!rawData || !Array.isArray(rawData)) return [];

  return rawData.map(item => {
    // Nếu item dùng Layout Skeleton
    if (item.layout_id && SKILL_LAYOUTS[item.layout_id]) {
      const layout = SKILL_LAYOUTS[item.layout_id];
      const contentList = item.content || [];

      const mergedNodes = layout.nodes.map((node, index) => {
        const content = contentList[index] || {};
        return {
          ...node,
          name: content.name || `Skill ${index + 1}`,
          desc: content.desc || "Dữ liệu đang cập nhật..."
        };
      });

      return {
        ...item,
        aspect_ratio: layout.aspect_ratio,
        nodes: mergedNodes // Gán mảng node đã merge text
      };
    }
    return item;
  });
};