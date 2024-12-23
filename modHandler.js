import { modInput, COLOR, TEXTCOLOR, modOutput, settings, urlDownloaderElements, menuButtons } from './elements.js';
import * as Util from './util.js';

let downloadList = [];        
let errorMessages = [];

export function getDownloadList(){
    return downloadList;
} 

export function getErrorMessages(){
    return errorMessages;
}

export async function urlDownloader(verison, loader, urls){
    menuButtons.urlDownloader.className = 'nav-link active';
    menuButtons.search.className = 'nav-link';
    const response = await fetch('urlDownloader.html', {cache: 'no-store'});
    root.innerHTML = await response.text(); //TODO: Fix this
    document.getElementById('CFsvg').innerHTML = 
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1.995 278.453 626.958 95.636" style="enable-background:new 0 0 652 652">
        <path fill="currentColor"
            d="M152.6 306.9s23.9-3.8 27.7-15h-36.7V283H63.1l9.9 11.7v12s25-1.3 34.7 6.1c13.3 12.5-14.9 29.3-14.9 29.3L88 358.4c7.6-7.3 22-16.7 48.4-16.3-10 3.2-20.2 8.2-28 16.3h53.4l-5-16.2c-.1 0-38.8-23.1-4.2-35.3z" />            <path fill="currentColor" d="M213.2 346.7c6.2 0 10.7-2 14.6-5.9l-4.3-5.6c-3.1 3.1-6.1 4.2-9.8 4.2-6.3 0-11.7-4.4-11.7-13 0-8 5.3-13.1 12.1-13.1 3.7 0 6.6 1.3 9.1 3.9l4.3-5.8c-3.5-3.5-8.1-5.3-13.7-5.3-11.4 0-19.9 8.3-19.9 20.3.1 12.7 8.4 20.3 19.3 20.3zm57.1-39.8h-7.9v20.5c0 8.6-4.6 12-9.9 12-5.5 0-8.8-3.4-8.8-10.5v-22h-7.9v22.9c0 11.3 5.7 16.9 13.8 16.9 5.6 0 9.9-2.3 12.7-7l.3 6h7.6v-38.8zm20 7.8-.2-7.8h-7.6v38.9h7.9V327c0-10.6 7.8-13 14.3-12.6v-8.1c-4.9 0-10.8 1.5-14.4 8.4zm35.2 32c8.3 0 15.2-4.5 15.2-12.2 0-14.9-22.1-8.9-22.1-17 0-2.7 2.4-4.7 7.3-4.7 4.3 0 7.7 1.6 10.3 4.2l4.2-5.4c-3.4-3.3-8.2-5.6-14.7-5.6-9.2 0-15.1 5.1-15.1 11.8 0 15 22.1 8.2 22.1 17.1 0 3.4-2.9 4.9-7.3 4.9-4.6 0-8.2-1.6-11.7-5.1l-4.6 5.3c3.9 3.9 8.6 6.7 16.4 6.7zm59-20.5c0-12.9-7.5-20.3-18.2-20.3-10.5 0-19.3 7.9-19.3 20.4 0 12.8 7.9 20.5 19.6 20.5 6.7 0 11.8-2 16-6.6l-4.3-5.2c-3.5 3.4-6.9 4.8-11.2 4.8-7 0-11.4-3.9-12.1-11.3h29.3c.2-.9.2-1.5.2-2.3zm-18.2-13.6c5.9 0 9.4 4 10.1 10.1h-21c.9-6.1 5.2-10.1 10.9-10.1zm37.2-5.7v-3.1c0-4.8 2.5-7.2 6.3-7.2 2.3 0 4.1.7 5.8 2.1l3.4-5.8c-2.7-1.9-5.9-3.1-9.8-3.1-8.6 0-13.6 5.4-13.6 14.4v2.8h-6l-1.8 6.9h7.8v32h7.9v-32h13V307h-13zm35.6 39.9c10.7 0 20-7.7 20-20.4 0-13-9.3-20.5-19.9-20.5-10.7 0-20.1 7.6-20.1 20.5 0 12.8 9.5 20.4 20 20.4zm0-7.1c-6.4 0-11.9-5-11.9-13.3 0-8.4 5.7-13.4 12-13.4 6.4 0 11.8 5 11.8 13.3.1 8.4-5.6 13.4-11.9 13.4zm37.3-25-.2-7.8h-7.6v38.9h7.9V327c0-10.6 7.8-13 14.3-12.6v-8.1c-5 0-10.8 1.5-14.4 8.4zm57.4-7.8h-7.6l-.1 6c-2.7-4.4-7.1-7.1-12.9-7.1-10.4 0-17.7 8.9-17.7 20 0 11 6.6 19.9 17.6 19.9 5.8 0 10.2-2.8 13-7.2v5c0 8.3-4.8 11.2-11.9 11.2-3.8 0-7.1-1-10-2.4l-2.4 6.8c3.6 1.8 7.7 2.8 12.6 2.8 11.6 0 19.6-5.7 19.6-18.8v-36.2zm-19.4 31.8c-6.3 0-10.9-5.1-10.9-12.9 0-7.8 5-12.7 11.5-12.7 6.3 0 11 4.6 11 12.7 0 8.2-5.1 12.9-11.6 12.9zm66.4-12.5c0-12.9-7.5-20.3-18.2-20.3-10.5 0-19.3 7.9-19.3 20.4 0 12.8 7.9 20.5 19.6 20.5 6.7 0 11.8-2 16-6.6l-4.3-5.2c-3.5 3.4-6.9 4.8-11.2 4.8-7 0-11.4-3.9-12.1-11.3h29.3c.1-.9.2-1.5.2-2.3zm-18.2-13.6c5.9 0 9.4 4 10.1 10.1h-21c.9-6.1 5.2-10.1 10.9-10.1z" />
    </svg>`;
    urlDownloaderElements();
    modInput.verisonArea.value = verison || '';
    modInput.loaderDropdown.value = loader || 'Forge';
    modInput.textArea.value = urls || '';
    addEventListener();
}

function addEventListener() {
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

    modInput.loadButton.addEventListener('click', () => {
        downloadList = [];
        modOutput.copyButton.disabled = true;
        if (modInput.textArea.value.trim() === '') {
            Util.setOutput('Output Error', 'No text in the URL text area.', COLOR.DANGER, false);
            modOutput.copyButton.disabled = false;
            return;
        }
        if (modInput.verisonArea.value.trim() === '') {
            Util.setOutput('Output Error', 'No text in the version area.', COLOR.DANGER, false);
            modOutput.copyButton.disabled = false;
            return;
        }
        let promises = [];
        errorMessages = []
        let urlCount = 0;

        parseInput(modInput.textArea.value).forEach(e => {
            urlCount++;
            let verison = modInput.verisonArea.value.toString();
            let loader = modInput.loaderDropdown.value;
            if (e.includes('https://www.curseforge.com/')) {
                e = e.replace('https://www.curseforge.com/', 'https://api.cfwidget.com/');
                promises.push(
                    fetch(e)
                        .then(response => {
                            if (!response.ok) {
                                const errorMessage = `<i class="bi bi-bug-fill"></i> (<a href="https://cfwidget.com/#documentation:responses" target="_blank" rel="noopener noreferrer" class='${TEXTCOLOR.DANGER} fw-bold'>${response.status}</a>): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}`;
                                errorMessages.push(errorMessage);
                                return null;
                            }
                            return response.json();
                        })
                        .then(text => {
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
                                    return '<td><img src="' + thumbnail + `" style="width: 50px; height: 50px;"></td>`+ '<td  width="90%"> <b>'+title+`</b><br> <a class="link-opacity-50-hover" href="${downloadLink}">` + downloadLink + '</a></td>';
                                } else {
                                    const errorMessage = `<i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.WARNING}'>Mod not found under ${loader}</b>): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}`;
                                    errorMessages.push(errorMessage);
                                    return null;
                                }
                            }
                            return null;
                        })
                        .catch(error => {
                            let errorMessage;
                            if (error.message == 'text.versions[verison] is undefined') {
                                errorMessage = `<i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.WARNING}'>Mod not found in verison ${verison}</b>): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}`;
                                console.error(`(Mod not found in verison ${verison}): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}`);
                            } else {
                                errorMessage = `<i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.DANGER}'>${error.message}</b>): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}`;
                                console.error(`(${error.message}): ${e.replace('https://api.cfwidget.com/', 'https://www.curseforge.com/')}`);
                            }
                            errorMessages.push(errorMessage);
                            return null;
                        })
                );
            } else if (e.includes('https://modrinth.com/mod/')) {
                e = e.replace('https://modrinth.com/mod/', 'https://api.modrinth.com/v2/project/');
                const nonVerison = e;
                e += '/version';
                promises.push(
                    fetch(e)
                        .then(response => {
                            if (!response.ok) {
                                const errorMessage = `<i class="bi bi-bug-fill"></i> (<a href="https://docs.modrinth.com/#tag/users/operation/getUserProjects" target="_blank" rel="noopener noreferrer" class='${TEXTCOLOR.DANGER} fw-bold'>${response.status}</a>): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/')}`;
                                errorMessages.push(errorMessage);
                                return null;
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
                                        if (response.ok){
                                            const rep = await response.json();
                                            thumbnail = rep['icon_url'];
                                            title = rep['title'];
                                        }
                                    });
                                    let downloadLink = text[count]['files'][0]['url'];
                                    downloadList.push(downloadLink);
                                    return  '<td><img src="' + thumbnail + `" style="width: 50px; height: 50px;"></td><td>` +`<b>${title}</b><br> <a class="link-opacity-50-hover" href="${downloadLink}">` + downloadLink + `</a></td>`;
                                } else {
                                    const errorMessage = `<i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.WARNING}'>Mod not found under ${loader}</b>): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}`;
                                    errorMessages.push(errorMessage);
                                    return null;
                                }
                            }
                            return null;
                        })
                        .catch(error => {
                            let errorMessage;
                            if (error.message == 'text.versions[verison] is undefined') {
                                errorMessage = `<i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.WARNING}'>Mod not found in verison ${verison}</b>): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}`;
                                console.error(`(Mod not found in verison ${verison}): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}`);
                            } else {
                                errorMessage = `<i class="bi bi-bug-fill"></i> (<b class='${TEXTCOLOR.DANGER}'>${error.message}</b>): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}`;
                                console.error(`(${error.message}): ${e.replace('https://api.modrinth.com/v2/project/', 'https://modrinth.com/mod/').replace('/version', '')}`);
                            }
                            errorMessages.push(errorMessage);
                            return null;
                        })
                );
            } else if (e.includes('https://cdn.modrinth.com/data/')){
                promises.push(e);
            }
        });
        Promise.all(promises)
        .then(results => {
            modInput.urlsText.innerHTML = `URLs <br> (${urlCount})`;
            let combinedResults = '<table class="table table-sm table-hover">';
            let nonErrorResults = results.filter(result => result !== null);
            if (localStorage.getItem('settingsRemoveDupesSwitch') === 'true') {
                nonErrorResults = nonErrorResults.filter((item, index) => nonErrorResults.indexOf(item) === index);
                //TODO: Remove Modrinth and CurseForge duplicates
                // downloadList.forEach(url => {
                //     console.log(url);
                //     console.log(Util.extractFileName(url));
                // });
            }

            if (settings.topErrorSwitch.checked) {
                combinedResults += errorMessages.map(message => `<tr><td></td><td>${message}</td>`).join('</tr>');
                combinedResults += nonErrorResults.map(result => `<tr>${result}>`).join('</tr>');
            } else {
                combinedResults += nonErrorResults.map(result => `<tr>${result}>`).join('</tr>');
                combinedResults += errorMessages.map(message => `<tr><td></td><td>${message}></td>`).join('</tr>');
            }
            combinedResults += '</table>';
            Util.setOutput(`Output (${nonErrorResults.length})`, combinedResults, COLOR.PRIMARY, true);
        })
        .catch(error => {
            console.error('Error:', error);
            Util.setOutput('Output Error', 'An error occurred during processing.', COLOR.DANGER, false);
        });
    
    modOutput.copyButton.disabled = false;    
    });

    modOutput.downloadButton.addEventListener('click', async () => {
        if (settings.zipDownloadSwitch.checked) {
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
                    return e ? 'https://modrinth.com/mod/'+e['project_id'] : null;
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
    if (modOutput.progressDiv.style.display == 'none'){
        modOutput.progressDiv.style.display = "";
    }
    const percent = (current / total) * 100;
    modOutput.progressBar.style.width = percent + '%';
    modOutput.progressBar.setAttribute('aria-valuenow', percent);
    modOutput.progressBar.innerText = current + ' out of ' + total;
}

function hideProgressBar(){
    modOutput.progressBar.style.width = '0%';
    modOutput.progressBar.setAttribute('aria-valuenow', 0);
    modOutput.progressDiv.style.display = "none";
}

async function zipDownload() {
    modOutput.downloadButton.disabled = true;

    var progressBarNum = 0

    // let r = modOutput.text.innerText;
    // r = r.split('\n');
    // r = r.filter(item => !item.includes('(404)') && !item.includes('(Mod not found under '));

    const zip = new JSZip();

    function downloadAndZip(link, index) {
        return new Promise((resolve, reject) => {
            fetch(link)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${link}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    if (link.includes('https://mediafiles.forgecdn.net/files/') == true) {
                        zip.file(link.slice(47).replaceAll('%20', ' ').replaceAll('%2B', '+'), blob);
                    } else {
                        zip.file(link.slice(57).replaceAll('%20', ' ').replaceAll('%2B', '+'), blob);
                    }
                    updateProgressBar(progressBarNum+1, downloadList.length); // Update progress bar
                    progressBarNum = progressBarNum + 1;
                    resolve();
                })
                .catch(error => reject(error));
        });
    }

    try {
        await Promise.all(downloadList.map((link, index) => downloadAndZip(link, index)));

        const blob = await zip.generateAsync({ type: 'blob' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'mmd ' + Util.getTimestamp() + '.zip';
        link.click();
    } catch (error) {
        console.error(error);
    } finally {
        hideProgressBar();
        modOutput.downloadButton.disabled = false;
    }
}

function parseInput(input) {
    return input.split(/\n|,/)
        .map(item => item.trim())
        .filter(item => item !== '');
}