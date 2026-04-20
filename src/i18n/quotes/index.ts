import { getLanguage } from '../index';
import { quotes as fr, type Quote } from './fr';
import { quotes as en } from './en';
import { quotes as es } from './es';
import { quotes as zh } from './zh';

const dicts = { fr, en, es, zh } as const;

export function getQuotesContent(): Quote[] {
  return dicts[getLanguage()];
}

export type { Quote };
