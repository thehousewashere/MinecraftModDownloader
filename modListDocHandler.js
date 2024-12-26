import { menuButtons, urlDownloaderElements, modInput, COLOR, modListDocElements, modListDoc, style } from "./elements.js";
import * as Util from "./util.js";

let output;

export async function modListDocPage(){
        menuButtons.urlDownloader.className = 'nav-link';
        menuButtons.modListDoc.className = 'nav-link active';
        menuButtons.search.className = 'nav-link';
        const response = await fetch('modListDoc.html', {cache: 'no-store'});
        root.innerHTML = await response.text(); //TODO: Fix this
        document.getElementById('CFsvg').innerHTML = 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1.995 278.453 626.958 95.636" style="enable-background:new 0 0 652 652">
            <path fill="currentColor"
                d="M152.6 306.9s23.9-3.8 27.7-15h-36.7V283H63.1l9.9 11.7v12s25-1.3 34.7 6.1c13.3 12.5-14.9 29.3-14.9 29.3L88 358.4c7.6-7.3 22-16.7 48.4-16.3-10 3.2-20.2 8.2-28 16.3h53.4l-5-16.2c-.1 0-38.8-23.1-4.2-35.3z" />            <path fill="currentColor" d="M213.2 346.7c6.2 0 10.7-2 14.6-5.9l-4.3-5.6c-3.1 3.1-6.1 4.2-9.8 4.2-6.3 0-11.7-4.4-11.7-13 0-8 5.3-13.1 12.1-13.1 3.7 0 6.6 1.3 9.1 3.9l4.3-5.8c-3.5-3.5-8.1-5.3-13.7-5.3-11.4 0-19.9 8.3-19.9 20.3.1 12.7 8.4 20.3 19.3 20.3zm57.1-39.8h-7.9v20.5c0 8.6-4.6 12-9.9 12-5.5 0-8.8-3.4-8.8-10.5v-22h-7.9v22.9c0 11.3 5.7 16.9 13.8 16.9 5.6 0 9.9-2.3 12.7-7l.3 6h7.6v-38.8zm20 7.8-.2-7.8h-7.6v38.9h7.9V327c0-10.6 7.8-13 14.3-12.6v-8.1c-4.9 0-10.8 1.5-14.4 8.4zm35.2 32c8.3 0 15.2-4.5 15.2-12.2 0-14.9-22.1-8.9-22.1-17 0-2.7 2.4-4.7 7.3-4.7 4.3 0 7.7 1.6 10.3 4.2l4.2-5.4c-3.4-3.3-8.2-5.6-14.7-5.6-9.2 0-15.1 5.1-15.1 11.8 0 15 22.1 8.2 22.1 17.1 0 3.4-2.9 4.9-7.3 4.9-4.6 0-8.2-1.6-11.7-5.1l-4.6 5.3c3.9 3.9 8.6 6.7 16.4 6.7zm59-20.5c0-12.9-7.5-20.3-18.2-20.3-10.5 0-19.3 7.9-19.3 20.4 0 12.8 7.9 20.5 19.6 20.5 6.7 0 11.8-2 16-6.6l-4.3-5.2c-3.5 3.4-6.9 4.8-11.2 4.8-7 0-11.4-3.9-12.1-11.3h29.3c.2-.9.2-1.5.2-2.3zm-18.2-13.6c5.9 0 9.4 4 10.1 10.1h-21c.9-6.1 5.2-10.1 10.9-10.1zm37.2-5.7v-3.1c0-4.8 2.5-7.2 6.3-7.2 2.3 0 4.1.7 5.8 2.1l3.4-5.8c-2.7-1.9-5.9-3.1-9.8-3.1-8.6 0-13.6 5.4-13.6 14.4v2.8h-6l-1.8 6.9h7.8v32h7.9v-32h13V307h-13zm35.6 39.9c10.7 0 20-7.7 20-20.4 0-13-9.3-20.5-19.9-20.5-10.7 0-20.1 7.6-20.1 20.5 0 12.8 9.5 20.4 20 20.4zm0-7.1c-6.4 0-11.9-5-11.9-13.3 0-8.4 5.7-13.4 12-13.4 6.4 0 11.8 5 11.8 13.3.1 8.4-5.6 13.4-11.9 13.4zm37.3-25-.2-7.8h-7.6v38.9h7.9V327c0-10.6 7.8-13 14.3-12.6v-8.1c-5 0-10.8 1.5-14.4 8.4zm57.4-7.8h-7.6l-.1 6c-2.7-4.4-7.1-7.1-12.9-7.1-10.4 0-17.7 8.9-17.7 20 0 11 6.6 19.9 17.6 19.9 5.8 0 10.2-2.8 13-7.2v5c0 8.3-4.8 11.2-11.9 11.2-3.8 0-7.1-1-10-2.4l-2.4 6.8c3.6 1.8 7.7 2.8 12.6 2.8 11.6 0 19.6-5.7 19.6-18.8v-36.2zm-19.4 31.8c-6.3 0-10.9-5.1-10.9-12.9 0-7.8 5-12.7 11.5-12.7 6.3 0 11 4.6 11 12.7 0 8.2-5.1 12.9-11.6 12.9zm66.4-12.5c0-12.9-7.5-20.3-18.2-20.3-10.5 0-19.3 7.9-19.3 20.4 0 12.8 7.9 20.5 19.6 20.5 6.7 0 11.8-2 16-6.6l-4.3-5.2c-3.5 3.4-6.9 4.8-11.2 4.8-7 0-11.4-3.9-12.1-11.3h29.3c.1-.9.2-1.5.2-2.3zm-18.2-13.6c5.9 0 9.4 4 10.1 10.1h-21c.9-6.1 5.2-10.1 10.9-10.1z" />
        </svg>`;
        urlDownloaderElements();
        modListDocElements();
        buttonDisable(true);
        addEventListeners();
}

function buttonDisable(flag){
    modListDoc.downloadHTML.disabled = flag;
}

function addEventListeners(){
    modInput.loadButton.addEventListener('click', async () => {
        if (modInput.textArea.value.trim() != ''){
            output = await generateDocument(modInput.textArea.value);
            buttonDisable(false);
            Util.setOutput('Output', output, '', true);
        } else {
            Util.setOutput('Output Error', 'No text in the URL text area.', COLOR.DANGER, false);
        }
    });
    modListDoc.downloadHTML.addEventListener('click', () => {
        if (output.trim() == ''){
            return;
        }
        let theme;
        if (localStorage.getItem('theme')){
            theme = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/${localStorage.getItem('theme')}/bootstrap.min.css`
        } else {
            theme = `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`;
        }
        const endLine = '\n';
        let html = `
        <!doctype html>
        <html lang="en">

        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Minecraft Mod Downloader</title>
            <link rel="icon" type="image/x-icon" href="https://raw.githubusercontent.com/thehousewashere/MinecraftModDownloader/refs/heads/main/icon.ico">
            <link href="${theme}" rel="stylesheet">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
        </head>

        <style>
            ::-webkit-scrollbar {
                display: none;
            }

            body {
                overflow-x: hidden;
            }
        </style>

        <body id="body" data-bs-theme="${body.getAttribute('data-bs-theme')}">
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand"><img src="https://raw.githubusercontent.com/thehousewashere/MinecraftModDownloader/refs/heads/main/icon.ico" class="rounded" style="width: 50px; height: 50px;">
                        Minecraft Mod Downloader</a>
                    <div>
                        <t onclick=" window.open('https://thehousewashere.github.io/MinecraftModDownloader/','_blank')">
                            <i class="bi bi-globe-americas"></i> Website</i>
                        </t>
                        <br>
                        <t onclick=" window.open('https://github.com/thehousewashere/MinecraftModDownloader','_blank')">
                            <i class="bi bi-github"></i> Repo</i>
                        </t>
                    </div>
                </div>
            </nav>
            <button type="button" class="btn btn-warning" id="modOutputCopy" onclick="getModLinks()"><i class="bi bi-copy"></i></button>
            
            ${output}

            <script>
                function getModLinks(){
                    const links = document.querySelectorAll('a');
      
                    const hrefs = [];
                    links.forEach(link => {
                        hrefs.push(link.href);
                    });
                    
                    navigator.clipboard.writeText(hrefs.join('\\n'));
                }
            </script>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
                crossorigin="anonymous"></script>
        </body>

        </html>
        `;

        let blob = new Blob([html], {type: "text/html"});
        saveAs(blob, `mmd${Util.getTimestamp()}.html`)
    });
}

async function generateDocument(list){
    let final = `<table class="table table-sm table-hover">`;
    for (let e of list.split('\n')) {
        if (e.includes('https://www.curseforge.com/')) {
            const url = e;
            e = e.replace('https://www.curseforge.com/', 'https://api.cfwidget.com/');
            let mod = await fetch(e).then(response => response.json());
            const title = mod['title'];
            const icon = mod['thumbnail'];
            final += `<tr><td><img src="${icon}" style="width: 50px; height 50px;"></td> <td><b>${title}</b><br> <a class="link-opacity-50-hover" href="${url}">${url}</a></td></tr>`;
        } else if (e.includes('https://modrinth.com/mod/')) {
            const url = e;
            e = e.replace('https://modrinth.com/mod/', 'https://api.modrinth.com/v2/project/');
            let mod = await fetch(e).then(response => response.json());
            const title = mod['title'];
            const icon = mod['icon_url'];
            final += `<tr><td><img src="${icon}" style="width: 50px; height 50px;"></td> <td><b>${title}</b><br> <a class="link-opacity-50-hover" href="${url}">${url}</a></td></tr>`;
        } else {
            //Do something
        }
    }
    return final + `</tbody></table>`;
}