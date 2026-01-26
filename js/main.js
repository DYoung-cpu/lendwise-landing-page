// LendWise Mobile - Main Application

// App state
const app = {
    initialized: false,
    modals: {},
    accordions: {}
};

// Initialize application
function initApp() {
    if (app.initialized) return;

    console.log('🚀 Initializing LendWise Mobile...');

    initModals();
    initAccordions();
    initProgramCards();
    initTeamCards();
    initApplyButton();
    initExternalLinks();

    app.initialized = true;
    console.log('✅ LendWise Mobile ready');
}

// Modal functionality
function initModals() {
    // Setup modal triggers
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modalTrigger;
            openModal(modalId);
        });
    });

    // Setup modal close buttons
    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target === el) {
                closeAllModals();
            }
        });
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.querySelector('.modal-backdrop');

    if (modal) {
        backdrop?.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus trap
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length) {
            focusableElements[0].focus();
        }
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
    document.querySelector('.modal-backdrop')?.classList.remove('active');
    document.body.style.overflow = '';
}

// Accordion functionality
function initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion-item');
            const accordion = trigger.closest('.accordion');
            const isActive = item.classList.contains('active');

            // Close other items in same accordion
            accordion?.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

// Program cards - click to open modal
function initProgramCards() {
    document.querySelectorAll('.program-card').forEach(card => {
        card.addEventListener('click', () => {
            const programId = card.dataset.program;
            if (programId) {
                openModal(`modal-${programId}`);
            }
        });

        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// Team cards - expand on click (mobile)
function initTeamCards() {
    document.querySelectorAll('.team-card').forEach(card => {
        const bio = card.querySelector('.team-bio');
        if (!bio) return;

        // On mobile, toggle bio visibility
        if (window.innerWidth < 768) {
            bio.style.display = 'none';
            card.style.cursor = 'pointer';

            card.addEventListener('click', () => {
                const isVisible = bio.style.display !== 'none';
                bio.style.display = isVisible ? 'none' : 'block';
                card.classList.toggle('expanded', !isVisible);
            });
        }
    });
}

// Apply button tracking
function initApplyButton() {
    document.querySelectorAll('.apply-btn, [data-apply-btn]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Track click if analytics available
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Apply Now',
                    value: 1
                });
            }

            // The button should be a link, but if it's not, redirect
            if (!btn.href) {
                e.preventDefault();
                window.open(
                    'https://lendwisemtg.mymortgage-online.com/borrower-app/registration/?workFlowId=223023&action=login&dest=/loan-app/&siteId=1956469515',
                    '_blank',
                    'noopener,noreferrer'
                );
            }
        });
    });
}

// External links - open in new tab with proper security
function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        const isExternal = !link.href.includes(window.location.hostname);
        if (isExternal) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// FAQ data
const faqData = [
    {
        question: "What types of loans does LendWise offer?",
        answer: "We offer a comprehensive range of mortgage products including Conventional, Jumbo, FHA, VA, DSCR, Bank Statement loans, Fix and Flip, First Time Homebuyer programs, and HELOCs. Our team will help you find the best fit for your needs."
    },
    {
        question: "How long does the loan process take?",
        answer: "Our streamlined process, powered by Odin AI, can get you from application to closing in as little as 21 days for qualified borrowers. We'll keep you informed every step of the way."
    },
    {
        question: "What is Odin AI?",
        answer: "Odin is our AI-powered platform that assists both borrowers and loan officers throughout the mortgage process. It provides instant answers, automated document analysis, and smart recommendations to make your experience faster and smoother."
    },
    {
        question: "What documents do I need to apply?",
        answer: "Generally, you'll need proof of income (pay stubs, W-2s), bank statements, tax returns, and identification. Our Odin AI assistant can guide you through exactly what's needed based on your specific loan type."
    },
    {
        question: "How do I get started?",
        answer: "Click the 'Apply Now' button to begin your application online. You can also contact us directly and one of our loan officers will guide you through the process."
    }
];

// Populate FAQ section
function populateFAQ() {
    const faqContainer = document.querySelector('.faq-list');
    if (!faqContainer) return;

    faqContainer.innerHTML = faqData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">
                <span>${item.question}</span>
                <svg class="accordion-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </button>
            <div class="accordion-content">
                <div class="accordion-body">${item.answer}</div>
            </div>
        </div>
    `).join('');

    // Reinitialize accordions after populating
    initAccordions();
}

// Loan programs data
const loanPrograms = [
    { id: 'conventional', icon: '🏠', title: 'Conventional', description: 'Traditional financing with competitive rates and flexible terms.' },
    { id: 'jumbo', icon: '🏰', title: 'Jumbo', description: 'For luxury homes exceeding conventional loan limits.' },
    { id: 'fha', icon: '🏛️', title: 'FHA', description: 'Government-backed loans with lower down payment options.' },
    { id: 'va', icon: '🎖️', title: 'VA', description: 'Exclusive benefits for veterans and service members.' },
    { id: 'dscr', icon: '📊', title: 'DSCR', description: 'Investment property loans based on rental income.' },
    { id: 'bank-statement', icon: '📋', title: 'Bank Statements', description: 'Alternative income documentation for self-employed borrowers.' },
    { id: 'fix-flip', icon: '🔨', title: 'Fix and Flip', description: 'Short-term financing for property investors.' },
    { id: 'first-time', icon: '🔑', title: 'First Time Homebuyer', description: 'Special programs and education for new buyers.' },
    { id: 'heloc', icon: '💰', title: 'HELOCs', description: 'Access your home equity with flexible credit lines.' }
];

// Populate loan programs
function populateLoanPrograms() {
    const programsGrid = document.querySelector('.programs-grid');
    if (!programsGrid) return;

    programsGrid.innerHTML = loanPrograms.map(program => `
        <div class="program-card" data-program="${program.id}">
            <div class="program-icon">${program.icon}</div>
            <h3 class="program-title">${program.title}</h3>
            <p class="program-description">${program.description}</p>
        </div>
    `).join('');

    initProgramCards();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    populateFAQ();
    populateLoanPrograms();
});

// Initialize after intro animation
window.addEventListener('lendwise:ready', initApp);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initApp,
        openModal,
        closeAllModals,
        faqData,
        loanPrograms
    };
}
