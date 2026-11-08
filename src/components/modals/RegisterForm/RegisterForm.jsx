import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../hooks/useLanguage';
import { useToast } from '../../../hooks/useToast';
import { PASSWORD_MIN_LENGTH } from '../../../utils/constants';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { validateRegister } from '../../../utils/validators';
import Button from '../../common/Button/Button';
import modalStyles from '../Modal/Modal.module.css';

// Форма реєстрації: валідація (імʼя, email, пароль ≥ 6 символів, збіг паролів) + запит на сервер.
// Після успіху користувач одразу авторизований.
export default function RegisterForm({ onSuccess }) {
  const { t } = useLanguage();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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
    const errors = validateRegister(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setLoading(true);
    setFormError('');
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      showToast(t('auth.registered'), 'success');
      onSuccess();
    } catch (error) {
      setFormError(getErrorMessage(error, t));
      setLoading(false);
    }
  };

  const field = (name, label, props) => (
    <label>
      {label}
      <input
        name={name}
        value={form[name]}
        onChange={update(name)}
        className={fieldErrors[name] ? modalStyles.invalid : ''}
        {...props}
      />
      {fieldErrors[name] && (
        <span className={modalStyles.fieldError}>
          {t(fieldErrors[name], { min: PASSWORD_MIN_LENGTH })}
        </span>
      )}
    </label>
  );

  return (
    <form className={modalStyles.form} onSubmit={handleSubmit} noValidate>
      {formError && (
        <div className={modalStyles.formError} role="alert">
          {formError}
        </div>
      )}

      {field('name', t('auth.name'), {
        autoComplete: 'name',
        placeholder: t('auth.namePlaceholder'),
      })}

      {field('email', t('auth.email'), {
        type: 'email',
        autoComplete: 'email',
        placeholder: 'name@example.com',
      })}

      {field('password', t('auth.password'), {
        type: 'password',
        autoComplete: 'new-password',
        placeholder: '••••••••',
      })}

      {field('confirmPassword', t('auth.confirmPassword'), {
        type: 'password',
        autoComplete: 'new-password',
        placeholder: '••••••••',
      })}

      <Button type="submit" loading={loading} loadingText={t('auth.registering')}>
        {t('auth.register')}
      </Button>
    </form>
  );
}
