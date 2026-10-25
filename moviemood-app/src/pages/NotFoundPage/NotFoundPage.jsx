import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage({ language = 'ua' }) {
  const ua = language === 'ua';

  return (
    <main className={`section-wrap ${styles.root}`}>
      <span className="eyebrow">{ua ? 'ПОМИЛКА' : 'ERROR'}</span>

      <strong className={styles.code}>404</strong>

      <h1>{ua ? 'Сторінку не знайдено' : 'Page not found'}</h1>

      <p>
        {ua
          ? 'Такої адреси не існує або фільм більше недоступний.'
          : 'This address does not exist or the movie is no longer available.'}
      </p>

      <div className={styles.actions}>
        <Link className="button button--primary" to={ROUTES.home}>
          {ua ? 'На головну' : 'Back to home'}
        </Link>

        <Link className="button button--glass" to={ROUTES.catalog}>
          {ua ? 'До каталогу' : 'Browse catalog'}
        </Link>
      </div>
    </main>
  );
}
