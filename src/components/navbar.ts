const NAV_LINKS = [
  { label: 'I. Ouverture', href: '#hero' },
  { label: 'II. Calendrier', href: '#calendar' },
  { label: 'III. Légende', href: '#memorial' },
  { label: 'IV. Paroles', href: '#paroles' },
  { label: 'V. Vidéos', href: '#videos' },
];

export function renderNavbar(): void {
  const nav = document.getElementById('nav');
  if (!nav) return;

  nav.className =
    'fixed top-0 left-0 w-full z-50 bg-[#0a0500]/95 backdrop-blur border-b-2 border-gold/40';

  nav.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <a href="#hero" class="group">
        <span class="font-western text-gold text-lg tracking-wide block leading-tight">CALENDRIER ACN</span>
        <span class="text-wheat/40 text-[0.6rem] tracking-[0.15em] uppercase block">L'ère de Chuck Norris</span>
      </a>

      <!-- Desktop links -->
      <ul class="hidden md:flex gap-6 items-center">
        ${NAV_LINKS.map(
          (l) =>
            `<li><a href="${l.href}" class="nav-link text-wheat/50 hover:text-gold transition-colors duration-200 font-body text-xs uppercase tracking-[0.1em]">${l.label}</a></li>`
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
    <ul id="nav-mobile" class="md:hidden hidden flex-col gap-2 px-4 pb-4 bg-[#0a0500]/95 border-b border-gold/20">
      ${NAV_LINKS.map(
        (l) =>
          `<li><a href="${l.href}" class="nav-link block py-2 text-wheat/50 hover:text-gold transition-colors duration-200 font-body text-sm uppercase tracking-[0.1em]">${l.label}</a></li>`
      ).join('')}
    </ul>
  `;

  // Hamburger toggle
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  toggle?.addEventListener('click', () => {
    mobile?.classList.toggle('hidden');
    mobile?.classList.toggle('flex');
  });

  // Close mobile menu on link click
  mobile?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobile.classList.add('hidden');
      mobile.classList.remove('flex');
    });
  });

  // Smooth scroll
  nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href')!);
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Active link highlighting via IntersectionObserver
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

  sections.forEach((s) => observer.observe(s));
}
