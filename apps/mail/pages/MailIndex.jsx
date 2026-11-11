
import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailDetails } from './MailDetails.jsx'
import { AppTopbar } from '../../../cmps/AppTopbar.jsx'

const { useState, useEffect } = React
const { useParams, useSearchParams, useNavigate } = ReactRouterDOM

export function MailIndex() {

    const navigate = useNavigate()
    const { mailId } = useParams()
    const [mails, setMails] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [selectedDraft, setSelectedDraft] = useState(null)
    const [unreadCount, setUnreadCount] = useState(0)

    const [mailFromNote, setMailFromNote] = useState({
        subject: searchParams.get('subject') || '',
        body: searchParams.get('body') || ''
    })

    const folder = filterBy.status

    function onSetFolder(folderId) {
        setFilterBy(prev => ({
            ...prev,
            status: folderId,
            label: ''
        }))
        navigate('/mail')
    }

    function onSetLabel(label) {
        setFilterBy(prev => ({
            ...prev,
            label: label
        }))
        navigate('/mail')
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => loadMails())
            .catch(() => showErrorMsg('Failed to remove mail'))
    }

    function onToggleStar(mailId) {
        mailService.toggleStar(mailId)
            .then(() => loadMails())
            .catch(() => showErrorMsg('Failed to update star'))
    }

    function onToggleRead(mailId) {
        mailService.toggleRead(mailId)
            .then(() => loadMails())
            .catch(() => showErrorMsg('Failed to update mail'))
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
        mailService.query({ status: 'inbox', isRead: false })
            .then(mails => {
                setUnreadCount(mails.length)
            })
    }

    function onAddMail(mail) {
        return mailService.send(mail)
            .then(() => loadMails())
    }

    function onSaveDraft(mail) {
        return mailService.save(mail)
            .then(() => loadMails())
    }

    if (!mails) return <div>Loading...</div>

    return (
        <section className="mail-index app--mail">
            <AppTopbar app="mail" title="Mail" icon="mail">
                <MailFilter
                    filterBy={filterBy}
                    onSetFilterBy={onSetFilterBy}
                />
            </AppTopbar>

            <div className="mail-content">

                <MailFolderList
                    onSetFolder={onSetFolder}
                    activeFolder={folder}
                    onSetLabel={onSetLabel}
                    activeLabel={filterBy.label}
                    unreadCount={unreadCount}
                />

                <main className="mail-panel">
                    {mailId ? (
                        <MailDetails />
                    ) : (
                        <section className="mail-list-page">
                            <h1>{folder}</h1>
                            <select
                                aria-label="Sort mails"
                                value={filterBy.sortBy}
                                onChange={ev => setFilterBy(prev => ({
                                    ...prev,
                                    sortBy: ev.target.value
                                }))}
                            >
                                <option value="date">Newest first</option>
                                <option value="subject">Subject A-Z</option>
                            </select>

                            <MailList
                                mails={mails}
                                onRemoveMail={onRemoveMail}
                                onRestoreMail={onRestoreMail}
                                setSelectedDraft={setSelectedDraft}
                                onToggleStar={onToggleStar}
                                onToggleRead={onToggleRead}

                            />
                        </section>
                    )}
                </main>
            </div>

            <MailCompose
                onAddMail={onAddMail}
                onSaveDraft={onSaveDraft}
                selectedDraft={selectedDraft}
                subject={mailFromNote.subject}
                body={mailFromNote.body}
            />
        </section>
    )
}
