import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { translate } from '../localization';
import { DEFAULT_LANGUAGE, LANGUAGES, STORAGE_KEYS } from '../utils/constants';
import { LanguageContext } from './contexts';

// Поточна мова інтерфейсу (запамʼятовується в localStorage) і функція перекладу t()
export function LanguageProvider({ children }) {
  const [stored, setLanguage] = useLocalStorage(STORAGE_KEYS.language, DEFAULT_LANGUAGE);
  const language = LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;

  useEffect(() => {
    document.documentElement.lang = language === 'ua' ? 'uk' : 'en';
  }, [language]);

  const t = useCallback((key, vars) => translate(language, key, vars), [language]);
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
