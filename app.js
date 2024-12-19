import { settingsModal } from './settingsModal.js';
import { themeModal, loadTheme } from './themeModal.js';
import * as modHandler from './modHandler.js';
import * as Util from './util.js';
import { menuButtons } from './elements.js';

loadTheme();
document.getElementById('settingsButton').addEventListener('click', settingsModal);
menuButtons.urlDownloader.addEventListener('click', modHandler.urlDownloader);
menuButtons.search.addEventListener('click', async () => {
        menuButtons.urlDownloader.className = 'nav-link';
        menuButtons.search.className = 'nav-link active';
        const response = await fetch('search.html', {cache: 'no-store'});
        root.innerHTML = await response.text(); //TODO: Fix this
});

await modHandler.urlDownloader();

if (await Util.newVersion()) {
    document.getElementById('settingsButton').innerHTML = `<span class="badge rounded-pill text-bg-primary">1</span> Settings <i class="bi bi-box-arrow-in-up-right"></i>`;
}

document.getElementById('themeButton').addEventListener('click', themeModal);
Util.addEventListener();

