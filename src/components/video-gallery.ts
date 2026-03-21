import { videos } from '../videos';

export function renderVideos(): void {
  const section = document.getElementById('videos');
  if (!section) return;

  const cardsHTML = videos
    .map(
      (video) => `
      <div class="rounded-xl border border-leather bg-wood/30 overflow-hidden shadow-lg">
        <div class="relative w-full" style="padding-top: 56.25%;">
          <iframe
            class="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/${video.id}"
            title="${video.title}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="p-4">
          <h3 class="text-gold font-western text-lg mb-1">${video.title}</h3>
          <p class="text-wheat/70 text-sm">${video.description}</p>
        </div>
      </div>`
    )
    .join('');

  section.innerHTML = `
    <div class="bg-dark py-16 px-4">
      <!-- Decorative divider -->
      <div class="flex items-center justify-center gap-4 mb-12">
        <span class="text-gold text-2xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-3xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>

      <h2 class="font-western text-gold text-4xl md:text-6xl text-center mb-12 tracking-wider"
          style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7);">
        Moments Iconiques
      </h2>

      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cardsHTML}
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
}
