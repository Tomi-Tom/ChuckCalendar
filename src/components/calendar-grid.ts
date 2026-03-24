import {
  ACN_MONTH_NAMES,
  getTodayACN,
  getMonthDays,
  getChuckDaysCount,
} from '../calendar';
import { getCalendarEntry, type ContentType } from '../calendar-content';

let currentYear = 1;
let viewMode: 'annual' | 'month' = 'annual';
let selectedMonth = 1;

const TYPE_DOT_CLASS: Record<ContentType, string> = {
  fact: 'dot-fact',
  citation: 'dot-citation',
  anecdote: 'dot-anecdote',
};

const TYPE_BADGE_CLASS: Record<ContentType, string> = {
  fact: 'badge-fact',
  citation: 'badge-citation',
  anecdote: 'badge-anecdote',
};

const TYPE_LABEL: Record<ContentType, string> = {
  fact: 'FACT',
  citation: 'CITATION',
  anecdote: 'ANECDOTE',
};

const TYPE_BORDER: Record<ContentType, string> = {
  fact: 'border-gold',
  citation: 'border-brick',
  anecdote: 'border-[#2E5A88]',
};

export function renderCalendar(): void {
  const container = document.getElementById('calendar');
  if (!container) return;

  const today = getTodayACN();
  currentYear = today.year;

  render(container, today);
}

function render(container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  if (viewMode === 'annual') {
    renderAnnualView(container, today);
  } else {
    renderMonthView(container, today);
  }
}

// ── Annual View ──

function renderAnnualView(container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  let monthsHTML = '';
  for (let m = 1; m <= 13; m++) {
    const monthName = ACN_MONTH_NAMES[m - 1];
    const days = getMonthDays(currentYear, m);
    const isCurrentMonth = !today.isChuckDay && today.year === currentYear && today.month === m;

    let daysGridHTML = '';
    for (const { day } of days) {
      const entry = getCalendarEntry(m, day);
      const isToday = isCurrentMonth && today.day === day;
      const todayClass = isToday ? 'bg-gold/30 ring-1 ring-gold' : '';

      daysGridHTML += `
        <div class="text-center py-0.5 rounded ${todayClass}">
          <span class="text-[0.6rem] text-wheat/70">${day}</span>
          <div class="w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${TYPE_DOT_CLASS[entry.type]}"></div>
        </div>`;
    }

    const borderClass = isCurrentMonth ? 'border-gold/60' : 'border-gold/20';

    monthsHTML += `
      <div class="month-card bg-dark/80 border ${borderClass} rounded-lg p-3 cursor-pointer hover:border-gold/50 hover:bg-dark/60 transition-all"
           data-month="${m}">
        <h3 class="font-western text-gold text-center text-sm mb-2">${monthName}</h3>
        <div class="grid grid-cols-7 gap-0.5">
          ${daysGridHTML}
        </div>
      </div>`;
  }

  // Jour(s) de Chuck
  const chuckDaysCount = getChuckDaysCount(currentYear);
  let chuckDaysHTML = '';
  for (let d = 1; d <= chuckDaysCount; d++) {
    chuckDaysHTML += `
      <div class="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 rounded-lg px-4 py-2 cursor-pointer hover:bg-gold/25 transition-all"
           data-chuck-day="${d}">
        <span class="text-gold font-western text-sm">Jour de Chuck ${d > 1 ? d : ''}</span>
        <div class="w-2 h-2 rounded-full dot-anecdote"></div>
      </div>`;
  }

  container.innerHTML = `
    <div class="py-16 px-4"
         style="background: linear-gradient(180deg, #1a0f00 0%, #2a1508 50%, #1a0f00 100%);">
      <div class="max-w-7xl mx-auto">
        <!-- Title -->
        <h2 class="font-western text-gold text-4xl md:text-5xl text-center mb-2"
            style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7);">
          Le Calendrier Sacré
        </h2>
        <p class="text-center text-wheat/50 font-body text-sm mb-6 italic">13 mois. 28 jours. Le seul calendrier approuvé par Chuck.</p>

        <!-- Legend -->
        <div class="flex items-center justify-center gap-6 mb-8">
          <div class="flex items-center gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full dot-fact"></div>
            <span class="text-wheat/60 text-xs">Fact</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full dot-citation"></div>
            <span class="text-wheat/60 text-xs">Citation</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full dot-anecdote"></div>
            <span class="text-wheat/60 text-xs">Anecdote</span>
          </div>
        </div>

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
        <div id="calendar-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          ${monthsHTML}
        </div>

        <!-- Jour(s) de Chuck -->
        ${chuckDaysCount > 0 ? `
        <div class="flex justify-center gap-4 mb-10">
          ${chuckDaysHTML}
        </div>` : ''}
      </div>
    </div>

    <!-- Content modal -->
    <div id="cal-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70">
      <div id="cal-modal-card" class="film-grain bg-[#1a0f00] border-2 border-gold/40 rounded-lg max-w-lg w-full mx-4 relative modal-enter">
        <button id="cal-modal-close"
                class="absolute top-3 right-4 text-gold text-2xl cursor-pointer hover:text-wheat transition-colors z-10">
          &times;
        </button>
        <div class="relative z-10 p-6 md:p-8">
          <div class="flex justify-between items-center mb-4">
            <span id="cal-modal-badge" class="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"></span>
            <span id="cal-modal-date" class="text-wheat/60 text-xs"></span>
          </div>
          <div id="cal-modal-body" class="mb-4">
            <p id="cal-modal-text" class="italic text-wheat text-lg leading-relaxed border-l-3 pl-4"></p>
            <p id="cal-modal-source" class="text-wheat/50 text-sm mt-2 pl-4"></p>
          </div>
          <div class="flex justify-between text-wheat/40 text-sm">
            <button id="cal-modal-prev" class="hover:text-gold transition-colors cursor-pointer">← Jour précédent</button>
            <button id="cal-modal-next" class="hover:text-gold transition-colors cursor-pointer">Jour suivant →</button>
          </div>
        </div>
      </div>
    </div>
  `;

  bindAnnualEvents(container, today);
}

