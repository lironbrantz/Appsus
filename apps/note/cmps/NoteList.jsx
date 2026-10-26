export function NoteList({ notes }) {
    return (
        <section>
            <h2>Note List:</h2>
            <ul className="note-list">
                {notes.map(note =>
                    <li key={note.id}>
                        <h4>{note.type}</h4>
                        <h4>{note.info.txt}</h4>
                    </li>
                )}
            </ul>
        </section>
    )
}