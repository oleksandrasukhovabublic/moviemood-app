import styles from './Badge.module.css';

// Маленька «пігулка» з текстом, напр. «92% збіг». tone: 'primary' | 'success'
export default function Badge({ tone = 'primary', children }) {
  return <span className={`${styles.root} ${styles[tone] ?? ''}`}>{children}</span>;
}
