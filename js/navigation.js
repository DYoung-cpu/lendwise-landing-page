// LendWise Navigation - Tab Bar & Smooth Scroll

// Navigation state
const navState = {
    activeSection: 'story',
    isScrolling: false,
    lastScrollY: 0
};

// Section IDs for navigation
const sections = ['story', 'odin', 'team', 'achievements', 'commitment', 'programs', 'faq', 'apply'];

// Initialize navigation
function initNavigation() {
    setupTabBar();
    setupSmoothScroll();
    setupHeaderBehavior();
    updateActiveTab();

    console.log('✅ Navigation initialized');
}

// Setup bottom tab bar
function setupTabBar() {
    const tabItems = document.querySelectorAll('.tab-item');

    tabItems.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('href')?.replace('#', '') || tab.dataset.section;

            if (targetId) {
                scrollToSection(targetId);
                setActiveTab(targetId);
            }
        });
    });
}

// Setup smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetId = href.replace('#', '');
                scrollToSection(targetId);
            }
        });
    });
}

// Scroll to a section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    navState.isScrolling = true;

    const headerHeight = document.querySelector('.header')?.offsetHeight || 48;
    const targetPosition = section.offsetTop - headerHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    // Reset scrolling flag after animation
    setTimeout(() => {
        navState.isScrolling = false;
    }, 1000);
}

// Set active tab
function setActiveTab(sectionId) {
    navState.activeSection = sectionId;

    document.querySelectorAll('.tab-item').forEach(tab => {
        const tabSection = tab.getAttribute('href')?.replace('#', '') || tab.dataset.section;
        tab.classList.toggle('active', tabSection === sectionId);
    });
}

// Update active tab based on scroll position
function updateActiveTab() {
    const observer = new IntersectionObserver((entries) => {
        if (navState.isScrolling) return;

        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                const sectionId = entry.target.id;
                if (sections.includes(sectionId)) {
                    setActiveTab(sectionId);
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.3, 0.5, 0.7, 1]
    });

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            observer.observe(section);
        }
    });
}

// Setup header hide/show on scroll
function setupHeaderBehavior() {
    const header = document.querySelector('.header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll(header);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Handle scroll for header visibility
function handleScroll(header) {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - navState.lastScrollY;

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > 100) {
        if (scrollDelta > 10) {
            header.style.transform = 'translateY(-100%)';
        } else if (scrollDelta < -10) {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.style.transform = 'translateY(0)';
    }

    // Add background blur when scrolled
    header.classList.toggle('scrolled', currentScrollY > 10);

    navState.lastScrollY = currentScrollY;
}

// Mobile menu toggle (for hamburger menu if needed)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.menu-toggle');

    if (mobileMenu) {
        mobileMenu.classList.toggle('open');
        menuButton?.setAttribute('aria-expanded',
            mobileMenu.classList.contains('open').toString()
        );

        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }
}

// Close mobile menu
function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.menu-toggle');

    if (mobileMenu) {
        mobileMenu.classList.remove('open');
        menuButton?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        scrollToSection,
        setActiveTab,
        toggleMobileMenu,
        closeMobileMenu
    };
}
