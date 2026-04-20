import { getLanguage } from '../index';
import { videos as fr, type Video } from './fr';
import { videos as en } from './en';
import { videos as es } from './es';
import { videos as zh } from './zh';
import { videos as ko } from './ko';
import { videos as ja } from './ja';
import { videos as it } from './it';
import { videos as de } from './de';

const dicts = { fr, en, es, zh, ko, ja, it, de } as const;

export function getVideosContent(): Video[] {
  return dicts[getLanguage()];
}

export type { Video };
