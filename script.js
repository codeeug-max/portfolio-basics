
/* Year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Copy email */
const copyBtn = document.getElementById('copyBtn');
const copyNote = document.getElementById('copyNote');
copyBtn?.addEventListener('click', async () => {
  const email = document.getElementById('emailText').textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
    copyNote.textContent = 'Email copied to clipboard!';
  } catch {
    copyNote.textContent = 'Copy failed. Long-press to select.';
  }
  setTimeout(() => copyNote.textContent = '', 2500);
});

/* Contact form (demo-only) */
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = 'Thanks! Your message has been captured locally (demo).';
  setTimeout(() => note.textContent = '', 3000);
});

/* Animate skill meters when in view */
const meters = document.querySelectorAll('.meter');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.val || 0);
    const ring = el.querySelector('.meter-ring');
    const val = el.querySelector('.meter-val');

    let cur = 0;
    const step = () => {
      cur += Math.max(1, Math.round((target - cur) / 10));
      ring.style.setProperty('--val', cur); // percentage for conic fill
      val.textContent = cur + '%';
      if (cur < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    obs.unobserve(el);
  });
}, { threshold: 0.25 });

meters.forEach(m => obs.observe(m));

// NAV HAMBURGER
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('is-open');
  // ...
});


  // Optional: close menu when a link is clicked (better UX on mobile)
  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    }
  });


// THEME SWITCH (supports multiple toggles)
(function () {
  const root = document.documentElement;
  const toggles = document.querySelectorAll('input[data-theme-toggle]');
  if (!toggles.length) return;

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    toggles.forEach((t) => {
      t.checked = theme === 'dark';
    });
  };

  // 1. Load saved theme or default
  const stored = localStorage.getItem('theme');
  let initialTheme;

  if (stored === 'light' || stored === 'dark') {
    initialTheme = stored;
  } else {
    initialTheme = 'dark'; // default
  }

  applyTheme(initialTheme);

  // 2. Listen to changes on any toggle
  toggles.forEach((toggle) => {
    toggle.addEventListener('change', () => {
      const nextTheme = toggle.checked ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  });
})();

// ++++++++++++++++++++++++++++++++++++++++++++++Modal=++++++++++++++

// Image modal viewer
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("imgModalContent");
const closeBtn = document.querySelector(".img-modal-close");

// Select all logos
const logos = document.querySelectorAll(".edu-logo");

// When logo clicked -> open modal
logos.forEach(logo => {
  logo.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = logo.src;
  });
});

// Close when clicking X
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close when clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});




