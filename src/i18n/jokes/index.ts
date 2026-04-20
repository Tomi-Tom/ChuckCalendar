import { getLanguage } from '../index';
import { fallbackJokes as fr } from './fr';
import { fallbackJokes as en } from './en';
import { fallbackJokes as es } from './es';
import { fallbackJokes as zh } from './zh';
import { fallbackJokes as ko } from './ko';
import { fallbackJokes as ja } from './ja';
import { fallbackJokes as it } from './it';
import { fallbackJokes as de } from './de';

const dicts = { fr, en, es, zh, ko, ja, it, de } as const;

export function getJokesContent(): string[] {
  return dicts[getLanguage()];
}

export function getRandomFallbackJoke(): string {
  const list = getJokesContent();
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Fetch a Chuck Norris fact. The chuckfacts.xyz API is French-only,
 * so for non-FR languages we always use the local fallback.
 */
export async function fetchJoke(): Promise<string> {
  if (getLanguage() !== 'fr') {
    return getRandomFallbackJoke();
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const response = await fetch("https://chuckfacts.xyz/api/rand", { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) return getRandomFallbackJoke();
    const data = await response.json();
    return data.joke;
  } catch {
    return getRandomFallbackJoke();
  }
}
