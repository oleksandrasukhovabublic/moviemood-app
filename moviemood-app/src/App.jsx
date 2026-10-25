import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './components/modals/AuthModal/AuthModal';
import EditProfileModal from './components/modals/EditProfileModal/EditProfileModal';
import AppRouter from './router/AppRouter';
import { moviePath, ROUTES } from './router/routes';
import { initialCollections } from './data/collections';
import { movies } from './data/movies';
import { movieTitle } from './utils/movieLocale';

const initialProfile = {
  name: 'Саша Коваль',
  handle: '@sasha.movies',
  bio: 'У пошуках історій, які залишаються надовго.',
  initials: 'СК',
  avatar: '',
};

export default function App() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('ua');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [profile, setProfile] = useState(initialProfile);
  const [authOpen, setAuthOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [favorites, setFavorites] = useState([2, 4, 9]);
  const [watchlist, setWatchlist] = useState([1, 6, 8, 10]);
  const [search, setSearch] = useState('');

  // Перемикач теми
  const [theme, setTheme] = useState(() => localStorage.getItem('moviemood-theme') ?? 'dark');

  // Стан добірок
  const [collections, setCollections] = useState(initialCollections);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('moviemood-theme', theme);
  }, [theme]);

  const toggleId = (setter, id) => {
    setter((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const requireAuth = () => {
    setAuthOpen(true);
  };

  const addToCollection = (collectionId, movieId) => {
    if (!isAuthenticated) {
      requireAuth();
      return false;
    }

    setCollections((current) =>
      current.map((collection) =>
        collection.id === collectionId && !collection.ids.includes(movieId)
          ? {
              ...collection,
              ids: [...collection.ids, movieId],
            }
          : collection
      )
    );

    return true;
  };

  const searchedMovies = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    if (!query) {
      return movies;
    }

    return movies.filter(
      (movie) =>
        movieTitle(movie, language).toLocaleLowerCase().includes(query) ||
        movie.title.toLocaleLowerCase().includes(query) ||
        movie.genres.some((genre) => genre.toLocaleLowerCase().includes(query)) ||
        movie.cast.some((actor) => actor.toLocaleLowerCase().includes(query))
    );
  }, [search, language]);

  // Відкрити сторінку фільму означає перейти за адресою /movie/<id>
  const openMovie = (movie) => navigate(moviePath(movie.id));

  const logout = () => {
    setIsAuthenticated(false);
    navigate(ROUTES.home);
  };

  const movieProps = {
    favoriteIds: favorites,
    watchlistIds: watchlist,
    onFavorite: (movie) => (isAuthenticated ? toggleId(setFavorites, movie.id) : requireAuth()),
    onWatchlist: (movie) => (isAuthenticated ? toggleId(setWatchlist, movie.id) : requireAuth()),
    onOpenMovie: openMovie,
    onRequireAuth: requireAuth,
    isAuthenticated,
    collections,
    onAddToCollection: addToCollection,
    language,
  };

  const headerProps = {
    search,
    setSearch,
    language,
    setLanguage,
    isAuthenticated,
    profile,
    onAuth: () => setAuthOpen(true),
    onLogout: logout,
    theme,
    onToggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  };

  const profileProps = {
    profile,
    isAuthenticated,
    onEdit: () => setEditOpen(true),
    onLogout: logout,
    onAuth: () => setAuthOpen(true),
  };

  return (
    <>
      <AppRouter
        headerProps={headerProps}
        movieProps={movieProps}
        movies={movies}
        searchedMovies={searchedMovies}
        profileProps={profileProps}
        language={language}
      />

      {authOpen && (
        <AuthModal
          language={language}
          onClose={() => setAuthOpen(false)}
          onSuccess={() => {
            setIsAuthenticated(true);
            setAuthOpen(false);
          }}
        />
      )}

      {editOpen && (
        <EditProfileModal
          language={language}
          profile={profile}
          onClose={() => setEditOpen(false)}
          onSave={(nextProfile) => {
            setProfile(nextProfile);
            setEditOpen(false);
          }}
        />
      )}
    </>
  );
}
