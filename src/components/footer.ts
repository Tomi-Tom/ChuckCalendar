import { getTodayACN } from '../calendar';

export function renderFooter(): void {
  const main = document.querySelector('main');
  if (!main) return;

  const today = getTodayACN();

  const footer = document.createElement('footer');
  footer.className = 'bg-wood text-wheat/70 py-8 text-center font-body';
  footer.innerHTML = `
    <div class="divider-barbed text-lg mb-6">─═══─ ⊶ ─═══─ ⊶ ─═══─</div>
    <p class="text-lg font-western text-wheat/90 mb-2">★ À la mémoire éternelle de Chuck Norris ★</p>
    <p class="mb-1">Calendrier ACN — Ère Après Chuck Norris</p>
    <p class="text-sm text-wheat/50">${today.day} ${today.monthName} An ${today.year} ACN</p>
  `;

  main.insertAdjacentElement('afterend', footer);
}
