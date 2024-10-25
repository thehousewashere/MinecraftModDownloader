import * as Util from './util.js';
import { body, style } from './elements.js'

let darkToggleHTML = '';
let themeButtonDropText = ''; 
const themes = ['Cerulean', 'Cosmo', 'Cyborg', 'Darkly', 'Flatly', 'Journal', 'Litera', 'Lumen', 'Lux', 'Materia', 'Minty', 'Morph', 'Pulse', 'Quartz', 'Sandstone', 'Simplex', 'Sketchy', 'Slate', 'Solar', 'Spacelab', 'Superhero', 'United', 'Vapor', 'Yeti', 'Zephyr']

export function loadTheme(){
    if (localStorage.getItem('theme')){
        //TODO: Fix this later 😴😴👀👀
        style.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/${localStorage.getItem('theme')}/bootstrap.min.css`;
        themeButtonDropText = `Select Theme (${localStorage.getItem('theme')})`;
    } else {
        themeButtonDropText = 'Select Theme (Default)';
    }
    if (localStorage.getItem('darkMode') === 'true'){
        body.setAttribute('data-bs-theme', 'dark');
        darkToggleHTML = '<button id="darkToggle" type="button" class="btn btn-light"><i class="bi bi-moon-stars-fill"></i></button>';
    } else {
        body.setAttribute('data-bs-theme', 'light');
        darkToggleHTML = '<button id="darkToggle" type="button" class="btn btn-dark"><i class="bi bi-moon-stars"></i></button>';
    }
}

export function themeModal(){
    let r = `
    <div class="input-group">
        ${darkToggleHTML}
        <div class="dropdown">
            <button id="themeButtonDrop" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${themeButtonDropText}
            </button>
            <ul class="dropdown-menu">
                <li><a id="default" class="dropdown-item">Default</a></li>
    `;

    themes.forEach((e) => {
        r += `<li><a id="${e}" class="dropdown-item">${e}</a></li>`;
    });

    r += `
            </ul>
        </div>
    </div>`
    Util.setModal('Themes', r, `<t class="font-monospace"><i class="bi bi-exclamation-circle"></i> Some themes will have visual glitches.</t>`);
    addListeners();
}

function addListeners(){
    let darkToggle = document.getElementById('darkToggle');
    darkToggle.addEventListener('click', () =>{
        if (darkToggle.innerHTML == '<i class="bi bi-moon-stars"></i>'){
            darkToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
            darkToggle.setAttribute('class', 'btn btn-light');
            body.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('darkMode', true);
        } else {
            darkToggle.innerHTML = '<i class="bi bi-moon-stars"></i>';
            darkToggle.setAttribute('class', 'btn btn-dark');
            body.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('darkMode', false);
        }
    });
    document.getElementById('default').addEventListener('click', () => {
        style.href = `lib/css/bootstrap.min.css`;
        document.getElementById('themeButtonDrop').innerText = `Select Theme (Default)`;
        localStorage.setItem('theme', '');
    });
    themes.forEach((e) => {
        document.getElementById(e).addEventListener('click', () => {
            style.href = `lib/css/${e.toLowerCase()}.css`;
            document.getElementById('themeButtonDrop').innerText = `Select Theme (${e})`;
            localStorage.setItem('theme', e.toLowerCase());
        });
        document.getElementById(e).addEventListener('mouseover', () => {
            document.getElementById(e).innerHTML = `${e} <img class="img-thumbnail" src='img/${e.toLowerCase()}.png'></img>`
        });
        document.getElementById(e).addEventListener('mouseout', () => {
            // setTimeout(function(){
            //     document.getElementById(e).innerHTML = `${e}`;
            // }, 100);
            document.getElementById(e).innerHTML = `${e}`;
        });
    });
    
}