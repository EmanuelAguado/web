async function loadPortfolio() {

    const response = await fetch("./data/portfolio.json");
    const data = await response.json();

    document.getElementById("status").innerHTML = `
        <i class="fa-solid fa-hammer"></i>
        ${data.status}
    `;

    document.getElementById("name").innerHTML = `
        ${data.first_name}
        <span class="gradient">${data.last_name}</span>
    `;

    document.getElementById("aka").textContent = `(aka ${data.nickname})`;

    document.getElementById("subtitle").innerHTML = `
        ${data.title}<br>
        ${data.subtitle}
    `;

    document.getElementById("footer").textContent =
        `© ${new Date().getFullYear()} ${data.first_name} ${data.last_name}`;

    const links = document.getElementById("links");

    links.innerHTML = "";

    data.socials.forEach(link => {

        links.innerHTML += `
            <a class="btn" href="${link.url}" target="_blank">
                <i class="${link.icon}"></i>
                <span>${link.name}</span>
            </a>
        `;
    });

    if (data.experience) {
        renderTimeline(data.experience);
    }
}

function renderTimeline(items) {

    const timeline = document.getElementById("timeline");

    if (!timeline) {
        return;
    }

    timeline.innerHTML = items.map(item => `
        <div class="timeline-item">

            <div class="timeline-date">
                ${item.period}
            </div>

            <div class="timeline-marker">
                <div class="timeline-icon">
                    <i class="${item.icon}"></i>
                </div>
            </div>

            <div class="timeline-card">

                <h3>${item.title}</h3>

                <h4>${item.company}</h4>

                 ${
                    item.tags?.length
                        ? `
                            <div class="timeline-tags">
                                ${item.tags.map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join("")}
                            </div>
                        `
                        : ""
                }

                <p>${item.description}</p>

            </div>

        </div>
    `).join("");
}

loadPortfolio();