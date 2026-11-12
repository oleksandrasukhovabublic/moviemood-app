// Спільні константи застосунку
export const STORAGE_KEYS = {
  token: 'moviemood-token',
  theme: 'moviemood-theme',
  language: 'moviemood-language',
};

export const LANGUAGES = ['ua', 'en'];
export const DEFAULT_LANGUAGE = 'ua';

export const PASSWORD_MIN_LENGTH = 6;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Подія, яку api.js відправляє, коли сервер відповів 401 на запит із токеном
export const AUTH_EXPIRED_EVENT = 'moviemood:auth-expired';

// Демо-акаунт, який створює сервер при першому запуску
export const DEMO_ACCOUNT = { email: 'demo@moviemood.com', password: 'demo1234' };
