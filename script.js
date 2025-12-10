document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("nav-links");
  const hamburger = document.getElementById("hamburger");
  const contactForm = document.getElementById("contact-form");
  const yearEl = document.getElementById("year");
  const accordions = document.querySelectorAll(".accordion-item");

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
});

