import { settingsModal } from './settingsModal.js';
import { themeModal, loadTheme } from './themeModal.js';
import * as modHandler from './modHandler.js';
import * as Util from './util.js';

loadTheme();
document.getElementById('settingsButton').addEventListener('click', settingsModal);
document.getElementById('themeButton').addEventListener('click', themeModal);
modHandler.addEventListener();
Util.addEventListener();