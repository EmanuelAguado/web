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

    data.socials.forEach(link => {

        links.innerHTML += `
            <a class="btn" href="${link.url}" target="_blank">
                <i class="${link.icon}"></i>
                <span>${link.name}</span>
            </a>
        `;
    });
}

loadPortfolio();