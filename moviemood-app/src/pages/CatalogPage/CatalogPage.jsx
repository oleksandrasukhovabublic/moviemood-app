import { useMemo, useState } from 'react';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import FilterPanel from '../../components/filters/FilterPanel/FilterPanel';
import CollectionDrawer from '../../components/modals/CollectionDrawer/CollectionDrawer';
import MovieGrid from '../../components/movie/MovieGrid/MovieGrid';
import { initialCollections } from '../../data/collections';
import { filterMovies } from '../../utils/filterMovies';
import { sortMovies } from '../../utils/sortMovies';
import styles from './CatalogPage.module.css';

const defaultFilters = {
  mood: 'all',
  genre: 'all',
  year: 1990,
  rating: 6,
  sort: 'popular',
};

export default function CatalogPage({
  movies,
  favoriteIds,
  watchlistIds,
  onFavorite,
  onWatchlist,
  onOpenMovie,
  language,
  collections = initialCollections,
}) {
  const ua = language === 'ua';

  const [filters, setFilters] = useState(defaultFilters);
  const [drawerMovie, setDrawerMovie] = useState(null);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const filtered = useMemo(
    () => sortMovies(filterMovies(movies, filters), filters.sort),
    [movies, filters]
  );

  return (
    <main className={`${styles.root} section-wrap`}>
      <header className={styles.heading}>
        <span className="eyebrow">{ua ? 'ЗНАЙДИ СВОЮ ІСТОРІЮ' : 'FIND YOUR STORY'}</span>

        <h1>{ua ? 'Каталог фільмів' : 'Movie catalog'}</h1>

        <p>
          {ua ? 'Фільтруй за настроєм, жанром і рейтингом.' : 'Filter by mood, genre and rating.'}
        </p>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <FilterPanel
            filters={filters}
            onChange={updateFilter}
            foundCount={filtered.length}
            language={language}
          />
        </aside>

        <div className={styles.results}>
          <MovieGrid
            movies={filtered}
            variant="catalog"
            favoriteIds={favoriteIds}
            watchlistIds={watchlistIds}
            onFavorite={onFavorite}
            onWatchlist={onWatchlist}
            onOpenMovie={onOpenMovie}
            language={language}
            itemClassName={styles.card}
            renderExtra={(movie) => (
              <button className={styles.collectionAction} onClick={() => setDrawerMovie(movie)}>
                ＋ {ua ? 'До добірки' : 'Add to collection'}
              </button>
            )}
          />

          {!filtered.length && (
            <EmptyState
              title={ua ? 'Нічого не знайдено' : 'No movies found'}
              text={ua ? 'Спробуй змінити фільтри.' : 'Try adjusting the filters.'}
            />
          )}
        </div>
      </div>

      {drawerMovie && (
        <CollectionDrawer
          movie={drawerMovie}
          collections={collections}
          language={language}
          onClose={() => setDrawerMovie(null)}
        />
      )}
    </main>
  );
}
