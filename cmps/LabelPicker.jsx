
export function LabelPicker({ options = [], selectedLabels = [], onChange }) {

    function onToggleLabel(label) {
        const updatedLabels = selectedLabels.includes(label)
            ? selectedLabels.filter(currLabel => currLabel !== label)
            : [...selectedLabels, label]

        onChange(updatedLabels)
    }

    return (
        <section className="label-picker">
            <h4>Labels</h4>

            <ul className="clean-list">
                {options.map(label => (
                    <li key={label}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedLabels.includes(label)}
                                onChange={() => onToggleLabel(label)}
                            />
                            <span>{label}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    )
}
