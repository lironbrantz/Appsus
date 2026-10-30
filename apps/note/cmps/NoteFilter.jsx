export function NoteFilter({ filterBy, onSetFilterBy }) {


    function onHandleChange(ev) {
        const { value, name } = ev.target
        onSetFilterBy({ ...filterBy, [name]: value })
    }


    return (
        <section className="note-filter">
            <h2>Filter Notes</h2>
            <form>
                <input type="text"
                    id="search"
                    name="search"
                    placeholder="Search"
                    value={filterBy.search}
                    onChange={onHandleChange} />
            </form>

        </section >
    )
}