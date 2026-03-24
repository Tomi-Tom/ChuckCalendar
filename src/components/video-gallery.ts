import { videos } from '../videos';
import { CHUCK_HERO, CHUCK_ACTION, CHUCK_AVATAR } from '../chuck-images';

export function renderVideos(): void {
  const section = document.getElementById('videos');
  if (!section) return;

  const cardsHTML = videos
    .map(
      (video) => `
      <div class="rounded-xl border border-leather bg-wood/30 overflow-hidden shadow-lg group hover:border-gold/50 transition-colors">
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
        <div class="p-4 flex items-start gap-3">
          <img src="${CHUCK_HERO}" class="w-8 h-8 rounded-full border border-gold/50 flex-shrink-0 mt-0.5 object-cover" alt="" />
          <div>
            <h3 class="text-gold font-western text-lg mb-1">${video.title}</h3>
            <p class="text-wheat/70 text-sm">${video.description}</p>
          </div>
        </div>
      </div>`
    )
    .join('');

  section.innerHTML = `
    <div class="bg-dark py-16 px-4 relative">
      <!-- Chuck watermark -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <img src="${CHUCK_ACTION}" class="absolute bottom-[10%] right-[5%] w-64 rounded-lg" alt="" />
      </div>

      <!-- Decorative divider with Chuck -->
      <div class="flex items-center justify-center gap-4 mb-12">
        <span class="text-gold text-2xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <img src="${CHUCK_HERO}" class="w-10 h-10 rounded-full border-2 border-gold object-cover" alt="" />
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>

      <p class="text-xs tracking-[0.3em] uppercase text-wheat/40 text-center mb-1">Acte III</p>
      <h2 class="font-western text-gold text-4xl md:text-6xl text-center mb-4 tracking-wider"
          style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7);">
        En Action
      </h2>
      <p class="text-center text-wheat/50 font-body text-sm mb-12 italic">
        Les scènes que même Chuck Norris regarde en boucle
      </p>

      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cardsHTML}
      </div>

      <!-- Bottom -->
      <div class="flex items-center justify-center gap-4 mt-16">
        <span class="text-gold text-2xl">★</span>
        <div class="h-px w-16 bg-leather"></div>
        <img src="${CHUCK_AVATAR}" class="w-7 h-7 rounded-full opacity-40" alt="" />
        <img src="${CHUCK_HERO}" class="w-9 h-9 rounded-full opacity-60 border border-gold object-cover" alt="" />
        <img src="${CHUCK_AVATAR}" class="w-7 h-7 rounded-full opacity-40" alt="" />
        <div class="h-px w-16 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>
    </div>
  `;
}
