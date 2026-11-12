import { EMAIL_PATTERN, PASSWORD_MIN_LENGTH } from './constants';

// Валідатори повертають обʼєкт { поле: 'ключ перекладу' }. Порожній обʼєкт — помилок немає.
export function validateLogin({ email, password }) {
  const errors = {};
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'auth.emailInvalid';
  if (!password) errors.password = 'auth.passwordRequired';
  return errors;
}

export function validateRegister({ name, email, password, confirmPassword }) {
  const errors = {};
  if (!name.trim()) errors.name = 'auth.nameRequired';
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'auth.emailInvalid';
  if (password.length < PASSWORD_MIN_LENGTH) errors.password = 'auth.passwordShort';
  if (confirmPassword !== password) errors.confirmPassword = 'auth.passwordMismatch';
  return errors;
}
