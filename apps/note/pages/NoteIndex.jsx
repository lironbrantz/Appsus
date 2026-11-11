import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { showErrorMsg } from "../../../services/event-bus.service.js"

const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [filterBy, setFilterBy] = useState({ search: '', type: '' })

    const [searchParams, setSearchParams] = useSearchParams()

    const title = searchParams.get('title')
    const txt = searchParams.get('txt')

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
            .catch(() => {
                showErrorMsg('Failed to load notes')
            })
    }

    if (!notes) return 'Loading..'

    function onAddNote(note) {
        return noteService.save(note)
            .then(() => {
                loadNotes()
                setSearchParams()
            })
    }

    function onsetFilterBy(filterByToEdit) {
        setFilterBy(filterByToEdit)
    }

    function onUpdateNote(note) {
        return noteService.save(note)
            .then(savedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === savedNote.id ? savedNote : note
                    )
                )
            })
    }

    function onRemoveNote(noteId) {
        return noteService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
            })
            .catch(() => {
                showErrorMsg('Failed to remove note')
            })
    }


    return (
        <section className={`notes-app ${isSidebarOpen ? 'sidebar-expanded' : ''}`}>
            <header className="notes-header">
                <div className="notes-brand">
                    <button
                        type="button"
                        className="notes-menu-btn"
                        onClick={() => setIsSidebarOpen(prev => !prev)}
                        aria-label="Toggle sidebar"
                        aria-expanded={isSidebarOpen}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <span className="material-symbols-outlined keep-logo">lightbulb</span>
                    <span>Keep</span>
                </div>

                <NoteFilter
                    filterBy={filterBy}
                    onSetFilterBy={onsetFilterBy}
                />
            </header>


            <aside
                className="notes-sidebar"
                onMouseEnter={() => setIsSidebarOpen(true)}
                onMouseLeave={() => setIsSidebarOpen(false)}
            >
                <button
                    type="button"
                    className="notes-sidebar-active"
                    onClick={() => setFilterBy({ search: '', type: '' })}
                >
                    <span className="material-symbols-outlined">lightbulb</span>
                    <span className="sidebar-label">Notes</span>
                </button>

                <button type="button" disabled>
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="sidebar-label">Reminders</span>
                </button>

                <button type="button" disabled>
                    <span className="material-symbols-outlined">archive</span>
                    <span className="sidebar-label">Archive</span>
                </button>

                <button type="button" disabled>
                    <span className="material-symbols-outlined">delete</span>
                    <span className="sidebar-label">Trash</span>
                </button>
            </aside>


            <NoteAdd onAddNote={onAddNote} txt={txt} title={title} />

            <div className="notes-results">
                <NoteList
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    onUpdateNote={onUpdateNote}
                    onAddNote={onAddNote}
                />
            </div>
        </section>
    )

}
