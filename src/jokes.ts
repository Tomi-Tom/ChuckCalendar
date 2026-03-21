const fallbackJokes: string[] = [
  "Chuck Norris peut diviser par zéro.",
  "Chuck Norris a gagné un tournoi de fléchettes. Avec un bus.",
  "Les requins ont une semaine Chuck Norris.",
  "Chuck Norris peut claquer une porte ouverte.",
  "Quand Google ne trouve pas quelque chose, il demande à Chuck Norris.",
  "Chuck Norris a déjà compté jusqu'à l'infini. Deux fois.",
  "La mort a eu un jour de congé. Chuck Norris lui a dit de ne pas revenir.",
  "Chuck Norris peut faire pleurer un oignon.",
  "Quand Chuck Norris regarde un GPS, c'est le GPS qui se perd.",
  "Chuck Norris peut écrire avec un surligneur.",
  "Chuck Norris ne porte pas de montre. Il décide de l'heure qu'il est.",
  "Si Chuck Norris dort avec une lampe allumée, c'est pas parce qu'il a peur du noir. C'est le noir qui a peur de lui.",
  "Chuck Norris a déjà été sur Mars. C'est pourquoi il n'y a pas de signes de vie.",
  "Chuck Norris peut gagner une partie de Puissance 4 en trois coups.",
  "Quand Chuck Norris envoie un mail, le serveur dit merci.",
  "Chuck Norris peut applaudir d'une seule main.",
  "Chuck Norris ne fait pas de pompes, il repousse la Terre.",
  "Chuck Norris peut couper un couteau avec du beurre.",
  "Le Big Bang est le résultat d'un roundhouse kick de Chuck Norris.",
  "Chuck Norris peut tirer plus vite que son ombre.",
  "Chuck Norris a un jour avalé un paquet de graines. Il a planté une forêt.",
  "Chuck Norris peut éteindre un feu avec de l'essence.",
  "Quand Chuck Norris fait un don du sang, il refuse la seringue. Il demande un pistolet et un seau.",
  "Chuck Norris ne ment jamais. La vérité se trompe.",
  "Chuck Norris peut étrangler quelqu'un avec un téléphone sans fil.",
  "Chuck Norris a un jour gagné un marathon. En reculant.",
  "Les fantômes s'assoient autour d'un feu et racontent des histoires de Chuck Norris.",
  "Chuck Norris peut faire un tour du monde en restant immobile. C'est la Terre qui tourne autour de lui.",
  "Quand Chuck Norris entre dans une pièce, il ne cherche pas la lumière. La lumière le cherche.",
  "Chuck Norris ne lit pas les livres. Il les fixe jusqu'à ce qu'ils lui disent ce qu'il veut savoir.",
];

export function getRandomFallbackJoke(): string {
  return fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
}

/**
 * Fetch a Chuck Norris fact in French.
 * Primary: chuckfacts.xyz (French API)
 * Fallback: hardcoded French jokes
 */
export async function fetchJoke(): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      "https://chuckfacts.xyz/api/rand",
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      return getRandomFallbackJoke();
    }

    const data = await response.json();
    return data.joke;
  } catch {
    return getRandomFallbackJoke();
  }
}
