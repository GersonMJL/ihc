// Dark mode toggle functionality

export function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;

    if (!darkModeToggle) return;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        darkModeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        if (currentTheme === 'light') {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
        }
    });
}

