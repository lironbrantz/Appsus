import { DynamicCmp } from "./DynamicCmp.jsx"
import { NoteEdit } from "./NoteEdit.jsx"
import { ColorPicker } from "./ColorPicker.jsx"
import { showErrorMsg } from "../../../services/event-bus.service.js"

const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote, onAddNote }) {
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
            .catch(() => {
                showErrorMsg('Failed to update todo')
            })
    }

    function onSetBgColor(color) {
        const updatedNote = {
            ...note,
            style: {
                ...note.style,
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

    function onDuplicateNote(note) {
        const duplicatedNote = {
            ...note,
            id: null
        }

        onAddNote(duplicatedNote)
            .catch((err) => {
                console.error(err)
                showErrorMsg('Failed to duplicate note')
            })
    }

    const bgStyle = {
        backgroundColor: note.style && note.style.backgroundColor
            ? note.style.backgroundColor
            : '#fff'
    }

    return (
        <section style={bgStyle} className="note-preview">

            <button
                type="button"
                className={`material-symbols-outlined note-pin-btn ${note.isPinned ? 'pinned' : ''}`}
                onClick={onTogglePin}
                title={note.isPinned ? 'Unpin note' : 'Pin note'}
                aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
            >
                push_pin
            </button>

            {isEditing ? (
                <NoteEdit
                    note={note}
                    onUpdateNote={onUpdateNote}
                    onClose={() => setIsEditing(false)}
                />
            ) : (
                <DynamicCmp
                    note={note}
                    onToggleTodo={onToggleTodo}
                />
            )}

            <section className="note-preview-toolbar">
                <button
                    type="button"
                    className="material-symbols-outlined note-action-btn"
                    onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                    title="Change color"
                    aria-label="Change color"
                >
                    palette
                </button>

                {isColorPickerOpen && (
                    <ColorPicker onSetBgColor={onSetBgColor} />
                )}

                <button
                    type="button"
                    className="material-symbols-outlined note-action-btn"
                    onClick={() => setIsEditing(true)}
                    title="Edit note"
                    aria-label="Edit note"
                >
                    edit
                </button>
                <button
                    type="button"
                    className="material-symbols-outlined duplicate-note-btn"
                    onClick={() => onDuplicateNote(note)}
                    title="Duplicate note"
                >
                    content_copy
                </button>

                <button
                    type="button"
                    className="material-symbols-outlined note-action-btn delete-note-btn"
                    onClick={() => onRemoveNote(note.id)}
                    title="Delete note"
                    aria-label="Delete note"
                >
                    delete
                </button>
            </section>
        </section>
    )
}