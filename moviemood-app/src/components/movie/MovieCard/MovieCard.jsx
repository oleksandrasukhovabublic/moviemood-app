import { genreLabel, movieTitle } from '../../../utils/movieLocale';
import styles from './MovieCard.module.css';

export default function MovieCard({
  movie,
  isFavorite,
  isWatchlisted,
  onFavorite,
  onWatchlist,
  onOpenMovie,
  language = 'ua',
}) {
  const ua = language === 'ua';

  const openWithKeyboard = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onOpenMovie) onOpenMovie(movie);
    }
  };

  const mainGenre = movie.genres && movie.genres.length > 0 ? movie.genres[0] : 'Драма';

  return (
    <article className={styles.root}>
      <div
        className={styles.poster}
        onClick={() => onOpenMovie && onOpenMovie(movie)}
        onKeyDown={openWithKeyboard}
        role="button"
        tabIndex={0}
      >
        <img
          src={movie.poster}
          alt={`${ua ? 'Постер фільму' : 'Poster for'} ${movieTitle(movie, language)}`}
        />

        <div className={styles.shade} />

        <span className={styles.rating}>★ {movie.rating}</span>

        <div className={styles.details}>
          <p>{movie.plot || movie.description}</p>
          <span>
            {movie.runtime || movie.duration || 120} {ua ? 'хв' : 'min'}
            {movie.cast && movie.cast.length > 0 ? ` · ${movie.cast.slice(0, 2).join(', ')}` : ''}
          </span>
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.iconButton} ${isFavorite ? styles.favorite : ''}`}
            aria-pressed={isFavorite}
            title={ua ? 'Улюблене' : 'Favorite'}
            onClick={(event) => {
              event.stopPropagation();
              if (onFavorite) onFavorite(movie);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className={styles.iconSvg}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <button
            className={`${styles.iconButton} ${isWatchlisted ? styles.watchlist : ''}`}
            aria-pressed={isWatchlisted}
            title={ua ? 'Хочу подивитися' : 'Watchlist'}
            onClick={(event) => {
              event.stopPropagation();
              if (onWatchlist) onWatchlist(movie);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className={styles.iconSvg}
              fill={isWatchlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.meta}>
        <div>
          <h3>{movieTitle(movie, language)}</h3>
          <p>
            {movie.year} · {genreLabel(mainGenre, language)}
          </p>
        </div>

        <button aria-label={ua ? 'Більше дій' : 'More actions'}>•••</button>
      </div>
    </article>
  );
}