function bindAnnualEvents(container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  // Year nav
  document.getElementById('year-prev')?.addEventListener('click', () => {
    if (currentYear > 1) { currentYear--; render(container, today); }
  });
  document.getElementById('year-next')?.addEventListener('click', () => {
    currentYear++; render(container, today);
  });

  // Month card clicks → zoom
  container.querySelectorAll<HTMLElement>('.month-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedMonth = Number(card.dataset.month);
      viewMode = 'month';
      render(container, today);
    });
  });

  // Jour de Chuck clicks
  container.querySelectorAll<HTMLElement>('[data-chuck-day]').forEach(el => {
    el.addEventListener('click', () => {
      const d = Number(el.dataset.chuckDay);
      showModal(0, d, container, today);
    });
  });

  bindModalEvents(container, today);
}

// ── Month View ──

function renderMonthView(container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  const monthName = ACN_MONTH_NAMES[selectedMonth - 1];
  const days = getMonthDays(currentYear, selectedMonth);
  const isCurrentMonth = !today.isChuckDay && today.year === currentYear && today.month === selectedMonth;

  let daysGridHTML = '';
  for (const { day } of days) {
    const entry = getCalendarEntry(selectedMonth, day);
    const isToday = isCurrentMonth && today.day === day;
    const todayClass = isToday ? 'ring-2 ring-gold bg-gold/20' : '';
    const preview = entry.text.length > 40 ? entry.text.slice(0, 40) + '...' : entry.text;

    daysGridHTML += `
      <button class="day-cell text-left p-2 rounded-lg border border-gold/10 hover:border-gold/30 hover:bg-dark/40 transition-all cursor-pointer ${todayClass}"
              data-month="${selectedMonth}" data-day="${day}">
        <div class="flex items-center gap-1.5 mb-1">
          <span class="text-wheat font-bold text-sm">${day}</span>
          <div class="w-2 h-2 rounded-full ${TYPE_DOT_CLASS[entry.type]}"></div>
        </div>
        <p class="text-wheat/50 text-[0.6rem] leading-tight overflow-hidden text-ellipsis whitespace-nowrap">${preview}</p>
      </button>`;
  }

  // Month selector bar
  const monthSelectorHTML = ACN_MONTH_NAMES.map((name, i) => {
    const m = i + 1;
    const isActive = m === selectedMonth;
    return `<button class="month-sel-btn px-2 py-1 rounded text-[0.6rem] transition-all whitespace-nowrap ${
      isActive ? 'bg-gold/20 text-gold border border-gold/40' : 'text-wheat/40 hover:text-gold'
    }" data-sel-month="${m}">${name}</button>`;
  }).join('');

  container.innerHTML = `
    <div class="py-16 px-4 calendar-view-enter"
         style="background: linear-gradient(180deg, #1a0f00 0%, #2a1508 50%, #1a0f00 100%);">
      <div class="max-w-5xl mx-auto">
        <!-- Top nav -->
        <div class="flex items-center justify-between mb-4">
          <button id="back-annual" class="text-wheat/50 hover:text-gold transition-colors cursor-pointer text-sm">
            ← Vue annuelle
          </button>
          <div class="flex items-center gap-4">
            <button id="month-prev" class="text-gold hover:text-wheat transition-colors cursor-pointer text-lg${selectedMonth <= 1 ? ' opacity-30 pointer-events-none' : ''}">◄</button>
            <h2 class="font-western text-gold text-2xl md:text-4xl text-center tracking-wider">${monthName}</h2>
            <button id="month-next" class="text-gold hover:text-wheat transition-colors cursor-pointer text-lg${selectedMonth >= 13 ? ' opacity-30 pointer-events-none' : ''}">►</button>
          </div>
          <span class="font-western text-gold/60 text-sm">An ${currentYear}</span>
        </div>

        <!-- Month selector -->
        <div class="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-none">
          ${monthSelectorHTML}
        </div>

        <!-- Days grid -->
        <div class="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
          ${daysGridHTML}
        </div>
      </div>
    </div>

    <!-- Content modal -->
    <div id="cal-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70">
      <div id="cal-modal-card" class="film-grain bg-[#1a0f00] border-2 border-gold/40 rounded-lg max-w-lg w-full mx-4 relative modal-enter">
        <button id="cal-modal-close"
                class="absolute top-3 right-4 text-gold text-2xl cursor-pointer hover:text-wheat transition-colors z-10">
          &times;
        </button>
        <div class="relative z-10 p-6 md:p-8">
          <div class="flex justify-between items-center mb-4">
            <span id="cal-modal-badge" class="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"></span>
            <span id="cal-modal-date" class="text-wheat/60 text-xs"></span>
          </div>
          <div id="cal-modal-body" class="mb-4">
            <p id="cal-modal-text" class="italic text-wheat text-lg leading-relaxed border-l-3 pl-4"></p>
            <p id="cal-modal-source" class="text-wheat/50 text-sm mt-2 pl-4"></p>
          </div>
          <div class="flex justify-between text-wheat/40 text-sm">
            <button id="cal-modal-prev" class="hover:text-gold transition-colors cursor-pointer">← Jour précédent</button>
            <button id="cal-modal-next" class="hover:text-gold transition-colors cursor-pointer">Jour suivant →</button>
          </div>
        </div>
      </div>
    </div>
  `;

  bindMonthEvents(container, today);
}

