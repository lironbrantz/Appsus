export function NoteTodos({ info, onToggleTodo }) {
    return (
        <section className="note-todos">
            <h4>{info.title}</h4>
            <ul>
                {info.todos.map((todo, idx) => (
                    <li key={idx}>
                        <label className="todo-item">
                            <input
                                type="checkbox"
                                checked={!!todo.doneAt}
                                onChange={() => onToggleTodo(idx)}
                            />
                            <span className="material-symbols-outlined todo-checkbox">
                                {todo.doneAt ? 'check_box' : 'check_box_outline_blank'}
                            </span>
                            <span className={todo.doneAt ? 'todo-text completed' : 'todo-text'}>
                                {todo.txt}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    )
}