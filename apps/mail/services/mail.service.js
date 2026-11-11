
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
    restore,
    save,
    send,
    markAsRead,
    toggleStar,
    toggleRead,
    getEmptyMail,
    getDefaultFilter,
    getLoggedinUser,
    getFilterFromSearchParams,

}


const demoMails = [
    // Inbox
    {
        from: 'emma@northstarstudio.co',
        to: 'user@appsus.com',
        subject: 'Updated design files',
        body: 'Hi,\n\nThe latest designs are ready for review. I made a few adjustments to the layout and updated the mobile screens.\n\nEverything is in the shared folder.\n\nEmma',
        isRead: false
    },
    {
        from: 'tickets@theglasshouse.co',
        to: 'user@appsus.com',
        subject: 'Your tickets are confirmed',
        body: 'Your booking is confirmed!\n\nEvent: The Glasshouse Sessions\nDate: Friday, November 20\nDoors open: 7:30 PM\n\nYour tickets will be available at the entrance.\n\nSee you there!',
        isRead: false
    },
    {
        from: 'hello@theweeklyedit.co',
        to: 'user@appsus.com',
        subject: 'The Weekly Edit — Issue 042',
        body: 'Good morning,\n\nThis week we are looking at the little details that make good products feel effortless.\n\nInside this issue:\n\n• A closer look at thoughtful interface design\n• Five websites worth exploring\n• A conversation with an independent designer\n\nEnjoy the read,\nThe Weekly Edit',
        isRead: false
    },
    {
        from: 'alex@formandfunction.co',
        to: 'user@appsus.com',
        subject: 'A quick question about the mockups',
        body: 'Hey,\n\nJust had a look at the mockups. Everything looks good overall.\n\nOne small thing: could we try a version with a little more spacing between the sections?\n\nNo rush. Thanks!\nAlex',
        isRead: true
    },
    {
        from: 'events@designassembly.co',
        to: 'user@appsus.com',
        subject: 'Workshop details for Thursday',
        body: 'Hello,\n\nA quick reminder about Thursday’s workshop.\n\nTopic: Designing Better Digital Experiences\nTime: 6:00 PM\nLocation: The Assembly Space\n\nPlease arrive 10 minutes early for registration.\n\nLooking forward to seeing you!',
        isRead: true
    },
    {
        from: 'updates@workboard.co',
        to: 'user@appsus.com',
        subject: '3 new updates on your board',
        body: 'There has been some activity on your workspace.\n\n• 2 tasks were completed\n• 1 new comment was added\n• The project timeline was updated\n\nOpen your board to see the latest changes.',
        isRead: true
    },
    {
        from: 'studio@objectsandthings.co',
        to: 'user@appsus.com',
        subject: 'A first look at our new collection',
        body: 'Hello there,\n\nOur latest collection has arrived.\n\nClean shapes, warm materials, and pieces designed to last. We put together a small selection of our favorites for the season.\n\nTake a look whenever you have a moment.\n\nObjects & Things',
        isRead: true
    },
    {
        from: 'billing@cloudline.co',
        to: 'user@appsus.com',
        subject: 'Your November invoice is ready',
        body: 'Hello,\n\nYour invoice for November is now available.\n\nInvoice: INV-2026-1142\nBilling period: November 2026\nStatus: Paid\n\nYou can view your billing history from your account dashboard.\n\nThank you,\nCloudline Billing',
        isRead: true
    },

    {
        from: 'sophie@atelierworks.co',
        to: 'user@appsus.com',
        subject: 'Thursday works',
        body: 'Thursday at 4 works for me. See you!',
        isRead: false
    },
    {
        from: 'orders@commonstore.co',
        to: 'user@appsus.com',
        subject: 'Your order has shipped',
        body: 'Good news! Your order is on its way.\n\nYou can track the delivery using the link in your account. We will send another update once it arrives.\n\nThanks for shopping with us!',
        isRead: true
    },
    {
        from: 'julia@northstarstudio.co',
        to: 'user@appsus.com',
        subject: 'One last change',
        body: 'Can we use the first version instead?',
        isRead: false
    },
    {
        from: 'hello@framecinema.co',
        to: 'user@appsus.com',
        subject: 'Your reservation is confirmed',
        body: 'Your reservation is confirmed for Saturday evening.\n\nFilm: The Last Stop\nTime: 8:15 PM\nSeats: F12, F13\n\nPlease have your confirmation ready at the entrance.\n\nEnjoy the film!',
        isRead: true
    },
    {
        from: 'michael@formandfunction.co',
        to: 'user@appsus.com',
        subject: 'Looks good to me',
        body: 'Approved. You can go ahead with it.',
        isRead: true
    },
    {
        from: 'support@parcelpoint.co',
        to: 'user@appsus.com',
        subject: 'Package delivered',
        body: 'Your package was delivered today.',
        isRead: true
    },

    // Sent
    {
        from: 'user@appsus.com',
        to: 'emma@northstarstudio.co',
        subject: 'Re: Updated design files',
        body: 'Hi Emma,\n\nThanks for sending everything over. I will go through the latest version and send any feedback in one message.\n\nThanks!',
        isRead: true
    },
    {
        from: 'user@appsus.com',
        to: 'alex@formandfunction.co',
        subject: 'Re: A quick question about the mockups',
        body: 'Hey Alex,\n\nSure, that makes sense. I will put together another version with more spacing so we can compare the two.\n\nTalk soon!',
        isRead: true
    },
    {
        from: 'user@appsus.com',
        to: 'hello@designassembly.co',
        subject: 'Workshop registration',
        body: 'Hello,\n\nThanks for the information. Just confirming that the registration is complete and everything is set for Thursday.\n\nBest regards',
        isRead: true
    },

    // Drafts
    {
        from: 'user@appsus.com',
        to: 'team@northstarstudio.co',
        subject: 'Feedback on the latest layout',
        body: 'Hi team,\n\nI went through the updated screens and noted a few things worth discussing.\n\n1. Header spacing\n2. Mobile navigation\n3. Button styles\n\n',
        isRead: true,
        sentAt: null
    },
    {
        from: 'user@appsus.com',
        to: 'hello@theweeklyedit.co',
        subject: 'Question about your next issue',
        body: 'Hi,\n\nI really enjoyed the latest issue and wanted to ask about',
        isRead: true,
        sentAt: null
    },

    // Trash
    {
        from: 'offers@urbanmarket.co',
        to: 'user@appsus.com',
        subject: 'Last chance: weekend offers',
        body: 'Our weekend offers are coming to an end.\n\nExplore selected items before the sale closes tonight.\n\nUrban Market',
        isRead: true,
        removedAt: Date.now() - 3600000
    },
    {
        from: 'newsletter@dailybrief.co',
        to: 'user@appsus.com',
        subject: 'Your daily briefing',
        body: 'Good morning,\n\nHere is a quick roundup of today’s stories, ideas, and interesting reads.\n\nThe Daily Brief',
        isRead: true,
        removedAt: Date.now() - 7200000
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
            const { status, txt, isRead, sortBy, label } = {
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

                } else if (status === 'starred') {
                    mails = mails.filter(mail => mail.isStarred

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

            if (label) {
                mails = mails.filter(mail =>
                    (mail.labels || []).includes(label)
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
function restore(mailId) {
    return get(mailId)
        .then(mail => {
            return save({
                ...mail,
                removedAt: null
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

function toggleRead(mailId) {
    return get(mailId)
        .then(mail => {
            return save({
                ...mail,
                isRead: !mail.isRead
            })
        })
}

function toggleStar(mailId) {
    return get(mailId)
        .then(mail => {
            return save({
                ...mail,
                isStarred: !mail.isStarred
            })
        })
}

function getEmptyMail() {
    return {
        id: '',
        createdAt: Date.now(),
        subject: '',
        labels: [],
        body: '',
        isRead: true,
        isStarred: false,
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
        sortBy: 'date',
        label: ''
    }
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = getDefaultFilter()

    filterBy.status = searchParams.get('status') || 'inbox'
    filterBy.txt = searchParams.get('txt') || ''
    filterBy.label = searchParams.get('label') || ''
    filterBy.sortBy = searchParams.get('sortBy') || 'date'

    const isRead = searchParams.get('isRead')

    filterBy.isRead =
        isRead === 'true' ? true :
            isRead === 'false' ? false : null
    return filterBy
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
