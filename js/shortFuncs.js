// functions with line less than 12

import { filterBy } from "./app.js";
import { mobileFilterParentElem, showFilteringItems } from "./design.js";

export const setLocalStorage = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export const getLocalStorage =  (key) => JSON.parse(localStorage.getItem(key));

export const openHambergermenuHnadler = () => {
    document.querySelector('#hambergermenu').classList.remove('hide__mobile-menu');
    document.body.classList.add('overflow-hidden');   
}
export const closeHambergermenuHnadler = () => {
    document.querySelector('#hambergermenu').classList.add('hide__mobile-menu');
    document.body.classList.remove('overflow-hidden');   
    mobileFilterParentElem.classList.remove('max-h-[174px]');
}


export function limitTitleSpanHandler (event, input, limitChar) {
    
    if ( input.value.length >= limitChar && !["Backspace", "Enter", "Control", "Alt", "Shift", "Tab"].includes(event.key)) { event.preventDefault() }
}

export function countTypedCharacterHandler (event, showSpan, limitChar) {

    if ( (limitChar - event.target.value.length) < 10) {
        showSpan.innerHTML = `0${limitChar - event.target.value.length}`;
    } else {
        showSpan.innerHTML = limitChar - event.target.value.length;
    }
}


export function resetFilterHandler() {
    filterBy.filter = 'all';
    showFilteringItems();
}