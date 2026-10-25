import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CollectionModal from '../../components/modals/CollectionModal/CollectionModal';
import TrailerModal from '../../components/modals/TrailerModal/TrailerModal';
import CastGrid from '../../components/movie/CastGrid/CastGrid';
import MovieAbout from '../../components/movie/MovieAbout/MovieAbout';
import MovieHero from '../../components/movie/MovieHero/MovieHero';
import WatchProviders from '../../components/movie/WatchProviders/WatchProviders';
import { initialCollections } from '../../data/collections';
import { ROUTES } from '../../router/routes';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage({
  movies,
  favoriteIds,
  watchlistIds,
  onFavorite,
  onWatchlist,
  language,
  collections = initialCollections,
}) {
  // :movieId з адреси /movie/:movieId (завжди рядок, тому порівнюємо як рядки)
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);

  const movie = movies.find((item) => String(item.id) === movieId);

  // Фільму з такою адресою немає (наприклад /movie/999)
  if (!movie) {
    return <NotFoundPage language={language} />;
  }

  // location.key === 'default' означає, що сторінку відкрили напряму за посиланням
  // і «назад» у межах сайту немає, тому ведемо до каталогу.
  const goBack = () => {
    if (location.key === 'default') {
      navigate(ROUTES.catalog);
    } else {
      navigate(-1);
    }
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
        onCollection={() => setCollectionOpen(true)}
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
          collections={collections}
          language={language}
          onClose={() => setCollectionOpen(false)}
        />
      )}
    </main>
  );
}
