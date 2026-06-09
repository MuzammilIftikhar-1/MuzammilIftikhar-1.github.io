/* ============================================================
   MUZAMMIL IFTIKHAR — PORTFOLIO · main.js
   Redesigned minimalistic SPA engine
   ============================================================ */

const siteData = window.siteData;

/* ── DOM References ────────────────────────────────────────── */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

const nav = $("#nav");
const navLogo = $("#navLogo");
const navLinks = $$(".nav__link");
const mainContent = $("#mainContent");
const pages = $$("[data-page]");
const cursorGlow = $("#cursorGlow");
const loader = $("#loader");
const loaderFill = $("#loaderFill");
const loaderText = $("#loaderText");

// Hero
const homeTitle = $("#homeTitle");
const homeSubtitle = $("#homeSubtitle");
const heroIntro = $("#heroIntro");
const heroActions = $("#heroActions");
const heroStats = $("#heroStats");
const heroBg = $("#heroBg");
const heroProfileImage = $("#heroProfileImage");

// About
const profileImage = $("#profileImage");
const aboutText = $("#aboutText");
const aboutStats = $("#aboutStats");
const aboutSections = $("#aboutSections");

// Portfolio
const portfolioTitle = $("#portfolioTitle");
const portfolioFilters = $("#portfolioFilters");
const projectVideo = $("#projectVideo");
const projectPoster = $("#projectPoster");
const videoFrame = $("#videoFrame") || $(".project-viewer__media");
const projectTitle = $("#projectTitle");
const projectTags = $("#projectTags");
const projectDescription = $("#projectDescription");
const projectLinks = $("#projectLinks");
const playButton = $("#playButton");
const playIcon = $("#playIcon");
const muteButton = $("#muteButton");
const muteIcon = $("#muteIcon");
const prevProjectButton = $("#prevProjectButton");
const nextProjectButton = $("#nextProjectButton");
const progressTrack = $(".progress-track");
const progressFill = $("#progressFill");
const durationText = $("#durationText");

// Contact
const contactGrid = $("#contactGrid");
const homeContactGrid = $("#homeContactGrid");

// Featured projects
const featuredList = $("#featuredList");

// Controls
const soundToggle = $("#soundToggle");
const soundIcon = $("#soundIcon");

// Footer
const footerLinks = $("#footerLinks");

/* ── State ─────────────────────────────────────────────────── */
const storageKeys = {
  theme: "muzammil-portfolio-theme",
  sound: "muzammil-portfolio-click-sound",
};

const validPages = ["home", "about", "portfolio", "contact"];
let audioContext;
let soundFileUnavailable = false;
let homeIntroToken = 0;
let slideshowTimer;
let slideshowImages = [];
let slideshowIndex = 0;
let slideshowPaused = false;
const storedSoundPreference = localStorage.getItem(storageKeys.sound);
const slideDuration = 3400;
const loadStartedAt = performance.now();

const state = {
  page: validPages.includes(location.hash.replace("#", ""))
    ? location.hash.replace("#", "")
    : "home",
  theme:
    localStorage.getItem(storageKeys.theme) ||
    siteData.theme.defaultTheme ||
    "blue",
  soundEnabled:
    storedSoundPreference === null ? false : storedSoundPreference === "true",
  category: siteData.defaultCategory || siteData.categories[0],
  project: null,
};


/* ── Helpers ───────────────────────────────────────────────── */
function setText(selector, value) {
  const el = $(selector);
  if (el) el.textContent = value;
}

function hexToRgb(hex) {
  const n = hex.replace("#", "").trim();
  if (n.length !== 6) return null;
  const v = Number.parseInt(n, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  return `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, "0")}`;
}

function formatStatValue(v, s = "") {
  return `${v}${s}`;
}

function isDirectVideoFile(path) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(path || "");
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}


/* ── Theme ─────────────────────────────────────────────────── */
function applyTheme(themeName) {
  const fallback = siteData.theme.defaultTheme || "blue";
  const theme = siteData.theme.colors[themeName] ? themeName : fallback;
  const color = siteData.theme.colors[theme] || "#4d79ff";
  const rgb = hexToRgb(color);

  document.documentElement.style.setProperty("--accent", color);
  if (rgb) {
    document.documentElement.style.setProperty("--accent-soft", `rgba(${rgb.r},${rgb.g},${rgb.b},0.10)`);
    document.documentElement.style.setProperty("--accent-line", `rgba(${rgb.r},${rgb.g},${rgb.b},0.25)`);
    document.documentElement.style.setProperty("--accent-glow", `rgba(${rgb.r},${rgb.g},${rgb.b},0.08)`);
  }

  $$("[data-theme]").forEach((b) => b.classList.toggle("is-active", b.dataset.theme === theme));
  state.theme = theme;
  localStorage.setItem(storageKeys.theme, theme);
}


