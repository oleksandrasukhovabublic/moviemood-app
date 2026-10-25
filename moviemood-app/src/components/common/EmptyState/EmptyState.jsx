import styles from './EmptyState.module.css';

export default function EmptyState({ title, text }) {
  return (
    <div className={styles.root}>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}
