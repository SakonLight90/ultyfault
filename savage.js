document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const themeButtons = {
        light: document.getElementById('theme-light'),
        dark: document.getElementById('theme-dark'),
    };
    const embedButtons = document.querySelectorAll('.embed-button');
    const embedContainer = document.getElementById('embed-container');
    const menuToggle = document.querySelector('.menu-toggle');

    // Theme Toggle
    const toggleTheme = (theme) => {
        body.classList.remove('light', 'dark');
        body.classList.add(theme);
    };

    themeButtons.light.addEventListener('click', () => toggleTheme('light'));
    themeButtons.dark.addEventListener('click', () => toggleTheme('dark'));

    // Menu Toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Embeds
    embedButtons.forEach(button => {
        button.addEventListener('click', () => {
            const embedType = button.dataset.embed;

            let embedCode = '';
            switch (embedType) {
                case 'twitch-live':
                    embedCode = `<iframe src="https://player.twitch.tv/?channel=UltimateITA&parent=ultimateita.it" frameborder="0" allowfullscreen></iframe>`;
                    break;
                case 'twitch-chat':
                    embedCode = `<iframe src="https://www.twitch.tv/embed/UltimateITA/chat?parent=ultimateita.it" frameborder="0" allowfullscreen></iframe>`;
                    break;
                case 'youtube-live':
                    fetch('https://live.ultimateita.it/videoid.txt')
                        .then(response => response.text())
                        .then(videoId => {
                            embedContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
                        });
                    return;
                case 'youtube-chat':
                    fetch('https://live.ultimateita.it/videoid.txt')
                        .then(response => response.text())
                        .then(videoId => {
                            embedContainer.innerHTML = `<iframe src="https://www.youtube.com/live_chat?v=${videoId}&embed_domain=ultimateita.it" frameborder="0" allowfullscreen></iframe>`;
                        });
                    return;
                case 'discord':
                    const theme = body.classList.contains('dark') ? 'dark' : 'light';
                    embedCode = `<iframe src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=${theme}" frameborder="0" allowtransparency="true"></iframe>`;
                    break;
                case 'tiktok':
                    embedCode = `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@ultimate.ita" data-unique-id="ultimate.ita" data-embed-from="oembed" data-embed-type="creator" style="max-width:780px; min-width:288px;">
                        <section>
                            <a target="_blank" href="https://www.tiktok.com/@ultimate.ita?refer=creator_embed">@ultimate.ita</a>
                        </section>
                    </blockquote>
                    <script async src="https://www.tiktok.com/embed.js"></script>`;
                    break;
                case 'instagram':
                    embedCode = `<iframe src="https://www.instagram.com/ultimate.ita/embed" frameborder="0" allowtransparency="true" scrolling="no" style="width: 100%; height: 600px; max-width: 540px; border: none;"></iframe>`;
                    break;
                case 'special':
                    embedCode = document.getElementById('special-container').innerHTML;
                    break;
                default:
                    embedCode = `<p>Embed not available.</p>`;
            }

            embedContainer.innerHTML = embedCode;
        });
    });
});
