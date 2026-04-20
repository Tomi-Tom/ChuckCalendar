import { getTodayACN } from '../calendar';
import { CHUCK_HERO, CHUCK_YOUNG, CHUCK_ACTION, CHUCK_MEMORIAL } from '../chuck-images';
import { t } from '../i18n';
import { getQuotesContent } from '../i18n/quotes';

let activeIntervals: number[] = [];

function clearActiveIntervals(): void {
  activeIntervals.forEach((id) => clearInterval(id));
  activeIntervals = [];
}

function formatACNTime(): string {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, '0')).join(':');
}

function getTimeSinceDeath() {
  const deathDate = new Date(2026, 2, 19);
  const diff = Date.now() - deathDate.getTime();
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

export function renderHero(): void {
  const hero = document.getElementById('hero');
  if (!hero) return;

  clearActiveIntervals();

  const today = getTodayACN();
  const dateDisplay = today.isChuckDay
    ? `${t('hero.day_of_chuck')} ${today.chuckDayNumber}, ${t('hero.year_acn')} ${today.year} ${t('hero.year_acn_suffix')}`
    : `${today.day} ${today.monthName}, ${t('hero.year_acn')} ${today.year} ${t('hero.year_acn_suffix')}`;

  const time = getTimeSinceDeath();
  const quotes = getQuotesContent();

  hero.innerHTML = `
    <div class="film-grain relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
         style="background: linear-gradient(180deg, #0a0500 0%, #1a0f00 40%, #2a1a08 100%);">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <img src="${CHUCK_YOUNG}" class="absolute top-[5%] left-[3%] w-32 md:w-44 rounded-lg opacity-[0.07] border border-gold/20 slow-drift" style="--drift-rotate:-12deg;--drift-x:8px;--drift-y:-12px" alt="" />
        <img src="${CHUCK_ACTION}" class="absolute top-[10%] right-[3%] w-28 md:w-40 rounded-lg opacity-[0.06] border border-gold/20 slow-drift" style="--drift-rotate:8deg;--drift-x:-10px;--drift-y:8px;animation-delay:-7s" alt="" />
        <img src="${CHUCK_MEMORIAL}" class="absolute bottom-[15%] left-[8%] w-24 opacity-[0.05] slow-drift" style="--drift-rotate:15deg;--drift-x:6px;--drift-y:-8px;animation-delay:-13s" alt="" />
        <img src="${CHUCK_MEMORIAL}" class="absolute bottom-[8%] right-[10%] w-20 opacity-[0.04] slow-drift" style="--drift-rotate:-20deg;--drift-x:-8px;--drift-y:6px;animation-delay:-3s" alt="" />
      </div>

      <div class="absolute top-0 left-0 right-0 text-center py-3 text-wheat/50 text-[0.65rem] tracking-[0.3em] uppercase border-b border-gold/20 z-10">
        ${t('hero.banner')}
      </div>

      <div class="relative z-10 text-center px-4 max-w-3xl mx-auto pt-16">
        <div class="mb-6 flex justify-center">
          <img src="${CHUCK_HERO}" alt="Chuck Norris"
               class="w-28 h-28 md:w-36 md:h-36 rounded-full border-3 border-gold object-cover"
               style="box-shadow: 0 0 30px rgba(218,165,32,0.3);" />
        </div>

        <h1 class="font-western text-gold text-4xl md:text-6xl lg:text-7xl mb-1 tracking-wider glow-pulse">CHUCK NORRIS</h1>
        <p class="text-wheat/60 text-xs tracking-[0.2em] uppercase mb-8">${t('hero.dates')}</p>

        <div class="bg-gold/10 border border-gold/30 rounded-lg py-4 px-6 mx-auto max-w-sm mb-6 shimmer-border">
          <p class="text-wheat/50 text-[0.65rem] tracking-[0.2em] uppercase mb-1">${t('hero.we_are')}</p>
          <p class="text-gold text-xl md:text-2xl font-bold">${dateDisplay}</p>
          <p id="hero-clock" class="font-mono text-wheat/80 text-base mt-1 tabular-nums">${formatACNTime()}</p>
        </div>

        <div class="flex justify-center gap-6 mb-8 flex-wrap">
          <div class="text-center">
            <div id="counter-days" class="text-2xl text-gold font-bold tabular-nums">${time.days}</div>
            <div class="text-[0.6rem] uppercase tracking-[0.1em] text-wheat/50">${t('hero.counter.days')}</div>
          </div>
          <div class="text-center">
            <div id="counter-hours" class="text-2xl text-gold font-bold tabular-nums">${time.hours}</div>
            <div class="text-[0.6rem] uppercase tracking-[0.1em] text-wheat/50">${t('hero.counter.hours')}</div>
          </div>
          <div class="text-center">
            <div id="counter-minutes" class="text-2xl text-gold font-bold tabular-nums">${String(time.minutes).padStart(2, '0')}</div>
            <div class="text-[0.6rem] uppercase tracking-[0.1em] text-wheat/50">${t('hero.counter.minutes')}</div>
          </div>
          <div class="text-center">
            <div id="counter-seconds" class="text-2xl text-gold font-bold tabular-nums">${String(time.seconds).padStart(2, '0')}</div>
            <div class="text-[0.6rem] uppercase tracking-[0.1em] text-wheat/50">${t('hero.counter.seconds')}</div>
          </div>
        </div>

        <div class="border-t border-gold/20 pt-6 max-w-lg mx-auto">
          <blockquote id="hero-quote" class="font-body italic text-wheat/80 text-base md:text-lg leading-relaxed"
                      style="opacity: 1; transition: opacity 0.6s ease-in-out;">
            "${quotes[0].text}"
          </blockquote>
          <p id="hero-quote-source" class="text-wheat/40 text-xs mt-2"
             style="opacity: 1; transition: opacity 0.6s ease-in-out;">
            ${quotes[0].source ? `— ${quotes[0].source}` : ''}
          </p>
        </div>
      </div>
    </div>
  `;

  const clockEl = document.getElementById('hero-clock');
  const daysEl = document.getElementById('counter-days');
  const hoursEl = document.getElementById('counter-hours');
  const minutesEl = document.getElementById('counter-minutes');
  const secondsEl = document.getElementById('counter-seconds');

  activeIntervals.push(window.setInterval(() => {
    if (clockEl) clockEl.textContent = formatACNTime();
    const tt = getTimeSinceDeath();
    if (daysEl) daysEl.textContent = String(tt.days);
    if (hoursEl) hoursEl.textContent = String(tt.hours);
    if (minutesEl) minutesEl.textContent = String(tt.minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(tt.seconds).padStart(2, '0');
  }, 1000));

  let currentIndex = 0;
  const quoteEl = document.getElementById('hero-quote');
  const sourceEl = document.getElementById('hero-quote-source');
  if (!quoteEl || !sourceEl) return;
  const FADE_MS = 600;

  activeIntervals.push(window.setInterval(() => {
    quoteEl.style.opacity = '0';
    sourceEl.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % quotes.length;
      quoteEl.textContent = `"${quotes[currentIndex].text}"`;
      sourceEl.textContent = quotes[currentIndex].source ? `— ${quotes[currentIndex].source}` : '';
      void quoteEl.offsetWidth;
      quoteEl.style.opacity = '1';
      sourceEl.style.opacity = '1';
    }, FADE_MS);
  }, 5000));
}
