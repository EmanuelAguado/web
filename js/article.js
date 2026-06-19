let portfolio = null;
let article = null;

async function loadArticle() {

    const params = new URLSearchParams(window.location.search);

    const articleId = params.get("id");

    if (!articleId) {
        return;
    }

    const response = await fetch("../data/portfolio.json");

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

    const response = await fetch(article.file);

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