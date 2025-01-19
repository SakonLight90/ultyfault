document.addEventListener('DOMContentLoaded', () => {
    const embedButtons = document.querySelectorAll('.embed-button');
    const embedContainer = document.getElementById('embed-container');

    embedButtons.forEach(button => {
        button.addEventListener('click', () => {
            const embedType = button.dataset.embed;

            let embedCode = '';
            switch (embedType) {
                case 'twitch-live':
                    embedCode = `<iframe src="https://player.twitch.tv/?channel=UltimateITA&parent=ultimateita.it" frameborder="0" allowfullscreen></iframe>`;
                    break;
                case 'youtube-live':
                    embedCode = `<iframe src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID" frameborder="0" allowfullscreen></iframe>`;
                    break;
                case 'special':
                    embedCode = `<h2>Resource Packs Archive</h2>`;
                    break;
                default:
                    embedCode = `<p>Embed not available.</p>`;
            }

            embedContainer.innerHTML = embedCode;
        });
    });
});
