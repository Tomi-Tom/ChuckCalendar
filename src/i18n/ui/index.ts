import { getLanguage } from '../index';
import type { UIKey } from './fr';
import { ui as fr } from './fr';
import { ui as en } from './en';
import { ui as es } from './es';
import { ui as zh } from './zh';

const dicts = { fr, en, es, zh } as const;

export function t(key: UIKey): string {
  const dict = dicts[getLanguage()];
  const value = dict[key];
  if (value === undefined) {
    console.warn(`[i18n] Missing key: ${key} for language ${getLanguage()}`);
    return `[${key}]`;
  }
  return value;
}

export type { UIKey };
