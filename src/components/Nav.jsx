import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { Language, Page, UserProfile } from '../App';

interface NavProps {
  page: Page;
  onNavigate: (page: Page) => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  isAuthenticated: boolean;
  profile: UserProfile;
  onAuth: () => void;
  onLogout: () => void;
}

export default function Nav(props: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const ua = props.language === 'ua';

  const links: { id: Page; label: string }[] = [
    { id: 'home', label: ua ? 'Головна' : 'Home' },
    { id: 'discover', label: ua ? 'Каталог' : 'Discover' },
    { id: 'profile', label: ua ? 'Профіль' : 'Profile' },
  ];

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', close);

    return () => {
      document.removeEventListener('mousedown', close);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__inner">
        <button
          className="brand"
          onClick={() => props.onNavigate('home')}
          aria-label="MovieMood"
        >
          <span className="brand__mark">M</span>
          <span className="brand__name">MovieMood</span>
        </button>

        <nav
          className="nav"
          aria-label={ua ? 'Головна навігація' : 'Main navigation'}
        >
          {links.map((link) => (
            <button
              key={link.id}
              className={`nav__link ${
                props.page === link.id ? 'nav__link--active' : ''
              }`}
              aria-current={props.page === link.id ? 'page' : undefined}
              onClick={() => props.onNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="header__actions">
          <label className="search">
            <span className="search__icon">⌕</span>
            <input
              value={props.search}
              onChange={(event) => props.setSearch(event.target.value)}
              onFocus={() =>
                props.page !== 'discover' && props.onNavigate('discover')
              }
              placeholder={ua ? 'Пошук фільмів' : 'Search movies'}
            />
          </label>

          <div className="language">
            <button
              onClick={() => props.setLanguage('ua')}
              className={`language__item ${
                ua ? 'language__item--active' : ''
              }`}
            >
              UA
            </button>

            <span />

            <button
              onClick={() => props.setLanguage('en')}
              className={`language__item ${
                !ua ? 'language__item--active' : ''
              }`}
            >
              EN
            </button>
          </div>

          {props.isAuthenticated ? (
            <div className="user-menu" ref={menuRef}>
              <button
                className="avatar"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-label={ua ? 'Відкрити меню користувача' : 'Open user menu'}
              >
                {props.profile.avatar ? (
                  <img src={props.profile.avatar} alt="" />
                ) : (
                  props.profile.initials
                )}
                <span className="avatar__status" />
              </button>

              {menuOpen && (
                <div className="user-menu__dropdown">
                  <div className="user-menu__identity">
                    <strong>{props.profile.name}</strong>
                    <span>{props.profile.handle}</span>
                  </div>

                  <button
                    onClick={() => {
                      props.onNavigate('profile');
                      setMenuOpen(false);
                    }}
                  >
                    ○ {ua ? 'Профіль' : 'Profile'}
                  </button>

                  <button
                    className="user-menu__logout"
                    onClick={() => {
                      props.onLogout();
                      setMenuOpen(false);
                    }}
                  >
                    ↗ {ua ? 'Вийти' : 'Log out'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="header__auth" onClick={props.onAuth}>
              {ua ? 'Увійти / Зареєструватися' : 'Sign in / Register'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
