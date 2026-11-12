import { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import LoginForm from '../LoginForm/LoginForm';
import modalStyles from '../Modal/Modal.module.css';
import RegisterForm from '../RegisterForm/RegisterForm';
import styles from './AuthModal.module.css';

// Вікно входу / реєстрації. Саму логіку роблять LoginForm і RegisterForm.
export default function AuthModal({ onClose }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState('login');

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
        aria-labelledby="auth-title"
      >
        <button className={modalStyles.close} onClick={onClose} aria-label={t('common.close')}>
          ×
        </button>

        <div className={styles.brand}>
          <span>M</span>
          <strong>MovieMood</strong>
        </div>

        <small className="eyebrow">{t('auth.eyebrow')}</small>

        <h2 id="auth-title">{tab === 'login' ? t('auth.welcomeBack') : t('auth.createAccount')}</h2>

        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'login'}
            className={tab === 'login' ? styles.active : ''}
            onClick={() => setTab('login')}
          >
            {t('auth.tabLogin')}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={tab === 'register'}
            className={tab === 'register' ? styles.active : ''}
            onClick={() => setTab('register')}
          >
            {t('auth.tabRegister')}
          </button>
        </div>

        {tab === 'login' ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}
      </div>
    </div>
  );
}
