import { getLanguage } from '../index';
import { calendarContent as fr, type CalendarEntry, type ContentType } from './fr';
import { calendarContent as en } from './en';
import { calendarContent as es } from './es';
import { calendarContent as zh } from './zh';
import { calendarContent as ko } from './ko';
import { calendarContent as ja } from './ja';
import { calendarContent as it } from './it';
import { calendarContent as de } from './de';

const dicts = { fr, en, es, zh, ko, ja, it, de } as const;

export function getCalendarContent(): Record<string, CalendarEntry> {
  return dicts[getLanguage()];
}

export function getCalendarEntry(month: number, day: number): CalendarEntry {
  const key = `${month}-${day}`;
  const dict = getCalendarContent();
  if (dict[key]) return dict[key];
  // Filet de sécurité : si une entrée manque dans la langue active, on retombe sur le FR
  if (fr[key]) {
    console.warn(`[i18n] Missing calendar entry ${key} for ${getLanguage()}, falling back to FR`);
    return fr[key];
  }
  return { type: 'anecdote', text: '...', source: undefined };
}

export type { CalendarEntry, ContentType };
