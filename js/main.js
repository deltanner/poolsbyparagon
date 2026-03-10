/* Paragon Pools — Main JS */

// ─── NAV: scroll state + mobile toggle ───────────────────────
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
  document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── NAV: active link ────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── FADE-UP OBSERVER ────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── CONTACT FORM ────────────────────────────────────────────
const form = document.querySelector('.contact-form form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Message Sent — We\'ll Be in Touch';
  btn.disabled = true;
  btn.style.background = '#2a5c3a';
  btn.style.color = '#fff';
  form.reset();
  setTimeout(() => {
    btn.textContent = orig;
    btn.disabled = false;
    btn.style.background = '';
    btn.style.color = '';
  }, 6000);
});
