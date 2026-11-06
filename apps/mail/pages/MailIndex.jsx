import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"

const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const folder = searchParams.get('status') || 'inbox'

    function onSetFolder(folderid) {

        setSearchParams({ status: folderid })

    }
    useEffect(() => {
        loadMails()

    }, [folder])

    function loadMails() {
        mailService.query({ status: folder })
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
                <MailFolderList onSetFolder={onSetFolder} activeFolder={folder} />
                <MailList mails={mails} />
            </div>
        </section>
    )
}