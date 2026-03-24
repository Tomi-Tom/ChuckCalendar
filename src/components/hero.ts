import { getTodayACN } from '../calendar';
import { CHUCK_HERO, CHUCK_YOUNG, CHUCK_ACTION, CHUCK_MEMORIAL } from '../chuck-images';

const QUOTES = [
  { text: 'Chuck Norris ne meurt pas. Il décide simplement de vivre ailleurs.', source: '' },
  { text: 'La peur n\'est pas réelle. Le danger est réel. Mais la peur est un choix.', source: 'Walker, Texas Ranger (1993)' },
  { text: 'Le temps ne passe pas. Il demande la permission à Chuck Norris.', source: '' },
  { text: 'Je ne recule jamais. Je n\'ai simplement pas encore appris comment.', source: 'Missing in Action (1984)' },
  { text: 'Quand Chuck Norris fait des pompes, il ne se soulève pas. Il repousse la Terre.', source: '' },
  { text: 'Un homme qui ne se bat pas pour ce qui est juste ne mérite pas le respect.', source: 'Lone Wolf McQuade (1983)' },
  { text: 'Sous la barbe de Chuck Norris, il n\'y a pas de menton. Il y a un autre poing.', source: '' },
  { text: 'La justice ne dort jamais. Et moi non plus.', source: 'Code of Silence (1985)' },
];

