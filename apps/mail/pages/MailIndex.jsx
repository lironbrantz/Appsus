import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailFilter } from '../cmps/MailFilter.jsx'


const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    const folder = filterBy.status

    function onSetFolder(folderId) {
        setFilterBy(prev => ({ ...prev, status: folderId }))
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(filterByToEdit)
        setSearchParams(prev => ({ ...prev, txt, isRead }))
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

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">

            <div className="mail-content">
                <h1 style={{ textTransform: 'capitalize' }}>{folder}</h1>
                <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <MailFolderList onSetFolder={onSetFolder} activeFolder={folder} />
                <MailList mails={mails} />
            </div>
        </section>
    )
}