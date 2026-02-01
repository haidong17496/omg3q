// src/database/data/index.js
// QUAN TRỌNG: Phải có đuôi .js Node mới hiểu
import { masterData } from './master.js';
import { resources } from './resources.js';
import { generalsCommon } from './generals/common.js';
import { generalsDo } from './generals/do.js';
import { generalsSpecific } from './generals/specific.js';
import { generalsDanhTuong } from './generals/danh_tuong.js';
import { equipmentData } from './equipment.js';
import { accessoryData } from './accessory.js';
import { treasureData } from './treasure.js';
import { petData } from './pet.js';
import { godWeaponData } from './god_weapon.js';
import { handbookData } from './handbook.js';
import { militarySealData } from './military_seal.js';
import { militaryBookData } from './military_book.js';
import { soulStoneData } from './soul_stone.js';

// Helper cho Tướng (Category 1)
const mapGeneral = (type, quality, arr) => arr.map(i => ({
  catId: 1, type, quality, tier: i[0], step: i[1], res: i[2], amt: i[3]
}));

// Helper cho Thần Binh (Category 6)
const mapGodWeapon = (arr) => arr.map(item => ({
  ...item,
  catId: 6
}));

// Helper cho các loại khác
const mapCommon = (catId, arr) => arr.map(item => ({
  ...item,
  catId,
  quality: 'common' 
}));

export const ALL_REAL_DATA = {
  ...masterData,
  resources,
  upgradeData: [
    ...mapGeneral('kim', 'common', generalsCommon.filter(d => ['tang_kim_don', 'kim_hon_tuong'].includes(d[2]))),
    ...mapGeneral('am_kim', 'common', generalsCommon.filter(d => ['am_kim_chan_quyet', 'long_hon'].includes(d[2]))),
    ...mapGeneral('tu_kim', 'common', generalsCommon.filter(d => ['tinh_hoa_tu_kim', 'da_hon_tu_kim'].includes(d[2]))),
    ...mapGeneral('thai_kim', 'common', generalsCommon.filter(d => ['tien_ho_lo', 'long_hon_dien'].includes(d[2]))),
    ...mapGeneral('ban_kim', 'common', generalsCommon.filter(d => ['tinh_binh_cam_lo', 'luyen_tuy_kim_don'].includes(d[2]))),
    ...mapGeneral('luu_kim', 'common', generalsCommon.filter(d => ['xich_diem_hoa_lien', 'dia_mach_long_tinh'].includes(d[2]))),
    ...mapGeneral('tien_cap', 'do', generalsDo.tien_cap),
    ...mapGeneral('dot_pha_do', 'do', generalsDo.dot_pha_do),
    ...mapGeneral('chan', 'do', generalsDo.chan),
    ...mapGeneral('tien_cap', 'danh_tuong', generalsDanhTuong.tien_cap),
    ...mapGeneral('dot_pha_do', 'danh_tuong', generalsDanhTuong.dot_pha_do),
    ...mapGeneral('chan', 'danh_tuong', generalsDanhTuong.chan),
    ...mapGeneral('tien_cap', 'tc10', generalsSpecific.tc10.tien_cap),
    ...mapGeneral('dot_pha_cam', 'tc10', generalsSpecific.tc10.dot_pha_cam),
    ...mapGeneral('dot_pha_do', 'tc10', generalsSpecific.tc10.dot_pha_do),
    ...mapGeneral('chan', 'tc10', generalsSpecific.tc10.chan),
    ...mapGeneral('tien_cap', 'hiem', generalsSpecific.hiem.tien_cap),
    ...mapGeneral('dot_pha_cam', 'hiem', generalsSpecific.hiem.dot_pha_cam),
    ...mapGeneral('dot_pha_do', 'hiem', generalsSpecific.hiem.dot_pha_do),
    ...mapGeneral('chan', 'hiem', generalsSpecific.hiem.chan),
    ...mapGeneral('tien_cap', 'hot', generalsSpecific.hot.tien_cap),
    ...mapGeneral('dot_pha_cam', 'hot', generalsSpecific.hot.dot_pha_cam),
    ...mapGeneral('dot_pha_do', 'hot', generalsSpecific.hot.dot_pha_do),
    ...mapGeneral('chan', 'hot', generalsSpecific.hot.chan),
    ...mapGodWeapon(godWeaponData),
    ...mapCommon(2, equipmentData),
    ...mapCommon(3, accessoryData),
    ...mapCommon(4, treasureData),
    ...mapCommon(5, petData),
    ...mapCommon(7, handbookData),
    ...mapCommon(8, militarySealData),
    ...mapCommon(9, militaryBookData),
    ...mapCommon(11, soulStoneData)
  ]
};