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

    const articleUrl = new URL(article.file, window.location.href).href;
    const response = await fetch(articleUrl);

    if (!response.ok) {
        console.error("Failed to load article markdown:", articleUrl, response.status);
        container.innerHTML = `
            <p>Failed to load article content.</p>
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