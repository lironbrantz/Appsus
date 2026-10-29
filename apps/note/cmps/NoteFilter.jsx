const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange(ev) {
        const { value, name } = ev.target
        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, [name]: value }))
    }


    return (
        <section className="note-filter">
            <h2>Filter Notes</h2>
            <form>
                <input type="text" 
                id="search" 
                name="search" 
                placeholder="Search" 
                value={filterByToEdit.search} 
                onChange={onHandleChange} />
            </form>

        </section >
    )
}