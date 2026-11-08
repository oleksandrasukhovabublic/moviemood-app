// Перетворює обʼєкт фільтрів у рядок запиту: { genre: 'Drama', mood: 'all' } → '?genre=Drama'
export function buildQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'all') {
      query.set(key, String(value));
    }
  });
  const text = query.toString();
  return text ? `?${text}` : '';
}

// Адреси API для фільмів. Самі запити виконує хук useFetch (GET), тому сервіс повертає шляхи.
export const movieService = {
  listUrl: (params) => `/movies${buildQuery(params)}`,
  detailsUrl: (id) => `/movies/${id}`,
  recommendationsUrl: (mood) => `/movies/recommendations${buildQuery({ mood })}`,
};
