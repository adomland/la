(() => {
  'use strict';

  const header = document.querySelector('header');
  const toTop  = document.getElementById('toTop');

  /* ---------- ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const id = decodeURIComponent(href.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      
      const headerH = header ? header.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      history.replaceState(null, '', '#' + id);
    });
  });

  /* ---------- КНОПКА «НАВЕРХ» ---------- */
  if (toTop) {
    const onScroll = () => {
      toTop.classList.toggle('show', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();