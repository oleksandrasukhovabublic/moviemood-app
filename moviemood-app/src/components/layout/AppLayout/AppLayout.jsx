import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './AppLayout.module.css';

// Спільна «оболонка» всіх сторінок: фонове сяйво, шапка та місце для поточної сторінки.
export default function AppLayout(headerProps) {
  const { pathname } = useLocation();

  // Після кожного переходу прокручуємо вгору (як це робить звичайний сайт)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className={styles.shell}>
      <div className={`${styles.ambient} ${styles.purple}`} />
      <div className={`${styles.ambient} ${styles.red}`} />

      <Header {...headerProps} />

      {/* key = адреса: на кожній новій сторінці анімація появи програється знову */}
      <div className={styles.pageTransition} key={pathname}>
        <Outlet />
      </div>
    </div>
  );
}
