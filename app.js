import { settingsModal } from './settingsModal.js';
import { themeModal, loadTheme } from './themeModal.js';
import { urlDownloader } from './modHandler.js';
import * as Util from './util.js';
import { menuButtons } from './elements.js';
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

const params = new URLSearchParams(window.location.search);
const file = params.get('file') || '';
if (file.trim() != ''){
    window.history.replaceState({}, document.title, window.location.origin);
    Util.setModal(`Upload MMD Doc`, 
        `
        <div class="input-group mb-3">
            <input type="file" class="form-control" id="uploadFile" accept=".html">
        </div>        
        `, `
        <span class="border border-warning rounded pe-1 bg-secondary-subtle">
        <button type="button" class="btn btn-warning" onclick="navigator.clipboard.writeText('${file}')"><i class="bi bi-copy"></i></button>
        ${file.replace('file:///', '')}
        </span>

        `, true); 

        document.getElementById('uploadFile').addEventListener('change', e => {
            const file = document.getElementById('uploadFile').files[0];
            if (file){
                document.getElementById('uploadFile').className = 'form-control';
                const r = new FileReader();
                const hrefs = [];
                r.onload = function(e) {
                    const p = new DOMParser();
                    const mods = p.parseFromString(e.target.result, 'text/html');
                    const links = mods.querySelectorAll('a');
                    links.forEach(link => {
                        hrefs.push(link.href);
                    });
                    urlDownloader('','', hrefs.join('\n'));
                    Util.modalClose();
                };
                r.readAsText(file);
            } else {
                document.getElementById('uploadFile').className = 'form-control is-invalid';
            }
            
        });
}
const verison = params.get('v') || '';
const loader = params.get('l') || ''
const mods = params.get('d');
console.log(verison, loader, mods);
if (mods.trim() != ''){
    urlDownloader(verison, loader, mods.split('//').join('\n').replaceAll('m/', 'https://modrinth.com/mod/').replaceAll('cf/', 'https://www.curseforge.com/minecraft/mc-mods/'));
}
