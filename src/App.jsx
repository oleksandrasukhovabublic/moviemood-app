import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './components/common/Loader/Loader';
import { useAppModals } from './hooks/useAppModals';
import { useAuth } from './hooks/useAuth';
import { useLanguage } from './hooks/useLanguage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMovieContext } from './hooks/useMovieContext';
import { useToast } from './hooks/useToast';
import AppRouter from './router/AppRouter';
import { moviePath, ROUTES } from './router/routes';
import { STORAGE_KEYS } from './utils/constants';

// Корінь застосунку: збирає дані з контекстів і роздає їх сторінкам.
// Уся бізнес-логіка живе в контекстах і хуках (src/context, src/hooks).
export default function App() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { openAuth, openEditProfile } = useAppModals();
  const { showToast } = useToast();
  const movieContext = useMovieContext();
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Поки перевіряємо збережену сесію, показуємо завантаження, щоб не блимав «гість»
  if (isLoading) {
    return <Loader fullscreen label={t('common.loading')} />;
  }

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.home);
    showToast(t('auth.loggedOut'));
  };

  // Відкрити сторінку фільму означає перейти за адресою /movie/<id>
  const openMovie = (movie) => navigate(moviePath(movie.id));

  const movieProps = {
    movies: movieContext.movies,
    moviesLoading: movieContext.moviesLoading,
    moviesError: movieContext.moviesError,
    onReload: movieContext.reloadMovies,
    search: movieContext.search,
    user,
    isAuthenticated,
    favoriteIds: movieContext.favoriteIds,
    watchlistIds: movieContext.watchlistIds,
    onFavorite: movieContext.toggleFavorite,
    onWatchlist: movieContext.toggleWatchlist,
    onOpenMovie: openMovie,
    onRequireAuth: movieContext.requireAuth,
    collections: movieContext.collections,
    onAddToCollection: movieContext.addToCollection,
    onCreateCollection: movieContext.createCollection,
    language,
  };

  const headerProps = {
    theme,
    onToggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    onLogout: handleLogout,
  };

  const profileProps = {
    profile: user,
    watchedIds: movieContext.watchedIds,
    onToggleWatched: movieContext.toggleWatched,
    onDeleteCollection: movieContext.deleteCollection,
    onRemoveFromCollection: movieContext.removeFromCollection,
    onEdit: openEditProfile,
    onLogout: handleLogout,
    onAuth: openAuth,
  };

  return (
    <AppRouter
      headerProps={headerProps}
      movieProps={movieProps}
      profileProps={profileProps}
      language={language}
    />
  );
}
