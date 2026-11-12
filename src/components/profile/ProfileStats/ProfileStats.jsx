import styles from './ProfileStats.module.css';

export default function ProfileStats({ favorites, watchlist, collections, language }) {
  const ua = language === 'ua';

  return (
    <div className={styles.root}>
      <div>
        <strong>{favorites}</strong>
        <span>{ua ? 'Вподобано' : 'Favorites'}</span>
      </div>

      <div>
        <strong>{watchlist}</strong>
        <span>{ua ? 'У списку' : 'Watchlist'}</span>
      </div>

      <div>
        <strong>{collections}</strong>
        <span>{ua ? 'Добірок' : 'Collections'}</span>
      </div>
    </div>
  );
}
