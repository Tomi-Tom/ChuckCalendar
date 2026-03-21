import { timeline, bio } from '../memorial';

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

        <!-- Center dot (desktop only) -->
        <div class="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-10">
          <div class="w-4 h-4 bg-gold rounded-full border-2 border-leather shadow-md"></div>
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
        <span class="text-gold text-3xl">★</span>
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

      <!-- Bio -->
      <div class="max-w-3xl mx-auto mb-20">
        <div class="bg-wood/20 border border-leather rounded-xl p-6 md:p-10 shadow-xl relative">
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
        <span class="text-gold text-xl">★</span>
        <div class="h-px w-16 bg-leather"></div>
      </div>

      <!-- Timeline -->
      <div class="max-w-5xl mx-auto relative">
        <!-- Vertical line (desktop) -->
        <div class="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-leather"></div>
        <!-- Vertical line (mobile) -->
        <div class="md:hidden absolute left-[1.1rem] top-0 bottom-0 w-0.5 bg-leather/50"></div>

        <div class="flex flex-col gap-10 md:gap-14">
          ${timelineHTML}
        </div>
      </div>

      <!-- Decorative bottom divider -->
      <div class="flex items-center justify-center gap-4 mt-20">
        <span class="text-gold text-2xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-3xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>
    </div>
  `;

  // IntersectionObserver for fade-in
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
