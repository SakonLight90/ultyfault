function changeContent(contentType) {
    let videoId = '';
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = '<div class="loading">Caricamento...</div>';  // Mostra il messaggio di caricamento

    if (contentType === 'youtubeLive' || contentType === 'youtubeChat') {
        fetch('http://live.ultimateita.it/videoid.txt')
            .then(response => response.text())
            .then(id => {
                videoId = id.replace(/\s+/g, '').trim();
                loadEmbed(contentType, videoId);
            })
            .catch(error => {
                console.error('Errore nel recupero del file videoid.txt:', error);
                loadEmbed('error');  // Carica il messaggio di errore
            });
    } else {
        loadEmbed(contentType);
    }
}

function loadEmbed(contentType, videoId = '') {
    const contentContainer = document.getElementById('contentContainer');
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
        case 'error':
            embedCode = `<div class="error-message">Errore nel caricamento del contenuto. Riprova più tardi.</div>`;
            break;
        default:
            embedCode = `<div class="error-message">Contenuto non trovato.</div>`;
            break;
    }
    contentContainer.innerHTML = embedCode;
}

function toggleTheme() {
    const isDarkMode = document.body.classList.contains('dark');
    if (isDarkMode) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        document.getElementById('themeIcon').textContent = '🌙';
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        document.getElementById('themeIcon').textContent = '🌞';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    toggleTheme();
    changeContent('twitch');
});
