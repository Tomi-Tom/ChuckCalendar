# Internationalisation multilingue (FR / EN / ES / ZH)

**Date** : 2026-04-20
**Statut** : Design validé, prêt pour planification
**Auteur** : Claude (sous direction de Tom)

## Contexte

Le site ChuckCalendar est actuellement disponible uniquement en français. L'objectif est d'ouvrir le site à un public international en proposant un sélecteur de langue (drapeaux) en haut de page, permettant de basculer entre **français, anglais, espagnol et chinois simplifié**.

Toutes les chaînes de l'interface ainsi que **l'intégralité du contenu** (365+ entrées du calendrier, mémorial, citations, blagues, séparateurs) doivent être traduites.

## Objectifs

- Permettre à un visiteur non-francophone de consulter tout le site dans sa langue
- Sélecteur visuel intuitif (drapeaux) toujours visible dans le navbar
- Persistance du choix de langue entre les visites
- Détection automatique de la langue du navigateur au premier chargement
- URL partageable avec la langue active (`?lang=en`)

## Non-objectifs

- SEO multilingue avancé (pas de pages HTML séparées par langue, pas de `hreflang`)
- Traduction de plus de 4 langues (architecture extensible mais pas livrée)
- Système de gestion de traductions externe (Lokalise, Crowdin, etc.) — fichiers TS suffisent
- RTL (les 4 langues choisies sont LTR)

## Décisions clés

| Décision | Choix | Justification |
|---|---|---|
| Langues livrées | FR, EN, ES, ZH-Hans | Demande utilisateur ; couvre les principaux marchés |
| Variante chinoise | Simplifié (RPC) | Demande utilisateur, plus large audience |
| Langue par défaut | Auto-détection `navigator.language` → fallback `fr` | Meilleure UX premier visiteur |
| Persistance | `localStorage.lang` | Standard, pas de cookie nécessaire |
| URL | `?lang=xx` (priorité maximale) | Liens partageables, simple à implémenter |
| Affichage du sélecteur | Les 4 drapeaux côte à côte dans le navbar | Site mono-page, pas besoin de cacher derrière un dropdown |
| Drapeaux | SVG inline | Rendu cohérent multi-OS, scalables, pas de requête réseau |
| Auteur des traductions | Claude (humain assisté) | Qualité préservée pour l'humour Chuck Norris |
| Architecture | Module i18n maison | Cohérent avec le style vanilla TS du projet, zéro dépendance |

## Architecture

### Arborescence proposée

```
src/i18n/
├── index.ts                  # API publique : t(), setLanguage(), getLanguage(), onLanguageChange()
├── types.ts                  # types LanguageCode, Translations, etc.
├── languages.ts              # config des 4 langues + SVG drapeaux inline
├── ui/
│   ├── fr.ts                 # chaînes UI (navbar, hero, mémorial, footer, séparateurs)
│   ├── en.ts
│   ├── es.ts
│   └── zh.ts
├── calendar/
│   ├── fr.ts                 # 365+ entrées (déplacé depuis src/calendar-content.ts)
│   ├── en.ts
│   ├── es.ts
│   └── zh.ts
├── jokes/
│   ├── fr.ts                 # déplacé depuis src/jokes.ts
│   ├── en.ts
│   ├── es.ts
│   └── zh.ts
├── quotes/
│   └── {fr,en,es,zh}.ts
└── memorial/
    └── {fr,en,es,zh}.ts
```

### API du module i18n

```ts
// src/i18n/index.ts

export type LanguageCode = 'fr' | 'en' | 'es' | 'zh';

export function getLanguage(): LanguageCode;
export function setLanguage(code: LanguageCode): void;
export function t(key: string): string;
export function onLanguageChange(callback: (lang: LanguageCode) => void): () => void; // returns unsubscribe

// Initialisation au démarrage
export function initI18n(): void;
```

- `t(key)` : accède aux chaînes UI via une clé pointée (`'navbar.opening'`, `'hero.subtitle'`, etc.)
- Pour le contenu structuré (calendrier, mémorial, citations) : helpers dédiés qui retournent les structures typées de la langue active, ex. `getCalendarContent(): Record<string, CalendarEntry>`
- `onLanguageChange` : abonnement, utilisé par les composants pour se re-render

### Flow runtime

1. `initI18n()` au démarrage de `main.ts` :
   - Lecture de `?lang=xx` dans l'URL → si valide, prioritaire
   - Sinon `localStorage.lang` → si valide
   - Sinon `navigator.language.slice(0,2)` → si dans la liste supportée
   - Sinon fallback `'fr'`
   - Set `document.documentElement.lang = code`
