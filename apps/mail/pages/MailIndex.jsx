import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailDetails } from './MailDetails.jsx'


const { useEffect, useState } = React
const { useSearchParams, useParams, useNavigate } = ReactRouterDOM

export function MailIndex() {
    const navigate = useNavigate()
    const { mailId } = useParams()
    const [mails, setMails] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    const folder = filterBy.status

    function onSetFolder(folderId) {
        setFilterBy(prev => ({ ...prev, status: folderId }))
        navigate('/mail')

    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => loadMails())
            .catch(() => showErrorMsg('Failed to remove mail'))
    }

    function onRestoreMail(mailId) {
        mailService.restore(mailId)
            .then(() => loadMails())
            .catch(() => showErrorMsg('Failed to restore mail'))
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(filterByToEdit)
    }

    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()

    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
            .catch(() => {
                showErrorMsg('Failed to load mails')
            })
    }
    function onAddMail(mail) {
        return mailService.send(mail)
            .then(() => loadMails())
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">

            <div className="mail-content">
                <MailFilter
                    filterBy={filterBy}
                    onSetFilterBy={onSetFilterBy}
                />

                <MailFolderList
                    onSetFolder={onSetFolder}
                    activeFolder={folder}
                />

                <main className="mail-panel">
                    {mailId ? (
                        <MailDetails />
                    ) : (
                        <section className="mail-list-page">
                            <h1>{folder}</h1>
                            <MailList mails={mails} onRemoveMail={onRemoveMail} onRestoreMail={onRestoreMail} />
                        </section>
                    )}
                </main>
            </div>
            <MailCompose onAddMail={onAddMail} />
        </section>
    )
}