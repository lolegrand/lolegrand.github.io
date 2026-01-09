// Portfolio static — interactions (no build tools required)
(() => {
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  // Cursor glow variables
  if (!reduced) {
    window.addEventListener("pointermove", (e) => {
      const mx = Math.max(0, Math.min(100, (e.clientX / window.innerWidth) * 100));
      const my = Math.max(0, Math.min(100, (e.clientY / window.innerHeight) * 100));
      document.documentElement.style.setProperty("--mx", mx + "%");
      document.documentElement.style.setProperty("--my", my + "%");
    });
  }

  // Smooth scroll + close mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  const closeMenu = () => {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", expanded ? "false" : "true");
      mobileMenu.hidden = expanded;
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (mobileMenu.hidden) return;
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("#mobileMenu") || t.closest("#menuBtn")) return;
      closeMenu();
    });
  }

  const scrollToId = (id) => {
    const targetId = id === "top" ? "top" : id;
    const el = document.getElementById(targetId);
    if (!el) return;
    closeMenu();
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-scroll");
      if (id) scrollToId(id);
    });
  });

  // Reveal on scroll
  if (!reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
  }

  // Magnetic hover (subtle)
  const strength = 0.15;
  document.querySelectorAll(".magnetic").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;

    const move = (ev) => {
      if (reduced) return;
      const r = el.getBoundingClientRect();
      const dx = ev.clientX - (r.left + r.width / 2);
      const dy = ev.clientY - (r.top + r.height / 2);
      el.style.setProperty("--tx", (dx * strength).toFixed(2) + "px");
      el.style.setProperty("--ty", (dy * strength).toFixed(2) + "px");
    };

    const reset = () => {
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
  });

  // Card radial highlight follows cursor inside card
  document.querySelectorAll(".card").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    el.addEventListener("mousemove", (ev) => {
      const r = el.getBoundingClientRect();
      const x = ((ev.clientX - r.left) / r.width) * 100;
      const y = ((ev.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--cx", x.toFixed(2) + "%");
      el.style.setProperty("--cy", y.toFixed(2) + "%");
    });
  });
})();
