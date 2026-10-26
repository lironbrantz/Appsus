import { noteService } from "../services/note.service.js";

const { useState, useEffect } = React

export function NoteAdd({ onSetNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote)

    function onSubmitNote(ev) {
        ev.preventDefault()
        onSaveNote(note)
    }

    function onSaveNote(note) {
        noteService.save(note)
            .then(savedNote => {
                onSetNote(savedNote)
                setNote(noteService.getEmptyNote())
            })
    }
    function handleChange({ target }) {

        const { value } = target

        setNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, txt: value } }))
    }
    return (
        <section className="note-add">
            <h2>Add Notes</h2>
            <form onSubmit={onSubmitNote}>
                <label htmlFor="txt">Note:</label>
                <input value={note.info.txt} onChange={handleChange} type="text" id='txt' name="txt" />
                <button type="submit">Add Note</button>
            </form>
        </section>
    )
}