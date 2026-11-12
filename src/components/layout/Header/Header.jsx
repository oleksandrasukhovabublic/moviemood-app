import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppModals } from '../../../hooks/useAppModals';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../hooks/useLanguage';
import { useMovieContext } from '../../../hooks/useMovieContext';
import { ROUTES } from '../../../router/routes';
import LanguageSwitcher from '../../language/LanguageSwitcher/LanguageSwitcher';
import SearchInput from '../../search/SearchInput/SearchInput';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import styles from './Header.module.css';

// Шапка: логотип, меню, пошук, мова, тема і блок користувача (увійти / аватар).
// Дані бере із контекстів, тому від App потрібна лише тема.
export default function Header({ theme, onToggleTheme, onLogout }) {
  const { language, setLanguage } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { search, setSearch } = useMovieContext();
  const { openAuth } = useAppModals();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ua = language === 'ua';

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link className={styles.brand} to={ROUTES.home} aria-label="MovieMood">
          <span className={styles.brandMark}>M</span>
          <span className={styles.brandName}>MovieMood</span>
        </Link>

        <Navigation language={language} />

        <div className={styles.actions}>
          <SearchInput
            value={search}
            onChange={setSearch}
            onFocus={() => {
              if (pathname !== ROUTES.catalog) {
                navigate(ROUTES.catalog);
              }
            }}
            placeholder={ua ? 'Пошук фільмів' : 'Search movies'}
          />

          <LanguageSwitcher language={language} onChange={setLanguage} />

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
            <UserMenu user={user} onProfile={() => navigate(ROUTES.profile)} onLogout={onLogout} />
          ) : (
            <button className={styles.authButton} onClick={openAuth}>
              {ua ? 'Увійти' : 'Sign in'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
