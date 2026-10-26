import { NoteList } from "../cmps/NoteList.jsx"
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

    return (
        <section className="notes-app">
            <h1>Note Index</h1>
            <NoteList notes={notes} />
        </section>
    )
}
