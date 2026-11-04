import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"

const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()

    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
            .catch(() => {
                showErrorMsg('Failed to load mails')
            })
    }


    if (!mails) return <div>Loading...</div>
    return (

        <section className="mail-index">
            <h1>Mail Inbox</h1>
            <MailList mails={mails} />
        </section>
    )
}



