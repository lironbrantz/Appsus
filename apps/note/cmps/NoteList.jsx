import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onUpdateNote, onAddNote }) {
    const sortedNotes = [...notes].sort((a, b) =>
        Number(b.isPinned) - Number(a.isPinned)
    )

    return (
        <section>
            <ul className="note-list">
                {sortedNotes.map(note =>
                    <li key={note.id}>
                        <NotePreview note={note} onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote} onAddNote={onAddNote} />
                    </li>
                )}
            </ul>
        </section>
    )
}