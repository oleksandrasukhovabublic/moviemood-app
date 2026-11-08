import { getLocalizedTitle } from '../../../utils/getLocalizedTitle';
import styles from './CollectionCard.module.css';

export default function CollectionCard({ collection, movies, language, onSelect }) {
  const ua = language === 'ua';

  return (
    <article className={styles.root} onClick={onSelect} style={{ cursor: 'pointer' }}>
      <div className={styles.covers}>
        {collection.ids.map((id) => {
          const movie = movies.find((item) => item.id === id);

          return movie ? <img key={id} src={movie.poster} alt="" /> : null;
        })}
      </div>

      <div>
        <small>{ua ? 'ДОБІРКА' : 'COLLECTION'}</small>
        <h3>{getLocalizedTitle(collection.title, language)}</h3>

        <p>
          {collection.ids.length} {ua ? 'фільмів' : 'movies'}
        </p>
      </div>
    </article>
  );
}
