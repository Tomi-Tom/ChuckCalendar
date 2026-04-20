import { LANGUAGES, getLanguage, setLanguage } from '../i18n';
import { LANGUAGE_CODES } from '../i18n/types';

/**
 * Renvoie le HTML d'un sélecteur de langue (4 drapeaux).
 * @param compact si true, taille réduite pour mobile dropdown
 */
export function renderLanguageSwitcher(compact = false): string {
  const current = getLanguage();
  const sizeClass = compact ? 'w-5 h-[15px]' : 'w-6 h-[18px]';
  const buttons = LANGUAGE_CODES.map((code) => {
    const cfg = LANGUAGES[code];
    const isActive = code === current;
    const activeClass = isActive
      ? 'opacity-100 ring-2 ring-gold rounded-sm'
      : 'opacity-50 hover:opacity-100';
    return `<button type="button"
            class="lang-switch-btn ${sizeClass} ${activeClass} transition-all duration-200 cursor-pointer overflow-hidden"
            data-lang="${code}"
            aria-label="${cfg.switchLabel}"
            aria-pressed="${isActive}">
      ${cfg.flagSvg}
    </button>`;
  }).join('');
  return `<div class="lang-switcher flex items-center gap-2">${buttons}</div>`;
}

/**
 * Branche les listeners de click sur tous les boutons `.lang-switch-btn` du document.
 * Idempotent : à appeler après chaque rendu d'un sélecteur.
 */
export function bindLanguageSwitcherEvents(scope: Document | HTMLElement = document): void {
  scope.querySelectorAll<HTMLButtonElement>('.lang-switch-btn').forEach((btn) => {
    // Évite les doubles bindings : retire l'éventuel ancien handler
    btn.replaceWith(btn.cloneNode(true));
  });
  scope.querySelectorAll<HTMLButtonElement>('.lang-switch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.lang;
      if (code) setLanguage(code as ReturnType<typeof getLanguage>);
    });
  });
}
