import { settings } from './elements.js';

export function settingsModal(){
    settings.downloadSwitch.checked = localStorage.getItem('settingsDownloadCopy') === 'true';
    settings.errorSwitch.checked = localStorage.getItem('settingsErrorCopy') === 'true';
    settings.topErrorSwitch.checked = localStorage.getItem('settingsTopErrorSwitch') === 'true';
    settings.zipDownloadSwitch.checked = localStorage.getItem('settingsZipDownloadSwitch') === 'true';
    settings.removeDupesSwitch.checkVisibility = localStorage.getItem('removeDupesSwitch') === 'true';
    settings.modal.show();
    addEventListener();
}

function addEventListener(){
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