import { modInput, COLOR, TEXTCOLOR, modOutput, settings } from './elements.js';
import * as Util from './util.js';

export function addEventListener() {
    modInput.loadButton.addEventListener('click', () => {
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
        let errorMessages = [];

        parseInput(modInput.textArea.value).forEach(e => {
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
                                    return 'https://mediafiles.forgecdn.net/files/' + id.substring(0, 4) + '/' + parseInt(id.substring(4)) + '/' + name;
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
                                    return text[count]['files'][0]['url'];
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
            let combinedResults = '<table class="table table-sm table-hover">';
            
            let nonErrorResults = results.filter(result => result !== null);
            if (settings.topErrorSwitch.checked) {
                combinedResults += errorMessages.map(message => `<tr><td>${message}</td></tr>`).join('');
                combinedResults += nonErrorResults.map(result => `<tr><td>${result}</td></tr>`).join('');
            } else {
                combinedResults += nonErrorResults.map(result => `<tr><td>${result}</td></tr>`).join('');
                combinedResults += errorMessages.map(message => `<tr><td>${message}</td></tr>`).join('');
            }
    
            if (localStorage.getItem('settingsRemoveDupesSwitch') === 'true') {
                const allResults = [...errorMessages, ...nonErrorResults];
                const uniqueResults = Array.from(new Set(allResults.join('<br>').split('<br>')));
                combinedResults = uniqueResults.map(result => `<tr><td>${result}</td></tr>`).join('');
            }
                combinedResults += '</table>';
            Util.setOutput('Output', combinedResults, COLOR.PRIMARY, true);
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
    let r = modOutput.text.innerText;
    r = r.split('\n');
    r = r.filter(item => !item.includes('(404)') && !item.includes('(Mod not found under '));
    r.forEach(function (e) {
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

    let r = modOutput.text.innerText;
    r = r.split('\n');
    r = r.filter(item => !item.includes('(404)') && !item.includes('(Mod not found under '));

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
                    updateProgressBar(progressBarNum+1, r.length); // Update progress bar
                    progressBarNum = progressBarNum + 1;
                    resolve();
                })
                .catch(error => reject(error));
        });
    }

    try {
        await Promise.all(r.map((link, index) => downloadAndZip(link, index)));

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