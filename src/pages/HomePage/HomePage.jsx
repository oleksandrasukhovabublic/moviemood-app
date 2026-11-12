import { useState } from 'react';
import Badge from '../../components/common/Badge/Badge';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import SectionHeading from '../../components/common/SectionHeading/SectionHeading';
import BenefitsSection from '../../components/home/BenefitsSection/BenefitsSection';
import HomeHero from '../../components/home/HomeHero/HomeHero';
import MoodSelector from '../../components/mood/MoodSelector/MoodSelector';
import MovieGrid from '../../components/movie/MovieGrid/MovieGrid';
import { homeMoods } from '../../data/moods';
import { useRecommendations } from '../../hooks/useMovies';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { useLanguage } from '../../hooks/useLanguage';

export default function HomePage({
  movies,
  moviesLoading,
  moviesError,
  onReload,
  user,
  isAuthenticated,
  favoriteIds,
  watchlistIds,
  onFavorite,
  onWatchlist,
  onOpenMovie,
  onOpenCatalog,
  language,
}) {
  const ua = language === 'ua';
  const { t } = useLanguage();
  const [moodIndex, setMoodIndex] = useState(1);
  const moodKey = homeMoods[language][moodIndex].key;

  // Рекомендації рахує сервер: збіг настрою + жанри, які користувач уже любить
  const { recommendations, loading: recLoading } = useRecommendations(moodKey, isAuthenticated);

  const featured = movies[3] ?? movies[0];
  const gridProps = {
    favoriteIds,
    watchlistIds,
    onFavorite,
    onWatchlist,
    onOpenMovie,
    language,
  };

  return (
    <main>
      <HomeHero
        featured={featured}
        userName={user?.name}
        language={language}
        onOpenMovie={onOpenMovie}
        onOpenCatalog={onOpenCatalog}
      />

      <section className="section-wrap section">
        <SectionHeading
          eyebrow={ua ? 'ОБЕРИ СВІЙ ВАЙБ' : 'CHOOSE YOUR VIBE'}
          title={ua ? 'Який у тебе сьогодні настрій?' : 'What is your mood today?'}
        />

        <MoodSelector language={language} selectedIndex={moodIndex} onSelect={setMoodIndex} />
      </section>

      <section className="section-wrap section">
        <SectionHeading
          eyebrow={t('home.recommendationsEyebrow')}
          title={t('home.recommendationsTitle')}
        />

        {recLoading && !recommendations.length ? (
          <Loader />
        ) : recommendations.length ? (
          <MovieGrid
            movies={recommendations}
            {...gridProps}
            renderExtra={(movie) => (
              <div style={{ marginTop: '10px' }}>
                <Badge tone="success">
                  {movie.match}% {t('home.match')}
                </Badge>
              </div>
            )}
          />
        ) : (
          <EmptyState title={t('home.noRecommendations')} text="" />
        )}
      </section>

      <section className="section-wrap section">
        <SectionHeading
          eyebrow={ua ? 'ЗАРАЗ ДИВЛЯТЬСЯ' : 'TRENDING NOW'}
          title={ua ? 'Популярне у спільноті' : 'Popular in the community'}
          action={
            <button className="text-button" onClick={onOpenCatalog}>
              {ua ? 'Увесь каталог' : 'Full catalog'} →
            </button>
          }
        />

        {moviesError ? (
          <EmptyState title={getErrorMessage(moviesError, t)} text={t('errors.network')} />
        ) : moviesLoading && !movies.length ? (
          <Loader label={t('common.loading')} />
        ) : (
          <MovieGrid movies={movies.slice(0, 5)} variant="strip" {...gridProps} />
        )}

        {moviesError && (
          <div style={{ textAlign: 'center' }}>
            <button className="button button--glass" onClick={onReload}>
              {t('common.retry')}
            </button>
          </div>
        )}
      </section>

      <BenefitsSection language={language} />
    </main>
  );
}
