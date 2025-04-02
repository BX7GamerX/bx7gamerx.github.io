/**
 * Advanced animations for Simon's portfolio
 * Handles scroll-triggered animations, parallax effects, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Add scroll-triggered image reveal effect
  const revealImages = document.querySelectorAll('.image-reveal');
  
  function checkImageReveal() {
    revealImages.forEach(image => {
      const imageTop = image.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (imageTop < windowHeight * 0.8) {
        image.classList.add('revealed');
      }
    });
  }
  
  // Ripple effect for buttons
  const rippleButtons = document.querySelectorAll('.ripple-button');
  
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Typing effect for landing title
  const typingElements = document.querySelectorAll('.typing-effect');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('typing-animation');
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        element.classList.remove('typing-animation');
      }
    }, 100);
  });
  
  // Parallax effect for sections
  const parallaxSections = document.querySelectorAll('.parallax-section');
  
  function updateParallax() {
    parallaxSections.forEach(section => {
      const scrollPosition = window.pageYOffset;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition > sectionTop - window.innerHeight && 
          scrollPosition < sectionTop + sectionHeight) {
        const yValue = (scrollPosition - sectionTop) * 0.2;
        section.style.backgroundPosition = `center ${yValue}px`;
      }
    });
  }
  
  // Floating animation for specified elements
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach(element => {
    // Add random delay to create natural effect
    const delay = Math.random() * 2;
    element.style.animation = `floating 3s ease-in-out ${delay}s infinite`;
  });
  
  // Counter animation for numbers
  const countElements = document.querySelectorAll('.count-up');
  
  function animateCountUp() {
    countElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < window.innerHeight * 0.8 && !element.classList.contains('counted')) {
        element.classList.add('counted');
        
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const countUpInterval = setInterval(() => {
          current += increment;
          element.textContent = Math.floor(current);
          
          if (current >= target) {
            element.textContent = target;
            clearInterval(countUpInterval);
          }
        }, 16);
      }
    });
  }
  
  // Initialize on load
  checkImageReveal();
  updateParallax();
  animateCountUp();
  
  // Update on scroll
  window.addEventListener('scroll', function() {
    checkImageReveal();
    updateParallax();
    animateCountUp();
  });
});
