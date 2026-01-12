document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("nav-links");
  const hamburger = document.getElementById("hamburger");
  const contactForm = document.getElementById("contact-form");
  const yearEl = document.getElementById("year");
  const accordions = document.querySelectorAll(".accordion-item");
  const themeToggle = document.getElementById("theme-toggle");

  // Theme Logic
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
    updateIcon(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      // Animate
      const icon = themeToggle.querySelector("svg");
      icon.classList.add("theme-animate");
      setTimeout(() => icon.classList.remove("theme-animate"), 500);

      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateIcon(isDark);
    });
  }

  function updateIcon(isDark) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("svg");
    if (isDark) {
      // Sun Icon
      icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
      // Moon Icon
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
  }

  yearEl.textContent = new Date().getFullYear();

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  if (navLinks) {
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") {
        navLinks.classList.remove("open");
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      console.log("Contact form submitted:", data);
      contactForm.reset();
    });
  }

  accordions.forEach((item) => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      const panel = document.getElementById(targetId);
      const icon = item.querySelector(".acc-icon");

      const isOpen = panel.classList.contains("show");

      document.querySelectorAll(".acc-panel").forEach((p) => p.classList.remove("show"));
      document.querySelectorAll(".acc-icon").forEach((ic) => (ic.textContent = "▾"));

      if (!isOpen) {
        panel.classList.add("show");
        icon.textContent = "▴";
      }
    });
  });

  // Apple-like Scroll Animations (Moved to top level)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(".hero-inner, .section-header, .project-card, .skill-block, .accordion-item, .contact-form");

  elementsToAnimate.forEach((el) => {
    el.classList.add("animate-entrance"); // Set initial invisible state
    observer.observe(el);
  });
});
