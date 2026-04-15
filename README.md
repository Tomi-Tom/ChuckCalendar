<div align="center">

# 🤠 ChuckCalendar

### ─═══─ ⊶ ─═══─ ⊶ ─═══─

**Le calendrier de l'Ère ACN — Après Chuck Norris**

*Chuck Norris ne suit pas le calendrier. Le calendrier suit Chuck Norris.*

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Chuck Norris Approved](https://img.shields.io/badge/Chuck_Norris-Approved_🥋-DAA520?style=for-the-badge)](https://github.com/Tomi-Tom)

</div>

---

## 📖 À propos

**ChuckCalendar** est un site web hommage à la légende vivante (et éternelle) de Chuck Norris. Il introduit un système calendaire inédit : le **calendrier ACN** (*Après Chuck Norris*), un calendrier lunaire de **13 mois de 28 jours**, dont l'époque débute le 20 mars 2026 — le lendemain du décès de Chuck Norris.

Entre chaque année, **1 à 2 jours sacrés** appelés **« Jour(s) de Chuck »** assurent la synchronisation avec le calendrier grégorien. Les mois portent des noms dignes de la légende : *Janorris, Févriaire, Marsial, Avrilanche, Maistral, Juingler, Juillecoup, Aoûtlaw, Septembare, Octobrave, Novembrise, Décembrase* et *Chucknorembre*.

---

## 📸 Aperçu

> *Captures d'écran à venir — Chuck Norris n'a pas besoin de screenshots, mais les utilisateurs si.*

<div align="center">

| Hero | Calendrier | Mémorial |
|:---:|:---:|:---:|
| ![Hero](https://via.placeholder.com/300x180/1a0f00/DAA520?text=Hero+ACN) | ![Calendrier](https://via.placeholder.com/300x180/1a0f00/DAA520?text=Calendrier+13+mois) | ![Memorial](https://via.placeholder.com/300x180/1a0f00/DAA520?text=Timeline+L%C3%A9gende) |

</div>

---

## ✨ Fonctionnalités

🗓️ **Calendrier ACN complet**
- Système de 13 mois × 28 jours avec les « Jour(s) de Chuck » inter-annuels
- Conversion en temps réel entre le calendrier grégorien et le calendrier ACN
- Vue annuelle et vue mensuelle avec transitions animées
- Contenu quotidien : **facts**, **citations** et **anecdotes** pour chaque jour

⏱️ **Compteur en temps réel**
- Horloge ACN mise à jour chaque seconde
- Compteur du temps écoulé depuis le 19 mars 2026

🏆 **Section Mémorial**
- Biographie épique de Chuck Norris
- Timeline interactive illustrée de 1940 à l'An 1 ACN
- Photos d'archives (locales et Wikimedia Commons)

💬 **Paroles & Exploits**
- Plus de 50 citations tirées de ses films et séries
- Carrousel automatique avec navigation manuelle
- Blagues Chuck Norris via l'API [chuckfacts.xyz](https://chuckfacts.xyz) (avec fallback local)

🎬 **Galerie Vidéo**
- 8 vidéos YouTube embarquées : combats légendaires, compilations, scènes cultes
- Chargement différé (lazy loading)

🎨 **Design Western immersif**
- Palette cuir / or / blé / brique sur fond sombre
- Typographies *Rye* (titres western) et *Lora* (corps élégant)
- Animations : fade-in au scroll, glow doré pulsé, shimmer sur les bordures, drift lent
- Séparateurs stylisés entre les sections (citations, étoiles, pellicules)
- Scrollbar personnalisée aux couleurs du thème
- Responsive (mobile-first)

---

## 🛠️ Stack technique

| Technologie | Rôle |
|:---|:---|
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Logique applicative, système calendaire, rendu des composants |
| ![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white) | Bundler & serveur de développement ultra-rapide |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Styling utilitaire avec thème custom |
| ![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=googlefonts&logoColor=white) | Polices Rye & Lora |
| ![YouTube](https://img.shields.io/badge/YouTube_Embed-FF0000?style=flat-square&logo=youtube&logoColor=white) | Galerie vidéo intégrée |

> **Aucun framework UI** — le rendu est fait en TypeScript pur via manipulation du DOM, pour un bundle minimal et des performances maximales. Chuck Norris n'a pas besoin de React.

---

## 🚀 Installation & Lancement

### Prérequis

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/Tomi-Tom/ChuckCalendar.git
cd ChuckCalendar

# Installer les dépendances
npm install
```

### Développement

```bash
npm run dev
```

Le serveur Vite démarre sur `http://localhost:5173` — avec hot reload.

### Production

```bash
# Compilation TypeScript + build Vite
npm run build

# Prévisualiser le build
npm run preview
```

---

## 📁 Structure du projet

```
ChuckCalendar/
├── index.html                  # Point d'entrée HTML (lang: fr)
├── package.json                # Dépendances & scripts
├── tsconfig.json               # Configuration TypeScript (strict)
├── vite.config.ts              # Configuration Vite + plugin Tailwind
│
├── public/
│   └── images/                 # Photos locales de Chuck Norris
│
├── src/
│   ├── main.ts                 # Orchestrateur — rendu des sections + animations scroll
│   ├── style.css               # Tailwind + thème custom + animations CSS
│   ├── calendar.ts             # 🗓️ Moteur du calendrier ACN (13 mois, Jour de Chuck, conversion)
│   ├── calendar-content.ts     # 📋 Contenu quotidien (facts, citations, anecdotes)
│   ├── quotes.ts               # 💬 Collection de 50+ citations de films
│   ├── jokes.ts                # 😂 Blagues Chuck Norris (API + fallback local)
│   ├── videos.ts               # 🎬 Données des vidéos YouTube
│   ├── memorial.ts             # 🏆 Timeline biographique + texte bio
│   ├── chuck-images.ts         # 🖼️ Registre centralisé des photos
│   └── components/
│       ├── navbar.ts           # Barre de navigation fixe
│       ├── hero.ts             # Section héro (horloge ACN, compteur, citation)
│       ├── calendar-grid.ts    # Grille calendrier (vue annuelle / mensuelle)
│       ├── memorial-section.ts # Section mémorial (bio + timeline illustrée)
│       ├── paroles-exploits.ts # Carrousel citations + générateur de blagues
│       ├── video-gallery.ts    # Galerie vidéo YouTube
│       ├── footer.ts           # Pied de page commémoratif
│       └── section-separator.ts# Séparateurs décoratifs (citations, étoiles, pellicules)
│
└── dist/                       # Build de production (généré)
```

---

## 📅 Le Calendrier ACN en bref

| Propriété | Valeur |
|:---|:---|
| **Époque** | 20 mars 2026 (lendemain du décès de Chuck Norris) |
| **Mois par an** | 13 |
| **Jours par mois** | 28 |
| **Jours réguliers par an** | 364 |
| **Jour(s) de Chuck** | 1 ou 2 jours sacrés inter-annuels (alignement grégorien) |
| **Année bissextile** | 2 Jours de Chuck si l'année grégorienne correspondante est bissextile |

### Les 13 mois de l'année ACN

> *Janorris — Févriaire — Marsial — Avrilanche — Maistral — Juingler — Juillecoup — Aoûtlaw — Septembare — Octobrave — Novembrise — Décembrase — Chucknorembre*

---

## 👤 Auteur

<div align="center">

Créé avec 💛 et des roundhouse kicks par **[Tomi-Tom](https://github.com/Tomi-Tom)**

*« La douleur est temporaire. La légende est éternelle. »*

</div>

---

## 📜 Licence

Ce projet est un hommage personnel et humoristique à Chuck Norris. Les images issues de Wikimedia Commons sont utilisées sous leurs licences respectives. Le code source est libre d'utilisation.

---

<div align="center">

**★ À la mémoire éternelle de Chuck Norris ★**

*Carlos Ray Norris — 10 Mars 1940, Ryan, Oklahoma — 19 Mars 2026, Kauai, Hawaï*

─═══─ ⊶ ─═══─ ⊶ ─═══─

</div>
