import { formatMovieRuntime } from '../../../utils/formatMovieRuntime';
import { formatRating } from '../../../utils/formatRating';
import styles from './MovieMetadata.module.css';

// Рядок фактів у шапці: рейтинг, рік, тривалість, жанри
export default function MovieMetadata({ movie, language }) {
  return (
    <div className={styles.root}>
      <strong>★ {formatRating(movie.rating)}</strong>
      <span>{movie.year}</span>
      <span>{formatMovieRuntime(movie.runtime, language)}</span>
      <span>{movie.genres.join(' · ')}</span>
    </div>
  );
}
