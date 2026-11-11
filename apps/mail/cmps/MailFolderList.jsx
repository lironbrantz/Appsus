
import { utilService } from '../../../services/util.service.js'


const folders = [
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'starred', label: 'Starred', icon: 'star' },
    { id: 'sent', label: 'Sent', icon: 'send' },
    { id: 'draft', label: 'Drafts', icon: 'draft' },
    { id: 'trash', label: 'Trash', icon: 'delete' }
]


export function MailFolderList({
    onSetFolder,
    activeFolder,
    onSetLabel,
    activeLabel,
    unreadCount
}) {
    const labels = utilService.getLabels()

    return (
        <nav className="app-sidebar mail-folder-list" aria-label="Mail folders">
            {folders.map(folder => (
                <button
                    key={folder.id}
                    type="button"
                    className={`app-sidebar-item ${!activeLabel && activeFolder === folder.id ? 'is-active' : ''}`}
                    onClick={() => onSetFolder(folder.id)}
                >
                    <span className="material-symbols-outlined" aria-hidden="true">
                        {folder.icon}
                    </span>
                    {folder.label}

                    {folder.id === 'inbox' && unreadCount > 0 && (
                        <span className="mail-unread-count">
                            {unreadCount}
                        </span>
                    )}

                </button>
            ))}

            <p className="app-sidebar-heading mail-labels-title">Labels</p>

            {labels.map(label => (
                <button
                    key={label}
                    type="button"
                    className={`app-sidebar-item ${activeLabel === label ? 'is-active' : ''}`}
                    onClick={() => onSetLabel(label)}
                >
                    <span className="material-symbols-outlined" aria-hidden="true">
                        label
                    </span>
                    {label}
                </button>
            ))}
        </nav>
    )
}
