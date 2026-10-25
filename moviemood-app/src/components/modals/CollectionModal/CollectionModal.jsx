import { getLocalizedTitle } from '../../../utils/getLocalizedTitle';
import Modal from '../Modal/Modal';
import modalStyles from '../Modal/Modal.module.css';

// Вікно «Додати до добірки» (сторінка фільму)
export default function CollectionModal({ collections, language, onClose }) {
  const ua = language === 'ua';

  return (
    <Modal size="small" onClose={onClose} closeLabel={ua ? 'Закрити' : 'Close'}>
      <span className="eyebrow">{ua ? 'МОЇ ДОБІРКИ' : 'MY COLLECTIONS'}</span>

      <h2>{ua ? 'Додати до добірки' : 'Add to collection'}</h2>

      {collections.map((collection) => (
        <button className={modalStyles.listItem} key={collection.id}>
          ▣ {getLocalizedTitle(collection.title, language)}
          <i>＋</i>
        </button>
      ))}
    </Modal>
  );
}
