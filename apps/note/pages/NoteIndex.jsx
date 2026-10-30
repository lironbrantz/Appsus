import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"

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
    }


    if (!notes) return 'Loading..'

    function onAddNote(note) {
        noteService.save(note)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
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
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
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
