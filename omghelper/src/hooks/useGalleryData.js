// src/hooks/useGalleryData.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/Config';
import { mapAssets, processTalentList, processHybridList } from '../utils/DataProcessor';

/**
 * Hook tải và xử lý dữ liệu hình ảnh/thiên phú từ GitHub.
 */
export function useGalleryData() {
  const [galleryData, setGalleryData] = useState({});

  /**
   * Bản đồ ánh xạ Folder đặc biệt (Nếu Key trong JSON khác với tên Folder trên GitHub)
   */
  const FOLDER_MAP = {
    'costume': 'skin',         // Key là costume -> Lấy ảnh trong folder skin
    'sach_my_nhan': 'smn',     // Key là sach_my_nhan -> Folder smn
    'other': 'others',         // Key là other -> Folder others
    'hon_ngoc': 'hon_ngoc',
    'than_thu': 'than_thu',
    'quan_ky': 'quan_ky'
  };

  const syncRemoteData = async () => {
    try {
      const response = await fetch(`${CONFIG.GITHUB.GALLERY_DATA_JSON}?t=${Date.now()}`);
      if (!response.ok) throw new Error("Không thể tải data.json");

      const remoteJson = await response.json();
      const localVersion = await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.GALLERY_VERSION);
      const defaultExt = remoteJson.config?.default_ext || CONFIG.APP.DEFAULT_IMAGE_EXT;

      // Ép App xử lý lại nếu có sự thay đổi logic (hoặc version mới)
      if (!localVersion || parseInt(remoteJson.version) > parseInt(localVersion) || __DEV__) {
        console.log(`🚚 [Gallery] Đang nạp dữ liệu từ GitHub...`);
        const processedData = {};

        Object.keys(remoteJson).forEach(key => {
          if (['config', 'version'].includes(key)) return;
          const rawList = remoteJson[key];
          if (!Array.isArray(rawList)) return;

          // 1. Xác định Folder thực tế trên GitHub
          const targetFolder = FOLDER_MAP[key] || key;

          // 2. Tự động nhận diện loại xử lý
          const isHybrid = (key === 'tuong');
          const firstItem = rawList[0];
          const isTalent = firstItem && (
            firstItem.layout_id || 
            firstItem.nodes || 
            key.includes('thien_phu') || 
            key.includes('cam_nang')
          );

          if (isHybrid) {
            processedData[key] = processHybridList(rawList, targetFolder, defaultExt);
          } else if (isTalent) {
            processedData[key] = processTalentList(rawList);
          } else {
            // Ảnh thường (Trang phục, Binh phù...) - Dùng targetFolder đã ánh xạ
            processedData[key] = mapAssets(rawList, targetFolder, defaultExt);
          }
        });

        await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.GALLERY_VERSION, remoteJson.version.toString());
        await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.GALLERY_DATA, JSON.stringify(processedData));
        setGalleryData(processedData);
        console.log("✅ [Gallery] Đã đồng bộ thành công!");
      }
    } catch (error) { 
      console.warn("⚠️ [GallerySync] Lỗi:", error.message); 
    }
  };

  useEffect(() => {
    async function init() {
      const saved = await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.GALLERY_DATA);
      if (saved) {
        try { setGalleryData(JSON.parse(saved)); } catch (e) {}
      }
      syncRemoteData();
    }
    init();
  }, []);

  return galleryData;
}