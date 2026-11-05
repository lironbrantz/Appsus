import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM

export function MailList({ mails }) {
    return (
        <section>
            <ul className="mail-list">
                {mails.map((mail) => (
                    <li key={mail.id}>
                        <Link to={`/mail/${mail.id}`}>
                            <MailPreview mail={mail} />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}