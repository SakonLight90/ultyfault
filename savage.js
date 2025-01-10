// Funzione per cambiare il contenuto dinamicamente in base al menu
function changeContent(contentType) {
    const contentContainer = document.getElementById('contentContainer');
    
    // Recupera il video ID dal file videoid.txt (per Twitch, YouTube, ecc.)
    fetch('http://live.ultimateita.it/videoid.txt')
        .then(response => response.text())
        .then(videoId => {
            let embedCode = '';
            if (contentType === 'twitch') {
                // Embed di Twitch
                embedCode = `<iframe src="https://player.twitch.tv/?channel=ultimateita&video=${videoId}&autoplay=true" width="100%" height="600" frameborder="0" allowfullscreen="true"></iframe>`;
            } else if (contentType === 'youtubeLive') {
                // Embed di YouTube Live
                embedCode = `<iframe width="100%" height="600" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            } else if (contentType === 'youtubeChat') {
                // Embed della chat di YouTube
                embedCode = `<iframe width="100%" height="600" src="https://www.youtube.com/live_chat?v=${videoId}&embed_domain=yourdomain.com" frameborder="0"></iframe>`;
            } else if (contentType === 'tiktok') {
                // Embed di TikTok
                embedCode = `<iframe src="https://www.tiktok.com/embed/${videoId}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
            } else if (contentType === 'instagram') {
                // Embed di Instagram
                embedCode = `<iframe src="https://www.instagram.com/p/${videoId}/embed" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
            } else if (contentType === 'minecraft') {
                // Embed di Minecraft (può essere un video gameplay o un altro tipo di contenuto)
                embedCode = `<iframe src="https://www.youtube.com/embed/${videoId}" width="100%" height="600" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            } else if (contentType === 'discord') {
                // Embed del server Discord
                embedCode = `<iframe src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=light" width="100%" height="600" frameborder="0" allowtransparency="true"></iframe>`;
            }
            contentContainer.innerHTML = embedCode;
            updateTheme(contentType); // Cambia il tema dell'embed se necessario
        })
        .catch(error => {
            contentContainer.innerHTML = '<p>Error loading content.</p>';
        });
}

// Funzione per cambiare il tema (Light/Dark)
function toggleTheme() {
    const body = document.body;
    const header = document.querySelector('header');
    const links = document.querySelectorAll('nav ul li a');
    const contentContainer = document.getElementById('contentContainer');

    if (document.getElementById('themeSwitch').checked) {
        body.classList.add('dark-mode');
        header.classList.add('dark-mode');
        links.forEach(link => link.classList.add('dark-mode'));
        contentContainer.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        header.classList.remove('dark-mode');
        links.forEach(link => link.classList.remove('dark-mode'));
        contentContainer.classList.remove('dark-mode');
    }

    // Imposta il colore di sfondo del contenitore in base al tema
    updateBackgroundColor();
}

// Funzione per aggiornare il tema dell'embed di Discord
function updateTheme(contentType) {
    const iframe = document.querySelector('iframe');
    if (contentType === 'discord') {
        if (document.body.classList.contains('dark-mode')) {
            iframe.src = iframe.src.replace('theme=light', 'theme=dark');
        } else {
            iframe.src = iframe.src.replace('theme=dark', 'theme=light');
        }
    }
}

// Funzione per aggiornare lo sfondo del contenitore in base al tema
function updateBackgroundColor() {
    const contentContainer = document.getElementById('contentContainer');
    if (document.body.classList.contains('dark-mode')) {
        contentContainer.style.backgroundColor = '#2c2f36'; // Colore scuro per il tema dark
    } else {
        contentContainer.style.backgroundColor = '#f4f4f4'; // Colore chiaro per il tema light
    }
}

// Imposta il tema iniziale in base alla selezione
if (localStorage.getItem('theme') === 'dark') {
    document.getElementById('themeSwitch').checked = true;
    toggleTheme();
} else {
    toggleTheme(); // Se non è stato salvato, imposta il tema di default (light)
}

// Carica di default l'embed di Twitch quando il sito viene caricato
window.onload = () => {
    changeContent('twitch');
};
