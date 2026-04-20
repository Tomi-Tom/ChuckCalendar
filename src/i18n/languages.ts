import type { LanguageCode } from './types';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;       // native name (e.g. "Français")
  flagSvg: string;    // inline SVG string
  switchLabel: string; // for aria-label, in target language
}

const FLAG_FR = `<svg viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="8" height="18" x="0" fill="#0055A4"/>
  <rect width="8" height="18" x="8" fill="#FFFFFF"/>
  <rect width="8" height="18" x="16" fill="#EF4135"/>
</svg>`;

const FLAG_EN = `<svg viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="24" height="18" fill="#012169"/>
  <path d="M0,0 L24,18 M24,0 L0,18" stroke="#FFFFFF" stroke-width="3"/>
  <path d="M0,0 L24,18 M24,0 L0,18" stroke="#C8102E" stroke-width="1.5"/>
  <path d="M12,0 V18 M0,9 H24" stroke="#FFFFFF" stroke-width="4"/>
  <path d="M12,0 V18 M0,9 H24" stroke="#C8102E" stroke-width="2.5"/>
</svg>`;

const FLAG_ES = `<svg viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="24" height="4.5" y="0" fill="#AA151B"/>
  <rect width="24" height="9" y="4.5" fill="#F1BF00"/>
  <rect width="24" height="4.5" y="13.5" fill="#AA151B"/>
</svg>`;

const FLAG_ZH = `<svg viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="24" height="18" fill="#EE1C25"/>
  <g fill="#FFDE00">
    <polygon points="4.5,3 5.2,5.2 7.5,5.2 5.6,6.6 6.4,8.8 4.5,7.4 2.6,8.8 3.4,6.6 1.5,5.2 3.8,5.2"/>
    <polygon points="9,2 9.2,2.7 10,2.8 9.4,3.3 9.6,4 9,3.6 8.4,4 8.6,3.3 8,2.8 8.8,2.7"/>
    <polygon points="11,4 11.2,4.7 12,4.8 11.4,5.3 11.6,6 11,5.6 10.4,6 10.6,5.3 10,4.8 10.8,4.7"/>
    <polygon points="11,7 11.2,7.7 12,7.8 11.4,8.3 11.6,9 11,8.6 10.4,9 10.6,8.3 10,7.8 10.8,7.7"/>
    <polygon points="9,9 9.2,9.7 10,9.8 9.4,10.3 9.6,11 9,10.6 8.4,11 8.6,10.3 8,9.8 8.8,9.7"/>
  </g>
</svg>`;

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  fr: { code: 'fr', name: 'Français', flagSvg: FLAG_FR, switchLabel: 'Passer en français' },
  en: { code: 'en', name: 'English',  flagSvg: FLAG_EN, switchLabel: 'Switch to English' },
  es: { code: 'es', name: 'Español',  flagSvg: FLAG_ES, switchLabel: 'Cambiar a español' },
  zh: { code: 'zh', name: '中文',      flagSvg: FLAG_ZH, switchLabel: '切换到中文' },
};

export const DEFAULT_LANGUAGE: LanguageCode = 'fr';
