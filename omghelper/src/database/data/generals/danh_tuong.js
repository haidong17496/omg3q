// src/database/data/generals/danh_tuong.js

export const generalsDanhTuong = {
  // 1. TIẾN CẤP (+1 đến +20)
  // [tier, step, resource_code, amount]
  tien_cap: [
    [0, 1, 'tien_cap_don', 150], [0, 2, 'tien_cap_don', 300], [0, 3, 'tien_cap_don', 750],
    [0, 4, 'tien_cap_don', 1500], [0, 4, 'da_tuong_do', 1],
    [0, 5, 'tien_cap_don', 3000], [0, 5, 'da_tuong_do', 1],
    [0, 6, 'tien_cap_don', 4500], [0, 6, 'da_tuong_do', 2],
    [0, 7, 'tien_cap_don', 7500], [0, 7, 'da_tuong_do', 2],
    [0, 8, 'tien_cap_don', 12000], [0, 8, 'da_tuong_do', 4],
    [0, 9, 'tien_cap_don', 18000], [0, 9, 'da_tuong_do', 6],
    [0, 10, 'tien_cap_don', 24000], [0, 10, 'manh_danh_tuong', 2],
    [0, 11, 'tien_cap_don', 30000], [0, 11, 'da_tuong_do', 8],
    [0, 12, 'tien_cap_don', 36000], [0, 12, 'manh_danh_tuong', 5],
    [0, 13, 'tien_cap_don', 45000], [0, 13, 'da_tuong_do', 10],
    [0, 14, 'tien_cap_don', 54000], [0, 14, 'manh_danh_tuong', 8],
    [0, 15, 'tien_cap_don', 65000], [0, 15, 'da_tuong_do', 15],
    [0, 16, 'tien_cap_don', 76000], [0, 16, 'manh_danh_tuong', 16],
    [0, 17, 'tien_cap_don', 90000], [0, 17, 'da_tuong_do', 20],
    [0, 18, 'tien_cap_don', 104000], [0, 18, 'manh_danh_tuong', 20],
    [0, 19, 'tien_cap_don', 118000], [0, 19, 'da_tuong_do', 30],
    [0, 20, 'tien_cap_don', 132000], [0, 20, 'da_tuong_do', 40],
    [0, 21, 'tien_cap_don', 132000], [0, 21, 'manh_danh_tuong', 20],
    [0, 22, 'tien_cap_don', 132000], [0, 22, 'manh_danh_tuong', 20],
    [0, 23, 'tien_cap_don', 132000], [0, 23, 'manh_danh_tuong', 20],
    [0, 24, 'tien_cap_don', 132000], [0, 24, 'manh_danh_tuong', 20],
    [0, 25, 'tien_cap_don', 132000], [0, 25, 'manh_danh_tuong', 20]
  ],

  // 2. ĐỘT PHÁ ĐỎ (6 bậc - Dùng Đá Tướng Đỏ thay vì Tướng)
  dot_pha_do: [
    [0, 1, 'dot_pha_don', 750], [0, 1, 'da_tuong_do', 1],
    [0, 2, 'dot_pha_don', 1000], [0, 2, 'da_tuong_do', 2],
    [0, 3, 'dot_pha_don', 1250], [0, 3, 'da_tuong_do', 3],
    [0, 4, 'dot_pha_don', 1750], [0, 4, 'da_tuong_do', 4],
    [0, 5, 'dot_pha_don', 2500], [0, 5, 'da_tuong_do', 6],
    [0, 6, 'dot_pha_don', 3000], [0, 6, 'da_tuong_do', 6]
  ],

  // 3. GIÁC TỈNH (6 tầng - Dùng Đá Tướng Đỏ thay vì Tướng)
  chan: [
    [0, 1, 'giac_tinh_don', 60], [0, 2, 'giac_tinh_don', 90], [0, 3, 'giac_tinh_don', 120], [0, 4, 'giac_tinh_don', 150], [1, 0, 'giac_tinh_don', 180], [1, 0, 'da_tuong_do', 2],
    [1, 1, 'giac_tinh_don', 120], [1, 2, 'giac_tinh_don', 180], [1, 3, 'giac_tinh_don', 240], [1, 4, 'giac_tinh_don', 300], [2, 0, 'giac_tinh_don', 360], [2, 0, 'da_tuong_do', 3],
    [2, 1, 'giac_tinh_don', 120], [2, 2, 'giac_tinh_don', 180], [2, 3, 'giac_tinh_don', 240], [2, 4, 'giac_tinh_don', 300], [3, 0, 'giac_tinh_don', 360], [3, 0, 'da_tuong_do', 3],
    [3, 1, 'giac_tinh_don', 180], [3, 2, 'giac_tinh_don', 270], [3, 3, 'giac_tinh_don', 360], [3, 4, 'giac_tinh_don', 450], [4, 0, 'giac_tinh_don', 540], [4, 0, 'da_tuong_do', 4],
    [4, 1, 'giac_tinh_don', 300], [4, 2, 'giac_tinh_don', 450], [4, 3, 'giac_tinh_don', 600], [4, 4, 'giac_tinh_don', 750], [5, 0, 'giac_tinh_don', 900], [5, 0, 'da_tuong_do', 5],
    [5, 1, 'giac_tinh_don', 540], [5, 2, 'giac_tinh_don', 810], [5, 3, 'giac_tinh_don', 1080], [5, 4, 'giac_tinh_don', 1350], [6, 0, 'giac_tinh_don', 1620], [6, 0, 'da_tuong_do', 5]
  ]
};