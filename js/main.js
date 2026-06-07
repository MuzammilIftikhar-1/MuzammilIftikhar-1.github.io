const siteData = window.siteData;

const shell = document.querySelector("#siteShell");
const backgroundLayer = document.querySelector("#backgroundLayer");
const pages = [...document.querySelectorAll("[data-page]")];
const backButton = document.querySelector("#backButton");
const menuDropdown = document.querySelector("#menuDropdown");
const homeTitle = document.querySelector("#homeTitle");
const homeSubtitle = document.querySelector("#homeSubtitle");
const homeActions = document.querySelector(".home-actions");
const categoryDropdown = document.querySelector("#categoryDropdown");
const categoryList = document.querySelector("#categoryList");
const categoryLabel = document.querySelector("#categoryLabel");
const portfolioTitle = document.querySelector("#portfolioTitle");
const projectVideo = document.querySelector("#projectVideo");
const projectPoster = document.querySelector("#projectPoster");
const videoFrame = document.querySelector("#videoFrame");
const projectTitle = document.querySelector("#projectTitle");
const projectTags = document.querySelector("#projectTags");
const projectDescription = document.querySelector("#projectDescription");
const projectLinks = document.querySelector("#projectLinks");
const playButton = document.querySelector("#playButton");
const playIcon = document.querySelector("#playIcon");
const muteButton = document.querySelector("#muteButton");
const muteIcon = document.querySelector("#muteIcon");
const prevProjectButton = document.querySelector("#prevProjectButton");
const nextProjectButton = document.querySelector("#nextProjectButton");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progressFill");
const durationText = document.querySelector("#durationText");
const soundToggle = document.querySelector("#soundToggle");
const soundState = document.querySelector("#soundState");
const contactForm = document.querySelector("#contactForm");
const cursorRing = document.querySelector("#cursorRing");
const loadingScreen = document.querySelector("#loadingScreen");
const loaderProgress = document.querySelector("#loaderProgress");

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
  soundEnabled: storedSoundPreference === null ? false : storedSoundPreference === "true",
  category: siteData.defaultCategory || siteData.categories[0],
  project: null,
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function createToolChip(tool, className = "tool-chip") {
  const item = document.createElement("span");
  item.className = className;

  if (className === "tool-chip") {
    const icon = document.createElement("span");
    icon.className = "tool-chip__icon";

    if (tool.iconPath) {
      const image = document.createElement("img");
      image.src = tool.iconPath;
      image.alt = "";
      image.loading = "lazy";
      icon.append(image);
    } else {
      icon.textContent = tool.icon || tool.label?.slice(0, 2) || "";
    }

    const label = document.createElement("span");
    label.className = "tool-chip__label";
    label.textContent = tool.label || tool;

    if (tool.key) {
      item.dataset.tool = tool.key;
    }

    item.append(icon, label);
    return item;
  }

  if (tool.iconPath) {
    const image = document.createElement("img");
    image.src = tool.iconPath;
    image.alt = "";
    image.loading = "lazy";
    item.append(image);
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
  const marqueeTools = [...(siteData.about.toolkit || []), ...(siteData.about.toolkit || [])];
  marqueeTools.forEach((tool) => {
    track.append(createToolChip(tool, "marquee-tool"));
  });

  marquee.append(track);
  return marquee;
}

function formatStatValue(value, suffix = "") {
  return `${value}${suffix}`;
}

function isDirectVideoFile(path) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(path || "");
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
    const project = document.createElement("p");
    project.className = "work-card__project";
    project.textContent = work.project;
    card.append(project);
  }

  if (work.description) {
    const description = document.createElement("p");
    description.className = "work-card__description";
    description.textContent = work.description;
    card.append(description);
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
    const videoLink = document.createElement("a");
    videoLink.className = "work-card__link";
    videoLink.href = work.videoPath;
    videoLink.target = "_blank";
    videoLink.rel = "noreferrer";
    videoLink.textContent = "Gameplay Preview";
    actions.append(videoLink);
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

  if (actions.children.length) {
    card.append(actions);
  }

  return card;
}

