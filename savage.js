document.addEventListener('DOMContentLoaded', () => {
    const embedButtons = document.querySelectorAll('.embed-button');
    const embedContainer = document.getElementById('embed-container');

    if (!embedContainer) {
        console.error('Errore: elemento "embed-container" non trovato.');
        return;
    }

    embedButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const embedType = button.dataset.embed;

            if (!embedType) {
                console.error('Errore: tipo di embed non specificato.');
                return;
            }

            // Pulizia del contenitore
            embedContainer.innerHTML = '';

            let embedCode = '';
            switch (embedType) {
                case 'twitch-live':
                    embedCode = `
                        <iframe 
                            src="https://player.twitch.tv/?channel=UltimateITA&parent=ultimateita.it" 
                            frameborder="0" 
                            allowfullscreen>
                        </iframe>`;
                    break;

                case 'twitch-chat':
                    embedCode = `
                        <iframe 
                            src="https://www.twitch.tv/embed/UltimateITA/chat?parent=ultimateita.it" 
                            frameborder="0" 
                            allowfullscreen>
                        </iframe>`;
                    break;

                case 'youtube-live':
                    try {
                        const videoId = await fetchVideoId();
                        embedCode = `
                            <iframe 
                                src="https://www.youtube.com/embed/${videoId}" 
                                frameborder="0" 
                                allowfullscreen>
                            </iframe>`;
                    } catch (error) {
                        console.error('Errore durante il recupero del video ID:', error);
                        embedCode = `<p>Errore nel caricamento dello stream live di YouTube.</p>`;
                    }
                    break;

                case 'youtube-chat':
                    try {
                        const videoId = await fetchVideoId();
                        embedCode = `
                            <iframe 
                                src="https://www.youtube.com/live_chat?v=${videoId}&embed_domain=ultimateita.it" 
                                frameborder="0" 
                                allowfullscreen>
                            </iframe>`;
                    } catch (error) {
                        console.error('Errore durante il recupero del video ID:', error);
                        embedCode = `<p>Errore nel caricamento della chat live di YouTube.</p>`;
                    }
                    break;

                case 'discord':
                    embedCode = `
                        <iframe 
                            id="discord-embed" 
                            src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=dark" 
                            frameborder="0" 
                            allowtransparency="true" 
                            style="width: 100%; height: 500px;">
                        </iframe>`;
                    break;

                case 'tiktok':
                    embedCode = `
                        <blockquote class="tiktok-embed" 
                            cite="https://www.tiktok.com/@ultimate.ita" 
                            data-unique-id="ultimate.ita" 
                            data-embed-from="oembed" 
                            data-embed-type="creator" 
                            style="max-width: 780px; min-width: 288px;">
                            <section>
                                <a target="_blank" href="https://www.tiktok.com/@ultimate.ita?refer=creator_embed">@ultimate.ita</a>
                            </section>
                        </blockquote>
                        <script async src="https://www.tiktok.com/embed.js"></script>`;
                    break;

                case 'instagram':
                    embedCode = `
                        <iframe 
                            src="https://www.instagram.com/ultimate.ita/embed" 
                            frameborder="0" 
                            allowtransparency="true" 
                            allowfullscreen="true" 
                            scrolling="no" 
                            style="width: 100%; height: 600px; max-width: 540px; border: none;">
                        </iframe>`;
                    break;

                case 'special':
                    embedCode = `
                        <h2>Resource Packs Archive</h2>
                        <p>Scarica i nostri Resource Packs per Minecraft! Trova l'ultima versione o esplora l'archivio delle versioni precedenti.</p>
                        <div class="resource-pack">
                            <h3>Resource Pack 1</h3>
                            <button class="download-latest">
                                <a href="downloads/resource_pack_1_latest.zip" download>Scarica Ultima Versione</a>
                            </button>
                            <ul class="version-archive">
                                <li><a href="downloads/resource_pack_1_v1.0.zip" download>Versione 1.0 - 01/01/2023</a></li>
                                <li><a href="downloads/resource_pack_1_v0.9.zip" download>Versione 0.9 - 01/12/2022</a></li>
                            </ul>
                        </div>`;
                    break;

                default:
                    embedCode = `<p>Embed non disponibile.</p>`;
            }

            // Aggiorna il contenitore con l'embed selezionato
            embedContainer.innerHTML = embedCode;

            // Aggiorna il tema di Discord in tempo reale
            if (embedType === 'discord') {
                const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
                const discordEmbed = document.getElementById('discord-embed');
                if (discordEmbed) {
                    discordEmbed.src = `https://discord.com/widget?id=YOUR_SERVER_ID&theme=${theme}`;
                }
            }
        });
    });

    /**
     * Funzione per recuperare l'ID del video live di YouTube da un file remoto.
     * @returns {Promise<string>} Il video ID.
     */
    async function fetchVideoId() {
        const response = await fetch('https://live.ultimateita.it/videoid.txt');
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        const videoId = await response.text();
        return videoId.trim(); // Rimuove eventuali spazi o newline
    }
});
