import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { showErrorMsg } from "/services/event-bus.service.js"

const { useEffect, useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    const [filterBy, setFilterBy] = useState({ search: '', type: '' })

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
        <section className="notes-app">
            <h1>Note Index</h1>
            <NoteFilter filterBy={filterBy} onSetFilterBy={onsetFilterBy} />
            <NoteAdd onAddNote={onAddNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote} />
        </section>
    )
}
