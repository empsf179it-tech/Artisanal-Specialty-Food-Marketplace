/**
 * PAW & HARVEST - MAIN JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Sticky Header
  const navbar = document.querySelector('.navbar');

  // Sticky Navbar
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }
  });

  // Mobile Menu
  const openMobileMenu = () => {
    const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    if(mobileNavDrawer) mobileNavDrawer.classList.add('open');
    if(mobileNavOverlay) mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Accessibility focus
    if(mobileNavClose) setTimeout(() => mobileNavClose.focus(), 300);
  };

  const closeMobileMenu = () => {
    const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    
    if(mobileNavDrawer) mobileNavDrawer.classList.remove('open');
    if(mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.hamburger')) {
      openMobileMenu();
    } else if (target.closest('.mobile-nav-close') || target.closest('.mobile-nav-overlay') || target.closest('.mobile-nav-link')) {
      closeMobileMenu();
    }
  });

  // Theme Toggle
  const themeBtns = document.querySelectorAll('.theme-toggle');
  
  const initTheme = () => {
    const savedTheme = localStorage.getItem('ph-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ph-theme', newTheme);
  };

  themeBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  initTheme();

  // CTA Modal (Enquiry)
  const ctaBtns = document.querySelectorAll('.cta-trigger');
  const ctaModal = document.getElementById('enquiryModal');
  const ctaModalCloseBtns = document.querySelectorAll('.modal-close');
  
  const openModal = () => {
    if(!ctaModal) return;
    ctaModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if(!ctaModal) return;
    ctaModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  ctaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  ctaModalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));
  if (ctaModal) {
    ctaModal.addEventListener('click', (e) => {
      if (e.target === ctaModal) closeModal();
    });
  }

  // Keyboard accessibility (ESC)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeModal();
    }
  });

  // Form Validation
  const enquiryForm = document.getElementById('enquiryForm');
  const formSuccess = document.getElementById('formSuccess');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation
      let isValid = true;
      const requiredFields = enquiryForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          isValid = false;
          group.classList.add('has-error');
        } else {
          group.classList.remove('has-error');
        }
      });

      if (isValid) {
        enquiryForm.style.display = 'none';
        if(formSuccess) formSuccess.style.display = 'block';
        
        // Reset form for future
        setTimeout(() => {
          enquiryForm.reset();
          enquiryForm.style.display = 'block';
          if(formSuccess) formSuccess.style.display = 'none';
          closeModal();
        }, 3000);
      }
    });

    // Remove error on input
    enquiryForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if(group) group.classList.remove('has-error');
      });
    });
  }

  // Nutrition Selector (Home Page Demo Data)
  const nutritionSelectors = document.querySelectorAll('.nutrition-selector .selector-btn');
  const nutritionResult = document.getElementById('nutritionResult');

  const demoNutritionData = {
    dog: { title: 'Premium Dog Nutrition', desc: 'Thoughtfully prepared recipes with carefully selected ingredients for dogs of all sizes.', type: 'Dog Food' },
    cat: { title: 'Specialty Cat Nutrition', desc: 'Refined nutrition options designed around feline needs and natural instincts.', type: 'Cat Food' },
    puppy: { title: 'Puppy Growth', desc: 'Specific formulations supporting healthy development during the critical growth phase.', type: 'Puppy Food' },
    kitten: { title: 'Kitten Development', desc: 'High-energy, nutrient-dense options for growing kittens.', type: 'Kitten Food' },
    active: { title: 'Active Lifestyle', desc: 'Higher protein and energy-dense foods to support working or highly active pets.', type: 'Performance Food' },
    sensitive: { title: 'Sensitive Diet', desc: 'Limited ingredient recipes to support pets with food sensitivities.', type: 'Specialty Nutrition' }
  };

  nutritionSelectors.forEach(btn => {
    btn.addEventListener('click', () => {
      nutritionSelectors.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const type = btn.getAttribute('data-type');
      const data = demoNutritionData[type];
      
      if (nutritionResult && data) {
        nutritionResult.style.opacity = 0;
        setTimeout(() => {
          nutritionResult.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.desc}</p>
            <p class="text-eyebrow mt-lg">Suggested Type: ${data.type}</p>
            <p class="text-eyebrow" style="color: var(--c-forest); opacity: 0.6; font-size: 0.7rem; margin-top: var(--space-md);">Illustrative nutrition guidance — consult a qualified veterinarian for individual dietary needs.</p>
          `;
          nutritionResult.style.opacity = 1;
        }, 300);
      }
    });
  });

  // Scroll Reveal via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: stop observing once revealed
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -100px 0px',
      threshold: 0
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If reduced motion or no observer, just show them
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Active Navigation State based on URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Search Interaction (Basic Demo)
  const searchBtn = document.querySelector('.search-toggle');
  const searchPanel = document.querySelector('.search-panel');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  
  const openSearch = () => {
    if(searchPanel) {
      searchPanel.classList.add('open');
      setTimeout(() => searchInput && searchInput.focus(), 300);
    }
  };
  const closeSearch = () => {
    if(searchPanel) searchPanel.classList.remove('open');
  };

  if(searchBtn) searchBtn.addEventListener('click', openSearch);
  if(searchClose) searchClose.addEventListener('click', closeSearch);

  // Search demo data
  const searchData = [
    { title: "Harvest Chicken Recipe", type: "Dog Food" },
    { title: "Fieldflower Cat Recipe", type: "Cat Food" },
    { title: "Garden Roots Treats", type: "Treats" },
    { title: "Ocean & Oat Freeze-Dried", type: "Specialty" },
    { title: "Understanding Pet Food Ingredients", type: "Journal" },
    { title: "Natural Treats: What to Look For", type: "Journal" }
  ];

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      searchResults.innerHTML = '';
      
      if (!val) return;
      
      const filtered = searchData.filter(item => 
        item.title.toLowerCase().includes(val) || 
        item.type.toLowerCase().includes(val)
      );
      
      if (filtered.length > 0) {
        filtered.forEach(item => {
          const div = document.createElement('div');
          div.className = 'search-result-item';
          div.innerHTML = `<strong>${item.title}</strong> <span class="text-eyebrow" style="font-size: 0.6rem; display:inline-block; margin-left:8px;">${item.type}</span>`;
          searchResults.appendChild(div);
        });
      } else {
        searchResults.innerHTML = '<p style="opacity: 0.7;">No matching content found.</p>';
      }
    });
  }

  // Back to Top Button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.innerHTML = '<svg viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
