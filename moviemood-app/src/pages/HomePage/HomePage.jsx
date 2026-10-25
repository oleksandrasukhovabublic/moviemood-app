import SectionHeading from '../../components/common/SectionHeading/SectionHeading';
import BenefitsSection from '../../components/home/BenefitsSection/BenefitsSection';
import HomeHero from '../../components/home/HomeHero/HomeHero';
import MoodSelector from '../../components/mood/MoodSelector/MoodSelector';
import MovieGrid from '../../components/movie/MovieGrid/MovieGrid';

export default function HomePage({
  movies,
  favoriteIds,
  watchlistIds,
  onFavorite,
  onWatchlist,
  onOpenMovie,
  onOpenCatalog,
  language,
}) {
  const ua = language === 'ua';
  const featured = movies[3] ?? movies[0];

  return (
    <main>
      <HomeHero
        featured={featured}
        language={language}
        onOpenMovie={onOpenMovie}
        onOpenCatalog={onOpenCatalog}
      />

      <section className="section-wrap section">
        <SectionHeading
          eyebrow={ua ? 'ОБЕРИ СВІЙ ВАЙБ' : 'CHOOSE YOUR VIBE'}
          title={ua ? 'Який у тебе сьогодні настрій?' : 'What is your mood today?'}
        />

        <MoodSelector language={language} />
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

        <MovieGrid
          movies={movies.slice(0, 5)}
          variant="strip"
          favoriteIds={favoriteIds}
          watchlistIds={watchlistIds}
          onFavorite={onFavorite}
          onWatchlist={onWatchlist}
          onOpenMovie={onOpenMovie}
          language={language}
        />
      </section>

      <BenefitsSection language={language} />
    </main>
  );
}
