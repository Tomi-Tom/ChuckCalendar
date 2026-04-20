import { getLanguage, t } from '../index';
import { calendarContent as fr, type CalendarEntry, type ContentType } from './fr';
import { calendarContent as en } from './en';
import { calendarContent as es } from './es';
import { calendarContent as zh } from './zh';

const dicts = { fr, en, es, zh } as const;

const fallbackEntry = (): CalendarEntry => ({
  type: 'anecdote',
  text: t('calendar.fallback.message'),
  source: t('calendar.fallback.title'),
});

export function getCalendarContent(): Record<string, CalendarEntry> {
  return dicts[getLanguage()];
}

export function getCalendarEntry(month: number, day: number): CalendarEntry {
  const key = `${month}-${day}`;
  const dict = getCalendarContent();
  if (dict[key]) return dict[key];
  // Si la clé existe en FR mais pas dans la langue active : message de fallback localisé
  if (fr[key]) return fallbackEntry();
  // Sécurité absolue
  return { type: 'anecdote', text: '...', source: undefined };
}

export type { CalendarEntry, ContentType };
