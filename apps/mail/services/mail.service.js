
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const { loadFromStorage, saveToStorage } = utilService

const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
    remove,
    save,
    send,
    markAsRead,
    getEmptyMail,
    getDefaultFilter,
    getLoggedinUser
}

const demoMails = [
    {
        from: 'team@codingacademy.com',
        to: 'user@appsus.com',
        subject: 'Welcome to Appsus! 🚀',
        body: 'Welcome aboard!\n\nWe are excited to see what you build. Keep learning, experimenting, and creating great things.\n\nHappy coding!',
        isRead: false
    },
    {
        from: 'maya@designstudio.com',
        to: 'user@appsus.com',
        subject: 'New design files are ready',
        body: 'Hey!\n\nI just finished the latest interface designs. Take a look when you have a chance and let me know what you think.\n\nThanks,\nMaya',
        isRead: false
    },
    {
        from: 'daniel@workspace.io',
        to: 'user@appsus.com',
        subject: 'Project meeting tomorrow',
        body: 'Hi,\n\nJust a reminder about our meeting tomorrow at 10:30 AM.\n\nWe will review the project progress and discuss the next steps.\n\nSee you there!',
        isRead: true
    },
    {
        from: 'notifications@github.com',
        to: 'user@appsus.com',
        subject: 'Your repository is looking great!',
        body: 'Your latest changes have been successfully pushed.\n\nKeep up the great work on your project!',
        isRead: true
    },
    {
        from: 'user@appsus.com',
        to: 'maya@designstudio.com',
        subject: 'Re: New design files',
        body: 'Hi Maya,\n\nThanks for sending the designs! They look fantastic.\n\nI will review everything and get back to you soon.',
        isRead: true
    },
    {
        from: 'user@appsus.com',
        to: 'daniel@workspace.io',
        subject: 'Project progress update',
        body: 'Hi Daniel,\n\nThe main functionality is coming together nicely.\n\nI will have another update ready for our next meeting.',
        isRead: true
    }
].map((mail, idx) => {
    const date = Date.now() - (idx + 1) * 3600000

    return {
        id: `e${101 + idx}`,
        createdAt: date,
        sentAt: date,
        removedAt: null,
        ...mail
    }
})

_createMails()

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            const { status, txt, isRead, sortBy } = {
                ...getDefaultFilter(),
                ...filterBy
            }

            if (status === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            } else {
                mails = mails.filter(mail => !mail.removedAt)

                if (status === 'inbox') {
                    mails = mails.filter(mail =>
                        mail.to === loggedinUser.email
                    )
                } else if (status === 'sent') {
                    mails = mails.filter(mail =>
                        mail.from === loggedinUser.email && mail.sentAt
                    )
                } else if (status === 'draft') {
                    mails = mails.filter(mail =>
                        mail.from === loggedinUser.email && !mail.sentAt
                    )
                }
            }

            if (txt && txt.trim()) {
                const search = txt.toLowerCase().trim()

                mails = mails.filter(mail =>
                    (mail.subject || '').toLowerCase().includes(search) ||
                    (mail.body || '').toLowerCase().includes(search) ||
                    (mail.from || '').toLowerCase().includes(search)
                )
            }

            if (typeof isRead === 'boolean') {
                mails = mails.filter(mail => mail.isRead === isRead)
            }

            if (sortBy === 'subject') {
                mails.sort((a, b) => a.subject.localeCompare(b.subject))
            } else {
                mails.sort((a, b) =>
                    (b.sentAt || b.createdAt) - (a.sentAt || a.createdAt)
                )
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return get(mailId)
        .then(mail => {
            if (mail.removedAt) {
                return storageService.remove(MAIL_KEY, mailId)
            }

            return save({
                ...mail,
                removedAt: Date.now()
            })
        })
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    }

    return storageService.post(MAIL_KEY, {
        ...mail,
        createdAt: mail.createdAt || Date.now()
    })
}

function send(mail) {
    return save({
        ...mail,
        from: loggedinUser.email,
        sentAt: Date.now(),
        isRead: true,
        removedAt: null
    })
}

function markAsRead(mailId) {
    return get(mailId)
        .then(mail => {
            if (mail.isRead) return mail

            return save({
                ...mail,
                isRead: true
            })
        })
}

function getEmptyMail() {
    return {
        id: '',
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: true,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        to: ''
    }
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null,
        sortBy: 'date'
    }
}

function getLoggedinUser() {
    return loggedinUser
}

function _createMails() {
    const mails = loadFromStorage(MAIL_KEY)

    if (mails === null) {
        saveToStorage(MAIL_KEY, demoMails)
    }
}
