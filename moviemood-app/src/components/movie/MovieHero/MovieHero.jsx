import { movieTitle } from '../../../utils/movieLocale';
import MovieActions from '../MovieActions/MovieActions';
import MovieMetadata from '../MovieMetadata/MovieMetadata';
import styles from './MovieHero.module.css';

export default function MovieHero({
  movie,
  language,
  isFavorite,
  isWatchlisted,
  onBack,
  onFavorite,
  onWatchlist,
  onTrailer,
  onCollection,
}) {
  const ua = language === 'ua';

  return (
    <section className={styles.root} style={{ backgroundImage: `url(${movie.trailerBg})` }}>
      <div className={styles.shade} />

      <div className={`${styles.inner} section-wrap`}>
        <button className={styles.backButton} onClick={onBack}>
          ← {ua ? 'Назад' : 'Back'}
        </button>

        <img className={styles.poster} src={movie.poster} alt={movieTitle(movie, language)} />

        <div className={styles.intro}>
          <span className="eyebrow">{ua ? 'ВИБІР MOVIEMOOD' : 'MOVIEMOOD PICK'}</span>

          <h1>{movieTitle(movie, language)}</h1>

          <MovieMetadata movie={movie} language={language} />

          <p>{movie.plot}</p>

          <MovieActions
            isFavorite={isFavorite}
            isWatchlisted={isWatchlisted}
            onTrailer={onTrailer}
            onFavorite={onFavorite}
            onWatchlist={onWatchlist}
            onCollection={onCollection}
            language={language}
          />
        </div>
      </div>
    </section>
  );
}
