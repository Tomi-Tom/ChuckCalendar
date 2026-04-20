import { t } from '../i18n';
import { renderLanguageSwitcher, bindLanguageSwitcherEvents } from './language-switcher';

const NAV_LINKS = [
  { key: 'navbar.link.opening', href: '#hero' },
  { key: 'navbar.link.calendar', href: '#calendar' },
  { key: 'navbar.link.legend', href: '#memorial' },
  { key: 'navbar.link.words', href: '#paroles' },
  { key: 'navbar.link.videos', href: '#videos' },
] as const;

let activeNavObserver: IntersectionObserver | null = null;

export function renderNavbar(): void {
  const nav = document.getElementById('nav');
  if (!nav) return;

  activeNavObserver?.disconnect();

  nav.className =
    'fixed top-0 left-0 w-full z-50 bg-[#0a0500]/95 backdrop-blur border-b-2 border-gold/40';

  nav.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
      <a href="#hero" class="group flex-shrink-0">
        <span class="font-western text-gold text-lg tracking-wide block leading-tight">${t('navbar.brand.title')}</span>
        <span class="text-wheat/40 text-[0.6rem] tracking-[0.15em] uppercase block">${t('navbar.brand.subtitle')}</span>
      </a>

      <ul class="hidden md:flex gap-6 items-center">
        ${NAV_LINKS.map(
          (l) => `<li><a href="${l.href}" class="nav-link text-wheat/50 hover:text-gold transition-colors duration-200 font-body text-xs uppercase tracking-[0.1em]">${t(l.key)}</a></li>`
        ).join('')}
      </ul>

      <div class="flex items-center gap-3">
        <div class="hidden md:block">${renderLanguageSwitcher(false)}</div>

        <button id="nav-toggle" class="md:hidden text-wheat hover:text-gold transition-colors cursor-pointer" aria-label="${t('navbar.menu')}">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>

    <ul id="nav-mobile" class="md:hidden hidden flex-col gap-2 px-4 pb-4 bg-[#0a0500]/95 border-b border-gold/20">
      ${NAV_LINKS.map(
        (l) => `<li><a href="${l.href}" class="nav-link block py-2 text-wheat/50 hover:text-gold transition-colors duration-200 font-body text-sm uppercase tracking-[0.1em]">${t(l.key)}</a></li>`
      ).join('')}
      <li class="pt-2 border-t border-gold/20">${renderLanguageSwitcher(true)}</li>
    </ul>
  `;

  bindLanguageSwitcherEvents(nav);

  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  toggle?.addEventListener('click', () => {
    mobile?.classList.toggle('hidden');
    mobile?.classList.toggle('flex');
  });

  mobile?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobile.classList.add('hidden');
      mobile.classList.remove('flex');
    });
  });

  nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href')!);
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
  const navLinks = nav.querySelectorAll<HTMLAnchorElement>('a.nav-link');

  activeNavObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('text-gold');
              link.classList.remove('text-wheat/50');
            } else {
              link.classList.remove('text-gold');
              link.classList.add('text-wheat/50');
            }
          });
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  sections.forEach((s) => activeNavObserver!.observe(s));
}
