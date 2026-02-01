import * as SQLite from 'expo-sqlite';

const DB_NAME = 'omg3q_helper_v40.db';

// Mở database dạng Sync (hiệu năng cao cho Expo 50+)
export const db = SQLite.openDatabaseSync(DB_NAME);