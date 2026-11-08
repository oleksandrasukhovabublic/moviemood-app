import styles from './Modal.module.css';

// Загальна оболонка: затемнення + діалог + кнопка закриття.
// size: 'default' | 'small' | 'bare' (без власного вигляду — стилі дає className)
export default function Modal({
  size = 'default',
  className = '',
  onClose,
  closeLabel = 'Close',
  children,
}) {
  const sizeClass = {
    default: styles.modal,
    small: `${styles.modal} ${styles.small}`,
    bare: '',
  }[size];

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${sizeClass} ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose} aria-label={closeLabel}>
          ×
        </button>

        {children}
      </div>
    </div>
  );
}
