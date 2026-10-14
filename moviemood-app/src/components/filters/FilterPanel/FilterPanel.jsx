import GenreFilter from '../GenreFilter/GenreFilter';
import MoodFilter from '../MoodFilter/MoodFilter';
import RatingFilter from '../RatingFilter/RatingFilter';
import SortSelector from '../SortSelector/SortSelector';
import YearFilter from '../YearFilter/YearFilter';
import styles from './FilterPanel.module.css';

// filters = { mood, genre, year, rating, sort }
// onChange(ключ, значення) оновлює один фільтр
export default function FilterPanel({ filters, onChange, foundCount, language }) {
  const ua = language === 'ua';

  return (
    <section className={styles.root}>
      <div className={styles.top}>
        <MoodFilter
          value={filters.mood}
          onChange={(value) => onChange('mood', value)}
          language={language}
        />

        <GenreFilter
          value={filters.genre}
          onChange={(value) => onChange('genre', value)}
          language={language}
        />

        <SortSelector
          value={filters.sort}
          onChange={(value) => onChange('sort', value)}
          language={language}
        />
      </div>

      <div className={styles.ranges}>
        <YearFilter
          value={filters.year}
          onChange={(value) => onChange('year', value)}
          language={language}
        />

        <RatingFilter
          value={filters.rating}
          onChange={(value) => onChange('rating', value)}
          language={language}
        />

        <span>
          {ua ? 'Знайдено' : 'Found'} <strong>{foundCount}</strong>
        </span>
      </div>
    </section>
  );
}
