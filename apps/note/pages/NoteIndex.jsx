import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { noteService } from "../services/note.service.js"

const { useEffect, useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
            .then(notes => {
                setNotes(notes)
            })
    }, [])
    if (!notes) return 'Loading..'

    function onSetNote(savedNote) {
        setNotes(prevNotes => [...prevNotes, savedNote])
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
            <NoteAdd onSetNote={onSetNote}  />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}
