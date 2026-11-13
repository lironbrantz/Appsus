export function AboutProject() {
    return (
        <section
            className="home-developer"
            aria-labelledby="home-developer-title"
        >
            <img
                className="home-developer-photo"
                src="assets/img/about/liron.jpg"
                alt="Liron Brantz"
            />

            <div className="home-developer-content">
                <h2 id="home-developer-title">
                    Liron Brantz
                </h2>

                <p className="home-developer-role">
                    Full-Stack Developer with an interest in both front-end and back-end development
                </p>

                <p className="home-developer-project">
                    Appsus - A React-based workspace featuring three
                    applications: Keep, Mail, and Books. Built with a focus
                    on reusable components, intuitive interfaces, client-side
                    routing, and local data persistence.
                </p>
            </div>

            <nav
                className="home-developer-links"
                aria-label="Developer links"
            >
                <a
                    href="https://github.com/lironbrantz/Appsus"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        book_2
                    </span>
                    Project Repository
                </a>

                <a
                    href="https://github.com/lironbrantz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i
                        className="fa-brands fa-github"
                        aria-hidden="true"
                    />
                    GitHub
                </a>

                <a
                    href="https://www.linkedin.com/in/liron-brantz-2573b13a4"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i
                        className="fa-brands fa-linkedin"
                        aria-hidden="true"
                    />
                    LinkedIn
                </a>
            </nav>
        </section>
    )
}