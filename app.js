/* ==========================================================================
   SAMRADDHI MARKETING INTERACTIVE LOGIC & PREMIUM PINK CURSOR SYSTEM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Remove any legacy theme overrides for unified high-contrast design
  document.body.removeAttribute('data-theme');
  document.documentElement.removeAttribute('data-theme');
  localStorage.removeItem('samraddhi_theme');

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

  function setEcoMode(enable, silent = false) {
    if (enable) {
      document.body.classList.add('animations-off');
      document.documentElement.classList.add('animations-off');
      if (perfToggleBtn) perfToggleBtn.classList.add('active-eco');
      localStorage.setItem('samraddhi_eco_mode', 'true');
      if (!silent) showToast('⚡ Low-Power Mode ON (Animations OFF & OS Normal Cursor)');
    } else {
      document.body.classList.remove('animations-off');
      document.documentElement.classList.remove('animations-off');
      if (perfToggleBtn) perfToggleBtn.classList.remove('active-eco');
      localStorage.setItem('samraddhi_eco_mode', 'false');
      if (!silent) showToast('✨ High-Graphics Mode ON');
    }
  }

  const savedEcoState = localStorage.getItem('samraddhi_eco_mode');
  if (savedEcoState === 'true') {
    setEcoMode(true, true);
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
    return; // Custom cursor disabled - using standard browser OS cursor
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
    const pColor = '37, 99, 235';

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

  // Signature Pingu Notification Chime (High-Clarity 2-Tone Melodic Chime)
  function playPinguNotificationSound() {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      
      const now = audioCtx.currentTime;

      // Note 1: E6 (1318 Hz) crystal tone
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1318.51, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Note 2: B6 (1975 Hz) melodic chime (70ms offset)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1975.53, now + 0.07);
      gain2.gain.setValueAtTime(0.20, now + 0.07);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.07);
      osc2.stop(now + 0.45);

      // Warm shimmer backing
      const osc3 = audioCtx.createOscillator();
      const gain3 = audioCtx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(2637, now + 0.07);
      gain3.gain.setValueAtTime(0.04, now + 0.07);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc3.connect(gain3);
      gain3.connect(audioCtx.destination);
      osc3.start(now + 0.07);
      osc3.stop(now + 0.35);

    } catch (e) {
      console.warn('Notification sound error', e);
    }
  }

  // Authentic Cartoon "NOOT NOOT! 🎺" Trumpet Voice Synthesizer
  function playPinguNootNootSound() {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;

      // --- FIRST HONK: "NOOT" (Pitch: 430Hz -> 540Hz with trumpet formant) ---
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      const filter1 = audioCtx.createBiquadFilter();

      filter1.type = 'bandpass';
      filter1.frequency.setValueAtTime(820, now);
      filter1.Q.setValueAtTime(3.8, now);

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(430, now);
      osc1.frequency.exponentialRampToValueAtTime(540, now + 0.13);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.25, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 0.15);

      // --- SECOND HONK: "NOOT!" (Higher & energetic: 550Hz -> 700Hz) ---
      const t2 = now + 0.16;
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      const filter2 = audioCtx.createBiquadFilter();

      filter2.type = 'bandpass';
      filter2.frequency.setValueAtTime(980, t2);
      filter2.Q.setValueAtTime(4.2, t2);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(550, t2);
      osc2.frequency.exponentialRampToValueAtTime(700, t2 + 0.20);

      gain2.gain.setValueAtTime(0.001, t2);
      gain2.gain.linearRampToValueAtTime(0.30, t2 + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.22);

      osc2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc2.start(t2);
      osc2.stop(t2 + 0.22);

    } catch (e) {
      console.warn('Noot noot voice sound error', e);
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
     10. CATEGORY-WISE SERVICE & PACKAGE CALCULATOR
     ========================================================================== */
  const categoryPackagesData = {
    'web': [
      { name: 'One-Pager Static Landing Page', cost: 8000, weeks: 0.5 },
      { name: 'Standard Service-Based Website', cost: 15000, weeks: 1 },
      { name: 'Modern Website Redesign & Modernization', cost: 12000, weeks: 1 },
      { name: 'Standard Custom Business Portal', cost: 20000, weeks: 1.5 }
    ],
    'smm': [
      { name: 'Starter Social Handle Bio Audit & Tune-up', cost: 3000, weeks: 0.5 },
      { name: 'Standard 30-Day Social Calendar Management', cost: 12000, weeks: 1 },
      { name: 'Premium Social Handles Growth Retainer', cost: 25000, weeks: 1 }
    ],
    'content': [
      { name: 'Video Reel Editing Pack (12 Reels shoot/edit)', cost: 12000, weeks: 1 },
      { name: 'Founder Personal Brand Scriptwriting Pack', cost: 8000, weeks: 1 },
      { name: 'YouTube Channel SEO & Infographics Pack', cost: 15000, weeks: 2 }
    ],
    'ecommerce': [
      { name: 'Shopify Custom Store Setup & Theme Coding', cost: 25000, weeks: 2 },
      { name: 'WooCommerce Complete Store Setup', cost: 20000, weeks: 1.5 },
      { name: 'Product Upload & Listings SEO Cataloging', cost: 15000, weeks: 1 },
      { name: 'Etsy / Ebay Listing Optimization Sprint', cost: 12000, weeks: 1 }
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
    'case-udbhav': {
      title: "Udbhav India - Reels Shoot, Instagram Handling & YouTube Scaling",
      client: "Cultural, Heritage & Youth Foundation",
      year: "2026",
      metric: "🎥 2.4M+ Video Views | Reels Shoot, Instagram & YouTube Handling",
      problem: "Creating high-impact video reel content, managing social media channels, and driving youth engagement for Udbhav India.",
      strategy: "End-to-End Content & Video Production: On-location video shoots, short-form reel editing, YouTube video management, graphic ad design, and channel growth.",
      solution: "Filmed and edited high-engagement reels, designed marketing ad graphics, managed Instagram & YouTube accounts, and executed targeted campaign posts.",
      result: "Crossed 2.4M+ organic & ad video views while scaling Instagram & YouTube subscriber engagement."
    },
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
    },
    'case-luminahealth': {
      title: "Lumina Health & Dental - Patient Lead Generation",
      client: "Healthcare & Dental Clinic Center",
      year: "2026",
      metric: "🏥 340+ Monthly Patient Inquiries",
      problem: "Driving local patient appointments for high-value dental & health procedures.",
      strategy: "Google Map Pack Local SEO + Hyper-Local Search Ads + Automated WhatsApp Appointment System.",
      solution: "Built sub-second landing pages with 1-click doctor appointment booking & local map pack optimization.",
      result: "Scaled monthly patient appointments by 280% with verified positive reviews."
    },
    'case-aurajewels': {
      title: "Aura Fine Jewellery - Luxury Brand Scaling",
      client: "Fine Jewellery & Diamonds",
      year: "2026",
      metric: "💎 6.2x ROAS | Luxury E-Commerce",
      problem: "Scaling high-ticket luxury diamond & gold jewellery online sales.",
      strategy: "High-Res Product AI Image Rendering + Premium Brand Identity + Retargeting Meta Catalog Ads.",
      solution: "3D AI Product photo renders paired with VIP concierge WhatsApp lead routing.",
      result: "Achieved 6.2x average ROAS on high-ticket jewellery orders."
    },
    'case-velocerealestate': {
      title: "Veloce Properties - High-Ticket Real Estate Lead Engine",
      client: "Luxury Real Estate & Builders",
      year: "2025",
      metric: "🏡 450+ High-Intent Buyer Leads",
      problem: "Generating verified, high-net-worth homebuyer inquiries for luxury residential apartments.",
      strategy: "Meta Lead Ads + Video Property Tours + Instant CRM WhatsApp Follow-up Automation.",
      solution: "Hyper-targeted lead forms connected to sales team CRMs with automated brochure downloads.",
      result: "Generated 450+ qualified property buyer leads within 60 days."
    },
    'case-prismwood': {
      title: "Prism B2B Woodworks - Commercial B2B Pipeline",
      client: "B2B Commercial Furniture & Architecture",
      year: "2026",
      metric: "🏭 ₹1.8 Cr B2B Order Pipeline",
      problem: "Reaching commercial architects, corporate interior buyers, and hotel contractors.",
      strategy: "B2B Digital Catalogue + Google Search Ads + Corporate LinkedIn Lead Outreach.",
      solution: "Created interactive B2B digital wholesale catalogue with direct WhatsApp RFQ (Request for Quote).",
      result: "Built ₹1.8 Cr B2B commercial order pipeline within 90 days."
    }
  };

  // BLOG PLAYBOOKS MODAL DATABASE
  const blogPlaybooksData = {
    'cro-playbook': {
      title: "The Core Blueprint for Scaling D2C Brands in 2026",
      category: "📢 MARKETING • 5 MIN READ",
      body: `
        <div style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
          <p>Scaling a D2C e-commerce brand in 2026 demands a highly structured approach towards customer acquisition, conversion optimization, and retention campaigns.</p>
          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #ff4d8d;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">🔥 4 Key Scaling Pillars:</strong>
            <ol style="margin-left: 1.25rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>High-ROAS Meta Ads:</strong> Leverage broad interest targets, visual product reels, and dynamic catalog ads.</li>
              <li><strong>Frictionless Shopify Custom Checkouts:</strong> Implement 1-click checkout options to reduce cart abandonment rates.</li>
              <li><strong>AI Product Studio Scenes:</strong> Replace generic mockups with high-converting studio lifestyle visuals.</li>
              <li><strong>Retention Automations:</strong> Set up personalized post-purchase WhatsApp & email sequences to drive repeat buyers.</li>
            </ol>
          </div>
        </div>
      `
    },
    'seo-sprint': {
      title: "Generative Engine Optimization (GEO): The New SEO Frontier",
      category: "🚀 SEO & GROWTH • 7 MIN READ",
      body: `
        <div style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
          <p>Search is shifting. ChatGPT, Claude, Perplexity, and Google AI Overviews are changing how users find information. Optimizing for generative search engines requires a shift from traditional keyword stuffing to structured, authoritative entity mapping.</p>
          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #38bdf8;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">🤖 Actionable GEO Strategies:</strong>
            <ul style="margin-left: 1.25rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Citation-Ready Content:</strong> Author concise, fact-based answers right at the beginning of sections.</li>
              <li><strong>Entity Optimization:</strong> Structure clear relationships between your brand name, core founders, and service niches using JSON-LD schema graphs.</li>
              <li><strong>High Topical Authority:</strong> Publish extensive, expert articles that solve complex query clusters rather than short pages.</li>
            </ul>
          </div>
        </div>
      `
    },
    'custom-vs-templates': {
      title: "Why Custom-Coded Websites Crush Template Web Builders",
      category: "💻 WEB DEV • 4 MIN READ",
      body: `
        <div style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
          <p>Standard templates and heavy builders bundle bloated JS codes that degrade page speed and visual stability metrics. Custom coded architectures deliver superior loading efficiency and SEO indexes.</p>
          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #c084fc;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">⚡ The Custom Code Edge:</strong>
            <ul style="margin-left: 1.25rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Sub-Second Loading Speeds:</strong> Zero bloated script resources and minimal DOM layout paint times.</li>
              <li><strong>Perfect Core Web Vitals:</strong> Maximize LCP and CLS scores for automated ranking boots.</li>
              <li><strong>Total Layout Freedom:</strong> Bring high-end designs, dynamic micro-animations, and custom calculators to life without restrictions.</li>
            </ul>
          </div>
        </div>
      `
    },
    'atl-vs-btl': {
      title: "ATL vs BTL vs TTL Marketing: The Ultimate Modern Scale Breakdown",
      category: "📢 MARKETING • 6 MIN READ",
      body: `
        <div style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
          <!-- Feature Image -->
          <div style="width:100%; height:260px; overflow:hidden; border-radius:var(--radius-md); margin-bottom:1.5rem; border:1px solid var(--border-medium);">
            <img src="https://tbs-marketing.com/wp-content/uploads/2022/11/What-is-the-difference-between-ATL-BTL-and-TTL-advertising.jpg" alt="ATL vs BTL vs TTL" style="width:100%; height:100%; object-fit:cover;">
          </div>
          
          <p>A commonly asked question in marketing is the difference between <strong>Above the Line (ATL)</strong>, <strong>Below the Line (BTL)</strong>, and <strong>Through the Line (TTL)</strong> campaigns. Originated back in 1954 when Procter & Gamble separated payments for direct promotions from mass branding media, "the Line" divides general outreach from hyper-targeted, conversion-focused marketing actions.</p>
          
          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #ff4d8d;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">📢 1. Above The Line (ATL) — Broad Awareness</strong>
            <p style="margin-top:0.25rem; font-size:0.925rem;">ATL consists of untargeted, massive campaigns to build brand recognition. Its focus is reach rather than immediate sales metrics.</p>
            <ul style="margin-left: 1.25rem; margin-top: 0.5rem; font-size:0.9rem; display: flex; flex-direction: column; gap: 0.25rem;">
              <li><strong>Television:</strong> National or international commercial ads.</li>
              <li><strong>Print Media:</strong> Broad-reach newspapers and lifestyle magazines.</li>
              <li><strong>Radio Broadcasts:</strong> Audio ads reaching commuters and local populations.</li>
            </ul>
          </div>

          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #38bdf8;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">🎯 2. Below The Line (BTL) — Direct Action & ROI</strong>
            <p style="margin-top:0.25rem; font-size:0.925rem;">BTL focuses on targeted communication aimed at specific demographics to drive conversions and track exact ROI.</p>
            <ul style="margin-left: 1.25rem; margin-top: 0.5rem; font-size:0.9rem; display: flex; flex-direction: column; gap: 0.25rem;">
              <li><strong>Email Marketing:</strong> Hyper-personalized newsletters and automated CRM cart recoveries.</li>
              <li><strong>Targeted Search Ads:</strong> Paid search keyword bidding matching specific intent.</li>
              <li><strong>In-Store Promotions:</strong> Pop-up sampling, visual merchandising, and POS discounts.</li>
            </ul>
          </div>

          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #c084fc;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">🔄 3. Through The Line (TTL) — The Integrated Playbook</strong>
            <p style="margin-top:0.25rem; font-size:0.925rem;">TTL blends both fronts simultaneously. It builds a broad brand story while immediately funneling interested traffic into target retargeting maps.</p>
            <ul style="margin-left: 1.25rem; margin-top: 0.5rem; font-size:0.9rem; display: flex; flex-direction: column; gap: 0.25rem;">
              <li><strong>360-Degree Sprints:</strong> Combining a mass awareness TV spot with highly localized social media retargeting.</li>
              <li><strong>Content Ecosystems:</strong> Combining visual social media reels with high-intent SEO blogs.</li>
            </ul>
          </div>

          <p style="margin-top: 1rem;">Choosing the right playbook depends on your current stage and investment resources. While large conglomerates rely on heavy ATL campaigns, fast-growing startups and D2C brands leverage digital BTL and TTL engines to scale cashflow before financing mass media campaigns.</p>
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


  /* ==========================================================================
     17. INTERACTIVE FREE AI WEBSITE & MULTI-INDUSTRY MARKETING ENGINE
     ========================================================================== */
  const runAuditBtn = document.getElementById('run-audit-btn');
  const auditUrlInput = document.getElementById('audit-url-input');
  const auditTerminalLoader = document.getElementById('audit-terminal-loader');
  const auditProgressBar = document.getElementById('audit-progress-bar');
  const auditProgressPercent = document.getElementById('audit-progress-percent');
  const auditTerminalLogs = document.getElementById('audit-terminal-logs');
  const auditResultsCard = document.getElementById('audit-results-card');

  const reportDomainName = document.getElementById('report-domain-name');
  const reportOverallScore = document.getElementById('report-overall-score');
  const reportSeoScore = document.getElementById('report-seo-score');
  const reportUiScore = document.getElementById('report-ui-score');
  const reportMarketingScore = document.getElementById('report-marketing-score');

  const auditCardLabel1 = document.getElementById('audit-card-label-1');
  const auditCardLabel2 = document.getElementById('audit-card-label-2');
  const auditCardLabel3 = document.getElementById('audit-card-label-3');

  const reportSuggestionsList = document.getElementById('report-suggestions-list');
  const discussAuditBtn = document.getElementById('discuss-audit-btn');

  /**
   * SAMRADDHI MASTER MARKETING KNOWLEDGE ENGINE (10 INDUSTRY VERTICALS)
   */
  function classifyInputTarget(rawInput) {
    const input = rawInput.toLowerCase();
    
    // 1. SOCIAL MEDIA & CREATORS (Instagram, YouTube, LinkedIn, Facebook, Twitter)
    if (input.includes('instagram.com') || input.includes('youtube.com') || input.includes('linkedin.com') || input.includes('facebook.com') || input.includes('twitter.com') || input.includes('x.com') || input.startsWith('@')) {
      let handle = rawInput.replace(/^https?:\/\/(www\.)?/i, '').replace(/^(instagram|youtube|facebook|linkedin|twitter|x)\.com\/?/i, '').replace(/\/$/, '');
      if (!handle || handle === rawInput) {
        handle = rawInput.replace(/^https?:\/\//i, '');
      }

      let platformName = 'Social Media Handle';
      if (input.includes('instagram')) platformName = 'Instagram Profile';
      else if (input.includes('youtube')) platformName = 'YouTube Channel';
      else if (input.includes('linkedin')) platformName = 'LinkedIn Page';
      else if (input.includes('facebook')) platformName = 'Facebook Page';

      return {
        type: 'social',
        displayDomain: handle.startsWith('@') ? handle : `@${handle.replace(/^@/, '')}`,
        platformName: platformName,
        cardLabels: ['Bio & Profile SEO', 'Reel & Content Reach', 'Lead Funnel & CTAs'],
        logsStep: [
          { time: 400, text: `> [OK] Connecting to ${platformName} API...`, sound: 580 },
          { time: 900, text: `> [OK] Auditing Bio SEO keywords, highlight funnels & CTA link...`, sound: 640 },
          { time: 1400, text: `> [OK] Analyzing Reel retention, short-form video hooks & copy...`, sound: 700 },
          { time: 1900, text: `> [OK] Checking DM automation, lead capture & follower conversion...`, sound: 760 },
          { time: 2400, text: `> [COMPLETE] Synthesizing Social Growth Report for ${handle}!`, sound: 840 }
        ],
        suggestions: [
          `Bio SEO Optimization: Restructure bio copy & primary keywords to rank #1 in Instagram/YouTube search.`,
          `3-Second Reel Hooks: Deploy high-retention video templates to double organic video reach.`,
          `DM Automation Engine: Set up ManyChat / AI keyword triggers to convert reel viewers into leads instantly.`,
          `High-Intent Lead Magnet: Add a free audit or strategy consultation link in your primary bio URL.`
        ]
      };
    }

    // 2. HEALTHCARE & CLINICS (Doctors, Dental, Hospitals, IVF, Wellness)
    if (input.includes('clinic') || input.includes('dental') || input.includes('hospital') || input.includes('doctor') || input.includes('health') || input.includes('ivf') || input.includes('pharma')) {
      let domain = rawInput.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/.*$/, '');
      return {
        type: 'healthcare',
        displayDomain: domain,
        platformName: 'Healthcare & Clinic Portal',
        cardLabels: ['Local Map Rank & SEO', 'Patient Acquisition Funnel', 'Mobile UX & WhatsApp'],
        logsStep: [
          { time: 400, text: `> [OK] Connected to Healthcare Portal. Auditing Google Local Map Pack...`, sound: 580 },
          { time: 900, text: `> [OK] Checking patient appointment booking friction & phone CTAs...`, sound: 640 },
          { time: 1400, text: `> [OK] Auditing HIPAA/medical trust badges, patient reviews & speed...`, sound: 700 },
          { time: 1900, text: `> [OK] Calculating local Google Search Ad patient acquisition cost...`, sound: 760 },
          { time: 2400, text: `> [COMPLETE] Synthesizing Healthcare Marketing Report for ${domain}!`, sound: 840 }
        ],
        suggestions: [
          `Google Map Pack Dominance: Optimize Google Business Profile categories, geotagged clinic photos & review triggers for #1 local ranking.`,
          `1-Click WhatsApp Booking: Add sub-second appointment scheduling to capture high-intent patients.`,
          `Hyper-Local Google Search Ads: Run targeted campaign keywords (e.g. "Best Dental Clinic near me") for instant inquiries.`,
          `Patient Video Testimonials: Publish real patient video stories above the fold to build immediate trust.`
        ]
      };
    }

    // 3. EDUCATION & COACHING INSTITUTES (Schools, Academies, Tuition, Exams)
    if (input.includes('coaching') || input.includes('institute') || input.includes('school') || input.includes('academy') || input.includes('tuition') || input.includes('classes') || input.includes('edu')) {
      let domain = rawInput.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/.*$/, '');
      return {
        type: 'education',
        displayDomain: domain,
        platformName: 'Educational Institute Engine',
        cardLabels: ['Student Lead Gen', 'Google Search SEO', 'Admission Conversion'],
        logsStep: [
          { time: 400, text: `> [OK] Connected to Institute Engine. Auditing student lead forms...`, sound: 580 },
          { time: 900, text: `> [OK] Checking local area search keywords & demo class funnels...`, sound: 640 },
          { time: 1400, text: `> [OK] Analyzing counselor CRM response speed & WhatsApp lead capture...`, sound: 700 },
          { time: 1900, text: `> [OK] Calculating Cost-Per-Student-Admission (CPA)...`, sound: 760 },
          { time: 2400, text: `> [COMPLETE] Synthesizing Education Lead Report for ${domain}!`, sound: 840 }
        ],
        suggestions: [
          `Demo Class Lead Funnel: Deploy 1-click free demo registration landing pages with automated SMS/WhatsApp reminders.`,
          `Meta Lead Form Ads: Target parents & students within 10km radius for seasonal admission campaigns.`,
          `Google Search Ads: Capture high-intent admission queries with dedicated counselor call routing.`,
          `Alumni Success Stories: Highlight student result rankers & testimonials on your website homepage.`
        ]
      };
    }

    // 4. REAL ESTATE & BUILDERS (Properties, Apartments, Commercial)
    if (input.includes('realestate') || input.includes('property') || input.includes('builder') || input.includes('housing') || input.includes('realty') || input.includes('homes') || input.includes('flat')) {
      let domain = rawInput.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/.*$/, '');
      return {
        type: 'realestate',
        displayDomain: domain,
        platformName: 'Real Estate Growth Engine',
        cardLabels: ['Buyer Lead Quality', 'Virtual Tour Video', 'CRM & WhatsApp Sales'],
        logsStep: [
          { time: 400, text: `> [OK] Real Estate Portal connected. Auditing property lead forms...`, sound: 580 },
          { time: 900, text: `> [OK] Checking High-Net-Worth buyer targeting & brochure downloads...`, sound: 640 },
          { time: 1400, text: `> [OK] Analyzing video walk-through tours & Meta lead form fields...`, sound: 700 },
          { time: 1900, text: `> [OK] Calculating qualified lead-to-site-visit conversion rate...`, sound: 760 },
          { time: 2400, text: `> [COMPLETE] Synthesizing Property Lead Report for ${domain}!`, sound: 840 }
        ],
        suggestions: [
          `Meta High-Intent Lead Ads: Use multi-step lead forms asking for budget & timeline to filter out junk leads.`,
          `Automated Brochure Delivery: Send instant floorplan PDFs via WhatsApp API upon form submission.`,
          `Virtual Video Tours: Produce cinematic 60-second video walkthrough reels for Instagram & YouTube ads.`,
          `Sales Team CRM Routing: Automatically assign new buyer leads to sales agents within 120 seconds.`
        ]
      };
    }

    // 5. B2B, MANUFACTURING & EXPORTERS (Wholesale, Machinery, Industrial, B2B)
    if (input.includes('b2b') || input.includes('export') || input.includes('manufacturer') || input.includes('industrial') || input.includes('machinery') || input.includes('sanskriti') || input.includes('steel') || input.includes('chemical')) {
      let domain = rawInput.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/.*$/, '');
      return {
        type: 'b2b',
        displayDomain: domain,
        platformName: 'B2B & Wholesale Export Engine',
        cardLabels: ['B2B Search SEO', 'Digital RFQ Catalogue', 'Corporate Pipeline'],
        logsStep: [
          { time: 400, text: `> [OK] B2B Domain connected. Auditing wholesale catalogue structure...`, sound: 580 },
          { time: 900, text: `> [OK] Checking international buyer keywords & Request For Quote (RFQ)...`, sound: 640 },
          { time: 1400, text: `> [OK] Analyzing export certifications, ISO standards & page speed...`, sound: 700 },
          { time: 1900, text: `> [OK] Calculating LinkedIn B2B decision-maker outreach score...`, sound: 760 },
          { time: 2400, text: `> [COMPLETE] Synthesizing B2B Marketing Audit for ${domain}!`, sound: 840 }
        ],
        suggestions: [
          `Interactive Digital RFQ Catalogue: Add 1-click Request For Quote buttons on all product specification pages.`,
          `International B2B Google Ads: Target global wholesale importers in USA, Europe & Middle East.`,
          `LinkedIn Decision-Maker Outreach: Run sponsored content targeting procurement managers & CTOs.`,
          `Export Quality Badges: Showcase ISO certifications, factory tour videos & global client logos.`
        ]
      };
    }

    // 6. RESTAURANTS, CAFES & HOSPITALITY (Food, Hotels, Resorts)
    if (input.includes('restaurant') || input.includes('cafe') || input.includes('hotel') || input.includes('food') || input.includes('kitchen') || input.includes('resort') || input.includes('bakery')) {
      let domain = rawInput.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/.*$/, '');
      return {
        type: 'hospitality',
        displayDomain: domain,
        platformName: 'Restaurant & Hospitality Brand',
        cardLabels: ['Local Foodie SEO', 'Visual Dish Reels', 'Direct Table/Order Funnel'],
        logsStep: [
          { time: 400, text: `> [OK] Hospitality portal connected. Auditing local food SEO...`, sound: 580 },
          { time: 900, text: `> [OK] Checking Google Map Pack food photos & Zomato/Swiggy links...`, sound: 640 },
          { time: 1400, text: `> [OK] Analyzing Instagram food aesthetic reels & menu accessibility...`, sound: 700 },
          { time: 1900, text: `> [OK] Calculating direct table booking & delivery commission savings...`, sound: 760 },
          { time: 2400, text: `> [COMPLETE] Synthesizing Foodie Growth Report for ${domain}!`, sound: 840 }
        ],
        suggestions: [
          `Google Map 3-Pack Rank: Upload high-res dish photos & automate 5-star review requests after dining.`,
          `Aesthetic Food Reels: Publish short 5-second mouth-watering dish videos with trending local audio.`,
          `Direct WhatsApp Ordering: Eliminate 30% Swiggy/Zomato commission by enabling direct WhatsApp delivery.`,
          `Influencer Food Tastings: Host local food bloggers to drive weekend footfall spikes.`
        ]
      };
    }

    // 7. LUXURY & FINE JEWELLERY (Gold, Diamonds, Premium Apparel)
    if (input.includes('jewel') || input.includes('diamond') || input.includes('gold') || input.includes('luxury') || input.includes('vogue') || input.includes('couture') || input.includes('fashion')) {
      let domain = rawInput.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/.*$/, '');
      return {
        type: 'luxury',
        displayDomain: domain,
        platformName: 'Luxury Brand & Jewellery Engine',
        cardLabels: ['Luxury Positioning', 'High-Res AI Imagery', 'VIP Concierge Funnel'],
        logsStep: [
          { time: 400, text: `> [OK] Luxury Portal connected. Auditing visual aesthetic & pricing...`, sound: 580 },
          { time: 900, text: `> [OK] Checking Product AI 3D rendering quality & studio lighting...`, sound: 640 },
          { time: 1400, text: `> [OK] Analyzing Meta catalog ad ROAS for high-ticket items...`, sound: 700 },
          { time: 1900, text: `> [OK] Calculating VIP concierge lead-to-sale conversion rate...`, sound: 760 },
          { time: 2400, text: `> [COMPLETE] Synthesizing Luxury Marketing Audit for ${domain}!`, sound: 840 }
        ],
        suggestions: [
          `Studio Product AI Renders: Upgrade jewellery & apparel photography to hyper-realistic 4K AI renders.`,
          `VIP WhatsApp Concierge: Route high-value buyer leads directly to personal shopping consultants.`,
          `Meta Retargeting Catalog Ads: Show dynamic video ads to visitors who viewed specific luxury collections.`,
          `Heritage Brand Storytelling: Highlight craft authenticity, hallmark certifications & designer heritage.`
        ]
      };
    }

    // 8. DEFAULT GENERAL BUSINESS / E-COM / WEBSITES
    let domain = rawInput.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/.*$/, '');
    return {
      type: 'general',
      displayDomain: domain,
      platformName: 'Full-Service Growth Ecosystem',
      cardLabels: ['Search Engine SEO', 'UI / UX & Mobile Speed', 'Marketing & Lead Engine'],
      logsStep: [
        { time: 400, text: `> [OK] Domain connected. Analyzing HTML5 structure & mobile speed...`, sound: 580 },
        { time: 900, text: `> [OK] Auditing brand positioning, UI layout & value proposition...`, sound: 640 },
        { time: 1400, text: `> [OK] Checking search engine metadata, keyword tags & indexability...`, sound: 700 },
        { time: 1900, text: `> [OK] Calculating conversion rate & lead capture funnel score...`, sound: 760 },
        { time: 2400, text: `> [COMPLETE] Synthesizing 360° Growth Audit for ${domain}!`, sound: 840 }
      ],
      suggestions: [
        `Sub-Second Mobile Load Speed: Optimize image compression & CSS rendering for 95+ PageSpeed score.`,
        `High-Intent Conversion CTAs: Place clear primary offer buttons above the fold with high-contrast styling.`,
        `Organic Search Title SEO: Update meta title & description tags to capture high-volume buyer keywords.`,
        `Automated Lead CRM: Connect website lead forms to automated WhatsApp & Email nurturing sequences.`
      ]
    };
  }

  if (runAuditBtn && auditUrlInput) {
    runAuditBtn.addEventListener('click', () => {
      let rawUrl = auditUrlInput.value.trim();
      if (!rawUrl) {
        showToast('Please enter your website URL or social media handle!');
        auditUrlInput.focus();
        return;
      }

      // Classify domain target dynamically
      const auditMeta = classifyInputTarget(rawUrl);

      // Reset and display loader terminal
      auditResultsCard.style.display = 'none';
      auditTerminalLoader.style.display = 'block';
      auditProgressBar.style.width = '0%';
      auditProgressPercent.textContent = '0%';
      auditTerminalLogs.innerHTML = `<div>> Connecting to target: ${auditMeta.displayDomain}...</div>`;
      
      playSound(520, 'sine');

      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 4;
        if (progress > 100) progress = 100;
        auditProgressBar.style.width = `${progress}%`;
        auditProgressPercent.textContent = `${progress}%`;
        if (progress >= 100) clearInterval(progressInterval);
      }, 90);

      auditMeta.logsStep.forEach(step => {
        setTimeout(() => {
          const logItem = document.createElement('div');
          logItem.textContent = step.text;
          auditTerminalLogs.appendChild(logItem);
          auditTerminalLogs.scrollTop = auditTerminalLogs.scrollHeight;
          playSound(step.sound, 'triangle');
        }, step.time);
      });

      setTimeout(() => {
        // Compute pseudo-random deterministic scores based on string length
        const baseHash = auditMeta.displayDomain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const seoScore = 64 + (baseHash % 25);
        const uiScore = 68 + ((baseHash * 3) % 22);
        const marketingScore = 60 + ((baseHash * 7) % 26);
        const overallScore = Math.round((seoScore + uiScore + marketingScore) / 3);

        reportDomainName.textContent = auditMeta.displayDomain;
        reportOverallScore.textContent = `${overallScore}/100`;
        reportSeoScore.textContent = `${seoScore}%`;
        reportUiScore.textContent = `${uiScore}%`;
        reportMarketingScore.textContent = `${marketingScore}%`;

        // Update score card labels dynamically
        if (auditCardLabel1) auditCardLabel1.textContent = auditMeta.cardLabels[0];
        if (auditCardLabel2) auditCardLabel2.textContent = auditMeta.cardLabels[1];
        if (auditCardLabel3) auditCardLabel3.textContent = auditMeta.cardLabels[2];

        // Update suggestions
        reportSuggestionsList.innerHTML = auditMeta.suggestions.map(s => `<li>${s}</li>`).join('');

        auditTerminalLoader.style.display = 'none';
        auditResultsCard.style.display = 'block';
        playSound(880, 'sine', 0.2);
        showToast(`AI Audit complete for ${auditMeta.displayDomain}! Score: ${overallScore}/100`);

        // Scroll smoothly to results card
        auditResultsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 2650);
    });
  }

  if (discussAuditBtn) {
    discussAuditBtn.addEventListener('click', () => {
      const domain = reportDomainName ? reportDomainName.textContent : 'my website';
      const score = reportOverallScore ? reportOverallScore.textContent : 'audit report';
      openContactModal(`Free AI Audit Discussion for ${domain} (Score: ${score})`);
    });
  }

  /* ==========================================================================
     NEWSLETTER SUBSCRIPTION ENGINE
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmailInput = document.getElementById('newsletter-email');
  const newsletterSuccessBox = document.getElementById('newsletter-success');

  if (newsletterForm && newsletterEmailInput) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmailInput.value.trim();
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid business email address!');
        newsletterEmailInput.focus();
        return;
      }

      // Save subscriber email into local storage
      try {
        const stored = JSON.parse(localStorage.getItem('samraddhi_newsletter_subs') || '[]');
        if (!stored.includes(email)) {
          stored.push(email);
          localStorage.setItem('samraddhi_newsletter_subs', JSON.stringify(stored));
        }
      } catch (err) {
        console.warn('Newsletter storage notice:', err);
      }

      // Play chime & display success UI
      playPinguNotificationSound();
      showToast('🎉 Welcome to Samraddhi Growth Club! You are subscribed.');

      newsletterForm.style.display = 'none';
      if (newsletterSuccessBox) {
        newsletterSuccessBox.style.display = 'block';
      }
    });
  }


  /* ==========================================================================
     18. PINGU REAL-TIME SELF-LEARNING AI ENGINE & CONTINUOUS MEMORY SYSTEM
     ========================================================================== */
  
  // --- 18.1 PINGU EXTENSIVE MULTI-INDUSTRY BUILT-IN KNOWLEDGE BASE ---
  const BRAIN_STORAGE_KEY = 'samraddhi_pingu_brain_v3';

  const SEED_KNOWLEDGE_BASE = [
    {
      id: 'greetings',
      title: 'Greetings & Introductions',
      keywords: ['hi', 'hello', 'hey', 'namaste', 'morning', 'evening', 'kaise ho', 'who are you', 'kya karte ho', 'what is pingu', 'pingu', 'bot', 'intro', 'start'],
      phrases: ['hi', 'hello pingu', 'hey there', 'who are you', 'what can you do', 'namaste', 'kaise ho', 'kya karte ho', 'pingu kon ho'],
      hits: 0,
      response: `Noot Noot! 🐧 Hi there! I'm <strong>Pingu</strong>, Samraddhi Marketing's AI Growth Guide. I'm trained on 360° growth strategies for 12+ industries (SEO, Meta/Google Ads, Video Reels, Custom Websites & D2C Marketplaces). Tell me about your business or what you're looking to scale!`
    },
    {
      id: 'audit',
      title: 'Free Website & Marketing Audit (Worth ₹4,999)',
      keywords: ['audit', 'free audit', '4999', 'scan', 'check website', 'analyze', 'review', 'seo score', 'diagnose', 'performance scan', 'social media scan', 'account scan', 'check my instagram', 'website check'],
      phrases: ['i want free audit', 'can you check my website', 'audit worth 4999', 'website review', 'scan my instagram', 'scan social media', 'check my brand', 'free scan'],
      hits: 0,
      response: `Noot Noot! 🐧 You can claim our <strong>Free Website & Marketing Audit (Worth ₹4,999)</strong>! We analyze your SEO health, ad funnel leakages, website speed, and social engagement with actionable fixes in 48 hours.<br><br><a href="#ai-audit" onclick="document.getElementById('pingu-chat-window').style.display='none';" style="color:#ff70a6; font-weight:700;">Click Here to Run Instant AI Audit ⚡ →</a>`
    },
    {
      id: 'pricing',
      title: 'Retainer Plans & Pricing Breakdown',
      keywords: ['price', 'pricing', 'cost', 'rate', 'plan', 'retainer', 'budget', 'how much', 'fee', 'charge', 'package', 'monthly', 'starter', 'growth', 'scale', 'enterprise', 'kitna', 'charges'],
      phrases: ['what is your pricing', 'monthly cost', 'how much for marketing', 'retainer plans', 'starter package', 'scale plan', 'kitna charge karte ho', 'packages list', 'pricing plans'],
      hits: 0,
      response: `Noot Noot! 🐧 We offer 4 high-ROI monthly growth retainers with zero lock-in:<br>• <strong>Starter (₹9,999/mo):</strong> 12 Social Creatives, Basic SEO & Profile Optimization.<br>• <strong>Growth (₹24,999/mo):</strong> Meta/Google Ads Management, 20 Posts + 4 Reels, #1 Map SEO.<br>• <strong>Scale (₹49,999/mo):</strong> Dedicated Growth Team, Weekly Video Shoots, Custom Website & AI Bot.<br>• <strong>Enterprise:</strong> Custom 360° Partner Retainers.<br><br><a href="#retainers" onclick="document.getElementById('pingu-chat-window').style.display='none';" style="color:#ff70a6; font-weight:700;">View All Retainer Deliverables ➔</a>`
    },
    {
      id: 'advisor',
      title: 'Contact Founder Rahul Soni & WhatsApp Chat',
      keywords: ['rahul', 'rahul soni', 'founder', 'call', 'contact', 'whatsapp', 'phone', 'number', 'speak', 'talk', 'human', 'advisor', 'meet', 'consultation', 'sampark', 'baat karni'],
      phrases: ['talk to rahul', 'connect to advisor', 'give me phone number', 'whatsapp link', 'speak to founder', 'book call', 'rahul ka number', 'human support'],
      hits: 0,
      response: `Noot Noot! 🐧 You can connect directly with our founder <strong>Rahul Soni</strong> for a free 1-on-1 growth strategy consultation:<br>• Direct WhatsApp / Phone: <strong>+91 9340722578</strong><br>• Email: <strong>bynamerahul@gmail.com</strong><br><br><a href="https://wa.me/919340722578" target="_blank" style="color:#ff70a6; font-weight:700;">Open Direct WhatsApp Chat with Rahul 💬 ➔</a>`
    },
    {
      id: 'case_studies',
      title: 'Client Portfolio & Proven Case Studies',
      keywords: ['portfolio', 'clients', 'case study', 'cases', 'proof', 'results', 'past work', 'sanskriti', 'vintage', 'antique', 'rarebond', 'udbhav', 'kreatvkraft', 'jywas', 'aura', 'english plus'],
      phrases: ['show me case studies', 'who are your clients', 'past results', 'client portfolio', 'examples of your work', 'proof of results', 'sanskriti vintage case study'],
      hits: 0,
      response: `Noot Noot! 🐧 Here are some of our proven client transformations:<br>• <strong>Sanskriti Vintage:</strong> 4.2x Organic Revenue & Global B2B Export Storefront.<br>• <strong>Antique Art of India:</strong> 5.8x ROAS on Etsy & Global Marketplace Ranking.<br>• <strong>Rarebond Studios:</strong> ₹2.4M GMV in 90 Days with Shopify CRO + Meta Ads.<br>• <strong>Udbhav India:</strong> 3.2M Organic Reel Views & Brand Authority.<br>• <strong>Jywas Beauty:</strong> 7.4x ROAS on D2C Skincare Ads.<br><br><a href="#portfolio" onclick="document.getElementById('pingu-chat-window').style.display='none';" style="color:#ff70a6; font-weight:700;">Explore All 12 Interactive Case Studies ➔</a>`
    },
    {
      id: 'meta_ads',
      title: 'Meta Performance Ads (Facebook & Instagram)',
      keywords: ['meta', 'facebook', 'instagram', 'meta ads', 'fb ads', 'insta ads', 'roas', 'cac', 'ad campaign', 'lead generation', 'performance marketing', 'paid ads', 'ad spend'],
      phrases: ['run facebook ads', 'meta ad management', 'high roas ads', 'instagram lead generation', 'reduce cac', 'paid advertising'],
      hits: 0,
      response: `Noot Noot! 🐧 We build high-converting Meta Ad funnels with precision audience segmentation, dynamic creative testing, and multi-step retargeting. Our client portfolio averages <strong>7.1x ROAS</strong> with verified buyer attribution and low CAC!`
    },
    {
      id: 'google_ads',
      title: 'Google Search & PPC Ads',
      keywords: ['google ad', 'google ads', 'ppc', 'search ads', 'adwords', 'high intent', 'buyer leads', 'click', 'cpc', 'google search'],
      phrases: ['google ads management', 'run ppc ads', 'google search campaigns', 'intent based ads', 'leads from google'],
      hits: 0,
      response: `Noot Noot! 🐧 We manage high-intent Google Search, Performance Max, and Call-Only campaigns targeting customers actively searching for your exact services with strict negative keyword filters to stop wasted ad budget!`
    },
    {
      id: 'local_seo',
      title: 'Google Maps #1 Ranking & Local 3-Pack SEO',
      keywords: ['seo', 'google map', 'google maps', 'gmb', 'google my business', 'local seo', 'map pack', 'rank #1', 'organic search', 'local ranking', 'first page'],
      phrases: ['rank on google maps', 'google map pack seo', 'local business seo', 'how to get #1 on google', 'gmb optimization'],
      hits: 0,
      response: `Noot Noot! 🐧 We optimize your Google Business Profile (GMB) with geotagged media, citation building, category dominance, and automated 5-star review funnels to dominate the Google Maps 3-Pack in your city!`
    },
    {
      id: 'video_reels',
      title: '100% Done-For-You Video Reels & Content Creation',
      keywords: ['reel', 'reels', 'video', 'youtube', 'shoot', 'camera', 'editing', 'content', 'creator', 'ugc', 'script', 'scriptwriting', 'production', 'post', 'graphics'],
      phrases: ['do you shoot reels', 'video editing services', 'content creation', 'instagram reel production', 'youtube channel management', 'ugc creators'],
      hits: 0,
      response: `Noot Noot! 🐧 We provide end-to-end Content Creation: hook-driven scriptwriting, professional on-location / AI reel shoots, sound design, trend-jacking graphics, and full social calendar management so your brand goes viral consistently!`
    },
    {
      id: 'shopify_ecommerce',
      title: 'Shopify D2C Stores & Marketplace Scaling (Etsy, Ebay, Amazon)',
      keywords: ['shopify', 'ecommerce', 'e-commerce', 'etsy', 'ebay', 'amazon', 'marketplace', 'd2c', 'cart', 'checkout', 'online store', 'product listing'],
      phrases: ['shopify store development', 'scale etsy store', 'ebay marketplace growth', 'd2c ecommerce marketing', 'online shop design'],
      hits: 0,
      response: `Noot Noot! 🐧 We scale D2C & Marketplace brands across Shopify, Etsy, and eBay with sub-second fast storefronts, 1-click checkout, automated cart recovery, and international SEO ranking!`
    },
    {
      id: 'product_ai_photos',
      title: 'Product AI Photoshoots & 4K Catalogue Imagery',
      keywords: ['product photo', 'product photoshoot', 'ai photoshoot', 'catalogue', 'studio', 'image generation', '4k product', 'mockup', 'photography'],
      phrases: ['ai product photography', 'product photo shoot', 'ecommerce catalogue pictures', 'studio lighting replacement'],
      hits: 0,
      response: `Noot Noot! 🐧 We transform raw mobile product photos into hyper-realistic 4K studio catalogue images using custom AI generative models—saving 80% of traditional studio photoshoot costs while boosting click-through rates by 3.4x!`
    },
    {
      id: 'custom_web_dev',
      title: 'Sub-Second Custom Web Engineering',
      keywords: ['website', 'web dev', 'developer', 'frontend', 'speed', 'fast', 'wordpress', 'sub-second', 'redesign', 'landing page', 'full ownership'],
      phrases: ['custom website development', 'fast loading website', 'landing page development', 'website redesign', 'sub second speed'],
      hits: 0,
      response: `Noot Noot! 🐧 We code lightning-fast, sub-second custom websites and high-converting landing pages with 95+ Google PageSpeed scores, zero slow bloated plugins, and 100% full code ownership!`
    },
    {
      id: 'whatsapp_automation',
      title: 'WhatsApp Automated Booking & AI CRM Bots',
      keywords: ['whatsapp bot', 'automation', 'crm', 'chatbot', 'auto reply', 'booking bot', 'lead capture', 'instant reply'],
      phrases: ['whatsapp automation bot', 'automated lead reply', 'whatsapp booking system', 'crm integration'],
      hits: 0,
      response: `Noot Noot! 🐧 We build 24/7 intelligent WhatsApp bots that instantly qualify incoming visitor leads, share product PDF catalogues, schedule meetings, and route hot buyers directly to your phone within 5 seconds!`
    },
    {
      id: 'healthcare_clinics',
      title: 'Healthcare, Dental Clinics & Doctor Growth',
      keywords: ['clinic', 'dental', 'dentist', 'doctor', 'hospital', 'patient', 'patients', 'appointment', 'healthcare', 'medical', 'teeth'],
      phrases: ['marketing for doctors', 'dental clinic marketing', 'patient leads for clinic', 'hospital seo', 'dental appointment ads'],
      hits: 0,
      response: `Noot Noot! 🐧 For Healthcare & Dental Clinics, we deploy #1 Google Local 3-Pack Map SEO, high-intent emergency Search Ads, and automated WhatsApp patient appointment reminders to fill clinic chairs daily!`
    },
    {
      id: 'real_estate',
      title: 'Real Estate Builders & Developer Lead Engines',
      keywords: ['real estate', 'property', 'builder', 'housing', 'flat', 'flats', 'apartment', 'apartments', 'villa', 'commercial', 'plots', 'hnw'],
      phrases: ['real estate buyer leads', 'property video tour', 'sell apartments', 'builder marketing', 'hnw buyer leads', 'real estate ads'],
      hits: 0,
      response: `Noot Noot! 🐧 For Real Estate Developers, we generate verified High-Net-Worth buyer leads using cinematic property walk-through reels, multi-tier Meta lead filters, and instant WhatsApp brochure delivery!`
    },
    {
      id: 'b2b_exports',
      title: 'B2B Manufacturers & Global Export Portals',
      keywords: ['b2b', 'export', 'exporter', 'manufacturer', 'manufacturing', 'wholesale', 'industrial', 'machinery', 'distributor', 'rfq', 'catalogue'],
      phrases: ['b2b lead generation', 'wholesale portal', 'export marketing', 'industrial machinery sales', 'rfq catalogue', 'b2b export'],
      hits: 0,
      response: `Noot Noot! 🐧 For B2B Manufacturers & Exporters, we build digital wholesale catalogues with 1-click Request-For-Quote (RFQ) buttons and international buyer Google Search campaigns (like our Sanskriti Vintage case study)!`
    },
    {
      id: 'fashion_apparel',
      title: 'Fashion, Apparel & Luxury Jewellery',
      keywords: ['fashion', 'apparel', 'clothing', 'jewellery', 'jewelry', 'diamond', 'luxury', 'lifestyle', 'd2c brand', 'outfit', 'wear'],
      phrases: ['fashion brand marketing', 'jewellery brand ads', 'apparel d2c scaling', 'clothing store roas', 'luxury jewellery marketing'],
      hits: 0,
      response: `Noot Noot! 🐧 For Fashion & Jewellery Brands, we create high-aesthetic brand books, influencer UGC reels, and lookalike retargeting funnels that deliver up to <strong>9.1x ROAS</strong> (as seen in our Aura Jewellery case study)!`
    },
    {
      id: 'beauty_skincare',
      title: 'Beauty, Skincare & Cosmetics Brands',
      keywords: ['beauty', 'skincare', 'cosmetics', 'salon', 'makeup', 'dermatology', 'skin', 'face', 'glow', 'hair'],
      phrases: ['skincare brand marketing', 'beauty d2c ads', 'cosmetics reel shoots', 'salon marketing', 'jywas beauty case study'],
      hits: 0,
      response: `Noot Noot! 🐧 For Skincare & Beauty Brands, we execute creator UGC review reels, clinical before/after proof ads, and custom bundle discount funnels (scaling Jywas Beauty to 7.4x ROAS)!`
    },
    {
      id: 'education_coaching',
      title: 'Coaching Institutes & Student Admissions',
      keywords: ['coaching', 'institute', 'school', 'academy', 'student', 'students', 'admission', 'admissions', 'course', 'tuition', 'classes', 'batch'],
      phrases: ['student admission leads', 'coaching marketing', 'promote institute', 'leads for academy', 'education ads', 'english plus case study'],
      hits: 0,
      response: `Noot Noot! 🐧 For Coaching & Institutes, we build student admission lead engines using Meta Lead Ads, demo class booking funnels, and counselor CRM routing to fill upcoming batches (generated 340+ admissions for English Plus)!`
    },
    {
      id: 'restaurants_food',
      title: 'Restaurants, Cafes & Food Brands',
      keywords: ['restaurant', 'cafe', 'food', 'hotel', 'kitchen', 'dining', 'menu', 'dishes', 'zomato', 'swiggy', 'dine', 'cloud kitchen'],
      phrases: ['restaurant marketing', 'cafe promotions', 'food reels', 'local foodies', 'whatsapp food ordering', 'cloud kitchen marketing'],
      hits: 0,
      response: `Noot Noot! 🐧 For Restaurants & Cafes, we drive local foodies via 3-Pack Map SEO, mouth-watering food reels, and 0% commission direct WhatsApp ordering to save 30% aggregator commissions!`
    },
    {
      id: 'interior_design',
      title: 'Interior Designers, Architects & Furniture',
      keywords: ['interior', 'interior design', 'architect', 'furniture', 'home decor', 'modular kitchen', 'architecture', 'renovation', 'woodwork'],
      phrases: ['interior design leads', 'architect marketing', 'furniture catalogue', 'modular kitchen ads', 'interior decorator seo'],
      hits: 0,
      response: `Noot Noot! 🐧 For Interior Designers & Architects, we showcase completed project video walk-throughs, 3D render reels, and target affluent homeowners actively renovating or building new properties!`
    },
    {
      id: 'why_samraddhi',
      title: 'Why Choose Samraddhi Marketing vs Traditional Agencies',
      keywords: ['why choose you', 'difference', 'freelancer', 'traditional agency', 'guarantee', 'why samraddhi', 'experience', 'better', 'speciality'],
      phrases: ['why should i hire you', 'why samraddhi', 'what makes you different', 'agency vs freelancer', 'why choose rahul soni'],
      hits: 0,
      response: `Noot Noot! 🐧 Why market leaders choose Samraddhi:<br>1. <strong>100% Full IP Ownership:</strong> No vendor lock-in.<br>2. <strong>7.1x Average ROAS:</strong> Performance-backed ROI.<br>3. <strong>Sub-Second Speed:</strong> Engineering-grade web systems.<br>4. <strong>Direct Founder Access:</strong> Daily Slack/WhatsApp sync with Rahul Soni.<br>5. <strong>48-Hour Rapid Onboarding:</strong> Fast go-to-market execution!`
    },
    {
      id: 'discounts_timeline',
      title: 'Onboarding Timelines, Trial Audits & Terms',
      keywords: ['discount', 'offer', 'timeline', 'how fast', 'onboarding', 'contract', 'trial', 'lock in', 'time', 'kab start hoga'],
      phrases: ['how fast can you start', 'is there a contract', 'any discount', 'onboarding process', 'trial period', 'kab shuru hoga'],
      hits: 0,
      response: `Noot Noot! 🐧 We onboard new brand partners within <strong>48 hours</strong>! All retainer plans operate on flexible month-to-month terms with zero lock-in contracts. Plus, your initial <strong>Growth Audit (₹4,999 value)</strong> is completely free!`
    },
    {
      id: 'chitchat_fun',
      title: 'Fun & Playful Penguin Chit-Chat',
      keywords: ['joke', 'tell me a joke', 'funny', 'who made you', 'marry me', 'love you', 'bye', 'goodbye', 'thanks', 'thank you', 'shukriya', 'dhanyawad'],
      phrases: ['tell me a joke', 'who made you', 'i love you', 'thank you', 'thanks pingu', 'bye', 'goodbye pingu', 'joke sunao'],
      hits: 0,
      response: `Noot Noot! 🐧 Why do penguins love digital marketing? Because we always break the ice and catch high conversions! 😄 Built with love by Rahul Soni for Samraddhi Marketing. How can I help you grow today?`
    }
  ];

  class PinguSelfLearningBrain {
    constructor() {
      this.memory = this.loadMemory();
    }

    loadMemory() {
      try {
        const stored = localStorage.getItem(BRAIN_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && Array.isArray(parsed.intents) && parsed.intents.length >= SEED_KNOWLEDGE_BASE.length) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Pingu Brain storage read notice:', e);
      }

      // Fresh state with complete multi-industry knowledge base
      const initialMemory = {
        version: '3.0.0',
        totalInteractions: 0,
        intents: SEED_KNOWLEDGE_BASE,
        unresolvedQueries: [],
        learnedPatternsCount: 0,
        lastUpdated: new Date().toISOString()
      };
      this.saveMemory(initialMemory);
      return initialMemory;
    }

    saveMemory(mem = this.memory) {
      try {
        mem.lastUpdated = new Date().toISOString();
        localStorage.setItem(BRAIN_STORAGE_KEY, JSON.stringify(mem));
      } catch (e) {
        console.warn('Pingu Brain storage write notice:', e);
      }
    }

    // Tokenizer with Hinglish normalization
    tokenize(text) {
      const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'with', 'my', 'your', 'me', 'i', 'we', 'you', 'can', 'please', 'do', 'does', 'how', 'what', 'where', 'when', 'why', 'tell', 'about', 'some', 'any', 'bhai', 'karo', 'kese', 'kaise', 'batao', 'karna', 'kya', 'hai', 'hain', 'chahiye', 'hoga', 'mera', 'meri']);
      return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length > 1 && !stopWords.has(t));
    }

    // Similarity score calculation with phrase, token, and keyword weighing
    calculateMatchScore(query, intent) {
      const qLower = query.toLowerCase().trim();
      const qTokens = this.tokenize(qLower);

      // 1. Exact or partial phrase match
      for (const phrase of intent.phrases) {
        const pLower = phrase.toLowerCase();
        if (qLower === pLower || qLower.includes(pLower) || pLower.includes(qLower)) {
          return 1.0;
        }
      }

      // 2. Keyword overlap & scoring
      let score = 0;
      let matchedKeywords = 0;

      for (const kw of intent.keywords) {
        const kwLower = kw.toLowerCase();
        if (qLower.includes(kwLower)) {
          matchedKeywords += 1;
          score += 0.4;
        } else {
          // Token level match
          for (const token of qTokens) {
            if (token === kwLower || (token.length > 3 && (kwLower.includes(token) || token.includes(kwLower)))) {
              matchedKeywords += 1;
              score += 0.25;
              break;
            }
          }
        }
      }

      if (matchedKeywords > 0) {
        score += (matchedKeywords / Math.max(intent.keywords.length, 1)) * 0.4;
      }

      return Math.min(score, 0.99);
    }

    // Continuous Learning Execution
    learnFromQuery(query, matchedIntent) {
      this.memory.totalInteractions += 1;

      if (matchedIntent) {
        matchedIntent.hits = (matchedIntent.hits || 0) + 1;

        // Learn this specific user phrasing if new
        const cleanQ = query.trim().toLowerCase();
        if (cleanQ.length > 3 && !matchedIntent.phrases.some(p => p.toLowerCase() === cleanQ)) {
          matchedIntent.phrases.push(cleanQ);
          this.memory.learnedPatternsCount = (this.memory.learnedPatternsCount || 0) + 1;
          console.log(`[Pingu AI Brain] Learned new phrasing for '${matchedIntent.title}': "${cleanQ}" (Total learned: ${this.memory.learnedPatternsCount})`);
        }
      } else {
        // Record unresolved query to continuously refine answers
        const cleanQ = query.trim();
        const existing = this.memory.unresolvedQueries.find(u => u.query.toLowerCase() === cleanQ.toLowerCase());
        if (existing) {
          existing.count = (existing.count || 1) + 1;
          existing.lastAsked = new Date().toISOString();
        } else {
          this.memory.unresolvedQueries.push({
            query: cleanQ,
            count: 1,
            firstAsked: new Date().toISOString(),
            lastAsked: new Date().toISOString()
          });
        }
      }

      this.saveMemory();
    }

    // Add or teach new knowledge dynamically
    teach(titleOrTopic, keywords, response) {
      const id = 'custom_' + Date.now();
      const kwArray = Array.isArray(keywords) 
        ? keywords 
        : keywords.split(',').map(k => k.trim()).filter(Boolean);

      const newIntent = {
        id,
        title: titleOrTopic,
        keywords: kwArray.length > 0 ? kwArray : [titleOrTopic.toLowerCase()],
        phrases: [titleOrTopic.toLowerCase()],
        hits: 1,
        response: response,
        source: 'user_taught',
        taughtAt: new Date().toISOString()
      };

      this.memory.intents.unshift(newIntent);
      this.memory.learnedPatternsCount = (this.memory.learnedPatternsCount || 0) + 1;
      this.saveMemory();
      return newIntent;
    }

    // Query matcher
    resolveQuery(query) {
      const qClean = query.trim();
      let bestIntent = null;
      let highestScore = 0;

      for (const intent of this.memory.intents) {
        const score = this.calculateMatchScore(qClean, intent);
        if (score > highestScore) {
          highestScore = score;
          bestIntent = intent;
        }
      }

      const isConfident = highestScore >= 0.25;
      this.learnFromQuery(qClean, isConfident ? bestIntent : null);

      if (isConfident && bestIntent) {
        return {
          intent: bestIntent,
          score: highestScore,
          response: bestIntent.response,
          isLearned: bestIntent.source === 'user_taught'
        };
      }

      // Adaptive Contextual Fallback
      return {
        intent: null,
        score: highestScore,
        response: `Noot Noot! 🐧 I've noted that in my memory! At <strong>Samraddhi Marketing</strong>, we engineer tailored growth systems (Video Reels, Meta & Google Ads, #1 Local SEO, Custom Websites & D2C Marketplaces).<br><br>Would you like to get our <strong>Free ₹4,999 Growth Audit</strong> or chat directly with our founder Rahul Soni on WhatsApp (+91 9340722578)?<br><br><em style="font-size:0.75rem; color:#ff70a6;">💡 Tip: You can teach me new custom answers anytime by typing: <code>/teach topic | answer</code></em>`,
        isLearned: false
      };
    }

    getStats() {
      return {
        totalInteractions: this.memory.totalInteractions,
        totalIntents: this.memory.intents.length,
        learnedPhrases: this.memory.learnedPatternsCount || 0,
        unresolvedCount: this.memory.unresolvedQueries.length,
        topIntents: [...this.memory.intents].sort((a, b) => (b.hits || 0) - (a.hits || 0)).slice(0, 6).map(i => ({ title: i.title, hits: i.hits || 0 }))
      };
    }

    reset() {
      localStorage.removeItem(BRAIN_STORAGE_KEY);
      this.memory = this.loadMemory();
    }
  }

  // Instantiate Global Pingu Brain
  const pinguBrain = new PinguSelfLearningBrain();
  window.PinguBrain = pinguBrain; // Accessible via browser DevTools console

  // --- 18.2 PINGU 50 WITTY & HUMOROUS PARTING QUOTES ---
  const PINGU_WITTY_QUOTES = [
    "Noot Noot! 🐧 Silence is golden, but conversions pay the bills. Waddling away to find fresh fish!",
    "Pingu waited 60 seconds... that's 7 penguin years! Leaving before my flippers freeze! ❄️",
    "Even my ice floe moves faster than this conversation! Slide by later when you're ready to scale! 🧊",
    "Ghosting a penguin? That's cold... even for Antarctica! Noot Noot! 🥶",
    "I came, I squawked, I saw no reply. Taking a quick belly dive in the Arctic ocean! 🌊",
    "Procrastination is the thief of ROAS! Waddling off to inspect Meta ad campaigns! 📊",
    "No reply in 60 seconds? I'm off to teach sea lions how to rank on Google Maps! 🦭",
    "My beak was ready for high-converting marketing talk, but you're chilling! Catch you later! 🐧",
    "A wise penguin once said: 'A closed chat catches no customer leads.' Noot Noot! 🚪",
    "Sleeping on your marketing? Even polar bears wake up to hunt! Waddling out! 🐻‍❄️",
    "Going once, going twice... sold to the quiet visitor in the back! Bye for now! 🔨",
    "Pingu's attention span has expired! Time for a snowy ice slide intermission! 🛷",
    "Marketing without messaging is like a penguin trying to fly: funny, but doesn't work! ✈️",
    "I'd stay longer, but the Antarctic fresh salmon buffet opens in 5 minutes! 🐟",
    "I'm not saying you're slow, but my grandma penguin types 40 words per minute! 👵🐧",
    "Zero clicks, zero replies, 100% mystery. Closing down the igloo for now! 🕵️",
    "Pingu: 1, Inactivity: 0. Exiting gracefully with an Olympic belly slide! ⛷️",
    "If silence generated revenue, you'd be a unicorn startup valuation right now! 🦄",
    "Waddling off! Remember: market leaders don't wait 60 seconds to scale! 🚀",
    "My flippers are tired from twiddling! Ping me again when you're ready to grow! ⏱️",
    "Leaving before the frostbite sets in! Keep growing and Noot Noot! ❄️",
    "You're quieter than an organic post with zero hashtags! Waddling off! 🤫",
    "A quiet lead is like an unlaunched ad—zero ROAS! Catch Rahul on WhatsApp! 📱",
    "Pingu's battery-saver mode engaged: Hibernating in 3... 2... 1... 💤",
    "Heading to the igloo. Don't worry, Rahul Soni is online at +91-9340722578! 📞",
    "1 minute of silence observed for your marketing budget! Noot Noot! 🕯️",
    "Even Google SEO spiders crawl faster than this chat! Catch you later! 🕷️",
    "Off to eat some fresh sushi while you ponder that 7.1x ROAS! 🍣",
    "Pingu out! Leaving some good vibes and high conversion karma behind! ✨",
    "You must be optimizing your sales funnel in stealth mode! I'll waddle away! 🥷",
    "Did the ice freeze your keyboard? Click my launcher whenever you thaw out! 🧊",
    "They say patience is a virtue, but penguins have snowy peaks to conquer! 🐧",
    "Leaving faster than a customer bouncing from a slow-loading website! ⚡",
    "Waddling to the espresso machine—penguin cold-brew takes time! ☕",
    "If you need me, tap the bubble! Otherwise, stay frosty and keep scaling! 🧊",
    "No message? No problem! Pingu will be meditating on 10x CTRs! 🧘",
    "Silence is peaceful, but a 360° growth engine is legendary! Catch you later! 📢",
    "My penguin supervisor says I can't loiter without an active chat! Bye! 👔",
    "Waddling away! Don't let your competitors steal your Google Maps #1 rank! 📍",
    "I gave you 60 seconds of pure AI focus! Heading back to the iceberg! 🏔️",
    "Are you secretly a bot too? Blink twice if yes! Waddling off! 🤖",
    "Time is money, and icebergs are melting! Catch you next time! ⏳",
    "60-second timer dinged! Pingu has left the igloo! 🔔",
    "I'm off to brainstorm viral reels for Antarctic influencers! 🎬",
    "Closing chat window! Rahul Soni is still 1 click away on WhatsApp! 💬",
    "Too busy counting Shopify sales to reply? We love to see it! Bye! 💰",
    "Pingu's parting advice: Always A/B test your silence! Waddling off! 🧪",
    "Vanishing like an un-retargeted cart abandoner! Poof! 💨",
    "Ice ice baby... too quiet to wait any longer! Catch me later! 🎵",
    "Noot Noot! 🐧 Pingu has left the building! Tap my launcher button when you're back!"
  ];

  // UI Elements
  let hasProactiveTriggered = false;
  let pinguIdleTimer = null;
  const IDLE_TIMEOUT_MS = 60000; // 1 minute idle limit

  const pinguToggleBtn = document.getElementById('pingu-toggle-btn');
  const pinguChatWindow = document.getElementById('pingu-chat-window');
  const closePinguChat = document.getElementById('close-pingu-chat');
  const pinguBubble = document.getElementById('pingu-bubble');
  const closePinguBubble = document.getElementById('close-pingu-bubble');
  
  const pinguOptionsView = document.getElementById('pingu-options-view');
  const pinguLiveChatView = document.getElementById('pingu-live-chat-view');
  const btnOptionPingu = document.getElementById('btn-option-pingu');
  const btnBackToOptions = document.getElementById('btn-back-to-options');
  const btnOptionAdvisor = document.getElementById('btn-option-advisor');

  const pinguChatForm = document.getElementById('pingu-chat-form');
  const pinguInput = document.getElementById('pingu-input');
  const pinguChatBody = document.getElementById('pingu-chat-body');
  const compactChips = document.querySelectorAll('.compact-chip');

  if (pinguToggleBtn && pinguChatWindow) {

    // --- IDLE TIMER MANAGEMENT (1 MINUTE DEPARTURE WITH WITTY HUMOUR) ---
    function getRandomWittyQuote() {
      const idx = Math.floor(Math.random() * PINGU_WITTY_QUOTES.length);
      return PINGU_WITTY_QUOTES[idx];
    }

    function triggerPinguIdleDeparture() {
      // If chat is not open, do nothing
      if (pinguChatWindow.style.display === 'none' || !pinguChatWindow.style.display) {
        return;
      }

      const wittyQuote = getRandomWittyQuote();

      // If user is currently in live chat view, post the witty farewell message
      if (pinguLiveChatView && pinguLiveChatView.style.display === 'flex') {
        addPinguMessage(`${wittyQuote}<br><br><span style="font-size:0.75rem; color:#ff70a6; opacity:0.9;">⏳ <em>(Auto-closing chat after 1 min of inactivity. Tap my icon anytime to reopen!)</em></span>`, false);
        playSound(480, 'sine', 0.18);
      }

      // Show toast notification with the witty quote
      showToast(`🐧 Pingu: ${wittyQuote}`);

      // Gracefully close chat window after 2.8 seconds so user can see the cute goodbye
      setTimeout(() => {
        if (pinguChatWindow.style.display === 'flex') {
          pinguChatWindow.style.display = 'none';
          playSound(380, 'sine', 0.15);

          // Update floating speech bubble with friendly waddling note
          if (pinguBubble) {
            pinguBubble.innerHTML = `<span>Noot Noot! 🐧 Pingu waddled away to grab fish! Tap me whenever you're back.</span><button id="close-pingu-bubble-idle" class="bubble-close-btn">✕</button>`;
            pinguBubble.style.display = 'flex';

            const idleClose = document.getElementById('close-pingu-bubble-idle');
            if (idleClose) {
              idleClose.addEventListener('click', (e) => {
                e.stopPropagation();
                pinguBubble.style.display = 'none';
              });
            }
          }
        }
      }, 2800);
    }

    function startPinguIdleTimer() {
      clearTimeout(pinguIdleTimer);
      pinguIdleTimer = setTimeout(triggerPinguIdleDeparture, IDLE_TIMEOUT_MS);
    }

    function resetPinguIdleTimer() {
      if (pinguChatWindow && pinguChatWindow.style.display === 'flex') {
        clearTimeout(pinguIdleTimer);
        pinguIdleTimer = setTimeout(triggerPinguIdleDeparture, IDLE_TIMEOUT_MS);
      }
    }

    function stopPinguIdleTimer() {
      clearTimeout(pinguIdleTimer);
      pinguIdleTimer = null;
    }

    // Reset idle timer on any user interaction inside the chat window
    pinguChatWindow.addEventListener('mousemove', resetPinguIdleTimer, { passive: true });
    pinguChatWindow.addEventListener('click', resetPinguIdleTimer);
    pinguChatWindow.addEventListener('keydown', resetPinguIdleTimer);

    // 1. SOUND NOTIFICATION & SPEECH BUBBLE ON INITIAL LOAD (1.5 seconds)
    // Full chat window remains closed until visitor taps Pingu!
    setTimeout(() => {
      if (pinguChatWindow.style.display === 'none' || !pinguChatWindow.style.display) {
        playPinguNotificationSound();
        if (pinguBubble) {
          pinguBubble.innerHTML = `<span>Noot Noot! 🐧 Need help scaling your brand? Tap to chat!</span><button id="close-pingu-bubble-init" class="bubble-close-btn">✕</button>`;
          pinguBubble.style.display = 'flex';

          const initClose = document.getElementById('close-pingu-bubble-init');
          if (initClose) {
            initClose.addEventListener('click', (e) => {
              e.stopPropagation();
              pinguBubble.style.display = 'none';
            });
          }
        }
      }
    }, 1500);

    // --- INTERACTIVE NOOT NOOT ANIMATION & SOUND TRIGGER ---
    function triggerPinguNootNootEffect(targetEl) {
      if (!targetEl) targetEl = document.querySelector('.pingu-hero-avatar-box') || document.querySelector('.launcher-icon-wrapper');
      if (!targetEl) return;

      resetPinguIdleTimer();
      playPinguNootNootSound();

      // Trigger excited bounce animation
      targetEl.classList.remove('pingu-excited-bounce');
      void targetEl.offsetWidth; // force browser reflow to restart CSS animation
      targetEl.classList.add('pingu-excited-bounce');

      // Spawn floating cartoon music notes & sparkles
      const emojis = ['🎺', '✨', '🎵', '🐧', '💖', '⭐', '🎶'];
      for (let i = 0; i < 6; i++) {
        const note = document.createElement('span');
        note.className = 'pingu-floating-note';
        note.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const randX = (Math.random() - 0.5) * 80;
        const randRot = (Math.random() - 0.5) * 60;
        note.style.setProperty('--rand-x', `${randX}px`);
        note.style.setProperty('--rand-rot', `${randRot}deg`);
        note.style.left = `calc(50% + ${randX * 0.3}px)`;
        note.style.top = `0px`;

        targetEl.appendChild(note);
        setTimeout(() => note.remove(), 1200);
      }

      // Show temporary "NOOT NOOT! 🎺" badge if inside hero avatar box
      if (targetEl.classList.contains('pingu-hero-avatar-box')) {
        let badge = targetEl.querySelector('.pingu-noot-bubble-badge');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'pingu-noot-bubble-badge';
          badge.textContent = 'NOOT NOOT! 🎺';
          targetEl.appendChild(badge);
        } else {
          badge.style.display = 'block';
        }
        clearTimeout(targetEl._badgeTimer);
        targetEl._badgeTimer = setTimeout(() => {
          if (badge) badge.remove();
        }, 1600);
      }
    }

    // Attach interactive Noot Noot click handlers to Pingu avatars
    const pinguHeroBox = document.querySelector('.pingu-hero-avatar-box');
    if (pinguHeroBox) {
      pinguHeroBox.setAttribute('title', 'Tap Pingu for NOOT NOOT! 🎺');
      pinguHeroBox.addEventListener('click', () => {
        triggerPinguNootNootEffect(pinguHeroBox);
      });
    }

    const pinguLiveTitle = document.querySelector('.pingu-live-title');
    if (pinguLiveTitle) {
      pinguLiveTitle.style.cursor = 'pointer';
      pinguLiveTitle.setAttribute('title', 'Tap Pingu for NOOT NOOT! 🎺');
      pinguLiveTitle.addEventListener('click', () => {
        triggerPinguNootNootEffect(pinguHeroBox || pinguLiveTitle);
      });
    }

    if (pinguChatBody) {
      pinguChatBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('msg-avatar') && e.target.closest('.msg-pingu')) {
          triggerPinguNootNootEffect(pinguHeroBox || e.target);
        }
      });
    }

    // Toggle Button Handler
    pinguToggleBtn.addEventListener('click', () => {
      const isVisible = pinguChatWindow.style.display === 'flex';
      pinguChatWindow.style.display = isVisible ? 'none' : 'flex';
      if (pinguBubble) pinguBubble.style.display = 'none';

      if (!isVisible) {
        triggerPinguNootNootEffect(pinguHeroBox);
        startPinguIdleTimer();
        if (pinguLiveChatView && pinguLiveChatView.style.display === 'flex' && pinguInput) {
          setTimeout(() => pinguInput.focus(), 150);
        }
      } else {
        playSound(400, 'sine', 0.12);
        stopPinguIdleTimer();
      }
    });

    // Clicking Speech Bubble opens the full Pingu Window
    if (pinguBubble) {
      pinguBubble.addEventListener('click', (e) => {
        if (e.target.classList.contains('bubble-close-btn') || e.target.id.includes('close')) return;
        pinguBubble.style.display = 'none';
        pinguChatWindow.style.display = 'flex';
        playSound(620, 'sine', 0.15);
        startPinguIdleTimer();
        if (pinguLiveChatView && pinguLiveChatView.style.display === 'flex' && pinguInput) {
          setTimeout(() => pinguInput.focus(), 150);
        }
      });
    }

    if (closePinguChat) {
      closePinguChat.addEventListener('click', () => {
        pinguChatWindow.style.display = 'none';
        stopPinguIdleTimer();
        playSound(400, 'sine', 0.12);
      });
    }

    if (closePinguBubble) {
      closePinguBubble.addEventListener('click', (e) => {
        e.stopPropagation();
        pinguBubble.style.display = 'none';
      });
    }

    // Switch to Option 1: Continue Chat with Pingu
    if (btnOptionPingu) {
      btnOptionPingu.addEventListener('click', () => {
        resetPinguIdleTimer();
        if (pinguOptionsView && pinguLiveChatView) {
          pinguOptionsView.style.display = 'none';
          pinguLiveChatView.style.display = 'flex';
          playSound(580, 'sine', 0.15);
          if (pinguChatBody) pinguChatBody.scrollTop = pinguChatBody.scrollHeight;
          if (pinguInput) {
            setTimeout(() => pinguInput.focus(), 100);
          }
        }
      });
    }

    // Switch to Option 2: Connect to Advisor
    if (btnOptionAdvisor) {
      btnOptionAdvisor.addEventListener('click', () => {
        resetPinguIdleTimer();
        playSound(880, 'sine', 0.2);
        showToast('Connecting you with Rahul Soni (Founder) via WhatsApp...');
      });
    }

    // Back to 2 Options View
    if (btnBackToOptions) {
      btnBackToOptions.addEventListener('click', () => {
        resetPinguIdleTimer();
        if (pinguOptionsView && pinguLiveChatView) {
          pinguLiveChatView.style.display = 'none';
          pinguOptionsView.style.display = 'flex';
          playSound(480, 'sine', 0.12);
        }
      });
    }

    // Proactive engagement trigger (Scroll & Timer)
    function triggerProactivePingu() {
      if (hasProactiveTriggered) return;
      hasProactiveTriggered = true;

      if (pinguBubble && pinguChatWindow.style.display === 'none') {
        pinguBubble.innerHTML = `<span>Noot Noot! 🐧 Hey! What are you looking to grow today? (Audit / Website / Ads / Content)</span><button id="close-pingu-bubble-dynamic" class="bubble-close-btn">✕</button>`;
        pinguBubble.style.display = 'flex';
        playPinguNotificationSound();

        const dynClose = document.getElementById('close-pingu-bubble-dynamic');
        if (dynClose) {
          dynClose.addEventListener('click', (e) => {
            e.stopPropagation();
            pinguBubble.style.display = 'none';
          });
        }
      }
    }

    setTimeout(triggerProactivePingu, 20000);

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / ((document.documentElement.scrollHeight - window.innerHeight) || 1)) * 100;
      if (scrollPercent >= 40) {
        triggerProactivePingu();
      }
    }, { passive: true });

    // Chat Message Append Helper
    function addPinguMessage(text, isUser = false) {
      if (!pinguChatBody) return;
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${isUser ? 'msg-user' : 'msg-pingu'}`;
      
      const avatarSrc = isUser ? 'rahul-soni.jpg' : 'pingu-avatar.jpg';
      
      msgDiv.innerHTML = `
        <img src="${avatarSrc}" alt="${isUser ? 'User' : 'Pingu'}" class="msg-avatar">
        <div class="msg-bubble">
          <p>${text}</p>
        </div>
      `;
      
      pinguChatBody.appendChild(msgDiv);
      pinguChatBody.scrollTop = pinguChatBody.scrollHeight;
    }

    // Typing Indicator Helper
    function showPinguTyping() {
      if (!pinguChatBody) return null;
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-msg msg-pingu';
      typingDiv.id = 'pingu-typing-loader';
      typingDiv.innerHTML = `
        <img src="pingu-avatar.jpg" alt="Pingu" class="msg-avatar">
        <div class="msg-bubble">
          <div class="typing-dots"><span></span><span></span><span></span></div>
        </div>
      `;
      pinguChatBody.appendChild(typingDiv);
      pinguChatBody.scrollTop = pinguChatBody.scrollHeight;
      return typingDiv;
    }

    function removePinguTyping() {
      const loader = document.getElementById('pingu-typing-loader');
      if (loader) loader.remove();
    }

    // Process user queries and handle interactive commands (/teach, /stats, /reset)
    function processUserMessage(userText) {
      const rawText = userText.trim();
      if (!rawText) return;

      resetPinguIdleTimer();

      addPinguMessage(rawText, true);
      playSound(520, 'sine', 0.1);

      showPinguTyping();

      setTimeout(() => {
        removePinguTyping();
        resetPinguIdleTimer();

        // 1. COMMAND: /teach <question> | <answer>
        if (rawText.toLowerCase().startsWith('/teach ')) {
          const teachPayload = rawText.slice(7).trim();
          const parts = teachPayload.split('|');
          if (parts.length >= 2) {
            const questionOrTopic = parts[0].trim();
            const answer = parts.slice(1).join('|').trim();
            pinguBrain.teach(questionOrTopic, questionOrTopic, answer);
            addPinguMessage(`🐧 <strong>Knowledge Learned & Saved!</strong><br>I have permanently memorized: <em>"${questionOrTopic}"</em>.<br>Whenever someone asks about this, I will use this answer! ✨`, false);
            playPinguNotificationSound();
            showToast('Pingu Brain updated with new knowledge!');
            return;
          } else {
            addPinguMessage(`🐧 <strong>How to teach me:</strong><br>Format: <code>/teach question or topic | your custom answer</code><br>Example: <code>/teach do you do logo design | Yes, we design complete brand identity systems!</code>`, false);
            playPinguNotificationSound();
            return;
          }
        }

        // 2. COMMAND: /stats or /brain
        if (rawText.toLowerCase() === '/stats' || rawText.toLowerCase() === '/brain') {
          const stats = pinguBrain.getStats();
          const topTopics = stats.topIntents.map(t => `• ${t.title} (${t.hits} hits)`).join('<br>');
          addPinguMessage(`🧠 <strong>Pingu AI Self-Learning Brain Stats</strong>:<br>• Total Interactions: <strong>${stats.totalInteractions}</strong><br>• Learned Phrasing Patterns: <strong>${stats.learnedPhrases}</strong><br>• Knowledge Nodes: <strong>${stats.totalIntents}</strong><br>• Top Inquired Topics:<br>${topTopics || '• General Queries'}<br><br><span style="font-size:0.75rem; color:#94a3b8;">Continuously learning and evolving from every visitor interaction.</span>`, false);
          playPinguNotificationSound();
          return;
        }

        // 3. COMMAND: /reset
        if (rawText.toLowerCase() === '/reset') {
          pinguBrain.reset();
          addPinguMessage(`🐧 <strong>Memory Reset:</strong> Pingu brain restored to factory seed intelligence!`, false);
          playSound(500, 'sine', 0.15);
          return;
        }

        // 4. COMMAND: /help
        if (rawText.toLowerCase() === '/help') {
          addPinguMessage(`🐧 <strong>Pingu AI Assistant Commands</strong>:<br>• Type any marketing question to get instant smart answers.<br>• <code>/teach question | answer</code> : Teach me a custom Q&A.<br>• <code>/stats</code> : View my learning statistics.<br>• <code>/reset</code> : Reset learned memory.`, false);
          playPinguNotificationSound();
          return;
        }

        // 5. REGULAR QUERY NLP RESOLUTION & SELF-LEARNING
        const resolution = pinguBrain.resolveQuery(rawText);
        addPinguMessage(resolution.response, false);
        playPinguNotificationSound();

      }, 450);
    }

    // Chat Form Submit Handler
    if (pinguChatForm && pinguInput) {
      pinguChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = pinguInput.value.trim();
        if (!userText) return;
        pinguInput.value = '';
        processUserMessage(userText);
      });

      pinguInput.addEventListener('input', resetPinguIdleTimer);
      pinguInput.addEventListener('keydown', resetPinguIdleTimer);
    }

    // Compact Chips Handler
    compactChips.forEach(chip => {
      chip.addEventListener('click', () => {
        resetPinguIdleTimer();
        const query = chip.getAttribute('data-query');
        if (query) {
          processUserMessage(query);
        }
      });
    });
  }

});

