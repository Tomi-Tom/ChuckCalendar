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
