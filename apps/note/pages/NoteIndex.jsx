import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { AppTopbar } from "../../../cmps/AppTopbar.jsx"

const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

const NOTE_TYPES = [
    { type: 'NoteTxt', label: 'Text', icon: 'notes' },
    { type: 'NoteImg', label: 'Images', icon: 'image' },
    { type: 'NoteVideo', label: 'Videos', icon: 'smart_display' },
    { type: 'NoteTodos', label: 'Lists', icon: 'check_box' }
]

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

    function onSetType(type) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, type }))
    }

    function getSidebarItemClass(type) {
        return `app-sidebar-item ${filterBy.type === type ? 'is-active' : ''}`
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
        <section className={`notes-app app--keep ${isSidebarOpen ? 'sidebar-expanded' : ''}`}>
            <AppTopbar
                app="keep"
                title="Keep"
                icon="lightbulb"
                onToggleMenu={() => setIsSidebarOpen(prev => !prev)}
                isMenuOpen={isSidebarOpen}
            >
                <NoteFilter
                    filterBy={filterBy}
                    onSetFilterBy={onsetFilterBy}
                />
            </AppTopbar>

            <nav
                className="app-sidebar notes-sidebar"
                aria-label="Note types"
                onMouseEnter={() => setIsSidebarOpen(true)}
                onMouseLeave={() => setIsSidebarOpen(false)}
            >
                <button
                    type="button"
                    className={getSidebarItemClass('')}
                    onClick={() => setFilterBy({ search: '', type: '' })}
                    aria-pressed={filterBy.type === ''}
                >
                    <span className="material-symbols-outlined" aria-hidden="true">lightbulb</span>
                    <span className="app-sidebar-label">Notes</span>
                </button>

                <p className="app-sidebar-heading">Type</p>

                {NOTE_TYPES.map(({ type, label, icon }) => (
                    <button
                        key={type}
                        type="button"
                        className={getSidebarItemClass(type)}
                        onClick={() => onSetType(type)}
                        aria-pressed={filterBy.type === type}
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
                        <span className="app-sidebar-label">{label}</span>
                    </button>
                ))}
            </nav>

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
