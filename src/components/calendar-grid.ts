import {
  ACN_MONTH_NAMES,
  getTodayACN,
  getMonthDays,
  getChuckDaysCount,
} from '../calendar';

const DAY_HEADERS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const FALLBACK_JOKES = [
  'Chuck Norris peut diviser par zéro.',
  'Chuck Norris a gagné un tournoi de fléchettes. Avec un bus.',
  'Les requins ont une semaine Chuck Norris.',
  'Chuck Norris peut claquer une porte ouverte.',
  'Quand Google ne trouve pas quelque chose, il demande à Chuck Norris.',
];

let currentYear = 1;

export function renderCalendar(): void {
  const container = document.getElementById('calendar');
  if (!container) return;

  const today = getTodayACN();
  currentYear = today.year;

  render(container, today);
}

function render(
  container: HTMLElement,
  today: ReturnType<typeof getTodayACN>
): void {
  const chuckDaysCount = getChuckDaysCount(currentYear);

  // Build months HTML
  let monthsHTML = '';
  for (let m = 1; m <= 13; m++) {
    const monthName = ACN_MONTH_NAMES[m - 1];
    const days = getMonthDays(currentYear, m);

    let daysGridHTML = '';
    // Day headers
    for (const h of DAY_HEADERS) {
      daysGridHTML += `<div class="text-center text-wheat/60 text-xs font-body py-1">${h}</div>`;
    }
    // Day cells
    for (const { day } of days) {
      const isToday =
        !today.isChuckDay &&
        today.year === currentYear &&
        today.month === m &&
        today.day === day;

      const todayClasses = isToday ? 'ring-2 ring-gold bg-gold/20' : '';

      daysGridHTML += `
        <button
          class="text-center text-sm py-1.5 rounded cursor-pointer hover:bg-leather/50 transition-colors ${todayClasses}"
          data-year="${currentYear}" data-month="${m}" data-day="${day}"
        >${day}</button>`;
    }

    monthsHTML += `
      <div class="bg-dark/80 border border-leather rounded-lg p-3">
        <h3 class="font-western text-gold text-center text-lg mb-2">${monthName}</h3>
        <div class="grid grid-cols-7 gap-0.5">
          ${daysGridHTML}
        </div>
      </div>`;
  }

  // Chuck days section
  let chuckDaysHTML = '';
  for (let cd = 1; cd <= chuckDaysCount; cd++) {
    const isToday =
      today.isChuckDay &&
      today.year === currentYear &&
      today.chuckDayNumber === cd;

    const todayClasses = isToday ? 'ring-2 ring-gold bg-gold/20' : '';

    chuckDaysHTML += `
      <button
        class="inline-flex items-center justify-center w-12 h-12 rounded-lg text-lg font-western text-gold border border-gold/50 cursor-pointer hover:bg-gold/20 transition-colors ${todayClasses}"
        data-year="${currentYear}" data-month="0" data-day="${cd}"
      >${cd}</button>`;
  }

  container.innerHTML = `
    <div class="py-16 px-4"
         style="background: linear-gradient(180deg, #1a0f00 0%, #2a1508 50%, #1a0f00 100%);">
      <div class="max-w-7xl mx-auto">
        <!-- Section title -->
        <h2 class="font-western text-gold text-4xl md:text-5xl text-center mb-8"
            style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7);">
          Calendrier Lunaire ACN
        </h2>

        <!-- Year navigation -->
        <div class="flex items-center justify-center gap-4 mb-10">
          <button id="year-prev"
                  class="border border-gold text-gold px-4 py-2 rounded font-western text-lg hover:bg-gold/20 transition-colors cursor-pointer${currentYear <= 1 ? ' opacity-30 pointer-events-none' : ''}">
            &lt;
          </button>
          <span class="font-western text-gold text-2xl md:text-3xl">An ${currentYear}</span>
          <button id="year-next"
                  class="border border-gold text-gold px-4 py-2 rounded font-western text-lg hover:bg-gold/20 transition-colors cursor-pointer">
            &gt;
          </button>
        </div>

        <!-- Months grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          ${monthsHTML}
        </div>

        <!-- Jour(s) de Chuck -->
        <div class="bg-dark/80 border border-leather rounded-lg p-6 text-center max-w-md mx-auto">
          <h3 class="font-western text-gold text-xl mb-4">
            Jour${chuckDaysCount > 1 ? 's' : ''} de Chuck
          </h3>
          <div class="flex items-center justify-center gap-4">
            ${chuckDaysHTML}
          </div>
          <p class="text-wheat/60 text-sm mt-3 font-body">
            ${chuckDaysCount} jour${chuckDaysCount > 1 ? 's' : ''} sacré${chuckDaysCount > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>

    <!-- Joke modal -->
    <div id="joke-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70">
      <div class="bg-dark border-2 border-gold rounded-lg p-8 max-w-lg mx-4 text-center relative">
        <button id="joke-modal-close"
                class="absolute top-3 right-4 text-gold text-2xl cursor-pointer hover:text-wheat transition-colors">
          &times;
        </button>
        <p class="text-gold font-western text-xl mb-4">★</p>
        <p id="calendar-joke-text" class="font-body text-wheat text-lg leading-relaxed"></p>
      </div>
    </div>
  `;

  // Bind events
  bindEvents(container, today);
}

function bindEvents(
  container: HTMLElement,
  today: ReturnType<typeof getTodayACN>
): void {
  // Year navigation
  const prevBtn = document.getElementById('year-prev');
  const nextBtn = document.getElementById('year-next');

  prevBtn?.addEventListener('click', () => {
    if (currentYear > 1) {
      currentYear--;
      render(container, today);
    }
  });

  nextBtn?.addEventListener('click', () => {
    currentYear++;
    render(container, today);
  });

  // Day clicks — delegate from container
  container.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(
      '[data-year][data-month][data-day]'
    );
    if (!target) return;
    showJoke();
  });

  // Modal close
  const modal = document.getElementById('joke-modal');
  const closeBtn = document.getElementById('joke-modal-close');

  closeBtn?.addEventListener('click', () => {
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}

async function showJoke(): Promise<void> {
  const modal = document.getElementById('joke-modal');
  const jokeText = document.getElementById('calendar-joke-text');
  if (!modal || !jokeText) return;

  // Show modal with loading
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  jokeText.textContent = 'Chargement...';

  try {
    const res = await fetch('https://api.chucknorris.io/jokes/random');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    jokeText.textContent = data.value;
  } catch {
    const fallback =
      FALLBACK_JOKES[Math.floor(Math.random() * FALLBACK_JOKES.length)];
    jokeText.textContent = fallback;
  }
}