2. Les composants `render*()` sont appelés une première fois (comme aujourd'hui)
3. Chaque composant s'abonne à `onLanguageChange` pour se re-render :
   ```ts
   onLanguageChange(() => renderHero());
   ```
4. Click sur un drapeau → `setLanguage(code)` :
   - Met à jour l'état interne
   - `localStorage.setItem('lang', code)`
   - `history.replaceState({}, '', '?lang=' + code)`
   - Met à jour `document.documentElement.lang`
   - Notifie tous les listeners → re-render

## Composants modifiés

| Composant | Changement |
|---|---|
| `navbar.ts` | Ajoute le bloc sélecteur de langue (4 drapeaux) entre le logo et les liens. Sur mobile : drapeaux dans la dropdown. Le drapeau actif a une bordure dorée (`border-gold`). Tous les libellés via `t()`. |
| `hero.ts` | Tous les textes via `t()` ; abonnement `onLanguageChange` |
| `memorial-section.ts` | Idem ; lecture du contenu via `getMemorialContent()` |
| `paroles-exploits.ts` | Idem ; quotes/jokes via helpers |
| `calendar-grid.ts` | Idem ; nom des mois/jours via `t()` ; entrées via `getCalendarContent()` |
| `video-gallery.ts` | Idem |
| `footer.ts` | Idem |
| `section-separator.ts` | Citations via helper langue-aware |
| `main.ts` | Appel `initI18n()` en tête, listener global pour re-render des séparateurs |

### Sources de données déplacées

| Source actuelle | Devient |
|---|---|
| `src/calendar-content.ts` | `src/i18n/calendar/{fr,en,es,zh}.ts` (la version FR contient les données actuelles) |
| `src/jokes.ts` | `src/i18n/jokes/{fr,en,es,zh}.ts` |
| `src/quotes.ts` | `src/i18n/quotes/{fr,en,es,zh}.ts` |
| `src/memorial.ts` | `src/i18n/memorial/{fr,en,es,zh}.ts` |
| `src/calendar.ts` | conservé (logique calendaire pure, indépendant du contenu) |

## Drapeaux SVG

4 SVG inline minimalistes en ratio 4:3, ~24px de haut, dans `languages.ts` :
- 🇫🇷 : 3 bandes verticales `#0055A4` / `#FFFFFF` / `#EF4135`
- 🇬🇧 : Union Jack simplifié (fond bleu + croix blanche/rouge)
- 🇪🇸 : 3 bandes horizontales `#AA151B` / `#F1BF00` / `#AA151B` (sans armoiries)
- 🇨🇳 : fond `#EE1C25` + 5 étoiles jaunes (1 grande + 4 petites)

Chaque drapeau est un `<button>` avec :
- `aria-label` traduit (« Switch to English », etc.)
- État actif : bordure or 2px + opacity 100%
- État inactif : opacity 50%, hover opacity 100%
- Transition douce 200ms

## Stratégie de livraison

L'implémentation se fait en **2 phases au sein de la même branche/PR** :

### Phase 1 — Infrastructure + UI
- Module i18n complet (`src/i18n/index.ts`, `languages.ts`, `types.ts`)
- Sélecteur drapeaux dans le navbar (desktop + mobile)
- Déplacement des fichiers de contenu vers la structure `src/i18n/<domaine>/fr.ts`
- Traduction complète **EN, ES, ZH** pour : UI navbar, hero, mémorial, paroles-exploits (quotes/jokes), footer, séparateurs, video-gallery
- Pour le calendrier : EN/ES/ZH affichent un **fallback explicite** (« Daily content available in French only — translation in progress »), le contenu FR reste accessible en switchant la langue

**Critère de fin Phase 1** : le site est entièrement utilisable dans les 4 langues, sauf le contenu du calendrier qui reste en FR avec un message clair.

### Phase 2 — Traduction du calendrier
- Traduction des 365+ entrées (`text` + `source`) en EN, ES, ZH
- Effectuée dans la foulée mais commit séparé pour faciliter la revue
- Découpage en sous-batches (ex. mois par mois) pour éviter de saturer le contexte

**Critère de fin Phase 2** : 100% du contenu traduit, fallback supprimé.

## Gestion des erreurs

- Clé de traduction manquante : `t('foo.bar')` retourne la clé entre crochets `[foo.bar]` en dev (visible) et la clé telle quelle en prod (silencieux mais détectable)
- Langue invalide passée à `setLanguage` : ignorée silencieusement, log console
- Entrée calendrier manquante dans une langue : fallback automatique vers le français + log console (utile pendant la Phase 1)

## Tests / vérifications manuelles

Pas de framework de test dans le projet aujourd'hui ; la vérification se fait :
1. **Build** : `npm run build` doit passer sans erreur TS
2. **Dev server** : `npm run dev`, vérifier visuellement chaque langue
3. **Navigation** : tester `?lang=en`, `?lang=es`, `?lang=zh`, `?lang=xx` (invalide)
4. **Persistance** : changer de langue, recharger, vérifier que la langue est conservée
5. **Auto-detect** : vider `localStorage`, changer la langue du navigateur, vérifier la détection
6. **Responsive** : tester desktop + mobile (drapeaux dans la dropdown mobile)

## Risques et mitigations

| Risque | Mitigation |
|---|---|
| Volume de traduction (1500+ chaînes) explose le contexte d'une session | Découpage Phase 1 / Phase 2, sous-batches par mois pour le calendrier |
| Humour Chuck Norris perd son ton en chinois/espagnol | Traduction par Claude (pas auto-translate), revue humaine encouragée |
| Re-render complet à chaque switch ralentit le site | Acceptable : le site est statique, ~7 composants à re-render. Pas d'optimisation prématurée. |
| Caractères chinois cassent la mise en page (largeur, line-height) | Tests visuels en Phase 1, ajustements CSS si nécessaire |
| Quelqu'un partage `?lang=zh` → utilisateur FR force-loaded en chinois | Acceptable : c'est l'intention du `?lang=`. Il peut switch d'un click. |

## Hors scope explicite

- Pas de modification de `calendar.ts` (logique pure)
- Pas d'ajout de tests automatisés (le projet n'en a pas)
- Pas de refonte du build, du Tailwind config ou du serveur de dev
- Pas de page admin / CMS de traductions
