// LendWise Scroll Effects - Reveal Animations & Parallax

// Initialize all scroll effects
function initScrollEffects() {
    initScrollReveal();
    initParallax();
    initCounterAnimations();

    console.log('✅ Scroll effects initialized');
}

// Initialize scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .stagger-children');

    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing (one-time animation)
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// Initialize parallax effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (!parallaxElements.length) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const rect = el.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const offset = (centerY - viewportCenter) * speed;

            el.style.transform = `translateY(${offset}px)`;
        });
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Initialize counter/number animations
function initCounterAnimations() {
    const counterElements = document.querySelectorAll('[data-counter]');

    if (!counterElements.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counterElements.forEach(el => {
        counterObserver.observe(el);
    });
}

// Animate a counter element
function animateCounter(element) {
    const target = parseInt(element.dataset.counter, 10);
    const duration = parseInt(element.dataset.duration, 10) || 2000;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';

    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);

        element.textContent = prefix + current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (window.scrollY / scrollHeight) * 100;
                progressBar.style.width = `${scrollPercent}%`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Fade header on scroll
function initHeaderFade() {
    const header = document.querySelector('.header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const opacity = Math.min(1, window.scrollY / 100);
                header.style.setProperty('--header-opacity', opacity);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Lazy load images
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if (!lazyImages.length) return;

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Section highlight on scroll
function initSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');

    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update URL hash without scrolling
                if (history.replaceState) {
                    history.replaceState(null, null, `#${entry.target.id}`);
                }
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize all effects on load
window.addEventListener('lendwise:ready', () => {
    initScrollEffects();
    initScrollProgress();
    initLazyLoad();
});

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollEffects,
        initScrollReveal,
        initParallax,
        initCounterAnimations,
        animateCounter,
        initLazyLoad
    };
}
