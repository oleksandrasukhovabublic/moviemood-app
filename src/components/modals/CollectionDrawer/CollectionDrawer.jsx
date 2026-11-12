import { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { getLocalizedTitle } from '../../../utils/getLocalizedTitle';
import styles from './CollectionDrawer.module.css';

// Бокова панель «Додати фільм до добірки» (каталог).
// onAdd(collectionId) → проміс із true/false; onCreate відкриває вікно створення добірки.
export default function CollectionDrawer({ movie, collections, onAdd, onCreate, onClose }) {
  const { t, language } = useLanguage();
  const [busyId, setBusyId] = useState(null);

  const handleAdd = async (collectionId) => {
    setBusyId(collectionId);
    const added = await onAdd(collectionId);
    setBusyId(null);
    if (added) onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <aside className={styles.drawer} onClick={(event) => event.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label={t('common.close')}>
          ×
        </button>

        <span className="eyebrow">{language === 'ua' ? 'МОЇ ДОБІРКИ' : 'MY COLLECTIONS'}</span>

        <h2>{language === 'ua' ? 'Додати фільм' : 'Add movie'}</h2>
        <p>{movie.title}</p>

        {collections.length === 0 && <p>{t('collections.empty')}</p>}

        {collections.map((collection) => {
          const included = collection.ids.includes(movie.id);

          return (
            <button
              className={styles.item}
              key={collection.id}
              disabled={included || busyId === collection.id}
              onClick={() => handleAdd(collection.id)}
            >
              ▣ {getLocalizedTitle(collection.title, language)}
              <i>{included ? `✓ ${t('collections.alreadyIn')}` : '＋'}</i>
            </button>
          );
        })}

        <button className={`button button--primary ${styles.create}`} onClick={onCreate}>
          ＋ {t('collections.create')}
        </button>
      </aside>
    </div>
  );
}
