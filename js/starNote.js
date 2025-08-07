import { store } from "./app.js";



export function starNoteHandler(event) {

    
    
    if ( event.target.closest('button.star-btn')) {

        const mainNoteID = event.target.closest('div.note-container').id.split('-')[1];
        
        const state = store.getState();
        const mainNoteIndex = state.notes.findIndex ( n => {
            return n.id == mainNoteID
        } );

        state.notes[mainNoteIndex].starred = !state.notes[mainNoteIndex].starred;
        store.setState(state);        
        
    }

}
