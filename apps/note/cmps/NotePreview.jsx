import { noteService } from "../services/note.service.js"
import { DynamicCmp } from "./DynamicCmp.jsx"
import { NoteEdit } from "./NoteEdit.jsx"

const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {

    const [isEditing, setIsEditing] = useState(false)

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

    return (
        <section className="note-preview">
            {isEditing
                ? <NoteEdit note={note}
                    onUpdateNote={onUpdateNote} onClose={() => setIsEditing(false)} />
                : <DynamicCmp note={note} />
            }
            <section>
                <button onClick={() => onRemoveNote(note.id)}>X</button>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => onTogglePin()}> {note.isPinned ? 'Unpin' : 'Pin'} </button>
            </section>
        </section>
    )
}