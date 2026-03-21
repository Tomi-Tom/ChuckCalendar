import { getTodayACN } from '../calendar';

const QUOTES = [
  'Chuck Norris ne meurt pas. Il décide simplement de vivre ailleurs.',
  'La mort a eu un jour de congé. Chuck Norris lui a dit de ne pas revenir.',
  'Le temps ne passe pas. Il demande la permission à Chuck Norris.',
  'Chuck Norris a déjà compté jusqu\u2019à l\u2019infini. Deux fois.',
  'Quand Chuck Norris fait des pompes, il ne se soulève pas. Il repousse la Terre.',
];

export function renderHero(): void {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const today = getTodayACN();

  const dateDisplay = today.isChuckDay
    ? `Jour de Chuck ${today.chuckDayNumber} — An ${today.year}`
    : `An ${today.year} — Jour ${today.day} de ${today.monthName}`;

  hero.innerHTML = `
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden"
         style="background: linear-gradient(135deg, #1a0f00 0%, #3e2110 30%, #8B4513 60%, #A52A2A 80%, #1a0f00 100%);">
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/50"></div>

      <!-- Content -->
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <!-- Sheriff star -->
        <div class="text-gold text-5xl md:text-6xl mb-6 drop-shadow-lg" style="text-shadow: 0 0 20px rgba(218,165,32,0.5);">
          ★
        </div>

        <!-- Title -->
        <h1 class="font-western text-gold text-6xl md:text-8xl mb-4 tracking-wider"
            style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7);">
          ÈRE ACN
        </h1>

        <!-- Subtitle -->
        <p class="font-body text-wheat text-2xl mb-8 tracking-wide">
          Après Chuck Norris
        </p>

        <!-- ACN date -->
        <p class="font-western text-gold text-xl md:text-3xl mb-12"
           style="text-shadow: 1px 2px 4px rgba(0,0,0,0.6);">
          ${dateDisplay}
        </p>

        <!-- Rotating quote -->
        <blockquote id="hero-quote"
                    class="font-body italic text-wheat/90 text-lg md:text-xl max-w-2xl mx-auto transition-opacity duration-700 opacity-100">
          "${QUOTES[0]}"
        </blockquote>

        <!-- Bottom sheriff star -->
        <div class="text-gold text-3xl mt-10 drop-shadow-lg" style="text-shadow: 0 0 15px rgba(218,165,32,0.4);">
          ★
        </div>
      </div>
    </div>
  `;

  // Start quote rotation
  let currentIndex = 0;
  const quoteEl = document.getElementById('hero-quote');
  if (!quoteEl) return;

  setInterval(() => {
    // Fade out
    quoteEl.classList.remove('opacity-100');
    quoteEl.classList.add('opacity-0');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % QUOTES.length;
      quoteEl.textContent = `"${QUOTES[currentIndex]}"`;

      // Fade in
      quoteEl.classList.remove('opacity-0');
      quoteEl.classList.add('opacity-100');
    }, 700);
  }, 5000);
}
