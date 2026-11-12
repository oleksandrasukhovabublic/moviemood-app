import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

// Хук для отримання даних (GET): loading / error / refetch, скасування застарілих запитів.
// Якщо url === null — запит не виконується (наприклад, користувач не авторизований).
// key — довільне значення: коли воно змінюється, запит виконується знову (напр. після входу в акаунт).
export function useFetch(url, { initialData = null, key = null } = {}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    api
      .get(url, { signal: controller.signal })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [url, version, key]);

  const refetch = useCallback(() => setVersion((v) => v + 1), []);

  return { data, setData, loading, error, refetch };
}
