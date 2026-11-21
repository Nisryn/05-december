/* =====================================================
   script3.js — kamel (password, lettre, navigation, songs)
   Khass <script src="script3.js"></script> ykoun qbl </body>
===================================================== */

/* ---------- 1) PASSWORD ---------- */
const SECRET = "2610";

const form     = document.getElementById("password-form");
const input    = document.getElementById("password");
const wrap     = document.getElementById("input-wrap");
const error    = document.getElementById("error");
const entrance = document.getElementById("entrance");
const gift     = document.getElementById("gift");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === SECRET) {
    error.classList.remove("show");
    showScreen("gift");
  } else {
    error.classList.add("show");
    wrap.classList.remove("shake");
    void wrap.offsetWidth; // relance l'animation
    wrap.classList.add("shake");
    input.value = "";
    input.focus();
  }
});

input.addEventListener("input", () => error.classList.remove("show"));

/* ---------- 2) PÉTALES (page entrance) ---------- */
const petals = ["❀", "✿", "❁"];

function spawnPetal() {
  if (!entrance.classList.contains("active")) return;

  const p = document.createElement("span");
  p.className = "float-heart";
  p.textContent = petals[Math.floor(Math.random() * petals.length)];
  p.style.left = Math.random() * 100 + "%";
  p.style.fontSize = 12 + Math.random() * 16 + "px";
  p.style.animationDuration = 8 + Math.random() * 6 + "s";
  p.style.setProperty("--drift", Math.random() * 80 - 40 + "px");
  p.style.setProperty("--rot", Math.random() * 90 - 45 + "deg");
  entrance.appendChild(p);
  setTimeout(() => p.remove(), 15000);
}

setInterval(spawnPetal, 900);

/* ---------- 3) NAVIGATION BIN LES PAGES ---------- */
function showScreen(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  // tw9ef l-musiqa ila khrejti mn songs
  const a = document.getElementById("music-audio");
  if (a && id !== "songs") a.pause();

  window.scrollTo(0, 0);
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-go], [data-href]");
  if (!el) return;

  if (el.dataset.go) showScreen(el.dataset.go);          // page f nfs l-fichier
  else if (el.dataset.href) location.href = el.dataset.href; // fichier akhor
});

/* ---------- 4) LA LETTRE (envelope) ---------- */
const giftContent      = document.getElementById("gift-content");
const openLetterButton = document.getElementById("open-letter-btn");
const envelopeImg      = document.getElementById("envelope-img");

function openLetter() {
  if (!giftContent || giftContent.classList.contains("opened")) return;

  giftContent.classList.add("opened");
  if (openLetterButton) openLetterButton.disabled = true;
  if (envelopeImg) envelopeImg.src = "images/envelope-open.png";

  setTimeout(() => {
    const btn = document.getElementById("continue-btn");
    if (btn) btn.classList.add("show");
  }, 2200);
}

if (openLetterButton) openLetterButton.addEventListener("click", openLetter);
if (envelopeImg) envelopeImg.addEventListener("click", openLetter);

/* ---------- 5) PARTICULES FLOTTANTES (page lettre) ---------- */
if (gift) {
  const particles = ["♡", "❀", "✿", "♥", "✧", "❁"];
  const colors = ["#a34d5c", "#c88788", "#d6a2a0", "#87404c"];

  function createGiftParticle() {
    if (!gift.classList.contains("active")) return;

    const particle = document.createElement("span");
    particle.className = "gift-particle";
    particle.textContent =
      particles[Math.floor(Math.random() * particles.length)];

    particle.style.left = Math.random() * 94 + 3 + "%";
    particle.style.bottom = "-20px";
    particle.style.fontSize = 13 + Math.random() * 17 + "px";
    particle.style.animationDuration = 5 + Math.random() * 3 + "s";
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];

    gift.appendChild(particle);
    setTimeout(() => particle.remove(), 16000);
  }

  setInterval(createGiftParticle, 1100);
}

