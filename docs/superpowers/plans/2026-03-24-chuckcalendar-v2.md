# ChuckCalendar v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign ChuckCalendar with cinematic UI/UX, diversified calendar content (364+ unique facts/citations/anecdotes), and improved site flow.

**Architecture:** Component-based vanilla TypeScript + Vite + Tailwind. Each section is a render function mounting into an HTML placeholder. New content data file (`calendar-content.ts`) provides static entries indexed by month-day. Sections reduced from 6 to 5 by merging quotes + facts into one component.

**Tech Stack:** TypeScript 5.9, Vite 8, Tailwind CSS 4.2, vanilla DOM manipulation.

**Spec:** `docs/superpowers/specs/2026-03-24-chuckcalendar-v2-design.md`

---

## File Structure

### New files
- `src/calendar-content.ts` — 366 static entries (364 days + 2 Jour de Chuck), indexed by `"month-day"` key
- `src/components/paroles-exploits.ts` — merged section replacing joke-generator + quotes-carousel
- `src/components/section-separator.ts` — reusable separator component (3 types)

### Modified files
- `src/style.css` — film grain overlay, parallax, badge colors, separator styles, calendar zoom transitions
- `src/components/navbar.ts` — "Générique de Film" redesign with Roman numeral links
- `src/components/hero.ts` — cinematic redesign with film grain, production banner, framed ACN date
- `src/components/calendar-grid.ts` — full rewrite: annual view + month zoom + enriched modal with content types
- `src/components/memorial-section.ts` — add "Acte I" label, minor style alignment
- `src/components/video-gallery.ts` — add "Acte III" label, minor style alignment
- `src/components/footer.ts` — minor style alignment
- `src/main.ts` — new section order, separators, remove old joke/quotes renders, add paroles-exploits
- `src/quotes.ts` — expand from 12 to ~50 citations (carousel pool)
- `index.html` — replace `#jokes` + `#quotes` sections with `#paroles`

### Deleted files
- `src/components/joke-generator.ts` — logic moved to paroles-exploits.ts
- `src/components/quotes-carousel.ts` — logic moved to paroles-exploits.ts

---

## Task 1: CSS Foundation — New styles and animations

**Files:**
- Modify: `src/style.css`

- [ ] **Step 1: Add film grain overlay CSS class**

Add after the existing animations in `src/style.css`:

```css
/* Film grain overlay */
.film-grain::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
}

/* Calendar zoom transition */
.calendar-view-enter {
  animation: fadeScale 0.3s ease-out forwards;
}
.calendar-view-exit {
  animation: fadeScale 0.3s ease-out reverse forwards;
}
@keyframes fadeScale {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}

/* Modal animation */
.modal-enter {
  animation: modalIn 0.25s ease-out forwards;
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Content type badge colors */
.badge-fact { background-color: #DAA520; color: #1a0f00; }
.badge-citation { background-color: #A52A2A; color: #F5DEB3; }
.badge-anecdote { background-color: #2E5A88; color: #F5DEB3; }

/* Content type dot colors */
.dot-fact { background-color: #DAA520; }
.dot-citation { background-color: #A52A2A; }
.dot-anecdote { background-color: #2E5A88; }

/* Parallax sections */
.parallax-bg {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
```

- [ ] **Step 2: Verify dev server compiles without errors**

Run: `cd /Users/tombariteaupeter/Desktop/Perso/ChuckCalendar && npx vite build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/style.css
git commit -m "style: add film grain, calendar zoom, modal, badge, and parallax CSS"
```

---

## Task 2: Section separator component

**Files:**
- Create: `src/components/section-separator.ts`

- [ ] **Step 1: Create separator component with 3 types**

Create `src/components/section-separator.ts`:

