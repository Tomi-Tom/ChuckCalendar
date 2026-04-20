import { LANGUAGES, getLanguage, setLanguage } from '../i18n';
import { LANGUAGE_CODES, isLanguageCode } from '../i18n/types';

/**
 * Renvoie le HTML d'un sélecteur de langue en dropdown.
 * @param compact si true, taille réduite pour mobile dropdown
 */
export function renderLanguageSwitcher(compact = false): string {
  const current = getLanguage();
  const cfg = LANGUAGES[current];
  const triggerSize = compact ? 'w-5 h-[15px]' : 'w-6 h-[18px]';
  const flagSize = compact ? 'w-5 h-[15px]' : 'w-5 h-[15px]';

  const panelItems = LANGUAGE_CODES.map((code) => {
    const lc = LANGUAGES[code];
    const isActive = code === current;
    return `<button type="button"
        class="lang-switch-item flex items-center gap-2 w-full text-left px-3 py-2 text-xs hover:bg-gold/15 transition-colors cursor-pointer ${isActive ? 'bg-gold/10 text-gold' : 'text-wheat/80'}"
        data-lang="${code}"
        aria-label="${lc.switchLabel}"
        aria-pressed="${isActive}">
      <span class="inline-block ${flagSize} overflow-hidden rounded-sm flex-shrink-0">${lc.flagSvg}</span>
      <span class="font-body tracking-wide">${lc.name}</span>
      ${isActive ? '<span class="ml-auto text-gold">✓</span>' : ''}
    </button>`;
  }).join('');

  return `<div class="lang-switcher relative inline-block">
    <button type="button"
        class="lang-switch-trigger ${triggerSize} ring-2 ring-gold/60 rounded-sm overflow-hidden transition-all duration-200 hover:ring-gold cursor-pointer flex-shrink-0"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-label="${cfg.switchLabel}">
      ${cfg.flagSvg}
    </button>
    <div class="lang-switch-panel hidden absolute right-0 mt-2 w-44 rounded-md border border-gold/40 bg-[#0a0500] shadow-xl z-50 overflow-hidden" role="listbox">
      ${panelItems}
    </div>
  </div>`;
}

/**
 * Branche les listeners. Idempotent via data-bound.
 * Gère l'ouverture/fermeture du dropdown + les clics sur les items + clic extérieur.
 */
export function bindLanguageSwitcherEvents(scope: Document | HTMLElement = document): void {
  const triggers = scope.querySelectorAll<HTMLButtonElement>('.lang-switch-trigger');
  triggers.forEach((trigger) => {
    if (trigger.dataset.bound === '1') return;
    trigger.dataset.bound = '1';

    const panel = trigger.parentElement?.querySelector<HTMLElement>('.lang-switch-panel');
    if (!panel) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = !panel.classList.contains('hidden');
      // Fermer tous les panels ouverts
      document.querySelectorAll<HTMLElement>('.lang-switch-panel').forEach((p) => p.classList.add('hidden'));
      document.querySelectorAll<HTMLButtonElement>('.lang-switch-trigger').forEach((t) => t.setAttribute('aria-expanded', 'false'));
      if (!wasOpen) {
        panel.classList.remove('hidden');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    panel.querySelectorAll<HTMLButtonElement>('.lang-switch-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = item.dataset.lang;
        panel.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
        if (isLanguageCode(code)) setLanguage(code);
      });
    });
  });

  // Clic extérieur : fermer tous les panels (idempotent : un seul listener global)
  if (!(document.body as any).__langSwitcherOutsideBound) {
    (document.body as any).__langSwitcherOutsideBound = true;
    document.addEventListener('click', () => {
      document.querySelectorAll<HTMLElement>('.lang-switch-panel').forEach((p) => p.classList.add('hidden'));
      document.querySelectorAll<HTMLButtonElement>('.lang-switch-trigger').forEach((t) => t.setAttribute('aria-expanded', 'false'));
    });
  }
}
