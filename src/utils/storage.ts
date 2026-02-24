import { LogEntry, Settings } from '../types';

export const STORE_KEY = 'ai-brainstorm-logs';
export const SETTINGS_KEY = 'ai-brainstorm-settings';

export const defaultSettings: Settings = { logMode: 'all', autoSave: true };

export const loadLogs = (): LogEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveLogs = (l: LogEntry[]): boolean => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(l));
    return true;
  } catch {
    return false;
  }
};

export const loadSettings = (): Settings => {
  try {
    return { ...defaultSettings, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = (s: Settings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch {}
};

/**
 * すべてのサイトデータ（LocalStorage, IndexedDB, Cache, Service Workers）を削除し、
 * ブラウザの「Clear site data」ボタンと同じ状態にしてアプリを初期化します。
 */
export const clearAllData = async (): Promise<void> => {
  if (
    window.confirm(
      'すべての設定、履歴、キャッシュ、保存されたデータを完全に削除して初期状態に戻しますか？',
    )
  ) {
    // 1. LocalStorage & SessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // 2. IndexedDB (もし使われていれば)
    if (window.indexedDB && window.indexedDB.databases) {
      const dbs = await window.indexedDB.databases();
      dbs.forEach((db) => {
        if (db.name) window.indexedDB.deleteDatabase(db.name);
      });
    }

    // 3. Cache API
    if (window.caches) {
      const keys = await window.caches.keys();
      await Promise.all(keys.map((key) => window.caches.delete(key)));
    }

    // 4. Service Workers
    if (window.navigator && navigator.serviceWorker) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((reg) => reg.unregister()));
    }

    // 5. リロードして完了
    window.location.reload();
  }
};

export const exportJSON = (data: unknown, fn: string): void => {
  const b = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const u = URL.createObjectURL(b);
  Object.assign(document.createElement('a'), { href: u, download: fn }).click();
  URL.revokeObjectURL(u);
};
