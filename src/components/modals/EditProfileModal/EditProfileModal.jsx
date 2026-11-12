import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../hooks/useLanguage';
import { usePost } from '../../../hooks/usePost';
import { useToast } from '../../../hooks/useToast';
import { createInitials } from '../../../utils/createInitials';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import Avatar from '../../common/Avatar/Avatar';
import Button from '../../common/Button/Button';
import modalStyles from '../Modal/Modal.module.css';

const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 МБ

// Редагування профілю: PATCH /api/profile через хук usePost
export default function EditProfileModal({ onClose }) {
  const { t, language } = useLanguage();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const { mutate: saveProfile, loading, error } = usePost('/profile', { method: 'PATCH' });
  const [form, setForm] = useState({
    name: user.name,
    handle: user.handle,
    bio: user.bio,
    avatar: user.avatar,
  });
  const [localError, setLocalError] = useState('');
  const ua = language === 'ua';

  const loadAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_AVATAR_SIZE) {
      setLocalError(ua ? 'Файл завеликий (максимум 2 МБ)' : 'File is too large (max 2 MB)');
      return;
    }

    setLocalError('');
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, avatar: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setLocalError(t('auth.nameRequired'));
      return;
    }
    setLocalError('');

    try {
      const updated = await saveProfile({ ...form, name: form.name.trim() });
      updateUser(updated);
      showToast(t('profile.saved'), 'success');
      onClose();
    } catch {
      // текст помилки вже лежить у змінній error хука usePost
    }
  };

  const message = localError || getErrorMessage(error, t);

  return (
    <div
      className={modalStyles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={modalStyles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-title"
      >
        <button className={modalStyles.close} onClick={onClose} aria-label={t('common.close')}>
          ×
        </button>

        <span className="eyebrow">{ua ? 'НАЛАШТУВАННЯ ПРОФІЛЮ' : 'PROFILE SETTINGS'}</span>

        <h2 id="edit-title">{ua ? 'Редагувати профіль' : 'Edit profile'}</h2>

        <form className={modalStyles.form} onSubmit={handleSubmit} noValidate>
          {message && (
            <div className={modalStyles.formError} role="alert">
              {message}
            </div>
          )}

          <div>
            <Avatar src={form.avatar} initials={createInitials(form.name)} />

            <label>
              {ua ? 'Змінити аватар' : 'Change avatar'}
              <input type="file" accept="image/*" onChange={loadAvatar} />
            </label>
          </div>

          <label>
            {t('auth.name')}
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </label>

          <label>
            {ua ? 'ІМ’Я КОРИСТУВАЧА' : 'USERNAME'}
            <input
              value={form.handle}
              onChange={(event) => setForm({ ...form, handle: event.target.value })}
            />
          </label>

          <label>
            {ua ? 'ПРО СЕБЕ' : 'BIO'}
            <textarea
              rows="4"
              value={form.bio}
              onChange={(event) => setForm({ ...form, bio: event.target.value })}
            />
          </label>

          <div className={modalStyles.footer}>
            <Button variant="glass" onClick={onClose}>
              {t('common.cancel')}
            </Button>

            <Button type="submit" loading={loading} loadingText={t('common.saving')}>
              {ua ? 'Зберегти' : 'Save changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
