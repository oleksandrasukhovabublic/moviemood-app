import filterPanelStyles from '../FilterPanel/FilterPanel.module.css';

export default function SortSelector({ value, onChange, language }) {
  const ua = language === 'ua';

  return (
    <div className={filterPanelStyles.group}>
      <label htmlFor="sort">{ua ? 'СОРТУВАТИ' : 'SORT BY'}</label>

      <select id="sort" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="popular">{ua ? 'Популярність' : 'Popularity'}</option>
        <option value="rating">{ua ? 'Рейтинг' : 'Rating'}</option>
        <option value="year">{ua ? 'Рік' : 'Year'}</option>
      </select>
    </div>
  );
}
