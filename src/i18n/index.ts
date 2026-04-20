import { DEFAULT_LANGUAGE } from './languages';
import { isLanguageCode, type LanguageCode } from './types';

type Listener = (lang: LanguageCode) => void;

const STORAGE_KEY = 'lang';

let currentLanguage: LanguageCode = DEFAULT_LANGUAGE;
let initialized = false;
const listeners = new Set<Listener>();

export function getLanguage(): LanguageCode {
  return currentLanguage;
}

export function setLanguage(code: LanguageCode): void {
  if (!isLanguageCode(code) || code === currentLanguage) return;
  currentLanguage = code;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // localStorage indisponible (mode privé strict) : on ignore
  }
  const url = new URL(window.location.href);
  url.searchParams.set('lang', code);
  window.history.replaceState({}, '', url.toString());
  document.documentElement.lang = code;
  for (const cb of [...listeners]) {
    try {
      cb(code);
    } catch (err) {
      console.error('[i18n] listener error', err);
    }
  }
}

export function onLanguageChange(callback: Listener): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function detectInitialLanguage(): LanguageCode {
  const fromUrl = new URL(window.location.href).searchParams.get('lang');
  if (isLanguageCode(fromUrl)) return fromUrl;

  try {
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    if (isLanguageCode(fromStorage)) return fromStorage;
  } catch {
    // ignore
  }

  const fromNavigator = navigator.language?.slice(0, 2).toLowerCase();
  if (isLanguageCode(fromNavigator)) return fromNavigator;

  return DEFAULT_LANGUAGE;
}

export function initI18n(): void {
  if (initialized) return;
  initialized = true;
  currentLanguage = detectInitialLanguage();
  document.documentElement.lang = currentLanguage;
  // Synchronise l'URL avec la langue détectée si elle n'y était pas
  const url = new URL(window.location.href);
  if (url.searchParams.get('lang') !== currentLanguage) {
    url.searchParams.set('lang', currentLanguage);
    window.history.replaceState({}, '', url.toString());
  }
}

// Re-export pour ergonomie
export { LANGUAGES } from './languages';
export type { LanguageCode } from './types';
export { t } from './ui';
export type { UIKey } from './ui/fr';
