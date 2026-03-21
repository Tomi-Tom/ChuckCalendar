# ChuckCalendar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a retro-Texas-themed Chuck Norris memorial website with a custom 13-month lunar calendar (Ère ACN), joke generator, movie quotes, and iconic video embeds.

**Architecture:** Single-page Vite + TypeScript + Tailwind app with vanilla TS (no framework). Sections are scroll-based with anchor navigation. Chuck Norris jokes fetched from `api.chucknorris.io` with hardcoded fallback.

**Tech Stack:** Vite, TypeScript, Tailwind CSS v4, Google Fonts (Rye, Lora)

---

## File Structure

```
src/
├── main.ts                  # Entry point, initializes all sections
├── style.css                # Tailwind directives + custom western styles
├── calendar.ts              # ACN calendar logic (13 months × 28 days)
├── jokes.ts                 # Joke fetcher (API + fallback)
├── quotes.ts                # Film/series quotes data
├── videos.ts                # Video embeds data
├── memorial.ts              # Memorial/bio content
├── components/
│   ├── hero.ts              # Hero section renderer
│   ├── calendar-grid.ts     # Calendar grid UI
│   ├── memorial-section.ts  # Memorial section renderer
│   ├── joke-generator.ts    # Joke generator UI
│   ├── quotes-carousel.ts   # Quotes carousel UI
│   └── video-gallery.ts     # Video gallery UI
index.html                   # Main HTML shell
tailwind.config.ts           # Tailwind config with western theme
```

---

### Task 1: Scaffold Vite + TS + Tailwind Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.ts`, `index.html`, `src/main.ts`, `src/style.css`

- [ ] **Step 1: Initialize Vite project**

```bash
cd /Users/tombariteaupeter/Desktop/Perso/ChuckCalendar
npm create vite@latest . -- --template vanilla-ts
```

- [ ] **Step 2: Install Tailwind CSS v4**

```bash
npm install
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Vite with Tailwind plugin**

`vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

- [ ] **Step 4: Set up style.css with Tailwind + western theme**

`src/style.css`:
```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Rye&family=Lora:wght@400;700&display=swap');

@theme {
  --color-leather: #8B4513;
  --color-wheat: #F5DEB3;
  --color-brick: #A52A2A;
  --color-gold: #DAA520;
  --color-dark: #1a0f00;
  --color-wood: #3e2110;
  --font-western: 'Rye', serif;
  --font-body: 'Lora', serif;
}
```

- [ ] **Step 5: Set up index.html shell**

`index.html`: HTML shell with section containers (hero, calendar, memorial, jokes, quotes, videos), nav bar, Google Fonts link, western background.

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```
Expected: Dev server starts on localhost, page loads with Tailwind styles.

- [ ] **Step 7: Init git and commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Vite + TS + Tailwind project"
```

---

### Task 2: ACN Calendar Logic

**Files:**
- Create: `src/calendar.ts`

- [ ] **Step 1: Implement ACN calendar system**

`src/calendar.ts` — Core calendar logic:
- ACN_EPOCH = March 20, 2025
- 13 months of 28 days each (364 days) + "Jour de Chuck" (1-2 extra days)
- Month names: Norrisendre, Févriaire, Marsial, Avrilanche, Maistral, Juingler, Juillecoup, Aoûtlaw, Septembare, Octobrave, Novembrise, Décembrase, Chuckicendre
- Functions: `getACNDate(date: Date)` → `{ year, month, day, monthName, isChuckDay }`
- `getMonthDays(year: number, month: number)` → array of day objects
- `acnToGregorian(year: number, month: number, day: number)` → Date
- Leap year handling: 2 "Jours de Chuck" on leap years

- [ ] **Step 2: Commit**

```bash
git add src/calendar.ts
git commit -m "feat: add ACN calendar system with 13 lunar months"
```

---

### Task 3: Hero Section

**Files:**
- Create: `src/components/hero.ts`

- [ ] **Step 1: Build hero component**

`src/components/hero.ts`:
- Full-screen banner with dark overlay
- Title: "Ère ACN — Après Chuck Norris"
- Live counter showing current ACN date (An X, Jour Y)
- Epic quote rotating animation
- Western-styled typography with Rye font
- Star/sheriff badge decorative elements

- [ ] **Step 2: Wire into main.ts**

Import and render hero in `src/main.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero.ts src/main.ts
git commit -m "feat: add hero section with ACN date counter"
```

---

### Task 4: Calendar Grid UI

**Files:**
- Create: `src/components/calendar-grid.ts`

- [ ] **Step 1: Build calendar grid component**

