# Plan d'implémentation : i18n multilingue (FR / EN / ES / ZH)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Spec source :** [`docs/superpowers/specs/2026-04-20-i18n-multilingue-design.md`](../specs/2026-04-20-i18n-multilingue-design.md)

**Goal :** Permettre à tout visiteur du site de basculer entre français, anglais, espagnol et chinois simplifié via 4 drapeaux dans le navbar, avec persistance et auto-détection.

**Architecture :** Module i18n maison vanilla TS sous `src/i18n/`, avec dictionnaires séparés par langue et par domaine (UI, calendrier, mémorial, citations, blagues, vidéos). Les composants existants se ré-exécutent intégralement sur changement de langue via un système d'abonnement. URL `?lang=xx` + `localStorage` + `navigator.language` pour la détection.

**Tech Stack :** TypeScript 5.9, Vite 8, Tailwind v4 — aucune nouvelle dépendance.

**Note méthodologique :** Le projet n'a pas de framework de tests automatisés (cf. spec). Pour chaque tâche, la vérification consiste en :
1. `npm run build` doit passer (validation TypeScript)
2. `npm run dev` + check visuel dans le navigateur sur `http://localhost:5173`
3. Pour les helpers purs (détection langue, t()), un script de smoke-test ad hoc en console navigateur

---

## Convention pour toutes les tâches

- Chemins toujours absolus à partir de la racine projet (ex: `src/i18n/index.ts`)
- Chaque tâche se termine par un commit avec message conventionnel (`feat:`, `refactor:`, `chore:`)
- Les fichiers de traduction utilisent l'extension `.ts` (pas `.json`) pour bénéficier du typage strict
- Les chaînes longues (mémorial, calendrier) gardent leur indentation TS d'origine
- **NE PAS** introduire de framework de tests, de bibliothèque i18n, ni de refactoring hors scope

---

# Phase 1 — Infrastructure + UI traduite

> Critère de fin : le site est entièrement traduit et navigable dans les 4 langues, sauf le contenu du calendrier (365 entrées) qui reste en FR avec un message de fallback traduit.

## Task 1 : Types i18n et configuration des langues

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/languages.ts`

- [ ] **Step 1 : Créer le fichier de types**

`src/i18n/types.ts` :
```ts
export const LANGUAGE_CODES = ['fr', 'en', 'es', 'zh'] as const;
export type LanguageCode = typeof LANGUAGE_CODES[number];

export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === 'string' && (LANGUAGE_CODES as readonly string[]).includes(value);
}
```

- [ ] **Step 2 : Créer la config des langues + drapeaux SVG inline**

`src/i18n/languages.ts` — chaque entrée contient un nom, le code, le SVG du drapeau (24×18px ratio 4:3), et l'aria-label du bouton de switch.

```ts
import type { LanguageCode } from './types';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;       // nom natif (ex: "Français")
  flagSvg: string;    // SVG inline string
  switchLabel: string; // pour aria-label, dans la langue cible
}

const FLAG_FR = `<svg viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="8" height="18" x="0" fill="#0055A4"/>
  <rect width="8" height="18" x="8" fill="#FFFFFF"/>
  <rect width="8" height="18" x="16" fill="#EF4135"/>
</svg>`;

const FLAG_EN = `<svg viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="24" height="18" fill="#012169"/>
  <path d="M0,0 L24,18 M24,0 L0,18" stroke="#FFFFFF" stroke-width="3"/>
  <path d="M0,0 L24,18 M24,0 L0,18" stroke="#C8102E" stroke-width="1.5"/>
  <path d="M12,0 V18 M0,9 H24" stroke="#FFFFFF" stroke-width="4"/>
  <path d="M12,0 V18 M0,9 H24" stroke="#C8102E" stroke-width="2.5"/>
</svg>`;

const FLAG_ES = `<svg viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="24" height="4.5" y="0" fill="#AA151B"/>
  <rect width="24" height="9" y="4.5" fill="#F1BF00"/>
  <rect width="24" height="4.5" y="13.5" fill="#AA151B"/>
</svg>`;

const FLAG_ZH = `<svg viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="24" height="18" fill="#EE1C25"/>
  <g fill="#FFDE00">
    <polygon points="4.5,3 5.2,5.2 7.5,5.2 5.6,6.6 6.4,8.8 4.5,7.4 2.6,8.8 3.4,6.6 1.5,5.2 3.8,5.2"/>
    <polygon points="9,2 9.2,2.7 10,2.8 9.4,3.3 9.6,4 9,3.6 8.4,4 8.6,3.3 8,2.8 8.8,2.7"/>
    <polygon points="11,4 11.2,4.7 12,4.8 11.4,5.3 11.6,6 11,5.6 10.4,6 10.6,5.3 10,4.8 10.8,4.7"/>
    <polygon points="11,7 11.2,7.7 12,7.8 11.4,8.3 11.6,9 11,8.6 10.4,9 10.6,8.3 10,7.8 10.8,7.7"/>
    <polygon points="9,9 9.2,9.7 10,9.8 9.4,10.3 9.6,11 9,10.6 8.4,11 8.6,10.3 8,9.8 8.8,9.7"/>
  </g>
</svg>`;

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  fr: { code: 'fr', name: 'Français', flagSvg: FLAG_FR, switchLabel: 'Passer en français' },
  en: { code: 'en', name: 'English',  flagSvg: FLAG_EN, switchLabel: 'Switch to English' },
  es: { code: 'es', name: 'Español',  flagSvg: FLAG_ES, switchLabel: 'Cambiar a español' },
  zh: { code: 'zh', name: '中文',      flagSvg: FLAG_ZH, switchLabel: '切换到中文' },
};

export const DEFAULT_LANGUAGE: LanguageCode = 'fr';
```

- [ ] **Step 3 : Vérifier**

```bash
npm run build
```
Attendu : compilation OK (les fichiers ne sont pas encore importés, donc tree-shaké).

- [ ] **Step 4 : Commit**

```bash
git add src/i18n/types.ts src/i18n/languages.ts
git commit -m "feat(i18n): add language types and config with inline SVG flags"
```

---

## Task 2 : Module i18n core (état + API publique)

**Files:**
- Create: `src/i18n/index.ts`

- [ ] **Step 1 : Écrire le module**

`src/i18n/index.ts` :
```ts
import { DEFAULT_LANGUAGE, LANGUAGES } from './languages';
import { isLanguageCode, type LanguageCode } from './types';

type Listener = (lang: LanguageCode) => void;

let currentLanguage: LanguageCode = DEFAULT_LANGUAGE;
const listeners = new Set<Listener>();

export function getLanguage(): LanguageCode {
  return currentLanguage;
}

export function setLanguage(code: LanguageCode): void {
  if (!isLanguageCode(code) || code === currentLanguage) return;
  currentLanguage = code;
  try {
    localStorage.setItem('lang', code);
  } catch {
    // localStorage indisponible (mode privé strict) : on ignore
  }
  const url = new URL(window.location.href);
  url.searchParams.set('lang', code);
  window.history.replaceState({}, '', url.toString());
  document.documentElement.lang = code;
  listeners.forEach((cb) => cb(code));
}

export function onLanguageChange(callback: Listener): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function detectInitialLanguage(): LanguageCode {
  const fromUrl = new URL(window.location.href).searchParams.get('lang');
  if (isLanguageCode(fromUrl)) return fromUrl;

  try {
    const fromStorage = localStorage.getItem('lang');
    if (isLanguageCode(fromStorage)) return fromStorage;
  } catch {
    // ignore
  }

  const fromNavigator = navigator.language?.slice(0, 2).toLowerCase();
  if (isLanguageCode(fromNavigator)) return fromNavigator;

  return DEFAULT_LANGUAGE;
}

export function initI18n(): void {
  currentLanguage = detectInitialLanguage();
  document.documentElement.lang = currentLanguage;
  // Synchronise l'URL avec la langue détectée si elle n'y était pas
  const url = new URL(window.location.href);
  if (url.searchParams.get('lang') !== currentLanguage) {
    url.searchParams.set('lang', currentLanguage);
    window.history.replaceState({}, '', url.toString());
  }
}

