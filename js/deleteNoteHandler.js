import { store } from "./app.js";
import { deleteNoteModalElem } from "./design.js";

let state;
let mainNoteIndex;

export function delteNoteHandler(event) {

    if ( event.target.closest('button.delte-note-btn')) { 

        state = store.getState();

        
        const mainNoteID = event.target.closest('div.note-container').id.split('-')[1];
                        
        const mainNoteIndex = state.notes.findIndex ( n => {
            return n.id == mainNoteID
        } );

    
       if (confirm(`Do you want to delete this note?`)) {
            state.notes.splice(mainNoteIndex, 1);
            store.setState(state);            
       }

        
    }

}

