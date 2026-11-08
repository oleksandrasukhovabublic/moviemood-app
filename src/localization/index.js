import { DEFAULT_LANGUAGE } from '../utils/constants';
import { translations } from './translations';

// translate('ua', 'auth.welcome', { name: 'Саша' }) → «Вітаємо, Саша!»
// Якщо ключа немає — повертаємо сам ключ, щоб помилку було видно.
export function translate(language, key, vars = {}) {
  const dictionary = translations[language] ?? translations[DEFAULT_LANGUAGE];
  const value = key.split('.').reduce((node, part) => node?.[part], dictionary);

  if (typeof value !== 'string') return key;
  return value.replace(/\{(\w+)\}/g, (_, name) =>
    name in vars ? String(vars[name]) : `{${name}}`
  );
}
