import { filterBy, store } from "./app.js";
import { showFilteringItems } from "./design.js";
import { renderNoteHandler } from "./save&renderNote.js";
import { closeHambergermenuHnadler } from "./shortFuncs.js";

export function filterNotesHandler(e) {

    const filterTarget = e.target.dataset.filter;
    const state = store.getState();

    if ( filterTarget === 'starred' ) {

        filterBy.filter = 'starred'


        const filteredNotes = [...state.notes].filter( n => {
            return n.starred === true;
        } );

        renderNoteHandler(filteredNotes);

    } else if ( filterTarget === 'pinned' ) {

        filterBy.filter = 'pinned'


        const filteredNotes = [...state.notes].filter( n => {
            return n.isPin === true;
        } );

        renderNoteHandler(filteredNotes);
    } else {
        filterBy.filter = 'all'
        store.setState(state);
    }
    
    showFilteringItems();
    closeHambergermenuHnadler();
}





