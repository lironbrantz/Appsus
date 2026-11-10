
import { MailPreview } from './MailPreview.jsx'

const { Link } = ReactRouterDOM

export function MailList({
    mails,
    onRemoveMail,
    onRestoreMail,
    setSelectedDraft
}) {
    return (
        <section>
            <ul className="mail-list">
                {mails.map(mail => (
                    <li key={mail.id}>
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
