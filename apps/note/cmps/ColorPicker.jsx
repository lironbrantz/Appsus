export function ColorPicker({ onSetBgColor }) {
    return (
        <section className="color-picker">
            <button type="button" onClick={() => onSetBgColor('#ffffff')} aria-label="white">white</button>
            <button type="button" title="Yellow" onClick={() => onSetBgColor('#fff475')} aria-label="yellow">yellow</button>
            <button type="button" title="Purple" onClick={() => onSetBgColor('#d7aefb')} aria-label="purple">purple</button>
            <button type="button" title="Blue" onClick={() => onSetBgColor('#aecbfa')} aria-label="blue">blue</button>
            <button type="button" title="Pink" onClick={() => onSetBgColor('#fdcfe8')} aria-label="pink">pink</button>
            <button type="button" title="Brown" onClick={() => onSetBgColor('#e6c9a8')} aria-label="brown">brown</button>
        </section>
    )
}