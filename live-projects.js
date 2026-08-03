/* ==========================================================================
   SAMRADDHI MARKETING - LIVE PROJECTS DYNAMIC DATA & CONTROLLER
   ========================================================================== */

const LIVE_PROJECTS_DATA = [
  {
    id: "sanskriti-vintage",
    name: "Sanskriti Vintage",
    industry: "Heritage Vintage Sarees & B2B Export",
    status: "Brand Manager (Complete Operations Excl. Shipping)",
    isLive: true,
    progress: 88,
    expectedCompletion: "Ongoing Retainer",
    category: "brand-mgmt",
    description: "Samraddhi Marketing acts as the complete Brand Manager for Sanskriti Vintage. We handle end-to-end B2B export portals, product AI image generation, Etsy/Ebay listing SEO, performance ads, lead funnels & full brand operations (excluding logistics & shipping).",
    services: [
      "Complete Brand Management",
      "B2B Export Portal",
      "Etsy / Ebay Listing SEO",
      "Product AI Photography",
      "Meta & Google Ads",
      "Catalogue Operations"
    ],
    timeline: [
      { stage: "Research", status: "completed", icon: "✓" },
      { stage: "Planning", status: "completed", icon: "✓" },
      { stage: "Wireframes", status: "completed", icon: "✓" },
      { stage: "UI Design", status: "completed", icon: "✓" },
      { stage: "Development", status: "completed", icon: "✓" },
      { stage: "AI Photography", status: "in-progress", icon: "🔄" },
      { stage: "Scale Ads", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "August 3, 2026",
        badge: "Brand Ops",
        title: "B2B Export Portal & Product AI Engine Deployed",
        description: "Finalized full brand operations workflow, multi-currency inquiry engine, and international Etsy listing SEO."
      },
      {
        date: "July 28, 2026",
        badge: "E-Commerce",
        title: "Catalogue AI Optimization & Lead Automation",
        description: "Generated 400+ high-resolution product AI images and configured automated buyer response funnels."
      }
    ]
  },
  {
    id: "jywas",
    name: "JYWAS",
    industry: "Personal Brand & Creator Media",
    status: "Full Content Engine & YouTube Management",
    isLive: true,
    progress: 75,
    expectedCompletion: "Active Media Retainer",
    category: "content",
    description: "Complete content creation & media growth engine for JYWAS. We produce, edit & manage short-form Reels, long-form videos, custom graphic design, YouTube channel management & social media handle strategy.",
    services: [
      "Content Creation Strategy",
      "Reels & Shorts Editing",
      "Long-Form Video Editing",
      "Graphic Design",
      "Social Media Management",
      "YouTube Channel Growth"
    ],
    timeline: [
      { stage: "Strategy", status: "completed", icon: "✓" },
      { stage: "Scripts", status: "completed", icon: "✓" },
      { stage: "Graphic Design", status: "completed", icon: "✓" },
      { stage: "Reels Editing", status: "in-progress", icon: "🔄" },
      { stage: "YouTube Growth", status: "in-progress", icon: "🔄" },
      { stage: "Channel Scale", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "August 2, 2026",
        badge: "Media Engine",
        title: "Short & Long Form Editing Workflow Operational",
        description: "Delivered 18 viral Reels & 4 long-form YouTube episodes with high-ctr custom thumbnails."
      }
    ]
  },
  {
    id: "udbhav",
    name: "Udbhav Institute",
    industry: "Education & Brand Media",
    status: "On-Site Shoot & Complete Media Production",
    isLive: true,
    progress: 70,
    expectedCompletion: "Active Media Retainer",
    category: "content",
    description: "End-to-end media production & branding for Udbhav. We conduct on-site video/photo shoots, handle complete brand strategy, edit high-converting Reels, design brand collateral & manage YouTube + social handles.",
    services: [
      "On-Site Video & Photo Shoot",
      "Brand Identity & Strategy",
      "Reels & Shorts Production",
      "YouTube Channel Management",
      "Social Media Handles",
      "Graphic Design & Creatives"
    ],
    timeline: [
      { stage: "On-Site Shoot", status: "completed", icon: "✓" },
      { stage: "Brand Guide", status: "completed", icon: "✓" },
      { stage: "Video Edits", status: "in-progress", icon: "🔄" },
      { stage: "Social Management", status: "in-progress", icon: "🔄" },
      { stage: "YT Optimization", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "August 1, 2026",
        badge: "On-Site Shoot",
        title: "4K Campus Shoot & Reel Series Completed",
        description: "Wrapped multi-camera on-site video shoot; launched 12 high-engagement student testimonial reels."
      }
    ]
  },
  {
    id: "adr-craft-store",
    name: "ADR Craft Store",
    industry: "Handicrafts & Artisanal Decor",
    status: "Upcoming Etsy Store Project",
    isLive: true,
    progress: 30,
    expectedCompletion: "Q3 2026 (Launch in 2 Weeks)",
    category: "upcoming",
    description: "Upcoming Etsy store launch for ADR Craft Store. Setting up international Etsy listing SEO, product AI photography, banner design, tags research & global export store configuration.",
    services: [
      "Upcoming Etsy Store Setup",
      "Etsy SEO & Tag Architecture",
      "Product AI Photography",
      "Storefront Banner Design",
      "Listing Optimization"
    ],
    timeline: [
      { stage: "Research", status: "completed", icon: "✓" },
      { stage: "Store Setup", status: "in-progress", icon: "🔄" },
      { stage: "Product AI", status: "in-progress", icon: "🔄" },
      { stage: "Etsy SEO", status: "in-progress", icon: "🔄" },
      { stage: "Store Launch", status: "upcoming", icon: "⏳" }
    ],
    updates: [
      {
        date: "August 3, 2026",
        badge: "Etsy Launch",
        title: "Etsy Keyword Architecture & Banner Approved",
        description: "Mapped top 50 global handicraft search tags and finalized store branding guidelines."
      }
    ]
  },
  {
    id: "ooak-vogue",
    name: "OOAK Vogue",
    industry: "Luxury Fashion & Ecommerce",
    status: "Website Redesign in Progress",
    isLive: true,
    progress: 65,
    expectedCompletion: "Q3 2026 (3 Weeks Remaining)",
    category: "redesign",
    description: "We are redesigning the existing OOAK Vogue website into a modern, premium, mobile-first and conversion-focused digital experience using an AI-assisted workflow while maintaining human-led strategy and creativity.",
    services: [
      "Website Redesign",
      "UI/UX Experience",
      "Responsive Mobile Design",
      "Ecommerce Architecture",
      "SEO Optimization",
      "AI-assisted Design Workflow"
    ],
    timeline: [
      { stage: "Research", status: "completed", icon: "✓" },
      { stage: "Planning", status: "completed", icon: "✓" },
      { stage: "Wireframes", status: "completed", icon: "✓" },
      { stage: "UI Design", status: "in-progress", icon: "🔄" },
      { stage: "Development", status: "in-progress", icon: "🔄" },
      { stage: "Testing", status: "upcoming", icon: "⏳" },
      { stage: "Launch", status: "upcoming", icon: "⏳" }
    ],
    updates: [
      {
        date: "August 2, 2026",
        badge: "Design Phase",
        title: "Mobile-First Wireframes & Glassmorphic UI Approved",
        description: "Completed and approved 3D product showcase components, fast filter architecture, and luxury layout."
      }
    ]
  },
  {
    id: "samraddhi-india-marketplace",
    name: "Samraddhi India Marketplace",
    industry: "E-Commerce Marketplace & B2B Engine",
    status: "Upcoming E-Commerce Marketplace",
    isLive: true,
    progress: 40,
    expectedCompletion: "Q4 2026 Platform Launch",
    category: "upcoming",
    description: "Designing & engineering the upcoming multi-vendor e-commerce marketplace platform for Samraddhi India to connect Indian artisans, heritage exporters & global buyers on a unified AI-enabled ecosystem.",
    services: [
      "Marketplace Platform Architecture",
      "Multi-Vendor Engine",
      "UX Strategy & Wireframes",
      "AI Buyer Matching",
      "E-Commerce Infrastructure"
    ],
    timeline: [
      { stage: "Strategy", status: "completed", icon: "✓" },
      { stage: "Architecture", status: "in-progress", icon: "🔄" },
      { stage: "UI Wireframes", status: "in-progress", icon: "🔄" },
      { stage: "Development", status: "upcoming", icon: "⏳" },
      { stage: "Beta Test", status: "upcoming", icon: "⏳" }
    ],
    updates: [
      {
        date: "August 1, 2026",
        badge: "Marketplace",
        title: "Multi-Vendor Database & UI Blueprint Finalized",
        description: "Completed platform tech stack architecture & B2B wholesale onboarding workflow."
      }
    ]
  },
  {
    id: "kreatvkraft",
    name: "Kreatvkraft",
    industry: "Handicrafts & Indian Folk Art",
    status: "Active Etsy Store Management",
    isLive: true,
    progress: 82,
    expectedCompletion: "Ongoing Retainer",
    category: "marketplaces",
    description: "Managing Kreatvkraft's Etsy store with custom branding, AI-enhanced product photos, global keyword tags & performance marketing for artisanal Indian crafts.",
    services: [
      "Etsy Store Management",
      "Artisan Branding",
      "Product AI Photography",
      "Etsy Ads Strategy",
      "Listing SEO Optimization"
    ],
    timeline: [
      { stage: "Setup", status: "completed", icon: "✓" },
      { stage: "Branding", status: "completed", icon: "✓" },
      { stage: "Listings", status: "completed", icon: "✓" },
      { stage: "Etsy SEO", status: "completed", icon: "✓" },
      { stage: "Scale Sales", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "July 30, 2026",
        badge: "Etsy Scale",
        title: "45 New Folk Art Listings Optimized",
        description: "Achieved #1 page ranking for targeted US & UK handicraft keywords."
      }
    ]
  },
  {
    id: "antique-art-of-india",
    name: "Antique Art of India",
    industry: "Heritage Antiques & Fine Art",
    status: "Active Ebay Global Store",
    isLive: true,
    progress: 85,
    expectedCompletion: "Ongoing Retainer",
    category: "marketplaces",
    description: "Managing Antique Art of India's global Ebay store featuring rare heritage artifacts, antique Indian art, automated buyer negotiation funnels & international listing SEO.",
    services: [
      "Ebay Global Storefront",
      "Antique Listing SEO",
      "Product AI Photography",
      "International SEO",
      "Buyer Negotiation Automation"
    ],
    timeline: [
      { stage: "Audit", status: "completed", icon: "✓" },
      { stage: "Store Redesign", status: "completed", icon: "✓" },
      { stage: "Catalogue SEO", status: "completed", icon: "✓" },
      { stage: "Ebay Ads", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "July 27, 2026",
        badge: "Ebay Store",
        title: "Automated Global Buyer Counter-Offer Engine Setup",
        description: "Increased international buyer response rate by 60% across US, UK & Australia."
      }
    ]
  },
  {
    id: "sparkle-jewellery",
    name: "Sparkle Heritage Jewellery",
    industry: "Luxury Fine Jewellery & Gems",
    status: "Catalogue Design & Product AI Shots",
    isLive: true,
    progress: 60,
    expectedCompletion: "Q3 2026 (2 Weeks Remaining)",
    category: "redesign",
    description: "Creating ultra-luxurious Product AI imagery, digital lookbooks, Instagram Reels & targeted high-ticket buyer campaigns for premium heritage jewellery collections.",
    services: [
      "Jewellery Product AI Photography",
      "Luxury Brand Lookbooks",
      "Instagram Reels Production",
      "Meta High-Ticket Ads",
      "Digital Catalogue"
    ],
    timeline: [
      { stage: "Moodboard", status: "completed", icon: "✓" },
      { stage: "AI Photography", status: "in-progress", icon: "🔄" },
      { stage: "Reels Edit", status: "in-progress", icon: "🔄" },
      { stage: "Lookbook", status: "upcoming", icon: "⏳" }
    ],
    updates: [
      {
        date: "July 29, 2026",
        badge: "Jewellery AI",
        title: "3D Gemstone Specular Lighting Prompts Refined",
        description: "Generated 80 high-contrast macro shots for gold & polki bridal sets."
      }
    ]
  },
  {
    id: "mayur-handicrafts",
    name: "Mayur Handicraft Goods",
    industry: "Handicraft Goods & Home Decor Export",
    status: "B2B Export Catalogue & Ads",
    isLive: true,
    progress: 78,
    expectedCompletion: "Ongoing Retainer",
    category: "brand-mgmt",
    description: "Full B2B catalogue design, digital marketing & international lead generation for Mayur Handicraft Goods scaling export orders across US, Europe & UAE.",
    services: [
      "Handicraft Export Marketing",
      "B2B Digital Catalogue",
      "Meta Performance Ads",
      "Lead Generation Funnels",
      "Product AI Photography"
    ],
    timeline: [
      { stage: "Catalogue", status: "completed", icon: "✓" },
      { stage: "B2B Ads", status: "completed", icon: "✓" },
      { stage: "Lead Funnels", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "August 1, 2026",
        badge: "B2B Export",
        title: "US & EU Buyer Leads Funnel Live",
        description: "Generated 34 verified wholesale inquiry leads in the first 10 days."
      }
    ]
  },
  {
    id: "vedic-roots",
    name: "Vedic Roots Organic",
    industry: "Ayurveda & D2C Wellness",
    status: "Shopify Store & 5x ROAS Ads",
    isLive: true,
    progress: 90,
    expectedCompletion: "Launch Next Week",
    category: "redesign",
    description: "Building a high-converting custom Shopify store for Vedic Roots with 1-click checkout, WhatsApp customer support integration & Meta ROAS ads strategy.",
    services: [
      "Shopify Custom Development",
      "D2C Funnel Architecture",
      "Meta Ads 5x ROAS Engine",
      "Conversion Optimization"
    ],
    timeline: [
      { stage: "UI UX", status: "completed", icon: "✓" },
      { stage: "Shopify Build", status: "completed", icon: "✓" },
      { stage: "Speed Test", status: "completed", icon: "✓" },
      { stage: "Ads Launch", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "August 3, 2026",
        badge: "Shopify D2C",
        title: "98/100 Mobile PageSpeed Score Achieved",
        description: "Optimized image payloads & enabled Instant Checkout integration."
      }
    ]
  },
  {
    id: "apex-villas",
    name: "Apex Luxury Properties",
    industry: "Real Estate & Commercial",
    status: "On-Site Drone Shoot & Lead Funnel",
    isLive: true,
    progress: 50,
    expectedCompletion: "Q4 2026",
    category: "content",
    description: "Conducting high-definition on-site drone shoots, 3D villa walkthrough videos, landing page design & Google Search lead capture for luxury buyers.",
    services: [
      "On-Site Drone Shoot",
      "3D Walkthrough Videos",
      "High-Ticket Lead Funnels",
      "Google Search Ads"
    ],
    timeline: [
      { stage: "Drone Shoot", status: "completed", icon: "✓" },
      { stage: "Video Edit", status: "in-progress", icon: "🔄" },
      { stage: "Landing Page", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "July 25, 2026",
        badge: "Real Estate",
        title: "4K Aerial Villa Footage Captured",
        description: "Completed 3-day on-site drone shoot for 12 luxury villa listings."
      }
    ]
  },
  {
    id: "dr-kapoor-clinic",
    name: "Dr. Kapoor Dental & Aesthetics",
    industry: "Healthcare & Local Clinic",
    status: "24/7 AI Patient Funnel & Local SEO",
    isLive: true,
    progress: 72,
    expectedCompletion: "Active Retainer",
    category: "brand-mgmt",
    description: "Deploying 24/7 AI WhatsApp patient appointment booking, local clinic website & Google Maps Local SEO dominance for regional patients.",
    services: [
      "24/7 AI Chatbot",
      "Google Maps Local SEO",
      "Clinic Website Redesign",
      "Patient Review Automation"
    ],
    timeline: [
      { stage: "Website", status: "completed", icon: "✓" },
      { stage: "AI Chatbot", status: "completed", icon: "✓" },
      { stage: "Local SEO", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "July 31, 2026",
        badge: "Local SEO",
        title: "#1 Map Pack Ranking for Local Dentist Searches",
        description: "Generated 140+ verified patient booking inquiries this month."
      }
    ]
  },
  {
    id: "sanskriti-ethnic",
    name: "Sanskriti Ethnic Couture",
    industry: "Apparel & Festive Fashion",
    status: "Reels Shoot & Influencer Lookbooks",
    isLive: true,
    progress: 68,
    expectedCompletion: "Active Media Retainer",
    category: "content",
    description: "On-site model shoots, short-form Reels editing, lookbook cataloguing & Instagram growth management for festive ethnic wear.",
    services: [
      "On-Site Model Shoot",
      "Festive Reels Production",
      "Fashion Lookbooks",
      "Influencer Campaigns"
    ],
    timeline: [
      { stage: "Studio Shoot", status: "completed", icon: "✓" },
      { stage: "Reels Edit", status: "in-progress", icon: "🔄" },
      { stage: "Influencer Ads", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "August 2, 2026",
        badge: "Fashion Media",
        title: "Diwali Festive Campaign Shoot Wrapped",
        description: "Shot 25 designer lehenga looks for upcoming festive campaign."
      }
    ]
  },
  {
    id: "indus-gourmet-lounge",
    name: "Indus Gourmet Lounge",
    industry: "Restaurant & Hospitality",
    status: "Food Videography & Local Ads",
    isLive: true,
    progress: 80,
    expectedCompletion: "Ongoing Retainer",
    category: "content",
    description: "High-end food videography, Zomato/Swiggy menu optimization, Instagram Reels & local Google Ads driving weekend footfall.",
    services: [
      "Food Videography",
      "Instagram Reels Series",
      "Local Google Ads",
      "Menu SEO & Design"
    ],
    timeline: [
      { stage: "Food Shoot", status: "completed", icon: "✓" },
      { stage: "Reels Edit", status: "completed", icon: "✓" },
      { stage: "Local Ads", status: "in-progress", icon: "🔄" }
    ],
    updates: [
      {
        date: "July 28, 2026",
        badge: "Hospitality",
        title: "Weekend Reservation Footfall Up by 45%",
        description: "Reels campaign crossed 250,000 local organic views."
      }
    ]
  }
];

