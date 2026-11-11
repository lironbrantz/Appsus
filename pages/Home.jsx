import { noteService } from '../apps/note/services/note.service.js'
import { mailService } from '../apps/mail/services/mail.service.js'
import { bookService } from '../apps/book/services/book-service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { AppPanel } from '../cmps/home/AppPanel.jsx'
import { NotesPreview } from '../cmps/home/NotesPreview.jsx'
import { MailsPreview } from '../cmps/home/MailsPreview.jsx'
import { AboutProject } from '../cmps/home/AboutProject.jsx'

const { Link } = ReactRouterDOM
const { useEffect, useState } = React

export function Home() {
    const [notes, setNotes] = useState([])
    const [mails, setMails] = useState([])
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isActive = true

        Promise.all([
            noteService.query(),
            mailService.query({ status: 'inbox' }),
            bookService.query()
        ])
            .then(([notes, mails, books]) => {
                if (!isActive) return

                setNotes(notes)
                setMails(mails)
                setBooks(books)
            })
            .catch(() => showErrorMsg('Failed to load home data'))
            .finally(() => {
                if (isActive) setIsLoading(false)
            })

        return () => {
            isActive = false
        }
    }, [])

    const pinnedCount = notes.filter(note => note.isPinned).length
    const unreadCount = mails.filter(mail => !mail.isRead).length
    const saleCount = books.filter(book =>
        book.listPrice && book.listPrice.isOnSale
    ).length

    const previewNotes = notes
        .filter(note => note.type === 'NoteTxt' || note.type === 'NoteTodos')
        .sort((a, b) =>
            Number(b.isPinned) - Number(a.isPinned) ||
            a.createdAt - b.createdAt
        )
        .slice(0, 6)

    const previewMails = mails
        .filter(mail => !mail.isRead)
        .slice(0, 4)

    const previewBooks = books
        .filter(book => book.thumbnail)
        .slice(0, 5)

    return (
        <div className="home-page">
            <header className="home-topbar">
                <Link to="/" className="home-logo">Appsus</Link>
            </header>

            <main className="home-content">
                {isLoading ? (
                    <p className="home-loading">
                        Loading your workspace...
                    </p>
                ) : (
                    <React.Fragment>
                        <div className="home-summary">
                            <span className="home-summary-item home-summary-item--mail">
                                <span className="material-symbols-outlined">mail</span>
                                <strong>{unreadCount}</strong> unread
                            </span>

                            <span className="home-summary-item home-summary-item--keep">
                                <span className="material-symbols-outlined">lightbulb</span>
                                <strong>{pinnedCount}</strong> pinned notes
                            </span>

                            <span className="home-summary-item home-summary-item--books">
                                <span className="material-symbols-outlined">menu_book</span>
                                <strong>{saleCount}</strong> books on sale
                            </span>
                        </div>

                        <div className="home-apps">
                            <AppPanel
                                app="keep"
                                icon="lightbulb"
                                title="Keep"
                                meta={`${notes.length} notes · ${pinnedCount} pinned`}
                                to="/note"
                            >
                                <NotesPreview notes={previewNotes} />
                            </AppPanel>

                            <div className="home-side-apps">
                                <AppPanel
                                    app="mail"
                                    icon="mail"
                                    title="Mail"
                                    meta={`${unreadCount} unread in Inbox`}
                                    to="/mail"
                                >
                                    <MailsPreview mails={previewMails} />
                                </AppPanel>

                                <AppPanel
                                    app="books"
                                    icon="menu_book"
                                    title="Books"
                                    meta={`${books.length} books · ${saleCount} on sale`}
                                    to="/book"
                                >
                                    <ul className="home-book-list">
                                        {previewBooks.map(book => (
                                            <li className="home-book" key={book.id}>
                                                <img
                                                    src={book.thumbnail}
                                                    alt={`Cover of ${book.title}`}
                                                    loading="lazy"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </AppPanel>
                            </div>
                        </div>
                    </React.Fragment>
                )}

                <AboutProject />
            </main>
        </div>
    )
}