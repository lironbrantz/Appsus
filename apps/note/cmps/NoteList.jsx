import { NotePreview } from "./NotePreview.jsx"
export function NoteList({ notes, onRemoveNote, onUpdateNote }) {
    return (
        <section>
            <h2>Note List:</h2>
            <ul className="note-list">
                {notes.map(note =>
                    <li key={note.id}>
                        <NotePreview note={note} onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote}/>
                    </li>
                )}
            </ul>
        </section>
    )
}