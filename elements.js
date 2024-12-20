export const root = document.getElementById('root');
export const body = document.getElementById('body');
export const style = document.getElementById('style');
export const APP = window.location.hostname == '';
export const VERSION = '24.11.22';

export const menuButtons = {
    search: document.getElementById('searchButton'),
    urlDownloader: document.getElementById('urlDownloaderButton')
}

export let modOutput, modInput, search;

export function searchElements(){
    search = {
        versionInput: document.getElementById('searchVersionInput'),
        limitInput: document.getElementById('searchLimitInput'),
        loaderDropdown: document.getElementById('searchLoaderDropdown'),
        modrinthButton: document.getElementById('searchModrinthButton'),
        curseForgeButton: document.getElementById('searchCurseForgeButton'),
        textArea: document.getElementById('searchTextArea'),
        searchButton: document.getElementById('searchSearchButton'),
        output: document.getElementById('searchOutput'),
        sendOutput: document.getElementById('searchSendOutput'),
        selectAllOutput: document.getElementById('searchSelectAllOutput'),
        outputTitle: document.getElementById('searchOutputTitle'),
        progressDiv: document.getElementById('searchProgressDiv'),
        progressBar: document.getElementById('searchProgressBar'),
        outputText: document.getElementById('searchOutputText')
    };
    
}

export function urlDownloaderElements(){
    modOutput = {
        div: document.getElementById('modOutput'),
        title: document.getElementById('modOutputTitle'),
        text: document.getElementById('modOutputText'),
        copyButton: document.getElementById('modOutputCopy'),
        downloadButton: document.getElementById('modOutputDownload'),
        progressBar: document.getElementById('modOutputProgressBar'),
        progressDiv: document.getElementById('modOutputProgressDiv')
    }
    
    modInput = {
        urlsText: document.getElementById('urlsText'),
        textArea: document.getElementById('modInputTextArea'),
        loadButton: document.getElementById('modInputLoadButton'),
        verisonArea: document.getElementById('modInputVerisonArea'),
        loaderDropdown: document.getElementById('modInputLoaderDropdown'),
        AddDependsButton: document.getElementById('modInputAddDependsButton')
    }
}

export const modal = {
    modal: new bootstrap.Modal(document.getElementById('menu-modal'), {backdrop: 'static'}),
    modalTitle: document.getElementById('menu-modal-title'),
    modalBody: document.getElementById('menu-modal-body'),
    modalFooter: document.getElementById('menu-modal-footer'),
    modalCloseButton: document.getElementById('modal-close-button')
}

export const settings = {
    modal: new bootstrap.Modal(document.getElementById('settingModal'), {backdrop: 'static'}),
    downloadSwitch: document.getElementById('copyDownloadSwitch'),
    errorSwitch: document.getElementById('copyErrorSwitch'),
    topErrorSwitch: document.getElementById('topErrorSwitch'),
    zipDownloadSwitch: document.getElementById('zipDownloadSwitch'),
    removeDupesSwitch: document.getElementById('removeDupesSwitch'),
    updateLink: document.getElementById('settingsUpdateLink')
}

export const TEXTBACKGROUNDCOLOR = {
    NONE: '-',
    SUCCESS: 'text-bg-success',
    PRIMARY: 'text-bg-primary',
    DARK: 'text-bg-dark',
    DANGER: 'text-bg-danger',
    WARNING: 'text-bg-warning'
}

export const TEXTCOLOR = {
    NONE: '-',
    SUCCESS: 'text-success',
    PRIMARY: 'text-primary',
    DARK: 'text-dark',
    DANGER: 'text-danger',
    WARNING: 'text-warning'
}

export const COLOR = {
    NONE: '-',
    SUCCESS: 'success',
    PRIMARY: 'primary',
    DARK: 'dark',
    DANGER: 'danger',
    WARNING: 'warning'
}