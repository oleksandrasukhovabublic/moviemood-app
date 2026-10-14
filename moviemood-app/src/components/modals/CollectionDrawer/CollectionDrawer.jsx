import { getLocalizedTitle } from '../../../utils/getLocalizedTitle';
import styles from './CollectionDrawer.module.css';

// Бокова панель «Додати фільм до добірки» (каталог)
export default function CollectionDrawer({ movie, collections, language, onClose }) {
  const ua = language === 'ua';

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <aside className={styles.drawer} onClick={(event) => event.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label={ua ? 'Закрити' : 'Close'}>
          ×
        </button>

        <span className="eyebrow">{ua ? 'МОЇ ДОБІРКИ' : 'MY COLLECTIONS'}</span>

        <h2>{ua ? 'Додати фільм' : 'Add movie'}</h2>
        <p>{movie.title}</p>

        {collections.map((collection) => (
          <button className={styles.item} key={collection.id}>
            ▣ {getLocalizedTitle(collection.title, language)}
            <i>＋</i>
          </button>
        ))}
      </aside>
    </div>
  );
}