function animateAboutStats() {
  const statValues = document.querySelectorAll(".about-stat strong[data-target]");
  statValues.forEach((valueElement) => {
    const target = Number(valueElement.dataset.target || 0);
    const suffix = valueElement.dataset.suffix || "";
    const duration = 950;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      valueElement.textContent = formatStatValue(value, progress === 1 ? suffix : "");

      if (progress < 1 && state.page === "about") {
        requestAnimationFrame(tick);
      } else {
        valueElement.textContent = formatStatValue(target, suffix);
      }
    };

    valueElement.textContent = formatStatValue(0, "");
    requestAnimationFrame(tick);
  });
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length !== 6) {
    return null;
  }

  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function applyTheme(themeName) {
  const fallback = siteData.theme.defaultTheme || "blue";
  const theme = siteData.theme.colors[themeName] ? themeName : fallback;
  const color = siteData.theme.colors[theme] || "#4f6fdc";
  const rgb = hexToRgb(color);

  [...shell.classList]
    .filter((className) => className.startsWith("theme-"))
    .forEach((className) => shell.classList.remove(className));
  shell.classList.add(`theme-${theme}`);
  shell.style.setProperty("--accent", color);

  if (rgb) {
    shell.style.setProperty("--accent-soft", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.14)`);
    shell.style.setProperty("--accent-line", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.34)`);
  }

  document.querySelectorAll("[data-theme]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === theme);
  });

  state.theme = theme;
  localStorage.setItem(storageKeys.theme, theme);
}

function updateSoundUi() {
  soundToggle.checked = state.soundEnabled;
  soundState.textContent = state.soundEnabled ? "On" : "Off";
  localStorage.setItem(storageKeys.sound, String(state.soundEnabled));
}

function synthClick() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    return;
  }

  audioContext ||= new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(360, audioContext.currentTime + 0.045);
  gain.gain.setValueAtTime(0.08, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.055);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.06);
}

function playClick() {
  if (!state.soundEnabled) {
    return;
  }

  if (!siteData.assets.clickSound || soundFileUnavailable) {
    synthClick();
    return;
  }

  const clickSound = new Audio(siteData.assets.clickSound);
  clickSound.volume = 0.48;
  clickSound.play().catch(() => {
    soundFileUnavailable = true;
    synthClick();
  });
}

function closeDropdowns() {
  document.querySelectorAll(".dropdown.is-open").forEach((dropdown) => {
    dropdown.classList.remove("is-open");
    const trigger = dropdown.querySelector(".dropdown__trigger");
    trigger?.setAttribute("aria-expanded", "false");
  });
}

function toggleDropdown(dropdown) {
  const isOpen = dropdown.classList.contains("is-open");
  closeDropdowns();
  dropdown.classList.toggle("is-open", !isOpen);
  dropdown.querySelector(".dropdown__trigger")?.setAttribute("aria-expanded", String(!isOpen));
}

