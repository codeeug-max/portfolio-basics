
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
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open");
  });

  // Optional: close menu when a link is clicked (better UX on mobile)
  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    }
  });
}

