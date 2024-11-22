import { modal, modOutput, settings, VERSION } from './elements.js';
import { getDownloadList, getErrorMessages } from './modHandler.js';

// async function getModrinthDownloadLink(fileName) {
//     const searchUrl = `https://api.modrinth.com/v2/search?query=${fileName}&limit=5`;
    
//     try {
//       const searchResponse = await fetch(searchUrl);
//       const searchData = await searchResponse.json();
  
//       for (let mod of searchData.hits) {
//         const versionUrl = `https://api.modrinth.com/v2/project/${mod.slug}/version`;
//         const versionResponse = await fetch(versionUrl);
//         const versionData = await versionResponse.json();
  
//         for (let version of versionData) {
//           for (let i = 0; i < version.files.length; i++) {
//             if (version.files[i].filename === fileName) {
//               return version.files[i].url;
//             }
//           }
//         }
//       }
  
//       return null;
//     } catch (error) {
//       return null;
//     }
//   }
  
//   getModrinthDownloadLink('fileName').then(link => {
//     console.log(link);
//   });

export function extractFileName(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
}

async function fetechGitHubAPI(){
    const response = await fetch('https://api.github.com/repos/thehousewashere/MinecraftModDownloader/releases')
    if (!response.ok) {
        return false;
    }
    return response.json();
}

export async function newVersion() {
    const api = await fetechGitHubAPI();
    if (!api){
        return false;
    }
    return api[0]['name'] > VERSION;
}

export function setModal(title, body, footer) {
    modal.modalTitle.innerHTML = title;
    modal.modalBody.innerHTML = body;
    modal.modalFooter.innerHTML = footer;
    modal.modal.show();
}

export function setOutput(title, body, color, border) {
    modOutput.title.innerHTML = title;
    modOutput.text.innerHTML = body;
    modOutput.text.innerHTML =  modOutput.text.innerHTML.replaceAll('&gt;', '')
    if (border) {
        modOutput.div.setAttribute('class', `card border-${color}`);
    } else {
        modOutput.div.setAttribute('class', `card bg-${color}`);
    }
}

export function addEventListener() {
    modOutput.copyButton.addEventListener('click', async () => {
        modOutput.copyButton.disabled = true;
        if (settings.downloadSwitch.checked && !settings.errorSwitch.checked) {
            navigator.clipboard.writeText(getDownloadList().join('\n'));
            if (!modOutput.title.innerText.includes('(Copied)')) {
                modOutput.title.innerText = modOutput.title.innerText + ' (Copied)';
            }
            modOutput.copyButton.disabled = false;
            return;
        } else if (!settings.downloadSwitch.checked && settings.errorSwitch.checked) {
            const err = document.createElement('div');
            err.innerHTML = getErrorMessages().join('\n');
            navigator.clipboard.writeText(err.innerText);
            if (!modOutput.title.innerText.includes('(Copied)')) {
                modOutput.title.innerText = modOutput.title.innerText + ' (Copied)';
            }
            modOutput.copyButton.disabled = false;
            return;
        } else if (settings.downloadSwitch.checked && settings.errorSwitch.checked) {
            const err = document.createElement('div');
            err.innerHTML = getErrorMessages().join('\n');
            navigator.clipboard.writeText(err.innerText + getDownloadList().join('\n'));
            if (!modOutput.title.innerText.includes('(Copied)')) {
                modOutput.title.innerText = modOutput.title.innerText + ' (Copied)';
            }
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