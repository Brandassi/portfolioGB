const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

const setMenuOpen = (open) => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.classList.toggle('menu-open', open);
  mobileMenu.classList.toggle('open', open);
};

const updateHeader = () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    if (!menuToggle.contains(target) && !mobileMenu.contains(target)) {
      setMenuOpen(false);
    }
  });
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}