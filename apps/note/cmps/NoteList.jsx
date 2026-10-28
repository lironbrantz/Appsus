import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onUpdateNote }) {
    const sortedNotes = [...notes].sort((a, b) =>
        Number(b.isPinned) - Number(a.isPinned)
    )

    return (
        <section>
            <h2>Note List:</h2>
            <ul className="note-list">
                {sortedNotes.map(note =>
                    <li key={note.id}>
                        <NotePreview note={note} onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote} />
                    </li>
                )}
            </ul>
        </section>
    )
}