import { modInput, COLOR, TEXTCOLOR, modOutput, settings, urlDownloaderElements, menuButtons } from './elements.js';
import { downloadHTMLList } from './modListDocHandler.js';
import * as Util from './util.js';

let downloadList = [];
let errorMessages = [];

export function getDownloadList() {
    return downloadList;
}

export function getErrorMessages() {
    return errorMessages;
}

export async function urlDownloader(verison, loader, urls) {
    menuButtons.urlDownloader.className = 'nav-link active';
    menuButtons.search.className = 'nav-link';
    menuButtons.modListDoc.className = 'nav-link';
    const response = await fetch('urlDownloader.html', { cache: 'no-store' });
    root.innerHTML = await response.text(); //TODO: Fix this
    document.getElementById('CFsvg').innerHTML =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1.995 278.453 626.958 95.636" style="enable-background:new 0 0 652 652">
        <path fill="currentColor"
            d="M152.6 306.9s23.9-3.8 27.7-15h-36.7V283H63.1l9.9 11.7v12s25-1.3 34.7 6.1c13.3 12.5-14.9 29.3-14.9 29.3L88 358.4c7.6-7.3 22-16.7 48.4-16.3-10 3.2-20.2 8.2-28 16.3h53.4l-5-16.2c-.1 0-38.8-23.1-4.2-35.3z" />            <path fill="currentColor" d="M213.2 346.7c6.2 0 10.7-2 14.6-5.9l-4.3-5.6c-3.1 3.1-6.1 4.2-9.8 4.2-6.3 0-11.7-4.4-11.7-13 0-8 5.3-13.1 12.1-13.1 3.7 0 6.6 1.3 9.1 3.9l4.3-5.8c-3.5-3.5-8.1-5.3-13.7-5.3-11.4 0-19.9 8.3-19.9 20.3.1 12.7 8.4 20.3 19.3 20.3zm57.1-39.8h-7.9v20.5c0 8.6-4.6 12-9.9 12-5.5 0-8.8-3.4-8.8-10.5v-22h-7.9v22.9c0 11.3 5.7 16.9 13.8 16.9 5.6 0 9.9-2.3 12.7-7l.3 6h7.6v-38.8zm20 7.8-.2-7.8h-7.6v38.9h7.9V327c0-10.6 7.8-13 14.3-12.6v-8.1c-4.9 0-10.8 1.5-14.4 8.4zm35.2 32c8.3 0 15.2-4.5 15.2-12.2 0-14.9-22.1-8.9-22.1-17 0-2.7 2.4-4.7 7.3-4.7 4.3 0 7.7 1.6 10.3 4.2l4.2-5.4c-3.4-3.3-8.2-5.6-14.7-5.6-9.2 0-15.1 5.1-15.1 11.8 0 15 22.1 8.2 22.1 17.1 0 3.4-2.9 4.9-7.3 4.9-4.6 0-8.2-1.6-11.7-5.1l-4.6 5.3c3.9 3.9 8.6 6.7 16.4 6.7zm59-20.5c0-12.9-7.5-20.3-18.2-20.3-10.5 0-19.3 7.9-19.3 20.4 0 12.8 7.9 20.5 19.6 20.5 6.7 0 11.8-2 16-6.6l-4.3-5.2c-3.5 3.4-6.9 4.8-11.2 4.8-7 0-11.4-3.9-12.1-11.3h29.3c.2-.9.2-1.5.2-2.3zm-18.2-13.6c5.9 0 9.4 4 10.1 10.1h-21c.9-6.1 5.2-10.1 10.9-10.1zm37.2-5.7v-3.1c0-4.8 2.5-7.2 6.3-7.2 2.3 0 4.1.7 5.8 2.1l3.4-5.8c-2.7-1.9-5.9-3.1-9.8-3.1-8.6 0-13.6 5.4-13.6 14.4v2.8h-6l-1.8 6.9h7.8v32h7.9v-32h13V307h-13zm35.6 39.9c10.7 0 20-7.7 20-20.4 0-13-9.3-20.5-19.9-20.5-10.7 0-20.1 7.6-20.1 20.5 0 12.8 9.5 20.4 20 20.4zm0-7.1c-6.4 0-11.9-5-11.9-13.3 0-8.4 5.7-13.4 12-13.4 6.4 0 11.8 5 11.8 13.3.1 8.4-5.6 13.4-11.9 13.4zm37.3-25-.2-7.8h-7.6v38.9h7.9V327c0-10.6 7.8-13 14.3-12.6v-8.1c-5 0-10.8 1.5-14.4 8.4zm57.4-7.8h-7.6l-.1 6c-2.7-4.4-7.1-7.1-12.9-7.1-10.4 0-17.7 8.9-17.7 20 0 11 6.6 19.9 17.6 19.9 5.8 0 10.2-2.8 13-7.2v5c0 8.3-4.8 11.2-11.9 11.2-3.8 0-7.1-1-10-2.4l-2.4 6.8c3.6 1.8 7.7 2.8 12.6 2.8 11.6 0 19.6-5.7 19.6-18.8v-36.2zm-19.4 31.8c-6.3 0-10.9-5.1-10.9-12.9 0-7.8 5-12.7 11.5-12.7 6.3 0 11 4.6 11 12.7 0 8.2-5.1 12.9-11.6 12.9zm66.4-12.5c0-12.9-7.5-20.3-18.2-20.3-10.5 0-19.3 7.9-19.3 20.4 0 12.8 7.9 20.5 19.6 20.5 6.7 0 11.8-2 16-6.6l-4.3-5.2c-3.5 3.4-6.9 4.8-11.2 4.8-7 0-11.4-3.9-12.1-11.3h29.3c.1-.9.2-1.5.2-2.3zm-18.2-13.6c5.9 0 9.4 4 10.1 10.1h-21c.9-6.1 5.2-10.1 10.9-10.1z" />
    </svg>`;
    urlDownloaderElements();
    if (verison || loader || urls){
        modInput.verisonArea.value = verison || '';
        modInput.loaderDropdown.value = loader || 'Forge';
        modInput.textArea.value = urls || '';
    } else {
        const params = new URLSearchParams(window.location.search);
        modInput.verisonArea.value = params.get('v') || '';
        modInput.loaderDropdown.value = params.get('l') || 'N/A Loader'
        let mods = params.get('d') || ''; 
        if (mods.trim() != ''){
            modInput.textArea.value = mods.split('//').join('\n').replaceAll('m/', 'https://modrinth.com/mod/').replaceAll('cf/', 'https://www.curseforge.com/minecraft/mc-mods/').replaceAll('mdn/', 'https://cdn.modrinth.com/data/').replaceAll('cfdn/', 'https://mediafiles.forgecdn.net/files/')
        }   
    }
    addEventListener();
}

let final = [];
let nonErrorResults;
async function modDisplay(limit, current, mod) {
    updateProgressBar(current, limit);
    final.push(mod);
    if (limit == current) {
        hideProgressBar();
        nonErrorResults = final.filter(result => result !== null);
        if (localStorage.getItem('settingsRemoveDupesSwitch') === 'true') {
            nonErrorResults = nonErrorResults.filter((item, index) => nonErrorResults.indexOf(item) === index);
            //TODO: Remove Modrinth and CurseForge duplicates
            // downloadList.forEach(url => {
            //     console.log(url);
            //     console.log(Util.extractFileName(url));
            // });
        }
        if (localStorage.getItem('settingsTopErrorSwitch') === 'true') {
            errorMessages.push('');
            nonErrorResults.push('');
            Util.setOutput(`Output (${nonErrorResults.length-1})`, '<table class="table table-sm table-hover">' + errorMessages.join('</tr>') + nonErrorResults.join('</tr>') + '</table>', COLOR.PRIMARY, true);
        } else {
            Util.setOutput(`Output (${nonErrorResults.length-1})`, '<table class="table table-sm table-hover">' + nonErrorResults.join('</tr>') + errorMessages.join('</tr>') + '</table>', COLOR.PRIMARY, true);
        }
        modOutput.copyButton.disabled = false;
        modOutput.downloadButton.disabled = false;
        modOutput.downloadHTML.disabled = false;
    }
}

function addEventListener() {
    modInput.loadButton.addEventListener('click', () => {
        modOutput.copyButton.disabled = true;
        modOutput.downloadButton.disabled = true;
        modOutput.downloadHTML.disabled = true;
        if (modInput.textArea.value.trim() === '') {
            Util.setOutput('Output Error', 'No text in the URL text area.', COLOR.DANGER, false);
            return;
        }
        if (modInput.verisonArea.value.trim() === '') {
            Util.setOutput('Output Error', 'No text in the version area.', COLOR.DANGER, false);
            return;
        }
        let promises = [];
        errorMessages = [];
        downloadList = [];
        final = [];
        const userInput = parseInput(modInput.textArea.value);
        
        let urlCount = userInput.length;
        let index = 1;
        modInput.urlsText.innerHTML = `URLs <br> (${urlCount})`;
        if (userInput.length > 0) {
            userInput.forEach(async e => {
                let mod = '';
                let verison = modInput.verisonArea.value.toString();
                let loader = modInput.loaderDropdown.value;
                if (e.includes('https://www.curseforge.com/')) {
                    e = e.replace('https://www.curseforge.com/', 'https://api.cfwidget.com/');
                    mod = await fetch(e).then(response => {
                        if (!response.ok) {
                            const errorMessage = `<tr><td></td><td><i class="bi bi-bug-fill"></i> (<a href="https://cfwidget.com/#documentation:responses" target="_blank" rel="noopener noreferrer" class='${TEXTCOLOR.DANGER} fw-bold'>${response.status}</a>): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}</td>`;
                            errorMessages.push(errorMessage);
                            return null;
                        }
                        return response.json();
                    }).then(text => {
                        if (text) {
                            let count = 0;
                            let loaderLocated = false;
                            if (loader == 'None') {
                                loaderLocated = true;
                            } else {
                                text['versions'][verison].every((e) => {
                                    if (e['versions'].includes(loader)) {
                                        loaderLocated = true;
                                        return false;
                                    } else {
                                        count++;
                                        return true;
                                    }
                                });
                            }
                            if (loaderLocated) {
                                let id = text['versions'][verison][count]['id'].toString();
                                let name = text['versions'][verison][count]['name'].toString().replace(' ', '%20').replace('+', '%2B');
                                let thumbnail = text['thumbnail'].toString();
                                let title = text['title'].toString();
                                let downloadLink = 'https://mediafiles.forgecdn.net/files/' + id.substring(0, 4) + '/' + parseInt(id.substring(4)) + '/' + name;
                                downloadList.push(downloadLink);
                                return '<td><img src="' + thumbnail + `" style="width: 50px; height: 50px;"></td>` + '<td  width="90%"> <b>' + title + `</b><br> <a class="link-opacity-50-hover" href="${downloadLink}">` + downloadLink + '</a></td>';
                            } else {
                                const errorMessage = `<tr><td></td><td><i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.WARNING}'>Mod not found under ${loader}</b>): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}</td>`;
                                errorMessages.push(errorMessage);
                                return null;
                            }
                        }
                        return null;
                    }).catch(error => {
                        let errorMessage;
                        if (error.message == 'text.versions[verison] is undefined') {
                            errorMessage = `<tr><td></td><td><i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.WARNING}'>Mod not found in verison ${verison}</b>): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}</td>`;
                            console.error(`(Mod not found in verison ${verison}): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}`);
                        } else {
                            errorMessage = `<tr><td></td><td><i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.DANGER}'>${error.message}</b>): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}</td>`;
                            console.error(`(${error.message}): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}`);
                        }
                        errorMessages.push(errorMessage);
                        return null;
                    });
                    modDisplay(urlCount, index, mod);
                    index++;
                } else if (e.includes('https://modrinth.com/mod/')) {
                    e = e.replace('https://modrinth.com/mod/', 'https://api.modrinth.com/v2/project/');
                    const nonVerison = e;
                    e += '/version';
                    for (let i = 0; i < 65; i++){
                        mod = await fetch(e)
                        .then(async response => {
                            if (!response.ok) {
                                // if (response.status == 429){
                                //     await new Promise(resolve => setTimeout(resolve, 10000));
                                //     //TODO: Fix this for the app verison
                                // } else {
                                    const errorMessage = `<tr><td></td><td><i class="bi bi-bug-fill"></i> (<a href="https://docs.modrinth.com/#tag/users/operation/getUserProjects" target="_blank" rel="noopener noreferrer" class='${TEXTCOLOR.DANGER} fw-bold'>${response.status}</a>): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/')}</td>`;
                                    errorMessages.push(errorMessage);
                                    return null;
                                // }
                            }
                            return response.json();
                        })
                        .then(async text => {
                            if (text) {
                                let count = 0;
                                let loaderLocated = false;
                                if (loader == 'None') {
                                    text.forEach(e => {
                                        if (text[count]['game_versions'].includes(verison)) {
                                            loaderLocated = true;
                                            return false;
                                        } else {
                                            count++;
                                            return true;
                                        }
                                    });
                                } else {
                                    text.forEach(e => {
                                        if (text[count]['game_versions'].includes(verison) && text[count]['loaders'].includes(loader.toLowerCase())) {
                                            loaderLocated = true;
                                            return false;
                                        } else {
                                            count++;
                                            return true;
                                        }
                                    });
                                }
                                if (loaderLocated) {
                                    let thumbnail = ``;
                                    let title = ``;
                                    await fetch(nonVerison).then(async response => {
                                        if (response.ok) {
                                            const rep = await response.json();
                                            thumbnail = rep['icon_url'];
                                            title = rep['title'];
                                        }
                                    });
                                    let downloadLink = text[count]['files'][0]['url'];
                                    downloadList.push(downloadLink);
                                    return '<td><img src="' + thumbnail + `" style="width: 50px; height: 50px;"></td><td>` + `<b>${title}</b><br> <a class="link-opacity-50-hover" href="${downloadLink}">` + downloadLink + `</a></td>`;
                                } else {
                                    const errorMessage = `<tr><td></td><td><i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.WARNING}'>Mod not found under ${loader}</b>): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}</td>`;
                                    errorMessages.push(errorMessage);
                                    return null;
                                }
                            }
                            return null;
                        })
                        .catch(async error => {
                            let errorMessage;
                            if (error.message == 'text.versions[verison] is undefined') {
                                errorMessage = `<tr><td></td><td><i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.WARNING}'>Mod not found in verison ${verison}</b>): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}</td>`;
                                console.error(`(Mod not found in verison ${verison}): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}`);
                                errorMessages.push(errorMessage);
                                return null;
                            } else if (error == 'TypeError: NetworkError when attempting to fetch resource.' || error == 'TypeError: Failed to fetch'){
                                    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds before retry
                            } else {
                                errorMessage = `<tr><td></td><td><i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.DANGER}'>${error.message}</b>): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}</td>`;
                                console.error(`(${error.message}): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}`);
                                errorMessages.push(errorMessage);
                                return null;
                            }

                        });
                        if (mod) {
                            break;
                        }
                    }
                    modDisplay(urlCount, index, mod);
                    index++;
                } else if (e.includes('https://cdn.modrinth.com/data/')) {
                    const title = e.slice(57);
                    const downloadLink = e;
                    downloadList.push(downloadLink);
                    let thumbnail = `
                    <svg data-v-2106485a="" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 512 514" class="modrinth-icon"><path fill="currentColor" fill-rule="evenodd" d="M503.16 323.56c11.39-42.09 12.16-87.65.04-132.8C466.57 54.23 326.04-26.8 189.33 9.78 83.81 38.02 11.39 128.07.69 230.47h43.3c10.3-83.14 69.75-155.74 155.76-178.76 106.3-28.45 215.38 28.96 253.42 129.67l-42.14 11.27c-19.39-46.85-58.46-81.2-104.73-95.83l-7.74 43.84c36.53 13.47 66.16 43.84 77 84.25 15.8 58.89-13.62 119.23-67 144.26l11.53 42.99c70.16-28.95 112.31-101.86 102.34-177.02l41.98-11.23a210.2 210.2 0 0 1-3.86 84.16z" clip-rule="evenodd"></path><path fill="currentColor" d="M321.99 504.22C185.27 540.8 44.75 459.77 8.11 323.24A257.6 257.6 0 0 1 0 275.46h43.27c1.09 11.91 3.2 23.89 6.41 35.83 3.36 12.51 7.77 24.46 13.11 35.78l38.59-23.15c-3.25-7.5-5.99-15.32-8.17-23.45-24.04-89.6 29.2-181.7 118.92-205.71 17-4.55 34.1-6.32 50.8-5.61L255.19 133c-10.46.05-21.08 1.42-31.66 4.25-66.22 17.73-105.52 85.7-87.78 151.84 1.1 4.07 2.38 8.04 3.84 11.9l49.35-29.61-14.87-39.43 46.6-47.87 58.9-12.69 17.05 20.99-27.15 27.5-23.68 7.45-16.92 17.39 8.29 23.07s16.79 17.84 16.82 17.85l23.72-6.31 16.88-18.54 36.86-11.67 10.98 24.7-38.03 46.63-63.73 20.18-28.58-31.82-49.82 29.89c25.54 29.08 63.94 45.23 103.75 41.86l11.53 42.99c-59.41 7.86-117.44-16.73-153.49-61.91l-38.41 23.04c50.61 66.49 138.2 99.43 223.97 76.48 61.74-16.52 109.79-58.6 135.81-111.78l42.64 15.5c-30.89 66.28-89.84 118.94-166.07 139.34"></path></svg>
                    `;
                    mod = '<td>' + thumbnail + `</td><td>` + `<b>${title}</b><br> <a class="link-opacity-50-hover" href="${downloadLink}">` + downloadLink + `</a></td>`;
                    modDisplay(urlCount, index, mod);
                    index++;
                } else if (e.includes('https://mediafiles.forgecdn.net/files/')){
                    const title = e.slice(47);
                    const downloadLink = e;
                    downloadList.push(downloadLink);
                    let thumbnail = `
                    <t class="p-0" width="50px" height="50px"><b>CF</b> <br> Mod</t>
                    `;
                    mod = '<td>' + thumbnail + `</td><td>` + `<b>${title}</b><br> <a class="link-opacity-50-hover" href="${downloadLink}">` + downloadLink + `</a></td>`;
                    modDisplay(urlCount, index, mod);
                    index++;
                }
            });
        } 
    });

    modOutput.downloadButton.addEventListener('click', async () => {
        if (localStorage.getItem('settingsZipDownloadSwitch') === 'true') {
        console.log('zip');
            zipDownload();
        } else {
            batchDownload();
        }
    });

    modInput.AddDependsButton.addEventListener('click', async () => {
        let verison = modInput.verisonArea.value.toString();
        let loader = modInput.loaderDropdown.value;
        let promises = [];
        parseInput(modInput.textArea.value).forEach(e => {
            if (e.includes('https://modrinth.com/mod/')) {
                e = e.replace('https://modrinth.com/mod/', 'https://api.modrinth.com/v2/project/');
                e += '/version'
                promises.push(
                    fetch(e)
                        .then(response => {
                            if (!response.ok) {
                                return null;
                            }
                            return response.json();
                        })
                        .then(text => {
                            if (text) {
                                let count = 0;
                                let loaderLocated = false;
                                if (loader == 'None') {
                                    text.forEach(e => {
                                        if (text[count]['game_versions'].includes(verison)) {
                                            loaderLocated = true;
                                            return false;
                                        } else {
                                            count++;
                                            return true;
                                        }
                                    });
                                } else {
                                    text.forEach(e => {
                                        if (text[count]['game_versions'].includes(verison) && text[count]['loaders'].includes(loader.toLowerCase())) {
                                            loaderLocated = true;
                                            return false;
                                        } else {
                                            count++;
                                            return true;
                                        }
                                    });
                                }
                                if (loaderLocated) {
                                    return text[count]['dependencies'];
                                } else {
                                    return null;
                                }
                            }
                            return null;
                        })
                        .catch(error => {
                            let errorMessage;
                            return null;
                        })
                )
            }
        });
        let r = [];
        Promise.all(promises)
            .then(results => {
                let promisesForUrls = results[0].map(async e => {
                    return e ? 'https://modrinth.com/mod/' + e['project_id'] : null;
                    // return fetch('https://api.modrinth.com/v2/project/' + e['project_id'])
                    //     .then(response => {
                    //         if (!response.ok) {
                    //             return null;
                    //         }
                    //         return response.json();
                    //     })
                    //     .then(text => {
                    //         return text ? 'https://modrinth.com/mod/'+text['id'] : null;
                    //     });
                });
                return Promise.all(promisesForUrls);
            }).then(urls => {
                r = urls.filter(url => url !== null);
                modInput.textArea.value += '\n';
                modInput.textArea.value += r.join('\n');
            });

    });

    modOutput.copyButton.addEventListener('click', async () => {
        modOutput.copyButton.disabled = true;
        if (localStorage.getItem('settingsDownloadCopy') === 'true' && !(localStorage.getItem('settingsErrorCopy') === 'true')) {
            navigator.clipboard.writeText(getDownloadList().join('\n'));
            if (!modOutput.title.innerText.includes('(Copied)')) {
                modOutput.title.innerText = modOutput.title.innerText + ' (Copied)';
            }
            modOutput.copyButton.disabled = false;
            return;
        } else if (!(localStorage.getItem('settingsDownloadCopy') === 'true') && localStorage.getItem('settingsErrorCopy') === 'true') {
            const err = document.createElement('div');
            err.innerHTML = getErrorMessages().join('\n');
            navigator.clipboard.writeText(err.innerText);
            if (!modOutput.title.innerText.includes('(Copied)')) {
                modOutput.title.innerText = modOutput.title.innerText + ' (Copied)';
            }
            modOutput.copyButton.disabled = false;
            return;
        } else if (localStorage.getItem('settingsDownloadCopy') === 'true' && localStorage.getItem('settingsErrorCopy') === 'true') {
            const err = document.createElement('div');
            err.innerHTML = getErrorMessages().join('\n');
            navigator.clipboard.writeText(err.innerText + getDownloadList().join('\n'));
            if (!modOutput.title.innerText.includes('(Copied)')) {
                modOutput.title.innerText = modOutput.title.innerText + ' (Copied)';
            }
        } else if (!(localStorage.getItem('settingsDownloadCopy') === 'true') && !(localStorage.getItem('settingsErrorCopy') === 'true')) {
            if (!modOutput.title.innerText.includes('(Copying disabled in Settings)')){
                modOutput.title.innerText = modOutput.title.innerText + ' (Copying disabled in Settings)';
            }
        }
        modOutput.copyButton.disabled = false;
    });

    modOutput.downloadHTML.addEventListener('click', () => {
        downloadHTMLList(modInput.verisonArea.value.trim(), modInput.loaderDropdown.value, '<table class="table table-sm table-hover">' + nonErrorResults.join('</tr>') + errorMessages.join('</tr>') + '</table>', true);
    });
}



