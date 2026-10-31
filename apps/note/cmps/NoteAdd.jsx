import { noteService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"
import { showErrorMsg } from "../../../services/event-bus.service.js"

const { useState } = React

export function NoteAdd({ onAddNote }) {

    const [note, setNote] = useState(noteService.getEmptyNote())
    const [isVideoInputOpen, setIsVideoInputOpen] = useState(false)
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)


    function onSubmitForm(ev) {
        ev.preventDefault()

        onAddNote(note)
            .then(() => {
                setNote(noteService.getEmptyNote())
                setIsColorPickerOpen(false)
            })
            setIsVideoInputOpen(false)
            .catch(err => {
                showErrorMsg('Failed to add note', err)
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
        let { name, value, files } = target
        if (name === 'url') {
            setNote(prevNote => ({
                ...prevNote,
                type: 'NoteVideo',
                info: {
                    ...prevNote.info,
                    url: value
                }
            }))
            return
        }

        if (name === 'image') {
            const imageFile = files[0]
            if (!imageFile) return

            const reader = new FileReader()

            reader.onload = () => {
                setNote(prevNote => ({
                    ...prevNote,
                    type: 'NoteImg',
                    info: {
                        ...prevNote.info,
                        url: reader.result
                    }
                }))
            }

            reader.readAsDataURL(imageFile)
            return
        }

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
                {note.info.url && <img src={note.info.url} alt="Note image" />}

                <div className="note-add-toolbar">

                    <button type="button" onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>🎨</button>
                    {isColorPickerOpen && <ColorPicker onSetBgColor={onSetBgColor} />}

                    <label htmlFor="note-image">🖼️</label>
                    <input name="image" type="file" onChange={onHandleChange} id="note-image" accept="image/*" hidden />

                    <button type="button" onClick={() => setIsVideoInputOpen(!isVideoInputOpen)}>📹</button>
                    {isVideoInputOpen && (
                        <input
                        name="url"
                        type="url"
                        onChange={onHandleChange}
                        id="note-video"
                        placeholder="Paste video URL"
                    />
                    )}
                    <label htmlFor="note-todos">📝</label>
                    <input name="todos" type="text" onChange={onHandleChange} id="note-todos" placeholder="Enter todos separated by commas" hidden />

                    <button type="submit">save</button>
                </div>
            </form>
        </section>
    )
}