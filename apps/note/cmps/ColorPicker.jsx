export function ColorPicker({ onSetBgColor }) {
    const colors = ['#ffffff', '#fff475', '#d7aefb', '#aecbfa', '#fdcfe8', '#e6c9a8']

    return (

        <section className="color-picker">
            {colors.map(color => (
                <button
                    key={color}
                    type="button"
                    title={color}
                    onClick={() => onSetBgColor(color)}
                    aria-label={color}
                    style={{ backgroundColor: color }}
                />
            ))}
        </section>
    )
}