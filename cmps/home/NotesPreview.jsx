export function NotesPreview({ notes }) {
    return (
        <ul className="home-note-list">
            {notes.map(note => (
                <li
                    key={note.id}
                    className="home-note"
                    style={{
                        backgroundColor:
                            (note.style && note.style.backgroundColor) || '#fff'
                    }}
                >
                    <h3>{note.info.title}</h3>

                    {note.type === 'NoteTxt' && (
                        <p className="home-note-text">
                            {note.info.txt}
                        </p>
                    )}

                    {note.type === 'NoteTodos' && (
                        <ul className="home-todo-list">
                            {(note.info.todos || []).map((todo, idx) => (
                                <li
                                    key={idx}
                                    className={todo.doneAt ? 'is-done' : ''}
                                >
                                    <span
                                        className="material-symbols-outlined"
                                        aria-hidden="true"
                                    >
                                        {todo.doneAt
                                            ? 'check_box'
                                            : 'check_box_outline_blank'}
                                    </span>

                                    <span>{todo.txt}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    )
}