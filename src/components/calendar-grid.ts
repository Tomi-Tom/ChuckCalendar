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
let isTransitioning = false;

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

  renderShell(container, today);
}

// ── Shell (persistent wrapper: title, legend, nav, modal) ──

function renderShell(container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  container.innerHTML = `
    <div class="py-16 px-4"
         style="background: linear-gradient(180deg, #1a0f00 0%, #2a1508 50%, #1a0f00 100%);">
      <div class="max-w-7xl mx-auto">
        ${renderHeader()}
        <div id="cal-nav"></div>
        <div id="cal-content" class="transition-opacity duration-300 ease-in-out"></div>
      </div>
    </div>
    ${renderModalHTML()}
  `;

  bindModalCloseEvents();
  renderView(container, today, false);
}

function renderView(container: HTMLElement, today: ReturnType<typeof getTodayACN>, animate: boolean): void {
  const navEl = document.getElementById('cal-nav');
  const contentEl = document.getElementById('cal-content');
  if (!navEl || !contentEl) return;

  if (animate && !isTransitioning) {
    isTransitioning = true;
    contentEl.style.opacity = '0';
    setTimeout(() => {
      updateNav(navEl, container, today);
      updateContent(contentEl, container, today);
      contentEl.style.opacity = '1';
      isTransitioning = false;
    }, 300);
  } else if (!isTransitioning) {
    updateNav(navEl, container, today);
    updateContent(contentEl, container, today);
  }
}

function updateNav(navEl: HTMLElement, container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  if (viewMode === 'annual') {
    navEl.innerHTML = `
      <div class="flex items-center justify-center gap-6 mb-10">
        ${renderViewSwitch()}
        <button id="year-prev"
                class="border border-gold text-gold px-4 py-2 rounded font-western text-lg hover:bg-gold/20 transition-colors cursor-pointer${currentYear <= 1 ? ' opacity-30 pointer-events-none' : ''}">
          &lt;
        </button>
        <span class="font-western text-gold text-2xl md:text-3xl">An ${currentYear}</span>
        <button id="year-next"
                class="border border-gold text-gold px-4 py-2 rounded font-western text-lg hover:bg-gold/20 transition-colors cursor-pointer">
          &gt;
        </button>
      </div>`;
  } else {
    const monthName = ACN_MONTH_NAMES[selectedMonth - 1];
    const monthSelectorHTML = ACN_MONTH_NAMES.map((name, i) => {
      const m = i + 1;
      const isActive = m === selectedMonth;
      return `<button class="month-sel-btn px-2 py-1 rounded text-[0.6rem] transition-all whitespace-nowrap ${
        isActive ? 'bg-gold/20 text-gold border border-gold/40' : 'text-wheat/40 hover:text-gold'
      }" data-sel-month="${m}">${name}</button>`;
    }).join('');

    navEl.innerHTML = `
      <div class="flex items-center justify-center gap-6 mb-6">
        ${renderViewSwitch()}
        <button id="month-prev" class="text-gold hover:text-wheat transition-colors cursor-pointer text-lg font-western${selectedMonth <= 1 ? ' opacity-30 pointer-events-none' : ''}">&lt;</button>
        <h3 class="font-western text-gold text-2xl md:text-3xl text-center tracking-wider min-w-[200px]">${monthName} — An ${currentYear}</h3>
        <button id="month-next" class="text-gold hover:text-wheat transition-colors cursor-pointer text-lg font-western${selectedMonth >= 13 ? ' opacity-30 pointer-events-none' : ''}">&gt;</button>
      </div>
      <div class="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-none justify-center flex-wrap">
        ${monthSelectorHTML}
      </div>`;
  }

  bindNavEvents(navEl, container, today);
}

function updateContent(contentEl: HTMLElement, container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  if (viewMode === 'annual') {
    contentEl.innerHTML = renderAnnualContent(today);
    bindAnnualContentEvents(container, today);
  } else {
    contentEl.innerHTML = renderMonthContent(today);
    bindMonthContentEvents(container, today);
  }
}

