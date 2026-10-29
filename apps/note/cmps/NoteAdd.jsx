import { noteService } from "../services/note.service.js"
const { useState } = React

export function NoteAdd({ onSetNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [isExpanded, setIsExpanded] = useState(false)

    function onSubmitForm(ev) {
        ev.preventDefault()
        noteService.save(note)
            .then(savedNote => {
                onSetNote(savedNote)
                setNote(noteService.getEmptyNote())
                setIsExpanded(false)
            })

    }

    function onHandleChange({ target }) {
        const { value } = target
        setNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, txt: value } }))
    }
    function onImageSelect(ev) {
        const file = ev.target.files[0]
        if (!file) return

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

        reader.readAsDataURL(file)
    }

    return (
        <section className="add-note">
            <form className={`note-add-form ${isExpanded ? 'expanded' : ''}`}
                onSubmit={onSubmitForm}
            >
                <label htmlFor="note-image">📷</label>

                <input
                    onChange={onImageSelect}
                    type="file"
                    id="note-image"
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                <textarea
                    onFocus={() => setIsExpanded(true)}
                    placeholder="Take a note..."
                    onChange={onHandleChange}
                    value={note.info.txt}
                    id="txt" />
                {note.info.url && (
                    <img src={note.info.url} alt="Note preview" />
                )}
                {isExpanded && (
                    <button>save</button>
                )}
            </form>
        </section>
    )
}