function backgroundForPage(page) {
  return siteData.assets.backgrounds[page] || siteData.assets.backgrounds.home;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function prepareHomeIntro() {
  homeIntroToken += 1;

  if (homeTitle) {
    homeTitle.textContent = "";
    homeTitle.classList.remove("typing-text");
  }

  if (homeSubtitle) {
    homeSubtitle.textContent = "";
    homeSubtitle.classList.remove("typing-text");
  }

  homeActions?.classList.add("is-hidden");
}

function showHomeIntroStatic() {
  homeIntroToken += 1;
  homeTitle?.classList.remove("typing-text");
  homeSubtitle?.classList.remove("typing-text");

  if (homeTitle) {
    homeTitle.textContent = siteData.person.name;
  }

  if (homeSubtitle) {
    homeSubtitle.textContent = siteData.person.title;
  }

  homeActions?.classList.remove("is-hidden");
}

async function typeText(element, text, speed, token) {
  element.textContent = "";
  element.classList.add("typing-text");

  for (const character of text) {
    if (token !== homeIntroToken || state.page !== "home") {
      return false;
    }

    element.textContent += character;
    await wait(speed);
  }

  element.classList.remove("typing-text");
  return true;
}

async function runHomeIntro() {
  if (!homeTitle || !homeSubtitle || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showHomeIntroStatic();
    return;
  }

  const token = homeIntroToken + 1;
  homeIntroToken = token;
  homeActions?.classList.add("is-hidden");
  homeSubtitle.textContent = "";

  const titleDone = await typeText(homeTitle, siteData.person.name, 58, token);
  if (!titleDone) {
    return;
  }

  await wait(220);
  const subtitleDone = await typeText(homeSubtitle, siteData.person.title, 38, token);
  if (!subtitleDone) {
    return;
  }

  await wait(160);
  if (token === homeIntroToken && state.page === "home") {
    homeActions?.classList.remove("is-hidden");
  }
}

function setPage(page, updateHash = true) {
  const nextPage = validPages.includes(page) ? page : "home";
  state.page = nextPage;
  shell.dataset.view = nextPage;

  pages.forEach((pageElement) => {
    pageElement.classList.toggle("is-active", pageElement.dataset.page === nextPage);
  });

  backgroundLayer.style.backgroundImage = `url("${backgroundForPage(nextPage)}")`;

  if (nextPage === "portfolio") {
    backButton.innerHTML = "&larr; Back to Main Menu";
    selectCategory(state.category);
  } else if (nextPage === "contact") {
    backButton.innerHTML = "&larr; Back Home";
  } else {
    backButton.innerHTML = "&larr; Back to Home";
  }

  if (updateHash) {
    history.replaceState(null, "", nextPage === "home" ? location.pathname : `#${nextPage}`);
  }

  closeDropdowns();

  if (nextPage === "home") {
    runHomeIntro();
  } else {
    showHomeIntroStatic();
  }

  if (nextPage === "about") {
    animateAboutStats();
  }
}

function projectMatchesCategory(project, category) {
  return category === "All Projects" || project.category === category;
}

function getProjectForCategory(category) {
  return siteData.projects.find((project) => projectMatchesCategory(project, category));
}

function getProjectIndex(project) {
  return siteData.projects.findIndex((item) => item.title === project?.title);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function getProjectImages(project) {
  const images = Array.isArray(project.imagePaths)
    ? project.imagePaths.filter(Boolean)
    : [];

  if (images.length) {
    return images;
  }

  return [
    project.thumbnailPath,
    siteData.assets.backgrounds.portfolio,
    siteData.assets.backgrounds.home,
  ].filter(Boolean);
}

function resetSlideshowProgress() {
  progressFill.style.transition = "none";
  progressFill.style.width = "0";
}

function animateSlideshowProgress() {
  resetSlideshowProgress();

  if (slideshowPaused || slideshowImages.length <= 1) {
    return;
  }

  window.requestAnimationFrame(() => {
    progressFill.style.transition = `width ${slideDuration}ms linear`;
    progressFill.style.width = "100%";
  });
}

function stopImageSlideshow() {
  window.clearInterval(slideshowTimer);
  slideshowTimer = null;
  slideshowImages = [];
  slideshowIndex = 0;
  slideshowPaused = false;
  videoFrame.classList.remove("has-slideshow");
  resetSlideshowProgress();
}

function showSlide(index, projectName) {
  if (!slideshowImages.length) {
    return;
  }

  slideshowIndex = index;
  projectPoster.classList.add("is-changing");

  window.setTimeout(() => {
    projectPoster.src = slideshowImages[slideshowIndex];
    projectPoster.alt = `${projectName} image ${slideshowIndex + 1}`;
    projectPoster.classList.remove("is-changing");
  }, 120);

  animateSlideshowProgress();
}

function queueNextSlide(projectName) {
  window.clearInterval(slideshowTimer);

  if (slideshowPaused || slideshowImages.length <= 1) {
    return;
  }

  slideshowTimer = window.setInterval(() => {
    const nextIndex = (slideshowIndex + 1) % slideshowImages.length;
    showSlide(nextIndex, projectName);
  }, slideDuration);
}

function startImageSlideshow(images, projectName) {
  stopImageSlideshow();
  slideshowImages = images;
  slideshowPaused = false;
  videoFrame.classList.add("has-slideshow", "has-poster");
  playIcon.textContent = "❚❚";
  durationText.textContent = images.length > 1 ? "Images" : "Image";

  showSlide(0, projectName);
  queueNextSlide(projectName);
}

function toggleImageSlideshow() {
  if (!videoFrame.classList.contains("has-slideshow")) {
    return false;
  }

  slideshowPaused = !slideshowPaused;
  playIcon.textContent = slideshowPaused ? "▶" : "❚❚";

  if (slideshowPaused) {
    window.clearInterval(slideshowTimer);
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
  videoFrame.classList.remove("has-fallback", "has-poster", "has-slideshow");
}

function renderProject(project) {
  resetVideoState();

  const fallbackProject = {
    title: state.category,
    tags: "Coming Soon",
    description: "Add a project to this category in js/data/siteData.js when it is ready.",
    thumbnailPath: siteData.assets.backgrounds.portfolio || siteData.assets.backgrounds.home,
    videoPath: "",
  };

  const activeProject = project || fallbackProject;
  state.project = activeProject;
  const projectImages = getProjectImages(activeProject);

  projectTitle.textContent = activeProject.title;
  projectTags.textContent = activeProject.tags;
  projectDescription.textContent = activeProject.description;
  projectLinks.replaceChildren();
  projectPoster.src = projectImages[0];
  projectPoster.alt = `${activeProject.title} thumbnail`;
  videoFrame.classList.add("has-poster");

  if (!activeProject.videoPath || activeProject.videoAvailable === false) {
    startImageSlideshow(projectImages, activeProject.title);
    return;
  }

  projectVideo.src = activeProject.videoPath;
  projectVideo.muted = true;
  projectVideo.load();
  projectVideo.play().catch(() => {
    startImageSlideshow(projectImages, activeProject.title);
  });
}

function selectCategory(category) {
  state.category = siteData.categories.includes(category) ? category : siteData.defaultCategory;
  const selectedProject = getProjectForCategory(state.category);

  categoryLabel.textContent = state.category;
  portfolioTitle.textContent = `Portfolio / ${state.category}`;
  categoryList.querySelectorAll("[data-category]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.category === state.category);
  });

  renderProject(selectedProject);
}

function selectProject(project) {
  if (!project) {
    return;
  }

  state.category = project.category;
  categoryLabel.textContent = state.category;
  portfolioTitle.textContent = `Portfolio / ${state.category}`;
  categoryList.querySelectorAll("[data-category]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.category === state.category);
  });
  renderProject(project);
}

function selectNextProject() {
  if (!siteData.projects.length) {
    return;
  }

  const currentIndex = getProjectIndex(state.project);
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % siteData.projects.length : 0;
  selectProject(siteData.projects[nextIndex]);
}

function selectPreviousProject() {
  if (!siteData.projects.length) {
    return;
  }

  const currentIndex = getProjectIndex(state.project);
  const previousIndex =
    currentIndex >= 0
      ? (currentIndex - 1 + siteData.projects.length) % siteData.projects.length
      : siteData.projects.length - 1;
  selectProject(siteData.projects[previousIndex]);
}

function renderCategories() {
  categoryList.replaceChildren();
  siteData.categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dropdown__item sound-action";
    button.dataset.category = category;
    button.setAttribute("role", "option");
    button.textContent = category;
    categoryList.append(button);
  });
}

