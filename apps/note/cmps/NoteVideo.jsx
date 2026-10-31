export function NoteVideo({ info }) {
    const url = new URL(info.url)
    const videoId = url.searchParams.get('v')
    const embedUrl = `https://www.youtube.com/embed/${videoId}`
    return (
        <section className="note-video">
           {info.title && <h3>{info.title}</h3>}
            {info.txt && <p>{info.txt}</p>}
            <iframe src={embedUrl} />
        </section>
    )
}