import styles from './Toast.module.css';

// Контейнер зі спливаючими повідомленнями (зверху праворуч / знизу на телефоні)
export default function Toast({ toasts, onDismiss }) {
  return (
    <div className={styles.root} role="status" aria-live="polite">
      {toasts.map(({ id, message, type }) => (
        <div className={`${styles.toast} ${styles[type] ?? ''}`} key={id}>
          <span>{message}</span>
          <button type="button" onClick={() => onDismiss(id)} aria-label="×">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
