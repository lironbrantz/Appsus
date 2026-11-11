export function NoteFilter({ filterBy, onSetFilterBy }) {

    function onHandleChange(ev) {
        const { value, name } = ev.target
        onSetFilterBy({ ...filterBy, [name]: value })
    }

    return (
        <form className="app-search" role="search" onSubmit={ev => ev.preventDefault()}>
            <span className="material-symbols-outlined" aria-hidden="true">search</span>
            <input
                type="search"
                id="search"
                name="search"
                placeholder="Search notes"
                aria-label="Search notes"
                value={filterBy.search}
                onChange={onHandleChange}
            />
        </form>
    )
}
