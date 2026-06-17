async function loadStudio() {

    const response = await fetch("../data/portfolio.json");

    const portfolio = await response.json();

    const params = new URLSearchParams(
        window.location.search
    );

    const studioId = params.get("id");

    const studio = portfolio.studio.find(
        item => item.id === studioId
    );

    if (!studio) {

        document.getElementById("studio-page").innerHTML = `

            <h1>Studio not found</h1>

        `;

        return;
    }

    const projects = portfolio.project.filter(project =>
        studio.projects.includes(project.id)
    );

    const tools = portfolio.tool.filter(tool =>
        studio.tools.includes(tool.id)
    );

    document.title = studio.name;

    document.getElementById("studio-page").innerHTML = `

        <a href="../index.html" class="back-link">

            <i class="fa-solid fa-arrow-left"></i>

            Back

        </a>

        <section class="studio-header">

            <div class="timeline-icon">

                <i class="${studio.icon}"></i>

            </div>

            <h1>

                ${studio.name}

            </h1>

            <h2>

                ${studio.title}

            </h2>

            <div class="timeline-tags">

                ${(studio.tags || []).map(tag => `
                    <span class="tag">${tag}</span>
                `).join("")}

            </div>

            <p class="studio-description">

                ${studio.description}

            </p>

            ${
                studio.url
                    ? `
                        <div class="links">

                            <a
                                class="btn"
                                href="${studio.url}"
                                target="_blank"
                            >

                                <i class="fa-solid fa-globe"></i>

                                <span>Website</span>

                            </a>

                        </div>
                    `
                    : ""
            }

        </section>

        ${
            projects.length
                ? `
                    <section class="studio-projects">

                        <h2>

                            Projects

                        </h2>

                        <div class="project-grid">

                            ${projects.map(project => `

                                <a
                                    class="project-card"
                                    href="project.html?id=${project.id}"
                                >

                                    <img
                                        src="${project.thumbnail}"
                                        alt="${project.name}"
                                    >

                                    <h3>

                                        ${project.name}

                                    </h3>

                                </a>

                            `).join("")}

                        </div>

                    </section>
                `
                : ""
        }

        ${
            tools.length
                ? `
                    <section class="studio-projects">

                        <h2>

                            Tools

                        </h2>

                        <div class="project-grid">

                            ${tools.map(tool => `

                                <a
                                    class="project-card"
                                    href="${tool.url}"
                                    target="_blank"
                                >

                                    <div style="padding:2rem">

                                        <h3>

                                            ${tool.name}

                                        </h3>

                                    </div>

                                </a>

                            `).join("")}

                        </div>

                    </section>
                `
                : ""
        }

    `;
}

loadStudio();