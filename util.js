import { modal, modOutput, settings } from './elements.js';

export function setModal(title, body, footer) {
    modal.modalTitle.innerHTML = title;
    modal.modalBody.innerHTML = body;
    modal.modalFooter.innerHTML = footer;
    modal.modal.show();
}

export function setOutput(title, body, color, border) {
    modOutput.title.innerHTML = title;
    modOutput.text.innerHTML = body;
    if (border) {
        modOutput.div.setAttribute('class', `card border-${color}`);
    } else {
        modOutput.div.setAttribute('class', `card bg-${color}`);
    }
}

export function addEventListener() {
    modOutput.copyButton.addEventListener('click', async () => {
        modOutput.copyButton.disabled = true;
        let r = '';
        if (settings.downloadSwitch.checked && !settings.errorSwitch.checked) {
            let r = modOutput.text.innerText;
            r = r.split('\n');
            r = r.filter(item => !item.includes('(404)') && !item.includes('(Mod not found under '));
            r = r.join('\n');
            navigator.clipboard.writeText(r.toString());
            if (!modOutput.title.innerText.includes('(Copied)')) {
                modOutput.title.innerText = modOutput.title.innerText + ' (Copied)';
            }
            modOutput.copyButton.disabled = false;
            return;
        } else if (!settings.downloadSwitch.checked && settings.errorSwitch.checked) {
            let r = modOutput.text.innerText;
            r = r.split('\n');
            r = r.filter(item => !item.includes('https://mediafiles.forgecdn.net/files/'));
            r = r.join('\n');
            navigator.clipboard.writeText(r.toString());
            if (!modOutput.title.innerText.includes('(Copied)')) {
                modOutput.title.innerText = modOutput.title.innerText + ' (Copied)';
            }
            modOutput.copyButton.disabled = false;
            return;
        } else if (settings.downloadSwitch.checked && settings.errorSwitch.checked) {
            if (!modOutput.title.innerText.includes('(Copied)')) {
                modOutput.title.innerText = modOutput.title.innerText + ' (Copied)';
            }
            navigator.clipboard.writeText(modOutput.text.innerText);
        } else if (!settings.downloadSwitch.checked && !settings.errorSwitch.checked) {
            if (!modOutput.title.innerText.includes('(Copying disabled in Settings)')){
                modOutput.title.innerText = modOutput.title.innerText + ' (Copying disabled in Settings)';
            }
        }
        modOutput.copyButton.disabled = false;
    });
}

export function getTimestamp() {
    let date = new Date();
    let formattedDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + '-' +
        ('0' + date.getMinutes()).slice(-2) + '-' +
        ('0' + date.getSeconds()).slice(-2);
    return formattedDate;
}