`src/components/calendar-grid.ts`:
- 13-month grid display, each month showing 4 weeks × 7 days
- Navigation between ACN years (< An 1 | An 2 >)
- Current day highlighted with gold border
- Click on day shows a Chuck fact (fetched from joke module)
- "Jour de Chuck" displayed as special day between Chuckicendre and Norrisendre
- Western-themed grid with wood/leather textures

- [ ] **Step 2: Wire into main.ts**

- [ ] **Step 3: Commit**

```bash
git add src/components/calendar-grid.ts src/main.ts
git commit -m "feat: add 13-month ACN calendar grid"
```

---

### Task 5: Memorial Section

**Files:**
- Create: `src/memorial.ts`, `src/components/memorial-section.ts`

- [ ] **Step 1: Create memorial content data**

`src/memorial.ts`:
- Bio épique de Chuck Norris
- Timeline: naissance, carrière arts martiaux, films, Walker Texas Ranger, memes, héritage
- Tons élogieux et épiques

- [ ] **Step 2: Build memorial section component**

`src/components/memorial-section.ts`:
- Styled timeline with western decorations
- Sections for each era of Chuck's life
- Fade-in animations on scroll

- [ ] **Step 3: Wire into main.ts and commit**

```bash
git add src/memorial.ts src/components/memorial-section.ts src/main.ts
git commit -m "feat: add Chuck Norris memorial section"
```

---

### Task 6: Joke Generator

**Files:**
- Create: `src/jokes.ts`, `src/components/joke-generator.ts`

- [ ] **Step 1: Create joke fetcher with fallback**

`src/jokes.ts`:
- `fetchJoke()`: hits `https://api.chucknorris.io/jokes/random`
- On failure, picks random from hardcoded array (~30 jokes)
- Hardcoded jokes array as fallback

- [ ] **Step 2: Build joke generator UI**

`src/components/joke-generator.ts`:
- Big western-styled button "Chuck me a Fact!"
- Display area with leather-textured card
- Loading state with sheriff star spinner
- Fade-in animation for new jokes

- [ ] **Step 3: Wire into main.ts and commit**

```bash
git add src/jokes.ts src/components/joke-generator.ts src/main.ts
git commit -m "feat: add Chuck Norris joke generator with API fallback"
```

---

### Task 7: Quotes Carousel

**Files:**
- Create: `src/quotes.ts`, `src/components/quotes-carousel.ts`

- [ ] **Step 1: Create quotes data**

`src/quotes.ts`:
- Array of quotes from Walker Texas Ranger, Missing in Action, Delta Force, Lone Wolf McQuade, The Expendables 2, etc.
- Each quote: `{ text, source, year }`

- [ ] **Step 2: Build quotes carousel**

`src/components/quotes-carousel.ts`:
- Auto-rotating carousel with manual prev/next
- Western-styled quote cards with film reference
- Smooth transition animations

- [ ] **Step 3: Wire into main.ts and commit**

```bash
git add src/quotes.ts src/components/quotes-carousel.ts src/main.ts
git commit -m "feat: add movie quotes carousel"
```

---

### Task 8: Video Gallery

**Files:**
- Create: `src/videos.ts`, `src/components/video-gallery.ts`

- [ ] **Step 1: Create video data**

`src/videos.ts`:
- Array of iconic YouTube video IDs with titles/descriptions
- Walker Texas Ranger scenes, roundhouse kicks, movie clips, Total Gym ads

- [ ] **Step 2: Build video gallery**

`src/components/video-gallery.ts`:
- Responsive grid of YouTube iframe embeds
- Lazy loading for performance
- Western-styled cards with title overlays

- [ ] **Step 3: Wire into main.ts and commit**

```bash
git add src/videos.ts src/components/video-gallery.ts src/main.ts
git commit -m "feat: add iconic video gallery"
```

---

### Task 9: Navigation + Polish + Final Assembly

**Files:**
- Modify: `index.html`, `src/main.ts`, `src/style.css`

- [ ] **Step 1: Add sticky western navbar**

Navigation bar with anchor links to each section, sheriff star logo, western styling.

- [ ] **Step 2: Add scroll animations**

Intersection Observer-based fade-in animations for all sections.

- [ ] **Step 3: Add responsive design**

Mobile-first responsive adjustments for all sections.

- [ ] **Step 4: Final polish**

- Wood/leather background textures via CSS gradients
- Barbed wire dividers between sections
- Sheriff star decorative elements
- Smooth scroll behavior

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: add navigation, animations, and western polish"
```

---

### Task 10: Build Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: Clean build, no errors.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```
Expected: All sections render, jokes load, videos embed, calendar navigates.

- [ ] **Step 3: Final commit if needed**

```bash
git add -A
git commit -m "chore: fix any build issues"
```
