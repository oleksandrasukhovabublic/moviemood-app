import { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import Button from '../../common/Button/Button';
import Modal from '../Modal/Modal';
import modalStyles from '../Modal/Modal.module.css';

// Вікно «Нова добірка». onCreate(title) повертає проміс; помилку сервера (напр. дубль назви)
// показуємо прямо у формі.
export default function CreateCollectionModal({ onCreate, onClose }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      setError(t('collections.nameRequired'));
      return;
    }

    setLoading(true);
    setError('');
    try {
      await onCreate(title.trim());
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, t));
      setLoading(false);
    }
  };

  return (
    <Modal size="small" onClose={onClose} closeLabel={t('common.close')}>
      <h2>{t('collections.createTitle')}</h2>

      <form className={modalStyles.form} onSubmit={handleSubmit} noValidate>
        {error && (
          <div className={modalStyles.formError} role="alert">
            {error}
          </div>
        )}

        <label>
          {t('collections.nameLabel')}
          <input
            autoFocus
            value={title}
            maxLength={60}
            placeholder={t('collections.namePlaceholder')}
            onChange={(event) => {
              setTitle(event.target.value);
              setError('');
            }}
          />
        </label>

        <div className={modalStyles.footer}>
          <Button variant="glass" onClick={onClose}>
            {t('common.cancel')}
          </Button>

          <Button type="submit" loading={loading} loadingText={t('common.saving')}>
            {t('collections.create')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