// Controller logic for rendering project cards
document.addEventListener('DOMContentLoaded', () => {
  renderLiveProjectsGrid('all');
  initFilterButtons();
  initProgressModal();
  updateLiveButtonsCount();
});

function updateLiveButtonsCount() {
  const count = LIVE_PROJECTS_DATA.length;
  document.querySelectorAll('.sticky-btn-badge').forEach(badge => {
    badge.textContent = count;
  });
  const heroStat = document.querySelector('.live-stat-item .stat-num');
  if (heroStat) {
    heroStat.textContent = count;
  }
}

function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.live-filter-chip');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderLiveProjectsGrid(cat);
    });
  });
}

function renderLiveProjectsGrid(category = 'all') {
  const container = document.getElementById('live-projects-container');
  if (!container) return;

  let filteredProjects = LIVE_PROJECTS_DATA;
  if (category !== 'all') {
    filteredProjects = LIVE_PROJECTS_DATA.filter(p => p.category === category);
  }

  container.innerHTML = filteredProjects.map(project => createProjectCardHTML(project)).join('');
  
  // Animate progress bars on render
  setTimeout(animateProgressBars, 150);
}

function createProjectCardHTML(p) {
  const servicesHTML = p.services.map(s => `<span class="service-pill">${s}</span>`).join('');
  
  const timelineHTML = p.timeline.map(t => {
    let statusClass = 'status-upcoming';
    if (t.status === 'completed') statusClass = 'status-completed';
    if (t.status === 'in-progress') statusClass = 'status-in-progress';
    return `
      <div class="timeline-step ${statusClass}" title="${t.stage}: ${t.status}">
        <span class="step-icon">${t.icon}</span>
        <span class="step-label">${t.stage}</span>
      </div>
    `;
  }).join('');

  const latestUpdate = p.updates && p.updates.length > 0 ? p.updates[0] : null;

  return `
    <article class="live-card magnetic-target" data-project-id="${p.id}">
      
      <!-- Top Card Header Row -->
      <div class="live-card-top">
        <div class="live-badge-wrapper">
          <span class="live-blinking-dot"></span>
          <span class="live-badge-text">LIVE PROJECT</span>
        </div>
        <span class="industry-badge">${p.industry}</span>
      </div>

      <!-- Project Name & Status Title -->
      <div class="live-card-head">
        <h3 class="live-project-title">${p.name}</h3>
        <span class="live-status-pill">${p.status}</span>
      </div>

      <p class="live-project-desc">${p.description}</p>

      <!-- Animated Progress Bar Container -->
      <div class="progress-section">
        <div class="progress-header">
          <span class="progress-label">Completion Status</span>
          <span class="progress-percent">${p.progress}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" data-progress="${p.progress}" style="width: 0%;"></div>
        </div>
        <div class="progress-meta">
          <span>Timeline Status: <strong>${p.expectedCompletion}</strong></span>
        </div>
      </div>

      <!-- Timeline Stage Checklist -->
      <div class="timeline-section">
        <h4 class="timeline-title">Project Stages &amp; Real-time Progress</h4>
        <div class="timeline-grid">
          ${timelineHTML}
        </div>
      </div>

      <!-- Services Included -->
      <div class="services-section">
        <h4 class="services-title">Services &amp; Scope Included</h4>
        <div class="services-pills-row">
          ${servicesHTML}
        </div>
      </div>

      <!-- Latest Update Preview Callout -->
      ${latestUpdate ? `
        <div class="latest-update-box">
          <div class="update-box-head">
            <span class="update-badge">${latestUpdate.badge}</span>
            <span class="update-date">📅 ${latestUpdate.date}</span>
          </div>
          <strong class="update-headline">${latestUpdate.title}</strong>
          <p class="update-summary">${latestUpdate.description}</p>
        </div>
      ` : ''}

      <!-- Bottom Card Action Button -->
      <div class="live-card-footer">
        <button class="btn btn-secondary view-progress-btn magnetic-target" onclick="openProjectUpdatesModal('${p.id}')">
          <span>View Detailed Progress &amp; Changelog</span>
          <span class="btn-icon">⚡</span>
        </button>
      </div>

    </article>
  `;
}

