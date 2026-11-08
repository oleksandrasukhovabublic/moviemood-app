import { useState } from 'react';
import type { Language } from '../App';

interface Props {
  language: Language;
  onClose: () => void;
  onSuccess: () => void;
}

type Tab = 'login' | 'register';

export default function AuthModal({
  language,
  onClose,
  onSuccess,
}: Props) {
  const [tab, setTab] = useState<Tab>('login');
  const ua = language === 'ua';

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    onSuccess();
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label={ua ? 'Закрити' : 'Close'}
        >
          ×
        </button>

        <div className="modal__brand">
          <span className="brand__mark">M</span>
          <strong>MovieMood</strong>
        </div>

        <span className="eyebrow">
          {ua
            ? 'ТВІЙ ОСОБИСТИЙ КІНОПРОСТІР'
            : 'YOUR PERSONAL CINEMA SPACE'}
        </span>

        <h2 id="auth-title">
          {tab === 'login'
            ? ua
              ? 'Раді бачити знову'
              : 'Welcome back'
            : ua
              ? 'Створи акаунт'
              : 'Create an account'}
        </h2>

        <div
          className="modal-tabs"
          role="tablist"
          aria-label={
            ua
              ? 'Вхід або реєстрація'
              : 'Sign in or register'
          }
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'login'}
            className={tab === 'login' ? 'active' : ''}
            onClick={() => setTab('login')}
          >
            {ua ? 'Вхід' : 'Sign in'}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={tab === 'register'}
            className={
              tab === 'register' ? 'active' : ''
            }
            onClick={() => setTab('register')}
          >
            {ua ? 'Реєстрація' : 'Register'}
          </button>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          {tab === 'register' && (
            <label>
              {ua ? 'ІМ’Я' : 'NAME'}

              <input
                required
                name="name"
                autoComplete="name"
                placeholder={
                  ua
                    ? 'Як до вас звертатися?'
                    : 'Your name'
                }
              />
            </label>
          )}

          <label>
            EMAIL

            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="name@example.com"
            />
          </label>

          <label>
            {ua ? 'ПАРОЛЬ' : 'PASSWORD'}

            <input
              required
              type="password"
              name="password"
              autoComplete={
                tab === 'login'
                  ? 'current-password'
                  : 'new-password'
              }
              placeholder="••••••••"
            />
          </label>

          {tab === 'register' && (
            <label>
              {ua
                ? 'ПІДТВЕРДЖЕННЯ ПАРОЛЯ'
                : 'CONFIRM PASSWORD'}

              <input
                required
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </label>
          )}

          <button
            className="button button--primary"
            type="submit"
          >
            {tab === 'login'
              ? ua
                ? 'Увійти'
                : 'Sign in'
              : ua
                ? 'Зареєструватися'
                : 'Create account'}
          </button>
        </form>

        {tab === 'login' && (
          <>
            <div className="auth-divider">
              <span>
                {ua
                  ? 'або продовжити через'
                  : 'or continue with'}
              </span>
            </div>

            <div className="social-auth">
              <button
                type="button"
                onClick={onSuccess}
              >
                <b>G</b> Google
              </button>

              <button
                type="button"
                onClick={onSuccess}
              >
                <b>⌘</b> GitHub
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