/* ── Sound ─────────────────────────────────────────────────── */
function updateSoundUi() {
  if (soundToggle) soundToggle.checked = state.soundEnabled;
  if (soundIcon) soundIcon.textContent = state.soundEnabled ? "🔊" : "🔇";
  localStorage.setItem(storageKeys.sound, String(state.soundEnabled));
}

function synthClick() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  audioContext ||= new AC();
  const o = audioContext.createOscillator();
  const g = audioContext.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(520, audioContext.currentTime);
  o.frequency.exponentialRampToValueAtTime(360, audioContext.currentTime + 0.045);
  g.gain.setValueAtTime(0.08, audioContext.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.055);
  o.connect(g);
  g.connect(audioContext.destination);
  o.start();
  o.stop(audioContext.currentTime + 0.06);
}

function playClick() {
  if (!state.soundEnabled) return;
  if (!siteData.assets.clickSound || soundFileUnavailable) { synthClick(); return; }
  const a = new Audio(siteData.assets.clickSound);
  a.volume = 0.48;
  a.play().catch(() => { soundFileUnavailable = true; synthClick(); });
}


/* ── Navigation ────────────────────────────────────────────── */
function setPage(page, updateHash = true) {
  const next = validPages.includes(page) ? page : "home";
  state.page = next;

  pages.forEach((p) => p.classList.toggle("is-active", p.dataset.page === next));
  navLinks.forEach((l) => l.classList.toggle("is-active", l.dataset.route === next));
  $$(".mobile-nav__link").forEach((l) => l.classList.toggle("is-active", l.dataset.route === next));

  // Background
  if (heroBg) {
    heroBg.style.backgroundImage = `url("${siteData.assets.backgrounds[next] || siteData.assets.backgrounds.home}")`;
  }

  if (updateHash) {
    history.replaceState(null, "", next === "home" ? location.pathname : `#${next}`);
  }

  if (next === "portfolio") selectCategory(state.category);
  if (next === "about") animateAboutStats();
  if (next === "home") runHomeIntro();
  else showHomeIntroStatic();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "instant" });
}


/* ── Home Intro Typing ─────────────────────────────────────── */
function prepareHomeIntro() {
  homeIntroToken += 1;
  if (homeTitle) { homeTitle.textContent = ""; homeTitle.classList.remove("typing-text"); }
  if (homeSubtitle) { homeSubtitle.textContent = ""; homeSubtitle.classList.remove("typing-text"); }
}

function showHomeIntroStatic() {
  homeIntroToken += 1;
  homeTitle?.classList.remove("typing-text");
  homeSubtitle?.classList.remove("typing-text");
  if (homeTitle) homeTitle.textContent = siteData.person.name;
  if (homeSubtitle) homeSubtitle.textContent = siteData.person.title;
}

async function typeText(el, text, speed, token) {
  el.textContent = "";
  el.classList.add("typing-text");
  for (const ch of text) {
    if (token !== homeIntroToken || state.page !== "home") return false;
    el.textContent += ch;
    await wait(speed);
  }
  el.classList.remove("typing-text");
  return true;
}

async function runHomeIntro() {
  if (!homeTitle || !homeSubtitle || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showHomeIntroStatic();
    return;
  }
  const token = homeIntroToken + 1;
  homeIntroToken = token;
  homeSubtitle.textContent = "";

  const ok1 = await typeText(homeTitle, siteData.person.name, 55, token);
  if (!ok1) return;
  await wait(200);
  const ok2 = await typeText(homeSubtitle, siteData.person.title, 35, token);
  if (!ok2) return;
}


/* ── About Stats Animation ─────────────────────────────────── */
function animateAboutStats() {
  $$(".about-stat strong[data-target]").forEach((el) => {
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    const dur = 950;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatStatValue(Math.round(target * eased), p === 1 ? suffix : "");
      if (p < 1 && state.page === "about") requestAnimationFrame(tick);
      else el.textContent = formatStatValue(target, suffix);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  });
}


