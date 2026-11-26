(() => {
  'use strict';

  const header   = document.querySelector('header');
  const nav      = document.getElementById('topNav');
  const toggle   = document.getElementById('menuToggle');
  const toTop    = document.getElementById('toTop');

  /* ---------- ГАМБУРГЕР-МЕНЮ ---------- */
  const openMenu = () => {
    nav.classList.add('open');
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрыть меню');
  };

  const closeMenu = () => {
    if (!nav.classList.contains('open')) return;
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
  };

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Клик вне меню закрывает его
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    closeMenu();
  });

  // Esc закрывает меню
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Клик по ссылке в меню — закрываем (перед переходом)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Если окно расширили до десктопа — снимаем блокировки
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ---------- ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const id = decodeURIComponent(href.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const headerH = header.offsetHeight;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      history.replaceState(null, '', '#' + id);
    });
  });

  /* ---------- КНОПКА «НАВЕРХ» ---------- */
  const onScroll = () => {
    toTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();