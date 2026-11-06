const folders = [
    { id: 'inbox', label: 'Inbox' },
    { id: 'sent', label: 'Sent' },
    { id: 'draft', label: 'Drafts' },
    { id: 'trash', label: 'Trash' }
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
                    {folder.label}
                </button>
            ))}
        </nav>
    )
}