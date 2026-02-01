// src/database/data/handbook.js

// Tăng sao (Tiến cấp)
const genCnStar = () => {
  const nls = [120, 240, 360, 540, 720];
  const tuis = [1, 2, 2, 4, 6];
  return nls.map((amt, i) => ([
    { type: 'tien_cap', tier: 0, step: i + 1, res: 'cam_tu_ngoc', amt },
    { type: 'tien_cap', tier: 0, step: i + 1, res: 'tui_cam_nang', amt: tuis[i] }
  ])).flat();
};

// Tăng Kim (Bậc 1-7 NL, Bậc 8 Túi)
const genCnKim = () => {
  const data = [];
  const configs = [
    { base: 100, step: 10, tui: 2 },
    { base: 150, step: 20, tui: 4 },
    { base: 230, step: 40, tui: 7 }
  ];
  configs.forEach((cfg, t) => {
    for (let s = 1; s <= 7; s++) {
      data.push({ type: 'kim', tier: t, step: s, res: 'cn_kim_boi', amt: cfg.base + (s - 1) * cfg.step });
    }
    data.push({ type: 'kim', tier: t, step: 8, res: 'tui_cam_nang', amt: cfg.tui });
  });
  return data;
};

// Các bậc cao (Ám, Tử, Thái, Bàn)
const genCnHigh = (type, resCode, nlAmts, tuiAmts, soulAmts = []) => {
  const data = [];
  nlAmts.forEach((base, t) => {
    for (let s = 1; s <= 7; s++) {
      data.push({ type, tier: t, step: s, res: resCode, amt: base * s });
    }
    // Bậc 8
    data.push({ type, tier: t, step: 8, res: 'tui_cam_nang', amt: tuiAmts[t] });
    if (soulAmts.length > 0) {
      data.push({ type, tier: t, step: 8, res: 'am_kim_hon_cn', amt: soulAmts[t] });
    }
  });
  return data;
};

export const handbookData = [
  ...genCnStar(),
  ...genCnKim(),
  ...genCnHigh('am_kim', 'am_kim_phu', [30, 60, 90], [1, 2, 3], [2, 4, 7]),
  ...genCnHigh('tu_kim', 'lua_tu_kim', [40, 80, 150], [5, 10, 15]),
  ...genCnHigh('thai_kim', 'cam_long_ngoc', [40, 80, 150], [10, 20, 30]),
  ...genCnHigh('ban_kim', 'thien_ti_lăng', [40, 80, 150], [15, 30, 45]),
];