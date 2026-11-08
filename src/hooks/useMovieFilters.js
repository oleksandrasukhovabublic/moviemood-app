import { useCallback, useState } from 'react';
import { useDebounce } from './useDebounce';
import { useMovies } from './useMovies';

export const DEFAULT_FILTERS = {
  mood: 'all',
  genre: 'all',
  year: 1990,
  rating: 6,
  sort: 'popular',
};

// Стан фільтрів каталогу + завантаження результатів із сервера.
// Запит відправляється із затримкою 300 мс, щоб слайдер не засипав сервер запитами.
export function useMovieFilters(search = '') {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateFilter = useCallback((key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const query = useDebounce({ ...filters, search }, 300);
  const { movies, loading, error, refetch } = useMovies(query);

  return { filters, updateFilter, resetFilters, movies, loading, error, refetch };
}
