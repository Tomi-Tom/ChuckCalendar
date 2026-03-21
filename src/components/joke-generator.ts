import { fetchJoke, getRandomFallbackJoke } from "../jokes";

export function renderJokeGenerator(): void {
  const section = document.getElementById("jokes");
  if (!section) return;

  const initialJoke = getRandomFallbackJoke();

  section.innerHTML = `
    <div class="relative py-20 px-4"
         style="background: linear-gradient(180deg, #1a0f00 0%, #0d0800 30%, #1a0f00 100%);
                background-image: radial-gradient(circle at 20% 50%, rgba(139,69,19,0.08) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 50%, rgba(139,69,19,0.08) 0%, transparent 50%);">

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
        Le Générateur de Facts
      </h2>

      <!-- Button -->
      <div class="flex justify-center mb-12">
        <button id="joke-btn"
                class="bg-gold text-dark font-western text-xl md:text-2xl px-10 py-4 rounded-lg
                       shadow-lg cursor-pointer
                       transition-all duration-200 ease-out
                       hover:scale-105 hover:brightness-110 hover:shadow-xl
                       active:scale-95 active:brightness-90">
          Chuck me a Fact!
        </button>
      </div>

      <!-- Joke card -->
      <div class="flex justify-center">
        <div class="max-w-2xl w-full bg-wood/50 border border-leather rounded-xl p-8 md:p-10 shadow-xl">
          <p id="joke-text"
             class="font-body text-wheat text-lg md:text-xl leading-relaxed text-center transition-opacity duration-300 ease-in-out">
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
        <span class="text-gold text-3xl">★</span>
        <div class="h-px w-24 bg-leather"></div>
        <span class="text-gold text-2xl">★</span>
      </div>
    </div>
  `;

  const btn = document.getElementById("joke-btn")!;
  const jokeText = document.getElementById("joke-text")!;
  const jokeLoading = document.getElementById("joke-loading")!;

  btn.addEventListener("click", async () => {
    btn.setAttribute("disabled", "true");
    btn.classList.add("opacity-60", "cursor-wait");

    // Fade out current joke and show loading
    jokeText.classList.add("opacity-0");
    setTimeout(() => {
      jokeText.classList.add("hidden");
      jokeLoading.classList.remove("hidden");
    }, 300);

    const joke = await fetchJoke();

    // Hide loading, show new joke with fade in
    jokeLoading.classList.add("hidden");
    jokeText.textContent = joke;
    jokeText.classList.remove("hidden");

    // Trigger reflow then fade in
    void jokeText.offsetWidth;
    jokeText.classList.remove("opacity-0");

    btn.removeAttribute("disabled");
    btn.classList.remove("opacity-60", "cursor-wait");
  });
}
