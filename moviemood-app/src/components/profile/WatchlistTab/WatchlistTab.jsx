import SectionHeading from '../../common/SectionHeading/SectionHeading';
import MovieGrid from '../../movie/MovieGrid/MovieGrid';
import ProfileContent from '../ProfileContent/ProfileContent';
import styles from './WatchlistTab.module.css';

export default function WatchlistTab({
  movies,
  watchedIds,
  onToggleWatched,
  language,
  ...gridProps
}) {
  const ua = language === 'ua';

  return (
    <ProfileContent>
      <SectionHeading
        eyebrow={ua ? 'НА НАСТУПНИЙ ВЕЧІР' : 'FOR YOUR NEXT NIGHT'}
        title={ua ? 'Заплановані' : 'Watchlist'}
      />

      <MovieGrid
        movies={movies}
        language={language}
        {...gridProps}
        renderExtra={(movie) => (
          <label className={styles.watchedToggle}>
            <input
              type="checkbox"
              checked={watchedIds.includes(movie.id)}
              onChange={() => onToggleWatched(movie.id)}
            />

            <span />
            {ua ? 'Переглянуто' : 'Watched'}
          </label>
        )}
      />
    </ProfileContent>
  );
}
