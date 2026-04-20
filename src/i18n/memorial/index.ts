import { getLanguage } from '../index';
import { timeline as frTl, bio as frBio, type TimelineEvent } from './fr';
import { timeline as enTl, bio as enBio } from './en';
import { timeline as esTl, bio as esBio } from './es';
import { timeline as zhTl, bio as zhBio } from './zh';

const tl = { fr: frTl, en: enTl, es: esTl, zh: zhTl } as const;
const bios = { fr: frBio, en: enBio, es: esBio, zh: zhBio } as const;

export interface MemorialContent {
  timeline: TimelineEvent[];
  bio: string;
}

export function getMemorialContent(): MemorialContent {
  const lang = getLanguage();
  return { timeline: tl[lang], bio: bios[lang] };
}

export type { TimelineEvent };
