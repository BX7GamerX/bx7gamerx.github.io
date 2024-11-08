document.getElementById('theme-switcher').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('theme-switcher').textContent = 
        document.body.classList.contains('dark-mode') ? '🌜' : '🌞';
});
// Load preferred theme on page load
window.onload = function() {
    // Check if a theme preference exists in localStorage
    const savedTheme = localStorage.getItem("theme");

    // If no preference, default to dark theme
    if (!savedTheme) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark"); // Save default as dark theme
    } else {
        // Apply the saved theme
        document.body.classList.toggle("dark-theme", savedTheme === "dark");
    }
};

// Function to toggle theme and save preference
function toggleTheme() {
    const body = document.body;
    const theme = body.classList.contains("dark-theme") ? "light" : "dark";
    body.classList.toggle("dark-theme");
    localStorage.setItem("theme", theme);
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
