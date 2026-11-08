import { useCallback, useState } from 'react';
import { api } from '../services/api';

// Хук для відправки даних на сервер (POST/PATCH/DELETE): повертає mutate + loading / error
export function usePost(url, { method = 'POST' } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);
      try {
        return await api[method.toLowerCase()](url, body);
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, method]
  );

  return { mutate, loading, error };
}
