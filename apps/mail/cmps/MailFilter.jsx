
const { useState } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [isReadFilterOpen, setIsReadFilterOpen] = useState(false)


    function onHandleChange(ev) {
        let { name, value } = ev.target
        if (name === 'isRead') {
            value = value === 'all' ? null : value === 'true'
        }
        const updatedFilter = { ...filterByToEdit, [name]: value }
        setFilterByToEdit(updatedFilter)
        if (name === 'isRead') {
            onSetFilterBy(updatedFilter)
        }
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)

    }
   
    return (

        <form className="app-search mail-filter" role="search" onSubmit={onSubmitFilter}>
            <span className="material-symbols-outlined" aria-hidden="true">search</span>
            <input
                name="txt"
                type="text"
                id="search"
                value={filterByToEdit.txt}
                placeholder="Search mail"
                aria-label="Search mail"
                onChange={onHandleChange}
            />
            <button
                type="button"
                className="mail-filter-toggle"
                onClick={() => setIsReadFilterOpen(prev => !prev)}
                aria-label="Show search options"
                aria-expanded={isReadFilterOpen}
            >
                <span className="material-symbols-outlined" aria-hidden="true">tune</span>
            </button>

            {isReadFilterOpen && (
                <div className="read-filter-options">
                    <select name="isRead"
                        aria-label="Read status"
                        value={filterByToEdit.isRead === null ? 'all' : String(filterByToEdit.isRead)}
                        onChange={onHandleChange}
                    >
                        <option value="all">All</option>
                        <option value="true">Read</option>
                        <option value="false">Unread</option>
                    </select>
                </div>
            )}
        </form>
    )
}