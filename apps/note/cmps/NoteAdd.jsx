import { noteService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"

const { useState } = React

export function NoteAdd({ onAddNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())

    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)


    function onSubmitForm(ev) {
        ev.preventDefault()

        onAddNote(note)
            .then(() => {
                setNote(noteService.getEmptyNote())
                setIsColorPickerOpen(false)
            })
    }


    function onSetBgColor(color) {
        setNote(prevNote => ({
            ...prevNote,
            style: {
                backgroundColor: color
            }

        }))
        setIsColorPickerOpen(false)
    }


    function onHandleChange({ target }) {
        const { name, value } = target

        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [name]: value
            }
        }))
    }
    const bgStyle = { backgroundColor: note.style.backgroundColor }
    return (
        <section className="add-note">
            <form className="note-add-form" style={bgStyle} onSubmit={onSubmitForm}>
                <input type="text" name="title" placeholder="Title" value={note.info.title} onChange={onHandleChange} />
                <textarea name="txt" onChange={onHandleChange} placeholder="Take a note..." value={note.info.txt} id="txt" />
                <div className="note-add-toolbar">
                    <button type="button" onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>🎨</button>
                    {isColorPickerOpen && <ColorPicker onSetBgColor={onSetBgColor} />}
                    <button type="submit">save</button>
                </div>
            </form>
        </section>
    )
}