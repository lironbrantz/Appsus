const { Link } = ReactRouterDOM

export function AppPanel({ app, icon, title, meta, to, children }) {
    return (
        <section
            className={`home-app home-app--${app}`}
            aria-labelledby={`home-${app}-title`}
        >
            <header className="home-app-header">
                <div className="home-app-heading">
                    <span
                        className="material-symbols-outlined home-app-icon"
                        aria-hidden="true"
                    >
                        {icon}
                    </span>

                    <div>
                        <h2 id={`home-${app}-title`}>{title}</h2>
                        <p>{meta}</p>
                    </div>
                </div>

                <Link className="home-app-button" to={to}>
                    Open {title}
                    <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        arrow_forward
                    </span>
                </Link>
            </header>

            {children}
        </section>
    )
}