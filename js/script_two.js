// Preloader Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 600);
  });
  
  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Scroll-triggered fade-in animation for sections
  const fadeInElements = document.querySelectorAll('.fade-in');
  function checkVisibility() {
    const triggerBottom = window.innerHeight / 1.1;
    fadeInElements.forEach(element => {
      const boxTop = element.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        element.classList.add('fade-in-visible');
      } else {
        element.classList.remove('fade-in-visible');
      }
    });
  }
  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Initial check on load
  
  // Scroll to Top functionality
  const scrollToTopButton = document.getElementById('scrollToTop');
  window.addEventListener('scroll', () => {
    scrollToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Activate Navbar Link on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  function activateLinkOnScroll() {
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 60;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  }
  window.addEventListener('scroll', activateLinkOnScroll);
  