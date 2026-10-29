import { noteService } from "../services/note.service.js"
import { DynamicCmp } from "./DynamicCmp.jsx"
import { NoteEdit } from "./NoteEdit.jsx"

const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {

    const [isEditing, setIsEditing] = useState(false)

    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

    function onTogglePin() {
        const updatedNote = {
            ...note,
            isPinned: !note.isPinned
        }
        noteService.save(updatedNote)
            .then(savedNote => {
                onUpdateNote(savedNote)
            })
    }

    function onChangeBgColor(color) {
        const updatedNote = {
            ...note,
            style: {
                ...note.style,
                backgroundColor: color
            }
        }
        noteService.save(updatedNote)
            .then(savedNote => {
                onUpdateNote(savedNote)
                setIsColorPickerOpen(false)
            })
    }



    const sectionStyle = { backgroundColor: note.style ? note.style.backgroundColor : '#fff' }

    return (
        <section className="note-preview" style={sectionStyle}>
            {isEditing
                ? <NoteEdit note={note}
                    onUpdateNote={onUpdateNote} onClose={() => setIsEditing(false)} />
                : <DynamicCmp note={note} />
            }
            <section>
                <button onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>🎨</button>
                {isColorPickerOpen && (
                    <div className="color-options">
                        <button onClick={() => onChangeBgColor('#ffffff')}>white</button>
                        <button onClick={() => onChangeBgColor('#fff475')}>yellow</button>
                        <button onClick={() => onChangeBgColor('#3300ff')}>blue</button>
                        <button onClick={() => onChangeBgColor('#ff0000')}>red</button>
                    </div>
                )}
                <button onClick={() => onRemoveNote(note.id)}>X</button>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => onTogglePin()}> {note.isPinned ? 'Unpin' : 'Pin'} </button>
            </section>
        </section>
    )
}