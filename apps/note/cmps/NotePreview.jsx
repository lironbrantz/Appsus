import { noteService } from "../services/note.service.js"
import { DynamicCmp } from "./DynamicCmp.jsx"
import { NoteEdit } from "./NoteEdit.jsx"
import { ColorPicker } from "./ColorPicker.jsx"
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

    function onSetBgColor(color) {
        const updatedNote = {
            ...note,
            style: {
                backgroundColor: color
            }
        }

        noteService.save(updatedNote)
            .then(savedNote => {
                onUpdateNote(savedNote)
            })
        setIsColorPickerOpen(false)
    }

    const bgStyle = { backgroundColor: note.style.backgroundColor }
    return (
        <section style={bgStyle} className="note-preview">
            {isEditing
                ? <NoteEdit note={note}
                    onUpdateNote={onUpdateNote} onClose={() => setIsEditing(false)} />
                : <DynamicCmp note={note} />
            }
            <section>
                <button onClick={() => onRemoveNote(note.id)}>X</button>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button type="button" onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>🎨</button>
                {isColorPickerOpen && <ColorPicker onSetBgColor={onSetBgColor} />}
                <button onClick={() => onTogglePin()}> {note.isPinned ? 'Unpin' : 'Pin'} </button>
            </section>
        </section>
    )
}