import { DynamicCmp } from "./DynamicCmp.jsx"

export function NotePreview({ note }) {
    return (
        <section className='note-preview'>
            <DynamicCmp note={note} />
        </section>
    )
}
