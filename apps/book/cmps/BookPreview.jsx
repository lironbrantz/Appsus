export function BookPreview({ book }) {
    return (
        <section className="book-preview">

            <img
                src={book.thumbnail}
                alt={book.title}
                onError={ev => {
                    ev.currentTarget.onerror = null
                    ev.currentTarget.src = 'assets/img/books/default-cover.png'
                }}
            />

            <h3>{book.title}</h3>
            <p>Author: {book.authors.join(', ')}</p>
            <p>Language: {book.language}</p>
            <p>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
        </section>
    )
}