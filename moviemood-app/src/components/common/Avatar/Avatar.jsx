import styles from './Avatar.module.css';

// Кругла аватарка: фото або ініціали. status — зелений індикатор у куті.
export default function Avatar({ src, initials, status = false }) {
  return (
    <div className={styles.avatar}>
      {src ? <img className={styles.photo} src={src} alt="" /> : initials}
      {status && <span className={styles.status} />}
    </div>
  );
}
