// src/database/data/equipment.js

// --- Helper riêng cho Trang Bị Kim (5 bậc, bậc 5 tốn hồn) ---
const genKim = (type, qual, tier, resBase, soulAmt, resCode, soulCode) => {
  const data = [];
  // Bậc 1 -> 4: Tốn NL (Base * Bậc)
  for (let s = 1; s <= 4; s++) {
    data.push({ type, quality: qual, tier, step: s, res: resCode, amt: resBase * s });
  }
  // Bậc 5: Tốn Hồn
  data.push({ type, quality: qual, tier, step: 5, res: soulCode, amt: soulAmt });
  return data;
};

// --- Helper riêng cho Ám/Tử/Thái/Bàn (8 bậc, bậc 8 tốn cả hai) ---
const genHighTier = (type, qual, tier, stepAmts, soulAmt, resCode, soulCode) => {
  const data = [];
  stepAmts.forEach((amt, index) => {
    const step = index + 1;
    // Thêm dòng nguyên liệu cho tất cả các bậc (1->8)
    data.push({ type, quality: qual, tier, step, res: resCode, amt });
    
    // Nếu là bậc 8 (cuối mảng) -> Thêm dòng Hồn
    if (step === 8) {
      data.push({ type, quality: qual, tier, step, res: soulCode, amt: soulAmt });
    }
  });
  return data;
};

// Hàm sinh dãy số đều (Ví dụ: 25, 50, 75... -> bước nhảy 25)
const stepArr = (start, step, count = 8) => Array.from({ length: count }, (_, i) => start + (i * step));

export const equipmentData = [
  // ==================================================
  // 1. KIM (3 Tầng - 5 Bậc)
  // Tầng 1: 100..400, 1v
  // Tầng 2: 200..800, 2v
  // Tầng 3: 300..1200, 3v
  // ==================================================
  ...genKim('kim', 'common', 0, 100, 1, 'trang_bi_kim_linh', 'trang_bi_kim_hon'),
  ...genKim('kim', 'common', 1, 200, 2, 'trang_bi_kim_linh', 'trang_bi_kim_hon'),
  ...genKim('kim', 'common', 2, 300, 3, 'trang_bi_kim_linh', 'trang_bi_kim_hon'),

  // ==================================================
  // 2. ÁM KIM (3 Tầng - 8 Bậc)
  // ==================================================
  // Tầng 1 (10..80, 1v)
  ...genHighTier('am_kim', 'common', 0, stepArr(10, 10), 1, 'am_kim_linh', 'trang_bi_am_kim_hon'),
  // Tầng 2 (25..200, 2v)
  ...genHighTier('am_kim', 'common', 1, stepArr(25, 25), 2, 'am_kim_linh', 'trang_bi_am_kim_hon'),
  // Tầng 3 (40..320, 3v)
  ...genHighTier('am_kim', 'common', 2, stepArr(40, 40), 3, 'am_kim_linh', 'trang_bi_am_kim_hon'),

  // ==================================================
  // 3. TỬ KIM (3 Tầng - 8 Bậc)
  // ==================================================
  // Tầng 1 (25..200, 2v)
  ...genHighTier('tu_kim', 'common', 0, stepArr(25, 25), 2, 'tu_kim_linh', 'trang_bi_tu_kim_hon'),
  // Tầng 2 (50..400, 4v)
  ...genHighTier('tu_kim', 'common', 1, stepArr(50, 50), 4, 'tu_kim_linh', 'trang_bi_tu_kim_hon'),
  // Tầng 3 (75..600, 8v)
  ...genHighTier('tu_kim', 'common', 2, stepArr(75, 75), 8, 'tu_kim_linh', 'trang_bi_tu_kim_hon'),

  // ==================================================
  // 4. THÁI KIM (Giống hệt Tử Kim, chỉ khác tên NL)
  // ==================================================
  ...genHighTier('thai_kim', 'common', 0, stepArr(25, 25), 2, 'tinh_hoa_thai_kim', 'trang_bi_thai_kim_hon'),
  ...genHighTier('thai_kim', 'common', 1, stepArr(50, 50), 4, 'tinh_hoa_thai_kim', 'trang_bi_thai_kim_hon'),
  ...genHighTier('thai_kim', 'common', 2, stepArr(75, 75), 8, 'tinh_hoa_thai_kim', 'trang_bi_thai_kim_hon'),

  // ==================================================
  // 5. BÀN KIM (3 Tầng - 8 Bậc - Mốc Soul cao hơn)
  // ==================================================
  // Tầng 1 (30..240, 2v)
  ...genHighTier('ban_kim', 'common', 0, stepArr(30, 30), 2, 'tinh_hoa_ban_kim', 'trang_bi_ban_kim_hon'),
  // Tầng 2 (60..480, 4v)
  ...genHighTier('ban_kim', 'common', 1, stepArr(60, 60), 4, 'tinh_hoa_ban_kim', 'trang_bi_ban_kim_hon'),
  // Tầng 3 (90..720, 8v)
  ...genHighTier('ban_kim', 'common', 2, stepArr(90, 90), 8, 'tinh_hoa_ban_kim', 'trang_bi_ban_kim_hon'),

  // ==================================================
  // 6. LƯU KIM (3 Tầng - 8 Bậc)
  // ==================================================
  // Tầng 1 (50..400, 2v)
  ...genHighTier('luu_kim', 'common', 0, stepArr(50, 50), 2, 'tinh_hoa_luu_kim', 'trang_bi_luu_kim_hon'),
  // Tầng 2 (70..560, 4v)
  ...genHighTier('luu_kim', 'common', 1, stepArr(70, 70), 4, 'tinh_hoa_luu_kim', 'trang_bi_luu_kim_hon'),
  // Tầng 3 (100..800, 8v)
  ...genHighTier('luu_kim', 'common', 2, stepArr(100, 100), 8, 'tinh_hoa_luu_kim', 'trang_bi_luu_kim_hon'),
];