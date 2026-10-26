import { DynamicCmp } from "./DynamicCmp.jsx"

export function NotePreview({ note, onRemoveNote }) {
    return (
        <section className="note-preview">
            <DynamicCmp note={note} />
            <section>
                <button onClick={() => onRemoveNote(note.id)}>X</button>
            </section>
        </section>
    )
}