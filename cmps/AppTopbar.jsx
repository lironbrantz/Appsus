export function AppTopbar({ app, title, icon, onToggleMenu, isMenuOpen, children }) {
    return (
        <header className={`app-topbar app--${app}`}>
            {onToggleMenu && (
                <button
                    type="button"
                    className="app-topbar-menu-btn"
                    onClick={onToggleMenu}
                    aria-label="Main menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className="material-symbols-outlined" aria-hidden="true">menu</span>
                </button>
            )}

            <div className="app-topbar-brand">
                <span className="material-symbols-outlined app-topbar-icon" aria-hidden="true">
                    {icon}
                </span>
                <span className="app-topbar-title">{title}</span>
            </div>

            {children && (
                <div className="app-topbar-search">{children}</div>
            )}
        </header>
    )
}
