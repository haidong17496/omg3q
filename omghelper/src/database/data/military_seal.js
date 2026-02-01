// src/database/data/military_seal.js

export const militarySealData = [
  // --- BOX 1: BINH PHÙ KIM (Tier 0) ---
  { type: 'tien_cap', tier: 0, step: 0, res: 'manh_bp_kim', amt: 80 },  // Ghép
  { type: 'tien_cap', tier: 0, step: 1, res: 'manh_bp_kim', amt: 40 },  // 1 sao
  { type: 'tien_cap', tier: 0, step: 2, res: 'manh_bp_kim', amt: 80 },  // 2 sao
  { type: 'tien_cap', tier: 0, step: 3, res: 'manh_bp_kim', amt: 120 }, // 3 sao
  { type: 'tien_cap', tier: 0, step: 4, res: 'manh_bp_kim', amt: 160 }, // 4 sao
  { type: 'tien_cap', tier: 0, step: 5, res: 'manh_bp_kim', amt: 240 }, // 5 sao

  // --- BOX 2: BINH PHÙ ÁM KIM (Tier 1) ---
  { type: 'tien_cap', tier: 1, step: 0, res: 'manh_bp_am',  amt: 100 }, // Ghép
  { type: 'tien_cap', tier: 1, step: 1, res: 'manh_bp_kim', amt: 160 }, // 1 sao (Dùng mảnh kim)
  { type: 'tien_cap', tier: 1, step: 2, res: 'manh_bp_kim', amt: 160 }, // 2 sao
  { type: 'tien_cap', tier: 1, step: 3, res: 'manh_bp_am',  amt: 200 }, // 3 sao (Dùng mảnh ám)
  { type: 'tien_cap', tier: 1, step: 4, res: 'manh_bp_kim', amt: 320 }, // 4 sao
  { type: 'tien_cap', tier: 1, step: 5, res: 'manh_bp_am',  amt: 300 }, // 5 sao

  // --- BOX 3: BINH PHÙ TỬ KIM (Tier 2) ---
  { type: 'tien_cap', tier: 2, step: 0, res: 'manh_bp_tu',  amt: 120 }, // Ghép
  { type: 'tien_cap', tier: 2, step: 1, res: 'manh_bp_kim', amt: 240 }, // 1 sao
  { type: 'tien_cap', tier: 2, step: 2, res: 'manh_bp_kim', amt: 240 }, // 2 sao
  { type: 'tien_cap', tier: 2, step: 3, res: 'manh_bp_tu',  amt: 240 }, // 3 sao
  { type: 'tien_cap', tier: 2, step: 4, res: 'manh_bp_kim', amt: 400 }, // 4 sao
  { type: 'tien_cap', tier: 2, step: 5, res: 'manh_bp_tu',  amt: 360 }, // 5 sao
];