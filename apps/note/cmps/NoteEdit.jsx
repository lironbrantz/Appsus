
import { showErrorMsg } from "/services/event-bus.service.js"

const { useState } = React

export function NoteEdit({ note, onUpdateNote, onClose }) {

    const [noteToEdit, setNoteToEdit] = useState(note)

    function onSubmitForm(ev) {
        ev.preventDefault()

        onUpdateNote(noteToEdit)
            .then(() => {
                onClose()
            })
            .catch(() => {
                showErrorMsg('Failed to update note')
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
                <label htmlFor="txt">Edit</label>
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