// Re-export pour ergonomie
export { LANGUAGES } from './languages';
export type { LanguageCode } from './types';
```

- [ ] **Step 2 : Vérifier**

```bash
npm run build
```
Attendu : compilation OK.

- [ ] **Step 3 : Commit**

```bash
git add src/i18n/index.ts
git commit -m "feat(i18n): add core i18n module with state, listeners and language detection"
```

---

## Task 3 : Dictionnaires UI vides (squelette pour les 4 langues)

**Files:**
- Create: `src/i18n/ui/fr.ts`, `src/i18n/ui/en.ts`, `src/i18n/ui/es.ts`, `src/i18n/ui/zh.ts`
- Create: `src/i18n/ui/index.ts`

- [ ] **Step 1 : Créer le dictionnaire FR (référence) avec toutes les clés UI nécessaires**

`src/i18n/ui/fr.ts` :
```ts
export const ui = {
  // Navbar
  'navbar.brand.title': 'CALENDRIER ACN',
  'navbar.brand.subtitle': "L'ère de Chuck Norris",
  'navbar.link.opening': 'Ouverture',
  'navbar.link.calendar': 'Calendrier',
  'navbar.link.legend': 'La Légende',
  'navbar.link.words': 'Paroles',
  'navbar.link.videos': 'Vidéos',
  'navbar.menu': 'Menu',

  // Hero
  'hero.banner': "Une production de l'Ère ACN",
  'hero.dates': '10 Mars 1940 — 19 Mars 2026',
  'hero.we_are': 'Nous sommes le',
  'hero.day_of_chuck': 'Jour de Chuck',
  'hero.year_acn': 'An',
  'hero.year_acn_suffix': 'ACN',
  'hero.counter.days': 'jours',
  'hero.counter.hours': 'heures',
  'hero.counter.minutes': 'minutes',
  'hero.counter.seconds': 'secondes',

  // Memorial
  'memorial.act': 'Acte I',
  'memorial.title': 'La Légende',
  'memorial.subtitle': 'La Légende Éternelle',
  'memorial.tribute': 'REST IN POWER',

  // Paroles & Exploits
  'paroles.act': 'Acte II',
  'paroles.title': 'Ses Paroles & Exploits',
  'paroles.quotes_label': 'Citations de films',
  'paroles.facts_label': 'Générateur de facts',
  'paroles.thinking': 'Chuck réfléchit...',
  'paroles.button': 'Chuck me a Fact !',
  'paroles.aria.previous': 'Précédent',
  'paroles.aria.next': 'Suivant',
  'paroles.aria.quote_n': 'Citation',

  // Videos
  'videos.act': 'Acte III',
  'videos.title': 'En Action',
  'videos.subtitle': 'Les scènes que même Chuck Norris regarde en boucle',

  // Calendar
  'calendar.title': 'Le Calendrier Sacré',
  'calendar.tagline': '13 mois. 28 jours. Le seul calendrier approuvé par Chuck.',
  'calendar.legend.fact': 'Fact',
  'calendar.legend.citation': 'Citation',
  'calendar.legend.anecdote': 'Anecdote',
  'calendar.view.year': 'Année',
  'calendar.view.month': 'Mois',
  'calendar.year_label': 'An',
  'calendar.modal.prev_day': '← Jour précédent',
  'calendar.modal.next_day': 'Jour suivant →',
  'calendar.badge.fact': 'FACT',
  'calendar.badge.citation': 'CITATION',
  'calendar.badge.anecdote': 'ANECDOTE',
  'calendar.fallback.title': 'Contenu quotidien à venir',
  'calendar.fallback.message': 'Le contenu détaillé pour cette langue est en cours de traduction. Vous pouvez consulter la version française en cliquant sur le drapeau 🇫🇷.',

  // Calendar — noms des 13 mois ACN (jeux de mots français, NOMS PROPRES — identiques dans toutes les langues)
  'calendar.month.1': 'Janorris',
  'calendar.month.2': 'Févriaire',
  'calendar.month.3': 'Marsial',
  'calendar.month.4': 'Avrilanche',
  'calendar.month.5': 'Maistral',
  'calendar.month.6': 'Juingler',
  'calendar.month.7': 'Juillecoup',
  'calendar.month.8': 'Aoûtlaw',
  'calendar.month.9': 'Septembare',
  'calendar.month.10': 'Octobrave',
  'calendar.month.11': 'Novembrise',
  'calendar.month.12': 'Décembrase',
  'calendar.month.13': 'Chucknorembre',

  // Footer
  'footer.tribute': '★ À la mémoire éternelle de Chuck Norris ★',
  'footer.identity': 'Carlos Ray Norris — 10 Mars 1940, Ryan, Oklahoma — 19 Mars 2026, Kauai, Hawaï — 86 ans',
  'footer.calendar': 'Calendrier ACN — Ère Après Chuck Norris',
  'footer.quote': "« Chuck Norris n'a pas besoin d'un site web. Le site web a besoin de Chuck Norris. »",

  // Section separator quotes
  'separator.quote.0': 'La légende ne meurt jamais.',
  'separator.quote.1': "Le temps s'incline devant Chuck Norris.",
  'separator.quote.2': 'Certains hommes deviennent des mythes.',
  'separator.quote.3': "L'éternité a un nom.",
} as const;

export type UIKey = keyof typeof ui;
```

> ✅ **Vérifié** : ces noms correspondent exactement à `ACN_MONTH_NAMES` dans `src/calendar.ts`. Ce sont des noms propres du calendrier ACN (jeux de mots français mêlant le nom du mois et un thème Chuck Norris) : on **ne les traduit pas**, on les garde identiques dans EN, ES et ZH.

- [ ] **Step 2 : Créer les 3 autres dictionnaires (EN, ES, ZH) avec les mêmes clés**

Pour chacun (`src/i18n/ui/en.ts`, `es.ts`, `zh.ts`), copier le shape FR et traduire les valeurs. Le typage `Record<UIKey, string>` garantit que toutes les clés existent.

`src/i18n/ui/en.ts` (exemple complet — suivre le même pattern pour ES et ZH) :
```ts
import type { UIKey } from './fr';

export const ui: Record<UIKey, string> = {
  'navbar.brand.title': 'ACN CALENDAR',
  'navbar.brand.subtitle': 'The Era of Chuck Norris',
  'navbar.link.opening': 'Opening',
  'navbar.link.calendar': 'Calendar',
  'navbar.link.legend': 'The Legend',
  'navbar.link.words': 'Words',
  'navbar.link.videos': 'Videos',
  'navbar.menu': 'Menu',
  'hero.banner': 'An ACN Era Production',
  'hero.dates': 'March 10, 1940 — March 19, 2026',
  'hero.we_are': 'Today is',
  'hero.day_of_chuck': 'Chuck Day',
  'hero.year_acn': 'Year',
  'hero.year_acn_suffix': 'ACN',
  'hero.counter.days': 'days',
  'hero.counter.hours': 'hours',
  'hero.counter.minutes': 'minutes',
  'hero.counter.seconds': 'seconds',
  'memorial.act': 'Act I',
  'memorial.title': 'The Legend',
  'memorial.subtitle': 'The Eternal Legend',
  'memorial.tribute': 'REST IN POWER',
  'paroles.act': 'Act II',
  'paroles.title': 'His Words & Deeds',
  'paroles.quotes_label': 'Movie quotes',
  'paroles.facts_label': 'Facts generator',
  'paroles.thinking': 'Chuck is thinking...',
  'paroles.button': 'Chuck me a Fact!',
  'paroles.aria.previous': 'Previous',
  'paroles.aria.next': 'Next',
  'paroles.aria.quote_n': 'Quote',
  'videos.act': 'Act III',
  'videos.title': 'In Action',
  'videos.subtitle': 'The scenes even Chuck Norris watches on repeat',
  'calendar.title': 'The Sacred Calendar',
  'calendar.tagline': '13 months. 28 days. The only calendar Chuck approves of.',
  'calendar.legend.fact': 'Fact',
  'calendar.legend.citation': 'Quote',
  'calendar.legend.anecdote': 'Anecdote',
  'calendar.view.year': 'Year',
  'calendar.view.month': 'Month',
  'calendar.year_label': 'Year',
  'calendar.modal.prev_day': '← Previous day',
  'calendar.modal.next_day': 'Next day →',
  'calendar.badge.fact': 'FACT',
  'calendar.badge.citation': 'QUOTE',
  'calendar.badge.anecdote': 'ANECDOTE',
  'calendar.fallback.title': 'Daily content coming soon',
  'calendar.fallback.message': 'Detailed content for this language is being translated. You can browse the French version by clicking the 🇫🇷 flag.',
  // Mois ACN — noms propres, IDENTIQUES à fr.ts
  'calendar.month.1': 'Janorris',
  'calendar.month.2': 'Févriaire',
  'calendar.month.3': 'Marsial',
  'calendar.month.4': 'Avrilanche',
  'calendar.month.5': 'Maistral',
  'calendar.month.6': 'Juingler',
  'calendar.month.7': 'Juillecoup',
  'calendar.month.8': 'Aoûtlaw',
  'calendar.month.9': 'Septembare',
  'calendar.month.10': 'Octobrave',
  'calendar.month.11': 'Novembrise',
  'calendar.month.12': 'Décembrase',
  'calendar.month.13': 'Chucknorembre',
  'footer.tribute': '★ In eternal memory of Chuck Norris ★',
  'footer.identity': 'Carlos Ray Norris — March 10, 1940, Ryan, Oklahoma — March 19, 2026, Kauai, Hawaii — 86 years old',
  'footer.calendar': 'ACN Calendar — Era After Chuck Norris',
  'footer.quote': '"Chuck Norris does not need a website. The website needs Chuck Norris."',
  'separator.quote.0': 'Legends never die.',
  'separator.quote.1': 'Time bows before Chuck Norris.',
  'separator.quote.2': 'Some men become myths.',
  'separator.quote.3': 'Eternity has a name.',
};
```

Faire de même pour `es.ts` (espagnol castillan) et `zh.ts` (chinois simplifié). **Dans ES et ZH, garder les 13 noms `calendar.month.*` strictement identiques à FR** (ce sont des noms propres du calendrier ACN, pas du contenu à traduire). Traduire uniquement les libellés narratifs et les chaînes UI.

- [ ] **Step 3 : Créer le router `src/i18n/ui/index.ts`**

```ts
import { getLanguage } from '../index';
import type { UIKey } from './fr';
import { ui as fr } from './fr';
import { ui as en } from './en';
import { ui as es } from './es';
import { ui as zh } from './zh';

