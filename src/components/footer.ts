import { getTodayACN } from '../calendar';
import { CHUCK_MEMORIAL, CHUCK_YOUNG, CHUCK_ACTION, CHUCK_HERO, CHUCK_MARINE } from '../chuck-images';

export function renderFooter(): void {
  const main = document.querySelector('main');
  if (!main) return;

  const today = getTodayACN();

  const footer = document.createElement('footer');
  footer.className = 'bg-wood text-wheat/70 py-10 text-center font-body relative';
  footer.innerHTML = `
    <div class="divider-barbed text-lg mb-8">─═══─ ⊶ ─═══─ ⊶ ─═══─</div>

    <!-- Chuck portrait -->
    <div class="flex justify-center mb-4">
      <img src="${CHUCK_MEMORIAL}" alt="Chuck Norris"
           class="w-24 h-24 rounded-full border-2 border-gold/50 opacity-80 object-cover"
           style="box-shadow: 0 0 20px rgba(218,165,32,0.2);" />
    </div>

    <p class="text-lg font-western text-wheat/90 mb-2">★ À la mémoire éternelle de Chuck Norris ★</p>
    <p class="text-sm text-wheat/60 mb-1">Carlos Ray Norris — 10 Mars 1940 — 19 Mars 2026</p>
    <p class="mb-3">Calendrier ACN — Ère Après Chuck Norris</p>
    <p class="text-sm text-wheat/50 mb-4">${today.day} ${today.monthName} An ${today.year} ACN</p>

    <p class="text-xs text-wheat/30 italic mb-6">
      « Chuck Norris n'a pas besoin d'un site web. Le site web a besoin de Chuck Norris. »
    </p>

    <!-- Chuck through the ages -->
    <div class="flex justify-center gap-3 opacity-50">
      <img src="${CHUCK_YOUNG}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="1976" title="1976" />
      <img src="${CHUCK_MARINE}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="Marine" title="Marine" />
      <img src="${CHUCK_ACTION}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="Action" title="Delta Force" />
      <img src="${CHUCK_HERO}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="2006" title="2006" />
      <img src="${CHUCK_MEMORIAL}" class="w-8 h-8 rounded-full object-cover border border-gold/30" alt="2015" title="2015" />
    </div>
  `;

  main.insertAdjacentElement('afterend', footer);
}
