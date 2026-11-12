import { homeMoods } from '../../../data/moods';
import MoodCard from '../MoodCard/MoodCard';
import styles from './MoodSelector.module.css';

// Керований вибір настрою: поточний індекс і обробник приходять від батьківської сторінки
export default function MoodSelector({ language, selectedIndex, onSelect }) {
  return (
    <div className={styles.root}>
      {homeMoods[language].map((mood, index) => (
        <MoodCard
          key={mood.title}
          icon={mood.icon}
          title={mood.title}
          text={mood.text}
          isActive={selectedIndex === index}
          onSelect={() => onSelect(index)}
          language={language}
        />
      ))}
    </div>
  );
}
