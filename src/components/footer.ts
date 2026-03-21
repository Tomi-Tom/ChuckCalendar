import { getTodayACN } from '../calendar';

const CHUCK_AVATAR = 'https://api.chucknorris.io/img/avatar/chuck-norris.png';

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
      <img src="${CHUCK_AVATAR}" alt="Chuck Norris"
           class="w-20 h-20 rounded-full border-2 border-gold/50 opacity-70" />
    </div>

    <p class="text-lg font-western text-wheat/90 mb-2">★ À la mémoire éternelle de Chuck Norris ★</p>
    <p class="text-sm text-wheat/60 mb-1">Carlos Ray Norris — 10 Mars 1940 — 19 Mars 2026</p>
    <p class="mb-3">Calendrier ACN — Ère Après Chuck Norris</p>
    <p class="text-sm text-wheat/50 mb-4">${today.day} ${today.monthName} An ${today.year} ACN</p>

    <p class="text-xs text-wheat/30 italic">
      « Chuck Norris n'a pas besoin d'un site web. Le site web a besoin de Chuck Norris. »
    </p>

    <!-- Tiny Chuck army -->
    <div class="flex justify-center gap-2 mt-6 opacity-30">
      <img src="${CHUCK_AVATAR}" class="w-6 h-6 rounded-full" alt="" />
      <img src="${CHUCK_AVATAR}" class="w-6 h-6 rounded-full" alt="" />
      <img src="${CHUCK_AVATAR}" class="w-6 h-6 rounded-full" alt="" />
      <img src="${CHUCK_AVATAR}" class="w-6 h-6 rounded-full" alt="" />
      <img src="${CHUCK_AVATAR}" class="w-6 h-6 rounded-full" alt="" />
    </div>
  `;

  main.insertAdjacentElement('afterend', footer);
}
