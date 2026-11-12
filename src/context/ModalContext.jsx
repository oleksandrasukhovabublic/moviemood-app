import { useMemo } from 'react';
import AuthModal from '../components/modals/AuthModal/AuthModal';
import EditProfileModal from '../components/modals/EditProfileModal/EditProfileModal';
import { useModal } from '../hooks/useModal';
import { ModalContext } from './contexts';

// Глобальні вікна: вхід / реєстрація та редагування профілю.
// Їх можна відкрити звідки завгодно (кнопка в шапці, «лайк» гостя тощо).
export function ModalProvider({ children }) {
  const auth = useModal();
  const editProfile = useModal();

  const value = useMemo(
    () => ({
      openAuth: auth.open,
      closeAuth: auth.close,
      openEditProfile: editProfile.open,
      closeEditProfile: editProfile.close,
    }),
    [auth.open, auth.close, editProfile.open, editProfile.close]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {auth.isOpen && <AuthModal onClose={auth.close} />}
      {editProfile.isOpen && <EditProfileModal onClose={editProfile.close} />}
    </ModalContext.Provider>
  );
}