function resolveContactHref(link) {
  if (link.key === "email") {
    return `mailto:${siteData.contact.email}`;
  }

  return siteData.contact[link.key] || "#";
}

function renderContactCards() {
  const contactGrid = document.querySelector("#contactGrid");
  contactGrid.replaceChildren();

  siteData.contact.links.forEach((link) => {
    const card = document.createElement("a");
    card.className = `contact-card contact-card--${link.key} sound-action`;
    card.href = resolveContactHref(link);

    if (!card.href.startsWith("mailto:")) {
      card.target = "_blank";
      card.rel = "noreferrer";
    }

    const top = document.createElement("div");
    const icon = document.createElement("span");
    icon.className = "contact-icon";
    icon.textContent = link.icon;

    const title = document.createElement("h3");
    title.textContent = link.title;

    const text = document.createElement("p");
    text.textContent = link.text;

    top.append(icon, title, text);

    const action = document.createElement("span");
    action.className = "contact-action";
    action.textContent = `${link.action} \u2192`;

    card.append(top, action);
    contactGrid.append(card);
  });
}

function renderStaticContent() {
  document.title = `${siteData.person.name} | ${siteData.person.title}`;
  if (siteData.fonts?.body) {
    document.documentElement.style.setProperty("--sans", siteData.fonts.body);
  }

  if (siteData.fonts?.display) {
    document.documentElement.style.setProperty("--serif", siteData.fonts.display);
    document.documentElement.style.setProperty("--font-display", siteData.fonts.display);
  }

  document.querySelectorAll(".logo-button").forEach((button) => {
    button.textContent = siteData.person.logoText;
  });

  setText("#homeTitle", siteData.person.name);
  setText("#homeSubtitle", siteData.person.title);
  setText("#aboutTitle", siteData.about.heading);
  setText("#aboutText", siteData.about.text);
  setText("#profileCaption", siteData.person.profileLabel);

  const profileImage = document.querySelector("#profileImage");
  profileImage.src = siteData.assets.profileImage;
  profileImage.alt = `${siteData.person.name} profile image`;

  const aboutPage = document.querySelector("#aboutPage");
  const portrait = siteData.about.portrait || {};
  const portraitSettings = {
    "--about-portrait-opacity": portrait.opacity,
    "--about-portrait-zoom": portrait.zoom,
    "--about-portrait-right": portrait.rightOffset,
    "--about-portrait-top": portrait.topOffset,
    "--about-portrait-image-shift-y": portrait.imageShiftY,
    "--about-portrait-object-position": portrait.objectPosition,
    "--about-tool-icon-size": siteData.about.iconSize ? `${siteData.about.iconSize}px` : undefined,
    "--about-slider-icon-size": siteData.about.sliderIconSize ? `${siteData.about.sliderIconSize}px` : undefined,
  };

  Object.entries(portraitSettings).forEach(([property, value]) => {
    if (aboutPage && value !== undefined && value !== null && value !== "") {
      aboutPage.style.setProperty(property, String(value));
    }
  });

  const aboutStats = document.querySelector("#aboutStats");
  aboutStats?.replaceChildren();
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

  const aboutSections = document.querySelector("#aboutSections");
  aboutSections?.replaceChildren();
  siteData.about.sections?.forEach((section) => {
    const details = document.createElement("details");
    details.className = "about-detail";
    details.dataset.section = section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    details.open = Boolean(section.open);

    const summary = document.createElement("summary");
    summary.className = "sound-action";
    summary.textContent = section.title;

    const text = document.createElement("p");
    text.textContent = section.text;

    details.append(summary, text);

    if (Array.isArray(section.bullets) && section.bullets.length) {
      const list = document.createElement("ul");
      list.className = "about-detail__list";
      section.bullets.forEach((bullet) => {
        const item = document.createElement("li");
        item.textContent = bullet;
        list.append(item);
      });
      details.append(list);
    }

    if (Array.isArray(section.work) && section.work.length) {
      const workList = document.createElement("div");
      workList.className = "work-list";
      section.work.forEach((work) => {
        workList.append(createWorkExperienceCard(work));
      });
      details.append(workList);
    }

    if (section.showToolkit) {
      details.append(createToolkitMarquee());
    }

    aboutSections.append(details);
  });

  renderCategories();
  renderContactCards();
}