/* ── Portfolio / Projects ──────────────────────────────────── */
function projectMatchesCategory(proj, cat) {
  return cat === "All Projects" || proj.category === cat;
}

function getProjectForCategory(cat) {
  return siteData.projects.find((p) => projectMatchesCategory(p, cat));
}

function getProjectIndex(proj) {
  return siteData.projects.findIndex((p) => p.title === proj?.title);
}

function getProjectImages(proj) {
  const imgs = Array.isArray(proj.imagePaths) ? proj.imagePaths.filter(Boolean) : [];
  if (imgs.length) return imgs;
  return [proj.thumbnailPath, siteData.assets.backgrounds.portfolio, siteData.assets.backgrounds.home].filter(Boolean);
}

/* Slideshow */
function resetSlideshowProgress() {
  if (progressFill) { progressFill.style.transition = "none"; progressFill.style.width = "0"; }
}

function animateSlideshowProgress() {
  resetSlideshowProgress();
  if (slideshowPaused || slideshowImages.length <= 1) return;
  requestAnimationFrame(() => {
    progressFill.style.transition = `width ${slideDuration}ms linear`;
    progressFill.style.width = "100%";
  });
}

function stopImageSlideshow() {
  clearInterval(slideshowTimer);
  slideshowTimer = null;
  slideshowImages = [];
  slideshowIndex = 0;
  slideshowPaused = false;
  videoFrame?.classList.remove("has-slideshow");
  resetSlideshowProgress();
}

function showSlide(index, projectName) {
  if (!slideshowImages.length) return;
  slideshowIndex = index;
  projectPoster.classList.add("is-changing");
  setTimeout(() => {
    projectPoster.src = slideshowImages[slideshowIndex];
    projectPoster.alt = `${projectName} image ${slideshowIndex + 1}`;
    projectPoster.classList.remove("is-changing");
  }, 120);
  animateSlideshowProgress();
}

function queueNextSlide(projectName) {
  clearInterval(slideshowTimer);
  if (slideshowPaused || slideshowImages.length <= 1) return;
  slideshowTimer = setInterval(() => {
    showSlide((slideshowIndex + 1) % slideshowImages.length, projectName);
  }, slideDuration);
}

function startImageSlideshow(images, projectName) {
  stopImageSlideshow();
  slideshowImages = images;
  slideshowPaused = false;
  videoFrame.classList.remove("is-loading-video");
  videoFrame.classList.add("has-slideshow", "has-poster");
  playIcon.textContent = "❚❚";
  durationText.textContent = images.length > 1 ? "Images" : "Image";
  showSlide(0, projectName);
  queueNextSlide(projectName);
}

function toggleImageSlideshow() {
  if (!videoFrame.classList.contains("has-slideshow")) return false;
  slideshowPaused = !slideshowPaused;
  playIcon.textContent = slideshowPaused ? "▶" : "❚❚";
  if (slideshowPaused) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
    progressFill.style.transition = "none";
  } else {
    animateSlideshowProgress();
    queueNextSlide(state.project.title);
  }
  return true;
}

function resetVideoState() {
  stopImageSlideshow();
  projectVideo.pause();
  projectVideo.removeAttribute("src");
  projectVideo.load();
  progressFill.style.width = "0";
  durationText.textContent = "0:00";
  playIcon.textContent = "▶";
  muteIcon.textContent = projectVideo.muted ? "◕" : "●";
  videoFrame.classList.remove("has-fallback", "has-poster", "has-slideshow", "has-video", "is-loading-video");
}

function showActiveVideoFrame() {
  if (!projectVideo.videoWidth || !projectVideo.videoHeight || videoFrame.classList.contains("has-slideshow")) return;
  videoFrame.classList.add("has-video");
  videoFrame.classList.remove("has-poster", "has-fallback", "is-loading-video");
}

function renderProject(project) {
  resetVideoState();

  const fallback = {
    title: state.category,
    tags: "Coming Soon",
    description: "Projects coming soon for this category.",
    thumbnailPath: siteData.assets.backgrounds.portfolio || siteData.assets.backgrounds.home,
    videoPath: "",
  };

  const active = project || fallback;
  state.project = active;
  const images = getProjectImages(active);

  projectTitle.textContent = active.title;
  projectTags.textContent = active.tags;
  projectDescription.textContent = active.description;
  projectLinks.replaceChildren();
  projectPoster.src = images[0];
  projectPoster.alt = `${active.title} thumbnail`;
  videoFrame.classList.add("has-poster");

  if (!active.videoPath || active.videoAvailable === false) {
    startImageSlideshow(images, active.title);
    return;
  }

  projectVideo.src = active.videoPath;
  projectVideo.muted = true;
  videoFrame.classList.add("is-loading-video");
  projectVideo.load();
  projectVideo.play().catch(() => startImageSlideshow(images, active.title));
}