```typescript
type SeparatorType = 'quote' | 'star' | 'film';

const SEPARATOR_QUOTES = [
  "La légende ne meurt jamais.",
  "Le temps s'incline devant Chuck Norris.",
  "Certains hommes deviennent des mythes.",
  "L'éternité a un nom.",
];

export function renderSeparator(type: SeparatorType, quoteIndex: number = 0): string {
  switch (type) {
    case 'quote':
      return `
        <div class="py-12 select-none">
          <div class="max-w-2xl mx-auto text-center px-4">
            <div class="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-4"></div>
            <p class="italic text-wheat/60 text-sm">"${SEPARATOR_QUOTES[quoteIndex % SEPARATOR_QUOTES.length]}"</p>
            <div class="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-4"></div>
          </div>
        </div>`;

    case 'star':
      return `
        <div class="py-12 select-none">
          <div class="flex items-center justify-center gap-4 px-4">
            <div class="flex-1 max-w-[150px] h-px bg-gradient-to-r from-transparent to-gold"></div>
            <span class="text-gold text-2xl">&#9733;</span>
            <div class="flex-1 max-w-[150px] h-px bg-gradient-to-l from-transparent to-gold"></div>
          </div>
        </div>`;

    case 'film':
      return `
        <div class="py-12 select-none">
          <div class="flex justify-center items-center gap-1 px-4">
            ${[0.4, 0.5, 0.6].map(o => `<div class="w-2 h-5 bg-gold rounded-sm" style="opacity:${o}"></div>`).join('')}
            ${[0.7, 1, 0.7].map(o => `<div class="w-10 h-6 border-2 border-gold rounded-sm" style="opacity:${o}${o === 1 ? ';background:rgba(218,165,32,0.15)' : ''}"></div>`).join('')}
            ${[0.6, 0.5, 0.4].map(o => `<div class="w-2 h-5 bg-gold rounded-sm" style="opacity:${o}"></div>`).join('')}
          </div>
        </div>`;
  }
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/tombariteaupeter/Desktop/Perso/ChuckCalendar && npx vite build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/section-separator.ts
git commit -m "feat: add section separator component with quote, star, and film types"
```

---

## Task 3: Calendar content data file

**Files:**
- Create: `src/calendar-content.ts`

This is the largest task — generating 366 unique entries (364 regular days + 2 Jour de Chuck). The content should be ~121 facts, ~121 citations, ~121 anecdotes distributed evenly.

- [ ] **Step 1: Create calendar-content.ts with type definitions and helper function**

Create `src/calendar-content.ts` with types, the `getCalendarEntry` helper, and an empty `calendarContent` record:

```typescript
export type ContentType = 'fact' | 'citation' | 'anecdote';

export interface CalendarEntry {
  type: ContentType;
  text: string;
  source?: string;
}

export const calendarContent: Record<string, CalendarEntry> = {
  // Populated in steps 2-5
};

export function getCalendarEntry(month: number, day: number): CalendarEntry {
  const key = `${month}-${day}`;
  return calendarContent[key] ?? {
    type: 'fact' as ContentType,
    text: 'Le contenu de ce jour est en cours de rédaction...',
  };
}
```

- [ ] **Step 2: Add Jour de Chuck entries + months 1-4 (~114 entries)**

Add to `calendarContent`:
- Keys `"0-1"` and `"0-2"` (Jour de Chuck special anecdotes)
- Keys `"1-1"` through `"4-28"` (112 entries)
- Each month: ~9-10 facts, ~9-10 citations, ~9-10 anecdotes

- [ ] **Step 3: Add months 5-9 (~140 entries)**

Add keys `"5-1"` through `"9-28"`.

- [ ] **Step 4: Add months 10-13 (~112 entries)**

Add keys `"10-1"` through `"13-28"`.

