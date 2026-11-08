import { useCallback, useMemo, useRef, useState } from 'react';
import Toast from '../components/common/Toast/Toast';
import { ToastContext } from './contexts';

const TOAST_LIFETIME = 3800;

// Короткі спливаючі повідомлення («Додано до улюблених», помилки сервера тощо)
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(1);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = 'info') => {
      const id = nextId.current++;
      setToasts((current) => [...current.slice(-3), { id, message, type }]);
      setTimeout(() => dismissToast(id), TOAST_LIFETIME);
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}
