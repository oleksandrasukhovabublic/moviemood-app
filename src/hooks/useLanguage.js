import { useContext } from 'react';
import { LanguageContext } from '../context/contexts';

// { language: 'ua' | 'en', setLanguage, t('ключ', { змінні }) }
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage потрібно викликати всередині <LanguageProvider>');
  return value;
}
