import styles from './MovieMetadata.module.css';

// Рядок фактів у шапці: рейтинг, рік, тривалість, жанри
export default function MovieMetadata({ movie, language }) {
  const ua = language === 'ua';

  return (
    <div className={styles.root}>
      <strong>★ {movie.rating}</strong>
      <span>{movie.year}</span>
      <span>
        {movie.runtime} {ua ? 'хв' : 'min'}
      </span>
      <span>{movie.genres.join(' · ')}</span>
    </div>
  );
}
