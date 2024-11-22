import { settingsModal } from './settingsModal.js';
import { themeModal, loadTheme } from './themeModal.js';
import * as modHandler from './modHandler.js';
import * as Util from './util.js';
import { VERSION } from './elements.js';

loadTheme();
document.getElementById('settingsButton').addEventListener('click', settingsModal);

if (await Util.newVersion()){
    document.getElementById('settingsButton').innerHTML = `<span class="badge rounded-pill text-bg-primary">1</span> Settings <i class="bi bi-box-arrow-in-up-right"></i>`;
}

document.getElementById('themeButton').addEventListener('click', themeModal);
modHandler.addEventListener();
Util.addEventListener();