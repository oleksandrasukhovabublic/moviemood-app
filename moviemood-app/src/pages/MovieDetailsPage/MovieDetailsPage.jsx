import { useState } from 'react';
import CollectionModal from '../../components/modals/CollectionModal/CollectionModal';
import TrailerModal from '../../components/modals/TrailerModal/TrailerModal';
import CastGrid from '../../components/movie/CastGrid/CastGrid';
import MovieAbout from '../../components/movie/MovieAbout/MovieAbout';
import MovieHero from '../../components/movie/MovieHero/MovieHero';
import WatchProviders from '../../components/movie/WatchProviders/WatchProviders';
import { initialCollections } from '../../data/collections';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage({
  movie,
  onBack,
  isFavorite,
  isWatchlisted,
  onFavorite,
  onWatchlist,
  language,
  collections = initialCollections,
}) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);

  return (
    <main className={styles.root}>
      <MovieHero
        movie={movie}
        language={language}
        isFavorite={isFavorite}
        isWatchlisted={isWatchlisted}
        onBack={onBack}
        onFavorite={onFavorite}
        onWatchlist={onWatchlist}
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
