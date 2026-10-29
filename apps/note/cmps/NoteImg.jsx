export function NoteImg({ info }) {
    return (
        <section className="note-img">
            {info.title && <h4>{info.title}</h4>}
            {info.txt && <p>{info.txt}</p>}
            {info.url && <img src={info.url} alt="Note image" />}
        </section>
    )
}