Content guidelines:
- **Facts** (~121): French Chuck Norris facts. Reuse the 31 from `src/jokes.ts` + generate ~90 more. Themes: physics, animals, tech, food, geography, time/space.
- **Citations** (~121): Movie/TV quotes in French. Reuse the 12 from `src/quotes.ts` + generate ~109 more. Include: source film + year. Films: Walker Texas Ranger, Missing in Action, Delta Force, Lone Wolf McQuade, Code of Silence, The Expendables 2, Invasion USA, Sidekicks, Firewalker, Braddock, The Hitman, Hero and the Terror, Silent Rage, Forced Vengeance, An Eye for an Eye, A Force of One, Good Guys Wear Black, Breaker Breaker, Octagon, Top Dog.
- **Anecdotes** (~121): Real biographical facts about Chuck Norris in French. Include: source/context. Topics: birth (1940), childhood in Oklahoma, Air Force (1958-62), martial arts training, 6x karate world champion, meeting Bruce Lee, opening karate schools, film career, Walker Texas Ranger, Total Gym, philanthropy (KickStart), political engagement, internet meme phenomenon, honorary Marine, black belts (9th dan TKD, 8th dan others).

- [ ] **Step 5: Validate distribution**

Count entries per type across all months. Target: ~121 of each type, 9-10 per type per month. Adjust if unbalanced.

- [ ] **Step 6: Verify build and type checking**

Run: `cd /Users/tombariteaupeter/Desktop/Perso/ChuckCalendar && npx vite build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/calendar-content.ts
git commit -m "feat: add 366 unique calendar entries (facts, citations, anecdotes)"
```

---

## Task 4: Update index.html — New section structure

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace #jokes and #quotes sections with #paroles**

In `index.html`, change the `<main>` content from:

```html
<section id="hero"></section>
<section id="calendar"></section>
<section id="memorial"></section>
<section id="jokes"></section>
<section id="quotes"></section>
<section id="videos"></section>
```

To:

```html
<section id="hero"></section>
<section id="calendar"></section>
<section id="memorial"></section>
<section id="paroles"></section>
<section id="videos"></section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: replace jokes+quotes sections with unified paroles section"
```

---

## Task 5: Navbar redesign — Générique de Film

**Files:**
- Modify: `src/components/navbar.ts`

- [ ] **Step 1: Rewrite navbar with film credits design**

Rewrite `renderNavbar()` in `src/components/navbar.ts`. Key changes:
- Background: `bg-[#0a0500]` with gold bottom border
- Logo: "CALENDRIER ACN" bold gold + subtitle "L'ÈRE DE CHUCK NORRIS" small/spaced below
- Links with Roman numerals: `I. Ouverture` (`#hero`), `II. Calendrier` (`#calendar`), `III. Légende` (`#memorial`), `IV. Paroles` (`#paroles`), `V. Vidéos` (`#videos`)
- Active link: `text-gold`, inactive: `text-wheat/50`
- Uppercase, letter-spacing on links
- Keep existing: hamburger mobile menu, IntersectionObserver active link detection, smooth scroll
- Update observed section IDs: remove `#jokes`, `#quotes`, add `#paroles`

- [ ] **Step 2: Verify in browser**

Run: `cd /Users/tombariteaupeter/Desktop/Perso/ChuckCalendar && npx vite dev`
Open browser, check navbar renders with new design. Check mobile hamburger still works.

- [ ] **Step 3: Commit**

```bash
git add src/components/navbar.ts
git commit -m "feat: redesign navbar as film credits with Roman numeral links"
```

---

## Task 6: Hero redesign — Cinematic opening

**Files:**
- Modify: `src/components/hero.ts`

- [ ] **Step 1: Rewrite hero with cinematic design**

