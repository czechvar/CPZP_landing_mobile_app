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

  // Close menu when a link inside it is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}

// ---- Feature tabs on subpage (Pojištěnci) -----------------
const featureItems = document.querySelectorAll('.feature-item[data-target]');
const featureContents = document.querySelectorAll('.feature-content');

if (featureItems.length > 0) {
  featureItems.forEach(item => {
    item.addEventListener('click', () => activateFeature(item));

    // Keyboard accessibility
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateFeature(item);
      }
    });
  });

  function activateFeature(item) {
    const target = item.getAttribute('data-target');
    const panelId = `panel-${target}`;

    // Update tab states
    featureItems.forEach(el => {
      el.classList.remove('feature-item--active');
      el.setAttribute('aria-selected', 'false');
    });
    item.classList.add('feature-item--active');
    item.setAttribute('aria-selected', 'true');

    // Show matching panel (fall back to first if no matching panel)
    featureContents.forEach(panel => {
      panel.classList.remove('feature-content--active');
    });

    const activePanel = document.getElementById(panelId);
    if (activePanel) {
      activePanel.classList.add('feature-content--active');
    } else {
      // No specific panel – show a generic placeholder
      showGenericPanel(item.querySelector('.feature-item__label')?.textContent || target);
    }
  }

  function showGenericPanel(label) {
    // If we don't have a specific panel, briefly flash a message in the first panel
    const firstPanel = featureContents[0];
    if (firstPanel) {
      firstPanel.classList.add('feature-content--active');
    }
  }
}
