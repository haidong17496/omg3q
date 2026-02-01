const genPetStar = (nlArr, conArr) => {
  return nlArr.map((nl, i) => {
    const step = i + 2; // Từ 2 sao
    const res = [
      { type: 'tien_cap', tier: 0, step, res: 'pet_sao_don', amt: nl }
    ];
    if (conArr[i] > 0) res.push({ type: 'tien_cap', tier: 0, step, res: 'pet_con', amt: conArr[i] });
    return res;
  }).flat();
};

const genPetKim = (tier, nl1Arr, nl2Arr, conAmt) => {
  const data = [];
  nl1Arr.forEach((amt, i) => {
    data.push({ type: 'kim', quality: 'hot', tier, step: i + 1, res: 'pet_kim_don', amt });
    data.push({ type: 'kim', quality: 'hot', tier, step: i + 1, res: 'tinh_nguyen_pet', amt: nl2Arr[i] });
  });
  data.push({ type: 'kim', quality: 'hot', tier, step: 5, res: 'pet_con', amt: conAmt });
  return data;
};

const genPetHigh = (type, tier, stepAmts, conAmt, resCode) => {
  const data = stepAmts.map((amt, i) => ({ type, quality: 'hot', tier, step: i + 1, res: resCode, amt }));
  data.push({ type, quality: 'hot', tier, step: 8, res: 'pet_con', amt: conAmt });
  return data;
};

export const petData = [
  ...genPetStar([400, 800, 1200, 1600, 2400, 3200], [0, 1, 2, 4, 6, 8]),
  
  // Đột phá cam
  { type: 'dot_pha_cam', tier: 0, step: 1, res: 'tinh_nguyen_pet', amt: 150 },
  { type: 'dot_pha_cam', tier: 0, step: 1, res: 'pet_con', amt: 2 },
  { type: 'dot_pha_cam', tier: 0, step: 2, res: 'tinh_nguyen_pet', amt: 300 },
  { type: 'dot_pha_cam', tier: 0, step: 2, res: 'pet_con', amt: 3 },
  { type: 'dot_pha_cam', tier: 0, step: 3, res: 'tinh_nguyen_pet', amt: 450 },
  { type: 'dot_pha_cam', tier: 0, step: 3, res: 'pet_con', amt: 4 },

  // Đột phá đỏ
  ...[600, 1200, 1800, 2400, 3000].map((amt, i) => [
    { type: 'dot_pha_do', tier: 0, step: i + 1, res: 'tinh_nguyen_pet', amt },
    { type: 'dot_pha_do', tier: 0, step: i + 1, res: 'pet_con', amt: [3, 3, 6, 6, 9][i] }
  ]).flat(),

  // 4. KIM
  ...genPetKim(0, [80, 160, 240, 320], [50, 70, 90, 110], 3),
  ...genPetKim(1, [240, 480, 720, 960], [70, 100, 130, 160], 6),
  ...genPetKim(2, [400, 800, 1200, 1600], [100, 150, 200, 250], 9),

  // 5. ÁM / TỬ / THÁI / BÀN
  ...genPetHigh('am_kim', 0, Array.from({length: 8}, (_, i) => (i + 1) * 75), 4, 'pet_am_linh'),
  ...genPetHigh('am_kim', 1, Array.from({length: 8}, (_, i) => (i + 1) * 150), 12, 'pet_am_linh'),
  ...genPetHigh('am_kim', 2, Array.from({length: 8}, (_, i) => (i + 1) * 200 + (i === 0 ? 0 : 0)), 20, 'pet_am_linh'), // Tier 3 Ám 200->1600
  
  ...genPetHigh('tu_kim', 0, Array.from({length: 8}, (_, i) => (i + 1) * 50), 7, 'pet_tu_linh'),
  ...genPetHigh('tu_kim', 1, Array.from({length: 8}, (_, i) => (i + 1) * 100), 21, 'pet_tu_linh'),
  ...genPetHigh('tu_kim', 2, Array.from({length: 8}, (_, i) => (i + 1) * 150), 35, 'pet_tu_linh'),

  ...genPetHigh('thai_kim', 0, Array.from({length: 8}, (_, i) => (i + 1) * 65), 9, 'pet_thai_linh'),
  ...genPetHigh('thai_kim', 1, Array.from({length: 8}, (_, i) => (i + 1) * 130), 27, 'pet_thai_linh'),
  ...genPetHigh('thai_kim', 2, Array.from({length: 8}, (_, i) => (i + 1) * 195), 45, 'pet_thai_linh'),

  ...genPetHigh('ban_kim', 0, Array.from({length: 8}, (_, i) => (i + 1) * 78), 10, 'pet_ban_linh'),
  ...genPetHigh('ban_kim', 1, Array.from({length: 8}, (_, i) => (i + 1) * 156), 32, 'pet_ban_linh'),
  ...genPetHigh('ban_kim', 2, Array.from({length: 8}, (_, i) => (i + 1) * 234), 45, 'pet_ban_linh'),
];