async function loadTools() {

    const response = await fetch("../data/portfolio.json");

    const portfolio = await response.json();

    const params = new URLSearchParams(
        window.location.search
    );

    const toolsId = params.get("id");

    const tools = portfolio.tool.find(
        item => item.id === toolsId
    );

    if (!tools) {

        document.getElementById("tools-page").innerHTML = `

            <h1>Tools not found</h1>

        `;

        return;
    }

    const projects = portfolio.project.filter(project =>
        tools.projects.includes(project.id)
    );

    document.title = tools.name;

    document.getElementById("tools-page").innerHTML = `

        <a href="../index.html" class="back-link">

            <i class="fa-solid fa-arrow-left"></i>

            Back

        </a>

        <section class="tools-header">

            <div class="timeline-icon">

                <i class="${tools.icon}"></i>

            </div>

            <h1>

                ${tools.name}

            </h1>

            <div class="timeline-tags">

                ${(tools.tags || []).map(tag => `
                    <span class="tag">${tag}</span>
                `).join("")}

            </div>

            <p class="tools-description">

                ${tools.description}

            </p>

            ${
                tools.url
                    ? `
                        <div class="links">

                            <a
                                class="btn"
                                href="${tools.url}"
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
                    <section class="tools-projects">

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
                    <section class="tools-projects">

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

loadTools();