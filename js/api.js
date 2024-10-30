const API_key = "bb280776c89d4d5abd3d4b68bcc20b7d" ;
const API_url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const response = await fetch(`${API_url}${query}&sortBy=publishedAt&apiKey=${API_key}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const contentscontainer = document.getElementById("contents_container");
    const contentstemplate = document.getElementById("contents_template");

    contentscontainer.innerHTML = "";

    articles.forEach((article) => {
        if (article.content==="[Removed]"){ return };
        if (!article.description){ return };
        const contentClone = contentstemplate.content.cloneNode(true);
        fillDataContents(contentClone, article);
        contentscontainer.appendChild(contentClone);
    });
}

function fillDataContents(contentClone, article){
    const newsImg = contentClone.querySelector("#news_img");
    const newsHeadline = contentClone.querySelector("#headline");
    const newsSource = contentClone.querySelector("#source");
    const newsDescp = contentClone.querySelector("#descp");

    newsImg.src = article.urlToImage;
    newsHeadline.innerHTML = article.title;
    newsDescp.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    newsSource.innerHTML = `${article.source.name} • ${date}`;

    contentClone.querySelector("#news_link_btn").addEventListener("click", () => {
        window.open(article.url, "_blank");
    })

}

