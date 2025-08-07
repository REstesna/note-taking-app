import { store } from "./app.js";



export function pinNoteHandler(event) {

    
    
    if ( event.target.closest('button.pin-note-btn')) {

        const mainNoteID = event.target.closest('div.note-container').id.split('-')[1];
                
        const state = store.getState();
        const mainNoteIndex = state.notes.findIndex ( n => {
            return n.id == mainNoteID
        } );
        
        state.notes[mainNoteIndex].isPin = !state.notes[mainNoteIndex].isPin;

        store.setState(state);

        
    }
 
} 