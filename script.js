const themeButton = document.querySelector("#theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const footerYear = document.querySelector("#footer-year");
const projectImages = document.querySelectorAll(".project-image");
const imageModal = document.querySelector("#image-modal");
const modalImage = document.querySelector("#modal-image");
const modalCaption = document.querySelector("#modal-caption");
const closeModalButton = document.querySelector("#close-modal");
let lastFocusedElement;

function setTheme(theme, savePreference = true) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  themeButton?.setAttribute("aria-pressed", String(isDark));
  themeButton?.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  themeColor?.setAttribute("content", isDark ? "#17211d" : "#f7f5ee");

  if (savePreference) localStorage.setItem("theme", theme);
}

function applyInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme || (prefersDark.matches ? "dark" : "light"), Boolean(savedTheme));
}

function closeImageModal() {
  if (!imageModal || imageModal.hidden) return;

  imageModal.hidden = true;
  modalImage.src = "";
  lastFocusedElement?.focus();
}

themeButton?.addEventListener("click", () => {
  setTheme(document.body.classList.contains("dark-theme") ? "light" : "dark");
});

prefersDark.addEventListener("change", (event) => {
  if (!localStorage.getItem("theme")) {
    setTheme(event.matches ? "dark" : "light", false);
  }
});

if (footerYear) {
  footerYear.textContent = `© ${new Date().getFullYear()} Mohd Umair · Built with care.`;
}

projectImages.forEach((image) => {
  image.setAttribute("tabindex", "0");
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Expand ${image.alt}`);

  const openImageModal = () => {
    if (!imageModal || !modalImage || !modalCaption) return;

    lastFocusedElement = document.activeElement;
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt;
    modalCaption.textContent = image.alt;
    imageModal.hidden = false;
    closeModalButton?.focus();
  };

  image.addEventListener("click", openImageModal);
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openImageModal();
    }
  });
});

closeModalButton?.addEventListener("click", closeImageModal);
imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal) closeImageModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeImageModal();
});

document.querySelector(".logo")?.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { threshold: 0.35 },
);

sections.forEach((section) => observer.observe(section));
applyInitialTheme();
