let portfolio = null;
let article = null;

async function loadArticle() {

    const params = new URLSearchParams(window.location.search);

    const articleId = params.get("id");

    if (!articleId) {
        return;
    }

    const portfolioUrl = new URL("../data/portfolio.json", window.location.href).href;
    const response = await fetch(portfolioUrl);

    if (!response.ok) {
        console.error("Failed to load portfolio.json:", portfolioUrl, response.status);
        return;
    }

    portfolio = await response.json();

    article = portfolio.articles.find(
        item => item.id === articleId
    );

    if (!article) {
        return;
    }

    renderArticle();
}

async function renderArticle() {

    const container = document.getElementById("article");

    if (!article.file) {
        container.innerHTML = "<p>Article file path is missing.</p>";
        return;
    }

    const articlePaths = [
        article.file,
        article.file.replace(/^\.\./, ""),
        article.file.replace(/^\.\//, ""),
        article.file.replace(/^\.\.\//, "/"),
    ];

    console.info("Article file:", article.file);
    console.info("Current page URL:", window.location.href);
    console.info("Trying article paths:", articlePaths);

    let response = null;
    let triedUrl = null;

    for (const path of articlePaths) {
        const url = new URL(path, window.location.href).href;
        console.info("Trying article URL:", url);

        try {
            const res = await fetch(url);
            if (res.ok) {
                response = res;
                triedUrl = url;
                break;
            }
            console.warn("Article URL failed:", url, res.status);
        } catch (error) {
            console.warn("Fetch error for article URL:", url, error);
        }
    }

    if (!response) {
        container.innerHTML = `
            <p>Failed to load article content.</p>
            <p>Check the console for attempted URLs.</p>
        `;
        return;
    }

    const markdown = await response.text();

    const cleanMarkdown = markdown.replace(
        /^---[\s\S]*?---/,
        ""
    );

    container.innerHTML = `

        <header class="article-header">

            <h1>${article.title}</h1>

            <div class="article-date">
                ${article.date}
            </div>

            <p class="article-description">
                ${article.description}
            </p>

        </header>

        <article class="article-content">

            ${marked.parse(cleanMarkdown)}

        </article>

    `;
}

loadArticle();