async function batchDownload() {
    modOutput.downloadButton.disabled = true;
    // let r = modOutput.text.innerText;
    // // r = r.split('\n');
    // // r = r.filter(item => !item.includes('(404)') && !item.includes('(Mod not found under '));
    downloadList.forEach(function (e) {
        fetch(e)
            .then(res => res.blob())
            .then(blob => {
                if (e.includes('https://mediafiles.forgecdn.net/files/') == true) {
                    saveAs(blob, e.slice(47).replaceAll('%20', ' ').replaceAll('%2B', '+'));
                } else {
                    saveAs(blob, e.slice(57).replaceAll('%20', ' ').replaceAll('%2B', '+'));
                }
            });
    });
    modOutput.downloadButton.disabled = false;
}

function updateProgressBar(current, total) {
    if (modOutput.progressDiv.style.display == 'none') {
        modOutput.progressDiv.style.display = "";
    }
    const percent = (current / total) * 100;
    modOutput.progressBar.style.width = percent + '%';
    modOutput.progressBar.setAttribute('aria-valuenow', percent);
    modOutput.progressBar.innerText = current + ' out of ' + total;
}

function hideProgressBar() {
    modOutput.progressBar.style.width = '0%';
    modOutput.progressBar.setAttribute('aria-valuenow', 0);
    modOutput.progressDiv.style.display = "none";
}

