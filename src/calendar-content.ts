export type ContentType = 'fact' | 'citation' | 'anecdote';

export interface CalendarEntry {
  type: ContentType;
  text: string;
  source?: string;
}

export const calendarContent: Record<string, CalendarEntry> = {
  // === Jour(s) de Chuck (0-1, 0-2) ===
  '0-1': {
    type: 'anecdote',
    text: 'Le calendrier de l\'Association Chuckienne Normande (ACN) est le seul calendrier au monde à comporter 13 mois de 28 jours, plus un ou deux jours spéciaux dédiés à Chuck Norris. Ce jour, le premier Jour de Chuck, célèbre l\'homme, la légende, le mythe. Chaque année, les membres de l\'ACN se réunissent pour honorer celui qui a redéfini les lois de la physique.',
    source: 'Tradition du calendrier ACN',
  },
  '0-2': {
    type: 'anecdote',
    text: 'Le deuxième Jour de Chuck n\'apparaît que les années bissextiles, car même le temps a besoin d\'un jour supplémentaire pour rendre hommage à Chuck Norris. Ce jour est consacré à la méditation sur les exploits les plus invraisemblables de Chuck, et à la récitation collective de faits chuckiens. Les historiens estiment que ce jour supplémentaire a été ajouté au calendrier grégorien sur demande personnelle de Chuck Norris.',
    source: 'Tradition du calendrier ACN – années bissextiles',
  },

  // === Mois 1 ===
  '1-1': {
    type: 'fact',
    text: 'Chuck Norris peut diviser par zéro.',
  },
  '1-2': {
    type: 'citation',
    text: 'Quand on me provoque, je ne réponds pas. J\'agis.',
    source: 'Walker, Texas Ranger (1993)',
  },
  '1-3': {
    type: 'anecdote',
    text: 'Carlos Ray Norris est né le 10 mars 1940 à Ryan, dans l\'Oklahoma. Le prénom « Chuck » est un surnom qu\'il a adopté plus tard dans sa vie.',
    source: 'Biographie – Naissance',
  },
  '1-4': {
    type: 'fact',
    text: 'Chuck Norris a déjà compté jusqu\'à l\'infini. Deux fois.',
  },
  '1-5': {
    type: 'citation',
    text: 'La justice ne dort jamais.',
    source: 'Walker, Texas Ranger (1995)',
  },
  '1-6': {
    type: 'anecdote',
    text: 'L\'enfance de Chuck Norris a été marquée par la pauvreté et l\'alcoolisme de son père, Ray Norris. Malgré ces épreuves, le jeune Carlos a développé une discipline de fer qui allait façonner toute sa carrière.',
    source: 'Biographie – Enfance difficile',
  },
  '1-7': {
    type: 'fact',
    text: 'Quand Chuck Norris fait des pompes, il ne se soulève pas, il repousse la Terre.',
  },
  '1-8': {
    type: 'citation',
    text: 'Je n\'ai pas besoin d\'armes. Je suis une arme.',
    source: 'Missing in Action (1984)',
  },
  '1-9': {
    type: 'anecdote',
    text: 'En 1958, Chuck Norris s\'engage dans l\'US Air Force. Il est envoyé à la base aérienne d\'Osan en Corée du Sud, où il découvre les arts martiaux pour la première fois.',
    source: 'Biographie – Service militaire',
  },
  '1-10': {
    type: 'fact',
    text: 'La mort a eu une expérience de near-Chuck.',
  },
  '1-11': {
    type: 'citation',
    text: 'On ne choisit pas le moment du combat. Mais on choisit de se battre.',
    source: 'Delta Force (1986)',
  },
  '1-12': {
    type: 'anecdote',
    text: 'C\'est en Corée du Sud que Chuck Norris commence à pratiquer le Tang Soo Do, un art martial coréen. Il obtient rapidement sa ceinture noire et développe une passion qui va transformer sa vie.',
    source: 'Biographie – Découverte du Tang Soo Do',
  },
  '1-13': {
    type: 'fact',
    text: 'Chuck Norris a gagné un tournoi de fléchettes. Avec un bus.',
  },
  '1-14': {
    type: 'citation',
    text: 'Si tu veux la paix, prépare-toi à la guerre.',
    source: 'Invasion U.S.A. (1985)',
  },
  '1-15': {
    type: 'anecdote',
    text: 'Chuck Norris a remporté le titre de Champion professionnel de karaté poids moyen six fois consécutives, de 1968 à 1974. Un record inégalé dans l\'histoire de ce sport.',
    source: 'Biographie – Carrière en karaté',
  },
  '1-16': {
    type: 'fact',
    text: 'Les requins ont une semaine Chuck Norris.',
  },
  '1-17': {
    type: 'citation',
    text: 'Le courage, c\'est d\'avoir peur mais d\'agir quand même.',
    source: 'Lone Wolf McQuade (1983)',
  },
  '1-18': {
    type: 'anecdote',
    text: 'Après son retour de Corée, Chuck Norris a ouvert plusieurs écoles d\'arts martiaux en Californie. Parmi ses élèves célèbres figuraient Steve McQueen, Bob Barker et Priscilla Presley.',
    source: 'Biographie – Écoles d\'arts martiaux',
  },
  '1-19': {
    type: 'fact',
    text: 'Chuck Norris peut claquer une porte ouverte.',
  },
  '1-20': {
    type: 'citation',
    text: 'La loi, c\'est moi.',
    source: 'Walker, Texas Ranger (1998)',
  },
  '1-21': {
    type: 'anecdote',
    text: 'Chuck Norris a rencontré Bruce Lee en 1968 lors d\'un tournoi de karaté. Les deux hommes sont devenus amis et partenaires d\'entraînement. Bruce Lee a ensuite proposé à Chuck de jouer dans Retour du Dragon (1972).',
    source: 'Biographie – Rencontre avec Bruce Lee',
  },
  '1-22': {
    type: 'fact',
    text: 'Quand Google ne trouve pas quelque chose, il demande à Chuck Norris.',
  },
  '1-23': {
    type: 'citation',
    text: 'Je reviens toujours. Toujours.',
    source: 'The Expendables 2 (2012)',
  },
  '1-24': {
    type: 'anecdote',
    text: 'Le combat entre Chuck Norris et Bruce Lee dans le Colisée de Rome, dans Retour du Dragon (1972), est considéré comme l\'une des meilleures scènes de combat de l\'histoire du cinéma.',
    source: 'Biographie – Retour du Dragon',
  },
  '1-25': {
    type: 'fact',
    text: 'Chuck Norris peut faire pleurer un oignon.',
  },
  '1-26': {
    type: 'citation',
    text: 'Un homme sans honneur n\'est rien.',
    source: 'Code of Silence (1985)',
  },
  '1-27': {
    type: 'anecdote',
    text: 'Chuck Norris a créé son propre art martial, le Chun Kuk Do (« la voie universelle »), qui combine des éléments de Tang Soo Do, de taekwondo et de plusieurs autres disciplines.',
    source: 'Biographie – Création du Chun Kuk Do',
  },
  '1-28': {
    type: 'fact',
    text: 'Quand Chuck Norris regarde un GPS, c\'est le GPS qui se perd.',
  },

  // === Mois 2 ===
  '2-1': {
    type: 'citation',
    text: 'Le mal ne triomphe que lorsque les hommes de bien ne font rien.',
    source: 'Walker, Texas Ranger (2001)',
  },
  '2-2': {
    type: 'anecdote',
    text: 'Walker, Texas Ranger a été diffusé de 1993 à 2001 sur CBS, totalisant 203 épisodes sur 8 saisons. La série a fait de Chuck Norris une icône télévisuelle mondiale.',
    source: 'Biographie – Walker, Texas Ranger',
  },
  '2-3': {
    type: 'fact',
    text: 'Chuck Norris peut écrire avec un surligneur.',
  },
  '2-4': {
    type: 'citation',
    text: 'Ma patience a des limites. Et tu viens de les atteindre.',
    source: 'Missing in Action 2: The Beginning (1985)',
  },
  '2-5': {
    type: 'anecdote',
    text: 'Chuck Norris détient une ceinture noire 9e dan en Tang Soo Do, faisant de lui l\'un des pratiquants les plus gradés de cet art martial dans le monde entier.',
    source: 'Biographie – Ceinture noire 9e dan',
  },
  '2-6': {
    type: 'fact',
    text: 'Chuck Norris ne porte pas de montre. Il décide de l\'heure qu\'il est.',
  },
  '2-7': {
    type: 'citation',
    text: 'Dans la vie, tu es soit le chasseur, soit la proie.',
    source: 'Lone Wolf McQuade (1983)',
  },
  '2-8': {
    type: 'anecdote',
    text: 'En plus de sa maîtrise du Tang Soo Do, Chuck Norris possède une ceinture noire 8e dan en taekwondo, décernée par la Fédération mondiale de taekwondo.',
    source: 'Biographie – Ceinture noire en taekwondo',
  },
  '2-9': {
    type: 'fact',
    text: 'Si Chuck Norris dort avec une lampe allumée, c\'est pas parce qu\'il a peur du noir. C\'est le noir qui a peur de lui.',
  },
  '2-10': {
    type: 'citation',
    text: 'Je ne fais pas de prisonniers. Je fais des exemples.',
    source: 'Delta Force (1986)',
  },
  '2-11': {
    type: 'anecdote',
    text: 'Chuck Norris a fondé la KickStart Foundation, un programme destiné aux jeunes défavorisés. L\'organisation enseigne les arts martiaux dans les écoles publiques pour aider les enfants à développer discipline et confiance en soi.',
    source: 'Biographie – KickStart Foundation',
  },
  '2-12': {
    type: 'fact',
    text: 'Chuck Norris a déjà été sur Mars. C\'est pourquoi il n\'y a pas de signes de vie.',
  },
  '2-13': {
    type: 'citation',
    text: 'Personne ne touche à ma famille. Personne.',
    source: 'Braddock: Missing in Action III (1988)',
  },
  '2-14': {
    type: 'anecdote',
    text: 'Le phénomène des « Chuck Norris Facts » est né sur Internet vers 2005, quand des étudiants ont commencé à poster des blagues absurdes sur les supposés superpouvoirs de Chuck Norris. Le phénomène est rapidement devenu viral.',
    source: 'Biographie – Phénomène Internet',
  },
  '2-15': {
    type: 'fact',
    text: 'Chuck Norris peut gagner une partie de Puissance 4 en trois coups.',
  },
  '2-16': {
    type: 'citation',
    text: 'La force sans la justice n\'est que tyrannie.',
    source: 'Walker, Texas Ranger (1996)',
  },
  '2-17': {
    type: 'anecdote',
    text: 'En 2007, Chuck Norris a reçu le titre de Marine honoraire du Corps des Marines des États-Unis, un honneur extrêmement rare accordé à un civil.',
    source: 'Biographie – Marine honoraire',
  },
  '2-18': {
    type: 'fact',
    text: 'Quand Chuck Norris envoie un mail, le serveur dit merci.',
  },
  '2-19': {
    type: 'citation',
    text: 'Les règles sont faites pour les hommes faibles. Les hommes forts créent les leurs.',
    source: 'Forced Vengeance (1982)',
  },
  '2-20': {
    type: 'anecdote',
    text: 'Chuck Norris a publié son autobiographie « Against All Odds » (Contre toute attente) en 2004, dans laquelle il raconte son parcours depuis une enfance difficile en Oklahoma jusqu\'à la célébrité internationale.',
    source: 'Biographie – Autobiographie',
  },
  '2-21': {
    type: 'fact',
    text: 'Chuck Norris peut applaudir d\'une seule main.',
  },
  '2-22': {
    type: 'citation',
    text: 'Un vrai guerrier ne se bat pas par haine, mais par amour de ce qu\'il protège.',
    source: 'Walker, Texas Ranger (1994)',
  },
  '2-23': {
    type: 'anecdote',
    text: 'Chuck Norris est marié à Gena O\'Kelley depuis 1998. Le couple s\'est rencontré lors d\'un dîner à Dallas. Gena, ancienne mannequin, est de 23 ans sa cadette.',
    source: 'Biographie – Vie personnelle',
  },
  '2-24': {
    type: 'fact',
    text: 'Chuck Norris ne fait pas de pompes, il repousse la Terre.',
  },
  '2-25': {
    type: 'citation',
    text: 'La vengeance n\'est pas une solution. La justice, si.',
    source: 'An Eye for an Eye (1981)',
  },
  '2-26': {
    type: 'anecdote',
    text: 'En 2001, Chuck Norris et Gena O\'Kelley ont accueilli des jumeaux, Dakota Alan et Danilee Kelly. Chuck avait alors 61 ans.',
    source: 'Biographie – Naissance des jumeaux',
  },
  '2-27': {
    type: 'fact',
    text: 'Chuck Norris peut couper un couteau avec du beurre.',
  },
  '2-28': {
    type: 'citation',
    text: 'Je ne cours pas devant le danger. Le danger court devant moi.',
    source: 'The Hitman (1991)',
  },

  // === Mois 3 ===
  '3-1': {
    type: 'anecdote',
    text: 'Chuck Norris a été un fervent supporter du Parti républicain. Il a notamment soutenu publiquement les candidatures de Mike Huckabee en 2008 et de Mitt Romney en 2012.',
    source: 'Biographie – Engagement politique',
  },
  '3-2': {
    type: 'fact',
    text: 'Le Big Bang est le résultat d\'un roundhouse kick de Chuck Norris.',
  },
  '3-3': {
    type: 'citation',
    text: 'Le silence est la meilleure réponse à un imbécile.',
    source: 'Silent Rage (1982)',
  },
  '3-4': {
    type: 'anecdote',
    text: 'Chuck Norris est devenu célèbre dans le monde entier grâce aux infopublicités Total Gym, dans lesquelles il faisait la promotion de cet appareil de musculation pendant les années 1990 et 2000.',
    source: 'Biographie – Total Gym',
  },
  '3-5': {
    type: 'fact',
    text: 'Chuck Norris peut tirer plus vite que son ombre.',
  },
  '3-6': {
    type: 'citation',
    text: 'Quand un homme donne sa parole, il n\'a pas besoin de contrat.',
    source: 'Firewalker (1986)',
  },
  '3-7': {
    type: 'anecdote',
    text: 'Avant de devenir acteur, Chuck Norris a été champion du monde de karaté. C\'est Steve McQueen, l\'un de ses élèves en arts martiaux, qui l\'a encouragé à se tourner vers le cinéma.',
    source: 'Biographie – Transition vers le cinéma',
  },
  '3-8': {
    type: 'fact',
    text: 'Chuck Norris a un jour avalé un paquet de graines. Il a planté une forêt.',
  },
  '3-9': {
    type: 'citation',
    text: 'On ne négocie pas avec le mal. On l\'élimine.',
    source: 'Missing in Action (1984)',
  },
  '3-10': {
    type: 'anecdote',
    text: 'Le premier film de Chuck Norris en tant qu\'acteur principal était Breaker! Breaker! (1977), un film d\'action à petit budget sur un camionneur. Malgré des critiques mitigées, le film a lancé sa carrière au cinéma.',
    source: 'Biographie – Premier rôle principal',
  },
  '3-11': {
    type: 'fact',
    text: 'Chuck Norris peut éteindre un feu avec de l\'essence.',
  },
  '3-12': {
    type: 'citation',
    text: 'Je ne demande pas la permission. Je donne un avertissement.',
    source: 'Invasion U.S.A. (1985)',
  },
  '3-13': {
    type: 'anecdote',
    text: 'Good Guys Wear Black (1978) a été le premier véritable succès commercial de Chuck Norris au cinéma, rapportant plus de 18 millions de dollars au box-office américain.',
    source: 'Biographie – Premier succès au cinéma',
  },
  '3-14': {
    type: 'fact',
    text: 'Quand Chuck Norris fait un don du sang, il refuse la seringue. Il demande un pistolet et un seau.',
  },
  '3-15': {
    type: 'citation',
    text: 'Les héros ne meurent jamais. Ils deviennent des légendes.',
    source: 'Hero and the Terror (1988)',
  },
  '3-16': {
    type: 'anecdote',
    text: 'Dans A Force of One (1979), Chuck Norris incarne un champion de karaté qui aide la police à résoudre des meurtres. Ce rôle a défini le modèle de ses futurs personnages : un justicier expert en arts martiaux.',
    source: 'Biographie – A Force of One',
  },
  '3-17': {
    type: 'fact',
    text: 'Chuck Norris ne ment jamais. La vérité se trompe.',
  },
  '3-18': {
    type: 'citation',
    text: 'Chaque homme a un prix. Le mien, personne ne peut se le permettre.',
    source: 'The Octagon (1980)',
  },
  '3-19': {
    type: 'anecdote',
    text: 'Chuck Norris a grandi à Wilson, en Oklahoma, puis à Torrance, en Californie, après le divorce de ses parents. Il décrit son enfance comme marquée par la timidité et un manque de confiance en soi.',
    source: 'Biographie – Jeunesse',
  },
  '3-20': {
    type: 'fact',
    text: 'Chuck Norris peut étrangler quelqu\'un avec un téléphone sans fil.',
  },
  '3-21': {
    type: 'citation',
    text: 'La peur n\'existe pas dans ce dojo.',
    source: 'Sidekicks (1992)',
  },
  '3-22': {
    type: 'anecdote',
    text: 'Le père de Chuck Norris, Ray Norris, était un mécanicien d\'origine irlandaise et cherokee. Son alcoolisme a conduit au divorce de ses parents quand Chuck était encore jeune.',
    source: 'Biographie – Origines familiales',
  },
  '3-23': {
    type: 'fact',
    text: 'Chuck Norris a un jour gagné un marathon. En reculant.',
  },
  '3-24': {
    type: 'citation',
    text: 'Je protège ceux qui ne peuvent pas se protéger eux-mêmes.',
    source: 'Walker, Texas Ranger (1997)',
  },
  '3-25': {
    type: 'anecdote',
    text: 'Chuck Norris a trois frères : Wieland (décédé au Vietnam en 1970), Aaron (également acteur) et un demi-frère. La mort de Wieland a profondément affecté Chuck et a influencé plusieurs de ses films sur le Vietnam.',
    source: 'Biographie – Frères',
  },
  '3-26': {
    type: 'fact',
    text: 'Les fantômes s\'assoient autour d\'un feu et racontent des histoires de Chuck Norris.',
  },
  '3-27': {
    type: 'citation',
    text: 'Quand je frappe, je ne préviens qu\'une fois.',
    source: 'Breaker! Breaker! (1977)',
  },
  '3-28': {
    type: 'anecdote',
    text: 'La mort de son frère Wieland au Vietnam en 1970 a été l\'une des motivations principales de Chuck Norris pour réaliser la trilogie Missing in Action, qui traite des prisonniers de guerre américains au Vietnam.',
    source: 'Biographie – Influence de la perte de son frère',
  },

  // === Mois 4 ===
  '4-1': {
    type: 'fact',
    text: 'Chuck Norris peut faire un tour du monde en restant immobile. C\'est la Terre qui tourne autour de lui.',
  },
  '4-2': {
    type: 'citation',
    text: 'Un combat ne se gagne pas avec les poings, mais avec le cœur.',
    source: 'A Force of One (1979)',
  },
  '4-3': {
    type: 'anecdote',
    text: 'En 1962, de retour aux États-Unis après son service en Corée, Chuck Norris a ouvert son premier dojo à Torrance, en Californie. Il enseignait le Tang Soo Do aux civils et aux policiers.',
    source: 'Biographie – Premier dojo',
  },
  '4-4': {
    type: 'fact',
    text: 'Quand Chuck Norris entre dans une pièce, il ne cherche pas la lumière. La lumière le cherche.',
  },
  '4-5': {
    type: 'citation',
    text: 'Les faibles abandonnent. Les forts se relèvent.',
    source: 'Good Guys Wear Black (1978)',
  },
  '4-6': {
    type: 'anecdote',
    text: 'Chuck Norris a été introduit au Martial Arts Hall of Fame en tant que « Fighter of the Year » et a reçu de nombreuses distinctions pour sa contribution aux arts martiaux à travers le monde.',
    source: 'Biographie – Hall of Fame',
  },
  '4-7': {
    type: 'fact',
    text: 'Chuck Norris ne lit pas les livres. Il les fixe jusqu\'à ce qu\'ils lui disent ce qu\'il veut savoir.',
  },
  '4-8': {
    type: 'citation',
    text: 'La mort ne me fait pas peur. C\'est moi qui fais peur à la mort.',
    source: 'The Expendables 2 (2012)',
  },
  '4-9': {
    type: 'anecdote',
    text: 'Chuck Norris a joué son propre rôle dans de nombreux épisodes de sitcoms et émissions télévisées, prouvant son sens de l\'humour et sa capacité à rire de sa propre légende.',
    source: 'Biographie – Apparitions TV humoristiques',
  },
  '4-10': {
    type: 'fact',
    text: 'Chuck Norris peut slam dunker sur un panier de basket. De football.',
  },
  '4-11': {
    type: 'citation',
    text: 'Je n\'ai jamais perdu un combat. J\'ai juste parfois choisi de ne pas gagner.',
    source: 'Lone Wolf McQuade (1983)',
  },
  '4-12': {
    type: 'anecdote',
    text: 'Le personnage de Cordell Walker dans Walker, Texas Ranger est un Ranger du Texas mi-cherokee, mi-irlandais, un clin d\'œil direct aux véritables origines de Chuck Norris.',
    source: 'Biographie – Walker et ses origines',
  },
  '4-13': {
    type: 'fact',
    text: 'Chuck Norris a une fois lancé une grenade et tué 50 personnes. Puis la grenade a explosé.',
  },
  '4-14': {
    type: 'citation',
    text: 'On juge un homme à ses actes, pas à ses paroles.',
    source: 'Code of Silence (1985)',
  },
  '4-15': {
    type: 'anecdote',
    text: 'Chuck Norris est un chrétien pratiquant. Sa foi joue un rôle central dans sa vie et il en parle ouvertement dans ses livres et interviews.',
    source: 'Biographie – Foi chrétienne',
  },
  '4-16': {
    type: 'fact',
    text: 'Internet n\'a pas été inventé pour que Chuck Norris puisse chercher. Chuck Norris a été inventé pour qu\'Internet puisse exister.',
  },
  '4-17': {
    type: 'citation',
    text: 'La trahison, ça ne pardonne pas.',
    source: 'Forced Vengeance (1982)',
  },
  '4-18': {
    type: 'anecdote',
    text: 'Delta Force (1986), avec Chuck Norris et Lee Marvin, est inspiré de l\'opération réelle de libération des otages du vol TWA 847 en 1985. Le film a été un succès international.',
    source: 'Biographie – Delta Force',
  },
  '4-19': {
    type: 'fact',
    text: 'Chuck Norris peut entendre le langage des signes.',
  },
  '4-20': {
    type: 'citation',
    text: 'Quand on défend la justice, on ne recule devant rien.',
    source: 'Walker, Texas Ranger (1999)',
  },
  '4-21': {
    type: 'anecdote',
    text: 'Missing in Action (1984) est le film qui a véritablement propulsé Chuck Norris au rang de star du cinéma d\'action. Le film a rapporté plus de 22 millions de dollars au box-office.',
    source: 'Biographie – Missing in Action',
  },
  '4-22': {
    type: 'fact',
    text: 'Le soleil porte des lunettes de soleil pour se protéger de Chuck Norris.',
  },
  '4-23': {
    type: 'citation',
    text: 'Je ne menace jamais. Je promets.',
    source: 'Braddock: Missing in Action III (1988)',
  },
  '4-24': {
    type: 'anecdote',
    text: 'Chuck Norris a été le premier Occidental à recevoir le grade de 8e dan de la Fédération mondiale de taekwondo, une reconnaissance exceptionnelle de sa maîtrise de cet art martial.',
    source: 'Biographie – Reconnaissance en taekwondo',
  },
  '4-25': {
    type: 'fact',
    text: 'Chuck Norris n\'a pas d\'ombre. Le mur refuse de se mettre derrière lui.',
  },
  '4-26': {
    type: 'citation',
    text: 'Le Texas est trop petit pour nous deux. Mais la tombe est assez grande pour toi.',
    source: 'Walker, Texas Ranger (2000)',
  },
  '4-27': {
    type: 'anecdote',
    text: 'La KickStart Foundation de Chuck Norris a aidé plus de 90 000 jeunes défavorisés depuis sa création. Le programme propose des cours d\'arts martiaux gratuits dans les écoles publiques du Texas.',
    source: 'Biographie – Impact de KickStart',
  },
  '4-28': {
    type: 'fact',
    text: 'Quand Chuck Norris nage dans l\'océan, il ne se mouille pas. C\'est l\'océan qui se Chuck-Norrise.',
  },

  // === Mois 5 ===
  '5-1': {
    type: 'citation',
    text: 'Le pardon est un luxe que les morts ne peuvent pas se permettre.',
    source: 'The Hitman (1991)',
  },
  '5-2': {
    type: 'anecdote',
    text: 'En 2005, le site web « Chuck Norris Facts » a explosé sur Internet, engendrant des millions de blagues absurdes. Chuck Norris a déclaré qu\'il trouvait la plupart de ces blagues hilarantes.',
    source: 'Biographie – Réaction aux faits Internet',
  },
  '5-3': {
    type: 'fact',
    text: 'Chuck Norris peut allumer un feu en frottant deux glaçons.',
  },
  '5-4': {
    type: 'citation',
    text: 'La douleur est temporaire. La victoire est éternelle.',
    source: 'Sidekicks (1992)',
  },
  '5-5': {
    type: 'anecdote',
    text: 'Chuck Norris a eu un premier mariage avec Dianne Holechek de 1958 à 1988. Ensemble, ils ont eu deux fils : Mike et Eric. Eric est devenu cascadeur et acteur.',
    source: 'Biographie – Premier mariage',
  },
  '5-6': {
    type: 'fact',
    text: 'Chuck Norris peut construire un bonhomme de neige avec de la pluie.',
  },
  '5-7': {
    type: 'citation',
    text: 'Ne me sous-estime pas. C\'est la dernière erreur que tu feras.',
    source: 'Hero and the Terror (1988)',
  },
  '5-8': {
    type: 'anecdote',
    text: 'Lone Wolf McQuade (1983) est souvent cité comme l\'un des meilleurs films de Chuck Norris. Ce western moderne, dans lequel il incarne un Texas Ranger solitaire, a directement inspiré la série Walker, Texas Ranger.',
    source: 'Biographie – Lone Wolf McQuade',
  },
  '5-9': {
    type: 'fact',
    text: 'Chuck Norris peut finir une boîte de Pringles sans renverser de miettes.',
  },
  '5-10': {
    type: 'citation',
    text: 'Ce n\'est pas la taille du combattant qui compte, c\'est la taille du combat dans le combattant.',
    source: 'Top Dog (1995)',
  },
  '5-11': {
    type: 'anecdote',
    text: 'Pendant le tournage de The Octagon (1980), Chuck Norris a réalisé la plupart de ses propres cascades, refusant l\'aide de doublures pour les scènes de combat.',
    source: 'Biographie – Cascades personnelles',
  },
  '5-12': {
    type: 'fact',
    text: 'Chuck Norris peut faire cuire des pâtes dans de l\'eau froide.',
  },
  '5-13': {
    type: 'citation',
    text: 'Celui qui s\'attaque aux innocents s\'attaque à moi.',
    source: 'Walker, Texas Ranger (1993)',
  },
  '5-14': {
    type: 'anecdote',
    text: 'Chuck Norris a été l\'un des premiers artistes martiaux occidentaux à recevoir une formation avancée en arts martiaux coréens. Il a étudié sous la tutelle du Grand Maître Shin Jae-chul.',
    source: 'Biographie – Formation en Corée',
  },
  '5-15': {
    type: 'fact',
    text: 'Chuck Norris peut fermer une porte tournante.',
  },
  '5-16': {
    type: 'citation',
    text: 'Quand quelqu\'un me dit que c\'est impossible, ça me motive encore plus.',
    source: 'Firewalker (1986)',
  },
  '5-17': {
    type: 'anecdote',
    text: 'Invasion U.S.A. (1985) est le film le plus rentable de la carrière de Chuck Norris des années 80. Il y incarne un ancien agent de la CIA qui affronte seul une invasion terroriste sur le sol américain.',
    source: 'Biographie – Invasion U.S.A.',
  },
  '5-18': {
    type: 'fact',
    text: 'Quand Chuck Norris joue à Tetris, les pièces s\'alignent toutes seules.',
  },
  '5-19': {
    type: 'citation',
    text: 'Il y a deux types de personnes dans ce monde : ceux qui ont peur de moi, et ceux qui devraient.',
    source: 'Silent Rage (1982)',
  },
  '5-20': {
    type: 'anecdote',
    text: 'Code of Silence (1985) est considéré par les critiques comme le meilleur film de la carrière de Chuck Norris d\'un point de vue cinématographique. Roger Ebert lui a donné 3 étoiles sur 4.',
    source: 'Biographie – Code of Silence',
  },
  '5-21': {
    type: 'fact',
    text: 'Chuck Norris peut parler en braille.',
  },
  '5-22': {
    type: 'citation',
    text: 'Je ne suis pas un homme de paroles. Je suis un homme d\'action.',
    source: 'Missing in Action (1984)',
  },
  '5-23': {
    type: 'anecdote',
    text: 'Chuck Norris a été stationné à la base aérienne de Osan pendant deux ans. Il y a appris le coréen et s\'est immergé dans la culture locale, ce qui a renforcé sa passion pour les arts martiaux.',
    source: 'Biographie – Vie en Corée du Sud',
  },
  '5-24': {
    type: 'fact',
    text: 'Quand Chuck Norris va chez le dentiste, c\'est le dentiste qui a peur d\'avoir mal.',
  },
  '5-25': {
    type: 'citation',
    text: 'La loyauté ne se divise pas. Elle est absolue.',
    source: 'Delta Force (1986)',
  },
  '5-26': {
    type: 'anecdote',
    text: 'Top Dog (1995) est un film atypique dans la filmographie de Chuck Norris : il y joue un policier associé à un chien policier. Le film vise un public plus familial que ses productions habituelles.',
    source: 'Biographie – Top Dog',
  },
  '5-27': {
    type: 'fact',
    text: 'Chuck Norris peut déverrouiller un iPhone avec son regard.',
  },
  '5-28': {
    type: 'citation',
    text: 'Un homme qui ne se bat pas pour ses convictions ne mérite pas de les avoir.',
    source: 'Good Guys Wear Black (1978)',
  },

  // === Mois 6 ===
  '6-1': {
    type: 'anecdote',
    text: 'Sidekicks (1992) est une comédie familiale dans laquelle un jeune garçon rêve d\'être le partenaire de Chuck Norris. Le film montre un côté plus léger et humoristique de Chuck.',
    source: 'Biographie – Sidekicks',
  },
  '6-2': {
    type: 'fact',
    text: 'Chuck Norris peut gagner au morpion en un seul coup.',
  },
  '6-3': {
    type: 'citation',
    text: 'Tu peux fuir, mais tu ne peux pas te cacher.',
    source: 'An Eye for an Eye (1981)',
  },
  '6-4': {
    type: 'anecdote',
    text: 'Pendant le tournage de Retour du Dragon, Bruce Lee et Chuck Norris ont répété leur scène de combat dans le Colisée pendant trois jours entiers pour la perfectionner.',
    source: 'Biographie – Répétitions avec Bruce Lee',
  },
  '6-5': {
    type: 'fact',
    text: 'Chuck Norris peut supprimer la corbeille de recyclage.',
  },
  '6-6': {
    type: 'citation',
    text: 'La miséricorde est pour ceux qui la méritent.',
    source: 'Braddock: Missing in Action III (1988)',
  },
  '6-7': {
    type: 'anecdote',
    text: 'Chuck Norris a été policier militaire dans l\'US Air Force avant de se consacrer entièrement aux arts martiaux. Cette expérience a nourri ses rôles de justicier au cinéma.',
    source: 'Biographie – Policier militaire',
  },
  '6-8': {
    type: 'fact',
    text: 'Chuck Norris a tué deux pierres d\'un coup.',
  },
  '6-9': {
    type: 'citation',
    text: 'La justice est aveugle. Mais moi, je vois très bien.',
    source: 'Walker, Texas Ranger (1995)',
  },
  '6-10': {
    type: 'anecdote',
    text: 'Firewalker (1986) est un film d\'aventure dans lequel Chuck Norris fait équipe avec Louis Gossett Jr. C\'est l\'un des rares films de Chuck à intégrer de l\'humour et du fantastique.',
    source: 'Biographie – Firewalker',
  },
  '6-11': {
    type: 'fact',
    text: 'Quand Chuck Norris regarde Méduse, c\'est Méduse qui se transforme en pierre.',
  },
  '6-12': {
    type: 'citation',
    text: 'Il n\'y a pas de problème qu\'un bon coup de pied ne peut résoudre.',
    source: 'Lone Wolf McQuade (1983)',
  },
  '6-13': {
    type: 'anecdote',
    text: 'The Hitman (1991) est un film d\'action dans lequel Chuck Norris incarne un policier laissé pour mort qui infiltre le crime organisé sous une nouvelle identité. C\'est l\'un de ses rôles les plus sombres.',
    source: 'Biographie – The Hitman',
  },
  '6-14': {
    type: 'fact',
    text: 'Chuck Norris peut faire un puzzle de 1000 pièces en une seule pièce.',
  },
  '6-15': {
    type: 'citation',
    text: 'Chaque cicatrice raconte une victoire.',
    source: 'The Octagon (1980)',
  },
  '6-16': {
    type: 'anecdote',
    text: 'Hero and the Terror (1988) est l\'un des films les plus inhabituels de Chuck Norris. Il y joue un policier qui traque un tueur en série, avec beaucoup moins de scènes d\'action que dans ses autres films.',
    source: 'Biographie – Hero and the Terror',
  },
  '6-17': {
    type: 'fact',
    text: 'Chuck Norris a déjà battu le soleil dans un concours de bronzage.',
  },
  '6-18': {
    type: 'citation',
    text: 'La différence entre un héros et un lâche, c\'est un pas en avant.',
    source: 'Forced Vengeance (1982)',
  },
  '6-19': {
    type: 'anecdote',
    text: 'Silent Rage (1982) est un mélange unique d\'arts martiaux et d\'horreur. Chuck Norris y affronte un tueur devenu invulnérable grâce à un sérum expérimental. Le film est parfois surnommé « Chuck Norris vs Michael Myers ».',
    source: 'Biographie – Silent Rage',
  },
  '6-20': {
    type: 'fact',
    text: 'Chuck Norris peut envoyer un texto avec un four à micro-ondes.',
  },
  '6-21': {
    type: 'citation',
    text: 'Je ne recule jamais. Le monde recule devant moi.',
    source: 'Invasion U.S.A. (1985)',
  },
  '6-22': {
    type: 'anecdote',
    text: 'Chuck Norris a étudié le jiu-jitsu brésilien sous les frères Machado et a obtenu une ceinture noire dans cette discipline, ajoutant une autre corde à son arc martial.',
    source: 'Biographie – Jiu-jitsu brésilien',
  },
  '6-23': {
    type: 'fact',
    text: 'Quand Chuck Norris utilise un code de triche dans un jeu vidéo, le jeu s\'excuse.',
  },
  '6-24': {
    type: 'citation',
    text: 'Mourir debout vaut mieux que vivre à genoux.',
    source: 'Missing in Action 2: The Beginning (1985)',
  },
  '6-25': {
    type: 'anecdote',
    text: 'Chuck Norris a fondé la United Fighting Arts Federation (UFAF), une organisation internationale dédiée à la promotion du Chun Kuk Do et des arts martiaux en général.',
    source: 'Biographie – UFAF',
  },
  '6-26': {
    type: 'fact',
    text: 'Chuck Norris n\'a pas de télécommande. La télé change de chaîne quand il lui demande.',
  },
  '6-27': {
    type: 'citation',
    text: 'L\'honneur ne se négocie pas.',
    source: 'Top Dog (1995)',
  },
  '6-28': {
    type: 'anecdote',
    text: 'Forced Vengeance (1982) se déroule à Hong Kong et montre Chuck Norris dans un rôle de videur de casino qui se retrouve mêlé à une guerre des gangs. Le film rend hommage aux films d\'arts martiaux hongkongais.',
    source: 'Biographie – Forced Vengeance',
  },

  // === Mois 7 ===
  '7-1': {
    type: 'fact',
    text: 'Chuck Norris peut garer un avion dans un garage.',
  },
  '7-2': {
    type: 'citation',
    text: 'Le respect, ça se gagne. La crainte, ça se donne.',
    source: 'Walker, Texas Ranger (1996)',
  },
  '7-3': {
    type: 'anecdote',
    text: 'An Eye for an Eye (1981) est un thriller d\'action dans lequel Chuck Norris incarne un policier de San Francisco qui traque les trafiquants de drogue responsables de la mort de son partenaire.',
    source: 'Biographie – An Eye for an Eye',
  },
  '7-4': {
    type: 'fact',
    text: 'Les pangolins portent une armure pour se protéger de Chuck Norris.',
  },
  '7-5': {
    type: 'citation',
    text: 'Dans ce monde, il faut être dur pour survivre.',
    source: 'Breaker! Breaker! (1977)',
  },
  '7-6': {
    type: 'anecdote',
    text: 'En 1997, Chuck Norris a reçu le Veteran of the Year Award de la part de l\'US Air Force pour ses services rendus à la nation et son soutien constant aux vétérans.',
    source: 'Biographie – Vétéran de l\'année',
  },
  '7-7': {
    type: 'fact',
    text: 'Chuck Norris peut courir si vite qu\'il peut se rattraper lui-même.',
  },
  '7-8': {
    type: 'citation',
    text: 'Quand je ferme les yeux, je ne dors pas. Je me repose pour la prochaine bataille.',
    source: 'Delta Force (1986)',
  },
  '7-9': {
    type: 'anecdote',
    text: 'Le ranch de Chuck Norris au Texas s\'appelle « Lone Wolf Ranch ». Il y vit avec sa femme Gena et y pratique quotidiennement les arts martiaux et l\'entraînement physique.',
    source: 'Biographie – Le ranch texan',
  },
  '7-10': {
    type: 'fact',
    text: 'Quand Chuck Norris saute dans l\'eau, il ne se mouille pas. C\'est l\'eau qui se Chuck-Norrise.',
  },
  '7-11': {
    type: 'citation',
    text: 'La route de la justice est longue, mais j\'ai tout mon temps.',
    source: 'Walker, Texas Ranger (1994)',
  },
  '7-12': {
    type: 'anecdote',
    text: 'Chuck Norris a écrit plusieurs livres, dont « The Secret of Inner Strength » (1988), dans lequel il partage sa philosophie de vie et ses techniques d\'arts martiaux.',
    source: 'Biographie – Auteur',
  },
  '7-13': {
    type: 'fact',
    text: 'Chuck Norris peut laisser un message vocal avant le bip.',
  },
  '7-14': {
    type: 'citation',
    text: 'Personne ne décide de mon destin à part moi.',
    source: 'The Hitman (1991)',
  },
  '7-15': {
    type: 'anecdote',
    text: 'Chuck Norris est un grand fan de football américain. Il est un supporter des Dallas Cowboys et a assisté à de nombreux matchs de l\'équipe au Texas Stadium.',
    source: 'Biographie – Passions sportives',
  },
  '7-16': {
    type: 'fact',
    text: 'Chuck Norris peut faire des ricochets avec une boule de bowling.',
  },
  '7-17': {
    type: 'citation',
    text: 'La violence n\'est jamais la solution. Sauf quand c\'est la seule.',
    source: 'Hero and the Terror (1988)',
  },
  '7-18': {
    type: 'anecdote',
    text: 'Le fils de Chuck Norris, Eric Norris, est devenu cascadeur professionnel à Hollywood. Il a travaillé sur plusieurs films de son père et est considéré comme l\'un des meilleurs cascadeurs de l\'industrie.',
    source: 'Biographie – Fils cascadeur',
  },
  '7-19': {
    type: 'fact',
    text: 'Chuck Norris n\'utilise pas de réveil. Il lève le soleil quand il est prêt.',
  },
  '7-20': {
    type: 'citation',
    text: 'Tu sais ce qui est pire que la mort ? Vivre sans liberté.',
    source: 'Braddock: Missing in Action III (1988)',
  },
  '7-21': {
    type: 'anecdote',
    text: 'Chuck Norris a été entraîneur personnel de plusieurs célébrités et politiciens. Il a notamment entraîné Steve McQueen, qui est devenu l\'un de ses amis les plus proches.',
    source: 'Biographie – Entraîneur des stars',
  },
  '7-22': {
    type: 'fact',
    text: 'Chuck Norris peut manger des Lego sans marcher dessus.',
  },
  '7-23': {
    type: 'citation',
    text: 'La patience est une vertu. L\'impatience est un style de combat.',
    source: 'The Octagon (1980)',
  },
  '7-24': {
    type: 'anecdote',
    text: 'Lors du tournage de The Expendables 2 (2012), Chuck Norris a fait une apparition mémorable aux côtés de Sylvester Stallone, Arnold Schwarzenegger et Bruce Willis. Il avait 72 ans et faisait encore ses propres scènes de combat.',
    source: 'Biographie – The Expendables 2',
  },
  '7-25': {
    type: 'fact',
    text: 'Chuck Norris peut faire des crêpes avec une poêle carrée.',
  },
  '7-26': {
    type: 'citation',
    text: 'Quand la loi échoue, les hommes de bien prennent le relais.',
    source: 'Code of Silence (1985)',
  },
  '7-27': {
    type: 'anecdote',
    text: 'Chuck Norris a participé à des dizaines de championnats de karaté avant de devenir acteur. Son palmarès comprend 183 victoires, 10 défaites et 2 matchs nuls en compétition.',
    source: 'Biographie – Palmarès en compétition',
  },
  '7-28': {
    type: 'fact',
    text: 'Quand Chuck Norris fait une recherche Google, Google dit : « Oui, monsieur. »',
  },

  // === Mois 8 ===
  '8-1': {
    type: 'citation',
    text: 'Il ne faut pas chercher la bagarre. Il faut la trouver.',
    source: 'Sidekicks (1992)',
  },
  '8-2': {
    type: 'anecdote',
    text: 'Chuck Norris a été nommé « plus grand Texan de tous les temps » par un sondage du Texas Monthly, devant des personnalités comme Lyndon B. Johnson et Sam Houston.',
    source: 'Biographie – Plus grand Texan',
  },
  '8-3': {
    type: 'fact',
    text: 'Chuck Norris peut faire un nœud dans un spaghetti cuit.',
  },
  '8-4': {
    type: 'citation',
    text: 'Quand tu tombes, relève-toi. Quand tu ne peux plus te relever, rampe.',
    source: 'A Force of One (1979)',
  },
  '8-5': {
    type: 'anecdote',
    text: 'Le « roundhouse kick » (coup de pied circulaire) est devenu la signature de Chuck Norris au cinéma. Dans Walker, Texas Ranger, il en exécute en moyenne trois par épisode.',
    source: 'Biographie – Le roundhouse kick',
  },
  '8-6': {
    type: 'fact',
    text: 'Chuck Norris peut jongler avec des poissons vivants.',
  },
  '8-7': {
    type: 'citation',
    text: 'Le combat est terminé quand je dis qu\'il est terminé.',
    source: 'Firewalker (1986)',
  },
  '8-8': {
    type: 'anecdote',
    text: 'Pendant le tournage de Walker, Texas Ranger, Chuck Norris s\'entraînait tous les matins à 5h avant de se rendre sur le plateau. Sa discipline légendaire impressionnait toute l\'équipe de production.',
    source: 'Biographie – Discipline sur le plateau',
  },
  '8-9': {
    type: 'fact',
    text: 'Chuck Norris ne bronze pas. Le soleil essaie juste de lui ressembler.',
  },
  '8-10': {
    type: 'citation',
    text: 'La pitié est un luxe que je ne peux pas me permettre.',
    source: 'Missing in Action (1984)',
  },
  '8-11': {
    type: 'anecdote',
    text: 'Chuck Norris a un frère, Aaron Norris, qui est réalisateur. Aaron a réalisé plusieurs films de Chuck, notamment Braddock: Missing in Action III et Delta Force 2.',
    source: 'Biographie – Aaron Norris, réalisateur',
  },
  '8-12': {
    type: 'fact',
    text: 'Chuck Norris peut écraser un diamant avec son pouce.',
  },
  '8-13': {
    type: 'citation',
    text: 'Je ne cherche pas la violence. C\'est elle qui me trouve.',
    source: 'Silent Rage (1982)',
  },
  '8-14': {
    type: 'anecdote',
    text: 'Chuck Norris a été consultant en arts martiaux pour plusieurs productions hollywoodiennes, partageant son expertise du combat à mains nues avec les réalisateurs et les acteurs.',
    source: 'Biographie – Consultant en arts martiaux',
  },
  '8-15': {
    type: 'fact',
    text: 'Chuck Norris peut servir un petit-déjeuner au lit à quelqu\'un qui vit dans un studio.',
  },
  '8-16': {
    type: 'citation',
    text: 'Un vrai combattant ne connaît pas la défaite. Il connaît l\'apprentissage.',
    source: 'Walker, Texas Ranger (1997)',
  },
  '8-17': {
    type: 'anecdote',
    text: 'La mère de Chuck Norris, Wilma, était d\'origine irlandaise et anglaise. Elle a élevé seule ses trois fils après le départ de leur père et a toujours encouragé Chuck dans ses passions.',
    source: 'Biographie – Mère courage',
  },
  '8-18': {
    type: 'fact',
    text: 'Quand Chuck Norris fait un puzzle, toutes les pièces se mettent en place par peur.',
  },
  '8-19': {
    type: 'citation',
    text: 'L\'ennemi de mon ennemi est... aussi mon ennemi.',
    source: 'Invasion U.S.A. (1985)',
  },
  '8-20': {
    type: 'anecdote',
    text: 'En 2017, Chuck Norris a poursuivi plusieurs sociétés pharmaceutiques, affirmant que sa femme Gena avait subi des dommages de santé à cause d\'un agent de contraste utilisé lors d\'une IRM.',
    source: 'Biographie – Combat personnel',
  },
  '8-21': {
    type: 'fact',
    text: 'Les requins n\'osent pas nager quand Chuck Norris est à la plage.',
  },
  '8-22': {
    type: 'citation',
    text: 'Tu crois que c\'est un jeu ? Moi, je ne joue jamais.',
    source: 'The Expendables 2 (2012)',
  },
  '8-23': {
    type: 'anecdote',
    text: 'Chuck Norris est un descendant en partie cherokee par son père. Il est fier de ses racines amérindiennes et les a souvent intégrées dans ses personnages, notamment Cordell Walker.',
    source: 'Biographie – Origines cherokees',
  },
  '8-24': {
    type: 'fact',
    text: 'Chuck Norris a compté l\'intégralité du nombre pi.',
  },
  '8-25': {
    type: 'citation',
    text: 'Tant qu\'il y a de la vie, il y a du combat.',
    source: 'Forced Vengeance (1982)',
  },
  '8-26': {
    type: 'anecdote',
    text: 'Le personnage de Walker est connu pour sa barbe rousse emblématique. En réalité, Chuck Norris a commencé à porter la barbe dans les années 1970 et ne s\'en est plus jamais séparé.',
    source: 'Biographie – La barbe iconique',
  },
  '8-27': {
    type: 'fact',
    text: 'Chuck Norris peut coudre un bouton avec un marteau.',
  },
  '8-28': {
    type: 'citation',
    text: 'Si tu n\'as pas de plan, tu fais partie du plan de quelqu\'un d\'autre.',
    source: 'Good Guys Wear Black (1978)',
  },

  // === Mois 9 ===
  '9-1': {
    type: 'anecdote',
    text: 'Dans Walker, Texas Ranger, la scène d\'introduction emblématique montrant Chuck Norris marchant avec son Stetson et sa barbe est devenue l\'une des plus parodiées de l\'histoire de la télévision.',
    source: 'Biographie – Intro de Walker',
  },
  '9-2': {
    type: 'fact',
    text: 'Chuck Norris peut courir autour du monde et se frapper dans le dos.',
  },
  '9-3': {
    type: 'citation',
    text: 'La loi protège les innocents. Moi, je punis les coupables.',
    source: 'An Eye for an Eye (1981)',
  },
  '9-4': {
    type: 'anecdote',
    text: 'Chuck Norris a participé à un épisode spécial de « Yes, Dear » sur CBS en 2005, jouant son propre rôle avec humour et autodérision. L\'épisode a marqué le début de sa seconde vie médiatique.',
    source: 'Biographie – Autodérision à la télévision',
  },
  '9-5': {
    type: 'fact',
    text: 'Chuck Norris peut charger son téléphone en le regardant fixement.',
  },
  '9-6': {
    type: 'citation',
    text: 'On ne devient pas un guerrier en un jour. On naît guerrier.',
    source: 'The Hitman (1991)',
  },
  '9-7': {
    type: 'anecdote',
    text: 'Le premier tournoi de karaté que Chuck Norris a gagné en tant que professionnel était le All-American Grand Championship de 1967. Cette victoire a lancé sa série de six titres consécutifs.',
    source: 'Biographie – Premier titre professionnel',
  },
  '9-8': {
    type: 'fact',
    text: 'Chuck Norris peut attraper un poisson avec un téléphone fixe.',
  },
  '9-9': {
    type: 'citation',
    text: 'Le destin ne frappe pas à la porte. Il la défonce.',
    source: 'Hero and the Terror (1988)',
  },
  '9-10': {
    type: 'anecdote',
    text: 'En 2006, Chuck Norris a lancé sa propre marque d\'eau embouteillée nommée « CForce Water », tirée d\'un aquifère situé sous son ranch texan.',
    source: 'Biographie – CForce Water',
  },
  '9-11': {
    type: 'fact',
    text: 'Chuck Norris peut faire démarrer une voiture en la regardant sous le capot.',
  },
  '9-12': {
    type: 'citation',
    text: 'Il y a le bien, il y a le mal, et il y a moi.',
    source: 'Walker, Texas Ranger (1998)',
  },
  '9-13': {
    type: 'anecdote',
    text: 'Chuck Norris a reçu le grade de commandeur de l\'ordre militaire des Forces armées du Brésil, en reconnaissance de son influence internationale dans le domaine des arts martiaux.',
    source: 'Biographie – Honneur brésilien',
  },
  '9-14': {
    type: 'fact',
    text: 'Quand Chuck Norris fait un barbecue, les voisins déménagent de joie.',
  },
  '9-15': {
    type: 'citation',
    text: 'La vengeance est un plat qui se sert avec un roundhouse kick.',
    source: 'Braddock: Missing in Action III (1988)',
  },
  '9-16': {
    type: 'anecdote',
    text: 'Chuck Norris a été présentateur pour les cérémonies de remise de diplômes de West Point et d\'autres académies militaires américaines, témoignant du respect que lui portent les forces armées.',
    source: 'Biographie – Liens avec l\'armée',
  },
  '9-17': {
    type: 'fact',
    text: 'Chuck Norris peut tricoter un pull avec des spaghettis.',
  },
  '9-18': {
    type: 'citation',
    text: 'Avant de me juger, assure-toi d\'être irréprochable.',
    source: 'Code of Silence (1985)',
  },
  '9-19': {
    type: 'anecdote',
    text: 'La série Walker, Texas Ranger a été diffusée dans plus de 100 pays à travers le monde, faisant de Chuck Norris l\'un des acteurs américains les plus reconnus à l\'international.',
    source: 'Biographie – Succès international de Walker',
  },
  '9-20': {
    type: 'fact',
    text: 'Chuck Norris a une fois mordu un serpent. Après trois jours d\'agonie, le serpent est mort.',
  },
  '9-21': {
    type: 'citation',
    text: 'Le silence avant la tempête est mon moment préféré.',
    source: 'Lone Wolf McQuade (1983)',
  },
  '9-22': {
    type: 'anecdote',
    text: 'Quand Bruce Lee est mort en 1973, Chuck Norris était l\'un des porteurs du cercueil. Les deux hommes entretenaient un profond respect mutuel malgré leur rivalité à l\'écran.',
    source: 'Biographie – Funérailles de Bruce Lee',
  },
  '9-23': {
    type: 'fact',
    text: 'Chuck Norris peut tondre sa pelouse en regardant l\'herbe sévèrement.',
  },
  '9-24': {
    type: 'citation',
    text: 'Quand je donne ma parole, c\'est un pacte de sang.',
    source: 'Firewalker (1986)',
  },
  '9-25': {
    type: 'anecdote',
    text: 'Le livre « The Official Chuck Norris Fact Book » a été publié en 2009 avec la participation de Chuck Norris lui-même. Il y commente 101 de ses faits préférés et partage des anecdotes personnelles.',
    source: 'Biographie – Livre de faits',
  },
  '9-26': {
    type: 'fact',
    text: 'Chuck Norris peut se noyer sur la terre ferme.',
  },
  '9-27': {
    type: 'citation',
    text: 'Je ne cherche pas les ennuis. Mais quand ils viennent à moi, je leur souhaite bonne chance.',
    source: 'The Octagon (1980)',
  },
  '9-28': {
    type: 'anecdote',
    text: 'Chuck Norris a contribué à populariser les arts martiaux aux États-Unis dans les années 1960 et 1970. Avant lui, le karaté était peu connu du grand public américain.',
    source: 'Biographie – Popularisation des arts martiaux',
  },

  // === Mois 10 ===
  '10-1': {
    type: 'fact',
    text: 'Chuck Norris peut soulever Thor avec le marteau.',
  },
  '10-2': {
    type: 'citation',
    text: 'Les morts ne parlent pas. Les vivants feraient mieux de s\'en souvenir.',
    source: 'Missing in Action (1984)',
  },
  '10-3': {
    type: 'anecdote',
    text: 'Chuck Norris a été ceinture noire sous l\'enseignement du Grand Maître Jae Chul Shin à Seoul. Il considère Shin comme l\'un des plus grands maîtres d\'arts martiaux qu\'il ait jamais rencontrés.',
    source: 'Biographie – Maître Jae Chul Shin',
  },
  '10-4': {
    type: 'fact',
    text: 'Quand Chuck Norris plonge dans une piscine, il ne se mouille pas, il mouille la piscine.',
  },
  '10-5': {
    type: 'citation',
    text: 'Dans mon monde, il n\'y a pas de seconde chance. Il n\'y a que la première.',
    source: 'Delta Force (1986)',
  },
  '10-6': {
    type: 'anecdote',
    text: 'Malgré une carrière de plus de 40 films, Chuck Norris n\'a jamais reçu de nomination aux Oscars ou aux Golden Globes. Mais il a reçu de nombreux prix honorifiques pour sa contribution aux arts martiaux.',
    source: 'Biographie – Carrière sans Oscar',
  },
  '10-7': {
    type: 'fact',
    text: 'Chuck Norris peut lire un livre fermé.',
  },
  '10-8': {
    type: 'citation',
    text: 'La vraie force ne vient pas des muscles. Elle vient de l\'esprit.',
    source: 'Sidekicks (1992)',
  },
  '10-9': {
    type: 'anecdote',
    text: 'Chuck Norris a reçu le titre de « Fighter of the Decade » (combattant de la décennie) par le magazine Black Belt, couvrant les années 1960-1970.',
    source: 'Biographie – Combattant de la décennie',
  },
  '10-10': {
    type: 'fact',
    text: 'Chuck Norris a résolu un Rubik\'s Cube en un seul mouvement.',
  },
  '10-11': {
    type: 'citation',
    text: 'La nuit est longue pour ceux qui ont mauvaise conscience.',
    source: 'Walker, Texas Ranger (2000)',
  },
  '10-12': {
    type: 'anecdote',
    text: 'La philosophie du Chun Kuk Do de Chuck Norris repose sur dix commandements, parmi lesquels : « Je développerai la connaissance de moi-même » et « Je chercherai toujours à m\'améliorer ».',
    source: 'Biographie – Philosophie du Chun Kuk Do',
  },
  '10-13': {
    type: 'fact',
    text: 'Chuck Norris peut peigner un chauve.',
  },
  '10-14': {
    type: 'citation',
    text: 'Je suis la dernière chose que tu verras avant de fermer les yeux pour toujours.',
    source: 'The Hitman (1991)',
  },
  '10-15': {
    type: 'anecdote',
    text: 'Chuck Norris a tourné un film par an entre 1977 et 1994, une cadence impressionnante qui témoigne de son éthique de travail et de sa popularité auprès des producteurs.',
    source: 'Biographie – Rythme de tournage',
  },
  '10-16': {
    type: 'fact',
    text: 'Quand Chuck Norris joue à pierre-feuille-ciseaux, il gagne toujours. Avec le poing.',
  },
  '10-17': {
    type: 'citation',
    text: 'Rien n\'est impossible pour celui qui n\'abandonne jamais.',
    source: 'A Force of One (1979)',
  },
  '10-18': {
    type: 'anecdote',
    text: 'Chuck Norris a ouvert un total de 32 dojos à travers la Californie dans les années 1960 et 1970 avant de se consacrer entièrement au cinéma.',
    source: 'Biographie – Chaîne de dojos',
  },
  '10-19': {
    type: 'fact',
    text: 'Chuck Norris peut faire bouillir de l\'eau rien qu\'en la fixant.',
  },
  '10-20': {
    type: 'citation',
    text: 'Tu as choisi le mauvais camp. Et maintenant, tu vas en payer le prix.',
    source: 'Invasion U.S.A. (1985)',
  },
  '10-21': {
    type: 'anecdote',
    text: 'En 2010, le président du Turkménistan a remis à Chuck Norris une médaille d\'honneur pour sa contribution à la promotion des arts martiaux à travers le monde.',
    source: 'Biographie – Médaille du Turkménistan',
  },
  '10-22': {
    type: 'fact',
    text: 'Chuck Norris n\'a jamais eu de calcul rénal. Les pierres n\'oseraient pas.',
  },
  '10-23': {
    type: 'citation',
    text: 'La confiance ne se donne pas, elle se prouve.',
    source: 'Breaker! Breaker! (1977)',
  },
  '10-24': {
    type: 'anecdote',
    text: 'Chuck Norris a servi d\'inspiration pour le personnage de « Segata Sanshiro » dans les publicités japonaises de Sega Saturn, un personnage d\'arts martiaux tout aussi excessif que les faits Chuck Norris.',
    source: 'Biographie – Influence culturelle au Japon',
  },
  '10-25': {
    type: 'fact',
    text: 'Quand Chuck Norris passe au contrôle de sécurité à l\'aéroport, c\'est l\'aéroport qui est scanné.',
  },
  '10-26': {
    type: 'citation',
    text: 'Je ne cours pas après la gloire. La gloire court après moi.',
    source: 'Hero and the Terror (1988)',
  },
  '10-27': {
    type: 'anecdote',
    text: 'Chuck Norris a été producteur exécutif de Walker, Texas Ranger. Ce rôle lui permettait de contrôler l\'orientation de la série et d\'y intégrer ses valeurs morales et patriotiques.',
    source: 'Biographie – Producteur de Walker',
  },
  '10-28': {
    type: 'fact',
    text: 'Chuck Norris peut faxer un coup de poing.',
  },

  // === Mois 11 ===
  '11-1': {
    type: 'citation',
    text: 'Quand la tempête arrive, je suis le rocher sur lequel elle se brise.',
    source: 'Silent Rage (1982)',
  },
  '11-2': {
    type: 'anecdote',
    text: 'Chuck Norris suit un régime alimentaire strict depuis des décennies. Il attribue sa longévité et sa forme physique à son alimentation saine et à son entraînement quotidien.',
    source: 'Biographie – Régime alimentaire',
  },
  '11-3': {
    type: 'fact',
    text: 'Chuck Norris peut trouver la fin d\'un cercle.',
  },
  '11-4': {
    type: 'citation',
    text: 'Chaque ennemi vaincu est une leçon apprise.',
    source: 'Forced Vengeance (1982)',
  },
  '11-5': {
    type: 'anecdote',
    text: 'Le Chun Kuk Do de Chuck Norris comprend des techniques de combat à mains nues, d\'armes traditionnelles et de self-défense. Plus de 3 000 pratiquants sont certifiés dans le monde.',
    source: 'Biographie – Pratiquants du Chun Kuk Do',
  },
  '11-6': {
    type: 'fact',
    text: 'Quand Chuck Norris entre dans l\'eau, il ne flotte pas. L\'eau le porte.',
  },
  '11-7': {
    type: 'citation',
    text: 'Les cicatrices ne font pas mal. Elles rappellent qu\'on a survécu.',
    source: 'Good Guys Wear Black (1978)',
  },
  '11-8': {
    type: 'anecdote',
    text: 'En 2012, Chuck Norris a fait la une des journaux en soutenant publiquement Mitt Romney pour la présidence des États-Unis, enregistrant des vidéos de soutien avec sa femme Gena.',
    source: 'Biographie – Soutien à Romney',
  },
  '11-9': {
    type: 'fact',
    text: 'Chuck Norris peut peindre un tableau dans le noir. Et il est réaliste.',
  },
  '11-10': {
    type: 'citation',
    text: 'Le temps ne guérit rien. C\'est la vengeance qui guérit.',
    source: 'Missing in Action 2: The Beginning (1985)',
  },
  '11-11': {
    type: 'anecdote',
    text: 'Chuck Norris a été le premier Américain de l\'histoire du Tang Soo Do à avoir reçu un titre de Grand Maître honoraire de la part de l\'organisation internationale de cet art martial.',
    source: 'Biographie – Grand Maître honoraire',
  },
  '11-12': {
    type: 'fact',
    text: 'Chuck Norris n\'a pas besoin de Wi-Fi. Internet se connecte directement à lui.',
  },
  '11-13': {
    type: 'citation',
    text: 'L\'obscurité ne me cache pas. Elle me révèle.',
    source: 'Top Dog (1995)',
  },
  '11-14': {
    type: 'anecdote',
    text: 'En 2017, Chuck Norris a mis sa carrière entre parenthèses pour s\'occuper de sa femme Gena, qui souffrait de problèmes de santé. Il a déclaré : « Gena est plus importante que ma carrière. »',
    source: 'Biographie – Dévouement à sa femme',
  },
  '11-15': {
    type: 'fact',
    text: 'Chuck Norris peut marcher sur l\'eau. Même l\'eau congelée n\'oserait pas se briser sous ses pieds.',
  },
  '11-16': {
    type: 'citation',
    text: 'Les erreurs du passé forgent le guerrier de demain.',
    source: 'Walker, Texas Ranger (1999)',
  },
  '11-17': {
    type: 'anecdote',
    text: 'Parmi les élèves célèbres de Chuck Norris, on compte les frères Machado, grands maîtres de jiu-jitsu brésilien, avec qui il a développé une relation d\'échange mutuel de techniques.',
    source: 'Biographie – Échange avec les Machado',
  },
  '11-18': {
    type: 'fact',
    text: 'Quand Chuck Norris va à la poste, le facteur tremble.',
  },
  '11-19': {
    type: 'citation',
    text: 'Le danger est mon quotidien. Le repos est mon exception.',
    source: 'Delta Force (1986)',
  },
  '11-20': {
    type: 'anecdote',
    text: 'Chuck Norris a écrit une chronique hebdomadaire pour le site WND (WorldNetDaily) pendant plusieurs années, dans laquelle il exprimait ses opinions politiques conservatrices et ses réflexions personnelles.',
    source: 'Biographie – Chroniqueur',
  },
  '11-21': {
    type: 'fact',
    text: 'Chuck Norris peut faire le ménage dans une maison hantée.',
  },
  '11-22': {
    type: 'citation',
    text: 'Il n\'y a pas de chemin vers la victoire. La victoire est le chemin.',
    source: 'The Octagon (1980)',
  },
  '11-23': {
    type: 'anecdote',
    text: 'La mère de Chuck Norris, Wilma, est décédée en 2019 à l\'âge de 99 ans. Chuck a toujours dit qu\'elle était la personne la plus forte qu\'il ait jamais connue.',
    source: 'Biographie – Hommage à sa mère',
  },
  '11-24': {
    type: 'fact',
    text: 'Chuck Norris peut éternuer les yeux ouverts.',
  },
  '11-25': {
    type: 'citation',
    text: 'La solitude ne me dérange pas. C\'est la compagnie des traîtres qui me dérange.',
    source: 'Lone Wolf McQuade (1983)',
  },
  '11-26': {
    type: 'anecdote',
    text: 'Le personnage de Walker est inspiré à la fois des vrais Texas Rangers et de la personnalité de Chuck Norris. Comme Walker, Chuck est un homme de peu de mots qui laisse ses actions parler.',
    source: 'Biographie – Similarité avec Walker',
  },
  '11-27': {
    type: 'fact',
    text: 'La pluie ne mouille pas Chuck Norris. Chuck Norris mouille la pluie.',
  },
  '11-28': {
    type: 'citation',
    text: 'Le combat n\'est pas une option. C\'est une obligation.',
    source: 'An Eye for an Eye (1981)',
  },

  // === Mois 12 ===
  '12-1': {
    type: 'anecdote',
    text: 'Chuck Norris est un passionné de chevaux. Sur son ranch texan, il possède plusieurs pur-sangs et pratique régulièrement l\'équitation, une passion qu\'il partage avec son personnage de Walker.',
    source: 'Biographie – Passion pour les chevaux',
  },
  '12-2': {
    type: 'fact',
    text: 'Chuck Norris peut courir tellement vite qu\'il rattrape hier.',
  },
  '12-3': {
    type: 'citation',
    text: 'Je ne fais pas de promesses. Je fais des garanties.',
    source: 'Walker, Texas Ranger (1994)',
  },
  '12-4': {
    type: 'anecdote',
    text: 'Le surnom « Chuck » lui a été donné par un camarade de l\'Air Force. Son vrai prénom, Carlos, vient d\'un ministre de l\'église qui assistait sa mère.',
    source: 'Biographie – Origine du surnom Chuck',
  },
  '12-5': {
    type: 'fact',
    text: 'Chuck Norris peut compter les couleurs de l\'arc-en-ciel. Il en trouve huit.',
  },
  '12-6': {
    type: 'citation',
    text: 'Les murs ne m\'arrêtent pas. Je passe à travers.',
    source: 'Braddock: Missing in Action III (1988)',
  },
  '12-7': {
    type: 'anecdote',
    text: 'Lors de son service militaire, Chuck Norris a servi comme policier militaire (AP – Air Police) à la base aérienne d\'Osan, en Corée du Sud, entre 1958 et 1962.',
    source: 'Biographie – Service à Osan',
  },
  '12-8': {
    type: 'fact',
    text: 'Chuck Norris peut manger des somnifères et ne pas s\'endormir.',
  },
  '12-9': {
    type: 'citation',
    text: 'Le plus dangereux des animaux n\'est pas le lion. C\'est l\'homme qui n\'a rien à perdre.',
    source: 'Code of Silence (1985)',
  },
  '12-10': {
    type: 'anecdote',
    text: 'Chuck Norris avait 32 ans quand il a commencé sa carrière d\'acteur, ce qui est considéré comme tardif à Hollywood. Pourtant, il a réussi à construire une filmographie de plus de 40 longs-métrages.',
    source: 'Biographie – Début tardif au cinéma',
  },
  '12-11': {
    type: 'fact',
    text: 'Chuck Norris n\'appelle pas un mauvais numéro. Tu décroches au mauvais moment.',
  },
  '12-12': {
    type: 'citation',
    text: 'La paix est un privilège. Je me bats pour le défendre.',
    source: 'Firewalker (1986)',
  },
  '12-13': {
    type: 'anecdote',
    text: 'Chuck Norris est un grand philanthrope. En plus de la KickStart Foundation, il a soutenu de nombreuses œuvres caritatives liées aux vétérans, aux enfants malades et aux communautés défavorisées.',
    source: 'Biographie – Philanthropie',
  },
  '12-14': {
    type: 'fact',
    text: 'Quand Chuck Norris regarde une montre, la montre accélère.',
  },
  '12-15': {
    type: 'citation',
    text: 'La meilleure défense, c\'est une bonne attaque. Et ma meilleure attaque, c\'est moi.',
    source: 'Sidekicks (1992)',
  },
  '12-16': {
    type: 'anecdote',
    text: 'Chuck Norris a eu une fille hors mariage, Dina, née en 1963, qu\'il n\'a reconnue publiquement qu\'en 2004. Cette révélation est abordée dans son autobiographie « Against All Odds ».',
    source: 'Biographie – Révélation personnelle',
  },
  '12-17': {
    type: 'fact',
    text: 'Le GPS de Chuck Norris ne donne pas de directions. Il donne des ordres.',
  },
  '12-18': {
    type: 'citation',
    text: 'On m\'a dit de tourner la page. J\'ai déchiré le livre.',
    source: 'Forced Vengeance (1982)',
  },
  '12-19': {
    type: 'anecdote',
    text: 'En 1969, Chuck Norris a remporté le titre de « Fighter of the Year » décerné par le magazine Black Belt, la publication la plus prestigieuse du monde des arts martiaux.',
    source: 'Biographie – Fighter of the Year',
  },
  '12-20': {
    type: 'fact',
    text: 'Chuck Norris peut lécher son propre coude. Et celui de quelqu\'un d\'autre en même temps.',
  },
  '12-21': {
    type: 'citation',
    text: 'La vie est un combat. Et je suis imbattable.',
    source: 'The Expendables 2 (2012)',
  },
  '12-22': {
    type: 'anecdote',
    text: 'Le ranch de Chuck Norris au Texas couvre plus de 1 000 acres. Il y pratique l\'agriculture, l\'élevage et y accueille régulièrement des vétérans et des jeunes de la KickStart Foundation.',
    source: 'Biographie – Le ranch',
  },
  '12-23': {
    type: 'fact',
    text: 'Quand Chuck Norris utilise un ascenseur, l\'ascenseur a le vertige.',
  },
  '12-24': {
    type: 'citation',
    text: 'L\'amour est la seule arme que je ne maîtrise pas.',
    source: 'Walker, Texas Ranger (2001)',
  },
  '12-25': {
    type: 'anecdote',
    text: 'Le « Walker, Texas Ranger Lever » de Conan O\'Brien, un gag récurrent dans son émission de télévision, a contribué à maintenir la popularité de Chuck Norris auprès d\'une nouvelle génération de fans.',
    source: 'Biographie – Héritage culturel télévisé',
  },
  '12-26': {
    type: 'fact',
    text: 'Chuck Norris ne dort pas. Il attend.',
  },
  '12-27': {
    type: 'citation',
    text: 'Certains hommes voient les choses telles qu\'elles sont. Je vois les choses telles qu\'elles devraient être.',
    source: 'A Force of One (1979)',
  },
  '12-28': {
    type: 'anecdote',
    text: 'À plus de 80 ans, Chuck Norris reste actif physiquement. Il s\'entraîne quotidiennement et continue à pratiquer les arts martiaux, prouvant que l\'âge n\'est qu\'un chiffre pour ceux qui ont la discipline.',
    source: 'Biographie – Forme physique à 80+ ans',
  },

  // === Mois 13 ===
  '13-1': {
    type: 'fact',
    text: 'Chuck Norris n\'a pas besoin de clés. Les portes s\'ouvrent par respect.',
  },
  '13-2': {
    type: 'citation',
    text: 'Le monde m\'a appris à me battre. Moi, j\'ai appris au monde ce qu\'est un vrai combat.',
    source: 'Walker, Texas Ranger (1996)',
  },
  '13-3': {
    type: 'anecdote',
    text: 'Chuck Norris est l\'un des rares artistes martiaux à maîtriser plus de cinq styles de combat différents : Tang Soo Do, taekwondo, Chun Kuk Do, jiu-jitsu brésilien et judo.',
    source: 'Biographie – Multi-styles',
  },
  '13-4': {
    type: 'fact',
    text: 'Quand Chuck Norris fait un gâteau, le gâteau a peur d\'être raté.',
  },
  '13-5': {
    type: 'citation',
    text: 'Mes poings ne connaissent pas la diplomatie.',
    source: 'The Hitman (1991)',
  },
  '13-6': {
    type: 'anecdote',
    text: 'Le premier combat professionnel de Chuck Norris en karaté a eu lieu en 1964. Il a perdu ce match mais en a tiré les leçons qui l\'ont mené à six titres consécutifs par la suite.',
    source: 'Biographie – Premier combat professionnel',
  },
  '13-7': {
    type: 'fact',
    text: 'Chuck Norris peut nouer ses lacets avec des gants de boxe.',
  },
  '13-8': {
    type: 'citation',
    text: 'La seule chose qui me fait reculer, c\'est l\'élan pour frapper plus fort.',
    source: 'Invasion U.S.A. (1985)',
  },
  '13-9': {
    type: 'anecdote',
    text: 'Dans les années 1970, la rivalité sportive entre Chuck Norris et Joe Lewis était l\'une des plus suivies dans le monde du karaté. Leur respect mutuel a contribué à populariser le karaté aux États-Unis.',
    source: 'Biographie – Rivalité avec Joe Lewis',
  },
  '13-10': {
    type: 'fact',
    text: 'Le calendrier n\'a pas 365 jours. Il en a autant que Chuck Norris le décide.',
  },
  '13-11': {
    type: 'citation',
    text: 'L\'aube se lève pour les justes. Pour les autres, c\'est le crépuscule.',
    source: 'Delta Force (1986)',
  },
  '13-12': {
    type: 'anecdote',
    text: 'Chuck Norris a été consultant technique pour le programme d\'entraînement au combat rapproché de plusieurs unités spéciales de l\'armée américaine dans les années 1980.',
    source: 'Biographie – Consultant militaire',
  },
  '13-13': {
    type: 'fact',
    text: 'Chuck Norris peut claquer des doigts avec des moufles.',
  },
  '13-14': {
    type: 'citation',
    text: 'Dans chaque fin, je vois un nouveau début.',
    source: 'Walker, Texas Ranger (2001)',
  },
  '13-15': {
    type: 'anecdote',
    text: 'Chuck Norris a toujours insisté pour que ses films et séries contiennent un message moral positif. Walker, Texas Ranger abordait régulièrement des thèmes comme la drogue, la violence domestique et le racisme.',
    source: 'Biographie – Messages moraux',
  },
  '13-16': {
    type: 'fact',
    text: 'Quand Chuck Norris cligne des yeux, les étoiles s\'éteignent.',
  },
  '13-17': {
    type: 'citation',
    text: 'Le passé m\'a forgé. Le présent me définit. Le futur me craint.',
    source: 'Missing in Action (1984)',
  },
  '13-18': {
    type: 'anecdote',
    text: 'Le système de gradation du Chun Kuk Do de Chuck Norris est unique : il combine des éléments de philosophie orientale avec des valeurs américaines de discipline personnelle et de service communautaire.',
    source: 'Biographie – Système de gradation unique',
  },
  '13-19': {
    type: 'fact',
    text: 'Chuck Norris peut entendre un murmure dans un concert de heavy metal.',
  },
  '13-20': {
    type: 'citation',
    text: 'On peut tout me prendre, sauf ma dignité.',
    source: 'Braddock: Missing in Action III (1988)',
  },
  '13-21': {
    type: 'anecdote',
    text: 'Chuck Norris a été invité deux fois à la Maison-Blanche : une fois sous George W. Bush et une fois sous Donald Trump, témoignant de sa proximité avec le monde politique républicain.',
    source: 'Biographie – Invité à la Maison-Blanche',
  },
  '13-22': {
    type: 'fact',
    text: 'Chuck Norris peut plier du béton armé. Avec ses excuses.',
  },
  '13-23': {
    type: 'citation',
    text: 'Seul un homme qui a tout perdu sait ce que signifie tout gagner.',
    source: 'Lone Wolf McQuade (1983)',
  },
  '13-24': {
    type: 'anecdote',
    text: 'La scène la plus célèbre de Walker, Texas Ranger est celle où Walker effectue un roundhouse kick au ralenti. Cette scène a été parodiée et référencée des milliers de fois dans la culture populaire.',
    source: 'Biographie – Scène la plus célèbre',
  },
  '13-25': {
    type: 'fact',
    text: 'Quand Chuck Norris mange un hamburger, le hamburger le remercie.',
  },
  '13-26': {
    type: 'citation',
    text: 'Je ne cherche pas à être un héros. Les héros, c\'est ce que je forme.',
    source: 'Sidekicks (1992)',
  },
  '13-27': {
    type: 'anecdote',
    text: 'Chuck Norris reste l\'une des figures les plus memifiées d\'Internet. Les « Chuck Norris Facts » comptent plus de 50 000 variations recensées en anglais, et des milliers dans d\'autres langues dont le français.',
    source: 'Biographie – Phénomène des mèmes',
  },
  '13-28': {
    type: 'fact',
    text: 'Chuck Norris n\'a pas de biographie. Il a une légende.',
  },
};

export function getCalendarEntry(month: number, day: number): CalendarEntry {
  const key = `${month}-${day}`;
  return calendarContent[key] ?? {
    type: 'fact' as ContentType,
    text: 'Le contenu de ce jour est en cours de rédaction...',
  };
}
