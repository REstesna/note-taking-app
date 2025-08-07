import { addNewNoteModalElem, isEditing, store } from "./app.js";
import { mainNoteColor, noteTitleInputElem, tickIMGElem } from "./design.js";
import { noteDescriptionElem } from "./save&renderNote.js";

let mainNoteID;
let mainNote;

export function editNoteHandler(event) {

    
    if ( event.target.closest('button.edit-note-btn')) {


        isEditing.flag = true;


        mainNoteID = event.target.closest('div.note-container').id.split('-')[1];

        const state = store.getState();
        mainNote = state.notes.filter ( n => {
            return n.id == mainNoteID
        } )[0];
        

        addNewNoteModalElem.classList.add('flex');
        addNewNoteModalElem.querySelector('h2').innerHTML = 'Edit Note';
        
        noteTitleInputElem.value = mainNote.noteTitle;
        noteDescriptionElem.value = mainNote.noteDes;
        noteTitleInputElem.focus();

        document.querySelectorAll('.note-color-span')
            .forEach(s => {
                if ( s.dataset.noteColor === mainNote.noteColor ) {
                    s.innerHTML = tickIMGElem;
                } else {
                    s.innerHTML = '';
                } 
            })
    }
    

}


export function editNoteInStateHandler() {

    const state = store.getState();
    const mainNoteIndexInState = state.notes.findIndex( n=> {
        return n == mainNote;
    } )    

    state.notes[mainNoteIndexInState].noteTitle = noteTitleInputElem.value;
    state.notes[mainNoteIndexInState].noteDes = noteDescriptionElem.value;
    state.notes[mainNoteIndexInState].noteColor = mainNoteColor;
    
    store.setState(state);

    isEditing.flag = false;
    
}