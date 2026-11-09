
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

        <section className="mail-filter">
            <form onSubmit={onSubmitFilter}>
                <div className="search-container">
                    <label htmlFor="search">Search mail</label>
                    <input
                        name="txt"
                        type="text"
                        id="search"
                        value={filterByToEdit.txt}
                        placeholder="Search mail"
                        onChange={onHandleChange}
                    />
                    <button
                        type="button"
                        onClick={() => setIsReadFilterOpen(prev => !prev)}
                    >
                         <span className="material-symbols-outlined">tune</span>
                    </button>
                </div>

                {isReadFilterOpen && (
                    <div className="read-filter-options">
                        <select name="isRead"
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
        </section>
    )
}