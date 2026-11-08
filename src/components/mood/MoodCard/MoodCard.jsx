import styles from './MoodCard.module.css';

export default function MoodCard({ icon, title, text, isActive, onSelect, language }) {
  const ua = language === 'ua';

  return (
    <button
      className={`${styles.root} ${isActive ? styles.active : ''}`}
      aria-pressed={isActive}
      onClick={onSelect}
    >
      <span className={styles.icon}>{icon}</span>

      <strong>{title}</strong>
      <small>{text}</small>

      <i>{ua ? 'Обрати настрій' : 'Choose mood'} →</i>
    </button>
  );
}
