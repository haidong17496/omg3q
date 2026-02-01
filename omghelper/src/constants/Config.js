// src/constants/Config.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOTSTRAP_URL = "https://raw.githubusercontent.com/haidong17496/omg3q-helper-assets/main/remote_config.json";

export const CONFIG = {
  GITHUB: {
    BASE_URL: "https://raw.githubusercontent.com/haidong17496/omg3q-helper-assets/main",
    UPGRADE_DB_JSON: "",
    GALLERY_DATA_JSON: "",
    VERSION_JSON: "",
  },
  STORAGE_KEYS: {
    DB_VERSION: 'local_db_version_v1',
    GALLERY_DATA: 'gallery_data_v1',
    GALLERY_VERSION: 'data_version_v1',
    REMOTE_CONFIG: 'remote_app_config'
  },
  APP: {
    DEFAULT_IMAGE_EXT: 'webp',
  },

  PROGRESSION: {} 
};

export const getAssetUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${CONFIG.GITHUB.BASE_URL}/${cleanPath}`;
};

/**
 * Helper: Lấy lộ trình phù hợp cho một Category Code
 */
export const getPathForCategory = (catCode) => {
  if (CONFIG.PROGRESSION[catCode]) return CONFIG.PROGRESSION[catCode];
  // Nếu là Gear/Accessory/Treasure/Handbook -> Dùng lộ trình Gear chung
  const gearCats = ['equipment', 'accessory', 'treasure', 'handbook'];
  if (gearCats.includes(catCode)) return CONFIG.PROGRESSION['default_gear'];
  return null;
};

export const fetchRemoteConfig = async () => {
  try {
    const res = await fetch(`${BOOTSTRAP_URL}?t=${Date.now()}`);
    if (!res.ok) throw new Error("Cảnh báo: Không thể tải cấu hình từ xa");
    
    const remote = await res.json();
    const { user, repo, branch } = remote.github;
    const remoteBaseUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}`;

    CONFIG.GITHUB.BASE_URL = remoteBaseUrl;
    CONFIG.GITHUB.UPGRADE_DB_JSON = `${remoteBaseUrl}/upgrade_db.json`;
    CONFIG.GITHUB.GALLERY_DATA_JSON = `${remoteBaseUrl}/data.json`;
    CONFIG.GITHUB.VERSION_JSON = `${remoteBaseUrl}/version.json`;
    
    // Nạp lộ trình vào bộ nhớ Runtime
    if (remote.progression_paths) {
      CONFIG.PROGRESSION = remote.progression_paths;
    }

    if (remote.app_config) {
        CONFIG.APP.DEFAULT_IMAGE_EXT = remote.app_config.default_ext || 'webp';
    }

    await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.REMOTE_CONFIG, JSON.stringify(remote));
    console.log("🚀 [Config] Remote Config loaded.");
    return true;
  } catch (error) {
    const saved = await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.REMOTE_CONFIG);
    if (saved) {
        const remote = JSON.parse(saved);
        const { user, repo, branch } = remote.github;
        CONFIG.GITHUB.BASE_URL = `https://raw.githubusercontent.com/${user}/${repo}/${branch}`;
        if (remote.progression_paths) CONFIG.PROGRESSION = remote.progression_paths;
    }
    return false;
  }
};