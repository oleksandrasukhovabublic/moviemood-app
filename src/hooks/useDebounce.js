import { useEffect, useState } from 'react';

// Затримка значення (в т.ч. об'єкта), щоб не слати запит на кожне натискання клавіші / рух слайдера
export function useDebounce(value, delay = 300) {
  const key = JSON.stringify(value);
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(JSON.parse(key)), delay);
    return () => clearTimeout(timer);
  }, [key, delay]);

  return debounced;
}
