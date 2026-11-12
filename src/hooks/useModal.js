import { useCallback, useState } from 'react';

// Стан «відкрите / закрите» для модальних вікон
export function useModal(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((current) => !current), []);

  return { isOpen, open, close, toggle };
}
