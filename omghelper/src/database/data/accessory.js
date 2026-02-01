// src/database/data/accessory.js

// --- Helper Trang Sức Kim (Bậc 1-7 NL, Bậc 8 Hồn thay NL) ---
const genSuckim = (qual, tier, nlArray, soulAmt, nlCode, soulCode) => {
  const data = [];
  nlArray.forEach((amt, i) => {
    data.push({ type: 'kim', quality: qual, tier, step: i + 1, res: nlCode, amt });
  });
  data.push({ type: 'kim', quality: qual, tier, step: 8, res: soulCode, amt: soulAmt });
  return data;
};

// --- Helper Trang Sức Ám/Tử (Bậc 1-8 NL, Bậc 8 thêm Hồn) ---
const genSucHigh = (type, qual, tier, stepAmts, soulAmt, nlCode, soulCode) => {
  const data = [];
  stepAmts.forEach((amt, i) => {
    const s = i + 1;
    data.push({ type, quality: qual, tier, step: s, res: nlCode, amt });
    if (s === 8) data.push({ type, quality: qual, tier, step: s, res: soulCode, amt: soulAmt });
  });
  return data;
};

// --- Helper Trang Sức Thái/Bàn (Bậc 1-8 NL, Bậc 4 & 8 thêm Hồn) ---
const genSucSpecial = (type, qual, tier, stepAmts, soul4, soul8, nlCode, soulCode) => {
  const data = [];
  stepAmts.forEach((amt, i) => {
    const s = i + 1;
    data.push({ type, quality: qual, tier, step: s, res: nlCode, amt });
    if (s === 4) data.push({ type, quality: qual, tier, step: s, res: soulCode, amt: soul4 });
    if (s === 8) data.push({ type, quality: qual, tier, step: s, res: soulCode, amt: soul8 });
  });
  return data;
};

const sArr = (start, step, count = 8) => Array.from({ length: count }, (_, i) => start + (i * step));

export const accessoryData = [
  // 1. KIM
  ...genSuckim('common', 0, [60, 90, 135, 180, 225, 300, 450], 1, 'ts_kim_nguyen', 'ts_kim_hon'),
  ...genSuckim('common', 1, [120, 180, 270, 360, 450, 600, 900], 3, 'ts_kim_nguyen', 'ts_kim_hon'),
  ...genSuckim('common', 2, [180, 270, 400, 540, 680, 900, 1350], 5, 'ts_kim_nguyen', 'ts_kim_hon'),

  // 2. ÁM KIM
  ...genSucHigh('am_kim', 'common', 0, sArr(20, 20), 2, 'ts_am_nguyen', 'ts_am_hon'),
  ...genSucHigh('am_kim', 'common', 1, sArr(50, 50), 4, 'ts_am_nguyen', 'ts_am_hon'),
  ...genSucHigh('am_kim', 'common', 2, sArr(70, 70), 7, 'ts_am_nguyen', 'ts_am_hon'),

  // 3. TỬ KIM
  ...genSucHigh('tu_kim', 'common', 0, sArr(50, 50), 3, 'ts_tu_nguyen', 'ts_tu_hon'),
  ...genSucHigh('tu_kim', 'common', 1, sArr(100, 100), 7, 'ts_tu_nguyen', 'ts_tu_hon'),
  ...genSucHigh('tu_kim', 'common', 2, sArr(150, 150), 14, 'ts_tu_nguyen', 'ts_tu_hon'),

  // 4. THÁI KIM
  ...genSucSpecial('thai_kim', 'common', 0, sArr(50, 50), 1, 2, 'ts_thai_nguyen', 'ts_thai_hon'),
  ...genSucSpecial('thai_kim', 'common', 1, sArr(100, 100), 3, 4, 'ts_thai_nguyen', 'ts_thai_hon'),
  ...genSucSpecial('thai_kim', 'common', 2, sArr(150, 150), 6, 8, 'ts_thai_nguyen', 'ts_thai_hon'),

  // 5. BÀN KIM
  ...genSucSpecial('ban_kim', 'common', 0, sArr(75, 75), 1, 2, 'ts_ban_nguyen', 'ts_ban_hon'),
  ...genSucSpecial('ban_kim', 'common', 1, sArr(150, 150), 3, 4, 'ts_ban_nguyen', 'ts_ban_hon'),
  ...genSucSpecial('ban_kim', 'common', 2, sArr(225, 225), 6, 8, 'ts_ban_nguyen', 'ts_ban_hon'),
];