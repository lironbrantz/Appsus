
import { LongTxt } from '../../../cmps/LongTxt.jsx'

export function MailPreview({ mail }) {
    const mailStyle = {
        backgroundColor: mail.isRead ? '#f2f6fc' : '#fff',
        fontWeight: mail.isRead ? 'normal' : 'bold'
    }

    return (
        <section style={mailStyle} className="mail-preview">
            <p>{mail.from}</p>

            <LongTxt txt={mail.subject} length={40} />

            {mail.labels && mail.labels.length > 0 && (
                <span className="mail-preview-labels">
                    {mail.labels.map(label => (
                        <span className="mail-preview-label" key={label}>
                            {label}
                        </span>
                    ))}
                </span>
            )}

            {' – '}

            <LongTxt txt={mail.body} length={50} />

            <p className="mail-date">
                {new Date(mail.sentAt || mail.createdAt)
                    .toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
            </p>
        </section>
    )
}
