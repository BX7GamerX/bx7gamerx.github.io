// Preloader fade-out
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => preloader.style.display = 'none', 500); // Fade out after load
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll-triggered fade-in animation for sections
const fadeInElements = document.querySelectorAll(".fade-in");
function checkVisibility() {
  const triggerBottom = window.innerHeight / 1.1;
  fadeInElements.forEach((element) => {
    const boxTop = element.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      element.classList.add("fade-in-visible");
    } else {
      element.classList.remove("fade-in-visible");
    }
  });
}
window.addEventListener("scroll", checkVisibility);
checkVisibility(); // Initial check on load

// Scroll to Top functionality
const scrollToTopButton = document.getElementById("scrollToTop");
window.addEventListener("scroll", () => {
  scrollToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Activate Navbar Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function activateLinkOnScroll() {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 60;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", activateLinkOnScroll);
// Custom Cursor functionality
const customCursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
});

// Add and remove hover effect on links and buttons
document.querySelectorAll("a, button").forEach((element) => {
  element.addEventListener("mouseover", () => {
    document.body.classList.add("hovering");
  });
  element.addEventListener("mouseout", () => {
    document.body.classList.remove("hovering");
  });
});
// Toggle hamburger menu visibility
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}
// Toggle hamburger menu visibility
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

function checkVisibility() {
  const triggerBottom = window.innerHeight / 1.2;
  const fadeInElements = document.querySelectorAll(".fade-in");

  fadeInElements.forEach((element) => {
    const boxTop = element.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      element.classList.add("fade-in-visible");
    } else {
      element.classList.remove("fade-in-visible");
    }
  });
}
