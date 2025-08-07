import { searchInptuElem, store } from "./app.js";
import { closeSearchModalHandler, scrollIntoViewHandler } from "./design.js";

const searchResContainerElem = document.querySelector('#search-res-container');


export function searchNotesHandler(e) {
    
    const state = store.getState();
    const notes = state.notes;
    const input = searchInptuElem.value.trim();

    const searchRes = input === ''
    ? []
    : [...notes].filter( n => {
        return n.noteTitle.toLowerCase().includes(searchInptuElem.value.toLowerCase());
    });
    
     

    if ( searchRes.length ) {

    searchResContainerElem.innerHTML = '';
    searchResContainerElem.classList.remove('hidden');
    
    searchRes.forEach (r => {
        searchResContainerElem.innerHTML += ` <li id="${r.id}" class="search-res-item" > ${r.noteTitle} </li>`
    });
    
    } else {
    searchResContainerElem.classList.add ('hidden');
    
    }

}


export function showSearchResHandler(event) {

    if ( event.target.closest('li.search-res-item') ) {

        const mainNote = document.querySelector(`#note-${event.target.closest('li.search-res-item').id}`);

        closeSearchModalHandler();

        setTimeout( () => {
            mainNote.scrollIntoView({behavior: "smooth", block: "center"});
            
            setTimeout( () => {
                mainNote.classList.add('search-animation');
            mainNote.addEventListener('animationend', () => {
                mainNote.classList.remove('search-animation')
            })
            } , 100)

        } ,200)

    }

}