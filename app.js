
const header = document.getElementById('header');
const setHeader = () => header.classList.toggle('header--scrolled', window.scrollY > 8);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });


document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    const id = href === '#top' ? 'top' : href.slice(1);
    const el = id === 'top' ? document.body : document.getElementById(id);
    if (!el) return;

    e.preventDefault();
    const y = (id === 'top')
      ? 0
      : el.getBoundingClientRect().top + window.scrollY - 80;

    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  });
});


const revealEls = Array.from(document.querySelectorAll('.reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
} else {

  revealEls.forEach(el => el.classList.add('is-in'));
}