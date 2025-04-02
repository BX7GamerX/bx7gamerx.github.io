// Preloader fade-out
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => preloader.style.display = 'none', 500); // Fade out after load
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

// Initialize after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize any third-party libraries
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
  
  // Custom cursor functionality
  const customCursor = document.querySelector('.custom-cursor');
  if (customCursor) {
    document.addEventListener('mousemove', (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button, .tech-icon, .skill-card, .portfolio-card').forEach(element => {
      element.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
      });
      element.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
      });
    });
  }
});

