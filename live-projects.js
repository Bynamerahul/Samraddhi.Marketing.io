/* ==========================================================================
   SAMRADDHI MARKETING - LIVE PROJECTS DYNAMIC DATA & CONTROLLER
   ========================================================================== */

const LIVE_PROJECTS_DATA = [
  {
    id: "ooak-vogue",
    name: "OOAK Vogue",
    industry: "Luxury Fashion & Ecommerce",
    status: "Website Redesign in Progress",
    isLive: true,
    progress: 65,
    expectedCompletion: "Q3 2026 (3 Weeks Remaining)",
    description: "We are redesigning the existing OOAK Vogue website into a modern, premium, mobile-first and conversion-focused digital experience using an AI-assisted workflow while maintaining human-led strategy and creativity.",
    services: [
      "Website Redesign",
      "UI/UX",
      "Responsive Design",
      "Ecommerce Experience",
      "SEO Optimization",
      "Performance Optimization",
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
        title: "Mobile-First Wireframes & Glassmorphic UI System Approved",
        description: "Completed and approved 3D product showcase components, fast filter architecture, and dark mode luxury color palette for OOAK Vogue."
      },
      {
        date: "July 26, 2026",
        badge: "Architecture",
        title: "AI-Assisted Workflow Setup & Catalogue Schema Mapping",
        description: "Configured AI prompt pipelines for high-resolution model imagery & optimized product listing schema structure."
      },
      {
        date: "July 18, 2026",
        badge: "Kickoff",
        title: "Competitor UX Audit & Strategy Finalized",
        description: "Audited legacy site speed bottlenecks, cart abandonment triggers, and mobile checkout friction points."
      }
    ]
  },
  {
    id: "sanskriti-vintage-b2b",
    name: "Sanskriti Vintage B2B",
    industry: "Heritage Textiles & Export Wholesale",
    status: "B2B Portal & Inventory Sync",
    isLive: true,
    progress: 80,
    expectedCompletion: "Q3 2026 (2 Weeks Remaining)",
    description: "Building an international B2B wholesale portal with live currency conversions, automated sample booking, and digital catalogue sync for global exporters.",
    services: [
      "B2B Wholesale Portal",
      "Etsy / Ebay Sync",
      "International SEO",
      "Product AI Enhancements",
      "Lead Generation Automation"
    ],
    timeline: [
      { stage: "Research", status: "completed", icon: "✓" },
      { stage: "Planning", status: "completed", icon: "✓" },
      { stage: "Wireframes", status: "completed", icon: "✓" },
      { stage: "UI Design", status: "completed", icon: "✓" },
      { stage: "Development", status: "in-progress", icon: "🔄" },
      { stage: "Testing", status: "in-progress", icon: "🔄" },
      { stage: "Launch", status: "upcoming", icon: "⏳" }
    ],
    updates: [
      {
        date: "August 1, 2026",
        badge: "Integration",
        title: "Global Currency & WhatsApp Inquiry API Deployed",
        description: "Successfully connected multi-currency pricing engine and automated WhatsApp quotation dispatch."
      },
      {
        date: "July 22, 2026",
        badge: "UI Design",
        title: "Heritage B2B Catalogue Grid Finalized",
        description: "Implemented high-speed image CDN and bulk order request forms for international wholesale buyers."
      }
    ]
  },
  {
    id: "dr-kapoor-clinic",
    name: "Dr. Kapoor Dental & Aesthetics",
    industry: "Healthcare & Local Clinic",
    status: "AI Patient Funnel & Local SEO",
    isLive: true,
    progress: 45,
    expectedCompletion: "Q4 2026 (4 Weeks Remaining)",
    description: "Creating a high-trust local clinic website with 24/7 AI WhatsApp patient appointment booking and Google Maps Local SEO dominance.",
    services: [
      "Clinic Website",
      "24/7 AI Chatbot",
      "Google Maps Local SEO",
      "Meta Ads Funnel",
      "Patient Review Engine"
    ],
    timeline: [
      { stage: "Research", status: "completed", icon: "✓" },
      { stage: "Planning", status: "completed", icon: "✓" },
      { stage: "Wireframes", status: "completed", icon: "✓" },
      { stage: "UI Design", status: "in-progress", icon: "🔄" },
      { stage: "Development", status: "upcoming", icon: "⏳" },
      { stage: "Testing", status: "upcoming", icon: "⏳" },
      { stage: "Launch", status: "upcoming", icon: "⏳" }
    ],
    updates: [
      {
        date: "July 30, 2026",
        badge: "Strategy",
        title: "AI Booking Assistant & Local SEO Keywords Mapped",
        description: "Configured automated patient consultation flow and targeted top dental search queries in the local region."
      }
    ]
  }
];

// Controller logic for rendering project cards
document.addEventListener('DOMContentLoaded', () => {
  renderLiveProjectsGrid();
  initProgressModal();
});

function renderLiveProjectsGrid(filterIndustry = 'all') {
  const container = document.getElementById('live-projects-container');
  if (!container) return;

  const filteredProjects = filterIndustry === 'all' 
    ? LIVE_PROJECTS_DATA 
    : LIVE_PROJECTS_DATA.filter(p => p.industry.toLowerCase().includes(filterIndustry.toLowerCase()));

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
          <span class="live-badge-text">LIVE</span>
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
          <span>Target Launch: <strong>${p.expectedCompletion}</strong></span>
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
          <span>View Progress &amp; Changelog</span>
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
        <strong style="color: #ff70a6;">${p.progress}%</strong>
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
      <p>Want a similar modern, high-converting site built for your brand?</p>
      <button class="btn btn-primary open-contact-btn magnetic-target" onclick="closeUpdatesModalAndOpenAudit()">
        <span>Book A Free Website Audit →</span>
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
