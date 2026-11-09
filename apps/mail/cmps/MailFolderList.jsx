
const folders = [
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'sent', label: 'Sent', icon: 'send' },
    { id: 'draft', label: 'Drafts', icon: 'draft' },
    { id: 'trash', label: 'Trash', icon: 'delete' }
]

const activeStyle = {
    backgroundColor: '#d3e3fd',
    color: '#001d35',
    fontWeight: 600
}

export function MailFolderList({ onSetFolder, activeFolder }) {
    return (
        <nav className="mail-folder-list">
            {folders.map(folder => (
                <button
                    key={folder.id}
                    type="button"
                    onClick={() => onSetFolder(folder.id)}
                    style={activeFolder === folder.id ? activeStyle : undefined}
                >
                    <span className="material-symbols-outlined">
                        {folder.icon}
                    </span>
                    {folder.label}
                </button>
            ))}
        </nav>
    )
}