async function zipDownload() {
    modOutput.downloadButton.disabled = true;
    let progressBarNum = 0;
    const totalItems = downloadList.length;
    const fileItemSize = 100; 

    try {
        // Process the download list in chunks of 100
        for (let i = 0; i < totalItems; i += fileItemSize) {
            const downloadListPart = downloadList.slice(i, i + fileItemSize); 

            const zip = new JSZip();

            for (let j = 0; j < downloadListPart.length; j++) {
                const link = downloadListPart[j];

                await downloadAndZip(link, zip);

                progressBarNum++;
                updateProgressBar(progressBarNum, totalItems); 
            }

            const blob = await zip.generateAsync({ type: 'blob' });

            const linkElement = document.createElement('a');
            linkElement.href = URL.createObjectURL(blob);
            linkElement.download = 'mmd_' + Util.getTimestamp() + '.zip';
            linkElement.click();
        }
    } catch (error) {
        console.error('Error downloading files:', error);
    } finally {
        hideProgressBar();
        modOutput.downloadButton.disabled = false;
    }
}

function downloadAndZip(link, zip) {
    return new Promise((resolve, reject) => {
        fetch(link)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${link}`);
                }
                return response.blob();
            })
            .then(blob => {
                const filename = link.includes('https://mediafiles.forgecdn.net/files/')
                    ? link.slice(47).replaceAll('%20', ' ').replaceAll('%2B', '+')
                    : link.slice(57).replaceAll('%20', ' ').replaceAll('%2B', '+');

                zip.file(filename, blob);
                resolve();
            })
            .catch(error => reject(error));
    });
}


function parseInput(input) {
    return input.split(/\n|,/)
        .map(item => item.trim())
        .filter(item => item !== '' && 
            (item.includes("https://www.curseforge.com/") || item.includes("https://modrinth.com/mod/") || item.includes("https://cdn.modrinth.com/data/") || item.includes("https://mediafiles.forgecdn.net/files/"))
        );
}