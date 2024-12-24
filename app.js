import { settingsModal } from './settingsModal.js';
import { themeModal, loadTheme } from './themeModal.js';
import { urlDownloader } from './modHandler.js';
import * as Util from './util.js';
import { menuButtons, VERSION, settings } from './elements.js';
import { searchPage } from './searchHandler.js';
import { modListDocPage } from './modListDocHandler.js';

loadTheme();
document.getElementById('settingsButton').addEventListener('click', settingsModal);
menuButtons.urlDownloader.addEventListener('click', () => urlDownloader());
menuButtons.search.addEventListener('click', searchPage);
menuButtons.modListDoc.addEventListener('click', modListDocPage);

await urlDownloader();

if (await Util.newVersion()) {
    document.getElementById('settingsButton').innerHTML = `<span class="badge rounded-pill text-bg-primary">1</span> Settings <i class="bi bi-box-arrow-in-up-right"></i>`;
}

document.getElementById('themeButton').addEventListener('click', themeModal);