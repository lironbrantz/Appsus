
import { noteService } from "../services/note.service.js"

const { useState } = React

export function NoteEdit({ note, onUpdateNote, onClose  }) {

    const [noteToEdit, setNoteToEdit] = useState(note)

    function onSubmitForm(ev) {
        ev.preventDefault()

        noteService.save(noteToEdit)
            .then(savedNote => {
                onUpdateNote(savedNote)
                onClose()
            })
    }

    function onHandleChange({ target }) {
        const { value } = target

        setNoteToEdit(prevNoteToEdit => ({
            ...prevNoteToEdit,
            info: { ...prevNoteToEdit.info, txt: value }
        }))
    }

    return (
        <section className="edit-note">
            <form className="note-edit-form" onSubmit={onSubmitForm}>
                <label htmlFor="txt">Note Edit</label>
                <input
                    type="text"
                    id="txt"
                    value={noteToEdit.info.txt}
                    onChange={onHandleChange}
                />
                <button type="submit">Save</button>
            </form>
        </section>
    )
}
