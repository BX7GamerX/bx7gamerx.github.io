/**
 * Enhanced theme switching functionality for Simon's portfolio website
 * Handles dark/light theme preferences and saves settings to localStorage
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  let isTransitioning = false;
  let colorSchemeQueryList;
  
  // Create theme transition overlay
  const overlay = document.createElement('div');
  overlay.className = 'theme-transition-overlay';
  document.body.appendChild(overlay);
  
  // Create theme indicator
  const indicator = document.createElement('div');
  indicator.className = 'theme-indicator';
  indicator.innerHTML = `<i class="fas fa-moon"></i>`;
  
  // Create system preference tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'system-preference-tooltip';
  tooltip.textContent = 'Using system preference';
  
  // Only add indicator if not on mobile
  if (window.innerWidth > 768) {
    document.body.appendChild(indicator);
    document.body.appendChild(tooltip);
  }
  
  // Function to set theme with enhanced visual effects
  function setTheme(theme, animate = true) {
    if (isTransitioning) return;
    
    // Update indicator icon based on theme
    if (indicator) {
      indicator.innerHTML = theme === 'dark' ? 
        `<i class="fas fa-moon"></i>` : 
        `<i class="fas fa-sun"></i>`;
    }
    
    // Remove both theme classes first
    document.body.classList.remove('dark-theme');
    document.body.classList.remove('light-theme');
    
    if (animate) {
      isTransitioning = true;
      
      // Apply transition effect
      overlay.classList.add('active');
      
      // After a slight delay, change theme
      setTimeout(() => {
        // Add the selected theme class
        document.body.classList.add(`${theme}-theme`);
        
        // Update the toggle button icon
        if (themeToggle) {
          // Use more detailed transition for icon
          themeToggle.innerHTML = `
            <div class="theme-toggle-wrapper">
              <i class="fas fa-sun theme-icon-sun ${theme === 'dark' ? 'visible' : 'hidden'}"></i>
              <i class="fas fa-moon theme-icon-moon ${theme === 'light' ? 'visible' : 'hidden'}"></i>
            </div>
          `;
        }
        
        // Fade out overlay
        setTimeout(() => {
          overlay.classList.remove('active');
          isTransitioning = false;
        }, 400);
      }, 300);
    } else {
      // Without animation - for initial load
      document.body.classList.add(`${theme}-theme`);
      
      // Update the toggle button icon
      if (themeToggle) {
        themeToggle.innerHTML = `
          <div class="theme-toggle-wrapper">
            <i class="fas fa-sun theme-icon-sun ${theme === 'dark' ? 'visible' : 'hidden'}"></i>
            <i class="fas fa-moon theme-icon-moon ${theme === 'light' ? 'visible' : 'hidden'}"></i>
          </div>
        `;
      }
    }
    
    // Update particles colors if they exist
    updateParticlesColors(theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Update the data-theme attribute for styling
    document.documentElement.setAttribute('data-theme', theme);
    
    // Dispatch custom event for other components
    const event = new CustomEvent('themechange', { detail: { theme } });
    document.dispatchEvent(event);
  }
  
  // Update particles.js colors based on theme
  function updateParticlesColors(theme) {
    if (window.pJSDom && window.pJSDom.length > 0) {
      const colors = theme === 'dark' ? 
        { particles: "#0ebeff", lines: "#0ebeff" } : 
        { particles: "#0ca8df", lines: "#0ca8df" };
      
      try {
        const pJS = window.pJSDom[0].pJS;
        
        // Update colors
        pJS.particles.color.value = colors.particles;
        pJS.particles.line_linked.color = colors.lines;
        
        // Destroy and recreate particles
        pJS.fn.particlesEmpty();
        pJS.fn.particlesCreate();
        pJS.fn.particlesUpdate();
      } catch (err) {
        console.log('Could not update particles colors');
      }
    }
  }
  
  // Check for saved theme preference or use system preference
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Update tooltip text based on saved theme
    if (tooltip) {
      tooltip.textContent = savedTheme ? 
        `Using your saved preference (${savedTheme} mode)` : 
        'Using your system preference';
    }
    
    if (savedTheme) {
      // Use saved preference if available
      setTheme(savedTheme, false);
    } else {
      // Use system preference
      setTheme(systemPrefersDark ? 'dark' : 'light', false);
      
      // Add UI indicator that we're using system preference
      if (indicator) indicator.classList.add('using-system-preference');
    }
  }
  
  // Initialize theme when page loads
  initializeTheme();
  
  // Add click event to theme toggle button with enhanced animation
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      // Toggle theme based on current theme
      const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      setTheme(newTheme, true);
      
      // Animate the toggle
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 500);
      
      // Remove class indicating system preference use
      if (indicator) indicator.classList.remove('using-system-preference');
      
      // Update tooltip text
      if (tooltip) {
        tooltip.textContent = `Using your saved preference (${newTheme} mode)`;
      }
    });
  }
  
  // Listen for system theme changes
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Handle system theme changes
  function handleSystemThemeChange(e) {
    // Only change if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light', true);
    }
  }
  
  // Add event listener for system theme changes
  if (colorSchemeQuery.addEventListener) {
    colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
  } else if (colorSchemeQuery.addListener) {
    // For older browsers
    colorSchemeQuery.addListener(handleSystemThemeChange);
  }
  
  // Add keyboard shortcut for theme toggle (Alt+T)
  document.addEventListener('keydown', function(e) {
    // Check if Alt+T was pressed
    if (e.altKey && e.key === 't') {
      const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      setTheme(newTheme, true);
      
      // Flash theme toggle button
      if (themeToggle) {
        themeToggle.classList.add('clicked');
        setTimeout(() => {
          themeToggle.classList.remove('clicked');
        }, 500);
      }
      
      // Show keyboard shortcut notification
      showThemeChangeNotification(newTheme);
    }
  });
  
  // Create notification element
  function showThemeChangeNotification(theme) {
    // Remove existing notification if any
    const existing = document.querySelector('.theme-change-notification');
    if (existing) existing.remove();
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'theme-change-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${theme === 'dark' ? 'moon' : 'sun'}"></i>
        <span>Switched to ${theme} mode</span>
      </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Auto hide after 2 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 2000);
  }
});
