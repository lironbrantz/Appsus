
import { MailPreview } from './MailPreview.jsx'

const { Link } = ReactRouterDOM

export function MailList({
    mails,
    onRemoveMail,
    onRestoreMail,
    setSelectedDraft,
    onToggleStar,
    onToggleRead
}) {
    return (
        <section>
            <ul className="mail-list">
                {mails.map(mail => (
                    <li key={mail.id}>
                        <button
                            type="button"
                            className="mail-star-btn"
                            onClick={() => onToggleStar(mail.id)}
                            title={mail.isStarred ? 'Unstar' : 'Star'}
                            aria-label={mail.isStarred ? 'Remove star' : 'Star mail'}
                            aria-pressed={!!mail.isStarred}
                        >
                            <span className="material-symbols-outlined">
                                {mail.isStarred ? 'star' : 'star_border'}
                            </span>
                        </button>

                        <Link
                            to={`/mail/${mail.id}`}
                            onClick={ev => {
                                if (mail.sentAt === null && !mail.removedAt) {
                                    ev.preventDefault()
                                    setSelectedDraft(mail)
                                }
                            }}
                        >
                            <MailPreview mail={mail} />
                        </Link>

                        <button
                            type="button"
                            className="mail-read-btn"
                            onClick={() => onToggleRead(mail.id)}
                            title={mail.isRead ? 'Mark as unread' : 'Mark as read'}
                            aria-label={mail.isRead ? 'Mark as unread' : 'Mark as read'}
                        >
                            <span className="material-symbols-outlined">
                                {mail.isRead ? 'mark_email_unread' : 'mark_email_read'}
                            </span>
                        </button>

                        <button
                            type="button"
                            className="mail-delete-btn"
                            onClick={() => onRemoveMail(mail.id)}
                            title={mail.removedAt ? 'Delete permanently' : 'Delete'}
                            aria-label="Delete mail"
                        >
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </button>

                        {mail.removedAt && (
                            <button
                                type="button"
                                className="mail-restore-btn"
                                onClick={() => onRestoreMail(mail.id)}
                                title="Restore"
                                aria-label="Restore mail"
                            >
                                <span className="material-symbols-outlined">
                                    restore
                                </span>
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
