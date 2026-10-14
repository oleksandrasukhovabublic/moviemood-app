import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';

export default function Header({
  page,
  onNavigate,
  search,
  setSearch,
  language,
  setLanguage,
  isAuthenticated,
  profile,
  onAuth,
  onLogout,
  theme,
  onToggleTheme,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const ua = language === 'ua';

  const links = [
    { id: 'home', label: ua ? 'Головна' : 'Home' },
    { id: 'catalog', label: ua ? 'Каталог' : 'Catalog' },
    { id: 'profile', label: ua ? 'Профіль' : 'Profile' },
  ];

  useEffect(() => {
    const closeMenu = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <button className={styles.brand} onClick={() => onNavigate('home')} aria-label="MovieMood">
          <span className={styles.brandMark}>M</span>
          <span className={styles.brandName}>MovieMood</span>
        </button>

        <nav
          className={styles.navigation}
          aria-label={ua ? 'Головна навігація' : 'Main navigation'}
        >
          {links.map((link) => (
            <button
              key={link.id}
              className={`${styles.navLink} ${page === link.id ? styles.navLinkActive : ''}`}
              aria-current={page === link.id ? 'page' : undefined}
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className={styles.actions}>
          <label className={styles.search}>
            <span className={styles.searchIcon}>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onFocus={() => {
                if (page !== 'catalog') {
                  onNavigate('catalog');
                }
              }}
              placeholder={ua ? 'Пошук фільмів' : 'Search movies'}
            />
          </label>

          <div className={styles.languageSwitcher} aria-label={ua ? 'Вибір мови' : 'Language'}>
            <button className={ua ? styles.active : ''} onClick={() => setLanguage('ua')}>
              UA
            </button>
            <span />
            <button className={!ua ? styles.active : ''} onClick={() => setLanguage('en')}>
              EN
            </button>
          </div>

          <button
            className={styles.themeToggle}
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark'
                ? ua
                  ? 'Увімкнути світлу тему'
                  : 'Switch to light theme'
                : ua
                  ? 'Увімкнути темну тему'
                  : 'Switch to dark theme'
            }
            title={
              theme === 'dark'
                ? ua
                  ? 'Світла тема'
                  : 'Light theme'
                : ua
                  ? 'Темна тема'
                  : 'Dark theme'
            }
          >
            <span className={styles.themeTrack}>
              <span className={styles.themeIcon}>{theme === 'dark' ? '☾' : '☀'}</span>
            </span>
          </button>

          {isAuthenticated ? (
            <div className={styles.userMenu} ref={menuRef}>
              <button
                className={styles.userAvatar}
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label={ua ? 'Меню користувача' : 'User menu'}
              >
                {profile?.avatar ? <img src={profile.avatar} alt="" /> : profile?.initials || 'СК'}
                <span />
              </button>

              {menuOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.identity}>
                    <strong>{profile?.name || 'Саша Коваль'}</strong>
                    <small>{profile?.handle || '@sasha.movies'}</small>
                  </div>

                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setMenuOpen(false);
                    }}
                  >
                    ○ {ua ? 'Профіль' : 'Profile'}
                  </button>

                  <button
                    className={styles.logout}
                    onClick={() => {
                      onLogout();
                      setMenuOpen(false);
                    }}
                  >
                    ↗ {ua ? 'Вийти' : 'Log out'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className={styles.authButton} onClick={onAuth}>
              {ua ? 'Увійти' : 'Sign in'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