Rewrite `renderHero()` in `src/components/hero.ts`. Key changes:
- Background: `bg-gradient-to-b from-[#0a0500] via-dark to-[#2a1a08]`
- Add `film-grain` class + `position: relative` for the overlay
- Production banner at top: "Une production de l'Ère ACN", small uppercase, letter-spacing, opacity-50, border-bottom gold
- Chuck photo: circle with `border-3 border-gold`, `box-shadow: 0 0 30px rgba(218,165,32,0.3)`
- Title: "CHUCK NORRIS" in gold with `text-shadow: 0 0 20px rgba(218,165,32,0.4)` using font-western
- Subtitle: "10 Mars 1940 — 19 Mars 2026" uppercase small spaced
- ACN date block: framed with `bg-gold/10 border border-gold/30 rounded-lg`, date in large gold text + live clock in monospace below
- Time counter: 4 columns (jours/heures/minutes/secondes) with gold numbers and small uppercase labels
- Quote: separated by gold gradient line, italic text + film source
- Keep all existing behavior: setInterval clock, setTimeout quote rotation, death counter

- [ ] **Step 2: Verify in browser**

Check: production banner, photo glow, ACN date frame, counter, quote rotation, film grain overlay.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero.ts
git commit -m "feat: redesign hero with cinematic film grain and production banner"
```

---

## Task 7: Calendar grid — Complete rewrite

This is the largest component change. Split into sub-steps.

**Files:**
- Modify: `src/components/calendar-grid.ts`

- [ ] **Step 1: Rewrite calendar-grid.ts — Annual view**

Rewrite the render function to show the annual view by default:
- Section title: "Le Calendrier Sacré" in gold, font-western
- Legend bar: 3 colored dots with labels (Or=Fact, Rouge=Citation, Bleu=Anecdote)
- Year navigation: prev/next buttons with current year display (keep existing logic)
- Grid of 13 mini-months (4 cols desktop, 2 tablet, 1 mobile)
- Each mini-month card: gold border, month name in font-western, 7×4 grid of days
- Each day cell: number + colored dot based on `getCalendarEntry(month, day).type`
  - `dot-fact` / `dot-citation` / `dot-anecdote` classes
- Current month: brighter gold border
- Today: gold background on day cell
- Jour de Chuck: special row at bottom of grid with distinct gold styling
- Click on month card → switch to month view
- Import `getCalendarEntry` from `calendar-content.ts`

- [ ] **Step 2: Add month zoom view**

Add month view rendering (replaces annual view in same container):
- Back button (← Vue annuelle)
- Month name centered + prev/next month arrows
- Quick month selector: horizontal bar of 13 month name buttons
- 7×4 grid with generous cell sizing
- Each cell: day number + type badge/dot + first line of content (truncated with `text-ellipsis overflow-hidden whitespace-nowrap`)
- Click on day → open modal
- Transition: add `calendar-view-enter` class on mount

State management:
- `let viewMode: 'annual' | 'month' = 'annual'`
- `let selectedMonth: number = 0`
- `render()` checks viewMode and renders accordingly

- [ ] **Step 3: Add enriched content modal**

Replace the existing joke modal with the enriched content modal:
- Fixed overlay backdrop (existing pattern)
- Modal card with `modal-enter` animation class
- Film grain overlay on modal background
- Header: colored badge (FACT/CITATION/ANECDOTE) left + ACN date right
- Body: text in italic, colored left border matching type
- Citation source or anecdote context below text (opacity reduced)
- Footer: prev/next day navigation (← prev day | next day →)
  - At month boundaries: navigate to adjacent month
  - At year boundaries (month 1 day 1 or month 13 day 28): disable the button
- Close: X button, backdrop click, Escape key listener

- [ ] **Step 4: Verify all calendar interactions in browser**

Run dev server and test:
- Annual view renders with colored dots
- Click month → zoom to month view with transition
- Month view shows content previews
- Click day → modal opens with correct content and type badge
- Modal prev/next navigation works across months
- Back to annual view works
- Year navigation works
- Current month/day highlighting works

- [ ] **Step 5: Commit**

```bash
git add src/components/calendar-grid.ts
git commit -m "feat: rewrite calendar with annual/month views and enriched content modal"
```

---

## Task 8: Paroles & Exploits — Merged section

**Files:**
- Create: `src/components/paroles-exploits.ts`

- [ ] **Step 1: Create paroles-exploits component**

Create `src/components/paroles-exploits.ts` combining quotes carousel + fact generator:

```typescript
import { quotes } from '../quotes';
import { fetchJoke, getRandomFallbackJoke } from '../jokes';
import { CHUCK_AVATAR } from '../chuck-images';

