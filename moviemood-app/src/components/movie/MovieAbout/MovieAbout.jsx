import MovieRating from '../MovieRating/MovieRating';
import styles from './MovieAbout.module.css';

export default function MovieAbout({ movie, language }) {
  const ua = language === 'ua';

  return (
    <section className={styles.root}>
      <div className={styles.copy}>
        <span className="eyebrow">{ua ? 'ПРО ФІЛЬМ' : 'ABOUT THE MOVIE'}</span>

        <h2>{ua ? 'Історія, що затягує' : 'A story that pulls you in'}</h2>

        <p>
          {movie.plot}{' '}
          {ua
            ? 'Атмосферна режисура та сильні акторські роботи залишають цю історію з глядачем надовго.'
            : 'Atmospheric direction and powerful performances make this a story that stays with you.'}
        </p>

        <dl>
          <div>
            <dt>{ua ? 'Режисер' : 'Director'}</dt>
            <dd>{movie.director}</dd>
          </div>

          <div>
            <dt>{ua ? 'Прем’єра' : 'Release'}</dt>
            <dd>{movie.year}</dd>
          </div>

          <div>
            <dt>{ua ? 'Оцінок' : 'Votes'}</dt>
            <dd>{movie.votes}</dd>
          </div>
        </dl>
      </div>

      <MovieRating rating={movie.rating} language={language} />
    </section>
  );
}