/* ---------- 6) SONGS ---------- */
const songs = [
  { title: "TSWIRTK",     artist: "DRAGANOV",            src: "audio/song1.mp3", cover: "images/music-cover.png" },
  { title: "SATA 9TTALA", artist: "STORMY, @manalmusic", src: "audio/song2.mp3", cover: "images/music-cover.png" },
  { title: "Nti o ana",   artist: "Ahmed Soultan",       src: "audio/song3.mp3", cover: "images/music-cover.png" }
];

const audio      = document.getElementById("music-audio");
const playBtn    = document.getElementById("play-song");
const prevBtn    = document.getElementById("prev-song");
const nextBtn    = document.getElementById("next-song");
const vinyl      = document.getElementById("vinyl");
const cover      = document.getElementById("album-cover");
const titleEl    = document.getElementById("song-title");
const artistEl   = document.getElementById("song-artist");
const fill       = document.getElementById("progress-fill");
const track      = document.getElementById("progress-track");
const currentEl  = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const songItems  = document.querySelectorAll(".song-item");

let current = 0;

function fmt(s) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60).toString().padStart(2, "0");
  return m + ":" + r;
}

function loadSong(i, autoplay = false) {
  current = (i + songs.length) % songs.length;
  const s = songs[current];

  audio.src = s.src;
  cover.src = s.cover;
  titleEl.textContent = s.title;
  artistEl.textContent = s.artist;
  fill.style.width = "0%";
  currentEl.textContent = "0:00";
  durationEl.textContent = "0:00";

  songItems.forEach((el, idx) => el.classList.toggle("active", idx === current));

  if (autoplay) {
    audio.play().catch((err) => console.warn("Audio error:", err));
  }
}

function togglePlay() {
  if (audio.paused) {
    audio.play().catch((err) => console.warn("Audio error:", err));
  } else {
    audio.pause();
  }
}

audio.addEventListener("play", () => {
  playBtn.textContent = "❚❚";
  vinyl.classList.add("playing");
});
audio.addEventListener("pause", () => {
  playBtn.textContent = "▶";
  vinyl.classList.remove("playing");
});
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = fmt(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  fill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  currentEl.textContent = fmt(audio.currentTime);
});
audio.addEventListener("ended", () => loadSong(current + 1, true));
audio.addEventListener("error", () =>
  console.warn("Fichier audio introuvable:", audio.src)
);

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => loadSong(current - 1, !audio.paused));
nextBtn.addEventListener("click", () => loadSong(current + 1, !audio.paused));

songItems.forEach((el) => {
  el.addEventListener("click", () => loadSong(Number(el.dataset.song), true));
});

track.addEventListener("click", (e) => {
  const rect = track.getBoundingClientRect();
  if (audio.duration) {
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  }
});

loadSong(0);
// ===== BIRTHDAY =====
const birthdayPage = document.getElementById("birthday");
const wishButton   = document.getElementById("wish-button");
const flame        = document.getElementById("candle-flame");
const wishText     = document.getElementById("birthday-wish");

function confettiBurst() {
  const symbols = ["♡", "✦", "✧", "❀", "✿", "♥"];
  const colors  = ["#d4788d", "#edb8c2", "#873b49", "#f0c36d", "#c88788"];

  for (let i = 0; i < 28; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    c.style.color = colors[Math.floor(Math.random() * colors.length)];
    c.style.fontSize = 12 + Math.random() * 18 + "px";
    c.style.setProperty("--x", Math.random() * 600 - 300 + "px");
    c.style.setProperty("--y", Math.random() * 400 - 280 + "px");
    c.style.setProperty("--r", Math.random() * 540 - 270 + "deg");
    birthdayPage.appendChild(c);
    setTimeout(() => c.remove(), 1700);
  }
}

if (wishButton) {
  wishButton.addEventListener("click", () => {
    wishButton.disabled = true;
    wishText.textContent = "Wish made... ♡";
    flame.classList.add("out");
    confettiBurst();

    setTimeout(() => birthdayPage.classList.add("wished"), 1200);
  });
}

// kat-3awd l-page jdida mlli t-rje3 liha
const _showScreen = showScreen;
showScreen = function (id) {
  _showScreen(id);
  if (id === "birthday" && birthdayPage.classList.contains("wished")) return; // khalli l-lettre
};
document.querySelectorAll(".hang-card").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("revealed"));
});