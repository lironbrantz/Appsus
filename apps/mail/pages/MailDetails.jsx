const { useParams, Link, useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

 function loadMail() {
    mailService.get(mailId)
        .then(mail => {
            setMail(mail)
            return mailService.markAsRead(mailId)
        })
        .catch(err => {
            console.error(err)
            showErrorMsg('Cannot load or mark mail')
            navigate('/mail')
        })
}

function onRemoveMail() {
    mailService.remove(mailId)
        .then(() => {
            navigate('/mail')
        })
        .catch(err => {
            console.error(err)
            showErrorMsg('Cannot remove mail')
        })}

    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">
            <Link to="/mail" className="back-btn">Back</Link>
            <button className="remove-btn" onClick={onRemoveMail}>Delete</button>
            <h2>subject: {mail.subject}</h2>
            <p>From: {mail.from}</p>
            <p>To: {mail.to}</p>
            <p>{mail.body}</p>
        </section>
    )
}
