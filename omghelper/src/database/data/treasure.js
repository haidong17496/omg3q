// src/database/data/treasure.js

// --- Helper Bảo Vật Kim (1-7 NL, 8 Hồn) ---
const genBvKim = (tier, nlArray, soulAmt, nlCode, soulCode) => {
  const data = [];
  nlArray.forEach((amt, i) => {
    data.push({ type: 'kim', quality: 'common', tier, step: i + 1, res: nlCode, amt });
  });
  data.push({ type: 'kim', quality: 'common', tier, step: 8, res: soulCode, amt: soulAmt });
  return data;
};

// --- Helper Bảo Vật Ám/Tử (1-8 NL, 8 thêm Hồn) ---
const genBvHigh = (type, tier, stepAmts, soulAmt, nlCode, soulCode) => {
  const data = [];
  stepAmts.forEach((amt, i) => {
    const s = i + 1;
    data.push({ type, quality: 'common', tier, step: s, res: nlCode, amt });
    if (s === 8) data.push({ type, quality: 'common', tier, step: s, res: soulCode, amt: soulAmt });
  });
  return data;
};

// --- Helper Bảo Vật Thái/Bàn (1-8 NL, 4 & 8 thêm Hồn) ---
const genBvSpecial = (type, tier, stepAmts, soul4, soul8, nlCode, soulCode) => {
  const data = [];
  stepAmts.forEach((amt, i) => {
    const s = i + 1;
    data.push({ type, quality: 'common', tier, step: s, res: nlCode, amt });
    if (s === 4) data.push({ type, quality: 'common', tier, step: s, res: soulCode, amt: soul4 });
    if (s === 8) data.push({ type, quality: 'common', tier, step: s, res: soulCode, amt: soul8 });
  });
  return data;
};

const sArr = (start, step, count = 8) => Array.from({ length: count }, (_, i) => start + (i * step));

export const treasureData = [
  // 1. KIM
  ...genBvKim(0, [80, 120, 180, 240, 300, 400, 600], 1, 'bv_kim_nl', 'bv_kim_hon'),
  ...genBvKim(1, [160, 240, 360, 480, 600, 800, 1200], 3, 'bv_kim_nl', 'bv_kim_hon'),
  ...genBvKim(2, [240, 360, 540, 720, 900, 1200, 1800], 8, 'bv_kim_nl', 'bv_kim_hon'),

  // 2. ÁM KIM
  ...genBvHigh('am_kim', 0, sArr(30, 30), 2, 'bv_am_nl', 'bv_am_hon'),
  ...genBvHigh('am_kim', 1, sArr(60, 60), 5, 'bv_am_nl', 'bv_am_hon'),
  ...genBvHigh('am_kim', 2, sArr(80, 80), 10, 'bv_am_nl', 'bv_am_hon'),

  // 3. TỬ KIM
  ...genBvHigh('tu_kim', 0, sArr(60, 60), 4, 'bv_tu_nl', 'bv_tu_hon'),
  ...genBvHigh('tu_kim', 1, sArr(120, 120), 10, 'bv_tu_nl', 'bv_tu_hon'),
  ...genBvHigh('tu_kim', 2, sArr(180, 180), 16, 'bv_tu_nl', 'bv_tu_hon'),

  // 4. THÁI KIM
  ...genBvSpecial('thai_kim', 0, sArr(60, 60), 1, 2, 'bv_thai_nl', 'bv_thai_hon'),
  ...genBvSpecial('thai_kim', 1, sArr(120, 120), 3, 5, 'bv_thai_nl', 'bv_thai_hon'),
  ...genBvSpecial('thai_kim', 2, sArr(180, 180), 8, 11, 'bv_thai_nl', 'bv_thai_hon'),

  // 5. BÀN KIM
  ...genBvSpecial('ban_kim', 0, sArr(75, 75), 1, 2, 'bv_ban_nl', 'bv_ban_hon'),
  ...genBvSpecial('ban_kim', 1, sArr(150, 150), 3, 5, 'bv_ban_nl', 'bv_ban_hon'),
  ...genBvSpecial('ban_kim', 2, sArr(225, 225), 8, 11, 'bv_ban_nl', 'bv_ban_hon'),
];