import { movieService } from '../services/movieService';
import { useFetch } from './useFetch';

// Каталог фільмів із сервера. params: { search, mood, genre, year, rating, sort }
// Фільтрація, пошук і сортування виконуються на сервері (бізнес-логіка бекенду).
export function useMovies(params = {}) {
  const { data, loading, error, refetch } = useFetch(movieService.listUrl(params), {
    initialData: [],
  });

  return { movies: data ?? [], loading, error, refetch };
}

// Один фільм за id (сторінка фільму). Якщо фільму немає — error.status === 404.
export function useMovie(movieId) {
  const { data, loading, error, refetch } = useFetch(
    movieId ? movieService.detailsUrl(movieId) : null
  );

  // при переході з фільму на фільм у data ще лежить попередній — відкидаємо його
  const current = data && String(data.id) === String(movieId) ? data : null;

  return { movie: current, loading, error, refetch };
}

// Рекомендації під настрій; для авторизованих — з урахуванням улюблених і переглянутих жанрів
export function useRecommendations(mood, isAuthenticated) {
  const { data, loading, error } = useFetch(mood ? movieService.recommendationsUrl(mood) : null, {
    initialData: [],
    key: isAuthenticated,
  });

  return { recommendations: data ?? [], loading, error };
}
