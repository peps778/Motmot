// main.js

/***********************
 * Data (edit these)
 ***********************/
const IMAGES = [
  "images/first_image.jpg",
  "images/second_image.jpg",
  "images/third_image.jpg",
  "images/fourth_image.jpg",
  "images/fifth_image.jpg",
  "images/last_image.jpg",
];

const MUSIC_PAGES = [
  {
    title: "Top Songs",
    items: [
      "Silent Sanctuary",
      "Araw-Araw — Ben&Ben",
      "Pag-ibig ay Kanibalismo II",
      "Aphrodite — The Ridleys",
    ],
  },
];

// Extracted from your music/embed.json iframe src values (ONLY src URLs)
const SPOTIFY_EMBEDS = [
  "https://open.spotify.com/embed/track/7KD8oUUpidul2ROxTIhPAw?utm_source=generator",
  "https://open.spotify.com/embed/track/4rG3h1QwgjSSWz8EIjCFrm?utm_source=generator",
  "https://open.spotify.com/embed/track/410fyfFghBsxNu45LiNJ24?utm_source=generator",
  "https://open.spotify.com/embed/track/5pek4R29HVwMaWgzpV64f3?utm_source=generator",
];

const LOVE_LETTER = `Happy 25 months to us, my babi.

For 25 months, we’ve been officially together—and what a journey it has been. We’ve had our ups and downs, moments of peace and misunderstanding, laughter and tears. But my favorite part of our story isn’t just the happy days—it’s the days when everything feels so heavy and hard, yet we still choose each other. Every single time.

As the days pass, our love only grows stronger. I pray that God continues to guide and preserve what we have, especially since we can’t see what the future holds. But one thing I hold onto is this hope—that this love of ours will one day begin again at the aisle and only end when we reach our graves.

Happy 25th monthsary, my buding. My only buding.`;

const LITTLE_NOTE =
  "These songs aren’t just melodies to us—they’re memories. 🎶 " +
  "Each one holds a piece of our story, from quiet nights and long talks to the moments when words weren’t enough but the music understood us. " +
  "These are the songs we played the most, the ones that carried our theme, our emotions, and our love.";

const FOR_YOU =
  "If love had a language, it would sound like us—soft, stubborn, and always finding its way back home.\n\n" +
  "Thank you for staying, for choosing, for growing with me. In the quiet days and the heavy ones too, I still want you—again and again.";

const PORTRAIT = {
  imageUrl: "images/portrait.jpg",
  lyrics: "HTML Portrait Text — (Paste lyrics here later) ",
};

// volume must be 0.0 - 1.0
const AUDIO_VOLUME = 1;

/***********************
 * Helpers
 ***********************/
function clampIndex(i, len) {
  return (i + len) % len;
}

function renderDots(container, total, activeIndex) {
  container.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className =
      "h-2 w-2 rounded-full border border-black/15 " +
      (i === activeIndex ? "bg-[#ff3fd6]" : "bg-white/60 hover:bg-white");
    dot.setAttribute("aria-label", `Go to item ${i + 1}`);
    dot.dataset.dotIndex = String(i);
    container.appendChild(dot);
  }
}

function attachDotClicks(container, onPick) {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const idx = Number(btn.dataset.dotIndex);
    if (!Number.isFinite(idx)) return;
    onPick(idx);
  });
}

/***********************
 * Boot: inject texts
 ***********************/
const typedEl = document.getElementById("typedLetter");
const littleNoteEl = document.getElementById("littleNote");
const forYouEl = document.getElementById("forYou");

typedEl.dataset.fulltext = LOVE_LETTER;
littleNoteEl.textContent = LITTLE_NOTE;
forYouEl.textContent = FOR_YOU;

/***********************
 * Image pagination
 ***********************/
const imgFrame = document.getElementById("imgFrame");
const imgPrev = document.getElementById("imgPrev");
const imgNext = document.getElementById("imgNext");
const imgIndexEl = document.getElementById("imgIndex");
const imgTotalEl = document.getElementById("imgTotal");
const imgDots = document.getElementById("imgDots");

