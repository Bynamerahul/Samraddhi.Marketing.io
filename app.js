/* ==========================================================================
   SAMRADDHI MARKETING INTERACTIVE LOGIC & PREMIUM PINK CURSOR SYSTEM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. TOUCH & REDUCED MOTION ACCESSIBILITY CHECKS
     ========================================================================== */
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ==========================================================================
     2. PAGE LOADER CURTAIN TRANSITION
     ========================================================================== */
  const curtain = document.getElementById('page-curtain');
  const curtainProgress = document.querySelector('.curtain-progress');

  if (curtainProgress) {
    setTimeout(() => { curtainProgress.style.width = '60%'; }, 100);
    setTimeout(() => { curtainProgress.style.width = '100%'; }, 400);
    setTimeout(() => {
      if (curtain) curtain.classList.add('hidden');
      initGSAPAnimations();
    }, 750);
  } else if (curtain) {
    curtain.classList.add('hidden');
    initGSAPAnimations();
  }


  /* ==========================================================================
     3. LOW POWER ECO MODE (ANIMATIONS OFF & OS NORMAL CURSOR FOR LOW-END DEVICES)
     ========================================================================== */
  const perfToggleBtn = document.getElementById('perf-toggle');
  const mobilePerfToggleBtn = document.getElementById('mobile-perf-toggle');

  function setEcoMode(enable) {
    if (enable) {
      document.body.classList.add('animations-off');
      document.documentElement.classList.add('animations-off');
      if (perfToggleBtn) perfToggleBtn.classList.add('active-eco');
      localStorage.setItem('samraddhi_eco_mode', 'true');
      showToast('⚡ Low-Power Mode ON (Animations OFF & OS Normal Cursor)');
    } else {
      document.body.classList.remove('animations-off');
      document.documentElement.classList.remove('animations-off');
      if (perfToggleBtn) perfToggleBtn.classList.remove('active-eco');
      localStorage.setItem('samraddhi_eco_mode', 'false');
      showToast('✨ High-Graphics Mode ON');
    }
  }

  const savedEcoState = localStorage.getItem('samraddhi_eco_mode');
  if (savedEcoState === 'true') {
    setEcoMode(true);
  }

  if (perfToggleBtn) {
    perfToggleBtn.addEventListener('click', () => {
      const isEco = document.body.classList.contains('animations-off');
      setEcoMode(!isEco);
      playSound(isEco ? 600 : 400, 'triangle');
    });
  }

  if (mobilePerfToggleBtn) {
    mobilePerfToggleBtn.addEventListener('click', () => {
      const isEco = document.body.classList.contains('animations-off');
      setEcoMode(!isEco);
      playSound(isEco ? 600 : 400, 'triangle');
      closeMobileDrawerMenu();
    });
  }


  /* ==========================================================================
     4. SLEEK GLOWING PINK CURSOR DOT & CANVAS PARTICLE TRAIL ENGINE
     ========================================================================== */
  const cursorDot = document.getElementById('custom-cursor');
  const cursorRadialGlow = document.getElementById('cursor-radial-glow');
  const particleCanvas = document.getElementById('cursor-particle-canvas');
  const pCtx = particleCanvas ? particleCanvas.getContext('2d') : null;

  let pCanvasWidth = 0, pCanvasHeight = 0;
  let cursorParticles = [];

  function initParticleCanvas() {
    if (!particleCanvas || !pCtx) return;
    pCanvasWidth = particleCanvas.width = window.innerWidth;
    pCanvasHeight = particleCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', initParticleCanvas);
  initParticleCanvas();

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let dotPos = { x: mouse.x, y: mouse.y };
  let prevMouse = { x: mouse.x, y: mouse.y };
  let currentSpeed = 0;

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Particle Emitter
  function spawnCursorParticles(x, y, dx, dy, count = 2) {
    if (isTouchDevice || prefersReducedMotion || document.body.classList.contains('animations-off')) return;
    const colors = ['#ff4d8d', '#ff70a6', '#ffb3cf', '#ffffff'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.8 + 0.5;
      cursorParticles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed + dx * 0.12,
        vy: Math.sin(angle) * speed + dy * 0.12,
        size: Math.random() * 3.5 + 1.5,
        alpha: 1.0,
        maxLife: Math.floor(Math.random() * 25) + 20,
        life: 0,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function updateCursorAndParticles() {
    if (!isTouchDevice && !prefersReducedMotion && !document.body.classList.contains('animations-off')) {
      const dx = mouse.x - prevMouse.x;
      const dy = mouse.y - prevMouse.y;
      const speed = Math.hypot(dx, dy);
      currentSpeed = lerp(currentSpeed, speed, 0.15);

      if (speed > 1.2) {
        spawnCursorParticles(dotPos.x, dotPos.y, dx, dy, Math.min(Math.floor(speed * 0.3), 3));
      }

      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;

      dotPos.x = lerp(dotPos.x, mouse.x, 0.5);
      dotPos.y = lerp(dotPos.y, mouse.y, 0.5);

      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      }

      if (cursorRadialGlow) {
        cursorRadialGlow.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      }

      if (pCtx && particleCanvas) {
        pCtx.clearRect(0, 0, pCanvasWidth, pCanvasHeight);
        pCtx.globalCompositeOperation = 'lighter';

        for (let i = cursorParticles.length - 1; i >= 0; i--) {
          const p = cursorParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.life++;

          const lifeProgress = p.life / p.maxLife;
          p.alpha = Math.max(0, 1 - lifeProgress);
          const currentSize = Math.max(0.5, p.size * (1 - lifeProgress * 0.7));

          pCtx.beginPath();
          pCtx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          pCtx.fillStyle = p.color;
          pCtx.globalAlpha = p.alpha;
          pCtx.shadowBlur = 8;
          pCtx.shadowColor = p.color;
          pCtx.fill();

          if (p.life >= p.maxLife || p.alpha <= 0) {
            cursorParticles.splice(i, 1);
          }
        }
      }
    }

    requestAnimationFrame(updateCursorAndParticles);
  }
  updateCursorAndParticles();

  // Subtle Magnetic Hover Targets for small buttons only (no block cards moving)
  if (!isTouchDevice) {
    const magneticTargets = document.querySelectorAll('.btn, .icon-btn, .pill-btn, .brand-logo');
    magneticTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        if (!document.body.classList.contains('animations-off')) {
          document.body.classList.add('cursor-hovering');
        }
      });

      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hovering');
        target.style.transform = 'translate3d(0, 0, 0)';
      });

      target.addEventListener('mousemove', (e) => {
        if (prefersReducedMotion || document.body.classList.contains('animations-off')) return;
        const rect = target.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        target.style.transform = `translate3d(${relX * 0.08}px, ${relY * 0.08}px, 0)`;
      });
    });

    // Simple cursor dot scaling for cards without moving the card block
    const cardHoverTargets = document.querySelectorAll('.service-card, .project-card, .pricing-card, .blog-card, .stat-card, .quote-card, .positioning-usp-card, .about-card, .founder-card, .faq-question, .nav-link');
    cardHoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        if (!document.body.classList.contains('animations-off')) {
          document.body.classList.add('cursor-hovering');
        }
      });
      target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovering'));
    });
  }


  /* ==========================================================================
     5. MOBILE NAVIGATION DRAWER TOGGLE ENGINE
     ========================================================================== */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeMobileDrawer = document.getElementById('close-mobile-drawer');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');

  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('active');
      if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      playSound(520, 'sine');
    }
  }

  function closeMobileDrawerMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      playSound(340, 'sine');
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('active')) {
        closeMobileDrawerMenu();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (closeMobileDrawer) closeMobileDrawer.addEventListener('click', closeMobileDrawerMenu);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileDrawerMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileDrawerMenu);
  });


  /* ==========================================================================
     6. LENIS SMOOTH SCROLL (DESKTOP ONLY) & GSAP SCROLLTRIGGER INTEGRATION
     ========================================================================== */
  let lenis = null;

  if (typeof Lenis !== 'undefined' && !prefersReducedMotion && !isTouchDevice) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }
    });

    if (typeof gsap !== 'undefined') {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal Staggers
    gsap.from('.gsap-reveal-fade', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15
    });

    gsap.from('.gsap-reveal-title', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      delay: 0.2,
      ease: 'power4.out'
    });

    gsap.from('.gsap-reveal-text', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out'
    });

    gsap.from('.gsap-stagger-stats .stat-card', {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      delay: 0.6,
      stagger: 0.12,
      ease: 'power3.out'
    });

    // ScrollTrigger Section Headers
    document.querySelectorAll('.gsap-reveal-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Services Grid Stagger Reveal
    gsap.fromTo('.services-grid .service-card',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );

    // Pricing Grid Stagger Reveal
    gsap.fromTo('.pricing-grid .pricing-card',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.pricing-grid',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      }
    );

    // Blog Grid Stagger Reveal
    gsap.fromTo('.blog-grid .blog-card',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      }
    );

    // Estimator Box Reveal
    gsap.from('.gsap-reveal-box', {
      scrollTrigger: {
        trigger: '.gsap-reveal-box',
        start: 'top 85%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    // FAQs Stagger Reveal
    gsap.from('.gsap-stagger-faqs .faq-item', {
      scrollTrigger: {
        trigger: '.gsap-stagger-faqs',
        start: 'top 85%',
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }


  /* ==========================================================================
     7. FLUID CANVAS BACKGROUND (AMBIENT PARTICLES)
     ========================================================================== */
  const canvas = document.getElementById('fluid-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let width, height, particles = [];

  function initCanvas() {
    if (!canvas || !ctx) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];

    const particleCount = Math.min(Math.floor((width * height) / 12000), 100);
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  function animateCanvas() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, width, height);

    if (document.body.classList.contains('animations-off')) {
      requestAnimationFrame(animateCanvas);
      return;
    }

    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const pColor = isDark ? '255, 112, 166' : '255, 77, 141';

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.x && mouse.y) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          let force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pColor}, ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${pColor}, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateCanvas);
  }

  window.addEventListener('resize', initCanvas);
  initCanvas();
  animateCanvas();


  /* ==========================================================================
     8. WEB AUDIO SYNTHESIZER (SOUND EFFECTS)
     ========================================================================== */
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playSound(freq = 440, type = 'sine', duration = 0.08) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio not available', e);
    }
  }

  const soundToggleBtn = document.getElementById('sound-toggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled ? '🔊' : '🔇';
      showToast(soundEnabled ? 'UI Sounds Enabled' : 'UI Sounds Muted');
      if (soundEnabled) playSound(600, 'triangle', 0.1);
    });
  }


  /* ==========================================================================
     9. LIGHT / DARK THEME SWITCHER
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      themeToggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
      playSound(newTheme === 'dark' ? 520 : 380, 'sine');
      showToast(`Theme set to ${newTheme.toUpperCase()}`);
    });
  }


  /* ==========================================================================
     10. CATEGORY-WISE SERVICE & PACKAGE CALCULATOR
     ========================================================================== */
  const categoryPackagesData = {
    'web': [
      { name: 'New Custom Website / B2B Portal', cost: 15000, weeks: 1 },
      { name: 'Complete Website Redesign', cost: 12000, weeks: 1 },
      { name: 'Shopify Store Setup & Sync', cost: 25000, weeks: 2 },
      { name: 'Ongoing Website Management', cost: 9999, weeks: 1 }
    ],
    'seo': [
      { name: 'Local SEO & Google Maps', cost: 8000, weeks: 0.5 },
      { name: 'Technical On-Page SEO', cost: 6000, weeks: 0.5 },
      { name: 'Complete Technical SEO Audit', cost: 5000, weeks: 0.5 }
    ],
    'smm': [
      { name: 'Starter Social Media (12 Posts)', cost: 9999, weeks: 1 },
      { name: 'Growth Social Media (20 Posts + 8 Reels)', cost: 24999, weeks: 1 },
      { name: 'AI Video & Graphic Creatives', cost: 15000, weeks: 1 }
    ],
    'market': [
      { name: 'Ebay Listing SEO & AI Images', cost: 14000, weeks: 1 },
      { name: 'Etsy Shop Setup & Listing Audit', cost: 12000, weeks: 1 },
      { name: 'Amazon A+ Content & Sync', cost: 35000, weeks: 2 },
      { name: 'Dedicated E-Com Scaling Team', cost: 49999, weeks: 1 }
    ],
    'ads': [
      { name: 'Meta Ads Setup & Pixel CAPI', cost: 8000, weeks: 0.5 },
      { name: 'Google Search & PMax Setup', cost: 10000, weeks: 0.5 }
    ],
    'ai': [
      { name: 'Product AI Images Batch (20 Photos)', cost: 8000, weeks: 0.5 },
      { name: 'AI WhatsApp & Web Chatbot Setup', cost: 12000, weeks: 0.5 }
    ]
  };

  let activeCategory = 'web';
  const optCategoryContainer = document.getElementById('opt-category');
  const optPackageListContainer = document.getElementById('opt-package-list');
  const calcPriceEl = document.getElementById('calc-price');
  const btnCalcPriceEl = document.getElementById('btn-calc-price');
  const calcWeeksEl = document.getElementById('calc-weeks');
  const breakdownListEl = document.getElementById('calc-breakdown-list');

  function renderCategoryPackages(catKey) {
    if (!optPackageListContainer) return;
    const pkgs = categoryPackagesData[catKey] || categoryPackagesData['web'];
    optPackageListContainer.innerHTML = pkgs.map((pkg, idx) => `
      <button class="pill-btn ${idx === 0 ? 'active' : ''} magnetic-target" data-cost="${pkg.cost}" data-weeks="${pkg.weeks}">
        ${pkg.name} (₹${pkg.cost.toLocaleString('en-IN')})
      </button>
    `).join('');

    optPackageListContainer.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        optPackageListContainer.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        playSound(480, 'sine');
        calculateEstimate();
      });
    });
  }

  if (optCategoryContainer) {
    optCategoryContainer.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        optCategoryContainer.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat');
        playSound(520, 'sine');
        renderCategoryPackages(activeCategory);
        calculateEstimate();
      });
    });
  }

  renderCategoryPackages('web');

  function calculateEstimate() {
    let baseCost = 15000;
    let baseWeeks = 1;
    let multiplier = 1.0;
    let breakdown = [];

    // Active Category Package
    const activePkgBtn = optPackageListContainer ? optPackageListContainer.querySelector('.pill-btn.active') : null;
    if (activePkgBtn) {
      baseCost = parseFloat(activePkgBtn.getAttribute('data-cost')) || 15000;
      baseWeeks = parseFloat(activePkgBtn.getAttribute('data-weeks')) || 1;
      breakdown.push(`${activePkgBtn.textContent.trim()}`);
    }

    // Add-ons Checkboxes
    const addonCheckboxes = document.querySelectorAll('#opt-addons input[type="checkbox"]:checked');
    addonCheckboxes.forEach(cb => {
      const addonCost = parseFloat(cb.getAttribute('data-cost')) || 0;
      const addonWeeks = parseFloat(cb.getAttribute('data-weeks')) || 0;
      baseCost += addonCost;
      baseWeeks += addonWeeks;
      const labelText = cb.closest('.checkbox-card').querySelector('.cb-text').textContent;
      breakdown.push(`${labelText}`);
    });

    // Timeline Speed Multiplier
    const activeSpeedBtn = document.querySelector('#opt-speed .pill-btn.active');
    if (activeSpeedBtn) {
      multiplier = parseFloat(activeSpeedBtn.getAttribute('data-mult')) || 1.0;
      if (multiplier > 1.0) {
        breakdown.push(`Express Rush Delivery (+20%)`);
        baseWeeks = Math.max(0.5, Math.round(baseWeeks * 0.6 * 10) / 10);
      }
    }

    const finalTotal = Math.round(baseCost * multiplier);

    if (calcPriceEl) calcPriceEl.textContent = finalTotal.toLocaleString('en-IN');
    if (btnCalcPriceEl) btnCalcPriceEl.textContent = finalTotal.toLocaleString('en-IN');
    if (calcWeeksEl) calcWeeksEl.textContent = `~ ${baseWeeks} ${baseWeeks === 1 ? 'Week' : 'Weeks'}`;

    if (breakdownListEl) {
      breakdownListEl.innerHTML = breakdown.map(item => `<li>${item}</li>`).join('');
    }
  }

  // Speed Pill Handlers
  const optSpeedContainer = document.getElementById('opt-speed');
  if (optSpeedContainer) {
    optSpeedContainer.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        optSpeedContainer.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        playSound(480, 'sine');
        calculateEstimate();
      });
    });
  }

  // Checkbox handlers
  document.querySelectorAll('#opt-addons input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      playSound(cb.checked ? 620 : 340, 'triangle');
      calculateEstimate();
    });
  });

  calculateEstimate();


  /* ==========================================================================
     11. CASE STUDY FILTER TABS & DETAIL MODAL (100% BULLETPROOF FILTERING)
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playSound(500, 'sine');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
        if (filter === 'all' || categories.includes(filter.toLowerCase())) {
          card.classList.remove('is-hidden');
          card.classList.add('is-visible');
          card.style.setProperty('display', 'flex', 'important');
          card.style.opacity = '1';
        } else {
          card.classList.remove('is-visible');
          card.classList.add('is-hidden');
          card.style.setProperty('display', 'none', 'important');
        }
      });

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  });

  const caseStudiesData = {
    'case-sanskriti': {
      title: "Sanskriti Vintage - B2B Global Export Brand Handling",
      client: "B2B Vintage Sarees & Heritage Textiles",
      year: "2026",
      metric: "🌍 B2B Global Wholesale Exporter & Digital Storefront",
      problem: "Expanding an authentic B2B heritage saree & upcycled textile export business globally while generating high-value international buyer leads.",
      strategy: "B2B Brand Management: End-to-end wholesale digital platform, international B2B buyer targeting, Meta & Google Ads performance marketing, and CRM routing.",
      solution: "Developed B2B catalogue showcase at www.sanskritivintage.com, Meta Pixel CAPI, and wholesale buyer lead generation funnels.",
      result: "Scaled international B2B wholesale orders & inquiry volume across USA, UK, and European markets."
    },
    'case-antiqueart': {
      title: "Antique Art of India - Ebay Storefront & AI Product Images",
      client: "Vintage Indian Antiques & Handicrafts",
      year: "2026",
      metric: "📸 Product AI Images & 340% Ebay Impression Growth",
      problem: "Standing out on global Ebay search results for authentic Indian antiques and vintage handicrafts against international sellers.",
      strategy: "AI Product Image Photoshoots, Ebay Listing Title & Tag SEO, and catalogue description optimization.",
      solution: "Generated high-resolution AI studio photoshoots and keyword-optimized Ebay listing titles and bullet points.",
      result: "Increased Ebay search impressions by 340% and boosted international order conversions."
    },
    'case-kreatvkraft': {
      title: "KreatvKraft - International Etsy Marketplace Scaling",
      client: "Vintage Indian Textiles & Crafts",
      year: "2026",
      metric: "📦 8,500+ Global Orders | Product AI Images & Listing SEO",
      problem: "Optimizing product listings and ranking in top Etsy search results against international craft competitors.",
      strategy: "Overhauled product titles, tags, and listing SEO on Etsy while generating Product AI photoshoot mockups.",
      solution: "Etsy SEO keyword optimization, Product AI studio images, and automated customer follow-ups.",
      result: "Crossed 8,500+ global orders across USA, UK, and European markets with a 5-star seller rating."
    },
    'case-ooakvogue': {
      title: "OOAK Vogue - Sustainable Fashion & Upcycled Saree Apparel",
      client: "One-Of-A-Kind Sustainable Apparel",
      year: "2026",
      metric: "👗 5.4x ROAS | International Storefront",
      problem: "Communicating the unique value proposition of one-of-a-kind upcycled saree kimonos & dresses to global customers.",
      strategy: "Custom Shopify store redesign, high-end visual product landing pages, and retargeting ad funnels.",
      solution: "Integrated Shopify currency converter, Meta Pixel CAPI, and automated email/WhatsApp abandon cart series.",
      result: "Scaled international sales revenue with a sustained 5.4x ROAS on Meta ads."
    },
    'case-rarebond': {
      title: "Rarebond Studios - Premium Men's Wardrobe Essentials",
      client: "Men's Apparel D2C",
      year: "2025",
      metric: "👕 4.8x ROAS | Scaled Monthly Revenue",
      problem: "Lowering Customer Acquisition Cost (CAC) for premium men's polo t-shirts and knitwear in a crowded market.",
      strategy: "Targeted Meta Prospecting + Google Performance Max Ads + automated WhatsApp cart recovery.",
      solution: "Sub-second mobile checkout, high-ROAS ad copy, and 1-click WhatsApp order confirmation.",
      result: "Scaled monthly store revenue with a consistent 4.8x ROAS."
    },
    'case-jywas': {
      title: "Jywas Beauty - Complete Content Creation, Instagram Handling & YouTube Scaling",
      client: "Beauty & Natural Skincare",
      year: "2025",
      metric: "🎬 Complete Content Creation + Instagram Handling & YouTube Channel Scaling",
      problem: "Building a strong visual brand presence and scaling video content reach across Instagram and YouTube for Jywas Beauty.",
      strategy: "End-to-End Content & Channel Scaling: Scripting, graphic design, video reel editing, long-form YouTube content, full Instagram handle management, and channel SEO.",
      solution: "Managed complete Instagram page operations, produced aesthetic reels & graphics, and scaled YouTube channel with targeted video content.",
      result: "Successfully scaled Instagram handle & YouTube channel reach with 100% complete content creation."
    },
    'case-englishcoaching': {
      title: "English Plus Coaching - Admission Campaign",
      client: "Spoken English & Grooming Institute",
      year: "2025",
      metric: "🎓 1,200+ Student Admissions",
      problem: "Inconsistent student inquiries and low conversion from local lead form campaigns.",
      strategy: "Google Local Maps SEO + Meta Lead Form Ads + Automated Counselor CRM routing.",
      solution: "Deployed Google Search Ads targeting high-intent local students with 1-click WhatsApp inquiry.",
      result: "Achieved 1,200+ confirmed student admissions with a 45% lower Cost-Per-Acquisition."
    }
  };

  // BLOG PLAYBOOKS MODAL DATABASE
  const blogPlaybooksData = {
    'cro-playbook': {
      title: "How To Rank #1 on Etsy & Ebay: Product AI Images & Listing SEO",
      category: "E-COMMERCE & MARKETPLACES • 5 MIN READ",
      body: `
        <div style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
          <p>Ranking on Etsy and Ebay in 2026 requires hyper-optimized listing titles, search tags, and studio-quality Product AI images.</p>
          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #ff4d8d;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">🔥 5 Key Marketplace Ranking Pillars:</strong>
            <ol style="margin-left: 1.25rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Product AI Studio Imagery:</strong> Generate clean white backdrops and realistic lifestyle studio scenes that double click-through rates.</li>
              <li><strong>Etsy/Ebay Tag Keyword Optimization:</strong> Maximize all 13 Etsy tags and Ebay item specifics with high-search volume long-tail keywords.</li>
              <li><strong>High Conversion Copywriting:</strong> Structure product titles so primary keywords appear in the first 40 characters for mobile shoppers.</li>
              <li><strong>Automated Customer Follow-ups:</strong> Send instant post-purchase WhatsApp/Email notifications to drive 5-star seller reviews.</li>
            </ol>
          </div>
        </div>
      `
    },
    'ai-automation': {
      title: "How Indian Startups Are Using AI Chatbots To Automate Lead Nurturing",
      category: "AI AUTOMATION • 7 MIN READ",
      body: `
        <div style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
          <p>78% of customers purchase from the business that responds to their inquiry first. Manual response times of 2-4 hours lead to 60%+ wasted ad spend.</p>
          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #3b82f6;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">🤖 The AI Lead Automation Blueprint:</strong>
            <ul style="margin-left: 1.25rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Instant WhatsApp Qualification:</strong> AI Bot responds within 3 seconds of a Meta Lead Form submission.</li>
              <li><strong>Smart Calendar Booking:</strong> Automatically syncs slots with sales reps without back-and-forth messaging.</li>
              <li><strong>24/7 FAQ Resolution:</strong> Answers shipping, pricing, and warranty queries automatically.</li>
            </ul>
          </div>
        </div>
      `
    },
    'meta-vs-google': {
      title: "Meta Ads vs Google Ads in 2026: Where Should You Spend First?",
      category: "PERFORMANCE ADS • 6 MIN READ",
      body: `
        <div style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
          <p>Choosing between Meta (Facebook & Instagram) and Google Ads depends heavily on consumer purchase intent and business category.</p>
          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #10b981;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">📊 Allocation Matrix:</strong>
            <ul style="margin-left: 1.25rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Google Search Ads (High Intent):</strong> Best for Healthcare Clinics, Real Estate, B2B Services, and Urgent Needs.</li>
              <li><strong>Meta Visual Ads (Discovery):</strong> Essential for D2C Fashion, Ethnic Wear, Beauty, Home Decor & Lifestyle.</li>
              <li><strong>The Hybrid Growth Engine:</strong> Capture visual discovery via Meta Ads, then capture search demand & retarget via Google Performance Max.</li>
            </ul>
          </div>
        </div>
      `
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalBody = document.getElementById('project-modal-body');
  const closeProjectModalBtn = document.getElementById('close-project-modal');

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project-id');
      const data = caseStudiesData[pId];
      if (!data) return;

      playSound(560, 'sine');
      if (lenis) lenis.stop();

      projectModalBody.innerHTML = `
        <span class="modal-tag">${data.client} • ${data.year}</span>
        <h2 class="modal-title" style="margin-bottom: 0.5rem;">${data.title}</h2>
        <div style="font-family: var(--font-mono); font-size: 0.875rem; color: #ff4d8d; font-weight: 700; margin-bottom: 1.5rem;">${data.metric}</div>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
          <div style="background: var(--bg-primary); padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #ef4444;">
            <strong>❌ Problem / Challenge:</strong>
            <p style="color: var(--text-secondary); margin-top: 0.25rem;">${data.problem}</p>
          </div>

          <div style="background: var(--bg-primary); padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #3b82f6;">
            <strong>🧠 Strategy & Approach:</strong>
            <p style="color: var(--text-secondary); margin-top: 0.25rem;">${data.strategy}</p>
          </div>

          <div style="background: var(--bg-primary); padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #8b5cf6;">
            <strong>🛠️ Technical Solution:</strong>
            <p style="color: var(--text-secondary); margin-top: 0.25rem;">${data.solution}</p>
          </div>

          <div style="background: var(--bg-primary); padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #10b981;">
            <strong>🏆 Verified Result:</strong>
            <p style="color: var(--text-primary); font-weight: 700; margin-top: 0.25rem;">${data.result}</p>
          </div>
        </div>

        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-primary open-contact-btn-from-modal magnetic-target">
            <span>Book Free Strategy Call →</span>
          </button>
        </div>
      `;

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');

      const modalCard = projectModal.querySelector('.modal-card');
      if (modalCard) modalCard.scrollTop = 0;

      const modalContactBtn = projectModalBody.querySelector('.open-contact-btn-from-modal');
      if (modalContactBtn) {
        modalContactBtn.addEventListener('click', () => {
          projectModal.classList.remove('active');
          openContactModal();
        });
      }
    });
  });

  // BLOG READ MORE MODAL HANDLERS
  document.querySelectorAll('.view-blog-btn, .blog-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const bId = btn.getAttribute('data-blog-id') || btn.closest('.blog-card')?.getAttribute('data-blog-id');
      const data = blogPlaybooksData[bId];
      if (!data) return;

      playSound(560, 'sine');
      if (lenis) lenis.stop();

      projectModalBody.innerHTML = `
        <span class="modal-tag">${data.category}</span>
        <h2 class="modal-title" style="margin-bottom: 1.5rem;">${data.title}</h2>
        ${data.body}
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button class="btn btn-primary open-contact-btn-from-modal magnetic-target">
            <span>Implement This Strategy For Your Brand →</span>
          </button>
        </div>
      `;

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');

      const modalCard = projectModal.querySelector('.modal-card');
      if (modalCard) modalCard.scrollTop = 0;

      const modalContactBtn = projectModalBody.querySelector('.open-contact-btn-from-modal');
      if (modalContactBtn) {
        modalContactBtn.addEventListener('click', () => {
          projectModal.classList.remove('active');
          openContactModal();
        });
      }
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
      if (lenis) lenis.start();
      playSound(360, 'sine');
    });
  }

  // Prevent wheel events inside modal cards from triggering Lenis main window scroll
  document.querySelectorAll('.modal-card, .modal-overlay').forEach(container => {
    container.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: true });
  });


  /* ==========================================================================
     12. STRATEGY CALL BOOKING MODAL & PRIVATE WHATSAPP + EMAIL ROUTING
     ========================================================================== */
  const contactModal = document.getElementById('contact-modal');
  const closeContactModalBtn = document.getElementById('close-contact-modal');
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  function openContactModal(initialScope = null) {
    closeMobileDrawerMenu();
    playSound(540, 'sine');
    if (lenis) lenis.stop();
    contactForm.style.display = 'flex';
    contactSuccess.style.display = 'none';

    showFormStep(1);

    if (initialScope) {
      const msgInput = document.getElementById('contact-message');
      if (msgInput) {
        msgInput.value = `Interested in: ${initialScope}`;
      }
    }

    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');

    const modalCard = contactModal.querySelector('.modal-card');
    if (modalCard) modalCard.scrollTop = 0;
  }

  document.querySelectorAll('.open-contact-btn').forEach(btn => {
    btn.addEventListener('click', () => openContactModal());
  });

  document.querySelectorAll('.open-contact-btn-with-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan');
      openContactModal(planName);
    });
  });

  const scopeBtn = document.querySelector('.open-contact-btn-with-scope');
  if (scopeBtn) {
    scopeBtn.addEventListener('click', () => {
      const price = calcPriceEl ? calcPriceEl.textContent : '15,000';
      const weeks = calcWeeksEl ? calcWeeksEl.textContent : '~ 1 Week';
      openContactModal(`Custom Package Estimate: ₹${price} INR (${weeks})`);
    });
  }

  if (closeContactModalBtn) {
    closeContactModalBtn.addEventListener('click', () => {
      contactModal.classList.remove('active');
      contactModal.setAttribute('aria-hidden', 'true');
      if (lenis) lenis.start();
      playSound(320, 'sine');
    });
  }

  // Step switching logic
  function showFormStep(stepNum) {
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.querySelectorAll('.step-node').forEach(node => {
      const nStep = parseInt(node.getAttribute('data-step'));
      if (nStep <= stepNum) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
    const targetStep = document.querySelector(`.form-step[data-step-content="${stepNum}"]`);
    if (targetStep) targetStep.classList.add('active');
  }

  document.querySelectorAll('.next-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.getAttribute('data-next'));
      playSound(500, 'sine');
      showFormStep(nextStep);
    });
  });

  document.querySelectorAll('.prev-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prevStep = parseInt(btn.getAttribute('data-prev'));
      playSound(420, 'sine');
      showFormStep(prevStep);
    });
  });

  // SUBMIT INQUIRY: PRIVATE WHATSAPP REDIRECT (+91 9340722578) & EMAIL NOTIFICATION
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      const selectedCategory = document.querySelector('input[name="business_type"]:checked')?.value || 'D2C E-Commerce';
      const budget = document.querySelector('select[name="budget"]')?.value || '₹25,000 - ₹50,000';
      const preferredDate = document.querySelector('input[name="preferred_date"]')?.value || 'As soon as possible';
      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value || 'No extra notes provided.';

      if (!name || !phone || !email) {
        showToast('Please fill out all required fields (*)');
        return;
      }

      // 1. Save to LocalStorage
      const inquiryData = {
        id: 'SAM-' + Date.now(),
        timestamp: new Date().toISOString(),
        name,
        phone,
        email,
        category: selectedCategory,
        budget,
        preferredDate,
        message
      };

      const existingInquiries = JSON.parse(localStorage.getItem('samraddhi_inquiries') || '[]');
      existingInquiries.push(inquiryData);
      localStorage.setItem('samraddhi_inquiries', JSON.stringify(existingInquiries));

      playSound(720, 'triangle', 0.2);
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';

      // 2. Private WhatsApp Number (Hidden from UI text)
      const hiddenWhatsAppNumber = '919340722578';
      const waText = encodeURIComponent(
        `🚀 *New Strategy Call Request - Samraddhi Marketing*\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `✉️ *Email:* ${email}\n` +
        `🏢 *Category:* ${selectedCategory}\n` +
        `💰 *Monthly Budget:* ${budget}\n` +
        `📅 *Preferred Date:* ${preferredDate}\n` +
        `💬 *Message:* ${message}`
      );

      const waUrl = `https://wa.me/${hiddenWhatsAppNumber}?text=${waText}`;

      showToast('Opening WhatsApp with pre-filled lead details...');

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1000);
    });
  }

  const closeSuccessBtn = document.getElementById('close-success-btn');
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      contactModal.classList.remove('active');
      if (lenis) lenis.start();
    });
  }


  /* ==========================================================================
     13. FAQ ACCORDION LOGIC
     ========================================================================== */
  document.querySelectorAll('.faq-item').forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
        playSound(460, 'sine');
      } else {
        questionBtn.setAttribute('aria-expanded', 'false');
        playSound(360, 'sine');
      }
    });
  });


  /* ==========================================================================
     14. LIVE FOOTER CLOCK (IST TIMEZONE)
     ========================================================================== */
  const footerTimeEl = document.getElementById('footer-time');
  function updateClock() {
    if (!footerTimeEl) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = hours.toString().padStart(2, '0');
    footerTimeEl.textContent = `${strHours}:${minutes}:${seconds} ${ampm} (IST)`;
  }
  setInterval(updateClock, 1000);
  updateClock();


  /* ==========================================================================
     15. EMAIL COPY TO CLIPBOARD & TOAST NOTIFICATION
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'bynamerahul@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        playSound(680, 'sine');
        showToast('Email (bynamerahul@gmail.com) copied!');
      }).catch(() => {
        showToast('Failed to copy email.');
      });
    });
  }

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }


  /* ==========================================================================
     16. HIGH-PRECISION NAVBAR SCROLLSPY
     ========================================================================== */
  const spySections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');
  const drawerNavLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

  function updateScrollSpy() {
    const scrollPosition = window.scrollY + 240; // Header offset threshold

    let currentSectionId = '';

    spySections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = id;
      }
    });

    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (currentSectionId && href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    drawerNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (currentSectionId && href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

});
