import { useMovieList } from './useMovieList';

// Улюблені фільми поточного користувача
export const useFavorites = (isAuthenticated) => useMovieList('favorites', isAuthenticated);