const dicts = { fr, en, es, zh } as const;

export function t(key: UIKey): string {
  const dict = dicts[getLanguage()];
  const value = dict[key];
  if (value === undefined) {
    console.warn(`[i18n] Missing key: ${key} for language ${getLanguage()}`);
    return `[${key}]`;
  }
  return value;
}

export type { UIKey };
```

- [ ] **Step 4 : Re-exporter `t` depuis le module principal**

Modifier `src/i18n/index.ts` à la fin :
```ts
export { t } from './ui';
export type { UIKey } from './ui';
```

- [ ] **Step 5 : Vérifier**

```bash
npm run build
```
Attendu : compilation OK. Si une clé manque dans EN/ES/ZH, TypeScript râlera grâce à `Record<UIKey, string>`.

- [ ] **Step 6 : Commit**

```bash
git add src/i18n/ui/ src/i18n/index.ts
git commit -m "feat(i18n): add UI translation dictionaries for FR/EN/ES/ZH"
```

---

## Task 4 : Composant sélecteur de langue (drapeaux)

**Files:**
- Create: `src/components/language-switcher.ts`

- [ ] **Step 1 : Écrire le composant qui rend le HTML des 4 drapeaux**

`src/components/language-switcher.ts` :
```ts
import { LANGUAGES, getLanguage, setLanguage } from '../i18n';
import { LANGUAGE_CODES } from '../i18n/types';

/**
 * Renvoie le HTML d'un sélecteur de langue (4 drapeaux).
 * @param compact si true, taille réduite pour mobile dropdown
 */
export function renderLanguageSwitcher(compact = false): string {
  const current = getLanguage();
  const sizeClass = compact ? 'w-5 h-[15px]' : 'w-6 h-[18px]';
  const buttons = LANGUAGE_CODES.map((code) => {
    const cfg = LANGUAGES[code];
    const isActive = code === current;
    const activeClass = isActive
      ? 'opacity-100 ring-2 ring-gold rounded-sm'
      : 'opacity-50 hover:opacity-100';
    return `<button type="button"
            class="lang-switch-btn ${sizeClass} ${activeClass} transition-all duration-200 cursor-pointer overflow-hidden"
            data-lang="${code}"
            aria-label="${cfg.switchLabel}"
            aria-pressed="${isActive}">
      ${cfg.flagSvg}
    </button>`;
  }).join('');
  return `<div class="lang-switcher flex items-center gap-2">${buttons}</div>`;
}

/**
 * Branche les listeners de click sur tous les boutons `.lang-switch-btn` du document.
 * Idempotent : à appeler après chaque rendu d'un sélecteur.
 */
export function bindLanguageSwitcherEvents(scope: Document | HTMLElement = document): void {
  scope.querySelectorAll<HTMLButtonElement>('.lang-switch-btn').forEach((btn) => {
    // Évite les doubles bindings : retire l'éventuel ancien handler
    btn.replaceWith(btn.cloneNode(true));
  });
  scope.querySelectorAll<HTMLButtonElement>('.lang-switch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.lang;
      if (code) setLanguage(code as ReturnType<typeof getLanguage>);
    });
  });
}
```

- [ ] **Step 2 : Vérifier le build**

```bash
npm run build
```

- [ ] **Step 3 : Commit**

```bash
git add src/components/language-switcher.ts
git commit -m "feat(i18n): add flag-based language switcher component"
```

---

## Task 5 : Initialisation i18n + helper `mountAll` dans main.ts

**Files:**
- Modify: `src/main.ts`

- [ ] **Step 1 : Refactorer `main.ts` pour appeler `initI18n()` et regrouper le rendu**

Remplacer le contenu de `src/main.ts` :
```ts
import "./style.css";
import { initI18n, onLanguageChange } from "./i18n";
import { renderNavbar } from "./components/navbar";
import { renderHero } from "./components/hero";
import { renderCalendar } from "./components/calendar-grid";
import { renderMemorial } from "./components/memorial-section";
import { renderParolesExploits } from "./components/paroles-exploits";
import { renderVideos } from "./components/video-gallery";
import { renderFooter } from "./components/footer";
import { renderSeparator } from "./components/section-separator";

initI18n();

function mountAll(): void {
  renderNavbar();
  renderHero();
  renderCalendar();
  renderMemorial();
  renderParolesExploits();
  renderVideos();
  renderFooter();
  injectSeparators();
  initScrollAnimations();
}

function injectSeparators(): void {
  // Retirer les séparateurs précédents avant d'en ré-injecter
  document.querySelectorAll('[data-separator="true"]').forEach((el) => el.remove());

  const separators: [string, 'quote' | 'star' | 'film', number?][] = [
    ['hero', 'quote', 0],
    ['paroles', 'quote', 1],
  ];
  for (const [afterId, type, quoteIdx] of separators) {
    const section = document.getElementById(afterId);
    if (section) {
      section.insertAdjacentHTML('afterend', renderSeparator(type, quoteIdx));
    }
  }
}

