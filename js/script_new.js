/**
 * Main JavaScript file for Simon's portfolio website
 * Handles animations, interactions, and UI functionality
 */

// Preloader fade-out
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => preloader.style.display = 'none', 500); // Fade out after load
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    // Check if a theme preference exists in localStorage
    const savedTheme = localStorage.getItem("theme");
    
    // Apply saved theme or default to dark theme
    if (!savedTheme || savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      document.body.classList.add("light-theme");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");
      
      const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
      localStorage.setItem("theme", theme);
      
      // Update icon
      themeToggle.innerHTML = theme === "dark" 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    });
  }
  
  // Initialize particles.js on home page if element exists
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#0ebeff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#0ebeff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
});

// Header scroll effect
const header = document.querySelector('.main-header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Show header after scrolling past landing section
  if (scrollTop > window.innerHeight * 0.8) {
    header.classList.add('visible');
  } else {
    header.classList.remove('visible');
  }
  
  lastScrollTop = scrollTop;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = this.getAttribute('href');
    
    // Ignore non-navigation links
    if (target === '#' || target.startsWith('#!')) return;
    
    e.preventDefault();
    
    const targetElement = document.querySelector(target);
    
    if (targetElement) {
      const headerOffset = document.querySelector('.main-header')?.offsetHeight || 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll-triggered fade-in animation for sections
const fadeInElements = document.querySelectorAll('.fade-in');

function checkVisibility() {
  const triggerBottom = window.innerHeight / 1.1;
  fadeInElements.forEach((element) => {
    const boxTop = element.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      element.classList.add('fade-in-visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);

// Run initially on page load
checkVisibility();

// Scroll to top button functionality
const scrollToTopButton = document.getElementById('scrollToTop');

if (scrollToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopButton.style.display = 'flex';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });
  
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  
  if (!sections.length || !navItems.length) return;
  
  const scrollPosition = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // Show loading state on button
    const submitButton = this.querySelector('.submit-btn');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Form will submit normally through Formspree
    // This just handles the UI feedback
    
    // You could add AJAX submission here if preferred
  });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const email = this.querySelector('input[type="email"]').value;
    this.innerHTML = `<div class="success-message"><i class="fas fa-check-circle"></i> Thanks for subscribing!</div>`;
    
    // In a real implementation, you would send this to your newsletter service
    console.log("Newsletter signup:", email);
  });
}

// Custom cursor functionality
const customCursor = document.querySelector('.custom-cursor');
if (customCursor) {
  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });

  // Add hover effect to interactive elements
  document.querySelectorAll('a, button, .tech-icon, .skill-card, .portfolio-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering');
      customCursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
      customCursor.classList.remove('hover');
    });
  });
}
