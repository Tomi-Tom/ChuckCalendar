import { getTodayACN } from '../calendar';
import { CHUCK_HERO, CHUCK_YOUNG, CHUCK_ACTION, CHUCK_AVATAR, CHUCK_MEMORIAL } from '../chuck-images';

const QUOTES = [
  'Chuck Norris ne meurt pas. Il décide simplement de vivre ailleurs.',
  'La mort a eu un jour de congé. Chuck Norris lui a dit de ne pas revenir.',
  'Le temps ne passe pas. Il demande la permission à Chuck Norris.',
  'Chuck Norris a déjà compté jusqu\u2019à l\u2019infini. Deux fois.',
  'Quand Chuck Norris fait des pompes, il ne se soulève pas. Il repousse la Terre.',
  'Sous la barbe de Chuck Norris, il n\'y a pas de menton. Il y a un autre poing.',
  'Chuck Norris ne dort pas. Il attend.',
  'La seule chose qui arrive à l\'heure sans Chuck Norris, c\'est Chuck Norris.',
];

function formatACNTime(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function getTimeSinceDeath(): string {
  const deathDate = new Date(2026, 2, 19);
  const now = new Date();
  const diff = now.getTime() - deathDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${days}j ${hours}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
}

export function renderHero(): void {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const today = getTodayACN();

  const dateDisplay = today.isChuckDay
    ? `Jour de Chuck ${today.chuckDayNumber} — An ${today.year}`
    : `An ${today.year} — Jour ${today.day} de ${today.monthName}`;

  hero.innerHTML = `
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden"
         style="background: radial-gradient(ellipse at 50% 30%, #3e2110 0%, #1a0f00 60%, #000 100%);">
      <!-- Dark overlay with vignette -->
      <div class="absolute inset-0" style="background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%);"></div>

      <!-- Floating real Chuck photos in background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <img src="${CHUCK_YOUNG}" class="absolute top-[5%] left-[3%] w-32 md:w-44 rotate-[-12deg] rounded-lg opacity-[0.07] border border-gold/20" alt="" />
        <img src="${CHUCK_ACTION}" class="absolute top-[10%] right-[3%] w-28 md:w-40 rotate-[8deg] rounded-lg opacity-[0.06] border border-gold/20" alt="" />
        <img src="${CHUCK_MEMORIAL}" class="absolute bottom-[15%] left-[8%] w-24 rotate-[15deg] opacity-[0.05]" alt="" />
        <img src="${CHUCK_MEMORIAL}" class="absolute bottom-[8%] right-[10%] w-20 rotate-[-20deg] opacity-[0.04]" alt="" />
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <!-- Chuck's portrait — real photo -->
        <div class="mb-8 flex justify-center">
          <div class="relative">
            <div class="absolute inset-0 rounded-full bg-gold/20 blur-3xl scale-150"></div>
            <img src="${CHUCK_HERO}" alt="Chuck Norris"
                 class="relative w-44 h-44 md:w-60 md:h-60 rounded-full border-4 border-gold shadow-2xl object-cover"
                 style="box-shadow: 0 0 60px rgba(218,165,32,0.4), 0 0 120px rgba(218,165,32,0.2);" />
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gold text-dark font-western text-xs px-3 py-1 rounded-full whitespace-nowrap">
              1940 — ∞
            </div>
          </div>
        </div>

        <!-- Main title -->
        <h1 class="font-western text-gold text-5xl md:text-7xl lg:text-9xl mb-2 tracking-wider"
            style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7), 0 0 40px rgba(218,165,32,0.3);">
          CHUCK NORRIS
        </h1>

        <!-- Subtitle era -->
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="h-px w-16 md:w-32 bg-gold/50"></div>
          <p class="font-western text-gold/80 text-lg md:text-2xl tracking-[0.3em]">
            ÈRE ACN
          </p>
          <div class="h-px w-16 md:w-32 bg-gold/50"></div>
        </div>

        <!-- Death date memorial -->
        <p class="font-body text-brick text-sm md:text-base mb-1 tracking-wide">
          ✝ 19 Mars 2026 — Carlos Ray Norris — Ryan, Oklahoma
        </p>
        <p class="font-body text-wheat/50 text-xs md:text-sm mb-6">
          Parti depuis <span id="hero-since-death" class="text-gold/70 font-mono">${getTimeSinceDeath()}</span>
        </p>

        <p class="font-body text-wheat/80 text-xl md:text-2xl mb-6 tracking-wide italic">
          « Il n'est pas mort. Il a juste décidé de roundhouse-kicker Dieu en personne. »
        </p>

        <!-- ACN date counter with live clock -->
        <div class="inline-flex items-center gap-3 bg-dark/60 border border-gold/40 rounded-full px-6 py-3 mb-10">
          <img src="${CHUCK_AVATAR}" class="w-8 h-8 rounded-full object-cover border border-gold/50" alt="" />
          <p class="font-western text-gold text-lg md:text-2xl"
             style="text-shadow: 1px 2px 4px rgba(0,0,0,0.6);">
            ${dateDisplay}
          </p>
          <span class="text-wheat/30">|</span>
          <p id="hero-clock" class="font-mono text-gold/80 text-lg md:text-2xl tabular-nums">
            ${formatACNTime()}
          </p>
        </div>

        <!-- Rotating quote -->
        <div class="max-w-2xl mx-auto h-16 md:h-12 flex items-center justify-center">
          <blockquote id="hero-quote"
                      class="font-body italic text-wheat/90 text-lg md:text-xl text-center"
                      style="opacity: 1; transition: opacity 0.6s ease-in-out;">
            "${QUOTES[0]}"
          </blockquote>
        </div>

        <!-- Scroll indicator -->
        <div class="mt-12 animate-bounce text-gold/60 text-3xl">▼</div>
      </div>
    </div>
  `;

  // Live clock update every second
  const clockEl = document.getElementById('hero-clock');
  const sinceDeathEl = document.getElementById('hero-since-death');
  setInterval(() => {
    if (clockEl) clockEl.textContent = formatACNTime();
    if (sinceDeathEl) sinceDeathEl.textContent = getTimeSinceDeath();
  }, 1000);

  // Start quote rotation
  let currentIndex = 0;
  const quoteEl = document.getElementById('hero-quote');
  if (!quoteEl) return;

  const FADE_MS = 600; // matches the CSS transition duration

  setInterval(() => {
    // Fade out
    quoteEl.style.opacity = '0';

    // After fade-out completes, swap text then fade in
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % QUOTES.length;
      quoteEl.textContent = `"${QUOTES[currentIndex]}"`;
      void quoteEl.offsetWidth;
      quoteEl.style.opacity = '1';
    }, FADE_MS);
  }, 5000);
}
