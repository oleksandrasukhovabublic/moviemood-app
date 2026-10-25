import { Fragment } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieGrid.module.css';

// variant: 'five' (головна, профіль) або 'catalog'
// itemClassName / renderExtra потрібні, коли під карткою є щось додаткове
export default function MovieGrid({
  movies,
  variant = 'five',
  favoriteIds,
  watchlistIds,
  onFavorite,
  onWatchlist,
  onOpenMovie,
  language,
  itemClassName,
  renderExtra,
}) {
  return (
    <div className={`${styles.grid} ${styles[variant]}`}>
      {movies.map((movie) => {
        const card = (
          <MovieCard
            movie={movie}
            isFavorite={favoriteIds.includes(movie.id)}
            isWatchlisted={watchlistIds.includes(movie.id)}
            onFavorite={onFavorite}
            onWatchlist={onWatchlist}
            onOpenMovie={onOpenMovie}
            language={language}
          />
        );

        if (!itemClassName && !renderExtra) {
          return <Fragment key={movie.id}>{card}</Fragment>;
        }

        return (
          <div className={itemClassName} key={movie.id}>
            {card}
            {renderExtra?.(movie)}
          </div>
        );
      })}
    </div>
  );
}
