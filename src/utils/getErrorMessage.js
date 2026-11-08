// Перетворює помилку API на зрозумілий текст потрібною мовою.
// t — функція перекладу з useLanguage().
export function getErrorMessage(error, t) {
  if (!error) return '';
  switch (error.status) {
    case 0:
      return t('errors.network');
    case 401:
      return error.message && error.message !== 'Необхідна авторизація'
        ? t('auth.invalidCredentials')
        : t('errors.unauthorized');
    case 404:
      return t('errors.notFound');
    case 409:
      return /email/i.test(error.message) ? t('auth.emailTaken') : t('collections.exists');
    default:
      return error.message || t('errors.generic');
  }
}
