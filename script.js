// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggler
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Loading Animation
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Custom Cursor
    const customCursor = document.querySelector('.custom-cursor');
    const trailElements = 10; // Number of trail elements
    const trails = [];
    
    // Audio Control
    const audioControl = document.querySelector('.audio-control');
    const audioPlayer = document.querySelector('#background-audio');
    const audioVisualizer = document.querySelector('.audio-visualizer');
    
    // Nav elements
    const header = document.querySelector('.header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Scroll Progress Bar
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    
    // Create cursor trails
    for (let i = 0; i < trailElements; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        document.body.appendChild(trail);
        trails.push(trail);
    }
    
    // Initialize Typed.js
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: ['Frontend Developer', 'UI/UX Designer', 'Web Enthusiast', 'Problem Solver', 'Full Stack Developer'],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            cursorChar: '|', // Fixed cursor character
            showCursor: true, // Ensure cursor is visible
            fadeOut: false,   // Prevent cursor from fading out
            autoInsertCss: true, // Ensure Typed.js inserts its CSS
            onStringTyped: function() {
                // Make sure the cursor stays visible
                document.querySelector('.typed-cursor').style.opacity = '1';
                document.querySelector('.typed-cursor').style.animation = 'typed-cursor-blink 1s infinite';
            }
        });
    }

    // Theme Toggle Functionality
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Add animation to theme toggle
        themeToggle.classList.add('pulse');
        setTimeout(() => {
            themeToggle.classList.remove('pulse');
        }, 1000);
    });
    
    // Custom Cursor
    function updateCursor(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Update main cursor
        customCursor.style.left = `${posX}px`;
        customCursor.style.top = `${posY}px`;
        
        // Update trails with delay
        trails.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = `${posX}px`;
                trail.style.top = `${posY}px`;
                
                // Fade out trail
                trail.style.opacity = 0.6 - (index * 0.05);
                trail.style.width = `${8 - (index * 0.5)}px`;
                trail.style.height = `${8 - (index * 0.5)}px`;
            }, index * 40);
        });
    }
    
    document.addEventListener('mousemove', updateCursor);
    
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        customCursor.style.display = 'none';
        trails.forEach(trail => {
            trail.style.display = 'none';
        });
    }
    
    // Cursor over interactive elements
    document.querySelectorAll('a, button, .btn, .interactive').forEach(item => {
        item.addEventListener('mouseenter', () => {
            customCursor.style.width = '40px';
            customCursor.style.height = '40px';
            customCursor.style.backgroundColor = 'rgba(0, 255, 255, 0.5)';
        });
        
        item.addEventListener('mouseleave', () => {
            customCursor.style.width = '20px';
            customCursor.style.height = '20px';
            customCursor.style.backgroundColor = 'var(--accent-neon-cyan)';
        });
    });
    
    // Hide loading overlay after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';

            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: false
            });

            // Initialize skill bars with animation
            initSkillBars();
        }, 1000);
    });

    // Mobile Navigation
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile nav when clicking a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Scroll effects
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update scroll progress bar
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        scrollProgressBar.style.width = `${scrollProgress}%`;
        
        // Header background on scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Auto-hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        // Animate skill bars on scroll
        animateSkillBarsOnScroll();
    });
    
    // Skill Bars Animation
    function initSkillBars() {
        document.querySelectorAll('.skill-level').forEach(bar => {
            const percent = bar.getAttribute('data-percent') || '0';
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = percent + '%';
            }, 300);
        });
    }
    
    function animateSkillBarsOnScroll() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;
        
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            document.querySelectorAll('.skill-level').forEach(bar => {
                const percent = bar.getAttribute('data-percent') || '0';
                bar.style.width = percent + '%';
            });
        }
    }
    
    // Animate skill icons
    document.querySelectorAll('.skill-icon').forEach((icon, index) => {
        // Add staggered floating animation
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('floating-icon');
        
        // Add hover effect with scale and glow
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('skill-icon-hover');
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('skill-icon-hover');
        });
        
        // Add click effect to show more details
        icon.addEventListener('click', () => {
            const skillName = icon.querySelector('span').textContent;
            showSkillDetails(skillName, icon);
        });
    });
    
    function showSkillDetails(skillName, element) {
        // Create modal with skill details
        const modal = document.createElement('div');
        modal.classList.add('skill-modal');
        
        // Get skill info based on name
        const skillInfo = getSkillInfo(skillName);
        
        modal.innerHTML = `
            <div class="skill-modal-content">
                <div class="skill-modal-header">
                    <h3>${skillName}</h3>
                    <span class="skill-modal-close">&times;</span>
                </div>
                <div class="skill-modal-body">
                    <p>${skillInfo.description}</p>
                    <div class="skill-experience">
                        <div class="experience-bar">
                            <div class="experience-fill" style="width: ${skillInfo.experience}%"></div>
                        </div>
                        <span>${skillInfo.experience}% Proficiency</span>
                    </div>
                    <div class="skill-projects">
                        <h4>Projects using ${skillName}:</h4>
                        <ul>
                            ${skillInfo.projects.map(project => `<li>${project}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener to close modal
        modal.querySelector('.skill-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    function getSkillInfo(skillName) {
        // Sample skill info - in a real application, this would come from a database or API
        const skillInfoMap = {
            'Rust': {
                description: 'Systems programming language focused on safety, speed, and concurrency.',
                experience: 95,
                projects: ['GainChain', 'Neural Network Processor', 'Distributed Systems Framework']
            },
            'Python': {
                description: 'High-level programming language with clean syntax and vast ecosystem for AI/ML.',
                experience: 90,
                projects: ['AI Content Generator', 'Data Analysis Toolkit', 'Automated Trading System']
            },
            'JavaScript': {
                description: 'Versatile programming language for web development and beyond.',
                experience: 85,
                projects: ['Interactive Dashboards', 'Single Page Applications', 'Web3 Interfaces']
            },
            'C++': {
                description: 'High-performance programming language for system/application development.',
                experience: 80,
                projects: ['Neural Network Processor', 'Game Engine Components', 'Real-time Systems']
            },
            'HTML5': {
                description: 'Markup language for structuring web content with modern features.',
                experience: 90,
                projects: ['Portfolio Website', 'Corporate Landing Pages', 'Web Applications']
            }
        };
        
        return skillInfoMap[skillName] || {
            description: 'A key technology in my development toolkit.',
            experience: 80,
            projects: ['Various Projects']
        };
    }
    
    // Add scroll-triggered parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const offset = window.pageYOffset * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
    
    // Add scroll reveal animation for elements
    window.addEventListener('scroll', revealOnScroll);
    
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }
    
    // Enhanced Project Cards Interaction
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-thumbnail img').style.transform = 'scale(1.1)';
            card.classList.add('active');
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-thumbnail img').style.transform = 'scale(1)';
            card.classList.remove('active');
        });
        
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardX = e.clientX - cardRect.left;
            const cardY = e.clientY - cardRect.top;
            
            const angleX = ((cardY / cardRect.height) - 0.5) * 10;
            const angleY = ((cardX / cardRect.width) - 0.5) * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Responsive image loading for better performance
    document.querySelectorAll('img[data-src]').forEach(img => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.src = img.getAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        observer.observe(img);
    });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without refreshing page
            history.pushState(null, null, targetId);
        }
    });
});

// Add observer for section transitions
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            // Update navigation highlighting
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});