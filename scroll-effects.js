/* Scroll storytelling for the editorial redesign. No external dependency. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

  const progress = document.createElement('div');
  progress.className = 'rd-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  const candidates = document.querySelectorAll(
    '.s-services .section-header, .s-industries .section-header, .s-work .section-header, ' +
    '.s-process .section-header, .s-about .section-header, .s-founder .section-header, ' +
    '.service-card, .project-card, .stat-card, .blog-card, .plan-card, .process-card, ' +
    '.live-hero-title, .blog-hero h1, .page-hero h1, .service-hero h1'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('rd-inview');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  candidates.forEach((element, index) => {
    element.classList.add('rd-reveal');
    element.style.setProperty('--rd-delay', `${Math.min(index % 4, 3) * 70}ms`);
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
      element.classList.add('rd-inview');
    } else {
      observer.observe(element);
    }
  });
  document.body.classList.add('rd-motion-ready');

  const hero = document.querySelector('.s-hero');
  const portrait = document.querySelector('.rd-portrait-frame img');
  const marquee = document.querySelector('.rd-marquee-track');
  let ticking = false;
  const update = () => {
    ticking = false;
    const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / range))})`;
    if (hero && portrait) {
      const amount = Math.min(1, Math.max(0, window.scrollY / Math.max(hero.offsetHeight, 1)));
      portrait.style.setProperty('--rd-portrait-y', `${Math.round(amount * 58)}px`);
    }
    if (marquee) {
      const section = marquee.closest('.rd-marquee');
      const distance = window.innerHeight - section.getBoundingClientRect().top;
      marquee.style.setProperty('--rd-marquee-x', `${Math.max(-340, Math.min(0, -distance * 0.2))}px`);
    }
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
