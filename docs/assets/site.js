// site.js: smooth scrolling, active menu state, and contact form mailto handler
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll behavior is provided by CSS (html { scroll-behavior: smooth }).

  // Active menu: observe anchor sections and toggle .active on topbar links
  const navLinks = Array.from(document.querySelectorAll('.topbar-link'));
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const options = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector('.topbar-link[href="#' + id + '"]');
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          if (link) link.classList.add('active');
        }
      });
    }, options);
    sections.forEach(s => obs.observe(s));
  }

  // Contact form: open mail client with pre-filled subject/body
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const subject = document.getElementById('c-subject').value.trim();
      const message = document.getElementById('c-message').value.trim();

      // Replace this recipient with the address you want to receive messages at.
      const recipientEmail = 'contact@eecheonwu.com';

      const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
      const mailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;

      // Open mail client
      window.location.href = mailto;
    });
  }

  // Highlight first menu item on load if none active
  if (!document.querySelector('.topbar-link.active')) {
    const first = document.querySelector('.topbar-link');
    if (first) first.classList.add('active');
  }
});
