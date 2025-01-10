function changeContent(contentType) {
    let videoId = '';
    if (contentType === 'youtubeLive' || contentType === 'youtubeChat') {
        fetch('http://live.ultimateita.it/videoid.txt')
            .then(response => response.text())
            .then(id => {
                videoId = id.replace(/\s+/g, '').trim();
                loadEmbed(contentType, videoId);
            })
            .catch(error => {
                console.error('Errore nel recupero del file videoid.txt:', error);
                document.getElementById('contentContainer').innerHTML = '<p>Errore nel caricare il contenuto.</p>';
            });
    } else {
        loadEmbed(contentType);
    }
}

function loadEmbed(contentType, videoId = '') {
    let embedCode = '';
    switch(contentType) {
        case 'twitch':
            embedCode = `<iframe src="https://player.twitch.tv/?channel=ultimateita&autoplay=true" width="100%" height="600" frameborder="0" allowfullscreen="true"></iframe>`;
            break;
        case 'youtubeLive':
            embedCode = `<iframe width="100%" height="600" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            break;
        case 'youtubeChat':
            embedCode = `<iframe width="100%" height="600" src="https://www.youtube.com/live_chat?v=${videoId}&embed_domain=yourdomain.com" frameborder="0"></iframe>`;
            break;
        case 'tiktok':
            embedCode = `<iframe src="https://www.tiktok.com/embed/VIDEO_ID" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
            break;
        case 'instagram':
            embedCode = `<iframe src="https://www.instagram.com/p/POST_ID/embed" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
            break;
        case 'minecraft':
            embedCode = `<iframe src="https://www.youtube.com/embed/VIDEO_ID" width="100%" height="600" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            break;
        case 'discord':
            embedCode = `<iframe src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=light" width="100%" height="600" frameborder="0" allowtransparency="true"></iframe>`;
            break;
        default:
            embedCode = '<p>Contenuto non trovato.</p>';
    }
    document.getElementById('contentContainer').innerHTML = embedCode;
}

function toggleTheme() {
    const isDarkMode = document.getElementById('themeSwitch').checked;
    const body = document.body;
    if (isDarkMode) {
        body.classList.add('dark');
        body.classList.remove('light');
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    toggleTheme();
    changeContent('twitch');
});
