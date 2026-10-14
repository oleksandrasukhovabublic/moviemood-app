import styles from './GuestProfile.module.css';

export default function GuestProfile({ language, onAuth }) {
  const ua = language === 'ua';

  return (
    <section className={styles.root}>
      <span>○</span>

      <small className="eyebrow">{ua ? 'ОСОБИСТИЙ КІНОПРОСТІР' : 'YOUR CINEMA SPACE'}</small>

      <h1>{ua ? 'Увійди, щоб відкрити профіль' : 'Sign in to open your profile'}</h1>

      <p>
        {ua ? 'Зберігай улюблене та створюй добірки.' : 'Save favorites and create collections.'}
      </p>

      <button className="button button--primary" onClick={onAuth}>
        {ua ? 'Увійти' : 'Sign in'}
      </button>
    </section>
  );
}
