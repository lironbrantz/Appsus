const { useState } = React

export function MailPreview({ mail }) {

    const [isRead, setIsRead] = useState(mail.isRead)

    return (
        <div className="mail-preview">
            <h3>{mail.subject}</h3>
            <p>{mail.body}</p>
            <p>{mail.from}</p>
        </div>
    )
}