import { useState } from 'react';
import Avatar from '../../common/Avatar/Avatar';
import modalStyles from '../Modal/Modal.module.css';

export default function EditProfileModal({ language, profile, onClose, onSave }) {
  const [form, setForm] = useState(profile);
  const ua = language === 'ua';

  const updateName = (name) => {
    setForm({
      ...form,
      name,
      initials: name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    });
  };

  const loadAvatar = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        avatar: String(reader.result),
      }));
    };

    reader.readAsDataURL(file);
  };

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
        <button className={modalStyles.close} onClick={onClose}>
          ×
        </button>

        <span className="eyebrow">{ua ? 'НАЛАШТУВАННЯ ПРОФІЛЮ' : 'PROFILE SETTINGS'}</span>

        <h2 id="edit-title">{ua ? 'Редагувати профіль' : 'Edit profile'}</h2>

        <div>
          <Avatar src={form.avatar} initials={form.initials} />

          <label>
            {ua ? 'Змінити аватар' : 'Change avatar'}

            <input type="file" accept="image/*" onChange={loadAvatar} />
          </label>
        </div>

        <form
          className={modalStyles.form}
          onSubmit={(event) => {
            event.preventDefault();
            onSave(form);
          }}
        >
          <label>
            {ua ? 'ІМ’Я' : 'NAME'}

            <input value={form.name} onChange={(event) => updateName(event.target.value)} />
          </label>

          <label>
            {ua ? 'ІМ’Я КОРИСТУВАЧА' : 'USERNAME'}

            <input
              value={form.handle}
              onChange={(event) =>
                setForm({
                  ...form,
                  handle: event.target.value,
                })
              }
            />
          </label>

          <label>
            {ua ? 'ПРО СЕБЕ' : 'BIO'}

            <textarea
              rows="4"
              value={form.bio}
              onChange={(event) =>
                setForm({
                  ...form,
                  bio: event.target.value,
                })
              }
            />
          </label>

          <div className={modalStyles.footer}>
            <button type="button" className="button button--glass" onClick={onClose}>
              {ua ? 'Скасувати' : 'Cancel'}
            </button>

            <button className="button button--primary">{ua ? 'Зберегти' : 'Save changes'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
