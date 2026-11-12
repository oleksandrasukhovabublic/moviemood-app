import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../hooks/useToast';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import { AUTH_EXPIRED_EVENT } from '../utils/constants';
import { AuthContext } from './contexts';

// Стани сесії: 'loading' (перевіряємо збережений токен) → 'authenticated' | 'guest'
export function AuthProvider({ children }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(() => (storageService.getToken() ? 'loading' : 'guest'));

  // Відновлення сесії: якщо в браузері є токен, питаємо сервер, чий він
  useEffect(() => {
    if (!storageService.getToken()) return undefined;

    const controller = new AbortController();
    authService
      .getCurrentUser({ signal: controller.signal })
      .then((currentUser) => {
        setUser(currentUser);
        setStatus('authenticated');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        // 401 — токен недійсний (його вже стерто в обробнику події нижче);
        // інші помилки (сервер вимкнений) — просто працюємо як гість, токен лишається
        setUser(null);
        setStatus('guest');
      });

    return () => controller.abort();
  }, []);

  // api.js повідомляє, що сервер відхилив токен → виходимо з акаунта
  useEffect(() => {
    const handleExpired = () => {
      storageService.clearToken();
      setUser(null);
      setStatus('guest');
      showToast(t('auth.sessionExpired'), 'error');
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, handleExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleExpired);
  }, [showToast, t]);

  const startSession = useCallback(({ token, user: nextUser }) => {
    storageService.setToken(token);
    setUser(nextUser);
    setStatus('authenticated');
    return nextUser;
  }, []);

  const login = useCallback(
    async (credentials) => startSession(await authService.login(credentials)),
    [startSession]
  );

  const register = useCallback(
    async (data) => startSession(await authService.register(data)),
    [startSession]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // навіть якщо сервер недоступний, локально з акаунта виходимо
    }
    storageService.clearToken();
    setUser(null);
    setStatus('guest');
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      isAuthenticated: status === 'authenticated',
      isLoading: status === 'loading',
      login,
      register,
      logout,
      updateUser: setUser,
    }),
    [user, status, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
