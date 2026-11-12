import { useContext } from 'react';
import { ToastContext } from '../context/contexts';

// showToast('текст', 'success' | 'error' | 'info')
export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error('useToast потрібно викликати всередині <ToastProvider>');
  return value;
}
