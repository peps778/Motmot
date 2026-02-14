
      /***********************
       * Data (edit these)
       ***********************/
      // Replace these with your real image URLs (or local paths)
      const IMAGES = [
        // Example placeholders:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1520975958225-9f17a48e20b1?w=1400&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1400&auto=format&fit=crop&q=80",
      ];

      // Music pages (each page can be a themed list)
      const MUSIC_PAGES = [
        {
          title: "14: Our Most Played",
          items: [
            "Silent Sanctuary",
            "Araw-Araw — Ben&Ben",
            "Pag-ibig ay Kanibalismo II",
            "Aphrodite — The Ridleys",
          ],
        },
        // Add more pages if you want:
        // { title: "Valentine Theme", items: ["..."] }
      ];

      // Spotify embed URLs (paste embed links here)
      // Tip: use Spotify “Share > Embed” then copy the iframe src URL
      const SPOTIFY_EMBEDS = [
        "https://open.spotify.com/embed/track/7GhIk7Il098yCjg4BQjzvb?utm_source=generator",
        // Add more:
        // "https://open.spotify.com/embed/track/XXXX?utm_source=generator"
      ];

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
       * Typing animation (fast + smooth)
       * - Uses requestAnimationFrame
       * - Starts when letter is visible
       * - Respects prefers-reduced-motion
       ***********************/
      const typedEl = document.getElementById("typedLetter");
      const replayBtn = document.getElementById("retype");
      const skipBtn = document.getElementById("skipType");

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let typingRaf = null;
      let typingState = {
        full: "",
        startTime: 0,
        lastLen: 0,
        done: false,
        // characters per second (tune for feel)
        cps: 55,
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

      // Start typing only when the letter is in view (better performance)
      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          if (entry.isIntersecting && !typingState.done && typedEl.textContent.trim() === "") {
            startTyping();
          }
        },
        { threshold: 0.35 }
      );
      io.observe(typedEl);

      // Also start immediately on load (if already visible)
      window.addEventListener("load", () => {
        // If it’s above-the-fold, trigger quickly
        if (typedEl.getBoundingClientRect().top < window.innerHeight * 0.8) {
          startTyping();
        }
      });

