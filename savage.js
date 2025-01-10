// Funzione per cambiare il contenuto del sito in base alla selezione dell'utente
function changeContent(contentType) {
    // Modifica dinamicamente il contenuto del container
    let videoId = '';
    if (contentType === 'youtubeLive' || contentType === 'youtubeChat') {
        fetch('http://live.ultimateita.it/videoid.txt')
            .then(response => response.text())
            .then(id => {
                videoId = id.replace(/\s+/g, '').trim();  // Rimuove spazi e nuove righe
                loadEmbed(contentType, videoId); // Carica l'embed corretto
            })
            .catch(error => {
                console.error('Errore nel recupero del file videoid.txt:', error);
                document.getElementById('contentContainer').innerHTML = '<p>Errore nel caricare il contenuto.</p>';
            });
    } else {
        loadEmbed(contentType);  // Carica solo l'embed senza videoId per gli altri contenuti
    }
}

// Funzione per caricare gli embed in base al tipo di contenuto
function loadEmbed(contentType, videoId = '') {
    let embedCode = '';
    switch(contentType) {
        case 'twitch':
            embedCode = `<iframe src="https://player.twitch.tv/?channel=ultimateita&embed_domain=ultimateita.it" width="100%" height="600" frameborder="0" allowfullscreen="true"></iframe>`;
            break;
        case 'youtubeLive':
            embedCode = `<iframe width="100%" height="600" src="https://www.youtube.com/embed/${videoId}?autoplay=1&embed_domain=ultimateita.it" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            break;
        case 'youtubeChat':
            embedCode = `<iframe width="100%" height="600" src="https://www.youtube.com/live_chat?v=${videoId}&embed_domain=ultimateita.it" frameborder="0"></iframe>`;
            break;
        case 'tiktok':
            embedCode = `<iframe src="https://www.tiktok.com/embed/VIDEO_ID" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;  // TikTok non usa videoId
            break;
        case 'instagram':
            embedCode = `<iframe src="https://www.instagram.com/p/POST_ID/embed" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;  // Instagram non usa videoId
            break;
        case 'minecraft':
            embedCode = `<iframe src="https://www.ultimateita.it/resource.html" width="100%" height="600" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;  // Minecraft non usa videoId
            break;
        case 'discord':
            embedCode = `<iframe src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=light" width="100%" height="600" frameborder="0" allowtransparency="true"></iframe>`;  // Discord non usa videoId
            break;
        default:
            embedCode = '<p>Contenuto non trovato.</p>';
    }
    document.getElementById('contentContainer').innerHTML = embedCode;
}

// Funzione per cambiare il tema
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

// Esegui il cambio del tema iniziale
document.addEventListener('DOMContentLoaded', () => {
    toggleTheme(); // Imposta il tema di default all'avvio
});
