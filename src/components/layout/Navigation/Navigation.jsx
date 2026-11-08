import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import styles from '../Header/Header.module.css';

// Головне меню. NavLink сам підсвічує активний пункт; end — для «Головна» лише точна адреса «/».
export default function Navigation({ language }) {
  const ua = language === 'ua';

  const links = [
    { to: ROUTES.home, end: true, label: ua ? 'Головна' : 'Home' },
    { to: ROUTES.catalog, label: ua ? 'Каталог' : 'Catalog' },
    { to: ROUTES.profile, label: ua ? 'Профіль' : 'Profile' },
  ];

  return (
    <nav className={styles.navigation} aria-label={ua ? 'Головна навігація' : 'Main navigation'}>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