// ── Shared header ──

function renderHeader(): string {
  return `
    <h2 class="font-western text-gold text-4xl md:text-5xl text-center mb-2"
        style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7);">
      Le Calendrier Sacré
    </h2>
    <p class="text-center text-wheat/50 font-body text-sm mb-6 italic">13 mois. 28 jours. Le seul calendrier approuvé par Chuck.</p>
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
    </div>`;
}

function renderViewSwitch(): string {
  const isAnnual = viewMode === 'annual';
  return `
    <button id="view-switch" class="flex items-center gap-2 border border-gold/30 rounded-lg px-3 py-1.5 text-xs hover:bg-gold/10 transition-all cursor-pointer">
      <span class="${isAnnual ? 'text-gold' : 'text-wheat/40'}">Année</span>
      <div class="w-8 h-4 rounded-full relative bg-gold/20">
        <div class="absolute top-0.5 w-3 h-3 rounded-full bg-gold transition-all ${isAnnual ? 'left-0.5' : 'left-4'}"></div>
      </div>
      <span class="${!isAnnual ? 'text-gold' : 'text-wheat/40'}">Mois</span>
    </button>`;
}

// ── Jour(s) de Chuck (shared between both views) ──

function renderChuckDays(): string {
  const chuckDaysCount = getChuckDaysCount(currentYear);
  if (chuckDaysCount === 0) return '';

  let html = '';
  for (let d = 1; d <= chuckDaysCount; d++) {
    html += `
      <div class="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 rounded-lg px-4 py-2 cursor-pointer hover:bg-gold/25 transition-all"
           data-chuck-day="${d}">
        <span class="text-gold font-western text-sm">Jour de Chuck${d > 1 ? ` ${d}` : ''}</span>
        <div class="w-2 h-2 rounded-full dot-anecdote"></div>
      </div>`;
  }
  return `<div class="flex justify-center gap-4 mt-6">${html}</div>`;
}

// ── Annual Content ──

function renderAnnualContent(today: ReturnType<typeof getTodayACN>): string {
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
      <div class="month-card hover-lift bg-dark/80 border ${borderClass} rounded-lg p-3 cursor-pointer hover:border-gold/50 hover:bg-dark/60 transition-all"
           data-month="${m}">
        <h3 class="font-western text-gold text-center text-sm mb-2">${monthName}</h3>
        <div class="grid grid-cols-7 gap-0.5">
          ${daysGridHTML}
        </div>
      </div>`;
  }

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      ${monthsHTML}
    </div>
    ${renderChuckDays()}`;
}

function bindAnnualContentEvents(container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  container.querySelectorAll<HTMLElement>('.month-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedMonth = Number(card.dataset.month);
      viewMode = 'month';
      renderView(container, today, true);
    });
  });

  container.querySelectorAll<HTMLElement>('[data-chuck-day]').forEach(el => {
    el.addEventListener('click', () => {
      showModal(0, Number(el.dataset.chuckDay), container, today);
    });
  });
}

// ── Month Content ──

function renderMonthContent(today: ReturnType<typeof getTodayACN>): string {
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

  return `
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
        ${daysGridHTML}
      </div>
      ${renderChuckDays()}
    </div>`;
}

function bindMonthContentEvents(container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  container.querySelectorAll<HTMLElement>('.day-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      showModal(Number(cell.dataset.month), Number(cell.dataset.day), container, today);
    });
  });

  container.querySelectorAll<HTMLElement>('[data-chuck-day]').forEach(el => {
    el.addEventListener('click', () => {
      showModal(0, Number(el.dataset.chuckDay), container, today);
    });
  });
}

// ── Nav events ──

