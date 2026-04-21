// ============================================================
//  ČPZP – Zdraví v mobilu – script.js
// ============================================================

// ---- Mobile navigation toggle ----------------------------
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}

// ---- Feature section: tabs (desktop) / dropdown (mobile) --
const MOBILE_BP    = 1200;
const featureGrid  = document.querySelector('.feature-grid');
const featureItems = document.querySelectorAll('.feature-item[data-target]');

// Desktop panels
const desktopPanels = document.querySelectorAll('.feature-panel .feature-content');
// Mobile panels
const mobilePanels  = document.querySelectorAll('.mobile-feature-panel .feature-content');

if (!featureItems.length) {
  // Not on subpage — nothing to do
}

// ── helpers ────────────────────────────────────────────────
function isMobile() { return window.innerWidth <= MOBILE_BP; }

function setActive(item) {
  featureItems.forEach(el => {
    el.classList.remove('feature-item--active');
    el.setAttribute('aria-selected', 'false');
  });
  item.classList.add('feature-item--active');
  item.setAttribute('aria-selected', 'true');
}

// ── Desktop: classic tab panel ─────────────────────────────
function activateDesktop(item) {
  setActive(item);
  const panelId = `panel-${item.dataset.target}`;
  desktopPanels.forEach(p => p.classList.remove('feature-content--active'));
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('feature-content--active');
  else if (desktopPanels[0]) desktopPanels[0].classList.add('feature-content--active');
}

// ── Mobile: dropdown selector ──────────────────────────────
function openDropdown() {
  featureGrid.classList.add('feature-grid--open');
}

function closeDropdown() {
  featureGrid.classList.remove('feature-grid--open');
}

function activateMobile(item) {
  setActive(item);
  closeDropdown();

  // Show matching mobile panel
  const panelId = `mob-panel-${item.dataset.target}`;
  mobilePanels.forEach(p => p.classList.remove('feature-content--active'));
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('feature-content--active');
  else if (mobilePanels[0]) mobilePanels[0].classList.add('feature-content--active');
}

// ── Event wiring ───────────────────────────────────────────
featureItems.forEach(item => {
  item.addEventListener('click', e => {
    if (!isMobile()) {
      activateDesktop(item);
      return;
    }

    const isOpen    = featureGrid.classList.contains('feature-grid--open');
    const isActive  = item.classList.contains('feature-item--active');

    if (!isOpen) {
      // Closed: clicking active item opens dropdown
      openDropdown();
    } else if (isActive) {
      // Open: clicking active item closes dropdown
      closeDropdown();
    } else {
      // Open: clicking another item selects it and closes
      activateMobile(item);
    }
  });

  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', e => {
  if (isMobile() && featureGrid && !featureGrid.contains(e.target)) {
    closeDropdown();
  }
});

// ── Resize: re-initialise when crossing breakpoint ─────────
let lastMobile = isMobile();
window.addEventListener('resize', () => {
  const nowMobile = isMobile();
  if (nowMobile === lastMobile) return;
  lastMobile = nowMobile;
  closeDropdown();
  const first = featureItems[0];
  if (!first) return;
  if (nowMobile) activateMobile(first);
  else           activateDesktop(first);
});

// ── Initial activation ─────────────────────────────────────
if (featureItems.length) {
  const first = featureItems[0];
  if (isMobile()) activateMobile(first);
  else            activateDesktop(first);
}

// ---- FAQ accordion toggle ---------------------------------
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const header = item.querySelector('.faq-item__header');
  const body   = item.querySelector('.faq-item__body');
  if (!header || !body) return;

  header.addEventListener('click', () => {
    const isOpen = item.classList.contains('faq-item--open');

    // Close all other items first
    faqItems.forEach(other => {
      if (other !== item) {
        other.classList.remove('faq-item--open');
        const otherHeader = other.querySelector('.faq-item__header');
        const otherBody   = other.querySelector('.faq-item__body');
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        if (otherBody)   otherBody.hidden = true;
      }
    });

    if (isOpen) {
      item.classList.remove('faq-item--open');
      header.setAttribute('aria-expanded', 'false');
      body.hidden = true;
    } else {
      item.classList.add('faq-item--open');
      header.setAttribute('aria-expanded', 'true');
      body.hidden = false;
    }
  });
});
