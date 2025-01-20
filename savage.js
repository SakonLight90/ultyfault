document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.getElementById('menu-list');
    const themeButtons = {
        light: document.getElementById('theme-light'),
        dark: document.getElementById('theme-dark'),
    };
    const embedContainer = document.getElementById('embed-container');

    // Menu Toggle
    menuToggle.addEventListener('click', () => {
        menuList.classList.toggle('hidden');
    });

    // Theme Toggle
    const toggleTheme = (theme) => {
        body.className = theme;
    };

    themeButtons.light.addEventListener('click', () => toggleTheme('light'));
    themeButtons.dark.addEventListener('click', () => toggleTheme('dark'));

    // Embed Button Logic
    document.querySelectorAll('.embed-button').forEach(button => {
        button.addEventListener('click', () => {
            const embedType = button.dataset.embed;
            let embedCode = '';

            switch (embedType) {
                case 'twitch-live':
                    embedCode = `<iframe src="https://player.twitch.tv/?channel=UltimateITA&parent=ultimateita.it" frameborder="0" allowfullscreen></iframe>`;
                    break;
                // Add other cases as necessary
                default:
                    embedCode = '<p>Embed not available.</p>';
            }

            embedContainer.innerHTML = embedCode;
        });
    });
});
