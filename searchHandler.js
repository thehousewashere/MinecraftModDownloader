import { menuButtons, searchElements, search } from "./elements.js";
import { setModal } from "./util.js";
import { urlDownloader } from "./modHandler.js";

let list = [];

export async function searchPage() {
    menuButtons.urlDownloader.className = 'nav-link';
    menuButtons.modListDoc.className = 'nav-link';
    menuButtons.search.className = 'nav-link active';
    const response = await fetch('search.html', { cache: 'no-store' });
    root.innerHTML = await response.text();
    searchElements();
    addEventListeners();
    const params = new URLSearchParams(window.location.search);
    search.versionInput.value = params.get('v') || '';
    search.loaderDropdown.value = params.get('l') || 'N/A Loader'
    list = [];
}

function addEventListeners() {
    search.searchButton.addEventListener('click', e => {
        searchPress()
    });
    search.textArea.addEventListener('keydown', e => {
        if (e.key == 'Enter') {
            searchPress();
        }
    });
    search.sendOutput.addEventListener('click', () => {
        if (list.length > 0){
            urlDownloader(search.versionInput.value, search.loaderDropdown.value, list.join('\n'));
        }
    });
    search.cat.addEventListener('click', () => {
        const meowVariants = [
            "meow", "meoW", "meOw", "meOW",
            "mEow", "mEoW", "mEOw", "mEOW",
            "Meow", "MeoW", "MeOw", "MeOW",
            "MEow", "MEoW", "MEOw", "MEOW"
          ];        
        if (search.cat.dataset.count == '11'){
            search.cat.innerHTML += `${meowVariants[Math.floor(Math.random() * meowVariants.length)]}<br>`;
            search.cat.dataset.count = '0';
        } else {
            search.cat.innerHTML += meowVariants[Math.floor(Math.random() * meowVariants.length)] + ' ';
            search.cat.dataset.count = JSON.parse(search.cat.dataset.count) + 1;
        }
    });
}

function searchPress() {
    if (search.textArea.value.trim() != '' && (search.modrinthButton.checked || search.curseForgeButton.checked) && search.limitInput.value > 0) {
        search.textArea.className = 'form-control';
        search.limitInput.className = 'form-control';
        search.optionsText.innerHTML = `Options`;
        search.optionsText.className = '';
        searchHandler(search.textArea.value, search.modrinthButton.checked, search.curseForgeButton.checked, search.versionInput.value.trim() || null, Math.round(search.limitInput.value), search.loaderDropdown.value || null)
    } else {
        if (search.textArea.value.trim() == '') {
            search.textArea.className = 'form-control is-invalid';
        }
        if (search.limitInput.value <= 0){
            search.limitInput.className = 'form-control is-invalid';
        }
        if (!search.modrinthButton.checked || !search.curseForgeButton.checked) {
            search.optionsText.innerHTML = `Options <i class="bi bi-exclamation-circle"></i>`;
            search.optionsText.className = 'text-danger';
        }
        //TODO: add 50ish limit
    }
}

