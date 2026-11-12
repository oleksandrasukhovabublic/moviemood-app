import { useState } from 'react';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import FilterPanel from '../../components/filters/FilterPanel/FilterPanel';
import CollectionDrawer from '../../components/modals/CollectionDrawer/CollectionDrawer';
import CreateCollectionModal from '../../components/modals/CreateCollectionModal/CreateCollectionModal';
import MovieGrid from '../../components/movie/MovieGrid/MovieGrid';
import { useLanguage } from '../../hooks/useLanguage';
import { useMovieFilters } from '../../hooks/useMovieFilters';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './CatalogPage.module.css';

export default function CatalogPage({
  search,
  isAuthenticated,
  favoriteIds,
  watchlistIds,
  onFavorite,
  onWatchlist,
  onOpenMovie,
  onRequireAuth,
  collections,
  onAddToCollection,
  onCreateCollection,
  language,
}) {
  const ua = language === 'ua';
  const { t } = useLanguage();

  // Фільтри й пошук відправляються на сервер, він повертає вже відібрані фільми
  const { filters, updateFilter, movies, loading, error, refetch } = useMovieFilters(search);
  const [drawerMovie, setDrawerMovie] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const openCollections = (movie) => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    setDrawerMovie(movie);
  };

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
            foundCount={movies.length}
            language={language}
          />
        </aside>

        <div className={styles.results}>
          {error ? (
            <>
              <EmptyState title={t('catalog.loadError')} text={getErrorMessage(error, t)} />
              <div style={{ textAlign: 'center' }}>
                <button className="button button--glass" onClick={refetch}>
                  {t('common.retry')}
                </button>
              </div>
            </>
          ) : (
            <>
              {loading && !movies.length ? (
                <Loader label={t('common.loading')} />
              ) : (
                <MovieGrid
                  movies={movies}
                  variant="catalog"
                  favoriteIds={favoriteIds}
                  watchlistIds={watchlistIds}
                  onFavorite={onFavorite}
                  onWatchlist={onWatchlist}
                  onOpenMovie={onOpenMovie}
                  language={language}
                  itemClassName={styles.card}
                  renderExtra={(movie) => (
                    <button
                      className={styles.collectionAction}
                      onClick={() => openCollections(movie)}
                    >
                      ＋ {ua ? 'До добірки' : 'Add to collection'}
                    </button>
                  )}
                />
              )}

              {!loading && !movies.length && (
                <EmptyState
                  title={ua ? 'Нічого не знайдено' : 'No movies found'}
                  text={ua ? 'Спробуй змінити фільтри.' : 'Try adjusting the filters.'}
                />
              )}
            </>
          )}
        </div>
      </div>

      {drawerMovie && (
        <CollectionDrawer
          movie={drawerMovie}
          collections={collections}
          onAdd={(collectionId) => onAddToCollection(collectionId, drawerMovie)}
          onCreate={() => setCreateOpen(true)}
          onClose={() => setDrawerMovie(null)}
        />
      )}

      {createOpen && (
        <CreateCollectionModal onCreate={onCreateCollection} onClose={() => setCreateOpen(false)} />
      )}
    </main>
  );
}
