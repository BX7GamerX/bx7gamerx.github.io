// Main script file for Sir Simon's portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTheme();
    initializeHeader();
    initializeCustomCursor();
    initializeTooltips();
    initializeSkillBars();
    initializeModalHandlers();
    handleScrollEffects();
});

// Theme toggle functionality
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.dataset.theme = currentTheme;
    
    // Update icon based on theme
    updateThemeIcon(currentTheme === 'dark');

    themeToggle.addEventListener('click', () => {
        const isDark = html.dataset.theme === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        html.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(!isDark);
        
        // Dispatch theme change event for other components
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: newTheme } 
        }));
    });
    
    function updateThemeIcon(isDark) {
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Header scroll effects
function initializeHeader() {
    const header = document.querySelector('.header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    let lastScrollTop = 0;
    
    // Handle hamburger menu
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    // Close mobile nav when clicking menu items
    const mobileNavItems = document.querySelectorAll('.mobile-nav a');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
}

// Custom cursor implementation
function initializeCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    // Skip on mobile devices
    if (window.innerWidth <= 768 || !cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Cursor effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .theme-toggle, .skill-icon, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'var(--accent-neon-cyan)';
        });
    });
}

// Custom tooltips
function initializeTooltips() {
    const tooltip = document.querySelector('.custom-tooltip');
    const tooltipText = document.querySelector('.tooltip-text');
    
    if (!tooltip || !tooltipText) return;
    
    document.addEventListener('mousemove', (e) => {
        const target = e.target;
        const tooltipAttr = target.dataset.tooltip;
        
        if (tooltipAttr) {
            tooltip.classList.add('show');
            tooltipText.textContent = tooltipAttr;
            
            const rect = target.getBoundingClientRect();
            const tooltipHeight = tooltip.offsetHeight;
            
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - tooltipHeight - 10}px`;
        } else {
            tooltip.classList.remove('show');
        }
    });
}

// Animate skill bars on scroll
function initializeSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.dataset.percent;
                entry.target.style.width = `${percent}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
}

// Project modal functionality
function initializeModalHandlers() {
    const projectModal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    const closeModal = document.querySelector('.close-modal');
    
    if (!projectModal || !modalContent || !closeModal) return;
    
    // Open modal and load project details
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const projectCard = btn.closest('.project-card');
            const projectId = projectCard.dataset.project;
            
            projectModal.style.display = 'block';
            loadProjectDetails(projectId);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });
    
    function loadProjectDetails(projectId) {
        // Placeholder for dynamic project loading - would typically fetch from a data source
        const projects = {
            'gainchain': {
                title: 'Gain Chain AI',
                description: 'An advanced AI platform leveraging blockchain technology for secure, transparent data processing. Built using Rust for the core backend infrastructure and Python for machine learning components.',
                image: 'assets/gainchain.jpeg',
                features: [
                    'Secure blockchain-based data storage',
                    'Advanced machine learning models',
                    'Real-time processing capabilities',
                    'Decentralized architecture'
                ],
                technologies: ['Rust', 'Python', 'TensorFlow', 'Blockchain', 'Tokio', 'PyTorch'],
                githubUrl: 'https://github.com/bx7gamerx/gainchain'
            },
            'kilo': {
                title: 'Kilo Delivery App',
                description: 'A comprehensive delivery application with routing optimization, real-time tracking, and intuitive user interfaces for both customers and delivery personnel.',
                image: 'assets/web_dev.png',
                features: [
                    'Real-time delivery tracking',
                    'Route optimization algorithms',
                    'Customer and driver mobile interfaces',
                    'Secure payment processing'
                ],
                technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'React Native', 'Google Maps API'],
                githubUrl: 'https://github.com/bx7gamerx/kilo-app'
            }
        };
        
        const project = projects[projectId];
        
        if (!project) {
            modalContent.innerHTML = '<p>Project details not found</p>';
            return;
        }
        
        modalContent.innerHTML = `
            <div class="project-modal-header">
                <h2>${project.title}</h2>
            </div>
            <div class="project-modal-content">
                <div class="project-modal-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-modal-description">
                    <p>${project.description}</p>
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <h3>Technologies Used</h3>
                    <div class="project-modal-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="project-modal-links">
                        <a href="${project.githubUrl}" target="_blank" class="github-link">View on GitHub</a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Enhanced scroll effects for minimalist design
function handleScrollEffects() {
    const header = document.querySelector('.header');
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const background = document.querySelector('.network-background');
    const body = document.body;
    let lastScrollTop = 0;
    let scrollTimeout;
    
    // Handle scroll events
    window.addEventListener('scroll', () => {
        // Update progress bar
        if (scrollProgress) {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        }
        
        // Header hide/show effect
        if (header) {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
                body.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
                body.classList.remove('scrolled');
            }
            
            if (currentScroll > 300) {
                if (currentScroll > lastScrollTop) {
                    // Scrolling down
                    header.classList.add('hidden');
                } else {
                    // Scrolling up
                    header.classList.remove('hidden');
                }
            }
            
            lastScrollTop = currentScroll;
        }
        
        // Enhanced Focus Mode - Add 'focused-content' class when user is deep into content
        clearTimeout(scrollTimeout);
        
        if (window.scrollY > window.innerHeight) {
            body.classList.add('focused-content');
        }
        
        // Remove focused-content class after scrolling stops
        scrollTimeout = setTimeout(() => {
            if (window.scrollY <= window.innerHeight) {
                body.classList.remove('focused-content');
            }
        }, 1000);
        
        // Reveal animations for elements
        handleRevealAnimations();
    });
    
    // Scroll reveal animations
    function handleRevealAnimations() {
        const elementsToReveal = document.querySelectorAll('.reveal-on-scroll:not(.active)');
        
        elementsToReveal.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < window.innerHeight * 0.85) {
                element.classList.add('active');
            }
        });
    }
    
    // Initialize scroll position on page load
    setTimeout(() => {
        window.scrollTo(0, window.scrollY + 1);
        window.scrollTo(0, window.scrollY - 1);
    }, 100);
}

// Clear loading overlay once everything is initialized
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 500);
    }
});