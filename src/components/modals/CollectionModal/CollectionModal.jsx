import { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { getLocalizedTitle } from '../../../utils/getLocalizedTitle';
import Modal from '../Modal/Modal';
import modalStyles from '../Modal/Modal.module.css';

// Вікно «Додати до добірки» (сторінка фільму)
export default function CollectionModal({ movie, collections, onAdd, onCreate, onClose }) {
  const { t, language } = useLanguage();
  const [busyId, setBusyId] = useState(null);
  const ua = language === 'ua';

  const handleAdd = async (collectionId) => {
    setBusyId(collectionId);
    const added = await onAdd(collectionId);
    setBusyId(null);
    if (added) onClose();
  };

  return (
    <Modal size="small" onClose={onClose} closeLabel={t('common.close')}>
      <span className="eyebrow">{ua ? 'МОЇ ДОБІРКИ' : 'MY COLLECTIONS'}</span>

      <h2>{ua ? 'Додати до добірки' : 'Add to collection'}</h2>

      {collections.length === 0 && <p className={modalStyles.hint}>{t('collections.empty')}</p>}

      {collections.map((collection) => {
        const included = collection.ids.includes(movie.id);

        return (
          <button
            className={modalStyles.listItem}
            key={collection.id}
            disabled={included || busyId === collection.id}
            onClick={() => handleAdd(collection.id)}
          >
            ▣ {getLocalizedTitle(collection.title, language)}
            <i>{included ? `✓ ${t('collections.alreadyIn')}` : '＋'}</i>
          </button>
        );
      })}

      <button className="button button--primary" style={{ width: '100%' }} onClick={onCreate}>
        ＋ {t('collections.create')}
      </button>
    </Modal>
  );
}
