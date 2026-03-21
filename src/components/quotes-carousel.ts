import { quotes } from '../quotes';

export function renderQuotes(): void {
  const section = document.getElementById('quotes');
  if (!section) return;

  let current = 0;
  let autoInterval: ReturnType<typeof setInterval>;

  const dotsHTML = quotes
    .map(
      (_, i) =>
        `<button class="quote-dot w-3 h-3 rounded-full transition-all duration-300 ${
          i === 0 ? 'bg-gold scale-125' : 'bg-wheat/50'
        }" data-index="${i}" aria-label="Citation ${i + 1}"></button>`
    )
    .join('');

  section.innerHTML = `
    <div class="bg-dark py-20 px-4">
      <!-- Decorative top divider -->
      <div class="flex items-center justify-center gap-4 mb-12">
        <span class="text-gold text-2xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-3xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>

      <!-- Section title -->
      <h2 class="font-western text-gold text-4xl md:text-6xl text-center mb-16 tracking-wider"
          style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7);">
        Paroles de Légende
      </h2>

      <!-- Carousel -->
      <div class="max-w-3xl mx-auto relative flex items-center gap-4 md:gap-8">
        <!-- Prev button -->
        <button id="quote-prev"
                class="text-gold text-3xl md:text-4xl font-western transition-transform duration-200 hover:scale-125 flex-shrink-0 select-none cursor-pointer"
                aria-label="Citation précédente">
          ◄
        </button>

        <!-- Quote card -->
        <div class="flex-1 bg-wood/40 border border-leather rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden min-h-[200px] flex items-center justify-center"
             style="background-image: linear-gradient(135deg, rgba(62,33,16,0.4) 0%, rgba(139,69,19,0.15) 50%, rgba(62,33,16,0.4) 100%);">
          <!-- Decorative quotes -->
          <span class="absolute top-3 left-5 text-gold/30 text-6xl font-western leading-none select-none pointer-events-none">"</span>
          <span class="absolute bottom-3 right-5 text-gold/30 text-6xl font-western leading-none select-none pointer-events-none">"</span>

          <div id="quote-content" class="text-center transition-opacity duration-500 ease-in-out">
            <p id="quote-text" class="text-xl md:text-2xl italic text-wheat leading-relaxed mb-6">
              ${quotes[0].text}
            </p>
            <p id="quote-source" class="text-gold font-western text-sm md:text-base">
              — ${quotes[0].source} (${quotes[0].year})
            </p>
          </div>
        </div>

        <!-- Next button -->
        <button id="quote-next"
                class="text-gold text-3xl md:text-4xl font-western transition-transform duration-200 hover:scale-125 flex-shrink-0 select-none cursor-pointer"
                aria-label="Citation suivante">
          ►
        </button>
      </div>

      <!-- Dots -->
      <div class="flex items-center justify-center gap-3 mt-8">
        ${dotsHTML}
      </div>

      <!-- Decorative bottom divider -->
      <div class="flex items-center justify-center gap-4 mt-16">
        <span class="text-gold text-2xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-3xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>
    </div>
  `;

  const content = document.getElementById('quote-content')!;
  const textEl = document.getElementById('quote-text')!;
  const sourceEl = document.getElementById('quote-source')!;
  const dots = section.querySelectorAll<HTMLButtonElement>('.quote-dot');

  function goTo(index: number): void {
    // Fade out
    content.classList.add('opacity-0');

    setTimeout(() => {
      current = ((index % quotes.length) + quotes.length) % quotes.length;
      textEl.textContent = quotes[current].text;
      sourceEl.textContent = `— ${quotes[current].source} (${quotes[current].year})`;

      // Update dots
      dots.forEach((dot, i) => {
        if (i === current) {
          dot.classList.remove('bg-wheat/50');
          dot.classList.add('bg-gold', 'scale-125');
        } else {
          dot.classList.remove('bg-gold', 'scale-125');
          dot.classList.add('bg-wheat/50');
        }
      });

      // Fade in
      content.classList.remove('opacity-0');
    }, 300);
  }

  function resetAuto(): void {
    clearInterval(autoInterval);
    autoInterval = setInterval(() => goTo(current + 1), 6000);
  }

  // Navigation
  document.getElementById('quote-prev')!.addEventListener('click', () => {
    goTo(current - 1);
    resetAuto();
  });

  document.getElementById('quote-next')!.addEventListener('click', () => {
    goTo(current + 1);
    resetAuto();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.index));
      resetAuto();
    });
  });

  // Start auto-rotation
  autoInterval = setInterval(() => goTo(current + 1), 6000);
}
