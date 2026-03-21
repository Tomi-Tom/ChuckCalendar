import { timeline, bio } from '../memorial';
import { CHUCK_MEMORIAL, CHUCK_YOUNG, CHUCK_ACTION, CHUCK_MARINE, CHUCK_2007, CHUCK_2016, CHUCK_HERO, CHUCK_AVATAR } from '../chuck-images';

// Map timeline events to appropriate photos
const TIMELINE_PHOTOS: Record<number, string> = {
  0: CHUCK_YOUNG,     // 1940 naissance
  1: CHUCK_MARINE,    // 1958 air force
  2: CHUCK_YOUNG,     // 1968 karate
  3: CHUCK_YOUNG,     // 1969-1974 champion
  4: CHUCK_YOUNG,     // 1972 Way of the Dragon
  5: CHUCK_ACTION,    // 1977 Breaker
  6: CHUCK_ACTION,    // 1984 Missing in Action
  7: CHUCK_ACTION,    // 1985 apogée
  8: CHUCK_2007,      // 1993 Walker
  9: CHUCK_2016,      // 2005 Facts
  10: CHUCK_2016,     // 2012 Expendables
  11: CHUCK_MEMORIAL, // 2026 ACN
};

export function renderMemorial(): void {
  const section = document.getElementById('memorial');
  if (!section) return;

  const timelineHTML = timeline
    .map(
      (event, i) => `
      <div class="memorial-event opacity-0 translate-y-8 transition-all duration-700 ease-out
                   flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row gap-4 md:gap-8 relative">
        <!-- Year badge -->
        <div class="flex-shrink-0 flex ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-start md:w-[calc(50%-1.5rem)] w-auto">
          <span class="inline-block bg-gold text-dark font-western text-sm md:text-base px-4 py-2 rounded-full font-bold whitespace-nowrap shadow-lg">
            ${event.year}
          </span>
        </div>

        <!-- Center photo (desktop only) -->
        <div class="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-10">
          <img src="${TIMELINE_PHOTOS[i] || CHUCK_HERO}" class="w-10 h-10 rounded-full border-2 border-gold shadow-md object-cover" alt="" />
        </div>

        <!-- Content card -->
        <div class="md:w-[calc(50%-1.5rem)] w-full bg-wood/30 border border-leather rounded-lg p-4 md:p-6 shadow-lg">
          <h3 class="font-western text-gold text-lg md:text-xl mb-2">${event.title}</h3>
          <p class="font-body text-wheat/90 text-sm md:text-base leading-relaxed">${event.description}</p>
        </div>
      </div>
    `
    )
    .join('');

  section.innerHTML = `
    <div class="relative py-20 px-4"
         style="background: linear-gradient(180deg, #1a0f00 0%, #2a1508 30%, #1a0f00 100%);">

      <!-- Decorative top divider -->
      <div class="flex items-center justify-center gap-4 mb-12">
        <span class="text-gold text-2xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <img src="${CHUCK_HERO}" class="w-10 h-10 rounded-full border-2 border-gold object-cover" alt="" />
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>

      <!-- Section title -->
      <h2 class="font-western text-gold text-4xl md:text-6xl text-center mb-6 tracking-wider"
          style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7);">
        Mémorial
      </h2>
      <p class="font-western text-wheat/80 text-xl md:text-2xl text-center mb-16"
         style="text-shadow: 1px 2px 4px rgba(0,0,0,0.5);">
        La Légende Éternelle
      </p>

      <!-- Chuck portrait gallery + Bio -->
      <div class="max-w-5xl mx-auto mb-20">
        <!-- Photo gallery row -->
        <div class="flex justify-center gap-4 mb-8 flex-wrap items-end">
          <img src="${CHUCK_AVATAR}" alt="Chuck Norris portrait"
               class="w-32 h-40 md:w-40 md:h-52 rounded-lg border-2 border-gold/50 shadow-xl object-cover rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-300" />
          <img src="${CHUCK_HERO}" alt="Chuck Norris Walker Texas Ranger"
               class="w-36 h-44 md:w-48 md:h-60 rounded-lg border-2 border-gold shadow-xl object-cover z-10 hover:scale-105 transition-all duration-300"
               style="box-shadow: 0 0 40px rgba(218,165,32,0.3);" />
          <img src="${CHUCK_ACTION}" alt="Chuck Norris action"
               class="w-32 h-40 md:w-40 md:h-52 rounded-lg border-2 border-gold/50 shadow-xl object-cover rotate-[3deg] hover:rotate-0 hover:scale-105 transition-all duration-300" />
        </div>

        <!-- Bio card -->
        <div class="max-w-3xl mx-auto bg-wood/20 border border-leather rounded-xl p-6 md:p-10 shadow-xl relative">
          <span class="absolute -top-4 left-6 text-gold text-5xl font-western leading-none">"</span>
          <p class="font-body text-wheat text-base md:text-lg leading-relaxed italic pt-4">
            ${bio}
          </p>
          <span class="absolute -bottom-4 right-6 text-gold text-5xl font-western leading-none">"</span>
        </div>
      </div>

      <!-- Decorative divider -->
      <div class="flex items-center justify-center gap-3 mb-16">
        <div class="h-px w-16 bg-leather"></div>
        <img src="${CHUCK_MARINE}" class="w-8 h-8 rounded-full opacity-50 object-cover" alt="" />
        <span class="text-gold text-xl">★</span>
        <img src="${CHUCK_2007}" class="w-8 h-8 rounded-full opacity-50 object-cover" alt="" />
        <div class="h-px w-16 bg-leather"></div>
      </div>

      <!-- Timeline -->
      <div class="max-w-5xl mx-auto relative">
        <div class="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-leather"></div>
        <div class="md:hidden absolute left-[1.1rem] top-0 bottom-0 w-0.5 bg-leather/50"></div>

        <div class="flex flex-col gap-10 md:gap-14">
          ${timelineHTML}
        </div>
      </div>

      <!-- Bottom tribute -->
      <div class="flex flex-col items-center gap-4 mt-20">
        <img src="${CHUCK_MEMORIAL}" class="w-20 h-20 rounded-full border-2 border-gold opacity-70 object-cover" alt="Chuck Norris" />
        <p class="font-western text-gold/60 text-lg tracking-widest">REST IN POWER</p>
        <div class="flex items-center gap-4">
          <span class="text-gold text-2xl">★</span>
          <div class="h-px w-24 bg-leather"></div>
          <span class="text-gold text-3xl">★</span>
          <div class="h-px w-24 bg-leather"></div>
          <span class="text-gold text-2xl">★</span>
        </div>
      </div>
    </div>
  `;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  section.querySelectorAll('.memorial-event').forEach((el) => observer.observe(el));
}
