/**
 * Theme switching functionality for Simon's portfolio website
 * Handles dark/light theme preferences and saves settings to localStorage
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  
  // Function to set theme
  function setTheme(theme) {
    // Remove both theme classes first
    document.body.classList.remove('dark-theme');
    document.body.classList.remove('light-theme');
    
    // Add the selected theme class
    document.body.classList.add(`${theme}-theme`);
    
    // Update the toggle button icon
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }
  
  // Check for saved theme preference or use system preference
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Use saved preference if available
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }
  
  // Initialize theme when page loads
  initializeTheme();
  
  // Add click event to theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      // Toggle theme based on current theme
      const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      setTheme(newTheme);
      
      // Play animation
      this.querySelector('i').style.animation = 'none';
      setTimeout(() => {
        this.querySelector('i').style.animation = 'toggle-rotate 0.5s ease';
      }, 5);
    });
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only change if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
});
