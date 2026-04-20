import { getLanguage } from '../index';
import { timeline as frTl, bio as frBio, type TimelineEvent } from './fr';
import { timeline as enTl, bio as enBio } from './en';
import { timeline as esTl, bio as esBio } from './es';
import { timeline as zhTl, bio as zhBio } from './zh';
import { timeline as koTl, bio as koBio } from './ko';
import { timeline as jaTl, bio as jaBio } from './ja';
import { timeline as itTl, bio as itBio } from './it';
import { timeline as deTl, bio as deBio } from './de';

const tl = { fr: frTl, en: enTl, es: esTl, zh: zhTl, ko: koTl, ja: jaTl, it: itTl, de: deTl } as const;
const bios = { fr: frBio, en: enBio, es: esBio, zh: zhBio, ko: koBio, ja: jaBio, it: itBio, de: deBio } as const;

export interface MemorialContent {
  timeline: TimelineEvent[];
  bio: string;
}

export function getMemorialContent(): MemorialContent {
  const lang = getLanguage();
  return { timeline: tl[lang], bio: bios[lang] };
}

export type { TimelineEvent };
