import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../hooks/useLanguage';
import { useToast } from '../../../hooks/useToast';
import { DEMO_ACCOUNT } from '../../../utils/constants';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { validateLogin } from '../../../utils/validators';
import Button from '../../common/Button/Button';
import modalStyles from '../Modal/Modal.module.css';

// Форма входу: перевірка полів → запит на сервер → повідомлення про помилку (невірний пароль тощо)
export default function LoginForm({ onSuccess }) {
  const { t } = useLanguage();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateLogin(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setLoading(true);
    setFormError('');
    try {
      const user = await login({ email: form.email.trim(), password: form.password });
      showToast(t('auth.welcome', { name: user.name }), 'success');
      onSuccess();
    } catch (error) {
      setFormError(getErrorMessage(error, t));
      setLoading(false);
    }
  };

  return (
    <form className={modalStyles.form} onSubmit={handleSubmit} noValidate>
      {formError && (
        <div className={modalStyles.formError} role="alert">
          {formError}
        </div>
      )}

      <label>
        {t('auth.email')}
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={form.email}
          onChange={update('email')}
          className={fieldErrors.email ? modalStyles.invalid : ''}
        />
        {fieldErrors.email && (
          <span className={modalStyles.fieldError}>{t(fieldErrors.email)}</span>
        )}
      </label>

      <label>
        {t('auth.password')}
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={update('password')}
          className={fieldErrors.password ? modalStyles.invalid : ''}
        />
        {fieldErrors.password && (
          <span className={modalStyles.fieldError}>{t(fieldErrors.password)}</span>
        )}
      </label>

      <Button type="submit" loading={loading} loadingText={t('auth.signingIn')}>
        {t('auth.signIn')}
      </Button>

      <p className={modalStyles.hint}>
        {t('auth.demoHint')} <code>{DEMO_ACCOUNT.email}</code> /{' '}
        <code>{DEMO_ACCOUNT.password}</code>
        <button type="button" onClick={() => setForm({ ...DEMO_ACCOUNT })}>
          {t('auth.fillDemo')}
        </button>
      </p>
    </form>
  );
}
