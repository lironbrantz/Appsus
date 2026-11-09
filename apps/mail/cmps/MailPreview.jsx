import { LongTxt } from '../../../cmps/LongTxt.jsx'

export function MailPreview({ mail }) {


    const mailStyle = { backgroundColor: mail.isRead ? '#f0f0f0' : '#fff', fontWeight: mail.isRead ? 'normal' : 'bold' }
    return (
        <section style={mailStyle} className="mail-preview">
            <p>{mail.from}</p>
            <LongTxt txt={mail.subject} length={40} />
            {' – '}
            <LongTxt txt={mail.body} length={50} />
            <p>{new Date(mail.sentAt).toLocaleString()}</p>
            <button> delete </button>
        </section>
    )
} 