function animateProgressBars() {
  const fills = document.querySelectorAll('.progress-fill');
  fills.forEach(fill => {
    const target = fill.getAttribute('data-progress');
    fill.style.width = target + '%';
  });
}

// Global modal trigger for Project Updates
window.openProjectUpdatesModal = function(projectId) {
  const p = LIVE_PROJECTS_DATA.find(item => item.id === projectId);
  if (!p) return;

  const modal = document.getElementById('project-updates-modal');
  const modalBody = document.getElementById('project-updates-body');
  if (!modal || !modalBody) return;

  const updatesHTML = p.updates.map(u => `
    <div class="update-timeline-item">
      <div class="update-marker"></div>
      <div class="update-content">
        <div class="update-meta-row">
          <span class="update-badge-pill">${u.badge}</span>
          <span class="update-time">${u.date}</span>
        </div>
        <h4 class="update-item-title">${u.title}</h4>
        <p class="update-item-desc">${u.description}</p>
      </div>
    </div>
  `).join('');

  modalBody.innerHTML = `
    <div class="modal-project-header">
      <div class="live-badge-wrapper">
        <span class="live-blinking-dot"></span>
        <span class="live-badge-text">LIVE PROJECT UPDATES</span>
      </div>
      <h2 class="modal-project-name">${p.name}</h2>
      <p class="modal-project-sub">${p.industry} • <strong>${p.status}</strong></p>
    </div>

    <div class="modal-progress-bar-box">
      <div class="progress-header">
        <span>Overall Project Completion</span>
        <strong style="color: #d946ef;">${p.progress}%</strong>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${p.progress}%;"></div>
      </div>
    </div>

    <div class="modal-updates-timeline">
      <h3 class="timeline-heading">📋 Log of Project Milestones &amp; Updates</h3>
      <div class="updates-list">
        ${updatesHTML}
      </div>
    </div>

    <div class="modal-footer-cta">
      <p>Want a similar dedicated growth strategy built for your brand?</p>
      <button class="btn btn-primary open-contact-btn magnetic-target" onclick="closeUpdatesModalAndOpenAudit()">
        <span>Book A Free Strategy Audit →</span>
      </button>
    </div>
  `;

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('active');

  if (window.LenisInstance) {
    window.LenisInstance.stop();
  }
};

window.closeUpdatesModalAndOpenAudit = function() {
  const modal = document.getElementById('project-updates-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  const contactModal = document.getElementById('contact-modal');
  if (contactModal) {
    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
  }
};

function initProgressModal() {
  const modal = document.getElementById('project-updates-modal');
  const closeBtn = document.getElementById('close-updates-modal');
  
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      if (window.LenisInstance) window.LenisInstance.start();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (window.LenisInstance) window.LenisInstance.start();
      }
    });
  }
}
