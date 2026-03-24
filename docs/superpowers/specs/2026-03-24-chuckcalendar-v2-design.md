# ChuckCalendar v2 — Design Spec

## Overview

Redesign du site ChuckCalendar : amélioration UI/UX globale et diversification du contenu sur le calendrier. Le site passe d'un assemblage de sections indépendantes à une narration cinématique cohérente, avec le calendrier ACN comme pièce maîtresse contenant 364+ contenus uniques pré-assignés.

## Architecture des sections

Le site passe de 6 sections + footer à 5 sections + footer :

1. **Ouverture** (`id="hero"`) — intro cinématique
2. **Le Calendrier Sacré** (`id="calendar"`) — grille ACN interactive avec contenu diversifié
3. **La Légende** (`id="memorial"`) — timeline mémorial
4. **Ses Paroles & Exploits** (`id="paroles"`) — carousel citations + générateur de facts fusionnés
5. **En Action** (`id="videos"`) — galerie vidéo

**Footer** : Hommage (pas une section navigable)

Les sections actuelles "Générateur de facts" et "Carousel de citations" sont fusionnées en une seule section "Ses Paroles & Exploits".

## 1. Navbar — Générique de Film

### Design
- Fond quasi-noir (#0a0500), ligne dorée (#DAA520) en bas
- Logo à gauche : "CALENDRIER ACN" en gras doré + sous-titre "L'ÈRE DE CHUCK NORRIS" en petit, espacé
- Liens à droite numérotés en chiffres romains : I. Ouverture, II. Calendrier, III. Légende, IV. Paroles, V. Vidéos
- Lien actif en doré, autres en wheat à 50% opacité
- Sticky en haut au scroll
- Mobile : hamburger menu existant conservé

### Comportement
- IntersectionObserver pour highlight du lien actif (existant, à conserver)
- Smooth scroll au clic (existant)

## 2. Hero — Ouverture cinématique

### Design
- Background : dégradé vertical noir → bois sombre
- Overlay grain pellicule CSS (repeating-linear-gradient subtil)
- Bandeau haut : "Une production de l'Ère ACN" en lettres espacées, uppercase, opacité 50%, bordure basse dorée fine
- Photo Chuck dans cercle avec bordure dorée 3px + box-shadow lueur dorée
- Titre "CHUCK NORRIS" en doré avec text-shadow lueur
- Sous-titre dates "10 Mars 1940 — 19 Mars 2026" en uppercase espacé
- Bloc date ACN encadré : fond doré 10% opacité + bordure dorée 30%, contenant la date du jour en grand + horloge live
- Compteur temps depuis l'ère ACN : jours / heures / minutes / secondes en colonnes dorées
- Citation rotative en bas : italique avec source film, séparée par ligne dorée en haut

### Comportement
- Horloge mise à jour chaque seconde (existant)
- Rotation des citations toutes les 5s avec fade-out/fade-in (existant, setTimeout)
- Compteur temps mis à jour chaque seconde (existant)

## 3. Le Calendrier Sacré

### Structure de données

Nouveau fichier `src/calendar-content.ts` contenant 364+ entrées :

```typescript
type ContentType = 'fact' | 'citation' | 'anecdote';

interface CalendarEntry {
  type: ContentType;
  text: string;
  source?: string; // pour citations : nom du film + année, pour anecdotes : contexte historique
}

// Indexé par "mois-jour" (ex: "1-15" = 15 Norrisendre)
// Jour(s) de Chuck : clé "0-1" et "0-2"
const calendarContent: Record<string, CalendarEntry> = {
  "0-1": { type: "anecdote", text: "Le Jour de Chuck...", source: "Tradition ACN" },
  "0-2": { type: "anecdote", text: "Le Second Jour de Chuck...", source: "Tradition ACN (années bissextiles)" },
  "1-1": { type: "fact", text: "Chuck Norris peut diviser par zéro..." },
  "1-2": { type: "citation", text: "Je ne recule jamais...", source: "Missing in Action (1984)" },
  "1-3": { type: "anecdote", text: "En 1968, Chuck Norris remporte...", source: "Championnat mondial de karaté" },
  // ... 364+ entrées
};
```

Répartition cible : ~121 facts, ~121 citations, ~121 anecdotes, mélangés uniformément sur l'année.

Les 364 entrées + 2 Jours de Chuck sont un fichier TypeScript statique, hardcodé. Le contenu sera produit par génération assistée (Claude) puis relu/curé manuellement.

### Jour(s) de Chuck

Les Jour(s) de Chuck (1 ou 2 par an, inter-mois) apparaissent dans la vue annuelle comme une rangée spéciale en bas de la grille, avec un style distinct (fond doré, bordure spéciale). Ils ont leur propre contenu dans le modal (clés `"0-1"` et `"0-2"`).

### Fallback contenu manquant

Si une entrée est absente pour une date (possible pendant le développement incrémental), afficher un message par défaut : "Le contenu de ce jour est en cours de rédaction..." avec un style atténué.

### Vue annuelle (défaut)

- Grille de 13 mini-mois (responsive : 4 cols desktop, 2 cols tablette, 1 col mobile)
- Chaque mini-mois : titre du mois en police Western, grille 7 colonnes × 4 lignes (remplissage gauche-droite, pas d'alignement jour de la semaine)
- Chaque jour : numéro + pastille colorée selon le type
  - Or (#DAA520) = fact
  - Rouge (#A52A2A) = citation
  - Bleu (#2E5A88) = anecdote
- **Légende** en haut de la section : 3 pastilles avec labels (Fact / Citation / Anecdote)
- Mois courant mis en surbrillance (bordure dorée plus visible)
- Date du jour marquée (fond doré)
- Navigation par année (existante, à conserver)
- Clic sur un mois → zoom vers vue mois

### Vue mois (zoom)

- S'affiche à la place de la vue annuelle (transition fade, gérée en JS avec ajout/retrait de classes CSS)
- L'état de vue (annuelle vs mois N) n'est pas persisté dans l'URL — retour à la vue annuelle par défaut quand on navigue vers #calendar
- Barre de navigation en haut : bouton retour vue annuelle + nom du mois + flèches prev/next mois
- Sélecteur rapide des 13 mois en barre horizontale
- Grille 7x4 généreuse
- Chaque case de jour :
  - Numéro du jour en haut
  - Icône type (ou pastille colorée)
  - Première ligne du contenu en aperçu (tronqué)
- Clic sur un jour → ouverture du modal

### Modal de contenu

- Fond sombre (#1a0f00) avec overlay grain pellicule subtil
- En-tête : badge type coloré (FACT en or, CITATION en rouge, ANECDOTE en bleu) + date ACN à droite
- Corps : texte en italique avec bordure gauche colorée selon le type
- Pour les citations : source du film en dessous (opacité réduite)
- Pour les anecdotes : contexte historique en dessous
- Footer : navigation prev/next jour (à la frontière d'un mois, passe au mois suivant/précédent ; ne dépasse pas l'année courante)
- Fermeture : bouton X + clic extérieur + touche Escape

## 4. Séparateurs entre sections

3 types alternés entre les sections :

1. **Ligne dorée + citation** : gradient horizontal doré → transparent des deux côtés, micro-citation en italique au centre, même gradient en dessous
2. **Étoile ornementale** : lignes dorées convergentes vers une étoile dorée centrale
3. **Pellicule de film** : bande de rectangles dorés simulant une pellicule cinéma

Ordre : séparateur 1 (Hero→Calendrier), séparateur 3 pellicule (Calendrier→Légende), séparateur 2 étoile (Légende→Paroles), séparateur 1 (Paroles→Vidéos).

## 5. La Légende — Timeline mémorial

Pas de changement majeur de contenu. Améliorations visuelles :
- Titrage "Acte I" en petit au-dessus du titre de section (Ouverture n'a pas de numéro d'acte, le calendrier non plus — les actes commencent à La Légende)
- Style cohérent avec le reste (bordures dorées, fonds subtils)
- Conserve la timeline existante + bio + galerie photos

## 6. Ses Paroles & Exploits

### Layout
- Titrage : "Acte II" en petit + "Ses Paroles & Exploits" en titre doré
- Deux colonnes sur desktop, stack vertical sur mobile

### Colonne gauche — Carousel de citations
- Carte avec bordure dorée + fond subtil
- Label "Citations de films" en petit uppercase
- Citation en italique avec bordure gauche rouge (#A52A2A)
- Source du film en opacité réduite
- Navigation : dots + flèches prev/next
- Auto-rotation toutes les 6s (existant)

### Colonne droite — Générateur de facts
- Carte avec bordure dorée + fond subtil
- Label "Générateur de facts" en petit uppercase
- Fact affiché avec bordure gauche dorée (#DAA520)
- Bouton "Chuck me a Fact !" en gradient doré
- Appel API chuckfacts.xyz avec fallback (existant)
- Transition fade au changement (existant)

## 7. En Action — Galerie vidéo

Pas de changement majeur. Améliorations :
- Titrage "Acte III" en petit au-dessus du titre
- Style cohérent avec le thème global

## 8. Footer — Hommage

Conservé tel quel avec ajustements de style mineurs pour cohérence.

## Animations et transitions

- **Scroll fade-in** : sections apparaissent au scroll (existant, IntersectionObserver)
- **Grain pellicule** : overlay CSS permanent sur Hero et modal
- **Parallax léger** : background des sections se déplace légèrement au scroll (nouveau, CSS-only avec background-attachment: fixed). Dégradation gracieuse sur iOS/mobile où cette propriété est ignorée — pas de fallback JS, le fond reste simplement statique.
- **Zoom calendrier** : transition fade/scale de vue annuelle vers vue mois
- **Modal** : fade-in avec léger scale-up

## Sourcing du contenu (364+ entrées)

Le contenu sera généré et organisé dans `src/calendar-content.ts` :

### Facts (~121)
- Source principale : API chuckfacts.xyz (récupération batch pour constituer le pool)
- Complément : facts hardcodés existants (32 dans jokes.ts)
- Thèmes variés : physique/science, animaux, technologie, nourriture, géographie, temps/espace

### Citations (~121)
- Citations de films Chuck Norris (existantes : 12 dans quotes.ts, à étendre)
- Citations de séries (Walker Texas Ranger)
- Citations attribuées à Chuck Norris (interviews, autobiographie)
- Répliques cultes de ses partenaires dans les films

### Anecdotes (~121)
- Biographie : enfance, Air Force, entraînement martial
- Carrière arts martiaux : championnats, élèves célèbres, rencontre avec Bruce Lee
- Carrière cinéma : tournages, anecdotes de plateau
- Vie personnelle : philanthropie, Total Gym, politique
- Phénomène internet : origine des Chuck Norris facts, impact culturel
- Records et distinctions : ceintures noires, honneurs militaires

## Fichiers impactés

### Nouveaux fichiers
- `src/calendar-content.ts` — 364+ entrées de contenu indexées par date

### Fichiers modifiés
- `src/components/navbar.ts` — redesign Générique de Film
- `src/components/hero.ts` — redesign cinématique
- `src/components/calendar-grid.ts` — refonte majeure (vue annuelle + zoom + modal enrichi)
- `src/components/joke-generator.ts` — fusionné dans nouvelle section
- `src/components/quotes-carousel.ts` — fusionné dans nouvelle section
- `src/main.ts` — nouvel ordre des sections + séparateurs
- `src/style.css` — nouveaux styles (grain pellicule, séparateurs, parallax, couleurs badges)
- `src/quotes.ts` — extension de 12 à ~121 citations

### Nouveaux composants possibles
- `src/components/paroles-exploits.ts` — section fusionnée (remplace joke-generator + quotes-carousel)
- `src/components/section-separator.ts` — composant séparateur réutilisable

### Fichiers supprimés (optionnel)
- `src/components/joke-generator.ts` — logique déplacée dans paroles-exploits.ts
- `src/components/quotes-carousel.ts` — logique déplacée dans paroles-exploits.ts

## Hors scope

- Pas de changement au système de calendrier ACN (calendar.ts)
- Pas de changement aux vidéos (videos.ts)
- Pas de changement aux images (chuck-images.ts)
- Pas de nouveau framework ou librairie
- Pas de backend — tout reste statique côté client
