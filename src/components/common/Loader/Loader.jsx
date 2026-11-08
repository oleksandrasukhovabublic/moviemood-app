import styles from './Loader.module.css';

// Індикатор завантаження. fullscreen — на весь екран (перевірка сесії), inline — у блоці.
export default function Loader({ label = '', fullscreen = false }) {
  return (
    <div className={`${styles.root} ${fullscreen ? styles.fullscreen : ''}`} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      {label && <p>{label}</p>}
    </div>
  );
}
