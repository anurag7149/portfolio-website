(function () {
  const themeScriptUrl = document.currentScript?.src || document.baseURI;
  const siteRootUrl = new URL(".", themeScriptUrl);

  const storageKey = "anurag-portfolio-theme";
  const root = document.documentElement;

  const icons = {
    portfolio: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 4V2h8v2M8 10h8M8 15h5"/></svg>',
    about: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 21c.7-4.2 3.2-6.3 7.5-6.3s6.8 2.1 7.5 6.3"/></svg>',
    contact: '<svg viewBox="0 0 24 24"><path d="M4 5.5h16v12H8l-4 3v-15Z"/><path d="m5 7 7 5 7-5"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z"/></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M4 20h16"/></svg>'
  };

  function readTheme() {
    try { return localStorage.getItem(storageKey) === "dark" ? "dark" : "light"; }
    catch (_) { return "light"; }
  }

  function applyTheme(theme) {
    const next = theme === "dark" ? "dark" : "light";
    root.dataset.theme = next;
    root.style.colorScheme = next;

    document.querySelectorAll("[data-theme-toggle]").forEach(function (control) {
      control.setAttribute("aria-label", "Switch to " + (next === "dark" ? "light" : "dark") + " theme");
      control.setAttribute("aria-pressed", String(next === "dark"));
    });

    document.querySelectorAll("[data-mobile-theme-icon]").forEach(function (icon) {
      icon.innerHTML = next === "dark" ? icons.sun : icons.moon;
    });
    document.querySelectorAll("[data-mobile-theme-label]").forEach(function (label) {
      label.textContent = next === "dark" ? "Light" : "Dark";
    });

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", next === "dark" ? "#0b0d10" : "#f8f8fa");
  }

  function toggleTheme() {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(storageKey, next); } catch (_) {}
    applyTheme(next);
  }

  function addDesktopToggle() {
    document.querySelectorAll("header .nav-resume").forEach(function (resume) {
      const nav = resume.parentElement;
      if (!nav.querySelector("a.nav-contact")) {
        const contact = document.createElement("a");
        contact.href = new URL("connect/", siteRootUrl).href;
        contact.className = "nav-contact";
        contact.textContent = "Contact";
        if (sitePath().indexOf("/connect") === 0) contact.setAttribute("aria-current", "page");
        nav.insertBefore(contact, resume);
      }
      if (resume.parentElement.querySelector(".theme-toggle")) return;
      const button = document.createElement("button");
      button.className = "theme-toggle";
      button.type = "button";
      button.setAttribute("data-theme-toggle", "");
      button.innerHTML = '<span class="theme-toggle__option theme-toggle__dark" aria-hidden="true">' + icons.moon + '<small>Dark</small></span><span class="theme-toggle__option theme-toggle__light" aria-hidden="true">' + icons.sun + '<small>Light</small></span>';
      button.addEventListener("click", toggleTheme);
      resume.insertAdjacentElement("afterend", button);
    });
  }

  function sitePath() {
    const basePath = siteRootUrl.pathname;
    const siteRoot = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
    return window.location.pathname.slice(siteRoot.length) || "/";
  }

  function activeSection() {
    const path = sitePath();
    if (path.indexOf("/portfolio") === 0) return "portfolio";
    if (path.indexOf("/about") === 0) return "about";
    if (path.indexOf("/connect") === 0) return "contact";
    return "";
  }

  function addMobileDock() {
    if (document.querySelector(".mobile-dock")) return;
    const active = activeSection();
    const dock = document.createElement("nav");
    dock.className = "mobile-dock";
    dock.setAttribute("aria-label", "Mobile navigation");
    dock.innerHTML =
      '<a class="mobile-dock__item" data-dock="portfolio" href="' + new URL("portfolio/", siteRootUrl).href + '">' + icons.portfolio + '<span>Portfolio</span></a>' +
      '<a class="mobile-dock__item" data-dock="about" href="' + new URL("about/", siteRootUrl).href + '">' + icons.about + '<span>About</span></a>' +
      '<a class="mobile-dock__item mobile-dock__item--primary" data-dock="contact" href="' + new URL("connect/", siteRootUrl).href + '">' + icons.contact + '<span>Contact</span></a>' +
      '<button class="mobile-dock__item" type="button" data-theme-toggle><span data-mobile-theme-icon></span><span data-mobile-theme-label>Dark</span></button>' +
      '<a class="mobile-dock__item" href="' + new URL("assets/Anurag_Yadav_Resume.pdf", siteRootUrl).href + '" download>' + icons.download + '<span>CV</span></a>';

    const current = dock.querySelector('[data-dock="' + active + '"]');
    if (current) current.setAttribute("aria-current", "page");
    dock.querySelector("[data-theme-toggle]").addEventListener("click", toggleTheme);
    document.body.appendChild(dock);
  }

  applyTheme(readTheme());
  document.addEventListener("DOMContentLoaded", function () {
    // A separate decorative layer avoids replacing existing card pseudo-elements.
    const glowStyle = document.createElement('link');
    glowStyle.rel = 'stylesheet';
    glowStyle.href = new URL('edge-light.css', themeScriptUrl).href;
    document.head.appendChild(glowStyle);
    requestAnimationFrame(() => {
      const selector = '.project-cover,.metric-card,.profile-card,.compact-engagements > a,.contact-tile,.contact-form,.contact-tile__icon,.sm-capability,.sm-process-card,.sm-browser,.sm-video-card,.sm-ad-grid > *, .tm-browser,.tm-foundation-grid > *, .tm-outcome-grid > *, .tm-impact-boards > *, .toj-brand-card,.social-tile,.video-card,.toj-application-grid > *, .case-shot,.case-image-stage,.case-reflection-grid > *, .case-documentation-grid > *, .aq-cover,.aq-system-grid > *, .aq-packaging > figure';
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('edge-light-visible', entry.isIntersecting));
      }, {rootMargin:'30px',threshold:0});
      document.querySelectorAll(selector).forEach((card,index) => {
        if (['IMG','VIDEO','IFRAME'].includes(card.tagName)) return;
        card.classList.add('edge-light-card');
        const edge=document.createElement('span');
        edge.className='edge-light';
        edge.setAttribute('aria-hidden','true');
        edge.style.setProperty('--edge-delay', `${-(index % 7) * 1.7}s`);
        card.appendChild(edge);
        observer.observe(card);
      });
    });

    const ambience = document.createElement('div');
    ambience.className = 'site-ambience';
    ambience.setAttribute('aria-hidden', 'true');
    const video = document.createElement('video');
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.tabIndex = -1;
    ambience.appendChild(video);
    document.body.prepend(ambience);
    document.body.classList.add('has-ambience');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const motionButton = document.createElement('button');
    motionButton.className = 'ambient-control';
    motionButton.type = 'button';
    let paused = false;
    try { paused = sessionStorage.getItem('ambient-paused') === 'true'; } catch (_) {}
    function syncAmbient() {
      const disabled = paused || reducedMotion.matches || navigator.connection?.saveData;
      motionButton.textContent = disabled ? 'Play background' : 'Pause background';
      motionButton.setAttribute('aria-pressed', String(!disabled));
      if (disabled || document.hidden) { video.pause(); return; }
      if (!video.getAttribute('src')) video.src = new URL('assets/ambient-wave.mp4', siteRootUrl).href;
      video.play().catch(() => { paused = true; motionButton.textContent = 'Play background'; motionButton.setAttribute('aria-pressed', 'false'); });
    }
    motionButton.addEventListener('click', () => {
      paused = !paused;
      try { sessionStorage.setItem('ambient-paused', String(paused)); } catch (_) {}
      syncAmbient();
    });
    document.body.appendChild(motionButton);
    reducedMotion.addEventListener('change', syncAmbient);
    document.addEventListener('visibilitychange', syncAmbient);
    syncAmbient();
    addDesktopToggle();
    addMobileDock();
    const cards = document.querySelectorAll('.portfolio-rail .project-cover');
    if ('IntersectionObserver' in window && cards.length) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || entry.target.classList.contains('is-revealed')) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.38 });
      cards.forEach(function (card) { observer.observe(card); });
    } else {
      cards.forEach(function (card) { card.classList.add('is-revealed'); });
    }
    applyTheme(readTheme());
  });
})();
