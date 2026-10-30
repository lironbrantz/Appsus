export function NoteTxt({ info }) {
    return (
        <section className="note-text">
           <h3>{info.title}</h3>
           <h4>{info.txt}</h4>
        </section>
    )
}