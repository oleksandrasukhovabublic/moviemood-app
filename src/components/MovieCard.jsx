import './MovieCard.css';

const uaTitles = {
  1: 'Паралельні життя',
  2: 'Протокол «Шторм»',
  3: 'Сонячні години',
  4: 'Неоновий лабіринт',
  5: 'Літнє цвітіння',
  6: 'Розколоте небо',
  7: 'Останній картограф',
  8: 'Кінетика',
  9: 'Золота година',
  10: 'Опівнічна частота',
};

const uaGenres = {
  Drama: 'Драма',
  Romance: 'Романтика',
  Thriller: 'Трилер',
  Action: 'Екшн',
  Comedy: 'Комедія',
  'Sci-Fi': 'Фантастика',
  Mystery: 'Детектив',
  Adventure: 'Пригоди',
  Crime: 'Кримінал',
};

export function movieTitle(movie, language = 'ua') {
  return language === 'ua' ? (uaTitles[movie.id] ?? movie.title) : movie.title;
}

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
    <article className="movie-card">
      <div
        className="movie-card__poster"
        onClick={() => onOpenMovie && onOpenMovie(movie)}
        onKeyDown={openWithKeyboard}
        role="button"
        tabIndex={0}
      >
        <img
          src={movie.poster}
          alt={`${ua ? 'Постер фільму' : 'Poster for'} ${movieTitle(movie, language)}`}
        />

        <div className="movie-card__shade" />

        <span className="movie-card__rating">★ {movie.rating}</span>

        <div className="movie-card__details">
          <p>{movie.plot || movie.description}</p>
          <span>
            {movie.runtime || movie.duration || 120} {ua ? 'хв' : 'min'}
            {movie.cast && movie.cast.length > 0 ? ` · ${movie.cast.slice(0, 2).join(', ')}` : ''}
          </span>
        </div>

        <div className="movie-card__actions">
          <button
            className={`icon-button ${isFavorite ? 'icon-button--favorite' : ''}`}
            aria-pressed={isFavorite}
            title={ua ? 'Улюблене' : 'Favorite'}
            onClick={(event) => {
              event.stopPropagation();
              if (onFavorite) onFavorite(movie);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="icon-svg"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <button
            className={`icon-button ${isWatchlisted ? 'icon-button--watchlist' : ''}`}
            aria-pressed={isWatchlisted}
            title={ua ? 'Хочу подивитися' : 'Watchlist'}
            onClick={(event) => {
              event.stopPropagation();
              if (onWatchlist) onWatchlist(movie);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="icon-svg"
              fill={isWatchlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="movie-card__meta">
        <div>
          <h3>{movieTitle(movie, language)}</h3>
          <p>
            {movie.year} · {ua ? (uaGenres[mainGenre] ?? mainGenre) : mainGenre}
          </p>
        </div>

        <button aria-label={ua ? 'Більше дій' : 'More actions'}>•••</button>
      </div>
    </article>
  );
}
