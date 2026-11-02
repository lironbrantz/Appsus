
import { DynamicCmp } from "./DynamicCmp.jsx"
import { NoteEdit } from "./NoteEdit.jsx"
import { ColorPicker } from "./ColorPicker.jsx"
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { NoteTodos } from "./NoteTodos.jsx"

const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {

    const [isEditing, setIsEditing] = useState(false)
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

    function onTogglePin() {
        const updatedNote = {
            ...note,
            isPinned: !note.isPinned
        }

        onUpdateNote(updatedNote)
            .catch(() => {
                showErrorMsg('Failed to update pin')
            })
    }
    function onToggleTodo(todoIdx) {
        const updatedNote = {
            ...note,
            info: {
                ...note.info,
                todos: note.info.todos.map((todo, idx) =>
                    idx === todoIdx
                        ? { ...todo, doneAt: todo.doneAt ? null : Date.now() }
                        : todo
                )
            }
        }

        onUpdateNote(updatedNote)
    }

    function onSetBgColor(color) {
        const updatedNote = {
            ...note,
            style: {
                backgroundColor: color
            }
        }

        onUpdateNote(updatedNote)
            .then(() => {
                setIsColorPickerOpen(false)
            })
            .catch(() => {
                showErrorMsg('Failed to update note color')
            })
    }

    const bgStyle = { backgroundColor: note.style ? note.style.backgroundColor : '#fff' }
    return (
        <section style={bgStyle} className="note-preview">
            {isEditing
                ? <NoteEdit note={note}
                    onUpdateNote={onUpdateNote} onClose={() => setIsEditing(false)} />
                : <DynamicCmp note={note} onUpdateNote={onUpdateNote} onToggleTodo={onToggleTodo} />
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