function bindNavEvents(navEl: HTMLElement, container: HTMLElement, today: ReturnType<typeof getTodayACN>): void {
  navEl.querySelector('#view-switch')?.addEventListener('click', () => {
    if (viewMode === 'annual') {
      viewMode = 'month';
      selectedMonth = today.isChuckDay ? 1 : today.month;
    } else {
      viewMode = 'annual';
    }
    renderView(container, today, true);
  });

  if (viewMode === 'annual') {
    navEl.querySelector('#year-prev')?.addEventListener('click', () => {
      if (currentYear > 1) { currentYear--; renderView(container, today, true); }
    });
    navEl.querySelector('#year-next')?.addEventListener('click', () => {
      currentYear++; renderView(container, today, true);
    });
  } else {
    navEl.querySelector('#month-prev')?.addEventListener('click', () => {
      if (selectedMonth > 1) { selectedMonth--; renderView(container, today, true); }
    });
    navEl.querySelector('#month-next')?.addEventListener('click', () => {
      if (selectedMonth < 13) { selectedMonth++; renderView(container, today, true); }
    });
    navEl.querySelectorAll<HTMLElement>('.month-sel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedMonth = Number(btn.dataset.selMonth);
        renderView(container, today, true);
      });
    });
  }
}

// ── Modal ──

function renderModalHTML(): string {
  return `
    <div id="cal-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70">
      <div id="cal-modal-card" class="film-grain bg-[#1a0f00] border-2 border-gold/40 rounded-lg max-w-lg w-full mx-4 relative modal-enter">
        <div class="relative z-10 p-6 md:p-8">
          <button id="cal-modal-close"
                  class="absolute top-3 right-4 text-gold text-2xl cursor-pointer hover:text-wheat transition-colors">
            &times;
          </button>
          <div class="flex justify-between items-center mb-4 pr-8">
            <span id="cal-modal-badge" class="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"></span>
            <span id="cal-modal-date" class="text-wheat/60 text-xs"></span>
          </div>
          <div id="cal-modal-body" class="mb-4">
            <p id="cal-modal-text" class="italic text-wheat text-lg leading-relaxed border-l-3 pl-4"></p>
            <p id="cal-modal-source" class="text-wheat/50 text-sm mt-2 pl-4"></p>
          </div>
          <div class="flex justify-between text-wheat/40 text-sm">
            <button id="cal-modal-prev" class="hover:text-gold transition-colors cursor-pointer">&larr; Jour précédent</button>
            <button id="cal-modal-next" class="hover:text-gold transition-colors cursor-pointer">Jour suivant &rarr;</button>
          </div>
        </div>
      </div>
    </div>`;
}

let modalMonth = 0;
let modalDay = 0;

function bindModalCloseEvents(): void {
  const modal = document.getElementById('cal-modal');
  if (!modal) return;

  document.getElementById('cal-modal-close')?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

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

  badge.className = `px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${TYPE_BADGE_CLASS[entry.type]}`;
  badge.textContent = TYPE_LABEL[entry.type];

  dateEl.textContent = month === 0
    ? `Jour de Chuck ${day}, An ${currentYear} ACN`
    : `${day} ${ACN_MONTH_NAMES[month - 1]}, An ${currentYear} ACN`;

  textEl.className = `italic text-wheat text-lg leading-relaxed border-l-3 ${TYPE_BORDER[entry.type]} pl-4`;
  textEl.textContent = entry.text;
  sourceEl.textContent = entry.source ? `— ${entry.source}` : '';

  if (month === 0) {
    prevBtn.style.visibility = 'hidden';
    nextBtn.style.visibility = day < getChuckDaysCount(currentYear) ? 'visible' : 'hidden';
  } else {
    prevBtn.style.visibility = (month === 1 && day === 1) ? 'hidden' : 'visible';
    nextBtn.style.visibility = (month === 13 && day === 28) ? 'hidden' : 'visible';
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');

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
  if (month === 0) return [13, 28];
  if (day > 1) return [month, day - 1];
  if (month > 1) return [month - 1, 28];
  return [1, 1];
}

function getNextDay(month: number, day: number): [number, number] {
  if (month === 0) {
    if (day < getChuckDaysCount(currentYear)) return [0, day + 1];
    return [0, day];
  }
  if (day < 28) return [month, day + 1];
  if (month < 13) return [month + 1, 1];
  return [13, 28];
}

function closeModal(): void {
  const modal = document.getElementById('cal-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
