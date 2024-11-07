document.getElementById('theme-switcher').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('theme-switcher').textContent = 
        document.body.classList.contains('dark-mode') ? '🌜' : '🌞';
});
