

const { NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function onToggleMenu() {
        setIsMenuOpen(prevIsOpen => !prevIsOpen)
    }

    function onCloseMenu() {
        setIsMenuOpen(false)
    }

    return (
        <header className="app-header">
            <h3>Appsus</h3>

            <div className="app-launcher">
                <button
                    type="button"
                    className="material-symbols-outlined apps-btn"
                    onClick={onToggleMenu}
                    aria-label="Apps menu"
                    aria-expanded={isMenuOpen}
                >
                    apps
                </button>

                <nav className={`app-nav ${isMenuOpen ? 'open' : ''}`}>
                    <NavLink to="/" end onClick={onCloseMenu}>Home</NavLink>
                    <NavLink to="/note" onClick={onCloseMenu}>Keep</NavLink>
                    <NavLink to="/mail" onClick={onCloseMenu}>Mail</NavLink>
                    <NavLink to="/about" onClick={onCloseMenu}>About</NavLink>
                </nav>
            </div>
        </header>
    )
}
