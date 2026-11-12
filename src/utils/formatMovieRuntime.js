// 166 → «2 год 46 хв» / «2h 46m»
export function formatMovieRuntime(minutes, language = 'ua') {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const [h, m] = language === 'ua' ? ['год', 'хв'] : ['h', 'm'];
  if (!hours) return `${rest} ${m}`;
  return rest ? `${hours} ${h} ${rest} ${m}` : `${hours} ${h}`;
}
