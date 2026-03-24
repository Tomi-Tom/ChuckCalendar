export type ContentType = 'fact' | 'citation' | 'anecdote';

export interface CalendarEntry {
  type: ContentType;
  text: string;
  source?: string;
}

// Placeholder — will be replaced by full content from Task 3 subagent
export const calendarContent: Record<string, CalendarEntry> = {};

export function getCalendarEntry(month: number, day: number): CalendarEntry {
  const key = `${month}-${day}`;
  return calendarContent[key] ?? {
    type: 'fact' as ContentType,
    text: 'Le contenu de ce jour est en cours de rédaction...',
  };
}
