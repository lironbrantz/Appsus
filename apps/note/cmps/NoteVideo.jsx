export function NoteVideo({ info }) {
    return (
        <section className="note-video">
            <video src={info.url} controls />
        </section>
    )
}