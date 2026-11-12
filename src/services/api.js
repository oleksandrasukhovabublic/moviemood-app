import { AUTH_EXPIRED_EVENT } from '../utils/constants';
import { storageService } from './storageService';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Єдина точка для всіх запитів: додає токен, JSON-заголовки та обробляє помилки
export async function apiRequest(path, { method = 'GET', body, signal } = {}) {
  const token = storageService.getToken();

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      headers: {
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('Не вдалося зʼєднатися із сервером', 0);
  }

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    // токен є, але сервер його не прийняв (сесія закінчилась) — повідомляємо AuthContext
    if (response.status === 401 && token && !path.startsWith('/auth/login')) {
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    throw new ApiError(data?.message || 'Помилка запиту', response.status);
  }
  return data;
}

export const api = {
  get: (path, options) => apiRequest(path, options),
  post: (path, body, options) => apiRequest(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => apiRequest(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => apiRequest(path, { ...options, method: 'DELETE' }),
};
