// src/database/data/god_weapon.js

// 1. Hàm tạo dữ liệu TIẾN CẤP (+1 -> +10)
const genTienCap = (qual) => {
  const daAmts = [360, 720, 1200, 1600, 2000, 2500, 3000, 3500, 4000, 5000];
  const tbCons = [1, 1, 1, 2, 2, 4, 4, 6, 6, 8];
  return daAmts.map((amt, i) => ([
    { type: 'tien_cap', quality: qual, tier: 0, step: i + 1, res: 'da_dp_tb', amt },
    { type: 'tien_cap', quality: qual, tier: 0, step: i + 1, res: 'tb_con', amt: tbCons[i] }
  ])).flat();
};

// 2. Hàm tạo dữ liệu ĐỘT PHÁ ĐỎ & TĂNG KIM
const genDoAndKim = (qual, dpCons, kimCons) => {
  const data = [];
  
  // FIX ĐỘT PHÁ ĐỎ: Gom hết về Tier 0, Step từ 1 -> 3 để hiện chung 1 bảng
  if (qual !== 'do') {
    const dpDaAmts = [4, 8, 16]; 
    dpDaAmts.forEach((amt, i) => {
      data.push({ type: 'dot_pha_do', quality: qual, tier: 0, step: i + 1, res: 'tinh_thach_lv1', amt });
      data.push({ type: 'dot_pha_do', quality: qual, tier: 0, step: i + 1, res: 'tb_con', amt: dpCons[i] });
    });
  }

  // Tăng kim (5 cấp)
  const kimDaAmts = [4, 8, 16, 32, 64];
  kimDaAmts.forEach((amt, i) => {
    data.push({ type: 'kim', quality: qual, tier: 0, step: i + 1, res: 'tinh_thach_lv1', amt });
    data.push({ type: 'kim', quality: qual, tier: 0, step: i + 1, res: 'tb_con', amt: kimCons[i] });
  });
  
  return data;
};

// 3. Hàm tạo dữ liệu ÁM KIM & TỬ KIM
const genAmTu = (qual, amCons, tuCons) => {
  const data = [];
  
  // Ám kim (5 tầng, mỗi tầng 5 bậc)
  const amNlBases = [40, 120, 200, 320, 440];
  const amNlSteps = [40, 40, 60, 60, 60];
  amNlBases.forEach((base, t) => {
    for (let s = 1; s <= 5; s++) {
      data.push({ type: 'am_kim', quality: qual, tier: t, step: s, res: 'da_am_tb', amt: base + (s - 1) * amNlSteps[t] });
      if (s === 5) {
        data.push({ type: 'am_kim', quality: qual, tier: t, step: s, res: 'tb_con', amt: amCons[t] });
      }
    }
  });

  // Tử kim (3 tầng, 8 bậc)
  const tuNlBases = [50, 100, 150];
  tuNlBases.forEach((base, t) => {
    for (let s = 1; s <= 8; s++) {
      data.push({ type: 'tu_kim', quality: qual, tier: t, step: s, res: 'da_tu_tb', amt: base * s });
      
      if (s === 8) {
        const count = tuCons[t];
        data.push({ 
          type: 'tu_kim', quality: qual, tier: t, step: s, res: 'tb_con', 
          amt: (count && count > 0) ? count : -1 
        });
      }
    }
  });

  return data;
};

// 4. Hàm tạo dữ liệu THÁI KIM & BÀN KIM
const genThaiBan = () => {
  const data = [];
  
  // Thái Kim (3 tầng, 8 bậc)
  const thaiBase = [60, 120, 180];
  const thaiH4 = [1, 3, 8];
  const thaiH8 = [2, 5, 11];
  thaiBase.forEach((base, t) => {
    for (let s = 1; s <= 8; s++) {
      data.push({ type: 'thai_kim', quality: 'common', tier: t, step: s, res: 'cuu_chuyen_tt', amt: base * s });
      if (s === 4) data.push({ type: 'thai_kim', quality: 'common', tier: t, step: s, res: 'lo_bat_quai', amt: thaiH4[t] });
      if (s === 8) data.push({ type: 'thai_kim', quality: 'common', tier: t, step: s, res: 'lo_bat_quai', amt: thaiH8[t] });
    }
  });

  // Bàn Kim (3 tầng, 8 bậc)
  const banBase = [75, 150, 225];
  banBase.forEach((base, t) => {
    for (let s = 1; s <= 8; s++) {
      data.push({ type: 'ban_kim', quality: 'common', tier: t, step: s, res: 'minh_tinh_tl', amt: base * s });
      if (s === 4) data.push({ type: 'ban_kim', quality: 'common', tier: t, step: s, res: 'luu_ly_bn', amt: thaiH4[t] });
      if (s === 8) data.push({ type: 'ban_kim', quality: 'common', tier: t, step: s, res: 'luu_ly_bn', amt: thaiH8[t] });
    }
  });

  return data;
};

// XUẤT DỮ LIỆU TỔNG HỢP
export const godWeaponData = [
  ...genTienCap('hiem'),
  ...genDoAndKim('hiem', [8, 14, 18], [6, 10, 16, 20, 27]),
  ...genAmTu('hiem', [8, 12, 18, 23, 33], [0, 0, 0]), 
  
  ...genTienCap('hot'),
  ...genDoAndKim('hot', [2, 4, 4], [4, 6, 10, 12, 16]),
  ...genAmTu('hot', [5, 8, 11, 14, 18], [7, 12, 17]),

  ...genTienCap('do'),
  ...genDoAndKim('do', [], [2, 4, 6, 8, 10]),
  ...genAmTu('do', [3, 5, 7, 9, 11], [7, 12, 17]),

  ...genThaiBan()
];