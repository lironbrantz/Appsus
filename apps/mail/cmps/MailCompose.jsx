
import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function MailCompose({ onAddMail, onSaveDraft, selectedDraft, subject, body }) {

    const emptyMail = mailService.getEmptyMail()
    emptyMail.subject = subject || ''
    emptyMail.body = body || ''

    const [newMail, setNewMail] = useState(emptyMail)

const [isMailComposeOpen, setIsMailComposeOpen] = useState(subject !== '' || body !== '')
    function onSubmitForm(ev) {
        ev.preventDefault()

        onAddMail(newMail)
            .then(() => {
                setNewMail(mailService.getEmptyMail())
                setIsMailComposeOpen(false)
            })
            .catch(() => {
                showErrorMsg('Failed to send mail')
            })
    }
    useEffect(() => {
        if (!selectedDraft) return

        setNewMail(selectedDraft)
        setIsMailComposeOpen(true)
    }, [selectedDraft])

    function handleChange({ target }) {
        const { name, value } = target
        setNewMail(prev => ({ ...prev, [name]: value }))
    }
    function onSaveDraftClick() {
        onSaveDraft(newMail)
            .then(() => {
                setNewMail(mailService.getEmptyMail())
                setIsMailComposeOpen(false)
            })
            .catch(() => showErrorMsg('Failed to save draft'))
    }
    return (
        <section className="add-mail">
            <button
                type="button"
                className="compose-trigger"
                onClick={() => setIsMailComposeOpen(prev => !prev)}
            >
                Compose
            </button>

            {isMailComposeOpen && (
                <form className="mail-add-form" onSubmit={onSubmitForm}>
                    <header className="compose-header">
                        <h2>New Message</h2>
                        <button
                            type="button"
                            className="compose-close-btn"
                            onClick={() => setIsMailComposeOpen(false)}
                            aria-label="Close compose"
                        >
                            ×
                        </button>
                    </header>

                    <input
                        type="email"
                        id="email"
                        name="to"
                        placeholder="To"
                        value={newMail.to}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        value={newMail.subject}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        id="body"
                        name="body"
                        placeholder="Body"
                        rows="10"
                        value={newMail.body}
                        onChange={handleChange}
                        required
                    />

                    <footer className="compose-footer">
                        <button type="submit" className="send-btn">
                            Send
                        </button>
                        <button type="button" onClick={onSaveDraftClick}>
                            Save Draft
                        </button>
                    </footer>
                </form>
            )}
        </section>
    )
}
