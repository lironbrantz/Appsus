
import { utilService } from '../../../services/util.service.js'


const folders = [
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'starred', label: 'Starred', icon: 'star' },
    { id: 'sent', label: 'Sent', icon: 'send' },
    { id: 'draft', label: 'Drafts', icon: 'draft' },
    { id: 'trash', label: 'Trash', icon: 'delete' }
]


const activeStyle = {
    backgroundColor: '#d3e3fd',
    color: '#001d35',
    fontWeight: 600
}

export function MailFolderList({
    onSetFolder,
    activeFolder,
    onSetLabel,
    activeLabel,
    unreadCount
}) {
    const labels = utilService.getLabels()

    return (
        <nav className="mail-folder-list">
            {folders.map(folder => (
                <button
                    key={folder.id}
                    type="button"
                    onClick={() => onSetFolder(folder.id)}
                    style={!activeLabel && activeFolder === folder.id ? activeStyle : undefined}
                >
                    <span className="material-symbols-outlined">
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

            <p className="mail-labels-title">Labels</p>

            {labels.map(label => (
                <button
                    key={label}
                    type="button"
                    onClick={() => onSetLabel(label)}
                    style={activeLabel === label ? activeStyle : undefined}
                >
                    <span className="material-symbols-outlined">
                        label
                    </span>
                    {label}
                </button>
            ))}
        </nav>
    )
}
