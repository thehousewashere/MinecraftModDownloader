import { APP, settings } from './elements.js';
import * as Util from './util.js';

export async function settingsModal(){
    settings.downloadSwitch.checked = localStorage.getItem('settingsDownloadCopy') === 'true';
    settings.errorSwitch.checked = localStorage.getItem('settingsErrorCopy') === 'true';
    settings.topErrorSwitch.checked = localStorage.getItem('settingsTopErrorSwitch') === 'true';
    settings.zipDownloadSwitch.checked = localStorage.getItem('settingsZipDownloadSwitch') === 'true';
    settings.removeDupesSwitch.checkVisibility = localStorage.getItem('removeDupesSwitch') === 'true';
    settings.modal.show();
    if (await Util.newVersion()){
        settings.updateLink.style.visibility = 'block';
    } else {
        settings.updateLink.style.visibility = 'collapse';
    }
    addEventListener();
}

function addEventListener(){
    settings.updateLink.addEventListener('click', () => {
        if (!APP){
            location.reload();
        } else {
            settings.updateLink.setAttribute('href', 'https://github.com/thehousewashere/MinecraftModDownloader/releases');
            settings.updateLink.setAttribute('target', '_blank');
        }
    });
    settings.downloadSwitch.addEventListener('change', () => {
        localStorage.setItem('settingsDownloadCopy', settings.downloadSwitch.checked);
    });
    settings.errorSwitch.addEventListener('change', () => {
        localStorage.setItem('settingsErrorCopy', settings.errorSwitch.checked);
    });
    settings.topErrorSwitch.addEventListener('change', () => {
        localStorage.setItem('settingsTopErrorSwitch', settings.topErrorSwitch.checked);
    });
    settings.zipDownloadSwitch.addEventListener('change', () => {
        localStorage.setItem('settingsZipDownloadSwitch', settings.zipDownloadSwitch.checked);
    });
    settings.removeDupesSwitch.addEventListener('change', () => {
        localStorage.setItem('settingsRemoveDupesSwitch', settings.removeDupesSwitch.checked);
    });
}