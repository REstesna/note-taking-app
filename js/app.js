import { delteNoteHandler } from "./deleteNoteHandler.js";
import { changeThemeHandler, closeDelteNoteModalHandler, closeModalHandler, closeSearchModalHandler, mobileFilterParentElem, noteColorSpanElems, noteTitleInputElem, openSearchModalHandler, scrollIntoViewHandler, setCustomColorForNoteHandler, showFilteringItems, showFilterOptionsHandler, showMobileFilterOptionsHandler, stickNavbarHandler } from "./design.js";
import { editNoteHandler } from "./editNote.js";
import { filterNotesHandler } from "./filterNotes.js";
import { pinNoteHandler } from "./pinNote.js";
import { dataValidationHandler, renderNoteHandler, sortNotesHandler } from "./save&renderNote.js";
import { searchNotesHandler, showSearchResHandler } from "./searchNote.js";
import { closeHambergermenuHnadler, countTypedCharacterHandler, getLocalStorage, limitTitleSpanHandler, openHambergermenuHnadler, resetFilterHandler, setLocalStorage } from "./shortFuncs.js";
import { starNoteHandler } from "./starNote.js";

const $ = document;
// select elements 
const changeThemeBtnElems = $.querySelectorAll('.change-theme_btn');

const addNewNoteBtnElems = $.querySelectorAll('.add_new_note');
export const addNewNoteModalElem = $.querySelector('#add_new_note_modal'); 
const innerAddNewNoteModalContainer = $.querySelector('#add_new_note_inner_container');
const closeNewNoteElemHandler = $.querySelectorAll('.close_new_note_btn');

const hambergermenuOpenBtnElem = $.querySelector('#hambergermenu_open-btn');
const hambergermenuCloseBtnElem = $.querySelector('#hambergermenu_close-btn');

const navbarFilterBtnElem = $.querySelector('#navbar_filter-btn');

const openSearchModalBtnElems = $.querySelectorAll('.open-search-modal-btn');
const closeSearchModalBtnElem = $.querySelector('#close-search-modal-btn');
export const searchInptuElem = $.querySelector('#search_input');
const innerSearchNoteModalContainer = $.querySelector('#search_note_inner_container');

const limitTitleSpanElem = $.querySelector('#limit-title-span');

const saveNoteBtnElem = $.querySelector('#save-note-btn');

const closeDelteNoteModalbtn = $.querySelector('#close-delte-note-btn');

export const filterOptionElems = $.querySelectorAll('.filter-option');

export let isEditing = {
  flag: false,
};

export let filterBy = {filter: "all"}

const locState = getLocalStorage("state");
export let store;
const defaultState = {
    isDark: false,
    notes: [],
}


const createStore = (initialState) => {

  let state = initialState;
  const listeners = [];

  const getState = () => state;

  const setState = (newState) => {
    state = { ...state, ...newState };
    listeners.forEach((l) => l(state));
    setLocalStorage( "state", state);
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {

      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);

    };
  };

  return { getState, setState, subscribe };
};

// load state from local storage if that is exist...
locState ? store = createStore(locState) : store = createStore(defaultState);

// add changeThemeHandler function to store and call it once...
store.subscribe( () => {
    changeThemeHandler(store.getState());
});
changeThemeHandler(store.getState());


// render notes function

sortNotesHandler(store.getState());
store.subscribe(sortNotesHandler);

// show filtering 
store.subscribe(resetFilterHandler)
showFilteringItems();

// add event listeners 


changeThemeBtnElems.forEach( b => {

    b.addEventListener('click', () => {
        const state = store.getState();
        store.setState( {
            ...state,
            isDark: !state.isDark
        })
    });

});

//

addNewNoteBtnElems.forEach( b => {

  b.addEventListener('click', () => {
    addNewNoteModalElem.classList.add('flex');
    addNewNoteModalElem.querySelector('h2').innerHTML = 'New Note';
    noteTitleInputElem.focus();

  });

});

//

closeNewNoteElemHandler.forEach(b => {

  b.addEventListener('click', () => {
      closeModalHandler(addNewNoteModalElem);
      
  });

});

//

hambergermenuOpenBtnElem.addEventListener('click', openHambergermenuHnadler);
hambergermenuCloseBtnElem.addEventListener('click', closeHambergermenuHnadler);

//
window.addEventListener('scroll', stickNavbarHandler);
window.addEventListener("load", () => {
  $.querySelector('#loader').classList.add('hidden');
})

//

navbarFilterBtnElem.addEventListener('click', showFilterOptionsHandler);
mobileFilterParentElem.addEventListener('click', () => {
  showMobileFilterOptionsHandler(mobileFilterParentElem);
});
//

openSearchModalBtnElems.forEach(b => {
  b.addEventListener('click', openSearchModalHandler)
})

closeSearchModalBtnElem.addEventListener('click', closeSearchModalHandler);

// 

scrollIntoViewHandler(noteTitleInputElem, innerAddNewNoteModalContainer);
scrollIntoViewHandler(searchInptuElem, innerSearchNoteModalContainer);
//

noteColorSpanElems.forEach(s => {
  s.addEventListener('click', setCustomColorForNoteHandler);
});
//

noteTitleInputElem.addEventListener('keydown', event => {
  limitTitleSpanHandler(event, noteTitleInputElem, 30);
})
noteTitleInputElem.addEventListener('input', event => {
  countTypedCharacterHandler(event, limitTitleSpanElem, 30);
  $.querySelector('#title-input-container').classList.remove('border-red-500');
  
})


//

saveNoteBtnElem.addEventListener('click', dataValidationHandler);
///

document.addEventListener('click', e => {

  editNoteHandler(e);
  starNoteHandler(e);
  pinNoteHandler(e);
  delteNoteHandler(e);
  showSearchResHandler(e);

});

//

filterOptionElems.forEach(f => {
  f.addEventListener('click', filterNotesHandler)
});

//

searchInptuElem.addEventListener('input', searchNotesHandler);

//