function initScrollAnimations(): void {
  const sections = document.querySelectorAll('main > section');
  sections.forEach((section) => section.classList.add('fade-in-section'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((section) => observer.observe(section));
}

mountAll();
onLanguageChange(() => mountAll());
```

> Note : `injectSeparators` doit ajouter `data-separator="true"` à chaque séparateur pour pouvoir les retirer proprement. **Cela demande de modifier `section-separator.ts`** dans la Task 11.

- [ ] **Step 2 : Vérifier**

```bash
npm run build && npm run dev
```
Attendu : le site se charge identiquement à avant (même contenu, FR par défaut). On peut vérifier en console : `localStorage.getItem('lang')` doit retourner `'fr'` (ou la langue détectée).

- [ ] **Step 3 : Commit**

```bash
git add src/main.ts
git commit -m "refactor(main): wire i18n init and language-change re-mount"
```

---

## Task 6 : Refactor `navbar.ts` — utiliser `t()` + intégrer le sélecteur de langue

**Files:**
- Modify: `src/components/navbar.ts`

- [ ] **Step 1 : Réécrire le navbar pour utiliser `t()` et inclure le `<LanguageSwitcher/>`**

Remplacer `src/components/navbar.ts` :
```ts
import { t } from '../i18n';
import { renderLanguageSwitcher, bindLanguageSwitcherEvents } from './language-switcher';

const NAV_LINKS = [
  { key: 'navbar.link.opening', href: '#hero' },
  { key: 'navbar.link.calendar', href: '#calendar' },
  { key: 'navbar.link.legend', href: '#memorial' },
  { key: 'navbar.link.words', href: '#paroles' },
  { key: 'navbar.link.videos', href: '#videos' },
] as const;

export function renderNavbar(): void {
  const nav = document.getElementById('nav');
  if (!nav) return;

  nav.className =
    'fixed top-0 left-0 w-full z-50 bg-[#0a0500]/95 backdrop-blur border-b-2 border-gold/40';

  nav.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
      <a href="#hero" class="group flex-shrink-0">
        <span class="font-western text-gold text-lg tracking-wide block leading-tight">${t('navbar.brand.title')}</span>
        <span class="text-wheat/40 text-[0.6rem] tracking-[0.15em] uppercase block">${t('navbar.brand.subtitle')}</span>
      </a>

      <ul class="hidden md:flex gap-6 items-center">
        ${NAV_LINKS.map(
          (l) => `<li><a href="${l.href}" class="nav-link text-wheat/50 hover:text-gold transition-colors duration-200 font-body text-xs uppercase tracking-[0.1em]">${t(l.key)}</a></li>`
        ).join('')}
      </ul>

      <div class="flex items-center gap-3">
        <div class="hidden md:block">${renderLanguageSwitcher(false)}</div>

        <button id="nav-toggle" class="md:hidden text-wheat hover:text-gold transition-colors cursor-pointer" aria-label="${t('navbar.menu')}">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>

    <ul id="nav-mobile" class="md:hidden hidden flex-col gap-2 px-4 pb-4 bg-[#0a0500]/95 border-b border-gold/20">
      ${NAV_LINKS.map(
        (l) => `<li><a href="${l.href}" class="nav-link block py-2 text-wheat/50 hover:text-gold transition-colors duration-200 font-body text-sm uppercase tracking-[0.1em]">${t(l.key)}</a></li>`
      ).join('')}
      <li class="pt-2 border-t border-gold/20">${renderLanguageSwitcher(true)}</li>
    </ul>
  `;

  bindLanguageSwitcherEvents(nav);

  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  toggle?.addEventListener('click', () => {
    mobile?.classList.toggle('hidden');
    mobile?.classList.toggle('flex');
  });

  mobile?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobile.classList.add('hidden');
      mobile.classList.remove('flex');
    });
  });

  nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href')!);
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
  const navLinks = nav.querySelectorAll<HTMLAnchorElement>('a.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('text-gold');
              link.classList.remove('text-wheat/50');
            } else {
              link.classList.remove('text-gold');
              link.classList.add('text-wheat/50');
            }
          });
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}
```

- [ ] **Step 2 : Vérifier dans le navigateur**

```bash
npm run dev
```
Ouvrir `http://localhost:5173` :
- Les 4 drapeaux apparaissent à droite des liens (desktop)
- Cliquer sur 🇬🇧 → l'URL devient `?lang=en`, les libellés du navbar passent en anglais, les autres sections aussi (re-render via `mountAll`)
- Recharger → la langue est conservée
- Tester sur mobile (responsive ≤768px) : le sélecteur est dans la dropdown
- Vérifier l'aria-pressed sur les boutons via inspecteur

- [ ] **Step 3 : Commit**

```bash
git add src/components/navbar.ts
git commit -m "feat(navbar): integrate language switcher and translate via t()"
```

---

## Task 7 : Refactor `hero.ts` — t() + cleanup des intervals

**Files:**
- Modify: `src/components/hero.ts`

- [ ] **Step 1 : Identifier le bug existant à corriger**

Le code actuel crée un `setInterval` à chaque appel de `renderHero()` sans nettoyer. Avec le nouveau système de re-mount, chaque changement de langue accumulerait des intervals fantômes.

- [ ] **Step 2 : Réécrire le composant**

Remplacer `src/components/hero.ts` :
```ts
import { getTodayACN } from '../calendar';
import { CHUCK_HERO, CHUCK_YOUNG, CHUCK_ACTION, CHUCK_MEMORIAL } from '../chuck-images';
import { t } from '../i18n';
import { getQuotesContent } from '../i18n/quotes';

let activeIntervals: number[] = [];

function clearActiveIntervals(): void {
  activeIntervals.forEach((id) => clearInterval(id));
  activeIntervals = [];
}

function formatACNTime(): string {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, '0')).join(':');
}

function getTimeSinceDeath() {
  const deathDate = new Date(2026, 2, 19);
  const diff = Date.now() - deathDate.getTime();
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

export function renderHero(): void {
  const hero = document.getElementById('hero');
  if (!hero) return;

  clearActiveIntervals();

  const today = getTodayACN();
  const dateDisplay = today.isChuckDay
    ? `${t('hero.day_of_chuck')} ${today.chuckDayNumber}, ${t('hero.year_acn')} ${today.year} ${t('hero.year_acn_suffix')}`
    : `${today.day} ${today.monthName}, ${t('hero.year_acn')} ${today.year} ${t('hero.year_acn_suffix')}`;

  const time = getTimeSinceDeath();
  const quotes = getQuotesContent();

  hero.innerHTML = `
    <div class="film-grain relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
         style="background: linear-gradient(180deg, #0a0500 0%, #1a0f00 40%, #2a1a08 100%);">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <img src="${CHUCK_YOUNG}" class="absolute top-[5%] left-[3%] w-32 md:w-44 rounded-lg opacity-[0.07] border border-gold/20 slow-drift" style="--drift-rotate:-12deg;--drift-x:8px;--drift-y:-12px" alt="" />
        <img src="${CHUCK_ACTION}" class="absolute top-[10%] right-[3%] w-28 md:w-40 rounded-lg opacity-[0.06] border border-gold/20 slow-drift" style="--drift-rotate:8deg;--drift-x:-10px;--drift-y:8px;animation-delay:-7s" alt="" />
        <img src="${CHUCK_MEMORIAL}" class="absolute bottom-[15%] left-[8%] w-24 opacity-[0.05] slow-drift" style="--drift-rotate:15deg;--drift-x:6px;--drift-y:-8px;animation-delay:-13s" alt="" />
        <img src="${CHUCK_MEMORIAL}" class="absolute bottom-[8%] right-[10%] w-20 opacity-[0.04] slow-drift" style="--drift-rotate:-20deg;--drift-x:-8px;--drift-y:6px;animation-delay:-3s" alt="" />
      </div>

      <div class="absolute top-0 left-0 right-0 text-center py-3 text-wheat/50 text-[0.65rem] tracking-[0.3em] uppercase border-b border-gold/20 z-10">
        ${t('hero.banner')}
      </div>

      <div class="relative z-10 text-center px-4 max-w-3xl mx-auto pt-16">
        <div class="mb-6 flex justify-center">
          <img src="${CHUCK_HERO}" alt="Chuck Norris"
               class="w-28 h-28 md:w-36 md:h-36 rounded-full border-3 border-gold object-cover"
               style="box-shadow: 0 0 30px rgba(218,165,32,0.3);" />
        </div>

        <h1 class="font-western text-gold text-4xl md:text-6xl lg:text-7xl mb-1 tracking-wider glow-pulse">CHUCK NORRIS</h1>
        <p class="text-wheat/60 text-xs tracking-[0.2em] uppercase mb-8">${t('hero.dates')}</p>

        <div class="bg-gold/10 border border-gold/30 rounded-lg py-4 px-6 mx-auto max-w-sm mb-6 shimmer-border">
          <p class="text-wheat/50 text-[0.65rem] tracking-[0.2em] uppercase mb-1">${t('hero.we_are')}</p>
          <p class="text-gold text-xl md:text-2xl font-bold">${dateDisplay}</p>
          <p id="hero-clock" class="font-mono text-wheat/80 text-base mt-1 tabular-nums">${formatACNTime()}</p>
        </div>

        <div class="flex justify-center gap-6 mb-8 flex-wrap">
          ${[
            ['counter-days',    time.days,    'hero.counter.days',    false],
            ['counter-hours',   time.hours,   'hero.counter.hours',   false],
            ['counter-minutes', time.minutes, 'hero.counter.minutes', true],
            ['counter-seconds', time.seconds, 'hero.counter.seconds', true],
          ].map(([id, val, key, pad]) => `
            <div class="text-center">
              <div id="${id}" class="text-2xl text-gold font-bold tabular-nums">${pad ? String(val).padStart(2,'0') : val}</div>
              <div class="text-[0.6rem] uppercase tracking-[0.1em] text-wheat/50">${t(key as Parameters<typeof t>[0])}</div>
            </div>`).join('')}
        </div>

        <div class="border-t border-gold/20 pt-6 max-w-lg mx-auto">
          <blockquote id="hero-quote" class="font-body italic text-wheat/80 text-base md:text-lg leading-relaxed"
                      style="opacity: 1; transition: opacity 0.6s ease-in-out;">
            "${quotes[0].text}"
          </blockquote>
          <p id="hero-quote-source" class="text-wheat/40 text-xs mt-2"
             style="opacity: 1; transition: opacity 0.6s ease-in-out;">
            ${quotes[0].source ? `— ${quotes[0].source}` : ''}
          </p>
        </div>
      </div>
    </div>
  `;

  const clockEl = document.getElementById('hero-clock');
  const daysEl = document.getElementById('counter-days');
  const hoursEl = document.getElementById('counter-hours');
  const minutesEl = document.getElementById('counter-minutes');
  const secondsEl = document.getElementById('counter-seconds');

  activeIntervals.push(window.setInterval(() => {
    if (clockEl) clockEl.textContent = formatACNTime();
    const tt = getTimeSinceDeath();
    if (daysEl) daysEl.textContent = String(tt.days);
    if (hoursEl) hoursEl.textContent = String(tt.hours);
    if (minutesEl) minutesEl.textContent = String(tt.minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(tt.seconds).padStart(2, '0');
  }, 1000));

  let currentIndex = 0;
  const quoteEl = document.getElementById('hero-quote');
  const sourceEl = document.getElementById('hero-quote-source');
  if (!quoteEl || !sourceEl) return;
  const FADE_MS = 600;

  activeIntervals.push(window.setInterval(() => {
    quoteEl.style.opacity = '0';
    sourceEl.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % quotes.length;
      quoteEl.textContent = `"${quotes[currentIndex].text}"`;
      sourceEl.textContent = quotes[currentIndex].source ? `— ${quotes[currentIndex].source}` : '';
      void quoteEl.offsetWidth;
      quoteEl.style.opacity = '1';
      sourceEl.style.opacity = '1';
    }, FADE_MS);
  }, 5000));
}
```

> Note : `getQuotesContent()` n'existe pas encore — sera créé en **Task 8**. Cette task ne builde pas isolément ; elle dépend de Task 8.

**👉 Réordonner : Task 8 doit être faite AVANT Task 7. Voir réordonnancement en fin de plan.**

- [ ] **Step 2 : Vérifier le build (après que Task 8 soit faite)**

```bash
npm run build && npm run dev
```
Vérifier dans le navigateur :
- Le hero affiche les bons textes traduits
- Le compteur tourne (intervals OK)
- Switch de langue → le texte change instantanément, **et un seul interval reste actif** (vérifier console: `setInterval` count via `(() => { let c=0; const orig=window.setInterval; window.setInterval = (...a)=>{c++; return orig(...a)}; setTimeout(()=>console.log(c), 100); })()` ou simplement observer que le compteur n'accélère pas après plusieurs switches)

- [ ] **Step 3 : Commit**

```bash
git add src/components/hero.ts
git commit -m "refactor(hero): use t() and clean up intervals on re-render"
```

---

## Task 8 : Déplacer + traduire `quotes.ts` → `src/i18n/quotes/`

**Files:**
- Create: `src/i18n/quotes/fr.ts` (contenu actuel de `src/quotes.ts`)
- Create: `src/i18n/quotes/en.ts`, `es.ts`, `zh.ts` (traductions)
- Create: `src/i18n/quotes/index.ts`
- Delete: `src/quotes.ts` (après MAJ des imports — fait dans Task 16)

- [ ] **Step 1 : Créer `src/i18n/quotes/fr.ts`**

Copier intégralement le contenu de `src/quotes.ts` dans `src/i18n/quotes/fr.ts`. Aucune modification.

- [ ] **Step 2 : Créer EN/ES/ZH**

Pour chaque langue, créer le fichier avec le même type `Quote[]` et **traduire les 49 citations**. Garder `source` et `year` identiques (les titres de films restent en anglais original).

Exemple `src/i18n/quotes/en.ts` (premières entrées) :
```ts
import type { Quote } from './fr';
export type { Quote };

export const quotes: Quote[] = [
  { text: "When I'm provoked, I don't reply. I act.", source: "Walker, Texas Ranger", year: 1993 },
  { text: "Justice never sleeps.", source: "Walker, Texas Ranger", year: 1995 },
  { text: "I don't need weapons. I am a weapon.", source: "Missing in Action", year: 1984 },
  // ... 46 autres
];
```

Pour ZH, traduction littéraire conservant le ton dramatique (ex: « 当我被挑衅时，我不回答。我行动。 »).

- [ ] **Step 3 : Créer `src/i18n/quotes/index.ts` (helper getter)**

```ts
import { getLanguage } from '../index';
import { quotes as fr, type Quote } from './fr';
import { quotes as en } from './en';
import { quotes as es } from './es';
import { quotes as zh } from './zh';

const dicts = { fr, en, es, zh } as const;

export function getQuotesContent(): Quote[] {
  return dicts[getLanguage()];
}

export type { Quote };
```

- [ ] **Step 4 : Vérifier**

```bash
npm run build
```
Attendu : OK (les imports vers `src/quotes.ts` sont conservés tant que la suppression n'est pas faite). On peut conserver temporairement les deux.

- [ ] **Step 5 : Commit**

```bash
git add src/i18n/quotes/
git commit -m "feat(i18n): add quotes translations for FR/EN/ES/ZH"
```

---

## Task 9 : Déplacer + traduire `jokes.ts` → `src/i18n/jokes/`

**Files:**
- Create: `src/i18n/jokes/fr.ts` (extraire `fallbackJokes` depuis `src/jokes.ts`)
- Create: `src/i18n/jokes/en.ts`, `es.ts`, `zh.ts`
- Create: `src/i18n/jokes/index.ts`

- [ ] **Step 1 : Créer `fr.ts` avec les 30 fallbackJokes du fichier existant**

```ts
export const fallbackJokes: string[] = [
  "Chuck Norris peut diviser par zéro.",
  // ... copier les 30 entrées de src/jokes.ts
];
```

- [ ] **Step 2 : Traduire les 30 blagues en EN, ES, ZH**

Adapter l'humour culturellement. En chinois, certaines blagues techniques (ex. « Chuck Norris peut diviser par zéro ») se traduisent littéralement, d'autres demandent une adaptation.

- [ ] **Step 3 : Créer `src/i18n/jokes/index.ts`**

```ts
import { getLanguage } from '../index';
import { fallbackJokes as fr } from './fr';
import { fallbackJokes as en } from './en';
import { fallbackJokes as es } from './es';
import { fallbackJokes as zh } from './zh';

const dicts = { fr, en, es, zh } as const;

export function getJokesContent(): string[] {
  return dicts[getLanguage()];
}

export function getRandomFallbackJoke(): string {
  const list = getJokesContent();
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Fetch a Chuck Norris fact. L'API chuckfacts.xyz est en français.
 * Pour les autres langues, on utilise toujours le fallback local.
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
```

- [ ] **Step 4 : Vérifier**

```bash
npm run build
```

- [ ] **Step 5 : Commit**

```bash
git add src/i18n/jokes/
git commit -m "feat(i18n): add jokes translations for FR/EN/ES/ZH (API fallback for non-FR)"
```

---

## Task 10 : Refactor `paroles-exploits.ts` — utiliser les helpers i18n

**Files:**
- Modify: `src/components/paroles-exploits.ts`

- [ ] **Step 1 : Remplacer les imports et utiliser les helpers**

Changer dans `src/components/paroles-exploits.ts` :
- Imports : `import { getQuotesContent } from '../i18n/quotes';` et `import { getJokesContent, fetchJoke, getRandomFallbackJoke } from '../i18n/jokes';`
- En tête de `renderParolesExploits()` :
  ```ts
  const quotes = getQuotesContent();
  ```
  Et utiliser `quotes` (variable locale) au lieu de l'ancien import.
- Remplacer toutes les chaînes hardcodées par `t(...)` :
  - `Acte II` → `t('paroles.act')`
  - `Ses Paroles & Exploits` → `t('paroles.title')`
  - `Citations de films` → `t('paroles.quotes_label')`
  - `Générateur de facts` → `t('paroles.facts_label')`
  - `Chuck réfléchit...` → `t('paroles.thinking')`
  - `Chuck me a Fact !` → `t('paroles.button')`
  - `aria-label="Précédent"` → `aria-label="${t('paroles.aria.previous')}"`
  - `aria-label="Suivant"` → `aria-label="${t('paroles.aria.next')}"`
  - `aria-label="Citation ${i + 1}"` → `aria-label="${t('paroles.aria.quote_n')} ${i + 1}"`
- **Cleanup intervals** : déplacer `autoInterval` en variable module-level + clear au début de la fonction (même pattern que hero) :
  ```ts
  let activeInterval: number | undefined;

  export function renderParolesExploits(): void {
    if (activeInterval) { clearInterval(activeInterval); activeInterval = undefined; }
    // ... rest
    activeInterval = window.setInterval(() => goTo(current + 1), 6000);
  }
  ```

- [ ] **Step 2 : Vérifier dans le navigateur**

```bash
npm run dev
```
- Switch de langue : le carousel reset au début, les libellés changent
- Bouton "Chuck me a Fact !" tourne et délivre une blague dans la langue active
- Pas d'accélération du carousel après plusieurs switches (sinon, intervals fuient)

- [ ] **Step 3 : Commit**

```bash
git add src/components/paroles-exploits.ts
git commit -m "refactor(paroles): use i18n helpers and clean up auto-interval"
```

---

## Task 11 : Refactor `section-separator.ts` — t() + tag de séparateur

**Files:**
- Modify: `src/components/section-separator.ts`

- [ ] **Step 1 : Remplacer le tableau hardcodé par `t()` et tagger le séparateur**

```ts
import { t, type UIKey } from '../i18n';

type SeparatorType = 'quote' | 'star' | 'film';

const SEPARATOR_QUOTE_KEYS: UIKey[] = [
  'separator.quote.0',
  'separator.quote.1',
  'separator.quote.2',
  'separator.quote.3',
];

export function renderSeparator(type: SeparatorType, quoteIndex: number = 0): string {
  switch (type) {
    case 'quote':
      return `
        <div data-separator="true" class="py-12 select-none">
          <div class="max-w-2xl mx-auto text-center px-4">
            <div class="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-4"></div>
            <p class="italic text-wheat/60 text-sm separator-animate">"${t(SEPARATOR_QUOTE_KEYS[quoteIndex % SEPARATOR_QUOTE_KEYS.length])}"</p>
            <div class="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-4"></div>
          </div>
        </div>`;
    case 'star':
      return `
        <div data-separator="true" class="py-12 select-none">
          <div class="flex items-center justify-center gap-4 px-4">
            <div class="flex-1 max-w-[150px] h-px bg-gradient-to-r from-transparent to-gold"></div>
            <span class="text-gold text-2xl separator-animate">&#9733;</span>
            <div class="flex-1 max-w-[150px] h-px bg-gradient-to-l from-transparent to-gold"></div>
          </div>
        </div>`;
    case 'film':
      return `
        <div data-separator="true" class="py-12 select-none">
          <div class="flex justify-center items-center gap-1 px-4">
            ${[0.4, 0.5, 0.6].map(o => `<div class="w-2 h-5 bg-gold rounded-sm" style="opacity:${o}"></div>`).join('')}
            ${[0.7, 1, 0.7].map(o => `<div class="w-10 h-6 border-2 border-gold rounded-sm" style="opacity:${o}${o === 1 ? ';background:rgba(218,165,32,0.15)' : ''}"></div>`).join('')}
            ${[0.6, 0.5, 0.4].map(o => `<div class="w-2 h-5 bg-gold rounded-sm" style="opacity:${o}"></div>`).join('')}
          </div>
        </div>`;
  }
}
```

- [ ] **Step 2 : Vérifier que les séparateurs ne se dupliquent pas après switch**

```bash
npm run dev
```
Switch plusieurs fois → un seul séparateur entre Hero/Calendar et entre Paroles/Videos.

- [ ] **Step 3 : Commit**

```bash
git add src/components/section-separator.ts
git commit -m "refactor(separator): use t() for quotes and tag for re-mount cleanup"
```

---

## Task 12 : Déplacer + traduire `memorial.ts` → `src/i18n/memorial/`

**Files:**
- Create: `src/i18n/memorial/fr.ts` (contenu actuel)
- Create: `src/i18n/memorial/en.ts`, `es.ts`, `zh.ts`
- Create: `src/i18n/memorial/index.ts`

- [ ] **Step 1 : Créer `fr.ts` avec les 12 events + bio depuis `src/memorial.ts`**

Copier intégralement, sans modifications. Exporter `timeline`, `bio`, et le type `TimelineEvent`.

- [ ] **Step 2 : Traduire en EN, ES, ZH**

Pour les `year`, garder le format original mais adapter (ex. `'2026 (An 1 ACN)'` → `'2026 (Year 1 ACN)'` en EN).

`src/i18n/memorial/en.ts` (extrait) :
```ts
import type { TimelineEvent } from './fr';
export type { TimelineEvent };

export const timeline: TimelineEvent[] = [
  { year: '1940', title: 'Birth of a legend',
    description: 'Carlos Ray Norris is born in Ryan, Oklahoma. The world does not know it yet, but it has just changed forever.' },
  // ... 11 autres
  { year: '2026 (Year 1 ACN)', title: 'The Chuck Norris Era begins',
    description: '...' },
];

export const bio: string =
  `Chuck Norris is not just an actor or martial artist. He is a force of nature, ` + ...;
```

- [ ] **Step 3 : Créer `src/i18n/memorial/index.ts`**

```ts
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
```

- [ ] **Step 4 : Vérifier**

```bash
npm run build
```

- [ ] **Step 5 : Commit**

```bash
git add src/i18n/memorial/
git commit -m "feat(i18n): add memorial timeline and bio translations for FR/EN/ES/ZH"
```

---

## Task 13 : Refactor `memorial-section.ts` — utiliser le helper et `t()`

**Files:**
- Modify: `src/components/memorial-section.ts`

- [ ] **Step 1 : Remplacer les imports et chaînes hardcodées**

- Remplacer `import { timeline, bio } from '../memorial';` par `import { getMemorialContent } from '../i18n/memorial';`
- Remplacer `import { t } from '../i18n';`
- En tête de `renderMemorial()` : `const { timeline, bio } = getMemorialContent();`
- Remplacer :
  - `Acte I` → `t('memorial.act')`
  - `La Légende` → `t('memorial.title')`
  - `La Légende Éternelle` → `t('memorial.subtitle')`
  - `REST IN POWER` → `t('memorial.tribute')` (à conserver en anglais dans toutes les langues, car c'est un slogan symbolique — ou laisser le traducteur juger)

- [ ] **Step 2 : Vérifier dans le navigateur**

```bash
npm run dev
```
Switch de langue → la timeline et la bio passent dans la langue choisie. Les photos restent identiques.

- [ ] **Step 3 : Commit**

```bash
git add src/components/memorial-section.ts
git commit -m "refactor(memorial): use i18n helpers"
```

---

## Task 14 : Déplacer + traduire `videos.ts` → `src/i18n/videos/`

**Files:**
- Create: `src/i18n/videos/fr.ts`, `en.ts`, `es.ts`, `zh.ts`
- Create: `src/i18n/videos/index.ts`

- [ ] **Step 1 : Créer le fichier FR**

`src/i18n/videos/fr.ts` :
```ts
export interface Video {
  id: string;
  title: string;
  description: string;
}

export const videos: Video[] = [
  { id: "yYVZVz76iA4", title: "Best of Chuck Norris — MEGA Compilation", description: "La compilation ultime par Amazon MGM Studios" },
  // ... 7 autres (copier depuis src/videos.ts)
];
```

- [ ] **Step 2 : Traduire en EN, ES, ZH**

Garder `id` et `title` (les titres YouTube sont en anglais à l'origine), ne traduire que `description`.

`src/i18n/videos/en.ts` :
```ts
import type { Video } from './fr';
export type { Video };

export const videos: Video[] = [
  { id: "yYVZVz76iA4", title: "Best of Chuck Norris — MEGA Compilation", description: "The ultimate compilation by Amazon MGM Studios" },
  // ...
];
```

- [ ] **Step 3 : Créer `src/i18n/videos/index.ts`**

```ts
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
```

- [ ] **Step 4 : Vérifier**

```bash
npm run build
```

- [ ] **Step 5 : Commit**

```bash
git add src/i18n/videos/
git commit -m "feat(i18n): add videos descriptions translations for FR/EN/ES/ZH"
```

---

## Task 15 : Refactor `video-gallery.ts` — utiliser t() et helper vidéos

**Files:**
- Modify: `src/components/video-gallery.ts`

- [ ] **Step 1 : Remplacer les imports + chaînes**

- `import { videos } from '../videos';` → `import { getVideosContent } from '../i18n/videos';` et `import { t } from '../i18n';`
- En tête : `const videos = getVideosContent();`
- Remplacer :
  - `Acte III` → `t('videos.act')`
  - `En Action` → `t('videos.title')`
  - `Les scènes que même Chuck Norris regarde en boucle` → `t('videos.subtitle')`

- [ ] **Step 2 : Vérifier dans le navigateur**

```bash
npm run dev
```
Vérifier que les descriptions sous les iframes changent à chaque switch.

- [ ] **Step 3 : Commit**

```bash
git add src/components/video-gallery.ts
git commit -m "refactor(videos): use i18n helpers"
```

---

## Task 16 : Refactor `footer.ts` — t() + corriger duplication sur re-mount

**Files:**
- Modify: `src/components/footer.ts`

- [ ] **Step 1 : Bug existant**

`renderFooter()` fait `main.insertAdjacentElement('afterend', footer)` à chaque appel — donc à chaque switch de langue, un nouveau footer s'ajoute. Il faut retirer le précédent.

- [ ] **Step 2 : Réécrire le footer**

```ts
import { getTodayACN, ACN_MONTH_NAMES } from '../calendar';
import { CHUCK_MEMORIAL, CHUCK_YOUNG, CHUCK_ACTION, CHUCK_HERO, CHUCK_MARINE } from '../chuck-images';
import { t } from '../i18n';

export function renderFooter(): void {
  const main = document.querySelector('main');
  if (!main) return;

  // Retirer le footer précédent s'il existe
  document.querySelector('footer[data-footer="true"]')?.remove();

  const today = getTodayACN();

  const footer = document.createElement('footer');
  footer.setAttribute('data-footer', 'true');
  footer.className = 'bg-wood text-wheat/70 py-10 text-center font-body relative';
  footer.innerHTML = `
    <div class="divider-barbed text-lg mb-8">─═══─ ⊶ ─═══─ ⊶ ─═══─</div>
    <div class="flex justify-center mb-4">
      <img src="${CHUCK_MEMORIAL}" alt="Chuck Norris"
           class="w-24 h-24 rounded-full border-2 border-gold/50 opacity-80 object-cover"
           style="box-shadow: 0 0 20px rgba(218,165,32,0.2);" />
    </div>
    <p class="text-lg font-western text-wheat/90 mb-2">${t('footer.tribute')}</p>
    <p class="text-sm text-wheat/60 mb-1">${t('footer.identity')}</p>
    <p class="mb-3">${t('footer.calendar')}</p>
    <p class="text-sm text-wheat/50 mb-4">${today.day} ${today.monthName} ${t('hero.year_acn')} ${today.year} ${t('hero.year_acn_suffix')}</p>
    <p class="text-xs text-wheat/30 italic mb-6">${t('footer.quote')}</p>
    <div class="flex justify-center gap-3 opacity-50">
      <img src="${CHUCK_YOUNG}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="1976" title="1976" />
      <img src="${CHUCK_MARINE}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="Marine" title="Marine" />
      <img src="${CHUCK_ACTION}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="Action" title="Delta Force" />
      <img src="${CHUCK_HERO}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="2006" title="2006" />
      <img src="${CHUCK_MEMORIAL}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="2015" title="2015" />
    </div>
  `;

  main.insertAdjacentElement('afterend', footer);
}
```

> Note : `today.monthName` reste basé sur `ACN_MONTH_NAMES` qui est en français. **Améliorer dans Task 18** pour utiliser `t('calendar.month.N')`.

- [ ] **Step 3 : Vérifier**

```bash
npm run dev
```
Switch plusieurs fois → un seul footer en bas de page (vérifier dans l'inspecteur DOM : un seul `<footer>`).

- [ ] **Step 4 : Commit**

```bash
git add src/components/footer.ts
git commit -m "refactor(footer): use t() and prevent duplication on re-mount"
```

---

## Task 17 : Squelette i18n du calendrier (FR move + fallback EN/ES/ZH)

**Files:**
- Create: `src/i18n/calendar/fr.ts` (contenu actuel de `src/calendar-content.ts`)
- Create: `src/i18n/calendar/en.ts`, `es.ts`, `zh.ts` (vides + fallback)
- Create: `src/i18n/calendar/index.ts`
- Modify: `src/components/calendar-grid.ts` (import seulement)

- [ ] **Step 1 : Déplacer le contenu actuel vers `src/i18n/calendar/fr.ts`**

```ts
export type ContentType = 'fact' | 'citation' | 'anecdote';
export interface CalendarEntry {
  type: ContentType;
  text: string;
  source?: string;
}
export const calendarContent: Record<string, CalendarEntry> = {
  // copier les 365+ entrées depuis src/calendar-content.ts
};
```

- [ ] **Step 2 : Créer `en.ts`, `es.ts`, `zh.ts` vides (objet `{}`)**

```ts
import type { CalendarEntry } from './fr';
export const calendarContent: Record<string, CalendarEntry> = {};
```

- [ ] **Step 3 : Créer `src/i18n/calendar/index.ts` avec helpers + fallback**

```ts
import { getLanguage, t } from '../index';
import { calendarContent as fr, type CalendarEntry, type ContentType } from './fr';
import { calendarContent as en } from './en';
import { calendarContent as es } from './es';
import { calendarContent as zh } from './zh';

const dicts = { fr, en, es, zh } as const;

const FALLBACK_ENTRY = (key: string): CalendarEntry => ({
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
  // Fallback : si la langue active n'a pas la clé mais FR oui, on retourne le message de fallback traduit
  if (fr[key]) return FALLBACK_ENTRY(key);
  // Sécurité absolue
  return { type: 'anecdote', text: '...', source: undefined };
}

export type { CalendarEntry, ContentType };
```

- [ ] **Step 4 : Mettre à jour l'import dans `src/components/calendar-grid.ts`**

Remplacer :
```ts
import { getCalendarEntry, type ContentType } from '../calendar-content';
```
par :
```ts
import { getCalendarEntry, type ContentType } from '../i18n/calendar';
```

- [ ] **Step 5 : Vérifier**

```bash
npm run build && npm run dev
```
- En FR : tout le contenu du calendrier reste accessible
- Switch en EN/ES/ZH : tous les jours affichent le message de fallback traduit (« Daily content coming soon... », etc.)

- [ ] **Step 6 : Commit**

```bash
git add src/i18n/calendar/ src/components/calendar-grid.ts
git commit -m "feat(i18n): move calendar to i18n structure with localized fallback for EN/ES/ZH"
```

---

## Task 18 : Refactor `calendar-grid.ts` — t() pour titres/labels/months

**Files:**
- Modify: `src/components/calendar-grid.ts`

- [ ] **Step 1 : Remplacer les chaînes hardcodées**

Ajouter `import { t } from '../i18n';`

Remplacer :
- `Le Calendrier Sacré` → `t('calendar.title')`
- `13 mois. 28 jours. Le seul calendrier approuvé par Chuck.` → `t('calendar.tagline')`
- Les 3 légendes (`Fact`, `Citation`, `Anecdote`) → `t('calendar.legend.*')`
- `Année` / `Mois` (toggle) → `t('calendar.view.year')` / `t('calendar.view.month')`
- `An ${currentYear}` → `${t('calendar.year_label')} ${currentYear}`
- `Jour de Chuck` → `t('hero.day_of_chuck')` (réutilise la clé déjà définie)
- `← Jour précédent` / `Jour suivant →` → `t('calendar.modal.prev_day')` / `t('calendar.modal.next_day')`

- [ ] **Step 2 : Traduire les noms de mois affichés**

Le composant lit `ACN_MONTH_NAMES[selectedMonth - 1]` qui est défini dans `src/calendar.ts` en français. Pour traduire :
- Créer un helper local dans `calendar-grid.ts` :
  ```ts
  function getMonthName(monthNumber: number): string {
    return t(`calendar.month.${monthNumber}` as Parameters<typeof t>[0]);
  }
  ```
- Remplacer **tous** les usages de `ACN_MONTH_NAMES[X - 1]` par `getMonthName(X)`.

- [ ] **Step 3 : Modifier les `TYPE_LABEL`**

Remplacer le `Record<ContentType, string>` statique par une fonction langue-aware :
```ts
function getTypeLabel(type: ContentType): string {
  return t(`calendar.badge.${type}` as Parameters<typeof t>[0]);
}
```
Et remplacer `TYPE_LABEL[entry.type]` par `getTypeLabel(entry.type)`.

- [ ] **Step 4 : Préserver l'état entre re-mounts**

Les variables module-level `currentYear`, `viewMode`, `selectedMonth` étant module-level, elles **survivent** déjà au re-render. ✅ Rien à faire.

- [ ] **Step 5 : Vérifier dans le navigateur**

```bash
npm run dev
```
- Switch de langue : titres, légendes, noms des mois, badges du modal — tout en langue active
- L'état du calendrier (vue annuelle/mensuelle, mois sélectionné, année) est préservé au switch

- [ ] **Step 6 : Commit**

```bash
git add src/components/calendar-grid.ts
git commit -m "refactor(calendar): use t() for all UI strings and month names"
```

---

## Task 19 : Mettre à jour `footer.ts` pour utiliser `getMonthName` aussi

**Files:**
- Modify: `src/components/footer.ts`

- [ ] **Step 1 : Remplacer `today.monthName` par la version traduite**

Importer `t` (déjà fait à Task 16) et utiliser `t(\`calendar.month.${today.month}\`)` au lieu de `today.monthName`.

```ts
const monthName = today.isChuckDay
  ? `${t('hero.day_of_chuck')} ${today.chuckDayNumber}`
  : t(`calendar.month.${today.month}` as Parameters<typeof t>[0]);
```

Et remplacer dans la ligne du footer :
```ts
<p class="text-sm text-wheat/50 mb-4">${today.day} ${monthName} ${t('hero.year_acn')} ${today.year} ${t('hero.year_acn_suffix')}</p>
```

- [ ] **Step 2 : Faire pareil dans `hero.ts`**

Modifier la ligne `dateDisplay` pour utiliser `getMonthName` ou `t('calendar.month.N')` au lieu de `today.monthName`.

- [ ] **Step 3 : Vérifier dans le navigateur**

Switch de langue → la date affichée dans le hero et le footer utilise le bon nom de mois.

- [ ] **Step 4 : Commit**

```bash
git add src/components/footer.ts src/components/hero.ts
git commit -m "refactor(hero,footer): translate month names via t()"
```

---

## Task 20 : Suppression des anciens fichiers de contenu

**Files:**
- Delete: `src/quotes.ts`
- Delete: `src/jokes.ts`
- Delete: `src/memorial.ts`
- Delete: `src/videos.ts`
- Delete: `src/calendar-content.ts`

- [ ] **Step 1 : Vérifier qu'aucun composant ne les importe encore**

Utiliser Grep dans l'éditeur (ou rg en CLI) sur les patterns `../quotes`, `../jokes`, `../memorial`, `../videos`, `../calendar-content` dans `src/`. Tous les imports doivent désormais pointer vers `../i18n/...`.

```bash
# Exemple ripgrep pour confirmer qu'il ne reste aucun import vers les anciens fichiers :
rg "from ['\"]\.\.?/(quotes|jokes|memorial|videos|calendar-content)['\"]" src/
```
Attendu : aucun résultat.

- [ ] **Step 2 : Supprimer les fichiers**

```bash
rm src/quotes.ts src/jokes.ts src/memorial.ts src/videos.ts src/calendar-content.ts
```

- [ ] **Step 3 : Vérifier le build**

```bash
npm run build
```
Attendu : OK, aucun import cassé.

- [ ] **Step 4 : Commit**

```bash
git add -u
git commit -m "chore(i18n): remove legacy content files now hosted under src/i18n/"
```

---

## Task 21 : Vérification complète Phase 1

- [ ] **Step 1 : Lancer le dev server et passer la check-list**

```bash
npm run dev
```

Check-list à valider visuellement :

1. **Première visite (vider localStorage et `?lang`)** :
   - Avec navigateur en EN → site en anglais
   - Avec navigateur en autre que FR/EN/ES/ZH → site en français
2. **Switch via drapeau** : ✅ chaque langue (FR/EN/ES/ZH) :
   - Navbar (logo, liens, sélecteur)
   - Hero (bannière, dates, compteur, citation rotative)
   - Mémorial (acte, titre, sous-titre, timeline, bio, tribute)
   - Paroles & Exploits (acte, titre, citations carousel, bouton facts, label)
   - Vidéos (acte, titre, sous-titre, descriptions)
   - Calendrier (titre, légende, toggle, noms des mois, modal — fallback message en EN/ES/ZH)
   - Footer (tribute, identity, quote, date)
   - Séparateurs (citations italiques)
3. **Persistance** : changer de langue, recharger → langue conservée
4. **URL** : changer de langue → URL contient `?lang=XX`
5. **Pas d'accélération du compteur** ni du carousel après plusieurs switches (intervals propres)
6. **Un seul footer en bas** après plusieurs switches (vérifier dans l'inspecteur)
7. **Mobile (responsive ≤768px)** : drapeaux dans la dropdown, tout fonctionne
8. **`npm run build`** passe sans warning TS

- [ ] **Step 2 : Tag de fin de phase**

```bash
git tag i18n-phase-1
```

---

# Phase 2 — Traduction du contenu du calendrier (365+ entrées)

> Critère de fin : EN, ES, ZH ont 100% des entrées du calendrier traduites. Le fallback ne s'affiche plus.

> ⚠️ **Volume** : 365+ entrées × 3 langues. Pour éviter de saturer le contexte d'une session, **traduire par batch de 1 mois × 1 langue par task** (28 entrées par task). Soit 13 mois × 3 langues = 39 tasks. Plus 2 entrées spéciales (`0-1`, `0-2`) × 3 langues = 1 task supplémentaire.

> Pour gagner en efficacité, on peut grouper **3 mois par task** (84 entrées) si l'agent qui exécute a le contexte. À la discrétion de l'exécutant.

## Task A : Entrées Jour de Chuck (`0-1`, `0-2`) — EN/ES/ZH

**Files:**
- Modify: `src/i18n/calendar/en.ts`, `es.ts`, `zh.ts`

- [ ] Ouvrir `src/i18n/calendar/fr.ts`, copier les entrées `'0-1'` et `'0-2'`
- [ ] Pour chaque langue (EN, ES, ZH), ajouter ces 2 entrées traduites dans `calendarContent`
- [ ] `npm run build`
- [ ] Tester en navigateur : cliquer sur "Jour de Chuck" en chaque langue → contenu traduit
- [ ] Commit : `feat(i18n/calendar): translate Chuck Days (0-1, 0-2) for EN/ES/ZH`

## Tasks B1 → B13 : Mois 1 à 13 — Anglais

Pour chaque mois `M` (1 à 13), une task dédiée :

**Files:**
- Modify: `src/i18n/calendar/en.ts`

- [ ] Ouvrir `src/i18n/calendar/fr.ts` et localiser la section `=== Mois M ===`
- [ ] Copier les 28 entrées (clés `M-1` à `M-28`) dans `src/i18n/calendar/en.ts`
- [ ] Traduire chaque `text` et `source` en anglais. Conserver le ton (factuel/dramatique/comique).
- [ ] `npm run build` (TypeScript râlera si une entrée est mal formée)
- [ ] `npm run dev` : passer en EN, ouvrir le mois M, cliquer sur quelques jours pour vérifier
- [ ] Commit : `feat(i18n/calendar): translate month M to English`

Répéter pour M = 1 à 13. (= 13 commits anglais)

## Tasks C1 → C13 : Mois 1 à 13 — Espagnol

Idem que B mais sur `src/i18n/calendar/es.ts`.

## Tasks D1 → D13 : Mois 1 à 13 — Chinois simplifié

Idem que B mais sur `src/i18n/calendar/zh.ts`. Pour le chinois, **garder une attention particulière** :
- Les noms propres (Chuck Norris, Texas, Hollywood, etc.) restent en alphabet latin OU translittérés selon convention chinoise (eg. 查克·诺里斯 pour Chuck Norris)
- Les références culturelles très spécifiques (ex: "Walker, Texas Ranger") restent en anglais entre guillemets, avec parfois une glose en chinois
- L'humour absurde se traduit littéralement, le sens est préservé

## Task FINAL : Retirer le fallback et nettoyer

**Files:**
- Modify: `src/i18n/calendar/index.ts`

- [ ] **Step 1 : Vérifier que les 4 dictionnaires ont le même nombre de clés**

Approche 1 (rapide, sans dépendance) — compter les déclarations d'entrées via ripgrep :
```bash
for f in src/i18n/calendar/{fr,en,es,zh}.ts; do
  echo -n "$f: "
  rg -c "^\s+'\d+-\d+':" "$f"
done
```
Attendu : les 4 fichiers retournent le même nombre (366 si on inclut `0-1`, `0-2` + 13×28).

Approche 2 (plus propre) — petit script via tsx :
```bash
npx tsx -e "
import('./src/i18n/calendar/fr.ts').then(fr =>
  import('./src/i18n/calendar/en.ts').then(en =>
    import('./src/i18n/calendar/es.ts').then(es =>
      import('./src/i18n/calendar/zh.ts').then(zh =>
        console.log({
          fr: Object.keys(fr.calendarContent).length,
          en: Object.keys(en.calendarContent).length,
          es: Object.keys(es.calendarContent).length,
          zh: Object.keys(zh.calendarContent).length,
        })
      )
    )
  )
);
"
```

- [ ] **Step 2 : Simplifier `getCalendarEntry` — fallback final pointe sur FR**

```ts
export function getCalendarEntry(month: number, day: number): CalendarEntry {
  const key = `${month}-${day}`;
  const dict = getCalendarContent();
  if (dict[key]) return dict[key];
  // Filet de sécurité : si une entrée manque dans la langue active, on tombe sur le FR
  if (fr[key]) {
    console.warn(`[i18n] Missing calendar entry ${key} for ${getLanguage()}, falling back to FR`);
    return fr[key];
  }
  return { type: 'anecdote', text: '...', source: undefined };
}
```

(Plus de message de fallback explicite : on assume que tout est traduit. Le filet de sécurité reste juste pour robustesse.)

- [ ] **Step 3 : Supprimer les clés UI devenues obsolètes (optionnel)**

`calendar.fallback.title` et `calendar.fallback.message` peuvent rester (utiles si on rajoute du contenu non encore traduit plus tard). Garder par pragmatisme.

- [ ] **Step 4 : Vérification finale**

```bash
npm run build && npm run dev
```
- Toutes les langues : cliquer sur des jours aléatoires dans tous les mois → contenu traduit, pas de fallback
- `localStorage.clear(); location.reload()` → langue auto-détectée
- Tester sur Safari, Chrome, Firefox si possible
- Tester avec une URL `?lang=zh` partagée

- [ ] **Step 5 : Commit final + tag**

```bash
git add src/i18n/calendar/index.ts
git commit -m "feat(i18n/calendar): finalize translations and simplify fallback"
git tag i18n-phase-2
```

---

# Réordonnancement des dépendances

L'ordre logique d'exécution diffère légèrement de l'ordre numérique. Voici la séquence recommandée :

```
1 → 2 → 3 → 4 → 5 → 6  (infrastructure : i18n, switcher, navbar)
     ↓
8 → 9 → 7  (quotes (Task 8) + jokes (Task 9) traduits AVANT hero (Task 7) qui consomme getQuotesContent())
     ↓
10 → 11    (paroles + separator)
     ↓
12 → 13    (memorial)
     ↓
14 → 15    (videos)
     ↓
16 → 19    (footer + month names dans hero/footer)
     ↓
17 → 18    (calendar fallback + grid refactor)
     ↓
20 → 21    (cleanup + verification Phase 1)
     ↓
Phase 2 (A → B1..B13 → C1..C13 → D1..D13 → FINAL)
```

---

# Notes pour l'exécutant

- **Pour chaque commit** : message court, présent de l'indicatif, scope entre parenthèses
- **Si un build échoue** : ne pas avancer. Lire l'erreur TS, corriger, recommencer
- **Si un re-render duplique du DOM** : vérifier que la task a bien retiré l'ancien (`document.querySelector('[data-X]')?.remove()`)
- **Pour les traductions** : se référer à `src/i18n/ui/fr.ts` comme source de vérité pour le ton. L'humour de Chuck Norris est légèrement parodique, héroïque, jamais cynique. Garder cette tonalité.
- **Ne pas modifier `src/calendar.ts`** (logique pure)
- **Ne pas modifier `src/chuck-images.ts`** (constantes images)
- **Ne pas ajouter de tests** (hors scope)
- **Ne pas modifier `tailwind.config`, `vite.config.ts`, `tsconfig.json`** sauf nécessité absolue (à signaler)
