export const LANGUAGE_CODES = ['fr', 'en', 'es', 'zh'] as const;
export type LanguageCode = typeof LANGUAGE_CODES[number];

export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === 'string' && (LANGUAGE_CODES as readonly string[]).includes(value);
}