export function renderParolesExploits(): void {
  const container = document.getElementById('paroles');
  if (!container) return;

  container.innerHTML = `/* ... */`;
  // Bind events after setting innerHTML
}
```

Layout:
- "Acte II" small text above
- "Ses Paroles & Exploits" title in gold font-western
- Two-column flex layout (`flex flex-col lg:flex-row gap-8`)
- Left column: "Citations de films" card
  - Card: `border border-gold/30 rounded-lg p-6 bg-gold/5`
  - Label: "Citations de films" small uppercase opacity-40
  - Quote text: italic with `border-l-3 border-brick pl-4`
  - Source + year below in opacity-50
  - Prev/next arrows + dots navigation (reuse quotes-carousel logic)
  - Auto-rotation 6s (reuse existing logic)
- Right column: "Générateur de facts" card
  - Same card styling
  - Label: "Générateur de facts" small uppercase
  - Fact text: italic with `border-l-3 border-gold pl-4`
  - "Chuck me a Fact !" button: `bg-gradient-to-br from-gold to-[#B8860B] text-dark font-bold rounded-lg px-6 py-3`
  - Reuse fetchJoke/getRandomFallbackJoke logic + fade transitions from joke-generator

- [ ] **Step 2: Verify in browser**

Check: two-column layout on desktop, stacked on mobile, carousel auto-rotates, fact button fetches and displays with fade.

- [ ] **Step 3: Commit**

```bash
git add src/components/paroles-exploits.ts
git commit -m "feat: add merged paroles-exploits section with quotes carousel and fact generator"
```

---

## Task 9: Memorial and Video sections — Acte labels

**Files:**
- Modify: `src/components/memorial-section.ts`
- Modify: `src/components/video-gallery.ts`
- Modify: `src/components/footer.ts`

- [ ] **Step 1: Add "Acte I" label to memorial section**

In `src/components/memorial-section.ts`, add above the existing section title:
```html
<p class="text-xs tracking-[0.3em] uppercase text-wheat/40 mb-1">Acte I</p>
```

- [ ] **Step 2: Add "Acte III" label to video section**

In `src/components/video-gallery.ts`, add above the existing section title:
```html
<p class="text-xs tracking-[0.3em] uppercase text-wheat/40 mb-1">Acte III</p>
```

- [ ] **Step 3: Minor style alignment on footer**

In `src/components/footer.ts`, ensure consistent border/color usage with gold theme.

- [ ] **Step 4: Verify in browser**

Check all three sections show correct acte labels and consistent styling.

- [ ] **Step 5: Commit**

```bash
git add src/components/memorial-section.ts src/components/video-gallery.ts src/components/footer.ts
git commit -m "feat: add Acte labels to memorial and video sections, align footer style"
```

---

## Task 10: Expand quotes.ts for carousel

**Files:**
- Modify: `src/quotes.ts`

- [ ] **Step 1: Expand quotes array from 12 to ~50 entries**

Add ~38 new quotes to the `quotes` array in `src/quotes.ts`. These are for the "Paroles & Exploits" carousel (separate from the ~121 citations in calendar-content.ts). Include quotes from: Walker Texas Ranger, Missing in Action, Delta Force, Lone Wolf McQuade, Code of Silence, The Expendables 2, Invasion USA, Sidekicks, Firewalker, Braddock, The Hitman, Hero and the Terror. Keep the existing `Quote` interface (`{ text, source, year }`).

- [ ] **Step 2: Commit**

```bash
git add src/quotes.ts
git commit -m "feat: expand quotes from 12 to ~50 for carousel"
```

---

## Task 11: Main.ts — Wire everything together

**Files:**
- Modify: `src/main.ts`

- [ ] **Step 1: Update main.ts with new section order and separators**

Preserve the existing `initScrollAnimations()` function definition. Replace only the imports and render calls:

```typescript
import { renderNavbar } from './components/navbar';
import { renderHero } from './components/hero';
import { renderCalendar } from './components/calendar-grid';
import { renderMemorial } from './components/memorial-section';
import { renderParolesExploits } from './components/paroles-exploits';
import { renderVideos } from './components/video-gallery';
import { renderFooter } from './components/footer';
import { renderSeparator } from './components/section-separator';

// Remove old imports: renderJokeGenerator, renderQuotes

function injectSeparators(): void {
  const pairs: [string, string, Parameters<typeof renderSeparator>[0], number?][] = [
    ['hero', 'calendar', 'quote', 0],
    ['calendar', 'memorial', 'film'],
    ['memorial', 'paroles', 'star'],
    ['paroles', 'videos', 'quote', 1],
  ];
  for (const [afterId, _beforeId, type, quoteIdx] of pairs) {
    const section = document.getElementById(afterId);
    if (section) {
      section.insertAdjacentHTML('afterend',
        `<div class="scroll-section">${renderSeparator(type, quoteIdx)}</div>`
      );
    }
  }
}

// Render order
renderNavbar();
renderHero();
renderCalendar();
renderMemorial();
renderParolesExploits();
renderVideos();
renderFooter();
injectSeparators();
initScrollAnimations();
```

Note: `injectSeparators()` uses `insertAdjacentHTML('afterend', ...)` to inject separator divs between sections without modifying the HTML file. The separators are placed after each section element.

- [ ] **Step 2: Delete old component files**

Delete:
- `src/components/joke-generator.ts`
- `src/components/quotes-carousel.ts`

- [ ] **Step 3: Full build verification**

Run: `cd /Users/tombariteaupeter/Desktop/Perso/ChuckCalendar && npx vite build 2>&1 | tail -10`
Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 4: Full browser verification**

Run dev server and verify complete flow:
- Page loads without console errors
- Navbar shows film credits design with 5 links
- Active link highlights on scroll
- Hero shows cinematic design with film grain
- Separator (quote) between hero and calendar
- Calendar shows annual view with colored dots
- Calendar month zoom works
- Calendar modal shows typed content
- Separator (film) between calendar and memorial
- Memorial shows "Acte I" label
- Separator (star) between memorial and paroles
- Paroles shows two-column layout, carousel + generator work
- Separator (quote) between paroles and videos
- Videos show "Acte III" label
- Footer renders correctly
- Scroll animations work on all sections
- Mobile responsive layout works

- [ ] **Step 5: Commit**

```bash
git rm src/components/joke-generator.ts src/components/quotes-carousel.ts
git add src/main.ts index.html
git commit -m "feat: wire up ChuckCalendar v2 - new section order, separators, remove old components"
```

---

## Task order and dependencies

```
Task 1 (CSS) ──────────────────────────────────┐
Task 2 (Separators) ──────────────────────────┤
Task 3 (Calendar content data) ───────────────┤
Task 4 (index.html) ─────┬────────────────────┤
                          │                    ├── Task 11 (Wire together)
Task 5 (Navbar) ── depends on 4 ──────────────┤
Task 6 (Hero) ────────────────────────────────┤
Task 7 (Calendar grid) ── depends on 1, 3 ────┤
Task 8 (Paroles) ── depends on 4 ─────────────┤
Task 9 (Memorial/Video labels) ───────────────┤
Task 10 (Expand quotes.ts) ──────────────────┘
```

Tasks 1-4, 6, 9-10 can be done in parallel. Task 5 and 8 depend on Task 4. Task 7 depends on Tasks 1 and 3. Task 11 depends on all others.
