import { useMovieList } from './useMovieList';

// Фільми, позначені як переглянуті
export const useWatched = (isAuthenticated) => useMovieList('watched', isAuthenticated);
