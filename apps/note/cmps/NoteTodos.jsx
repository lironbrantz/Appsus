export function NoteTodos({ info }) {
    return (
        <section className="note-todos">
            <h4>{info.title}</h4>
            <ul>
                {info.todos.map((todo, idx) =>
                    <li key={idx}>
                        <h4>{todo.txt}</h4>
                    </li>
                )}
            </ul>
        </section>
    )
}