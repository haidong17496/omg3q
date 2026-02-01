// src/utils/LayoutStrategy.js

export const getGridColumnStrategy = (layoutConfig, typeCode, stepCount) => {
  // ƯU TIÊN 1: Cấu hình ĐÍCH DANH (Specific Override)
  if (layoutConfig && layoutConfig[typeCode]) {
    return layoutConfig[typeCode];
  }

  // ƯU TIÊN 2: Logic thông minh theo số bậc (Smart Helper)
  if (stepCount === 12) return 6;
  if (stepCount === 5) return 5;
  // if (stepCount === 8) return 4; // Có thể thêm hoặc không tùy bro

  // ƯU TIÊN 3: Cấu hình mặc định của DANH MỤC (Fallback to Default)
  if (layoutConfig && layoutConfig.default) {
    return layoutConfig.default;
  }

  // CUỐI CÙNG: Fallback an toàn nhất
  return 4; 
};