function bindMonthEvents(container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  // Back to annual
  document.getElementById('back-annual')?.addEventListener('click', () => {
    viewMode = 'annual';
    render(container, today);
  });

  // Month prev/next
  document.getElementById('month-prev')?.addEventListener('click', () => {
    if (selectedMonth > 1) { selectedMonth--; render(container, today); }
  });
  document.getElementById('month-next')?.addEventListener('click', () => {
    if (selectedMonth < 13) { selectedMonth++; render(container, today); }
  });

  // Month selector
  container.querySelectorAll<HTMLElement>('.month-sel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedMonth = Number(btn.dataset.selMonth);
      render(container, today);
    });
  });

  // Day clicks
  container.querySelectorAll<HTMLElement>('.day-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const month = Number(cell.dataset.month);
      const day = Number(cell.dataset.day);
      showModal(month, day, container, today);
    });
  });

  bindModalEvents(container, today);
}

// ── Modal ──

let modalMonth = 0;
let modalDay = 0;

function showModal(month: number, day: number, container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  modalMonth = month;
  modalDay = day;

  const entry = getCalendarEntry(month, day);
  const modal = document.getElementById('cal-modal');
  const badge = document.getElementById('cal-modal-badge');
  const dateEl = document.getElementById('cal-modal-date');
  const textEl = document.getElementById('cal-modal-text');
  const sourceEl = document.getElementById('cal-modal-source');
  const prevBtn = document.getElementById('cal-modal-prev') as HTMLButtonElement;
  const nextBtn = document.getElementById('cal-modal-next') as HTMLButtonElement;

  if (!modal || !badge || !dateEl || !textEl || !sourceEl) return;

  // Badge
  badge.className = `px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${TYPE_BADGE_CLASS[entry.type]}`;
  badge.textContent = TYPE_LABEL[entry.type];

  // Date
  if (month === 0) {
    dateEl.textContent = `Jour de Chuck ${day}, An ${currentYear} ACN`;
  } else {
    dateEl.textContent = `${day} ${ACN_MONTH_NAMES[month - 1]}, An ${currentYear} ACN`;
  }

  // Content
  textEl.className = `italic text-wheat text-lg leading-relaxed border-l-3 ${TYPE_BORDER[entry.type]} pl-4`;
  textEl.textContent = entry.text;
  sourceEl.textContent = entry.source ? `— ${entry.source}` : '';

  // Prev/next visibility
  if (month === 0) {
    prevBtn.style.visibility = 'hidden';
    nextBtn.style.visibility = day < getChuckDaysCount(currentYear) ? 'visible' : 'hidden';
  } else {
    prevBtn.style.visibility = (month === 1 && day === 1) ? 'hidden' : 'visible';
    nextBtn.style.visibility = (month === 13 && day === 28) ? 'hidden' : 'visible';
  }

  // Show
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // Bind prev/next nav (remove old listeners by cloning)
  const newPrev = prevBtn.cloneNode(true) as HTMLButtonElement;
  const newNext = nextBtn.cloneNode(true) as HTMLButtonElement;
  prevBtn.replaceWith(newPrev);
  nextBtn.replaceWith(newNext);

  newPrev.addEventListener('click', () => {
    const [pm, pd] = getPrevDay(modalMonth, modalDay);
    showModal(pm, pd, container, today);
  });
  newNext.addEventListener('click', () => {
    const [nm, nd] = getNextDay(modalMonth, modalDay);
    showModal(nm, nd, container, today);
  });
}

function getPrevDay(month: number, day: number): [number, number] {
  if (month === 0) return [13, 28]; // from chuck day to last regular day
  if (day > 1) return [month, day - 1];
  if (month > 1) return [month - 1, 28];
  return [1, 1]; // shouldn't reach here
}

function getNextDay(month: number, day: number): [number, number] {
  if (month === 0) {
    if (day < getChuckDaysCount(currentYear)) return [0, day + 1];
    return [0, day]; // end
  }
  if (day < 28) return [month, day + 1];
  if (month < 13) return [month + 1, 1];
  return [13, 28]; // end
}

function bindModalEvents(container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  const modal = document.getElementById('cal-modal');
  const closeBtn = document.getElementById('cal-modal-close');

  closeBtn?.addEventListener('click', () => closeModal());

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape key
  const escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  // Suppress unused variable warnings
  void container;
  void today;
}

function closeModal(): void {
  const modal = document.getElementById('cal-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
