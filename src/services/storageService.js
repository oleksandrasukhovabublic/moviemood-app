import { STORAGE_KEYS } from '../utils/constants';

// Обгортка над localStorage: не падає, якщо сховище недоступне (приватний режим тощо)
const safe = (action, fallback = null) => {
  try {
    return action();
  } catch {
    return fallback;
  }
};

export const storageService = {
  get: (key) => safe(() => window.localStorage.getItem(key)),
  set: (key, value) => safe(() => window.localStorage.setItem(key, value)),
  remove: (key) => safe(() => window.localStorage.removeItem(key)),

  // токен сесії: завдяки йому сайт «памʼятає» акаунт після перезавантаження сторінки
  getToken: () => storageService.get(STORAGE_KEYS.token),
  setToken: (token) => storageService.set(STORAGE_KEYS.token, token),
  clearToken: () => storageService.remove(STORAGE_KEYS.token),
};
