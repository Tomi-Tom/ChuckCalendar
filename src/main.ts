import "./style.css";
import { renderNavbar } from "./components/navbar";
import { renderHero } from "./components/hero";
import { renderCalendar } from "./components/calendar-grid";
import { renderMemorial } from "./components/memorial-section";
import { renderJokeGenerator } from "./components/joke-generator";
import { renderQuotes } from "./components/quotes-carousel";
import { renderVideos } from "./components/video-gallery";
import { renderFooter } from "./components/footer";

// Render navbar first (sticky top)
renderNavbar();

// Render all sections
renderHero();
renderCalendar();
renderMemorial();
renderJokeGenerator();
renderQuotes();
renderVideos();

// Render footer last
renderFooter();

// ── Scroll fade-in animations ──
function initScrollAnimations(): void {
  const sections = document.querySelectorAll('main > section');

  sections.forEach((section) => {
    section.classList.add('fade-in-section');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
}

initScrollAnimations();
