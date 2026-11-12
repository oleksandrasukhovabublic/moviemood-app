import styles from '../../layout/Header/Header.module.css';

// Перемикач UA / EN
export default function LanguageSwitcher({ language, onChange }) {
  const ua = language === 'ua';

  return (
    <div className={styles.languageSwitcher} aria-label={ua ? 'Вибір мови' : 'Language'}>
      <button type="button" className={ua ? styles.active : ''} onClick={() => onChange('ua')}>
        UA
      </button>
      <span />
      <button type="button" className={!ua ? styles.active : ''} onClick={() => onChange('en')}>
        EN
      </button>
    </div>
  );
}
