import { noteService } from "../services/note.service.js"
import { ColorPicker } from "./ColorPicker.jsx"
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { NoteVideo } from './NoteVideo.jsx'

const { useState } = React
const { Link } = ReactRouterDOM
export function NoteAdd({ onAddNote, title, txt }) {
    const emptyNote = noteService.getEmptyNote()
    emptyNote.info.title = title || ''
    emptyNote.info.txt = txt || ''

    const [note, setNote] = useState(emptyNote)
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

    const bgStyle = { backgroundColor: note.style.backgroundColor }

    const isImg = note.type === 'NoteImg'
    const isVideo = note.type === 'NoteVideo'
    const isTodos = note.type === 'NoteTodos'

    function onSubmitForm(ev) {
        ev.preventDefault()

        let noteToSave = note

        if (isTodos) {
            const todos = note.info.txt.split(',')
                .map(txt => ({ txt: txt.trim(), doneAt: null }))
                .filter(todo => todo.txt)

            noteToSave = {
                ...note,
                info: {
                    ...note.info,
                    txt: '',
                    todos
                }
            }
        }

        onAddNote(noteToSave)
            .then(() => {
                setNote(noteService.getEmptyNote())
                setIsColorPickerOpen(false)
            })
            .catch(err => {
                showErrorMsg('Failed to add note')
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

    function onSetNoteType(type) {
        setNote(prevNote => ({
            ...prevNote,
            type
        }))
    }
    function onRemoveMedia() {

        setNote(prevNote => ({
            ...prevNote,
            type: 'NoteTxt',
            info: {
                ...prevNote.info,
                url: ''
            }
        }))
    }

    function onHandleChange({ target }) {
        const { name, value, files } = target

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

    return (
        <section className="add-note">
            <form
                className="note-add-form"
                style={bgStyle}
                onSubmit={onSubmitForm}
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={note.info.title}
                    onChange={onHandleChange}
                />

                {isVideo && (
                    <input
                        type="text"
                        name="url"
                        placeholder="Add video url"
                        value={note.info.url || ''}
                        onChange={onHandleChange}
                    />
                )}

                {isImg && note.info.url && (
                    <div className="note-add-preview">
                        <img src={note.info.url} alt="Note image" />

                        <button
                            type="button"
                            className="material-symbols-outlined remove-image-btn"
                            onClick={onRemoveMedia}
                            title="Remove image"
                            aria-label="Remove image"
                        >
                            delete
                        </button>
                    </div>
                )}

                {isVideo && note.info.url && URL.canParse(note.info.url) && (
                    <div className="note-add-preview">
                        <NoteVideo info={note.info} />

                        <button
                            type="button"
                            className="material-symbols-outlined remove-image-btn"
                            onClick={onRemoveMedia}
                            title="Remove video"
                            aria-label="Remove video"
                        >
                            delete
                        </button>
                    </div>
                )}

                <textarea
                    name="txt"
                    value={note.info.txt}
                    onChange={onHandleChange}
                    placeholder={
                        isTodos
                            ? "Enter tasks separated by commas..."
                            : "Take a note..."
                    }
                />

                <div className="note-add-toolbar">
                    <button
                        type="button"
                        className="material-symbols-outlined"
                        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                    >
                        palette
                    </button>

                    {isColorPickerOpen && (
                        <ColorPicker onSetBgColor={onSetBgColor} />
                    )}

                    <label
                        htmlFor="note-image"
                        className="material-symbols-outlined"
                    >
                        image
                    </label>

                    <input
                        name="image"
                        type="file"
                        id="note-image"
                        accept="image/*"
                        onChange={onHandleChange}
                        hidden
                    />

                    <button
                        type="button"
                        className="material-symbols-outlined"
                        style={{ fontFamily: 'Material Symbols Outlined' }}
                        onClick={() => onSetNoteType('NoteVideo')}
                    >
                        videocam
                    </button>
                    <button
                        type="button"
                        className="material-symbols-outlined"
                        onClick={() => onSetNoteType('NoteTodos')}
                    >
                        check_box
                    </button>

                    <button type="submit">Save</button>
                </div>
            </form>
        </section>
    )
}