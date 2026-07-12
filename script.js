(() => {
  const doc = document.documentElement;
  const header = document.getElementById("site-header");
  const nav = document.getElementById("primary-nav");
  const toggle = document.querySelector(".nav-toggle");
  const themeBtn = document.querySelector(".theme-toggle");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  // Theme
  const stored = localStorage.getItem("ew-theme");
  if (stored === "light" || stored === "dark") {
    doc.setAttribute("data-theme", stored);
  }
  themeBtn?.addEventListener("click", () => {
    const next = doc.getAttribute("data-theme") === "light" ? "dark" : "light";
    doc.setAttribute("data-theme", next);
    localStorage.setItem("ew-theme", next);
  });

  // Mobile nav
  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", "Open menu");
    });
  });

  // Sticky header state
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Active nav section
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...(nav?.querySelectorAll('a[href^="#"]') || [])];
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const map = new Map(navLinks.map((a) => [a.getAttribute("href")?.slice(1), a]));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((l) => l.classList.remove("is-active"));
          map.get(entry.target.id)?.classList.add("is-active");
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach((s) => io.observe(s));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealIo = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => revealIo.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Availability: flip data-availability on .availability-pill / .availability-inline
  // to "booked" when fully booked. Optional helper:
  // window.setAvailability("open" | "booked")
  window.setAvailability = (state) => {
    const value = state === "booked" ? "booked" : "open";
    document.querySelectorAll("[data-availability]").forEach((el) => {
      el.setAttribute("data-availability", value);
      if (el.classList.contains("availability-pill")) {
        const text = el.querySelector(".availability-text");
        if (text) text.textContent = value === "booked" ? "Booked" : "Available";
      }
      const label = el.querySelector(".availability-label");
      if (label) {
        label.textContent =
          value === "booked"
            ? "Currently fully booked"
            : "Currently accepting new projects";
      }
    });
  };

  // Contact form: if Formspree placeholder remains, fall back to mailto
  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (e) => {
    const action = form.getAttribute("action") || "";
    if (action.includes("YOUR_FORM_ID")) {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const message = data.get("message") || "";
      const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
      window.location.href = `mailto:everettwong.studio@gmail.com?subject=${encodeURIComponent("Website inquiry")}&body=${body}`;
    }
  });
})();
