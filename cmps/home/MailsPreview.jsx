export function MailsPreview({ mails }) {
    return (
        <ul className="home-mail-list">
            {mails.map(mail => (
                <li className="home-mail-item" key={mail.id}>
                    <span className="home-mail-dot" aria-hidden="true" />
                    <span className="home-mail-sender">{mail.from}</span>
                    <span className="home-mail-message">
                        <strong>{mail.subject}</strong>
                        <span className="home-mail-preview">
                            {' — '}{mail.body.replace(/\s+/g, ' ').slice(0, 70)}
                        </span>
                    </span>
                    <span className="home-mail-date">
                        {new Date(mail.sentAt || mail.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </li>
            ))}
        </ul>
    )
}
