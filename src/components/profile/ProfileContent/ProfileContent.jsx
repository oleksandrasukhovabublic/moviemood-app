import styles from './ProfileContent.module.css';

// Спільна обгортка для вмісту вкладок профілю
export default function ProfileContent({ children }) {
  return <section className={styles.root}>{children}</section>;
}
