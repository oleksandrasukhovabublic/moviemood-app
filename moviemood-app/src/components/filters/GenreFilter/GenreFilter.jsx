import { catalogGenres } from '../../../data/genres';
import filterPanelStyles from '../FilterPanel/FilterPanel.module.css';

export default function GenreFilter({ value, onChange, language }) {
  const ua = language === 'ua';

  return (
    <div className={filterPanelStyles.group}>
      <label htmlFor="genre">{ua ? 'ЖАНР' : 'GENRE'}</label>

      <select id="genre" value={value} onChange={(event) => onChange(event.target.value)}>
        {catalogGenres.map((item) => (
          <option key={item} value={item}>
            {item === 'all' ? (ua ? 'Усі жанри' : 'All genres') : item}
          </option>
        ))}
      </select>
    </div>
  );
}