let imgIndex = 0;
imgTotalEl.textContent = String(IMAGES.length);

function setImage(i) {
  imgIndex = clampIndex(i, IMAGES.length);
  imgFrame.src = IMAGES[imgIndex];
  imgIndexEl.textContent = String(imgIndex + 1);
  renderDots(imgDots, IMAGES.length, imgIndex);
}

imgPrev.addEventListener("click", () => setImage(imgIndex - 1));
imgNext.addEventListener("click", () => setImage(imgIndex + 1));
attachDotClicks(imgDots, (i) => setImage(i));
setImage(0);

/***********************
 * Music pagination
 ***********************/
const musicTitle = document.getElementById("musicTitle");
const musicList = document.getElementById("musicList");
const musicPrev = document.getElementById("musicPrev");
const musicNext = document.getElementById("musicNext");
const musicIndexEl = document.getElementById("musicIndex");
const musicTotalEl = document.getElementById("musicTotal");
const musicDots = document.getElementById("musicDots");

let musicIndex = 0;
musicTotalEl.textContent = String(MUSIC_PAGES.length);

function setMusic(i) {
  musicIndex = clampIndex(i, MUSIC_PAGES.length);
  const page = MUSIC_PAGES[musicIndex];

  musicTitle.textContent = page.title;
  musicList.innerHTML = "";

  page.items.forEach((t) => {
    const li = document.createElement("li");
    li.className = "flex items-start gap-2";
    li.innerHTML =
      '<span class="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#ff3fd6]/80"></span>' +
      `<span>${t}</span>`;
    musicList.appendChild(li);
  });

  musicIndexEl.textContent = String(musicIndex + 1);
  renderDots(musicDots, MUSIC_PAGES.length, musicIndex);
}

musicPrev.addEventListener("click", () => setMusic(musicIndex - 1));
musicNext.addEventListener("click", () => setMusic(musicIndex + 1));
attachDotClicks(musicDots, (i) => setMusic(i));
setMusic(0);

/***********************
 * Spotify embed pagination
 ***********************/
const spotifyFrame = document.getElementById("spotifyFrame");
const spPrev = document.getElementById("spPrev");
const spNext = document.getElementById("spNext");
const spIndexEl = document.getElementById("spIndex");
const spTotalEl = document.getElementById("spTotal");
const spDots = document.getElementById("spDots");

let spIndex = 0;
spTotalEl.textContent = String(SPOTIFY_EMBEDS.length);

function setSpotify(i) {
  spIndex = clampIndex(i, SPOTIFY_EMBEDS.length);
  spotifyFrame.src = SPOTIFY_EMBEDS[spIndex];
  spIndexEl.textContent = String(spIndex + 1);
  renderDots(spDots, SPOTIFY_EMBEDS.length, spIndex);
}

spPrev.addEventListener("click", () => setSpotify(spIndex - 1));
spNext.addEventListener("click", () => setSpotify(spIndex + 1));
attachDotClicks(spDots, (i) => setSpotify(i));
setSpotify(0);

/***********************
 * Typing animation (slow + smooth)
 ***********************/
const replayBtn = document.getElementById("retype");
const skipBtn = document.getElementById("skipType");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let typingRaf = null;
let typingState = {
  full: "",
  startTime: 0,
  lastLen: 0,
  done: false,
  cps: 30, // slow
};

function stopTyping() {
  if (typingRaf) cancelAnimationFrame(typingRaf);
  typingRaf = null;
}

function setFullTextInstant() {
  stopTyping();
  typedEl.classList.remove("caret");
  typedEl.textContent = typingState.full;
  typingState.done = true;
}

function typeFrame(ts) {
  if (!typingState.startTime) typingState.startTime = ts;

  const elapsed = (ts - typingState.startTime) / 1000;
  const targetLen = Math.min(typingState.full.length, Math.floor(elapsed * typingState.cps));

  if (targetLen !== typingState.lastLen) {
    typedEl.textContent = typingState.full.slice(0, targetLen);
    typingState.lastLen = targetLen;
  }

  if (targetLen >= typingState.full.length) {
    typedEl.classList.remove("caret");
    typingState.done = true;
    typingRaf = null;
    return;
  }

  typingRaf = requestAnimationFrame(typeFrame);
}