function updateVideoProgress() {
  const duration = projectVideo.duration;
  const current = projectVideo.currentTime;
  const percent = Number.isFinite(duration) && duration > 0 ? (current / duration) * 100 : 0;
  progressFill.style.width = `${percent}%`;
  durationText.textContent = Number.isFinite(duration) ? formatTime(duration) : formatTime(current);
}

document.addEventListener("click", (event) => {
  const soundTarget = event.target.closest(".sound-action");
  if (soundTarget) {
    playClick();
  }

  const trigger = event.target.closest(".dropdown__trigger");
  if (trigger) {
    toggleDropdown(trigger.closest(".dropdown"));
    return;
  }

  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    selectCategory(categoryButton.dataset.category);
    closeDropdowns();
    return;
  }

  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    setPage(routeButton.dataset.route);
    return;
  }

  if (!event.target.closest(".dropdown")) {
    closeDropdowns();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDropdowns();
  }
});

soundToggle.addEventListener("change", () => {
  state.soundEnabled = soundToggle.checked;
  updateSoundUi();
  playClick();
});

document.querySelectorAll("[data-theme]").forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.theme);
  });
});

playButton.addEventListener("click", () => {
  if (toggleImageSlideshow()) {
    return;
  }

  if (!projectVideo.src || videoFrame.classList.contains("has-fallback")) {
    return;
  }

  if (projectVideo.paused) {
    projectVideo.play().catch(() => videoFrame.classList.add("has-fallback"));
  } else {
    projectVideo.pause();
  }
});

