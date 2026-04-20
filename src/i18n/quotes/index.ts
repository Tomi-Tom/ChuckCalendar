import { getLanguage } from '../index';
import { quotes as fr, type Quote } from './fr';
import { quotes as en } from './en';
import { quotes as es } from './es';
import { quotes as zh } from './zh';
import { quotes as ko } from './ko';
import { quotes as ja } from './ja';
import { quotes as it } from './it';
import { quotes as de } from './de';

const dicts = { fr, en, es, zh, ko, ja, it, de } as const;

export function getQuotesContent(): Quote[] {
  return dicts[getLanguage()];
}

export type { Quote };
