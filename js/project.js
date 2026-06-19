async function loadProject() {

    const response = await fetch("../data/portfolio.json");

    const portfolio = await response.json();

    const params = new URLSearchParams(
        window.location.search
    );

    const projectId = params.get("id");

    const project = portfolio.project.find(
        item => item.id === projectId
    );

    if (!project) {

        document.getElementById("project-page").innerHTML = `

            <h1>Project not found</h1>

        `;

        return;
    }

    const studio = portfolio.studio.find(
        item => item.id === project.studio
    );

    let content = "";

    if (project.content) {

        try {

            const contentResponse = await fetch(
                project.content
            );

            const markdown = await contentResponse.text();

            content = marked.parse(markdown);

        } catch (error) {

            console.error(error);

            content = `
                <p>
                    Failed to load project content.
                </p>
            `;
        }
    }

    document.title = project.name;

    document.getElementById("project-page").innerHTML = `

        <a
            href="javascript:history.back()"
            class="back-link">

            <i class="fa-solid fa-arrow-left"></i>

            Back

        </a>

        <section class="project-header">

            ${project.banner ? `

                <img
                    class="project-banner"
                    src="${project.banner}"
                    alt="${project.name}"
                >

            ` : ""}

            <h1>

                ${project.name}

            </h1>

            ${
                studio
                    ? `
                        <a
                            class="project-studio"
                            href="studio.html?id=${studio.id}"
                        >

                            ${studio.name}

                        </a>
                    `
                    : ""
            }

        </section>

        ${
            content
                ? `

                    <article class="article-content">

                        ${content}

                    </article>
                `
                : ""
        }

        ${
            project.images?.length
                ? `
                    <section class="project-gallery-section">

                        <h2>

                            Gallery

                        </h2>

                        <div class="project-gallery">

                            ${project.images.map(image => `

                                <img
                                    src="${image}"
                                    alt="${project.name}"
                                >

                            `).join("")}

                        </div>

                    </section>
                `
                : ""
        }

    `;
}

loadProject();