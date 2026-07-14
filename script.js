(() => {
  const doc = document.documentElement;
  const header = document.getElementById("site-header");
  const nav = document.getElementById("primary-nav");
  const toggle = document.querySelector(".nav-toggle");
  const year = document.getElementById("year");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (year) year.textContent = String(new Date().getFullYear());

  // Theme (persisted). Light kept as a supported option — not removed (§13 deferred).
  const stored = localStorage.getItem("ew-theme");
  if (stored === "light" || stored === "dark") {
    doc.setAttribute("data-theme", stored);
  }
  const themeBtn = document.querySelector(".theme-toggle");
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

  // Sticky header + reading progress
  const progressBar = document.getElementById("read-progress-bar");
  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    if (progressBar) {
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      progressBar.style.width = `${pct}%`;
    }
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
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
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
  }

  // Skhedule evidence stage sync
  const evidenceSteps = [...document.querySelectorAll(".evidence-step")];
  const evidenceFrames = [...document.querySelectorAll(".evidence-frame")];
  const setEvidenceStage = (stage) => {
    evidenceSteps.forEach((step) => {
      step.classList.toggle("is-active", step.getAttribute("data-stage") === stage);
    });
    evidenceFrames.forEach((frame) => {
      frame.classList.toggle("is-active", frame.getAttribute("data-stage") === stage);
    });
    document.querySelectorAll(".evidence-stage-dot").forEach((dot) => {
      dot.classList.toggle("is-active", dot.getAttribute("data-stage") === stage);
    });
  };
  if (evidenceSteps.length && "IntersectionObserver" in window) {
    const stepIo = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const stage = visible.target.getAttribute("data-stage");
        if (stage) setEvidenceStage(stage);
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: [0.15, 0.4, 0.65] }
    );
    evidenceSteps.forEach((step) => stepIo.observe(step));
  }
  document.querySelectorAll(".evidence-stage-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const stage = dot.getAttribute("data-stage");
      const step = document.querySelector(`.evidence-step[data-stage="${stage}"]`);
      if (!stage || !step) return;
      setEvidenceStage(stage);
      step.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
  });

  // Availability
  window.setAvailability = (state) => {
    const value = state === "booked" ? "booked" : "open";
    document.querySelectorAll("[data-availability]").forEach((el) => {
      el.setAttribute("data-availability", value);
      if (el.classList.contains("availability-pill")) {
        const text = el.querySelector(".availability-text");
        if (text) text.textContent = value === "booked" ? "Not seeking" : "Open to roles";
      }
      const label = el.querySelector(".availability-label");
      if (label) {
        label.textContent =
          value === "booked"
            ? "Not currently seeking new opportunities"
            : "Open to internships and professional opportunities";
      }
    });
  };

  // Copy email
  document.querySelectorAll("[data-email]").forEach((btn) => {
    const idle = btn.textContent.trim();
    btn.addEventListener("click", async () => {
      const email = btn.getAttribute("data-email");
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        btn.textContent = "Copied!";
        btn.setAttribute("aria-live", "polite");
      } catch {
        window.prompt("Copy this email address:", email);
        btn.textContent = "Copy email";
        return;
      }
      window.setTimeout(() => {
        btn.textContent = idle;
      }, 2000);
    });
  });

  // Command palette
  const palette = document.getElementById("cmd-palette");
  const cmdInput = document.getElementById("cmd-input");
  const cmdList = document.getElementById("cmd-list");
  const commands = [
    { label: "Projects", hint: "Selected work", href: "#projects", keywords: "work portfolio" },
    { label: "Skhedule", hint: "Featured case", href: "#skhedule", keywords: "app invite capacity" },
    { label: "MMET 281 case", hint: "Process & materials", href: "case-mmet281.html", keywords: "hinge dfm fusion" },
    { label: "Experience", hint: "Roles", href: "#experience", keywords: "work jobs" },
    { label: "Skills", hint: "Tools", href: "#skills", keywords: "cad manufacturing" },
    { label: "About", hint: "Bio", href: "#about", keywords: "who me mmet" },
    { label: "Contact", hint: "Email / LinkedIn", href: "#contact", keywords: "hire internship" },
    { label: "Résumé", hint: "PDF download", href: "assets/img/Everett-Wong-Resume.pdf", keywords: "cv download", download: "Everett-Wong-Resume.pdf" },
    { label: "LinkedIn", hint: "Profile", href: "https://www.linkedin.com/in/everett-wong-8390b1276", keywords: "network", external: true },
    { label: "Live Skhedule", hint: "skhedule.vercel.app", href: "https://skhedule.vercel.app", keywords: "demo", external: true },
  ];
  let cmdIndex = 0;
  let filtered = commands;

  const renderCommands = (query = "") => {
    if (!cmdList) return;
    const q = query.trim().toLowerCase();
    filtered = commands.filter((c) => {
      if (!q) return true;
      return `${c.label} ${c.hint} ${c.keywords}`.toLowerCase().includes(q);
    });
    cmdIndex = 0;
    cmdList.innerHTML = filtered.length
      ? filtered
          .map(
            (c, i) =>
              `<li><button type="button" class="cmd-item${i === 0 ? " is-active" : ""}" role="option" data-i="${i}">
                <span>${c.label}</span>
                <span class="cmd-item-hint">${c.hint}</span>
              </button></li>`
          )
          .join("")
      : `<li><button type="button" class="cmd-item" disabled>No matches</button></li>`;
  };

  const openPalette = () => {
    if (!palette) return;
    palette.hidden = false;
    document.body.classList.add("cmd-open");
    renderCommands("");
    if (cmdInput) cmdInput.value = "";
    window.setTimeout(() => cmdInput?.focus(), 10);
  };
  const closePalette = () => {
    if (!palette) return;
    palette.hidden = true;
    document.body.classList.remove("cmd-open");
  };
  const runCommand = (cmd) => {
    if (!cmd) return;
    closePalette();
    if (cmd.download) {
      const a = document.createElement("a");
      a.href = cmd.href;
      a.download = cmd.download;
      a.type = "application/pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    if (cmd.external) {
      window.open(cmd.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (cmd.href.startsWith("#")) {
      document.querySelector(cmd.href)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    window.location.href = cmd.href;
  };
  const paintActive = () => {
    cmdList?.querySelectorAll(".cmd-item").forEach((el, i) => {
      el.classList.toggle("is-active", i === cmdIndex);
    });
  };

  document.addEventListener("keydown", (e) => {
    const metaK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
    if (metaK) {
      e.preventDefault();
      if (palette?.hidden === false) closePalette();
      else openPalette();
      return;
    }
    if (palette?.hidden !== false) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!filtered.length) return;
      cmdIndex = (cmdIndex + 1) % filtered.length;
      paintActive();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!filtered.length) return;
      cmdIndex = (cmdIndex - 1 + filtered.length) % filtered.length;
      paintActive();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(filtered[cmdIndex]);
    }
  });

  cmdInput?.addEventListener("input", () => renderCommands(cmdInput.value));
  cmdList?.addEventListener("click", (e) => {
    const btn = e.target.closest(".cmd-item");
    if (!btn || btn.disabled) return;
    runCommand(filtered[Number(btn.getAttribute("data-i"))]);
  });
  palette?.querySelector("[data-cmd-close]")?.addEventListener("click", closePalette);

  const kbd = document.querySelector(".cmd-kbd");
  if (kbd && !(/Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent))) {
    kbd.textContent = "Ctrl K";
  }
})();
