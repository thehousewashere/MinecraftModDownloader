import { menuButtons, searchElements, search } from "./elements.js";

export async function searchPage() {
    menuButtons.urlDownloader.className = 'nav-link';
    menuButtons.search.className = 'nav-link active';
    const response = await fetch('search.html', { cache: 'no-store' });
    root.innerHTML = await response.text();
    searchElements();
    addEventListeners();
}

function addEventListeners(){
    search.searchButton.addEventListener('click', e => {
        if (search.textArea.value.trim() != '' && (search.modrinthButton.checked || search.curseForgeButton.checked)){
             search.textArea.className = 'form-control';
            searchHandler(search.textArea.value, search.modrinthButton.checked, search.curseForgeButton.checked, search.versionInput.value.trim() || null, search.limitInput.value, search.loaderDropdown.value || null)
        } else {
            if (search.textArea.value.trim() == '') {
                search.textArea.className = 'form-control is-invalid';
            } 
            if (!search.modrinthButton.checked || !search.curseForgeButton.checked){
                //do something
            }
            //TODO: add 50 limit
        }

    });
}

function searchHandler(query, modrinth, curseforge, version, limit, loader){
    const loaderMap = { "Forge": 1, "Fabric": 4, "NeoForge": 6, "Quilt": 5 };
    let searchStuff;
    if(modrinth && curseforge){
        limit = limit /2;
    }
    if (modrinth){
        searchStuff = `https://api.modrinth.com/v2/search?limit=${limit}&query=${encodeURIComponent(query)}&facets=[["project_type:mod"]${loader ? `,["categories:${loader}"]` : ''}${version ? `,["versions:${version}"]` : ''}]`;
        console.log(searchStuff);
    }
    if (curseforge){
        searchStuff =  `https://www.curseforge.com/api/v1/mods/search?gameId=432&filterText=${encodeURIComponent(query)}${version ? `$gameVersion=${version}` : ''}&pageSize=${limit}&sortField=1${loader ? `&gameFlavors[0]=${loaderMap[loader]}` : ''}`;
        console.log(searchStuff);
    }
}