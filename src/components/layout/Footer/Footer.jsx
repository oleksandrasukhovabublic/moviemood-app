import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { ROUTES } from '../../../router/routes';
import styles from './Footer.module.css';

export default function Footer() {
  const { t, language } = useLanguage();
  const ua = language === 'ua';

  return (
    <footer className={styles.root}>
      <div className={`${styles.inner} section-wrap`}>
        <div>
          <strong className={styles.brand}>MovieMood</strong>
          <p>{t('footer.tagline')}</p>
        </div>

        <nav className={styles.links} aria-label={ua ? 'Посилання' : 'Links'}>
          <Link to={ROUTES.home}>{ua ? 'Головна' : 'Home'}</Link>
          <Link to={ROUTES.catalog}>{ua ? 'Каталог' : 'Catalog'}</Link>
          <Link to={ROUTES.profile}>{ua ? 'Профіль' : 'Profile'}</Link>
        </nav>

        <small>
          © {new Date().getFullYear()} MovieMood · {t('footer.rights')}
        </small>
      </div>
    </footer>
  );
}
