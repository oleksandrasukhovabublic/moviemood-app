import styles from './MovieRating.module.css';

export default function MovieRating({ rating, language }) {
  const ua = language === 'ua';

  return (
    <div className={styles.root}>
      <span>TMDB</span>
      <strong>{rating}</strong>

      <div>
        <i style={{ width: `${rating * 10}%` }} />
      </div>

      <p>{ua ? 'Оцінка глядачів' : 'Audience score'}</p>
    </div>
  );
}
