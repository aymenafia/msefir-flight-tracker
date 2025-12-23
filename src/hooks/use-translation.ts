'use client';

import { useLanguage } from './use-language';

export function useTranslation() {
  const { translations } = useLanguage();

  function t(key: string): string {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Return the key itself if translation is not found
      }
    }
    return result || key;
  }

  return { t };
}
