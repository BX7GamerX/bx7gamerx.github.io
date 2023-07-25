let navbar = document.querySelector(".navbar"); 
  
 let sections = document.querySelectorAll("section"); 
 let navLinks = document.querySelectorAll("header nav a"); 
  
 window.onscroll = () => { 
   sections.forEach((sec) => { 
     let top = window.scrollY; 
     let offset = sec.offsetTop - 150; 
     let height = sec.offsetHeight; 
     let id = sec.getAttribute("id"); 
  
     if (top >= offset && top < offset + height) { 
       navLinks.forEach((links) => { 
         links.classList.remove("active"); 
         document 
           .querySelector("header nav a[href*=" + id + "]") 
           .classList.add("active"); 
       }); 
     } 
   }); 
 }; 
  
 ScrollReveal({ 
   reset: true, 
   distance: "80px", 
   duration: 2000, 
   delay: 200, 
 }); 
  
 ScrollReveal().reveal(".home-content, .heading", { origin: "top" }); 
 ScrollReveal().reveal(".home-img", { origin: "bottom" });
 // ... previous JavaScript code ...

const portfolioButton = document.querySelector(".navbar a[href='#portfolio']");
const blogButton = document.querySelector(".navbar a[href='#blog']");
const portfolioSection = document.getElementById("portfolio");
const blogSection = document.getElementById("blog");

portfolioButton.addEventListener("click", () => {
  portfolioSection.scrollIntoView({ behavior: "smooth" });
});

blogButton.addEventListener("click", () => {
  blogSection.scrollIntoView({ behavior: "smooth" });
});

ScrollReveal().reveal(".home-content, .heading, .portfolio", { origin: "top" });
ScrollReveal().reveal(".home-img, .blog", { origin: "bottom" });
