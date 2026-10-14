import { useEffect, useMemo, useState } from 'react';
import Header from './components/layout/Header/Header';
import AuthModal from './components/modals/AuthModal/AuthModal';
import EditProfileModal from './components/modals/EditProfileModal/EditProfileModal';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import { initialCollections } from './data/collections';
import { movies } from './data/movies';
import { movieTitle } from './utils/movieLocale';
import styles from './App.module.css';

const initialProfile = {
  name: 'Саша Коваль',
  handle: '@sasha.movies',
  bio: 'У пошуках історій, які залишаються надовго.',
  initials: 'СК',
  avatar: '',
};

export default function App() {
  const [page, setPage] = useState('home');
  const [language, setLanguage] = useState('ua');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [profile, setProfile] = useState(initialProfile);
  const [authOpen, setAuthOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([2, 4, 9]);
  const [watchlist, setWatchlist] = useState([1, 6, 8, 10]);
  const [search, setSearch] = useState('');

  // Перемикач теми
  const [theme, setTheme] = useState(() => localStorage.getItem('moviemood-theme') ?? 'dark');

  // Стан добірок
  const [collections, setCollections] = useState(initialCollections);
  const [activeCollectionId, setActiveCollectionId] = useState(null);

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

  const navigate = (nextPage) => {
    if (nextPage === 'profile' && !isAuthenticated) {
      requireAuth();
      return;
    }
    setSelectedMovie(null);
    if (nextPage !== 'profile') {
      setActiveCollectionId(null);
    }
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openMovie = (movie) => {
    setSelectedMovie(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setSelectedMovie(null);
    setActiveCollectionId(null);
    setPage('home');
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

  return (
    <div className={styles.shell}>
      <div className={`${styles.ambient} ${styles.purple}`} />
      <div className={`${styles.ambient} ${styles.red}`} />

      <Header
        page={page}
        onNavigate={navigate}
        search={search}
        setSearch={setSearch}
        language={language}
        setLanguage={setLanguage}
        isAuthenticated={isAuthenticated}
        profile={profile}
        onAuth={() => setAuthOpen(true)}
        onLogout={logout}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      />

      <div
        className={styles.pageTransition}
        key={
          selectedMovie
            ? `movie-${selectedMovie.id}`
            : activeCollectionId
              ? `collection-${activeCollectionId}`
              : page
        }
      >
        {selectedMovie ? (
          <MovieDetailsPage
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
            isFavorite={favorites.includes(selectedMovie.id)}
            isWatchlisted={watchlist.includes(selectedMovie.id)}
            onFavorite={() =>
              isAuthenticated ? toggleId(setFavorites, selectedMovie.id) : requireAuth()
            }
            onWatchlist={() =>
              isAuthenticated ? toggleId(setWatchlist, selectedMovie.id) : requireAuth()
            }
            language={language}
            isAuthenticated={isAuthenticated}
            onRequireAuth={requireAuth}
            collections={collections}
            onAddToCollection={addToCollection}
          />
        ) : (
          <>
            {page === 'home' && (
              <HomePage
                movies={searchedMovies}
                onOpenCatalog={() => navigate('catalog')}
                {...movieProps}
              />
            )}

            {page === 'catalog' && <CatalogPage movies={searchedMovies} {...movieProps} />}

            {page === 'profile' && (
              <ProfilePage
                movies={movies}
                {...movieProps}
                profile={profile}
                isAuthenticated={isAuthenticated}
                onEdit={() => setEditOpen(true)}
                onLogout={logout}
                onAuth={() => setAuthOpen(true)}
                collections={collections}
                selectedCollectionId={activeCollectionId}
                onSelectCollection={(id) => setActiveCollectionId(id)}
              />
            )}
          </>
        )}
      </div>

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
    </div>
  );
}
