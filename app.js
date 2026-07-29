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
     3. SLEEK GLOWING PINK CURSOR DOT & CANVAS PARTICLE TRAIL ENGINE
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
    if (isTouchDevice || prefersReducedMotion) return;
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
    if (!isTouchDevice && !prefersReducedMotion) {
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

  // Magnetic hover targets & Cursor scaling
  if (!isTouchDevice) {
    const magneticTargets = document.querySelectorAll('.magnetic-target, .btn, .pill-btn, .service-card, .project-card, .pricing-card, .blog-card, .icon-btn, .brand-logo, .nav-link, .faq-question');
    magneticTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hovering');
      });

      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hovering');
        target.style.transform = 'translate3d(0, 0, 0)';
      });

      target.addEventListener('mousemove', (e) => {
        if (prefersReducedMotion) return;
        const rect = target.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        target.style.transform = `translate3d(${relX * 0.32}px, ${relY * 0.32}px, 0)`;
      });
    });
  }


  /* ==========================================================================
     4. MOBILE NAVIGATION DRAWER TOGGLE ENGINE
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
     5. LENIS SMOOTH SCROLL (DESKTOP ONLY) & GSAP SCROLLTRIGGER INTEGRATION
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

    // Projects Grid Stagger Scroll Reveal
    gsap.fromTo('.projects-grid .project-card', 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 90%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );

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
     6. FLUID CANVAS BACKGROUND (AMBIENT PARTICLES)
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
     7. WEB AUDIO SYNTHESIZER (SOUND EFFECTS)
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
     8. LIGHT / DARK THEME SWITCHER
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
     9. INTERACTIVE SERVICE ESTIMATOR CALCULATOR (INR)
     ========================================================================== */
  const calcPriceEl = document.getElementById('calc-price');
  const btnCalcPriceEl = document.getElementById('btn-calc-price');
  const calcWeeksEl = document.getElementById('calc-weeks');
  const breakdownListEl = document.getElementById('calc-breakdown-list');

  function calculateEstimate() {
    let baseCost = 7500;
    let baseWeeks = 1;
    let multiplier = 1.0;
    let breakdown = [];

    // 1. Core Service Choice
    const activeTypeBtn = document.querySelector('#opt-project-type .pill-btn.active');
    if (activeTypeBtn) {
      baseCost = parseFloat(activeTypeBtn.getAttribute('data-cost')) || 7500;
      baseWeeks = parseFloat(activeTypeBtn.getAttribute('data-weeks')) || 1;
      breakdown.push(`${activeTypeBtn.textContent.trim()}`);
    }

    // 2. Marketing Options
    const activeMotionBtn = document.querySelector('#opt-motion .pill-btn.active');
    if (activeMotionBtn) {
      const motionCost = parseFloat(activeMotionBtn.getAttribute('data-cost')) || 0;
      const motionWeeks = parseFloat(activeMotionBtn.getAttribute('data-weeks')) || 0;
      baseCost += motionCost;
      baseWeeks += motionWeeks;
      if (motionCost > 0) {
        breakdown.push(`${activeMotionBtn.textContent.trim()}`);
      }
    }

    // 3. Add-ons Checkboxes
    const addonCheckboxes = document.querySelectorAll('#opt-addons input[type="checkbox"]:checked');
    addonCheckboxes.forEach(cb => {
      const addonCost = parseFloat(cb.getAttribute('data-cost')) || 0;
      const addonWeeks = parseFloat(cb.getAttribute('data-weeks')) || 0;
      baseCost += addonCost;
      baseWeeks += addonWeeks;
      const labelText = cb.closest('.checkbox-card').querySelector('.cb-text').textContent;
      breakdown.push(`${labelText}`);
    });

    // 4. Timeline Speed Multiplier
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

  // Pill click handlers
  document.querySelectorAll('.option-pills').forEach(group => {
    group.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        playSound(480, 'sine');
        calculateEstimate();
      });
    });
  });

  // Checkbox handlers
  document.querySelectorAll('#opt-addons input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      playSound(cb.checked ? 620 : 340, 'triangle');
      calculateEstimate();
    });
  });

  calculateEstimate();


  /* ==========================================================================
     10. CASE STUDY DETAIL MODAL DATABASE & FLUID MOUSE WHEEL SCROLLING
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playSound(500, 'sine');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const caseStudiesData = {
    'case-sanskriti': {
      title: "Sanskriti Vintage - Complete Brand Handling & D2C E-Commerce",
      client: "Ethnic Wear & D2C Brand",
      year: "2026",
      metric: "🚀 Complete Brand Management | 6.2x ROAS",
      problem: "Expanding an authentic Indian heritage & ethnic wear brand across India while building a high-converting digital storefront and premium visual identity.",
      strategy: "Full Brand Management & Handling: End-to-end Shopify store development, cinematic product Reels production, Meta & Google Ads performance marketing, and automated WhatsApp CRM.",
      solution: "Developed high-converting mobile checkout at www.sanskritivintage.com, custom A+ catalogue layout, Meta Pixel CAPI, and retargeting automation.",
      result: "Delivered a consistent 6.2x ROAS on performance marketing campaigns while building a loyal community of 50,000+ ethnic wear shoppers."
    },
    'case-d2c': {
      title: "Aura Luxe Fashion - D2C E-Commerce Growth",
      client: "Fashion & Apparel",
      year: "2026",
      metric: "5.4x ROAS | ₹35L Monthly Revenue",
      problem: "High Facebook ad CAC (Customer Acquisition Cost), low conversion rate on legacy WooCommerce store, and abandoned carts exceeding 75%.",
      strategy: "Migrated to a high-speed custom Shopify store, redesigned product landing pages, and deployed targeted Meta Prospecting + WhatsApp automated abandoned cart retargeting.",
      solution: "Implemented sub-second mobile checkout, UGC video ad creatives, Meta Pixel CAPI, and 1-click WhatsApp order confirmation.",
      result: "Scaled monthly store revenue from ₹5 Lakhs to ₹35 Lakhs in 60 days with a sustained 5.4x ROAS."
    },
    'case-health': {
      title: "Apex Dental & Skin Care - Patient Lead Generation",
      client: "Healthcare & Clinics",
      year: "2025",
      metric: "420+ Qualified Leads/Mo | 80% Booking Rate",
      problem: "Irregular patient walk-ins, zero local Google Maps ranking, and manual WhatsApp front-desk phone booking delays.",
      strategy: "Built a hyper-targeted Google Search & Local Map Pack campaign combined with an automated AI WhatsApp Booking Bot.",
      solution: "Optimized Google Business Profiles across 3 clinic locations and connected an automated AI bot to confirm appointments instantly 24/7.",
      result: "Generated 420+ qualified consultation appointments monthly at a 65% lower CAC than traditional billboard ads."
    },
    'case-edu': {
      title: "Scholar Edge Academy - 1,200+ Student Admissions",
      client: "Education & EdTech",
      year: "2025",
      metric: "1,200+ Enrolments | 4.8x ROI",
      problem: "Low enrolment conversion from lead forms and outdated website lacking social proof and video testimonials.",
      strategy: "Redesigned landing pages with video student reviews, lead-magnet download forms, and automated CRM lead routing to counselors.",
      solution: "Targeted Meta & Instagram lead campaigns targeting parents and students with automated SMS/Email follow-up sequences.",
      result: "Achieved 1,200+ confirmed admissions for the academic season while reducing Cost-Per-Enrolment by 42%."
    },
    'case-realestate': {
      title: "Urban Nest Heights - ₹18 Cr Luxury Property Sales",
      client: "Real Estate",
      year: "2025",
      metric: "₹18 Cr Gross Sales | HNI Lead Engine",
      problem: "Unqualified leads from generic real estate portals and low site-visit conversion rate for ₹1.5 Cr+ luxury apartments.",
      strategy: "Produced 4K drone walkthrough videos, high-end landing pages, and targeted HNI Meta/Google Ads targeting high-net-worth investors.",
      solution: "Exclusive 3D virtual tour landing page paired with automated CRM appointment scheduling for property managers.",
      result: "Closed ₹18 Crore in gross property sales within 90 days of pre-launch campaign."
    },
    'case-decor': {
      title: "Casa Artisans - Amazon & Shopify Omnichannel Scaling",
      client: "Home Decor & Furniture",
      year: "2024",
      metric: "8,000+ Orders/Mo | Multi-Channel Reach",
      problem: "Unoptimized Amazon listing catalogues, poor product photography, and high Shopify cart drop-offs.",
      strategy: "Overhauled product photography, setup Amazon A+ Brand Store Content, and rebuilt Shopify store for sub-second page speed.",
      solution: "3D AR product preview on Shopify storefront + Amazon Sponsored Products PPC ads.",
      result: "Crossed 8,000+ monthly orders combined across Shopify and Amazon with a 38% repeat customer rate."
    }
  };

  // BLOG PLAYBOOKS MODAL DATABASE
  const blogPlaybooksData = {
    'cro-playbook': {
      title: "The 2026 Shopify CRO Playbook: Scaling D2C Brand Conversions",
      category: "E-COMMERCE • 5 MIN READ",
      body: `
        <div style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
          <p>Scaling an Indian D2C brand in 2026 requires more than sending paid ad traffic—it requires converting visitors into paying customers at maximum efficiency.</p>
          <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: 0.5rem; border-left: 4px solid #ff4d8d;">
            <strong style="color: var(--text-primary); font-size: 1.1rem;">🔥 5 Key CRO Pillars for 2026:</strong>
            <ol style="margin-left: 1.25rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><strong>Sub-1-Second Mobile Speed:</strong> Compress images to WebP & eliminate heavy unused Shopify apps.</li>
              <li><strong>1-Click Checkout:</strong> Integrate Shop Pay & Razorpay Magic Checkout to skip address forms.</li>
              <li><strong>Sticky Add-to-Cart Bar:</strong> Keep CTA visible on mobile screens while scrolling product pages.</li>
              <li><strong>Authentic Video UGC:</strong> Embed Instagram Reels of customers wearing/using the product directly above the buy button.</li>
              <li><strong>WhatsApp Abandoned Cart Retargeting:</strong> Trigger an automated WhatsApp voice/text reminder within 15 minutes of cart drop-off.</li>
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
    btn.addEventListener('click', (e) => {
      // Prevent double trigger if clicking inner button vs card
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
     11. STRATEGY CALL BOOKING MODAL & PRIVATE WHATSAPP + EMAIL ROUTING
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
      const price = calcPriceEl ? calcPriceEl.textContent : '7,500';
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
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
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
     12. FAQ ACCORDION LOGIC
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
     13. LIVE FOOTER CLOCK (IST TIMEZONE)
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
     14. EMAIL COPY TO CLIPBOARD & TOAST NOTIFICATION
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

});