function formatACNTime(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function getTimeSinceDeath(): { days: number; hours: number; minutes: number; seconds: number } {
  const deathDate = new Date(2026, 2, 19);
  const now = new Date();
  const diff = now.getTime() - deathDate.getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function renderHero(): void {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const today = getTodayACN();
  const dateDisplay = today.isChuckDay
    ? `Jour de Chuck ${today.chuckDayNumber}, An ${today.year} ACN`
    : `${today.day} ${today.monthName}, An ${today.year} ACN`;

  const time = getTimeSinceDeath();

  hero.innerHTML = `
    <div class="film-grain relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
         style="background: linear-gradient(180deg, #0a0500 0%, #1a0f00 40%, #2a1a08 100%);">

      <!-- Floating background photos -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <img src="${CHUCK_YOUNG}" class="absolute top-[5%] left-[3%] w-32 md:w-44 rounded-lg opacity-[0.07] border border-gold/20 slow-drift" style="--drift-rotate:-12deg;--drift-x:8px;--drift-y:-12px" alt="" />
        <img src="${CHUCK_ACTION}" class="absolute top-[10%] right-[3%] w-28 md:w-40 rounded-lg opacity-[0.06] border border-gold/20 slow-drift" style="--drift-rotate:8deg;--drift-x:-10px;--drift-y:8px;animation-delay:-7s" alt="" />
        <img src="${CHUCK_MEMORIAL}" class="absolute bottom-[15%] left-[8%] w-24 opacity-[0.05] slow-drift" style="--drift-rotate:15deg;--drift-x:6px;--drift-y:-8px;animation-delay:-13s" alt="" />
        <img src="${CHUCK_MEMORIAL}" class="absolute bottom-[8%] right-[10%] w-20 opacity-[0.04] slow-drift" style="--drift-rotate:-20deg;--drift-x:-8px;--drift-y:6px;animation-delay:-3s" alt="" />
      </div>

      <!-- Production banner -->
      <div class="absolute top-0 left-0 right-0 text-center py-3 text-wheat/50 text-[0.65rem] tracking-[0.3em] uppercase border-b border-gold/20 z-10">
        Une production de l'Ère ACN
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-4 max-w-3xl mx-auto pt-16 stagger-children">
        <!-- Chuck portrait -->
        <div class="mb-6 flex justify-center">
          <img src="${CHUCK_HERO}" alt="Chuck Norris"
               class="w-28 h-28 md:w-36 md:h-36 rounded-full border-3 border-gold object-cover"
               style="box-shadow: 0 0 30px rgba(218,165,32,0.3);" />
        </div>

        <!-- Title -->
        <h1 class="font-western text-gold text-4xl md:text-6xl lg:text-7xl mb-1 tracking-wider glow-pulse">
          CHUCK NORRIS
        </h1>
        <p class="text-wheat/60 text-xs tracking-[0.2em] uppercase mb-8">
          10 Mars 1940 — 19 Mars 2026 · Kauai, Hawaï
        </p>

        <!-- ACN date block -->
        <div class="bg-gold/10 border border-gold/30 rounded-lg py-4 px-6 mx-auto max-w-sm mb-6 shimmer-border">
          <p class="text-wheat/50 text-[0.65rem] tracking-[0.2em] uppercase mb-1">Nous sommes le</p>
          <p class="text-gold text-xl md:text-2xl font-bold">${dateDisplay}</p>
          <p id="hero-clock" class="font-mono text-wheat/80 text-base mt-1 tabular-nums">${formatACNTime()}</p>
        </div>

        <!-- Time counter -->
        <div class="flex justify-center gap-6 mb-8 flex-wrap">
          <div class="text-center">
            <div id="counter-days" class="text-2xl text-gold font-bold tabular-nums">${time.days}</div>
            <div class="text-[0.6rem] uppercase tracking-[0.1em] text-wheat/50">jours</div>
          </div>
          <div class="text-center">
            <div id="counter-hours" class="text-2xl text-gold font-bold tabular-nums">${time.hours}</div>
            <div class="text-[0.6rem] uppercase tracking-[0.1em] text-wheat/50">heures</div>
          </div>
          <div class="text-center">
            <div id="counter-minutes" class="text-2xl text-gold font-bold tabular-nums">${String(time.minutes).padStart(2, '0')}</div>
            <div class="text-[0.6rem] uppercase tracking-[0.1em] text-wheat/50">minutes</div>
          </div>
          <div class="text-center">
            <div id="counter-seconds" class="text-2xl text-gold font-bold tabular-nums">${String(time.seconds).padStart(2, '0')}</div>
            <div class="text-[0.6rem] uppercase tracking-[0.1em] text-wheat/50">secondes</div>
          </div>
        </div>

        <!-- Rotating quote -->
        <div class="border-t border-gold/20 pt-6 max-w-lg mx-auto">
          <blockquote id="hero-quote"
                      class="font-body italic text-wheat/80 text-base md:text-lg leading-relaxed"
                      style="opacity: 1; transition: opacity 0.6s ease-in-out;">
            "${QUOTES[0].text}"
          </blockquote>
          <p id="hero-quote-source" class="text-wheat/40 text-xs mt-2"
             style="opacity: 1; transition: opacity 0.6s ease-in-out;">
            ${QUOTES[0].source ? `— ${QUOTES[0].source}` : ''}
          </p>
        </div>
      </div>
    </div>
  `;

  // Live clock + counter update
  const clockEl = document.getElementById('hero-clock');
  const daysEl = document.getElementById('counter-days');
  const hoursEl = document.getElementById('counter-hours');
  const minutesEl = document.getElementById('counter-minutes');
  const secondsEl = document.getElementById('counter-seconds');

  setInterval(() => {
    if (clockEl) clockEl.textContent = formatACNTime();
    const t = getTimeSinceDeath();
    if (daysEl) daysEl.textContent = String(t.days);
    if (hoursEl) hoursEl.textContent = String(t.hours);
    if (minutesEl) minutesEl.textContent = String(t.minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(t.seconds).padStart(2, '0');
  }, 1000);

  // Quote rotation
  let currentIndex = 0;
  const quoteEl = document.getElementById('hero-quote');
  const sourceEl = document.getElementById('hero-quote-source');
  if (!quoteEl || !sourceEl) return;

  const FADE_MS = 600;

  setInterval(() => {
    quoteEl.style.opacity = '0';
    sourceEl.style.opacity = '0';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % QUOTES.length;
      quoteEl.textContent = `"${QUOTES[currentIndex].text}"`;
      sourceEl.textContent = QUOTES[currentIndex].source ? `— ${QUOTES[currentIndex].source}` : '';
      void quoteEl.offsetWidth;
      quoteEl.style.opacity = '1';
      sourceEl.style.opacity = '1';
    }, FADE_MS);
  }, 5000);
}
