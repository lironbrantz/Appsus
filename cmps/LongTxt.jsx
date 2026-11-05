
export function LongTxt({ txt = '', length = 100 }) {

    const isLongText = txt.length > length
    const textToShow = txt.substring(0, length)

    return (
        <span className="long-txt">
            {textToShow}
            {isLongText && '...'}
        </span>
    )
}