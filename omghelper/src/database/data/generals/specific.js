// src/database/data/generals/specific.js

// Hàm helper để generate Tiến Cấp đơn cho TC10, Hiếm, Hot (vì dùng chung số lượng Đơn)
const tienCapDonChung = [100, 200, 500, 1000, 2000, 3000, 5000, 8000, 12000, 16000, 20000, 24000, 30000, 36000, 42000, 48000, 55000, 62000, 70000, 80000, 80000, 80000, 80000, 80000, 80000];

export const generalsSpecific = {
  // ==========================================
  // 1. TƯ CHẤT 10 (tc10)
  // ==========================================
  tc10: {
    tien_cap: [
      ...tienCapDonChung.map((amt, i) => [0, i + 1, 'tien_cap_don', amt]),
      [0, 4, 'tuong', 1], [0, 5, 'tuong', 1], [0, 6, 'tuong', 2], [0, 7, 'tuong', 2], [0, 8, 'tuong', 4], [0, 9, 'tuong', 6], [0, 10, 'tuong', 8],
      [0, 11, 'tuong', 8], [0, 12, 'tuong', 10], [0, 13, 'tuong', 20], [0, 14, 'tuong', 24], [0, 15, 'tuong', 24], [0, 16, 'tuong', 28], [0, 17, 'tuong', 28],
      [0, 18, 'tuong', 32], [0, 19, 'tuong', 38], [0, 20, 'tuong', 44], [0, 21, 'tuong', 44], [0, 22, 'tuong', 44], [0, 23, 'tuong', 44], [0, 24, 'tuong', 44], [0, 25, 'tuong', 44]
    ],
    dot_pha_cam: [
      [0, 1, 'dot_pha_don', 300], [0, 1, 'tuong', 3], [0, 2, 'dot_pha_don', 600], [0, 2, 'tuong', 3], [0, 3, 'dot_pha_don', 1000], [0, 3, 'tuong', 6],
      [0, 4, 'dot_pha_don', 1500], [0, 4, 'tuong', 6], [0, 5, 'dot_pha_don', 2000], [0, 5, 'tuong', 9]
    ],
    dot_pha_do: [
      [0, 1, 'dot_pha_don', 750], [0, 1, 'tuong', 3], [0, 2, 'dot_pha_don', 1000], [0, 2, 'tuong', 6], [0, 3, 'dot_pha_don', 1250], [0, 3, 'tuong', 9],
      [0, 4, 'dot_pha_don', 1750], [0, 4, 'tuong', 12], [0, 5, 'dot_pha_don', 2500], [0, 5, 'tuong', 18], [0, 6, 'dot_pha_don', 3000], [0, 6, 'tuong', 18]
    ],
    chan: [
      [0, 1, 'giac_tinh_don', 40], [0, 2, 'giac_tinh_don', 60], [0, 3, 'giac_tinh_don', 80], [0, 4, 'giac_tinh_don', 100], [0, 4, 'tuong', 1], [1, 0, 'giac_tinh_don', 120], [1, 0, 'tuong', 2],
      [1, 1, 'giac_tinh_don', 80], [1, 2, 'giac_tinh_don', 120], [1, 3, 'giac_tinh_don', 160], [1, 3, 'tuong', 1], [1, 4, 'giac_tinh_don', 200], [1, 4, 'tuong', 1], [2, 0, 'giac_tinh_don', 240], [2, 0, 'tuong', 4],
      [2, 1, 'giac_tinh_don', 80], [2, 2, 'giac_tinh_don', 120], [2, 3, 'giac_tinh_don', 160], [2, 3, 'tuong', 1], [2, 4, 'giac_tinh_don', 200], [2, 4, 'tuong', 1], [3, 0, 'giac_tinh_don', 240], [3, 0, 'tuong', 4],
      [3, 1, 'giac_tinh_don', 120], [3, 2, 'giac_tinh_don', 180], [3, 3, 'giac_tinh_don', 240], [3, 3, 'tuong', 1], [3, 4, 'giac_tinh_don', 300], [3, 4, 'tuong', 2], [4, 0, 'giac_tinh_don', 360], [4, 0, 'tuong', 6],
      [4, 1, 'giac_tinh_don', 200], [4, 2, 'giac_tinh_don', 300], [4, 3, 'giac_tinh_don', 400], [4, 3, 'tuong', 2], [4, 4, 'giac_tinh_don', 500], [4, 4, 'tuong', 2], [5, 0, 'giac_tinh_don', 600], [5, 0, 'tuong', 8],
      [5, 1, 'giac_tinh_don', 360], [5, 2, 'giac_tinh_don', 540], [5, 3, 'giac_tinh_don', 720], [5, 3, 'tuong', 2], [5, 4, 'giac_tinh_don', 900], [5, 4, 'tuong', 2], [6, 0, 'giac_tinh_don', 1080], [6, 0, 'tuong', 8]
    ]
  },

  // ==========================================
  // 2. HIẾM (hiem)
  // ==========================================
  hiem: {
    tien_cap: [
      ...tienCapDonChung.map((amt, i) => [0, i + 1, 'tien_cap_don', amt]),
      [0, 4, 'tuong', 1], [0, 5, 'tuong', 1], [0, 6, 'tuong', 2], [0, 7, 'tuong', 2], [0, 8, 'tuong', 4], [0, 9, 'tuong', 6], [0, 10, 'tuong', 8],
      [0, 11, 'tuong', 8], [0, 12, 'tuong', 10], [0, 13, 'tuong', 13], [0, 14, 'tuong', 16], [0, 15, 'tuong', 16], [0, 16, 'tuong', 19], [0, 17, 'tuong', 19],
      [0, 18, 'tuong', 22], [0, 19, 'tuong', 25], [0, 20, 'tuong', 28], [0, 21, 'tuong', 28], [0, 22, 'tuong', 28], [0, 23, 'tuong', 28], [0, 24, 'tuong', 28], [0, 25, 'tuong', 28]
    ],
    dot_pha_cam: [
      [0, 1, 'dot_pha_don', 200], [0, 1, 'tuong', 2], [0, 2, 'dot_pha_don', 400], [0, 2, 'tuong', 2], [0, 3, 'dot_pha_don', 600], [0, 3, 'tuong', 4],
      [0, 4, 'dot_pha_don', 900], [0, 4, 'tuong', 4], [0, 5, 'dot_pha_don', 1200], [0, 5, 'tuong', 6]
    ],
    dot_pha_do: [
      [0, 1, 'dot_pha_don', 750], [0, 1, 'tuong', 2], [0, 2, 'dot_pha_don', 1000], [0, 2, 'tuong', 4], [0, 3, 'dot_pha_don', 1250], [0, 3, 'tuong', 6],
      [0, 4, 'dot_pha_don', 1750], [0, 4, 'tuong', 8], [0, 5, 'dot_pha_don', 2500], [0, 5, 'tuong', 12], [0, 6, 'dot_pha_don', 3000], [0, 6, 'tuong', 12]
    ],
    chan: [
      [0, 1, 'giac_tinh_don', 40], [0, 2, 'giac_tinh_don', 60], [0, 3, 'giac_tinh_don', 80], [0, 4, 'giac_tinh_don', 100], [1, 0, 'giac_tinh_don', 120], [1, 0, 'tuong', 2],
      [1, 1, 'giac_tinh_don', 80], [1, 2, 'giac_tinh_don', 120], [1, 3, 'giac_tinh_don', 160], [1, 4, 'giac_tinh_don', 200], [1, 4, 'tuong', 1], [2, 0, 'giac_tinh_don', 240], [2, 0, 'tuong', 3],
      [2, 1, 'giac_tinh_don', 80], [2, 2, 'giac_tinh_don', 120], [2, 3, 'giac_tinh_don', 160], [2, 4, 'giac_tinh_don', 200], [2, 4, 'tuong', 1], [3, 0, 'giac_tinh_don', 240], [3, 0, 'tuong', 3],
      [3, 1, 'giac_tinh_don', 120], [3, 2, 'giac_tinh_don', 180], [3, 3, 'giac_tinh_don', 240], [3, 3, 'tuong', 1], [3, 4, 'giac_tinh_don', 300], [3, 4, 'tuong', 1], [4, 0, 'giac_tinh_don', 360], [4, 0, 'tuong', 4],
      [4, 1, 'giac_tinh_don', 200], [4, 2, 'giac_tinh_don', 300], [4, 3, 'giac_tinh_don', 400], [4, 3, 'tuong', 1], [4, 4, 'giac_tinh_don', 500], [4, 4, 'tuong', 2], [5, 0, 'giac_tinh_don', 600], [5, 0, 'tuong', 5],
      [5, 1, 'giac_tinh_don', 360], [5, 2, 'giac_tinh_don', 540], [5, 3, 'giac_tinh_don', 720], [5, 3, 'tuong', 1], [5, 4, 'giac_tinh_don', 900], [5, 4, 'tuong', 2], [6, 0, 'giac_tinh_don', 1080], [6, 0, 'tuong', 5]
    ]
  },

  // ==========================================
  // 3. HOT (hot)
  // ==========================================
  hot: {
    tien_cap: [
      ...tienCapDonChung.map((amt, i) => [0, i + 1, 'tien_cap_don', amt]),
      [0, 4, 'tuong', 1], [0, 5, 'tuong', 1], [0, 6, 'tuong', 2], [0, 7, 'tuong', 2], [0, 8, 'tuong', 4], [0, 9, 'tuong', 6], [0, 10, 'tuong', 8],
      [0, 11, 'tuong', 8], [0, 12, 'tuong', 10], [0, 13, 'tuong', 10], [0, 14, 'tuong', 12], [0, 15, 'tuong', 12], [0, 16, 'tuong', 14], [0, 17, 'tuong', 14],
      [0, 18, 'tuong', 16], [0, 19, 'tuong', 18], [0, 20, 'tuong', 20], [0, 21, 'tuong', 20], [0, 22, 'tuong', 20], [0, 23, 'tuong', 20], [0, 24, 'tuong', 20], [0, 25, 'tuong', 20]
    ],
    dot_pha_cam: [
      [0, 1, 'dot_pha_don', 200], [0, 1, 'tuong', 1], [0, 2, 'dot_pha_don', 400], [0, 2, 'tuong', 1], [0, 3, 'dot_pha_don', 600], [0, 3, 'tuong', 2],
      [0, 4, 'dot_pha_don', 900], [0, 4, 'tuong', 2], [0, 5, 'dot_pha_don', 1200], [0, 5, 'tuong', 3]
    ],
    dot_pha_do: [
      [0, 1, 'dot_pha_don', 750], [0, 1, 'tuong', 2], [0, 2, 'dot_pha_don', 1000], [0, 2, 'tuong', 3], [0, 3, 'dot_pha_don', 1250], [0, 3, 'tuong', 4],
      [0, 4, 'dot_pha_don', 1750], [0, 4, 'tuong', 6], [0, 5, 'dot_pha_don', 2500], [0, 5, 'tuong', 9], [0, 6, 'dot_pha_don', 3000], [0, 6, 'tuong', 9]
    ],
    chan: [
      // Giác tỉnh Hot giống hệt Hiếm
      [0, 1, 'giac_tinh_don', 40], [0, 2, 'giac_tinh_don', 60], [0, 3, 'giac_tinh_don', 80], [0, 4, 'giac_tinh_don', 100], [1, 0, 'giac_tinh_don', 120], [1, 0, 'tuong', 2],
      [1, 1, 'giac_tinh_don', 80], [1, 2, 'giac_tinh_don', 120], [1, 3, 'giac_tinh_don', 160], [1, 4, 'giac_tinh_don', 200], [1, 4, 'tuong', 1], [2, 0, 'giac_tinh_don', 240], [2, 0, 'tuong', 3],
      [2, 1, 'giac_tinh_don', 80], [2, 2, 'giac_tinh_don', 120], [2, 3, 'giac_tinh_don', 160], [2, 4, 'giac_tinh_don', 200], [2, 4, 'tuong', 1], [3, 0, 'giac_tinh_don', 240], [3, 0, 'tuong', 3],
      [3, 1, 'giac_tinh_don', 120], [3, 2, 'giac_tinh_don', 180], [3, 3, 'giac_tinh_don', 240], [3, 3, 'tuong', 1], [3, 4, 'giac_tinh_don', 300], [3, 4, 'tuong', 1], [4, 0, 'giac_tinh_don', 360], [4, 0, 'tuong', 4],
      [4, 1, 'giac_tinh_don', 200], [4, 2, 'giac_tinh_don', 300], [4, 3, 'giac_tinh_don', 400], [4, 3, 'tuong', 1], [4, 4, 'giac_tinh_don', 500], [4, 4, 'tuong', 2], [5, 0, 'giac_tinh_don', 600], [5, 0, 'tuong', 5],
      [5, 1, 'giac_tinh_don', 360], [5, 2, 'giac_tinh_don', 540], [5, 3, 'giac_tinh_don', 720], [5, 3, 'tuong', 1], [5, 4, 'giac_tinh_don', 900], [5, 4, 'tuong', 2], [6, 0, 'giac_tinh_don', 1080], [6, 0, 'tuong', 5]
    ]
  }
};