function selectCategory(category) {
  state.category = siteData.categories.includes(category) ? category : siteData.defaultCategory;
  const proj = getProjectForCategory(state.category);

  if (portfolioTitle) portfolioTitle.textContent = `Portfolio / ${state.category}`;
  $$("[data-category]").forEach((b) => b.classList.toggle("is-active", b.dataset.category === state.category));

  renderProject(proj);
}

function selectProject(project) {
  if (!project) return;
  state.category = project.category;
  if (portfolioTitle) portfolioTitle.textContent = `Portfolio / ${state.category}`;
  $$("[data-category]").forEach((b) => b.classList.toggle("is-active", b.dataset.category === state.category));
  renderProject(project);
}

function selectNextProject() {
  if (!siteData.projects.length) return;
  const i = getProjectIndex(state.project);
  selectProject(siteData.projects[i >= 0 ? (i + 1) % siteData.projects.length : 0]);
}

function selectPreviousProject() {
  if (!siteData.projects.length) return;
  const i = getProjectIndex(state.project);
  selectProject(siteData.projects[i >= 0 ? (i - 1 + siteData.projects.length) % siteData.projects.length : siteData.projects.length - 1]);
}


/* ── Rendering ─────────────────────────────────────────────── */
function createToolChip(tool, className = "tool-chip") {
  const item = document.createElement("span");
  item.className = className;

  if (className === "tool-chip") {
    const icon = document.createElement("span");
    icon.className = "tool-chip__icon";
    if (tool.iconPath) {
      const img = document.createElement("img");
      img.src = tool.iconPath;
      img.alt = "";
      img.loading = "lazy";
      icon.append(img);
    } else {
      icon.textContent = tool.icon || tool.label?.slice(0, 2) || "";
    }
    const label = document.createElement("span");
    label.className = "tool-chip__label";
    label.textContent = tool.label || tool;
    if (tool.key) item.dataset.tool = tool.key;
    item.append(icon, label);
    return item;
  }

  if (tool.iconPath) {
    const img = document.createElement("img");
    img.src = tool.iconPath;
    img.alt = tool.label || "";
    img.loading = "lazy";
    item.append(img);
  } else {
    item.textContent = tool.icon || tool.label?.slice(0, 2) || "";
  }
  item.title = tool.label;
  return item;
}

function createToolkitMarquee() {
  const marquee = document.createElement("div");
  marquee.className = "tool-marquee";
  marquee.setAttribute("aria-label", "Moving tool logos");
  const track = document.createElement("div");
  track.className = "tool-marquee__track";
  const tools = [...(siteData.about.toolkit || []), ...(siteData.about.toolkit || [])];
  tools.forEach((t) => track.append(createToolChip(t, "marquee-tool")));
  marquee.append(track);
  return marquee;
}

function createWorkExperienceCard(work) {
  const card = document.createElement("article");
  card.className = "work-card";

  const heading = document.createElement("div");
  heading.className = "work-card__heading";
  const title = document.createElement("h4");
  title.textContent = work.role || work.project || "Work Experience";
  const meta = document.createElement("p");
  meta.textContent = [work.company, work.period].filter(Boolean).join(" / ");
  heading.append(title, meta);
  card.append(heading);

  if (work.project) {
    const proj = document.createElement("p");
    proj.className = "work-card__project";
    proj.textContent = work.project;
    card.append(proj);
  }

  if (work.description) {
    const desc = document.createElement("p");
    desc.className = "work-card__description";
    desc.textContent = work.description;
    card.append(desc);
  }

  const actions = document.createElement("div");
  actions.className = "work-card__actions";

  if (work.videoPath && isDirectVideoFile(work.videoPath)) {
    const video = document.createElement("video");
    video.className = "work-card__video";
    video.src = work.videoPath;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    card.append(video);
  } else if (work.videoPath) {
    const link = document.createElement("a");
    link.className = "work-card__link";
    link.href = work.videoPath;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "Gameplay Preview";
    actions.append(link);
  }

  if (work.link) {
    const link = document.createElement("a");
    link.className = "work-card__link";
    link.href = work.link;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "Store Page";
    actions.append(link);
  }

  if (actions.children.length) card.append(actions);
  return card;
}

