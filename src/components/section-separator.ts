import { t, type UIKey } from '../i18n';

type SeparatorType = 'quote' | 'star' | 'film';

const SEPARATOR_QUOTE_KEYS: UIKey[] = [
  'separator.quote.0',
  'separator.quote.1',
  'separator.quote.2',
  'separator.quote.3',
];

export function renderSeparator(type: SeparatorType, quoteIndex: number = 0): string {
  switch (type) {
    case 'quote':
      return `
        <div data-separator="true" class="py-12 select-none">
          <div class="max-w-2xl mx-auto text-center px-4">
            <div class="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-4"></div>
            <p class="italic text-wheat/60 text-sm separator-animate">"${t(SEPARATOR_QUOTE_KEYS[quoteIndex % SEPARATOR_QUOTE_KEYS.length])}"</p>
            <div class="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-4"></div>
          </div>
        </div>`;
    case 'star':
      return `
        <div data-separator="true" class="py-12 select-none">
          <div class="flex items-center justify-center gap-4 px-4">
            <div class="flex-1 max-w-[150px] h-px bg-gradient-to-r from-transparent to-gold"></div>
            <span class="text-gold text-2xl separator-animate">&#9733;</span>
            <div class="flex-1 max-w-[150px] h-px bg-gradient-to-l from-transparent to-gold"></div>
          </div>
        </div>`;
    case 'film':
      return `
        <div data-separator="true" class="py-12 select-none">
          <div class="flex justify-center items-center gap-1 px-4">
            ${[0.4, 0.5, 0.6].map(o => `<div class="w-2 h-5 bg-gold rounded-sm" style="opacity:${o}"></div>`).join('')}
            ${[0.7, 1, 0.7].map(o => `<div class="w-10 h-6 border-2 border-gold rounded-sm" style="opacity:${o}${o === 1 ? ';background:rgba(218,165,32,0.15)' : ''}"></div>`).join('')}
            ${[0.6, 0.5, 0.4].map(o => `<div class="w-2 h-5 bg-gold rounded-sm" style="opacity:${o}"></div>`).join('')}
          </div>
        </div>`;
  }
}
