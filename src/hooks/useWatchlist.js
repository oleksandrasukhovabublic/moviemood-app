import { useMovieList } from './useMovieList';

// Фільми, заплановані до перегляду
export const useWatchlist = (isAuthenticated) => useMovieList('watchlist', isAuthenticated);
