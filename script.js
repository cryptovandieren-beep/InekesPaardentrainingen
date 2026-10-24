// Mobile navigation and small page enhancements.
const menuToggle = document.querySelector(".menu-toggle");
const navigationLinks = document.querySelector(".nav-links");

// Open and close the small-screen navigation.
if (menuToggle && navigationLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigationLinks.classList.toggle("is-open", !isOpen);
  });

  // Close the menu after choosing a section.
  navigationLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      navigationLinks.classList.remove("is-open");
    }
  });

  // Also close the menu when returning to a wider layout.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      menuToggle.setAttribute("aria-expanded", "false");
      navigationLinks.classList.remove("is-open");
    }
  });
}

// Keep the copyright year current without editing the page each January.
const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

// Hide broken placeholder images while preserving their neutral background.
document.querySelectorAll(".hero-image, .about-photo").forEach((image) => {
  const hideMissingImage = () => image.classList.add("image-unavailable");
  image.addEventListener("error", hideMissingImage, { once: true });

  if (image.complete && image.naturalWidth === 0) {
    hideMissingImage();
  }
});

/* =========================
   HEADER VERKLEINT MEE MET SCROLLEN
========================= */

const header = document.querySelector(".site-header");

if (header) {
    function updateHeader() {

        // Mobiel behoudt het bestaande gedrag
        if (window.innerWidth <= 768) {
            header.classList.toggle("scrolled", window.scrollY > 1);
            return;
        }

        header.classList.remove("scrolled");

        // Maximaal 274 pixels verkleinen
        const scrollDistance = Math.min(
            Math.max(window.scrollY, 0), 274
        );

        const progress = scrollDistance / 274;

        // Hele witte header verkleinen
        header.style.setProperty(
            "--header-height",
            `${352 - scrollDistance}px`
        );

        // Paard + Ineke verkleinen
        header.style.setProperty(
            "--symbol-size",
            `${175 - 117 * progress}px`
        );

        // Tekstlogo verkleinen
        header.style.setProperty(
            "--wordmark-width",
            `${480 - 315 * progress}px`
        );
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    updateHeader();
}

