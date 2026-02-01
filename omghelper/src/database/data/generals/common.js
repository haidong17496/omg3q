// src/database/data/generals/common.js

export const generalsCommon = [
  // ==========================================
  // 1. KIM (8 bậc mỗi tầng, max 3.0)
  // ==========================================
  [0, 1, 'tang_kim_don', 40], [0, 2, 'tang_kim_don', 80], [0, 3, 'tang_kim_don', 120], [0, 4, 'tang_kim_don', 160],
  [0, 5, 'tang_kim_don', 200], [0, 6, 'tang_kim_don', 240], [0, 7, 'tang_kim_don', 320], [1, 0, 'kim_hon_tuong', 1],
  [1, 1, 'tang_kim_don', 60], [1, 2, 'tang_kim_don', 120], [1, 3, 'tang_kim_don', 180], [1, 4, 'tang_kim_don', 240],
  [1, 5, 'tang_kim_don', 300], [1, 6, 'tang_kim_don', 360], [1, 7, 'tang_kim_don', 480], [2, 0, 'kim_hon_tuong', 3],
  [2, 1, 'tang_kim_don', 80], [2, 2, 'tang_kim_don', 160], [2, 3, 'tang_kim_don', 240], [2, 4, 'tang_kim_don', 320],
  [2, 5, 'tang_kim_don', 400], [2, 6, 'tang_kim_don', 480], [2, 7, 'tang_kim_don', 640], [3, 0, 'kim_hon_tuong', 8],

  // ==========================================
  // 2. ÁM KIM (8 bậc mỗi tầng, max 3.0)
  // ==========================================
  [0, 1, 'am_kim_chan_quyet', 40], [0, 2, 'am_kim_chan_quyet', 80], [0, 3, 'am_kim_chan_quyet', 120], [0, 4, 'am_kim_chan_quyet', 160],
  [0, 5, 'am_kim_chan_quyet', 200], [0, 6, 'am_kim_chan_quyet', 240], [0, 7, 'am_kim_chan_quyet', 280], [1, 0, 'am_kim_chan_quyet', 320], [1, 0, 'long_hon', 2],
  [1, 1, 'am_kim_chan_quyet', 70], [1, 2, 'am_kim_chan_quyet', 140], [1, 3, 'am_kim_chan_quyet', 210], [1, 4, 'am_kim_chan_quyet', 280],
  [1, 5, 'am_kim_chan_quyet', 350], [1, 6, 'am_kim_chan_quyet', 420], [1, 7, 'am_kim_chan_quyet', 490], [2, 0, 'am_kim_chan_quyet', 560], [2, 0, 'long_hon', 5],
  [2, 1, 'am_kim_chan_quyet', 100], [2, 2, 'am_kim_chan_quyet', 200], [2, 3, 'am_kim_chan_quyet', 300], [2, 4, 'am_kim_chan_quyet', 400],
  [2, 5, 'am_kim_chan_quyet', 500], [2, 6, 'am_kim_chan_quyet', 600], [2, 7, 'am_kim_chan_quyet', 700], [3, 0, 'am_kim_chan_quyet', 800], [3, 0, 'long_hon', 10],

  // ==========================================
  // 3. TỬ KIM (8 bậc mỗi tầng, max 3.0)
  // ==========================================
  [0, 1, 'tinh_hoa_tu_kim', 50], [0, 2, 'tinh_hoa_tu_kim', 100], [0, 3, 'tinh_hoa_tu_kim', 150], [0, 4, 'tinh_hoa_tu_kim', 200],
  [0, 5, 'tinh_hoa_tu_kim', 250], [0, 6, 'tinh_hoa_tu_kim', 300], [0, 7, 'tinh_hoa_tu_kim', 350], [1, 0, 'tinh_hoa_tu_kim', 400], [1, 0, 'da_hon_tu_kim', 3],
  [1, 1, 'tinh_hoa_tu_kim', 70], [1, 2, 'tinh_hoa_tu_kim', 140], [1, 3, 'tinh_hoa_tu_kim', 210], [1, 4, 'tinh_hoa_tu_kim', 280],
  [1, 5, 'tinh_hoa_tu_kim', 350], [1, 6, 'tinh_hoa_tu_kim', 420], [1, 7, 'tinh_hoa_tu_kim', 490], [2, 0, 'tinh_hoa_tu_kim', 560], [2, 0, 'da_hon_tu_kim', 8],
  [2, 1, 'tinh_hoa_tu_kim', 100], [2, 2, 'tinh_hoa_tu_kim', 200], [2, 3, 'tinh_hoa_tu_kim', 310], [2, 4, 'tinh_hoa_tu_kim', 400],
  [2, 5, 'tinh_hoa_tu_kim', 500], [2, 6, 'tinh_hoa_tu_kim', 600], [2, 7, 'tinh_hoa_tu_kim', 700], [3, 0, 'tinh_hoa_tu_kim', 800], [3, 0, 'da_hon_tu_kim', 14],

  // ==========================================
  // 4. THÁI KIM (12 bậc mỗi tầng, max 6.0)
  // ==========================================
  // Tầng 0 -> 1.0
  [0, 1, 'tien_ho_lo', 50], [0, 2, 'tien_ho_lo', 75], [0, 3, 'tien_ho_lo', 100], [0, 4, 'tien_ho_lo', 125], [0, 5, 'tien_ho_lo', 150], [0, 6, 'tien_ho_lo', 175], [0, 6, 'long_hon_dien', 1],
  [0, 7, 'tien_ho_lo', 200], [0, 8, 'tien_ho_lo', 225], [0, 9, 'tien_ho_lo', 250], [0, 10, 'tien_ho_lo', 275], [0, 11, 'tien_ho_lo', 300], [1, 0, 'tien_ho_lo', 350], [1, 0, 'long_hon_dien', 2],
  // Tầng 1 -> 2.0
  [1, 1, 'tien_ho_lo', 75], [1, 2, 'tien_ho_lo', 100], [1, 3, 'tien_ho_lo', 125], [1, 4, 'tien_ho_lo', 150], [1, 5, 'tien_ho_lo', 175], [1, 6, 'tien_ho_lo', 200], [1, 6, 'long_hon_dien', 1],
  [1, 7, 'tien_ho_lo', 225], [1, 8, 'tien_ho_lo', 250], [1, 9, 'tien_ho_lo', 275], [1, 10, 'tien_ho_lo', 300], [1, 11, 'tien_ho_lo', 325], [2, 0, 'tien_ho_lo', 375], [2, 0, 'long_hon_dien', 2],
  // Tầng 2 -> 3.0
  [2, 1, 'tien_ho_lo', 100], [2, 2, 'tien_ho_lo', 125], [2, 3, 'tien_ho_lo', 150], [2, 4, 'tien_ho_lo', 175], [2, 5, 'tien_ho_lo', 200], [2, 6, 'tien_ho_lo', 225], [2, 6, 'long_hon_dien', 2],
  [2, 7, 'tien_ho_lo', 250], [2, 8, 'tien_ho_lo', 275], [2, 9, 'tien_ho_lo', 300], [2, 10, 'tien_ho_lo', 325], [2, 11, 'tien_ho_lo', 350], [3, 0, 'tien_ho_lo', 400], [3, 0, 'long_hon_dien', 3],
  // Tầng 3 -> 4.0
  [3, 1, 'tien_ho_lo', 150], [3, 2, 'tien_ho_lo', 175], [3, 3, 'tien_ho_lo', 200], [3, 4, 'tien_ho_lo', 225], [3, 5, 'tien_ho_lo', 250], [3, 6, 'tien_ho_lo', 275], [3, 6, 'long_hon_dien', 2],
  [3, 7, 'tien_ho_lo', 300], [3, 8, 'tien_ho_lo', 325], [3, 9, 'tien_ho_lo', 350], [3, 10, 'tien_ho_lo', 375], [3, 11, 'tien_ho_lo', 400], [4, 0, 'tien_ho_lo', 450], [4, 0, 'long_hon_dien', 3],
  // Tầng 4 -> 5.0
  [4, 1, 'tien_ho_lo', 200], [4, 2, 'tien_ho_lo', 225], [4, 3, 'tien_ho_lo', 250], [4, 4, 'tien_ho_lo', 275], [4, 5, 'tien_ho_lo', 300], [4, 6, 'tien_ho_lo', 325], [4, 6, 'long_hon_dien', 2],
  [4, 7, 'tien_ho_lo', 350], [4, 8, 'tien_ho_lo', 375], [4, 9, 'tien_ho_lo', 400], [4, 10, 'tien_ho_lo', 425], [4, 11, 'tien_ho_lo', 450], [5, 0, 'tien_ho_lo', 500], [5, 0, 'long_hon_dien', 4],
  // Tầng 5 -> 6.0
  [5, 1, 'tien_ho_lo', 250], [5, 2, 'tien_ho_lo', 275], [5, 3, 'tien_ho_lo', 300], [5, 4, 'tien_ho_lo', 325], [5, 5, 'tien_ho_lo', 350], [5, 6, 'tien_ho_lo', 375], [5, 6, 'long_hon_dien', 3],
  [5, 7, 'tien_ho_lo', 400], [5, 8, 'tien_ho_lo', 425], [5, 9, 'tien_ho_lo', 450], [5, 10, 'tien_ho_lo', 475], [5, 11, 'tien_ho_lo', 500], [6, 0, 'tien_ho_lo', 550], [6, 0, 'long_hon_dien', 5],

  // ==========================================
  // 5. BÀN KIM (12 bậc mỗi tầng, max 6.0)
  // ==========================================
  // Tầng 0 -> 1.0
  [0, 1, 'tinh_binh_cam_lo', 25], [0, 2, 'tinh_binh_cam_lo', 50], [0, 3, 'tinh_binh_cam_lo', 75], [0, 4, 'tinh_binh_cam_lo', 100], [0, 5, 'tinh_binh_cam_lo', 125], [0, 6, 'tinh_binh_cam_lo', 150], [0, 6, 'luyen_tuy_kim_don', 1],
  [0, 7, 'tinh_binh_cam_lo', 175], [0, 8, 'tinh_binh_cam_lo', 200], [0, 9, 'tinh_binh_cam_lo', 225], [0, 10, 'tinh_binh_cam_lo', 250], [0, 11, 'tinh_binh_cam_lo', 275], [1, 0, 'tinh_binh_cam_lo', 300], [1, 0, 'luyen_tuy_kim_don', 2],
  // Tầng 1 -> 2.0
  [1, 1, 'tinh_binh_cam_lo', 50], [1, 2, 'tinh_binh_cam_lo', 75], [1, 3, 'tinh_binh_cam_lo', 100], [1, 4, 'tinh_binh_cam_lo', 125], [1, 5, 'tinh_binh_cam_lo', 150], [1, 6, 'tinh_binh_cam_lo', 175], [1, 6, 'luyen_tuy_kim_don', 1],
  [1, 7, 'tinh_binh_cam_lo', 200], [1, 8, 'tinh_binh_cam_lo', 225], [1, 9, 'tinh_binh_cam_lo', 250], [1, 10, 'tinh_binh_cam_lo', 275], [1, 11, 'tinh_binh_cam_lo', 300], [2, 0, 'tinh_binh_cam_lo', 325], [2, 0, 'luyen_tuy_kim_don', 2],
  // Tầng 2 -> 3.0
  [2, 1, 'tinh_binh_cam_lo', 75], [2, 2, 'tinh_binh_cam_lo', 100], [2, 3, 'tinh_binh_cam_lo', 125], [2, 4, 'tinh_binh_cam_lo', 150], [2, 5, 'tinh_binh_cam_lo', 175], [2, 6, 'tinh_binh_cam_lo', 200], [2, 6, 'luyen_tuy_kim_don', 2],
  [2, 7, 'tinh_binh_cam_lo', 225], [2, 8, 'tinh_binh_cam_lo', 250], [2, 9, 'tinh_binh_cam_lo', 275], [2, 10, 'tinh_binh_cam_lo', 300], [2, 11, 'tinh_binh_cam_lo', 325], [3, 0, 'tinh_binh_cam_lo', 350], [3, 0, 'luyen_tuy_kim_don', 3],
  // Tầng 3 -> 4.0
  [3, 1, 'tinh_binh_cam_lo', 100], [3, 2, 'tinh_binh_cam_lo', 125], [3, 3, 'tinh_binh_cam_lo', 150], [3, 4, 'tinh_binh_cam_lo', 175], [3, 5, 'tinh_binh_cam_lo', 200], [3, 6, 'tinh_binh_cam_lo', 225], [3, 6, 'luyen_tuy_kim_don', 2],
  [3, 7, 'tinh_binh_cam_lo', 250], [3, 8, 'tinh_binh_cam_lo', 275], [3, 9, 'tinh_binh_cam_lo', 300], [3, 10, 'tinh_binh_cam_lo', 325], [3, 11, 'tinh_binh_cam_lo', 350], [4, 0, 'tinh_binh_cam_lo', 375], [4, 0, 'luyen_tuy_kim_don', 3],
  // Tầng 4 -> 5.0
  [4, 1, 'tinh_binh_cam_lo', 125], [4, 2, 'tinh_binh_cam_lo', 150], [4, 3, 'tinh_binh_cam_lo', 175], [4, 4, 'tinh_binh_cam_lo', 200], [4, 5, 'tinh_binh_cam_lo', 225], [4, 6, 'tinh_binh_cam_lo', 250], [4, 6, 'luyen_tuy_kim_don', 2],
  [4, 7, 'tinh_binh_cam_lo', 275], [4, 8, 'tinh_binh_cam_lo', 300], [4, 9, 'tinh_binh_cam_lo', 325], [4, 10, 'tinh_binh_cam_lo', 350], [4, 11, 'tinh_binh_cam_lo', 375], [5, 0, 'tinh_binh_cam_lo', 400], [5, 0, 'luyen_tuy_kim_don', 4],
  // Tầng 5 -> 6.0
  [5, 1, 'tinh_binh_cam_lo', 150], [5, 2, 'tinh_binh_cam_lo', 175], [5, 3, 'tinh_binh_cam_lo', 200], [5, 4, 'tinh_binh_cam_lo', 225], [5, 5, 'tinh_binh_cam_lo', 250], [5, 6, 'tinh_binh_cam_lo', 275], [5, 6, 'luyen_tuy_kim_don', 3],
  [5, 7, 'tinh_binh_cam_lo', 300], [5, 8, 'tinh_binh_cam_lo', 325], [5, 9, 'tinh_binh_cam_lo', 350], [5, 10, 'tinh_binh_cam_lo', 375], [5, 11, 'tinh_binh_cam_lo', 400], [6, 0, 'tinh_binh_cam_lo', 425], [6, 0, 'luyen_tuy_kim_don', 5],

  // ==========================================
  // 6. LƯU KIM (12 bậc mỗi tầng, max 6.0)
  // ==========================================
  // Tầng 0 -> 1.0
  [0, 1, 'xich_diem_hoa_lien', 25], [0, 2, 'xich_diem_hoa_lien', 50], [0, 3, 'xich_diem_hoa_lien', 75], [0, 4, 'xich_diem_hoa_lien', 100], [0, 5, 'xich_diem_hoa_lien', 125], [0, 6, 'xich_diem_hoa_lien', 150], [0, 6, 'dia_mach_long_tinh', 1],
  [0, 7, 'xich_diem_hoa_lien', 175], [0, 8, 'xich_diem_hoa_lien', 200], [0, 9, 'xich_diem_hoa_lien', 225], [0, 10, 'xich_diem_hoa_lien', 250], [0, 11, 'xich_diem_hoa_lien', 275], [1, 0, 'xich_diem_hoa_lien', 300], [1, 0, 'dia_mach_long_tinh', 2],
  // Tầng 1 -> 2.0
  [1, 1, 'xich_diem_hoa_lien', 50], [1, 2, 'xich_diem_hoa_lien', 75], [1, 3, 'xich_diem_hoa_lien', 100], [1, 4, 'xich_diem_hoa_lien', 125], [1, 5, 'xich_diem_hoa_lien', 150], [1, 6, 'xich_diem_hoa_lien', 175], [1, 6, 'dia_mach_long_tinh', 2],
  [1, 7, 'xich_diem_hoa_lien', 200], [1, 8, 'xich_diem_hoa_lien', 225], [1, 9, 'xich_diem_hoa_lien', 250], [1, 10, 'xich_diem_hoa_lien', 275], [1, 11, 'xich_diem_hoa_lien', 300], [2, 0, 'xich_diem_hoa_lien', 325], [2, 0, 'dia_mach_long_tinh', 3],
  // Tầng 2 -> 3.0
  [2, 1, 'xich_diem_hoa_lien', 75], [2, 2, 'xich_diem_hoa_lien', 100], [2, 3, 'xich_diem_hoa_lien', 125], [2, 4, 'xich_diem_hoa_lien', 150], [2, 5, 'xich_diem_hoa_lien', 175], [2, 6, 'xich_diem_hoa_lien', 200], [2, 6, 'dia_mach_long_tinh', 2],
  [2, 7, 'xich_diem_hoa_lien', 225], [2, 8, 'xich_diem_hoa_lien', 250], [2, 9, 'xich_diem_hoa_lien', 275], [2, 10, 'xich_diem_hoa_lien', 300], [2, 11, 'xich_diem_hoa_lien', 325], [3, 0, 'xich_diem_hoa_lien', 350], [3, 0, 'dia_mach_long_tinh', 4],
  // Tầng 3 -> 4.0
  [3, 1, 'xich_diem_hoa_lien', 100], [3, 2, 'xich_diem_hoa_lien', 125], [3, 3, 'xich_diem_hoa_lien', 150], [3, 4, 'xich_diem_hoa_lien', 175], [3, 5, 'xich_diem_hoa_lien', 200], [3, 6, 'xich_diem_hoa_lien', 225], [3, 6, 'dia_mach_long_tinh', 3],
  [3, 7, 'xich_diem_hoa_lien', 250], [3, 8, 'xich_diem_hoa_lien', 275], [3, 9, 'xich_diem_hoa_lien', 300], [3, 10, 'xich_diem_hoa_lien', 325], [3, 11, 'xich_diem_hoa_lien', 350], [4, 0, 'xich_diem_hoa_lien', 375], [4, 0, 'dia_mach_long_tinh', 5],
  // Tầng 4 -> 5.0
  [4, 1, 'xich_diem_hoa_lien', 125], [4, 2, 'xich_diem_hoa_lien', 150], [4, 3, 'xich_diem_hoa_lien', 175], [4, 4, 'xich_diem_hoa_lien', 200], [4, 5, 'xich_diem_hoa_lien', 225], [4, 6, 'xich_diem_hoa_lien', 250], [4, 6, 'dia_mach_long_tinh', 3],
  [4, 7, 'xich_diem_hoa_lien', 275], [4, 8, 'xich_diem_hoa_lien', 300], [4, 9, 'xich_diem_hoa_lien', 325], [4, 10, 'xich_diem_hoa_lien', 350], [4, 11, 'xich_diem_hoa_lien', 375], [5, 0, 'xich_diem_hoa_lien', 400], [5, 0, 'dia_mach_long_tinh', 6],
  // Tầng 5 -> 6.0
  [5, 1, 'xich_diem_hoa_lien', 150], [5, 2, 'xich_diem_hoa_lien', 175], [5, 3, 'xich_diem_hoa_lien', 200], [5, 4, 'xich_diem_hoa_lien', 225], [5, 5, 'xich_diem_hoa_lien', 250], [5, 6, 'xich_diem_hoa_lien', 275], [5, 6, 'dia_mach_long_tinh', 4],
  [5, 7, 'xich_diem_hoa_lien', 300], [5, 8, 'xich_diem_hoa_lien', 325], [5, 9, 'xich_diem_hoa_lien', 350], [5, 10, 'xich_diem_hoa_lien', 375], [5, 11, 'xich_diem_hoa_lien', 400], [6, 0, 'xich_diem_hoa_lien', 425], [6, 0, 'dia_mach_long_tinh', 7],
];