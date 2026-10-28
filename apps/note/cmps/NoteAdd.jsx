import { noteService } from "../services/note.service.js"
const { useState } = React

export function NoteAdd({ onSetNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())

    function onSubmitForm(ev) {
        ev.preventDefault()
         noteService.save(note)
         .then(savedNote => {
              onSetNote(savedNote)
              setNote(noteService.getEmptyNote())
         })

    }

    function onHandleChange({target}) {
         const { value } = target
         setNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, txt: value } }))
    }

    return (
        <section className="add-note">
            <form className="note-add-form" onSubmit={onSubmitForm}>
                <label htmlFor="txt">Note</label>
                <input onChange={onHandleChange} value={note.info.txt} type="text" id="txt" />
                <button>save</button>
            </form>
        </section>
    )
}