function startTyping() {
  stopTyping();
  typingState.full = typedEl.dataset.fulltext || "";
  typingState.startTime = 0;
  typingState.lastLen = 0;
  typingState.done = false;

  if (prefersReducedMotion) {
    typedEl.textContent = typingState.full;
    typedEl.classList.remove("caret");
    typingState.done = true;
    return;
  }

  typedEl.textContent = "";
  typedEl.classList.add("caret");
  typingRaf = requestAnimationFrame(typeFrame);
}

replayBtn.addEventListener("click", startTyping);
skipBtn.addEventListener("click", setFullTextInstant);

const io = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (!entry) return;
    if (entry.isIntersecting && !typingState.done && typedEl.textContent.trim() === "") startTyping();
  },
  { threshold: 0.35 }
);
io.observe(typedEl);

window.addEventListener("load", () => {
  if (typedEl.getBoundingClientRect().top < window.innerHeight * 0.8) startTyping();
});

/***********************
 * HTML Portrait
 ***********************/
const portraitImg = document.getElementById("portraitImg");
const portraitText = document.getElementById("portraitText");
const portraitRegen = document.getElementById("portraitRegen");

function buildPortraitTextBlock(text) {
  const base = (text || "").trim() || "YOUR LYRICS HERE ";
  const chunk = (base + " ").repeat(60);
  const paragraphs = 14;
  let out = "";
  for (let i = 0; i < paragraphs; i++) out += chunk + "\n";
  return out;
}

function renderPortrait() {
  portraitImg.src = PORTRAIT.imageUrl;
  portraitText.textContent = buildPortraitTextBlock(PORTRAIT.lyrics);
}

portraitRegen.addEventListener("click", renderPortrait);
renderPortrait();

/***********************
 * Background music (autoplay-on-load + keep button functions)
 ***********************/
const bgAudio = document.getElementById("bgAudio");
const audioBtn = document.getElementById("audioBtn");

let audioEnabled = false;
let userInteractionBound = false;

function fadeToVolume(target = AUDIO_VOLUME, ms = 900) {
  if (!bgAudio) return;

  const start = bgAudio.volume || 0;
  const steps = 24;
  let i = 0;
  const tick = ms / steps;

  const timer = setInterval(() => {
    i++;
    const t = i / steps;
    bgAudio.volume = Math.min(1, Math.max(0, start + (target - start) * t));
    if (i >= steps) clearInterval(timer);
  }, tick);
}

async function tryStartAudio() {
  if (!bgAudio) return false;

  try {
    bgAudio.volume = 0;
    await bgAudio.play();
    fadeToVolume(AUDIO_VOLUME);
    audioEnabled = true;
    if (audioBtn) audioBtn.textContent = "♫ Music On";
    return true;
  } catch {
    audioEnabled = false;
    if (audioBtn) audioBtn.textContent = "♫ Enable Music";

    if (!userInteractionBound) {
      userInteractionBound = true;
      const startOnFirstInteraction = async () => {
        if (audioEnabled) return;
        await tryStartAudio();
      };
      document.addEventListener("click", startOnFirstInteraction, { once: true });
      document.addEventListener("touchstart", startOnFirstInteraction, { once: true });
    }
    return false;
  }
}

function stopAudio() {
  if (!bgAudio) return;
  bgAudio.pause();
  bgAudio.currentTime = 0;
  audioEnabled = false;
  if (audioBtn) audioBtn.textContent = "♫ Enable Music";
}

if (audioBtn) {
  audioBtn.addEventListener("click", async () => {
    if (!bgAudio) return;

    if (audioEnabled) {
      stopAudio();
      return;
    }

    await tryStartAudio();
  });
}

// Auto-try on load
window.addEventListener("load", () => {
  tryStartAudio();
});
