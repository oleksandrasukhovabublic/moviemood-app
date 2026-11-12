import { useContext } from 'react';
import { MovieContext } from '../context/contexts';

// Фільми, списки користувача (улюблені / заплановані / переглянуті) і добірки
export function useMovieContext() {
  const value = useContext(MovieContext);
  if (!value) throw new Error('useMovieContext потрібно викликати всередині <MovieProvider>');
  return value;
}
