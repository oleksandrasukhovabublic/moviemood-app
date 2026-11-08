import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import styles from '../Header/Header.module.css';

// Аватар авторизованого користувача з випадним меню (профіль / вийти)
export default function UserMenu({ user, onProfile, onLogout }) {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const ua = language === 'ua';

  useEffect(() => {
    const closeMenu = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button
        className={styles.userAvatar}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={ua ? 'Меню користувача' : 'User menu'}
      >
        {user.avatar ? <img src={user.avatar} alt="" /> : user.initials}
        <span />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.identity}>
            <strong>{user.name}</strong>
            <small>{user.handle}</small>
          </div>

          <button
            onClick={() => {
              onProfile();
              setOpen(false);
            }}
          >
            ○ {ua ? 'Профіль' : 'Profile'}
          </button>

          <button
            className={styles.logout}
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
          >
            ↗ {t('auth.logout')}
          </button>
        </div>
      )}
    </div>
  );
}