function renderCategories() {
  if (!portfolioFilters) return;
  portfolioFilters.replaceChildren();
  siteData.categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn sound-action";
    btn.dataset.category = cat;
    btn.setAttribute("role", "tab");
    btn.textContent = cat;
    portfolioFilters.append(btn);
  });
}

function resolveContactHref(link) {
  if (link.key === "email") return `mailto:${siteData.contact.email}`;
  return siteData.contact[link.key] || "#";
}

function buildContactCard(link) {
  const card = document.createElement("a");
  card.className = `contact-card contact-card--${link.key} sound-action`;
  card.href = resolveContactHref(link);
  if (!card.href.startsWith("mailto:")) {
    card.target = "_blank";
    card.rel = "noreferrer";
  }

  const icon = document.createElement("span");
  icon.className = "contact-icon";
  icon.textContent = link.icon;

  const body = document.createElement("div");
  body.className = "contact-card__body";
  const title = document.createElement("h3");
  title.textContent = link.title;
  const text = document.createElement("p");
  text.textContent = link.text;
  body.append(title, text);

  const action = document.createElement("span");
  action.className = "contact-action";
  action.textContent = `${link.action} →`;

  card.append(icon, body, action);
  return card;
}

function buildResumeCard() {
  const card = document.createElement("a");
  card.className = "contact-card contact-card--resume sound-action";
  card.href = siteData.contact.resumePath || "assets/docs/resume.pdf";
  card.download = "";
  card.target = "_blank";
  card.rel = "noreferrer";

  const icon = document.createElement("span");
  icon.className = "contact-icon";
  icon.textContent = "📄";

  const body = document.createElement("div");
  body.className = "contact-card__body";
  const title = document.createElement("h3");
  title.textContent = "Resume";
  const text = document.createElement("p");
  text.textContent = "Download my resume.";
  body.append(title, text);

  const action = document.createElement("span");
  action.className = "contact-action";
  action.textContent = "Download →";

  card.append(icon, body, action);
  return card;
}

function renderContactCards() {
  if (!contactGrid) return;
  contactGrid.replaceChildren();
  siteData.contact.links.forEach((link) => contactGrid.append(buildContactCard(link)));
  contactGrid.append(buildResumeCard());
}

function renderFeaturedProjects() {
  if (!featuredList) return;
  featuredList.replaceChildren();

  // Find all projects marked as featured in siteData
  let picks = siteData.projects
    .filter((p) => p.featured)
    .map((p) => {
      // Clean category label
      const label = p.category.replace(" Projects", "").replace("s", "");
      return { project: p, label };
    });

  // Fallback to picking one project from each main category if no featured projects are defined
  if (picks.length === 0) {
    const featuredCategories = [
      { cat: "Unreal Engine Projects", label: "Unreal Engine" },
      { cat: "UEFN Projects", label: "UEFN" },
      { cat: "Environments", label: "Environment" },
    ];
    picks = featuredCategories.map(({ cat, label }) => {
      const withVideo = siteData.projects.find((p) => p.category === cat && p.videoAvailable);
      const any = siteData.projects.find((p) => p.category === cat);
      return { project: withVideo || any, label };
    }).filter(({ project }) => project);
  }

  picks.forEach(({ project, label }, index) => {
    const row = document.createElement("div");
    row.className = "featured-row" + (index % 2 === 1 ? " featured-row--reverse" : "");

    // Media side
    const media = document.createElement("div");
    media.className = "featured-row__media";

    const images = getProjectImages(project);

    if (project.videoPath && project.videoAvailable) {
      const video = document.createElement("video");
      video.src = project.videoPath;
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.preload = "metadata";
      video.autoplay = false;
      media.append(video);

      // Poster fallback
      if (images[0]) {
        const poster = document.createElement("img");
        poster.src = images[0];
        poster.alt = `${project.title} thumbnail`;
        poster.loading = "lazy";
        media.append(poster);
      }

      // IntersectionObserver to autoplay when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(media);

    } else if (images[0]) {
      const img = document.createElement("img");
      img.src = images[0];
      img.alt = `${project.title} thumbnail`;
      img.loading = "lazy";
      media.append(img);
    }

    // Info side
    const info = document.createElement("div");
    info.className = "featured-row__info";

    const category = document.createElement("span");
    category.className = "featured-row__category";
    category.textContent = label;

    const title = document.createElement("h3");
    title.className = "featured-row__title";
    title.textContent = project.title;

    const tags = document.createElement("p");
    tags.className = "featured-row__tags";
    tags.textContent = project.tags;

    const desc = document.createElement("p");
    desc.className = "featured-row__desc";
    desc.textContent = project.description;

    info.append(category, title, tags, desc);
    row.append(media, info);
    featuredList.append(row);
  });
}

