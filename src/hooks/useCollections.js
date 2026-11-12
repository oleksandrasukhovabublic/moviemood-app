import { useCallback, useEffect, useState } from 'react';
import { collectionService } from '../services/collectionService';

const replaceItem = (list, updated) =>
  list.map((item) => (item.id === updated.id ? updated : item));

// Добірки користувача: завантаження + створення / видалення / додавання та прибирання фільмів.
// Усі дії при помилці кидають її далі — показати повідомлення має той, хто викликав.
export function useCollections(isAuthenticated) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setCollections([]);
      return undefined;
    }
    const controller = new AbortController();
    setLoading(true);
    collectionService
      .getAll({ signal: controller.signal })
      .then((list) => {
        setCollections(list);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err);
        setLoading(false);
      });
    return () => controller.abort();
  }, [isAuthenticated]);

  const create = useCallback(async (title) => {
    const created = await collectionService.create(title);
    setCollections((current) => [...current, created]);
    return created;
  }, []);

  const remove = useCallback(async (collectionId) => {
    await collectionService.remove(collectionId);
    setCollections((current) => current.filter((item) => item.id !== collectionId));
  }, []);

  const addMovie = useCallback(async (collectionId, movieId) => {
    const updated = await collectionService.addMovie(collectionId, movieId);
    setCollections((current) => replaceItem(current, updated));
    return updated;
  }, []);

  const removeMovie = useCallback(async (collectionId, movieId) => {
    const updated = await collectionService.removeMovie(collectionId, movieId);
    setCollections((current) => replaceItem(current, updated));
    return updated;
  }, []);

  return { collections, loading, error, create, remove, addMovie, removeMovie };
}
