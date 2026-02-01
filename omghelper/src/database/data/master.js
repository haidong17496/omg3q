// src/database/data/master.js

export const masterData = {
  categories: [
    { 
      id: 1, code: 'general', name: 'Tướng', icon: 'chess-king', sort_order: 1,
      viewConfig: { 
        enableMatrix: true, enableGallery: true, defaultView: 'matrix',
        isSpecialTier: false, useStarLabel: false 
      },
      layoutConfig: { 
        default: 6, tien_cap: 5, dot_pha_cam: 5, chan: 5, kim: 4, am_kim: 4, tu_kim: 4 
      },
      galleryConfig: { 
        processorType: 'hybrid', 
        dataKey: 'tuong', 
        folder: 'tuong',
        groups: [
          { 
            code: 'thien_phu', name: 'THIÊN PHÚ', color: '#FFD700',
            match: { country: ['thien_phu', 'main'] } 
          },
          { 
            code: 'nguy', name: 'NGỤY QUỐC', color: '#409EFF', 
            match: { country: ['nguy'] } 
          },
          { 
            code: 'thuc', name: 'THỤC QUỐC', color: '#67C23A', 
            match: { country: ['thuc'] } 
          },
          { 
            code: 'ngo',  name: 'NGÔ QUỐC',  color: '#F56C6C', 
            match: { country: ['ngo'] } 
          },
          { 
            code: 'quan', name: 'QUẦN HÙNG', color: '#909399', 
            match: { country: ['quan'] } 
          }
        ]
      },
      filterConfig: { autoClose: false }
    },
    { 
      id: 2, code: 'equipment', name: 'Trang Bị', icon: 'sword', sort_order: 2,
      viewConfig: { enableMatrix: true, enableGallery: true, defaultView: 'matrix' },
      layoutConfig: { default: 4, kim: 5 },
      galleryConfig: { processorType: 'talent', dataKey: 'thien_phu_trang_bi' },
      filterConfig: { autoClose: false }
    },
    { 
      id: 3, code: 'accessory', name: 'Trang Sức', icon: 'horse-variant', sort_order: 3,
      viewConfig: { enableMatrix: true, enableGallery: true, defaultView: 'matrix' },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'talent', dataKey: 'thien_phu_trang_suc' },
      filterConfig: { autoClose: false }
    },
    { 
      id: 4, code: 'treasure', name: 'Bảo Vật', icon: 'book-open-variant', sort_order: 4,
      viewConfig: { enableMatrix: true, enableGallery: true, defaultView: 'matrix' },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'talent', dataKey: 'thien_phu_bao_vat' },
      filterConfig: { autoClose: false }
    },
    { 
      id: 5, code: 'pet', name: 'Pet', icon: 'paw', sort_order: 5,
      viewConfig: { enableMatrix: true, enableGallery: true, defaultView: 'matrix', useStarLabel: ['tien_cap'] },
      layoutConfig: { default: 4, tien_cap: 3, dot_pha_cam: 3 }, 
      galleryConfig: { processorType: 'talent', dataKey: 'thien_phu_pet' },
      filterConfig: { autoClose: false }
    },
    { 
      id: 6, code: 'god_weapon', name: 'Thần Binh', icon: 'sword-cross', sort_order: 6,
      viewConfig: { enableMatrix: true, enableGallery: true, defaultView: 'matrix' },
      layoutConfig: { default: 4, dot_pha_do: 3, tien_cap: 5 },
      galleryConfig: { processorType: 'talent', dataKey: 'thien_phu_than_binh' },
      filterConfig: { 
        autoClose: false,
        qualityAlias: { hiem: 'TB 15', hot: 'TB 18', do: 'TB 20' }
      }
    },
    { 
      id: 7, code: 'handbook', name: 'Cẩm Nang', icon: 'script-text', sort_order: 7,
      viewConfig: { enableMatrix: true, enableGallery: true, defaultView: 'matrix', useStarLabel: ['tien_cap'] },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'talent', dataKey: 'cam_nang' },
      filterConfig: { autoClose: false }
    },
    { 
      id: 8, code: 'military_seal', name: 'Binh Phù', icon: 'medal', sort_order: 8,
      viewConfig: { 
        enableMatrix: true, enableGallery: true, defaultView: 'matrix',
        isSpecialTier: true, useStarLabel: true, maxLabel: "GHÉP",
        tierLabels: ["BINH PHÙ KIM", "BINH PHÙ ÁM KIM", "BINH PHÙ TỬ KIM"]
      },
      layoutConfig: { default: 6 },
      galleryConfig: { processorType: 'normal', dataKey: 'binh_phu', folder: 'binh_phu' },
      filterConfig: { autoClose: true }
    },
    { 
      id: 9, code: 'military_book', name: 'Binh Thư', icon: 'bookshelf', sort_order: 9,
      viewConfig: { 
        enableMatrix: true, enableGallery: true, defaultView: 'matrix',
        isSpecialTier: true, useStarLabel: true, maxLabel: "GHÉP",
        tierLabels: ["BINH THƯ KIM", "BINH THƯ ÁM KIM", "BINH THƯ TỬ KIM"]
      },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'normal', dataKey: 'binh_thu', folder: 'binh_thu' },
      filterConfig: { autoClose: true }
    },
    { 
      id: 10, code: 'costume', name: 'Trang Phục', icon: 'tshirt-crew', sort_order: 10,
      viewConfig: { enableMatrix: false, enableGallery: true, defaultView: 'gallery' },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'html_viewer', dataKey: 'costume', folder: 'skin' },
      filterConfig: { autoClose: true }
    },
    { 
      id: 11, code: 'soul_stone', name: 'Hồn Thạch', icon: 'diamond-stone', sort_order: 11,
      viewConfig: { 
        enableMatrix: true, enableGallery: true, defaultView: 'gallery',
        isSpecialTier: true, maxLabel: "GHÉP",
        tierLabels: ["HỒN THẠCH TÍM", "HỒN THẠCH CAM", "HỒN THẠCH ĐỎ"]
      },
      layoutConfig: { default: 5 },
      galleryConfig: { 
        processorType: 'normal', 
        dataKey: 'hon_thach', 
        folder: 'hon_thach',
        groups: [
          { code: 'do', name: 'PHẨM ĐỎ', color: '#FF4B2B', match: { quality: ['do'] } },
          { code: 'cam', name: 'PHẨM CAM', color: '#FF8C00', match: { quality: ['cam'] } },
          { code: 'tim', name: 'PHẨM TÍM', color: '#E066FF', match: { quality: ['tim'] } }
        ]
      },
      filterConfig: { autoClose: true }
    },
    { 
      id: 12, code: 'soul_jade', name: 'Hồn Ngọc', icon: 'pyramid', sort_order: 12,
      viewConfig: { enableMatrix: false, enableGallery: true, defaultView: 'gallery' },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'normal', dataKey: 'hon_ngoc', folder: 'hon_ngoc' },
      filterConfig: { autoClose: true }
    },
    { 
      id: 13, code: 'beauty_book', name: 'Sách Mỹ Nhân', icon: 'book-heart', sort_order: 13,
      viewConfig: { enableMatrix: false, enableGallery: true, defaultView: 'gallery' },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'normal', dataKey: 'sach_my_nhan', folder: 'smn' },
      filterConfig: { autoClose: true }
    },
    { 
      id: 14, code: 'divine_beast', name: 'Thần Thú', icon: 'dharmachakra', sort_order: 14,
      viewConfig: { enableMatrix: false, enableGallery: true, defaultView: 'gallery' },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'normal', dataKey: 'than_thu', folder: 'than_thu' },
      filterConfig: { autoClose: true }
    },
    { 
      id: 15, code: 'official_skill', name: 'Quan Kỹ', icon: 'seal-variant', sort_order: 15,
      viewConfig: { enableMatrix: false, enableGallery: true, defaultView: 'gallery' },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'normal', dataKey: 'quan_ky', folder: 'quan_ky' },
      filterConfig: { autoClose: true }
    },
    { 
      id: 16, code: 'other', name: 'Khác', icon: 'dots-horizontal', sort_order: 16,
      viewConfig: { enableMatrix: false, enableGallery: true, defaultView: 'gallery' },
      layoutConfig: { default: 4 },
      galleryConfig: { processorType: 'grouped_section', dataKey: 'other', folder: 'others' },
      filterConfig: { autoClose: true }
    },
  ],

  qualities: [
    { id: 1, code: 'common', name: 'Dùng Chung', color_code: '#FFFFFF', is_hero: 0 },
    { id: 2, code: 'tc10', name: 'TC 10', color_code: '#A1A1A1', is_hero: 1 },
    { id: 3, code: 'hiem', name: 'Hiếm', color_code: '#66BB6A', is_hero: 1 },
    { id: 4, code: 'hot', name: 'Hot', color_code: '#FF7043', is_hero: 1 },
    { id: 5, code: 'do', name: 'Đỏ', color_code: '#FF4B2B', is_hero: 1 },
    { id: 6, code: 'danh_tuong', name: 'Danh Tướng', color_code: '#FFD700', is_hero: 1 },
    { id: 7, code: 'tim', name: 'Tím', color_code: '#E066FF', is_hero: 0 }, 
    { id: 8, code: 'cam', name: 'Cam', color_code: '#FF8C00', is_hero: 0 },
    { id: 10, code: 'kim', name: 'Kim', color_code: '#f5ee1d', is_hero: 0 },
    { id: 11, code: 'am_kim', name: 'Ám Kim', color_code: '#cd8f67', is_hero: 0 },
    { id: 12, code: 'tu_kim', name: 'Tử Kim', color_code: '#d693c1', is_hero: 0 },
    { id: 13, code: 'thai_kim', name: 'Thái Kim', color_code: '#fcda76', is_hero: 0 },
    { id: 14, code: 'ban_kim', name: 'Bàn Kim', color_code: '#ccd7cd', is_hero: 0 },
    { id: 15, code: 'luu_kim', name: 'Lưu Kim', color_code: '#ffef6b', is_hero: 0 }
  ],
  
  upgradeTypes: [
    { id: 1, code: 'tien_cap', name: 'Tiến Cấp' },
    { id: 2, code: 'dot_pha_cam', name: 'Đột Phá Cam' },
    { id: 3, code: 'dot_pha_do', name: 'Đột Phá Đỏ' },
    { id: 4, code: 'chan', name: 'Giác Tỉnh' },
    { id: 5, code: 'kim', name: 'Kim' },
    { id: 6, code: 'am_kim', name: 'Ám Kim' },
    { id: 7, code: 'tu_kim', name: 'Tử Kim' },
    { id: 8, code: 'thai_kim', name: 'Thái Kim' },
    { id: 9, code: 'ban_kim', name: 'Bàn Kim' },
    { id: 10, code: 'luu_kim', name: 'Lưu Kim' }
  ]
};