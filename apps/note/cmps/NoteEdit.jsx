
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { NoteVideo } from './NoteVideo.jsx'

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
        let { value, name: field } = target

        setNoteToEdit(prevNoteToEdit => ({
            ...prevNoteToEdit, info: { ...prevNoteToEdit.info, [field]: value }
        }))
    }

    return (
        <section className="edit-note">
            <form className="note-edit-form" onSubmit={onSubmitForm}>
                {noteToEdit.type === 'NoteImg' && noteToEdit.info.url && <img src={noteToEdit.info.url} alt="Note image" />}
                {noteToEdit.type === 'NoteVideo' && noteToEdit.info.url &&  <NoteVideo info={noteToEdit.info} />}
                <input name="title" type="text" id="title" value={noteToEdit.info.title} placeholder="Title" onChange={onHandleChange} />
                <input name="txt" type="text" id="txt" value={noteToEdit.info.txt} placeholder="Take a note..." onChange={onHandleChange} />
                <button type="submit">Save</button>
            </form>
        </section>
    )
}
