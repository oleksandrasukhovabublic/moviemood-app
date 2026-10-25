// Назва може бути рядком або об'єктом { ua, en } (як у добірок).
export function getLocalizedTitle(title, language) {
  if (!title) return '';
  if (typeof title === 'string') return title;
  return title[language] || title.ua || title.en || '';
}