async function searchHandler(query, modrinth, curseforge, version, limit, loader) {
    const loaderMap = { "Forge": 1, "Fabric": 4, "NeoForge": 6, "Quilt": 5 };
    let searchStuff;
    const both = modrinth && curseforge;
    let modrinthCards = [];
    let curseForgeCards = [];
    let slugButtons = [];
    if (both && limit > 1) {
        limit = limit / 2;
        limit = Math.round(limit);
    }
    if (modrinth) {
        if (!version && !loader) {
            searchStuff = `https://api.modrinth.com/v2/search?limit=${limit}&query=${encodeURIComponent(query)}&facets=[["project_type:mod"]]`;
        } else {
            searchStuff = `https://api.modrinth.com/v2/search?limit=${limit}&query=${encodeURIComponent(query)}&facets=[["project_type:mod"]${loader ? `,["categories:${loader}"]` : ''}${version ? `,["versions:${version}"]` : ''}]`;
        }

        let results = await fetch(searchStuff).then(response => response.json());
        results.hits.forEach(hit => {
            modrinthCards.push(`
            <div class="card" style="width: 23rem; position: relative;">
                <div class="card-header bg-success bg-opacity-75">
                    <div class="d-flex align-items-center">
                        <img src="${hit.icon_url}"
                            style="width: 50px; height: 50px; margin-right: 10px;">
                        <div>
                            <h5 class="card-title"><a class="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover" onclick="window.open('https://modrinth.com/mod/${hit.slug}', '_blank')")">${hit.title}</a></h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${hit.author}</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">${hit.description}
                        <br>
                        <t class="font-monospace">${hit.versions[hit.versions.length - 1]} | ${hit.date_modified.split('T')[0]}</t>
                    </p>            
                    <button class="btn btn-primary" id="RIN${hit.slug}Button" data-name="${hit.title}" data-img="${hit.icon_url}" data-url="https://modrinth.com/mod/${hit.slug}" onclick="this.disabled=true;"><i class="bi bi-plus-lg"></i></button>
                    <button class="btn btn-outline-warning" id="modOutputCopy"><i class="bi bi-copy" onclick="navigator.clipboard.writeText('https://modrinth.com/mod/${hit.slug}')"></i></button>
                </div>
                <div class="card-logo-text">MODRINTH</div>
            </div>
                `);

                slugButtons.push('RIN'+hit.slug+"Button");

        });

    }
    if (curseforge) {
        searchStuff = `https://www.curseforge.com/api/v1/mods/search?gameId=432&classId=6&filterText=${encodeURIComponent(query)}${version ? `&gameVersion=${version}` : ''}&pageSize=${limit}&sortField=1${loader ? `&gameFlavors[0]=${loaderMap[loader]}` : ''}`;
        let results = await fetch(searchStuff).then(response => response.json());
        results.data.forEach(hit => {
            curseForgeCards.push(`
            <div class="card" style="width: 23rem;">
                <div class="card-header bg-warning bg-opacity-75">
                    <div class="d-flex align-items-center">
                        <img src="${hit.avatarUrl}"
                            style="width: 50px; height: 50px; margin-right: 10px;">
                        <div>
                            <h5 class="card-title"><a class="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover" onclick="window.open('https://www.curseforge.com/minecraft/mc-mods/${hit.slug}', '_blank')")">${hit.name}</a></h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${hit.author.name}</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">${hit.summary}
                        <br>
                        <t class="font-monospace">${hit.gameVersion} | ${new Date(hit.updateDate * 1000).toLocaleDateString('en-CA').replace(/\//g, '-')}</t>
                    </p>
                    <button class="btn btn-primary" id="CF${hit.slug}Button" data-name="${hit.name}" data-img="${hit.avatarUrl}" data-url="https://www.curseforge.com/minecraft/mc-mods/${hit.slug}" onclick="this.disabled=true;"><i class="bi bi-plus-lg"></i></button>
                    <button class="btn btn-outline-warning" id="modOutputCopy" onclick="navigator.clipboard.writeText('https://www.curseforge.com/minecraft/mc-mods/${hit.slug}')"><i class="bi bi-copy"></i></button>
                </div>
                <div class="card-logo-text">CURSEFORGE</div>
            </div>
                `);
                slugButtons.push('CF'+hit.slug+"Button");
        });
    }
    if (both){
        let final = `
            <div style="display: flex; flex-wrap: wrap;">
        `;
        for(let i = 0; i < limit; i++){
            if (modrinthCards[i] != null && curseForgeCards[i] != null){
                final += `
                <div class="p-1">
                    ${modrinthCards[i]}  
                </div>
                <div class="p-1">
                    ${curseForgeCards[i]} 
                </div>
                `;
            } else if (modrinthCards[i] == null && curseForgeCards[i] != null){
                final += `
                <div class="p-1">
                    ${curseForgeCards[i]} 
                </div>`;
            } else if (curseForgeCards[i] == null && modrinthCards[i] != null){
                final += `
                <div class="p-1">
                    ${modrinthCards[i]}  
                </div>`;
            } else {
                i = limit;
            } 
        }
        setModal(query, final,'', true);
    } else if (curseforge){
        setModal(query, curseForgeCards.join('<div class="p-1"></div>'), '', false);
    } else if (modrinth){
        setModal(query, modrinthCards.join('<div class="p-1"></div>'), '', false);
    }        
    slugButtons.forEach(slug => {
        let slugElement = document.getElementById(slug);
        slugElement.addEventListener('click', () => searchOutput(slugElement.dataset.name, slugElement.dataset.img, slugElement.dataset.url));
    })
}

export function searchOutput(name, image, url){
    list.push(url);
    if (JSON.parse(search.outputText.dataset.empty)){
        search.outputText.dataset.empty = 'false';
        search.outputText.innerHTML = `
        <div class="d-flex align-items-center mb-2">
            <div class="me-3">
                <img src="${image}" class="img-fluid rounded" style="width: 50px; height: 50px;">
            </div>
            <div class="flex-grow-1">
                <b>${name}</b><br>
                <a class="link-opacity-50-hover" onclick="window.open('${url}', '_blank')">${url}</a>
            </div>
        </div>
        <hr style="margin: 0;"  class="pb-1">
        `;
    } else {
        search.outputText.innerHTML += `
        <div class="d-flex align-items-center mb-2">
            <div class="me-3">
                <img src="${image}" class="img-fluid rounded" style="width: 50px; height: 50px;">
            </div>
            <div class="flex-grow-1">
                <b>${name}</b><br>
                <a class="link-opacity-50-hover" onclick="window.open('${url}', '_blank')">${url}</a>
            </div>
        </div>
        <hr style="margin: 0;" class="pb-1">
        `;
    }
}