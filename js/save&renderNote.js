import { store, addNewNoteModalElem, isEditing } from "./app.js";
import { closeModalHandler, mainNoteColor, noteTitleInputElem } from "./design.js";
import { editNoteInStateHandler } from "./editNote.js";

export const noteDescriptionElem = document.querySelector('#new-note-description-textarea');

const noteContainerElem = document.querySelector('#notes-container');

const emptyNoteDescriptionElem = `<span class="text-[var(--main-black-color)] underline font-jost-medium text-center block leading-[75.2px]">Your note description is empty...</span>`

export function dataValidationHandler() {

    if (noteTitleInputElem.value.trim()) {

      if (isEditing.flag) {
        editNoteInStateHandler();
      }  else {

      let date = new Date();
        
      const newNoteObj = {

        id: Math.floor(date.getSeconds() * (Math.random() * 8)),
        noteTitle: noteTitleInputElem.value.trim(),
        noteDes: noteDescriptionElem.value.trim(),
        date: {
            fullDate: date,
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
        },
        noteColor: mainNoteColor,
        isPin:false,
        starred: false,
       }

       const state = store.getState();
        store.setState ( state.notes.unshift(newNoteObj) );   
      }
        
      closeModalHandler(addNewNoteModalElem);
        
        
    } else {
        document.querySelector('#title-input-container').classList.add('border-red-500');
        new Noty ({
            text: 'Note Title Can\'t Be Empty',
            theme: 'mint',
            type: 'error',
            layout: 'topCenter',
            timeout: 3000,
            progressBar: true,

        }).show()
        
    }
}

export function sortNotesHandler(state) {

  const notes = state.notes;
  const sortNotes = [...notes].sort( (a, b) => {

    if (a.isPin === b.isPin) {
      return 0;
    } else {
      return a.isPin ? -1 : 1;
    }
  } );

  renderNoteHandler(sortNotes)

}

export function renderNoteHandler (notes) {

  let docFrag = document.createDocumentFragment();


  notes.forEach( n => {
    
    const noteTemplate = `<div id="note-${n.id}" class="note-container relative overflow-hidden">
        
        <div class="note-title flex justify-between items-center">
          <h3 class="">${n.noteTitle}</h3>

          <!-- note actions -->
          <div class="flex items-center gap-1">

            <button class="star-btn cursor-pointer">
              <img class="w-5 h-5 " src="icon/${n.starred ? "fillStar" : "emptyStar"}.svg" alt="">
            </button>
            
            <button class=" edit-note-btn cursor-pointer">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

            </button>


            <button class="pin-note-btn cursor-pointer">
              <img class="w-6 h-6 text-red-500" src="icon/${ n.isPin ? "pinned" : "nopin" }.svg" alt="">
            </button>
            
            <button class="cursor-pointer delte-note-btn">
              <img class="w-4 h-4 text-red-500" src="icon/trash.svg" alt="">
            </button>
        
          </div>
        </div>

        <p class="note-description">${n.noteDes ? n.noteDes : emptyNoteDescriptionElem}</p>

        <div class="flex justify-end mt-2">
          <p class="text-sm font-jost-light text-[var(--main-black-color)]/50">${n.date.day}/${n.date.month}/${n.date.year}</p>
        </div>

        <!-- custom color for note -->
        <div class="bg-[var(${n.noteColor})] absolute w-full h-2 bottom-0 left-0"></div>
      </div>`
    

    docFrag.append(noteTemplate);  
  } );

  

  if (docFrag.textContent) {
    noteContainerElem.innerHTML = docFrag.textContent;
  } else {
    noteContainerElem.innerHTML = `<div class="text-[var(--main-black-color)] text-center col-start-1 col-span-2 text-2xl py-5">Empty...</div>`
  }


}
