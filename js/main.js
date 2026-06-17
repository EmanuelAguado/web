let portfolio = null;

async function loadPortfolio() {

    const response = await fetch("./data/portfolio.json");

    portfolio = await response.json();

    renderHero();
    renderTimeline();
    renderFooter();
}

function renderHero() {

    const hero = document.getElementById("hero");

    hero.classList.add("hero");

    hero.innerHTML = `

        <div class="status">

            <i class="fa-solid fa-hammer"></i>

            ${portfolio.status}

        </div>

        <h1>

            ${portfolio.first_name}

            <span class="gradient">

                ${portfolio.last_name}

            </span>

        </h1>

        <div class="aka">

            (aka ${portfolio.nickname})

        </div>

        <p class="subtitle">

            ${portfolio.title}<br>
            ${portfolio.subtitle}

        </p>

        <div class="links">

            ${portfolio.socials.map(link => `

                <a
                    class="btn"
                    href="${link.url}"
                    target="_blank">

                    <i class="${link.icon}"></i>

                    <span>${link.name}</span>

                </a>

            `).join("")}

        </div>

    `;
}

function renderTimeline() {

    const content = document.getElementById("content");

    const studios = portfolio.studio || [];

    content.innerHTML = `

        <section class="timeline-section">

            <h2>Experience</h2>

            <div class="timeline">

                ${studios.map(studio => `

                    <div class="timeline-item">

                        <div class="timeline-date">
                            ${studio.period}
                        </div>

                        <div class="timeline-marker">

                            <div class="timeline-icon">
                                <i class="${studio.icon}"></i>
                            </div>

                        </div>

                        <a
                            class="timeline-card clickable"
                            href="templates/studio.html?id=${studio.id}"
                        >

                            <h3>${studio.title}</h3>

                            <h4>${studio.name}</h4>

                            ${renderTags(studio.tags)}

                            <p>
                                ${studio.description}
                            </p>

                        </a>

                    </div>

                `).join("")}

            </div>

        </section>

    `;
}

function renderTags(tags) {

    if (!tags || !tags.length) {
        return "";
    }

    return `

        <div class="timeline-tags">

            ${tags.map(tag => `

                <span class="tag">

                    ${tag}

                </span>

            `).join("")}

        </div>

    `;
}

function renderFooter() {

    const footer = document.getElementById("footer");

    footer.classList.add("footer");

    footer.innerHTML = `

        © ${new Date().getFullYear()}

        ${portfolio.first_name}

        ${portfolio.last_name}

    `;
}

function slugify(text) {

    return text

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .toLowerCase()

        .replace(/[^a-z0-9]+/g, "-")

        .replace(/^-+|-+$/g, "");
}

loadPortfolio();