// Note: import depuis '../index' crée une dépendance circulaire douce
// (src/i18n/index.ts re-exporte depuis ./ui). OK aujourd'hui car aucun
// des deux modules n'évalue l'autre au top-level. Ne JAMAIS appeler t()
// depuis du code top-level dans src/i18n/index.ts.
import { getLanguage } from '../index';
import type { UIKey } from './fr';
import { ui as fr } from './fr';
import { ui as en } from './en';
import { ui as es } from './es';
import { ui as zh } from './zh';
import { ui as ko } from './ko';
import { ui as ja } from './ja';
import { ui as it } from './it';
import { ui as de } from './de';

const dicts = { fr, en, es, zh, ko, ja, it, de } as const;

export function t(key: UIKey): string {
  const dict = dicts[getLanguage()];
  const value = dict[key];
  if (value === undefined) {
    console.warn(`[i18n] Missing key: ${key} for language ${getLanguage()}`);
    return `[${key}]`;
  }
  return value;
}
