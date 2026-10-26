import { NotePreview } from "./NotePreview.jsx"
export function NoteList({ notes }) {
    return (
        <section>
            <h2>Note List:</h2>
            <ul className="note-list">
                {notes.map(note =>
                    <li key={note.id}>
                        <NotePreview note={note}/>
                    </li>
                )}
            </ul>
        </section>
    )
}