function renderFooterLinks() {
  if (!footerLinks) return;
  footerLinks.replaceChildren();

  siteData.contact.links.forEach((link) => {
    const a = document.createElement("a");
    a.className = "footer__link";
    a.href = resolveContactHref(link);
    a.textContent = link.title;
    if (!a.href.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noreferrer"; }
    footerLinks.append(a);
  });
}

function renderStaticContent() {
  document.title = `${siteData.person.name} | ${siteData.person.title}`;

  if (siteData.fonts?.body) document.documentElement.style.setProperty("--font-body", siteData.fonts.body);
  if (siteData.fonts?.display) document.documentElement.style.setProperty("--font-display", siteData.fonts.display);

  // Nav logo
  if (navLogo) navLogo.textContent = siteData.person.logoText;

  // Hero
  setText("#homeTitle", siteData.person.name);
  setText("#homeSubtitle", siteData.person.title);
  if (heroIntro) heroIntro.textContent = siteData.about.intro || "";
  if (heroProfileImage) {
    heroProfileImage.src = siteData.assets.profileImage;
    heroProfileImage.alt = `${siteData.person.name} profile image`;
  }

  // Hero background
  if (heroBg) heroBg.style.backgroundImage = `url("${siteData.assets.backgrounds.home}")`;

  // Hero stats
  if (heroStats) {
    heroStats.replaceChildren();
    siteData.about.stats?.forEach((stat) => {
      const wrap = document.createElement("div");
      wrap.className = "hero-stat";
      const val = document.createElement("span");
      val.className = "hero-stat__value";
      val.textContent = formatStatValue(stat.value, stat.suffix);
      const label = document.createElement("span");
      label.className = "hero-stat__label";
      label.textContent = stat.label;
      wrap.append(val, label);
      heroStats.append(wrap);
    });
  }

  // About
  if (profileImage) {
    profileImage.src = siteData.assets.profileImage;
    profileImage.alt = `${siteData.person.name} profile image`;
  }
  setText("#aboutTitle", siteData.about.heading);
  setText("#aboutText", siteData.about.text);

  // About stats
  if (aboutStats) {
    aboutStats.replaceChildren();
    siteData.about.stats?.forEach((stat) => {
      const item = document.createElement("span");
      item.className = "about-stat";
      const value = document.createElement("strong");
      value.textContent = "0";
      value.dataset.target = stat.value;
      value.dataset.suffix = stat.suffix || "";
      const label = document.createElement("span");
      label.textContent = stat.label;
      item.append(value, label);
      aboutStats.append(item);
    });
  }

  // About sections — skip "Experience" and render toolkit marquee directly (removing the collapsible details box)
  if (aboutSections) {
    aboutSections.replaceChildren();

    const toolkitWrapper = document.createElement("div");
    toolkitWrapper.className = "about-toolkit";

    const title = document.createElement("h3");
    title.className = "about-toolkit__title";
    title.textContent = "Creative Toolkit";

    toolkitWrapper.append(title, createToolkitMarquee());
    aboutSections.append(toolkitWrapper);
  }

  renderCategories();
  renderContactCards();
  renderFeaturedProjects();
  renderFooterLinks();
}


/* ── Video Controls ────────────────────────────────────────── */
function updateVideoProgress() {
  const d = projectVideo.duration;
  const c = projectVideo.currentTime;
  const pct = Number.isFinite(d) && d > 0 ? (c / d) * 100 : 0;
  progressFill.style.width = `${pct}%`;
  durationText.textContent = Number.isFinite(d) ? formatTime(d) : formatTime(c);
}


/* ── Event Listeners ───────────────────────────────────────── */

// Global click delegation
document.addEventListener("click", (e) => {
  const sound = e.target.closest(".sound-action");
  if (sound) playClick();

  const category = e.target.closest("[data-category]");
  if (category) { selectCategory(category.dataset.category); return; }

  const route = e.target.closest("[data-route]");
  if (route) { setPage(route.dataset.route); return; }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { /* nothing to close in the new design */ }
});

// Sound toggle
soundToggle?.addEventListener("change", () => {
  state.soundEnabled = soundToggle.checked;
  updateSoundUi();
  playClick();
});

// Theme buttons
$$("[data-theme]").forEach((b) => {
  b.addEventListener("click", () => applyTheme(b.dataset.theme));
});

// Play button
playButton?.addEventListener("click", () => {
  if (toggleImageSlideshow()) return;
  if (!projectVideo.src || videoFrame.classList.contains("has-fallback")) return;
  if (projectVideo.paused) projectVideo.play().catch(() => videoFrame.classList.add("has-fallback"));
  else projectVideo.pause();
});

// Mute button
muteButton?.addEventListener("click", () => {
  projectVideo.muted = !projectVideo.muted;
  muteIcon.textContent = projectVideo.muted ? "◕" : "●";
});

// Progress seek
progressTrack?.addEventListener("click", (e) => {
  if (!Number.isFinite(projectVideo.duration) || projectVideo.duration <= 0) return;
  const rect = progressTrack.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  projectVideo.currentTime = Math.max(0, Math.min(projectVideo.duration, ratio * projectVideo.duration));
});

// Project nav
prevProjectButton?.addEventListener("click", selectPreviousProject);
nextProjectButton?.addEventListener("click", selectNextProject);

// Contact form removed — contact is now link cards only

// Video events
projectVideo?.addEventListener("play", () => { playIcon.textContent = "❚❚"; });
projectVideo?.addEventListener("pause", () => { playIcon.textContent = "▶"; });
projectVideo?.addEventListener("timeupdate", updateVideoProgress);
projectVideo?.addEventListener("loadedmetadata", updateVideoProgress);
projectVideo?.addEventListener("loadeddata", showActiveVideoFrame);
projectVideo?.addEventListener("canplay", showActiveVideoFrame);
projectVideo?.addEventListener("waiting", () => {
  if (!videoFrame.classList.contains("has-slideshow")) videoFrame.classList.add("is-loading-video");
});
projectVideo?.addEventListener("playing", showActiveVideoFrame);
projectVideo?.addEventListener("error", () => {
  videoFrame.classList.remove("is-loading-video");
  if (state.project && !videoFrame.classList.contains("has-slideshow")) {
    startImageSlideshow(getProjectImages(state.project), state.project.title);
  } else {
    videoFrame.classList.add("has-fallback");
  }
});

// Hash change
window.addEventListener("hashchange", () => {
  setPage(location.hash.replace("#", ""), false);
});

// Cursor glow (desktop only)
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
    cursorGlow.classList.add("is-visible");
  });
  document.addEventListener("mouseleave", () => cursorGlow.classList.remove("is-visible"));
  document.addEventListener("mouseenter", () => cursorGlow.classList.add("is-visible"));
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  nav?.classList.toggle("is-scrolled", y > 20);
  lastScroll = y;
}, { passive: true });


/* ── Init ──────────────────────────────────────────────────── */
renderStaticContent();
applyTheme(state.theme);
updateSoundUi();
setPage(state.page, false);


/* ── Loader ────────────────────────────────────────────────── */
function hideLoader() {
  if (!loader) return;
  const elapsed = performance.now() - loadStartedAt;
  const remaining = Math.max(0, 1100 - elapsed);
  setTimeout(() => {
    if (loaderFill) loaderFill.style.width = "100%";
    if (loaderText) loaderText.textContent = "Ready";
    setTimeout(() => loader.classList.add("is-hidden"), 200);
    setTimeout(() => loader.remove(), 700);
  }, remaining);
}

if (loader) {
  let progress = 0;
  const progressTimer = setInterval(() => {
    progress = Math.min(progress + Math.ceil(Math.random() * 14), 96);
    if (loaderFill) loaderFill.style.width = `${progress}%`;
    if (progress >= 96) clearInterval(progressTimer);
  }, 100);

  window.addEventListener("load", () => {
    clearInterval(progressTimer);
    hideLoader();
  });

  setTimeout(hideLoader, 2400);
}
