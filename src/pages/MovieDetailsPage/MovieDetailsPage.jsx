import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import CollectionModal from '../../components/modals/CollectionModal/CollectionModal';
import CreateCollectionModal from '../../components/modals/CreateCollectionModal/CreateCollectionModal';
import TrailerModal from '../../components/modals/TrailerModal/TrailerModal';
import CastGrid from '../../components/movie/CastGrid/CastGrid';
import MovieAbout from '../../components/movie/MovieAbout/MovieAbout';
import MovieHero from '../../components/movie/MovieHero/MovieHero';
import WatchProviders from '../../components/movie/WatchProviders/WatchProviders';
import { useLanguage } from '../../hooks/useLanguage';
import { useMovie } from '../../hooks/useMovies';
import { ROUTES } from '../../router/routes';
import { getErrorMessage } from '../../utils/getErrorMessage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage({
  isAuthenticated,
  favoriteIds,
  watchlistIds,
  onFavorite,
  onWatchlist,
  onRequireAuth,
  language,
  collections,
  onAddToCollection,
  onCreateCollection,
}) {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const { movie, loading, error, refetch } = useMovie(movieId);

  if (loading && !movie) {
    return <Loader label={t('common.loading')} />;
  }

  if (error?.status === 404) {
    return <NotFoundPage language={language} />;
  }

  if (error || !movie) {
    return (
      <main className={`${styles.root} section-wrap`}>
        <EmptyState title={t('errors.generic')} text={getErrorMessage(error, t)} />
        <div style={{ textAlign: 'center' }}>
          <button className="button button--glass" onClick={refetch}>
            {t('common.retry')}
          </button>
        </div>
      </main>
    );
  }

  const goBack = () => {
    if (location.key === 'default') {
      navigate(ROUTES.catalog);
    } else {
      navigate(-1);
    }
  };

  const openCollections = () => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    setCollectionOpen(true);
  };

  return (
    <main className={styles.root}>
      <MovieHero
        movie={movie}
        language={language}
        isFavorite={favoriteIds.includes(movie.id)}
        isWatchlisted={watchlistIds.includes(movie.id)}
        onBack={goBack}
        onFavorite={() => onFavorite(movie)}
        onWatchlist={() => onWatchlist(movie)}
        onTrailer={() => setTrailerOpen(true)}
        onCollection={openCollections}
      />

      <div className="section-wrap">
        <WatchProviders streaming={movie.streaming} language={language} />
        <MovieAbout movie={movie} language={language} />
        <CastGrid cast={movie.cast} language={language} />
      </div>

      {trailerOpen && (
        <TrailerModal movie={movie} language={language} onClose={() => setTrailerOpen(false)} />
      )}

      {collectionOpen && (
        <CollectionModal
          movie={movie}
          collections={collections}
          onAdd={(collectionId) => onAddToCollection(collectionId, movie)}
          onCreate={() => setCreateOpen(true)}
          onClose={() => setCollectionOpen(false)}
        />
      )}

      {createOpen && (
        <CreateCollectionModal onCreate={onCreateCollection} onClose={() => setCreateOpen(false)} />
      )}
    </main>
  );
}
