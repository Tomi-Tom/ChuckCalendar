import "./style.css";
import { initI18n, onLanguageChange } from "./i18n";
import { renderNavbar } from "./components/navbar";
import { renderHero } from "./components/hero";
import { renderCalendar } from "./components/calendar-grid";
import { renderMemorial } from "./components/memorial-section";
import { renderParolesExploits } from "./components/paroles-exploits";
import { renderVideos } from "./components/video-gallery";
import { renderFooter } from "./components/footer";
import { renderSeparator } from "./components/section-separator";

initI18n();

function mountAll(): void {
  renderNavbar();
  renderHero();
  renderCalendar();
  renderMemorial();
  renderParolesExploits();
  renderVideos();
  renderFooter();
  injectSeparators();
  initScrollAnimations();
}

function injectSeparators(): void {
  // Retirer les séparateurs précédents avant d'en ré-injecter
  document.querySelectorAll('[data-separator="true"]').forEach((el) => el.remove());

  const separators: [string, 'quote' | 'star' | 'film', number?][] = [
    ['hero', 'quote', 0],
    ['paroles', 'quote', 1],
  ];
  for (const [afterId, type, quoteIdx] of separators) {
    const section = document.getElementById(afterId);
    if (section) {
      section.insertAdjacentHTML('afterend', renderSeparator(type, quoteIdx));
    }
  }
}

function initScrollAnimations(): void {
  const sections = document.querySelectorAll('main > section');
  sections.forEach((section) => section.classList.add('fade-in-section'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((section) => observer.observe(section));
}

mountAll();
onLanguageChange(() => mountAll());
