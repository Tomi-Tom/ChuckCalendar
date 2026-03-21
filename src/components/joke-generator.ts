import { fetchJoke, getRandomFallbackJoke } from "../jokes";
import { CHUCK_HERO, CHUCK_AVATAR } from '../chuck-images';

export function renderJokeGenerator(): void {
  const section = document.getElementById("jokes");
  if (!section) return;

  const initialJoke = getRandomFallbackJoke();

  section.innerHTML = `
    <div class="relative py-20 px-4"
         style="background: linear-gradient(180deg, #1a0f00 0%, #0d0800 30%, #1a0f00 100%);">

      <!-- Decorative top divider -->
      <div class="flex items-center justify-center gap-4 mb-12">
        <span class="text-gold text-2xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <img src="${CHUCK_HERO}" class="w-10 h-10 rounded-full border-2 border-gold object-cover" alt="" />
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>

      <!-- Section title -->
      <h2 class="font-western text-gold text-4xl md:text-6xl text-center mb-4 tracking-wider"
          style="text-shadow: 2px 4px 8px rgba(0,0,0,0.7);">
        Le Générateur de Facts
      </h2>
      <p class="font-body text-wheat/60 text-center mb-16 italic">
        Chaque fact est approuvé par Chuck lui-même depuis l'au-delà
      </p>

      <!-- Chuck face + Button combo -->
      <div class="flex flex-col items-center mb-12">
        <div class="relative mb-6">
          <div class="absolute inset-0 rounded-full bg-gold/10 blur-xl scale-125"></div>
          <img id="joke-chuck-face" src="${CHUCK_HERO}" alt="Chuck Norris"
               class="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gold shadow-xl object-cover transition-transform duration-300"
               style="box-shadow: 0 0 30px rgba(218,165,32,0.3);" />
          <div id="joke-chuck-speech" class="absolute -top-1 -right-1 bg-gold text-dark font-western text-base w-9 h-9 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            💬
          </div>
        </div>

        <button id="joke-btn"
                class="bg-gold text-dark font-western text-xl md:text-2xl px-10 py-4 rounded-lg
                       shadow-lg cursor-pointer
                       transition-all duration-200 ease-out
                       hover:scale-105 hover:brightness-110 hover:shadow-xl
                       active:scale-95 active:brightness-90
                       flex items-center gap-3">
          <img src="${CHUCK_AVATAR}" class="w-8 h-8 rounded-full" alt="" />
          Chuck me a Fact!
        </button>
      </div>

      <!-- Joke card -->
      <div class="flex justify-center">
        <div class="max-w-2xl w-full bg-wood/50 border border-leather rounded-xl p-8 md:p-10 shadow-xl relative">
          <img src="${CHUCK_HERO}" class="absolute -top-5 -left-5 w-12 h-12 rounded-full border-2 border-gold shadow-lg object-cover" alt="" />

          <p id="joke-text"
             class="font-body text-wheat text-lg md:text-xl leading-relaxed text-center"
             style="transition: opacity 0.3s ease-in-out;"
            ${initialJoke}
          </p>
          <p id="joke-loading"
             class="hidden font-body text-wheat text-lg md:text-xl leading-relaxed text-center">
            Chuck réfléchit... <span class="inline-block animate-pulse text-gold text-2xl align-middle">★</span>
          </p>
        </div>
      </div>

      <!-- Decorative bottom divider -->
      <div class="flex items-center justify-center gap-4 mt-16">
        <span class="text-gold text-2xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <img src="${CHUCK_AVATAR}" class="w-8 h-8 rounded-full border border-gold/50 opacity-50" alt="" />
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>
    </div>
  `;

  const btn = document.getElementById("joke-btn")!;
  const jokeText = document.getElementById("joke-text")!;
  const jokeLoading = document.getElementById("joke-loading")!;
  const chuckFace = document.getElementById("joke-chuck-face")!;

  let isFetching = false;

  btn.addEventListener("click", async () => {
    if (isFetching) return;
    isFetching = true;

    btn.setAttribute("disabled", "true");
    btn.classList.add("opacity-60", "cursor-wait");
    chuckFace.classList.add("scale-110");

    // 1. Fade out current joke
    jokeText.style.opacity = "0";

    // 2. Start fetch in parallel
    const jokePromise = fetchJoke();

    // 3. Wait for fade-out to finish, then show loading
    await new Promise(resolve => setTimeout(resolve, 300));
    jokeText.classList.add("hidden");
    jokeLoading.classList.remove("hidden");

    // 4. Wait for joke
    const joke = await jokePromise;

    // 5. Swap: hide loading, set new text, fade in
    jokeLoading.classList.add("hidden");
    jokeText.textContent = joke;
    jokeText.classList.remove("hidden");
    jokeText.style.opacity = "0";
    void jokeText.offsetWidth;
    jokeText.style.opacity = "1";

    chuckFace.classList.remove("scale-110");
    btn.removeAttribute("disabled");
    btn.classList.remove("opacity-60", "cursor-wait");
    isFetching = false;
  });
}
