import styles from './MovieActions.module.css';

export default function MovieActions({
  isFavorite,
  isWatchlisted,
  onTrailer,
  onFavorite,
  onWatchlist,
  onCollection,
  language,
}) {
  const ua = language === 'ua';

  return (
    <div className={styles.root}>
      <button className="button button--primary" onClick={onTrailer}>
        ▶ {ua ? 'Дивитися трейлер' : 'Watch trailer'}
      </button>

      <button
        className={`${styles.action} ${isFavorite ? styles.activeHeart : ''}`}
        aria-pressed={isFavorite}
        onClick={onFavorite}
      >
        ♥ {ua ? 'Вподобати' : 'Like'}
      </button>

      <button
        className={`${styles.action} ${isWatchlisted ? styles.activeStar : ''}`}
        aria-pressed={isWatchlisted}
        onClick={onWatchlist}
      >
        ★ {ua ? 'В список' : 'Watchlist'}
      </button>

      <button className={styles.action} onClick={onCollection}>
        ＋ {ua ? 'До добірки' : 'Collection'}
      </button>
    </div>
  );
}
