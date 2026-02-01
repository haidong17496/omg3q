// src/database/data/military_book.js

export const militaryBookData = [
  // --- TIER 0: BINH THƯ KIM ---
  { type: 'tien_cap', tier: 0, step: 0, res: 'manh_bt_kim', amt: 60 },  // Ghép
  { type: 'tien_cap', tier: 0, step: 1, res: 'manh_bt_kim', amt: 30 },  // 1 sao
  { type: 'tien_cap', tier: 0, step: 2, res: 'manh_bt_kim', amt: 60 },  // 2 sao
  { type: 'tien_cap', tier: 0, step: 3, res: 'manh_bt_kim', amt: 90 },  // 3 sao
  { type: 'tien_cap', tier: 0, step: 4, res: 'manh_bt_kim', amt: 120 }, // 4 sao
  { type: 'tien_cap', tier: 0, step: 5, res: 'manh_bt_kim', amt: 150 }, // 5 sao
  { type: 'tien_cap', tier: 0, step: 6, res: 'manh_bt_kim', amt: 180 }, // 6 sao
  { type: 'tien_cap', tier: 0, step: 7, res: 'manh_bt_kim', amt: 210 }, // 7 sao

  // --- TIER 1: BINH THƯ ÁM KIM ---
  { type: 'tien_cap', tier: 1, step: 0, res: 'manh_bt_am',  amt: 80 },  // Ghép
  { type: 'tien_cap', tier: 1, step: 1, res: 'manh_bt_kim', amt: 60 },  // 1 sao (Kim)
  { type: 'tien_cap', tier: 1, step: 2, res: 'manh_bt_kim', amt: 120 }, // 2 sao (Kim)
  { type: 'tien_cap', tier: 1, step: 3, res: 'manh_bt_am',  amt: 80 },  // 3 sao (Ám)
  { type: 'tien_cap', tier: 1, step: 4, res: 'manh_bt_kim', amt: 120 }, // 4 sao (Kim)
  { type: 'tien_cap', tier: 1, step: 5, res: 'manh_bt_am',  amt: 160 }, // 5 sao (Ám)
  { type: 'tien_cap', tier: 1, step: 6, res: 'manh_bt_kim', amt: 120 }, // 6 sao (Kim)
  { type: 'tien_cap', tier: 1, step: 7, res: 'manh_bt_am',  amt: 160 }, // 7 sao (Ám)

  // --- TIER 2: BINH THƯ TỬ KIM ---
  { type: 'tien_cap', tier: 2, step: 0, res: 'manh_bt_tu',  amt: 100 }, // Ghép
  { type: 'tien_cap', tier: 2, step: 1, res: 'manh_bt_kim', amt: 60 },  // 1 sao (Kim)
  { type: 'tien_cap', tier: 2, step: 2, res: 'manh_bt_kim', amt: 120 }, // 2 sao (Kim)
  { type: 'tien_cap', tier: 2, step: 3, res: 'manh_bt_tu',  amt: 100 }, // 3 sao (Tử)
  { type: 'tien_cap', tier: 2, step: 4, res: 'manh_bt_kim', amt: 180 }, // 4 sao (Kim)
  { type: 'tien_cap', tier: 2, step: 5, res: 'manh_bt_tu',  amt: 100 }, // 5 sao (Tử)
  { type: 'tien_cap', tier: 2, step: 6, res: 'manh_bt_kim', amt: 180 }, // 6 sao (Kim)
  { type: 'tien_cap', tier: 2, step: 7, res: 'manh_bt_tu',  amt: 200 }, // 7 sao (Tử)
];