muteButton.addEventListener("click", () => {
  projectVideo.muted = !projectVideo.muted;
  muteIcon.textContent = projectVideo.muted ? "◕" : "●";
});

progressTrack.addEventListener("click", (event) => {
  if (!Number.isFinite(projectVideo.duration) || projectVideo.duration <= 0) {
    return;
  }

  const rect = progressTrack.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / rect.width;
  projectVideo.currentTime = Math.max(0, Math.min(projectVideo.duration, ratio * projectVideo.duration));
});

prevProjectButton.addEventListener("click", selectPreviousProject);
nextProjectButton.addEventListener("click", selectNextProject);

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";
  const subject = encodeURIComponent(`Portfolio inquiry from ${name || "website visitor"}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:${siteData.contact.email}?subject=${subject}&body=${body}`;
});

if (cursorRing && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorRing.style.left = `${event.clientX}px`;
    cursorRing.style.top = `${event.clientY}px`;
    cursorRing.classList.add("is-visible");
  });

  window.addEventListener("pointerdown", () => cursorRing.classList.add("is-active"));
  window.addEventListener("pointerup", () => cursorRing.classList.remove("is-active"));
  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("button, a, input, textarea, label, .dropdown__item")) {
      cursorRing.classList.add("is-hovering");
    }
  });
  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("button, a, input, textarea, label, .dropdown__item")) {
      cursorRing.classList.remove("is-hovering");
    }
  });
  document.addEventListener("mouseleave", () => cursorRing.classList.remove("is-visible"));
  document.addEventListener("mouseenter", () => cursorRing.classList.add("is-visible"));
}

projectVideo.addEventListener("play", () => {
  playIcon.textContent = "❚❚";
});

projectVideo.addEventListener("pause", () => {
  playIcon.textContent = "▶";
});

projectVideo.addEventListener("timeupdate", updateVideoProgress);
projectVideo.addEventListener("loadedmetadata", updateVideoProgress);
projectVideo.addEventListener("error", () => {
  if (state.project && !videoFrame.classList.contains("has-slideshow")) {
    startImageSlideshow(getProjectImages(state.project), state.project.title);
  } else {
    videoFrame.classList.add("has-fallback");
  }
});

window.addEventListener("hashchange", () => {
  setPage(location.hash.replace("#", ""), false);
});

renderStaticContent();
applyTheme(state.theme);
updateSoundUi();
setPage(state.page, false);

function hideLoader() {
  if (!loadingScreen) {
    return;
  }

  const elapsed = performance.now() - loadStartedAt;
  const remaining = Math.max(0, 1250 - elapsed);

  window.setTimeout(() => {
    if (loaderProgress) {
      loaderProgress.textContent = "100%";
    }

    loadingScreen.classList.add("is-hidden");
    window.setTimeout(() => loadingScreen.remove(), 520);
  }, remaining);
}

if (loadingScreen) {
  let progress = 0;
  const progressTimer = window.setInterval(() => {
    progress = Math.min(progress + Math.ceil(Math.random() * 12), 96);
    if (loaderProgress) {
      loaderProgress.textContent = `${progress}%`;
    }

    if (progress >= 96) {
      window.clearInterval(progressTimer);
    }
  }, 110);

  window.addEventListener("load", () => {
    window.clearInterval(progressTimer);
    hideLoader();
  });

  window.setTimeout(hideLoader, 2600);
}
