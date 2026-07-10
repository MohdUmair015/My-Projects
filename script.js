const themeButton = document.querySelector("#theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
let savedTheme = localStorage.getItem("theme");
const footerYear = document.querySelector("#footer-year");

function setTheme(theme) {
  document.body.classList.toggle("dark-theme", theme === "dark");
  localStorage.setItem("theme", theme);
}

function applyInitialTheme() {
  const theme = savedTheme || (prefersDark.matches ? "dark" : "light");
  setTheme(theme);
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("dark-theme")
    ? "light"
    : "dark";
  setTheme(nextTheme);
}

if (themeButton) themeButton.addEventListener("click", toggleTheme);
if (prefersDark)
  prefersDark.addEventListener("change", (event) => {
    if (!localStorage.getItem("theme")) {
      setTheme(event.matches ? "dark" : "light");
    }
  });
if (footerYear) {
  footerYear.innerHTML = `
    © ${new Date().getFullYear()} Mohd Umair
    <br>
    Designed and developed by Mohd Umair.
  `;
}
applyInitialTheme();

// IMAGE VIEWER

const projectImages = document.querySelectorAll(".project-image");

const imageModal = document.querySelector("#image-modal");

const modalImage = document.querySelector("#modal-image");

const modalCaption = document.querySelector("#modal-caption");

const closeModal = document.querySelector("#close-modal");

projectImages.forEach(function (image) {
  image.addEventListener("click", function () {
    modalImage.src = image.src;

    modalCaption.textContent = image.alt;

    imageModal.style.display = "flex";
  });
});

closeModal.addEventListener("click", function () {
  imageModal.style.display = "none";
});

imageModal.addEventListener("click", function (event) {
  if (event.target === imageModal) {
    imageModal.style.display = "none";
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    imageModal.style.display = "none";
  }
});

document.querySelector(".logo")?.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

/* ======================================================
   Active Navigation
====================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    threshold: 0.35,
  },
);

sections.forEach((section) => observer.observe(section));
