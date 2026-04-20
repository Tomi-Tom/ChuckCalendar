import { getLanguage } from '../index';
import { videos as fr, type Video } from './fr';
import { videos as en } from './en';
import { videos as es } from './es';
import { videos as zh } from './zh';

const dicts = { fr, en, es, zh } as const;

export function getVideosContent(): Video[] {
  return dicts[getLanguage()];
}

export type { Video };
