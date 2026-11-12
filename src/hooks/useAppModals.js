import { useContext } from 'react';
import { ModalContext } from '../context/contexts';

// { openAuth, closeAuth, openEditProfile, closeEditProfile }
export function useAppModals() {
  const value = useContext(ModalContext);
  if (!value) throw new Error('useAppModals потрібно викликати всередині <ModalProvider>');
  return value;
}
