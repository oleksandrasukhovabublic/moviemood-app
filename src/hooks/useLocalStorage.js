import { useEffect, useState } from 'react';
import { storageService } from '../services/storageService';

// Як useState, але значення зберігається в localStorage.
// Читає і JSON ("\"dark\""), і звичайний рядок (dark) — для сумісності зі старими даними.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const raw = storageService.get(key);
    if (raw === null) return initialValue;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  });

  useEffect(() => {
    storageService.set(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
