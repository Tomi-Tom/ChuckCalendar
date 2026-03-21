import { CHUCK_HERO } from '../chuck-images';

const NAV_LINKS = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Calendrier', href: '#calendar' },
  { label: 'Mémorial', href: '#memorial' },
  { label: 'Facts', href: '#jokes' },
  { label: 'Citations', href: '#quotes' },
  { label: 'Vidéos', href: '#videos' },
];

export function renderNavbar(): void {
  const nav = document.getElementById('nav');
  if (!nav) return;

  nav.className =
    'fixed top-0 left-0 w-full z-50 bg-dark/95 backdrop-blur border-b border-leather';

  nav.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="#hero" class="flex items-center gap-2 group">
        <img src="${CHUCK_HERO}" alt="Chuck" class="w-9 h-9 rounded-full border-2 border-gold object-cover group-hover:scale-110 transition-transform" />
        <span class="font-western text-gold text-lg tracking-wide">CHUCK<span class="text-wheat">CALENDAR</span></span>
      </a>

      <!-- Desktop links -->
      <ul class="hidden md:flex gap-6 items-center">
        ${NAV_LINKS.map(
          (l) =>
            `<li><a href="${l.href}" class="nav-link text-wheat hover:text-gold transition-colors duration-200 font-body text-sm">${l.label}</a></li>`
        ).join('')}
      </ul>

      <!-- Hamburger -->
      <button id="nav-toggle" class="md:hidden text-wheat hover:text-gold transition-colors cursor-pointer" aria-label="Menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <ul id="nav-mobile" class="md:hidden hidden flex-col gap-2 px-4 pb-4 bg-dark/95 border-b border-leather">
      ${NAV_LINKS.map(
        (l) =>
          `<li><a href="${l.href}" class="nav-link block py-2 text-wheat hover:text-gold transition-colors duration-200 font-body">${l.label}</a></li>`
      ).join('')}
    </ul>
  `;

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

  const sections = NAV_LINKS.map((l) =>
    document.querySelector(l.href)
  ).filter(Boolean) as Element[];

  const navLinks = nav.querySelectorAll<HTMLAnchorElement>('a.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('text-gold');
              link.classList.remove('text-wheat');
            } else {
              link.classList.remove('text-gold');
              link.classList.add('text-wheat');
            }
          });
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}
