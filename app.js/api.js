const API_key = gnews.io API Key;
const API_url = "https://gnews.io/api/v4/search?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

function preLoader() {
  const elements =
    document.getElementsByClassName("loading-wave");
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
}

async function fetchNews(query) {
  const response = await fetch(
    `${API_url}${query}&lang=en&country=in&max=10&token=${API_key}`
  );
  const data = await response.json();
  console.log(data);
  bindData(data.articles);

  if (!data.articles || data.articles.length === 0) {
    alert("No news found for this topic.");
    return;
  }

  if (data.status == "ok") {
    console.log("here", response);
    const parentLoader =
      document.getElementById("parentLoader");
    while (parentLoader.firstChild) {
      parentLoader.removeChild(parentLoader.firstChild);

      const elements =
        document.getElementsByClassName("loading-wave");
      for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
    }
  } else {
    preLoader();
  }
}

function bindData(articles) {
  const contentscontainer = document.getElementById(
    "contents_container"
  );
  const contentstemplate = document.getElementById(
    "contents_template"
  );

  contentscontainer.innerHTML = "";

  articles.forEach((article) => {
    if (article.content === "[Removed]") {
      return;
    }
    if (!article.description) {
      return;
    }
    const contentClone =
      contentstemplate.content.cloneNode(true);
    fillDataContents(contentClone, article);
    contentscontainer.appendChild(contentClone);
  });
}

function isValidImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }

async function fillDataContents(contentClone, article) {
  const newsImg = contentClone.querySelector("#news_img");
  const newsHeadline =
    contentClone.querySelector("#headline");
  const newsSource = contentClone.querySelector("#source");
  const newsDescp = contentClone.querySelector("#descp");

  const imageUrl = article?.image;
  if (await isValidImage(imageUrl)) {
    newsImg.src = imageUrl;
  } else {
    newsImg.src = "/Images/company_logo.png";
  }
  //   newsImg.src = article?.image || "company_logo.png";
    
  newsHeadline.innerHTML = article?.title;
  newsDescp.innerHTML = article?.description;

  const date = new Date(article.publishedAt).toLocaleString(
    "en-US",
    { timeZone: "Asia/Jakarta" }
  );
  newsSource.innerHTML = `${article.source.name} • ${date}`;

  contentClone
    .querySelector("#news_link_btn")
    .addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
}

window.addEventListener("load", () => {
  const foot = document.querySelector("footer");
  foot.style.opacity = 1;
});

let selectedClickItem = null;
function onCatClick(id) {
  fetchNews(id);
  const clickItem = document.getElementById(id);
  selectedClickItem?.classList.remove("active");
  selectedClickItem = clickItem;
  selectedClickItem.classList.add("active");
}

// content search box
const contSearchInput = document.getElementById(
  "cont_search_input"
);
const contSearchBtn = document.getElementById(
  "cont_search_btn"
);

contSearchBtn.addEventListener("click", () => {
  const query = contSearchInput.value;
  if (!query) {
    return;
  }
  fetchNews(query);
  selectedClickItem?.classList.remove("active");
  selectedClickItem = null;
});

const countrySearchInput = document.getElementById(
  "country_search_input"
);
const countrySearchBtn = document.getElementById(
  "country_search_btn"
);

countrySearchBtn.addEventListener("click", () => {
  const c_query = countrySearchInput.value;
  if (!c_query) {
    return;
  }
  fetchNews(c_query);
  selectedClickItem?.classList.remove("active");
  selectedClickItem = null;
});
