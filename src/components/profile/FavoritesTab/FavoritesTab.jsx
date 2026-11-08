import SectionHeading from '../../common/SectionHeading/SectionHeading';
import MovieGrid from '../../movie/MovieGrid/MovieGrid';
import ProfileContent from '../ProfileContent/ProfileContent';

export default function FavoritesTab({ movies, language, ...gridProps }) {
  const ua = language === 'ua';

  return (
    <ProfileContent>
      <SectionHeading
        eyebrow={ua ? 'ТЕ, ЩО ТИ ЛЮБИШ' : 'WHAT YOU LOVE'}
        title={ua ? 'Улюблені фільми' : 'Favorite movies'}
      />

      <MovieGrid movies={movies} language={language} {...gridProps} />
    </ProfileContent>
  );
}
