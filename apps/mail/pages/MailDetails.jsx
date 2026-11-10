
import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'
import { LabelPicker } from '../../../cmps/LabelPicker.jsx'

const { useParams, Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [isLabelPickerOpen, setIsLabelPickerOpen] = useState(false)

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
            })
    }

    function onChangeLabels(labels) {
        const updatedMail = { ...mail, labels }

        mailService.save(updatedMail)
            .then(() => setMail(updatedMail))
            .catch(() => showErrorMsg('Cannot save labels'))
    }

    if (!mail) return <div>Loading...</div>

    return (
        <section className="mail-details">
            <div className="mail-details-toolbar">

                <Link to="/mail" className="details-action-btn" title="Back">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                </Link>

                <button
                    type="button"
                    className="details-action-btn"
                    onClick={onRemoveMail}
                    title="Delete"
                >
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </button>

                <button
                    type="button"
                    className="details-action-btn"
                    onClick={() => setIsLabelPickerOpen(prev => !prev)}
                    title="Labels"
                >
                    <span className="material-symbols-outlined">
                        label
                    </span>
                </button>

                {isLabelPickerOpen && (
                    <LabelPicker
                        options={utilService.getLabels()}
                        selectedLabels={mail.labels || []}
                        onChange={onChangeLabels}
                    />
                )}
            </div>

            <div className="mail-message">
                <h2>{mail.subject}</h2>

                {mail.labels && mail.labels.length > 0 && (
                    <div className="mail-labels">
                        {mail.labels.map(label => (
                            <span className="mail-label" key={label}>
                                {label}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mail-message-info">
                    <div className="mail-avatar">
                        {mail.from.charAt(0).toUpperCase()}
                    </div>

                    <div className="mail-addresses">
                        <div className="mail-sender">
                            {mail.from}
                        </div>
                        <div className="mail-recipient">
                            to {mail.to}
                        </div>
                    </div>

                    <time>
                        {new Date(mail.sentAt || mail.createdAt).toLocaleDateString()}
                    </time>
                </div>

                <div className="mail-body">
                    {mail.body}
                </div>
            </div>
        </section>
    )
}
