import { useState } from 'react';
import { homeMoods } from '../../../data/moods';
import MoodCard from '../MoodCard/MoodCard';
import styles from './MoodSelector.module.css';

export default function MoodSelector({ language, initialIndex = 1 }) {
  const [selectedMood, setSelectedMood] = useState(initialIndex);

  return (
    <div className={styles.root}>
      {homeMoods[language].map((mood, index) => (
        <MoodCard
          key={mood.title}
          icon={mood.icon}
          title={mood.title}
          text={mood.text}
          isActive={selectedMood === index}
          onSelect={() => setSelectedMood(index)}
          language={language}
        />
      ))}
    </div>
  );
}
