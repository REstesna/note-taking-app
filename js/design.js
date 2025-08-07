import { filterBy, filterOptionElems, isEditing } from "./app.js";

const $ = document;

const sunMoonIconsContainer = document.querySelector('#sun-moon_icons-container');
const sunMoonIconsContainerMobile = document.querySelector('#sun-moon_icons-container_mobile');

const mainHeaderAppElem = document.querySelector('#main-header-app');


const navbarFilterSubMenuElem = $.querySelector('#navbar-filter-sub_menu');

const navbarFilterElem = $.querySelector("#navbar_filter-btn");

const searchModalElem = $.querySelector('#search_modal');

export const deleteNoteModalElem = $.querySelector('#delete-note-modal');

export const tickIMGElem = '<img class="w-5 h-5" src="icon/tick.svg" alt="">';

export const mobileFilterParentElem = $.querySelector('#mobile-filter-parent');

export const noteColorSpanElems = $.querySelectorAll('.note-color-span');


export const noteTitleInputElem = document.querySelector('#new-note-title-input');

// default color 
export let mainNoteColor = '--main-color';

export function changeThemeHandler (state) {

    if (state.isDark) {
        document.body.classList.add('dark_theme');
        sunMoonIconsContainer.classList.add('-translate-x-10');
        sunMoonIconsContainerMobile.classList.remove('translate-y-[19px]');
        sunMoonIconsContainerMobile.classList.add('translate-y-[-21px]');
    } else {
        document.body.classList.remove('dark_theme');
        sunMoonIconsContainer.classList.remove('-translate-x-10');
        sunMoonIconsContainerMobile.classList.remove('translate-y-[-21px]');
        sunMoonIconsContainerMobile.classList.add('translate-y-[19px]');
    }
}


export function closeModalHandler ( modal ) {
    modal.classList.remove('flex');

    modal.querySelectorAll('input').forEach(inp => {
        inp.value = '';
    });

    modal.querySelector('textarea') ? modal.querySelector('textarea').value = '' : '';
    $.querySelector('#limit-title-span').innerHTML = 30;

    mainNoteColor = '--main-color';
    noteColorSpanElems.forEach( s => {
        
        if ( s.dataset.noteColor === mainNoteColor ) {
            s.innerHTML = tickIMGElem;
        } else {
            s.innerHTML = '';
        }
            
    });

    isEditing.flag = false;
    
}

export function stickNavbarHandler () {
    
    if (window.scrollY > 38) {
        mainHeaderAppElem.classList.add('sticky_navbar');
    } else {
    mainHeaderAppElem.classList.remove('sticky_navbar');

    }
    
}


export function showFilterOptionsHandler() {
    navbarFilterSubMenuElem.classList.toggle('scale-y-0');

}

document.addEventListener('click', e => {
    if ( !navbarFilterElem.contains(e.target) ) navbarFilterSubMenuElem.classList.add('scale-y-0');
});

export function showMobileFilterOptionsHandler(elem) {
    
    elem.classList.toggle('max-h-[174px]')
    
}

export function openSearchModalHandler() {  
    searchModalElem.classList.add('flex');
    searchModalElem.querySelector('input').focus();
    
}
export function closeSearchModalHandler() {
    searchModalElem.classList.remove('flex');
    searchModalElem.querySelector('input').value = '';
    searchModalElem.querySelector('#search-res-container').innerHTML = '';
    searchModalElem.querySelector('#search-res-container').classList.add('hidden');

}


export function scrollIntoViewHandler ( input, modal ) {

    input.addEventListener('focus', () => {
        setTimeout(() => {
        modal.scrollIntoView({behavior: "smooth"});
        }, 200);
    });
    
}


export function setCustomColorForNoteHandler(e){

    const mainSpan = e.target.closest('span.note-color-span');
    mainNoteColor = mainSpan.dataset.noteColor;

    // tick selected color
    noteColorSpanElems.forEach(b => b.innerHTML = '');
    mainSpan.innerHTML = tickIMGElem;
};

export function closeDelteNoteModalHandler() {
    deleteNoteModalElem.classList.remove('flex');
}

export function showFilteringItems () {

    filterOptionElems.forEach( f => {

        if ( f.dataset.filter === filterBy.filter && !f.innerHTML.includes(tickIMGElem)) {
            f.innerHTML += tickIMGElem;
        } else if ( f.dataset.filter !== filterBy.filter )  {
            f.querySelector('img')?.remove();
        }

    })
}