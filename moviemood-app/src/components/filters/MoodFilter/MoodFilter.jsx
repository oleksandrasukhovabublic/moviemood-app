import { catalogMoodLabels, catalogMoods } from '../../../data/moods';
import filterPanelStyles from '../FilterPanel/FilterPanel.module.css';

export default function MoodFilter({ value, onChange, language }) {
  const ua = language === 'ua';
  const labels = catalogMoodLabels[language];

  return (
    <div className={filterPanelStyles.group}>
      <label>{ua ? 'НАСТРІЙ' : 'MOOD'}</label>

      <div className={filterPanelStyles.pills}>
        {catalogMoods.map((item) => (
          <button
            key={item}
            className={value === item ? filterPanelStyles.active : ''}
            aria-pressed={value === item}
            onClick={() => onChange(item)}
          >
            {labels[item]}
          </button>
        ))}
      </div>
    </div>
  );
}
