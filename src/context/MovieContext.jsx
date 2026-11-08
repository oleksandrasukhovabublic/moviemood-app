import { useCallback, useMemo, useState } from 'react';
import { useAppModals } from '../hooks/useAppModals';
import { useAuth } from '../hooks/useAuth';
import { useCollections } from '../hooks/useCollections';
import { useFavorites } from '../hooks/useFavorites';
import { useLanguage } from '../hooks/useLanguage';
import { useMovies } from '../hooks/useMovies';
import { useToast } from '../hooks/useToast';
import { useWatched } from '../hooks/useWatched';
import { useWatchlist } from '../hooks/useWatchlist';
import { getErrorMessage } from '../utils/getErrorMessage';
import { MovieContext } from './contexts';

// Бізнес-логіка застосунку: усі фільми, пошук, улюблені / заплановані / переглянуті, добірки.
// Усі дії користувача перевіряють авторизацію: гостю показуємо вікно входу.
export function MovieProvider({ children }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const { openAuth } = useAppModals();

  const [search, setSearch] = useState('');
  const { movies, loading: moviesLoading, error: moviesError, refetch } = useMovies();

  const { ids: favoriteIds, toggle: toggleFavoriteId } = useFavorites(isAuthenticated);
  const { ids: watchlistIds, toggle: toggleWatchlistId } = useWatchlist(isAuthenticated);
  const { ids: watchedIds, toggle: toggleWatchedId } = useWatched(isAuthenticated);
  const {
    collections,
    loading: collectionsLoading,
    create,
    remove,
    addMovie,
    removeMovie,
  } = useCollections(isAuthenticated);

  const requireAuth = useCallback(() => {
    showToast(t('auth.needLogin'));
    openAuth();
  }, [showToast, t, openAuth]);

  // Виконує дію; якщо сервер повернув помилку — показує її й повертає null
  const attempt = useCallback(
    async (action) => {
      try {
        return await action();
      } catch (error) {
        showToast(getErrorMessage(error, t), 'error');
        return null;
      }
    },
    [showToast, t]
  );

  const toggleFavorite = useCallback(
    async (movie) => {
      if (!isAuthenticated) return requireAuth();
      const result = await attempt(() => toggleFavoriteId(movie.id));
      if (result) {
        showToast(t(result.added ? 'lists.addedFavorite' : 'lists.removedFavorite'), 'success');
      }
      return undefined;
    },
    [isAuthenticated, requireAuth, attempt, toggleFavoriteId, showToast, t]
  );

  const toggleWatchlist = useCallback(
    async (movie) => {
      if (!isAuthenticated) return requireAuth();
      const result = await attempt(() => toggleWatchlistId(movie.id));
      if (result) {
        showToast(t(result.added ? 'lists.addedWatchlist' : 'lists.removedWatchlist'), 'success');
      }
      return undefined;
    },
    [isAuthenticated, requireAuth, attempt, toggleWatchlistId, showToast, t]
  );

  const toggleWatched = useCallback(
    async (movie) => {
      if (!isAuthenticated) return requireAuth();
      await attempt(() => toggleWatchedId(movie.id));
      return undefined;
    },
    [isAuthenticated, requireAuth, attempt, toggleWatchedId]
  );

  // Створення кидає помилку далі: вікно створення показує її біля поля (напр. «така назва вже є»)
  const createCollection = useCallback(
    async (title) => {
      const created = await create(title);
      showToast(t('collections.created', { title: created.title }), 'success');
      return created;
    },
    [create, showToast, t]
  );

  const deleteCollection = useCallback(
    async (collection) => {
      const done = await attempt(async () => {
        await remove(collection.id);
        return true;
      });
      if (done) showToast(t('collections.deleted'), 'success');
      return Boolean(done);
    },
    [attempt, remove, showToast, t]
  );

  const addToCollection = useCallback(
    async (collectionId, movie) => {
      if (!isAuthenticated) {
        requireAuth();
        return false;
      }
      const updated = await attempt(() => addMovie(collectionId, movie.id));
      if (updated) showToast(t('collections.movieAdded'), 'success');
      return Boolean(updated);
    },
    [isAuthenticated, requireAuth, attempt, addMovie, showToast, t]
  );

  const removeFromCollection = useCallback(
    async (collectionId, movie) => {
      const updated = await attempt(() => removeMovie(collectionId, movie.id));
      if (updated) showToast(t('collections.movieRemoved'), 'success');
      return Boolean(updated);
    },
    [attempt, removeMovie, showToast, t]
  );

  const value = useMemo(
    () => ({
      movies,
      moviesLoading,
      moviesError,
      reloadMovies: refetch,
      search,
      setSearch,
      isAuthenticated,
      requireAuth,
      favoriteIds,
      watchlistIds,
      watchedIds,
      toggleFavorite,
      toggleWatchlist,
      toggleWatched,
      collections,
      collectionsLoading,
      createCollection,
      deleteCollection,
      addToCollection,
      removeFromCollection,
    }),
    [
      movies,
      moviesLoading,
      moviesError,
      refetch,
      search,
      isAuthenticated,
      requireAuth,
      favoriteIds,
      watchlistIds,
      watchedIds,
      toggleFavorite,
      toggleWatchlist,
      toggleWatched,
      collections,
      collectionsLoading,
      createCollection,
      deleteCollection,
      addToCollection,
      removeFromCollection,
    ]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
