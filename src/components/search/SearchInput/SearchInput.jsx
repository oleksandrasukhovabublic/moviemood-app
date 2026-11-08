import styles from '../../layout/Header/Header.module.css';

// Поле пошуку фільмів у шапці
export default function SearchInput({ value, onChange, onFocus, placeholder }) {
  return (
    <label className={styles.search}>
      <span className={styles.searchIcon}>⌕</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    </label>
  );
}
