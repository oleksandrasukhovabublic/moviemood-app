import { useCallback, useEffect, useState } from 'react';
import { profileService } from '../services/profileService';

// Універсальний хук для списків користувача (favorites / watchlist / watched)
// з оптимістичним оновленням: інтерфейс реагує одразу, а при помилці сервера — відкат.
export function useMovieList(listName, isAuthenticated) {
  const [ids, setIds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setIds([]);
      return undefined;
    }
    const controller = new AbortController();
    profileService
      .getList(listName, { signal: controller.signal })
      .then(setIds)
      .catch((err) => err.name !== 'AbortError' && setError(err));
    return () => controller.abort();
  }, [listName, isAuthenticated]);

  // Додає фільм, якщо його немає в списку, і прибирає, якщо є. При помилці кидає її далі.
  const toggle = useCallback(
    async (movieId) => {
      const previous = ids;
      const exists = ids.includes(movieId);
      setIds(exists ? ids.filter((id) => id !== movieId) : [...ids, movieId]);
      setError(null);
      try {
        const next = exists
          ? await profileService.removeFromList(listName, movieId)
          : await profileService.addToList(listName, movieId);
        setIds(next);
        return { ids: next, added: !exists };
      } catch (err) {
        setIds(previous);
        setError(err);
        throw err;
      }
    },
    [ids, listName]
  );

  return { ids, setIds, toggle, error };
}
