// const Trending_API_key = "pub_577574f79679ff0176758cf266b73293fcded" ;
// const Trending_API_url = "https://newsdata.io/api/1/latest?apikey=";

// window.addEventListener("load", () => fetchCountryNews("IN"));

// async function fetchCountryNews(query2) {
//     const res = await fetch(`${Trending_API_url}${Trending_API_key}&country=${query2}`)
//     const data = await res.json();
//     bindData(data.articles);
// }

async function fetchCountryNews(query2) {
    const res = await fetch(`${API_url}${API_key}&country=${query2}`)
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

// country search box
const countrySearchInput = document.getElementById('country_search_input');
const countrySearchBtn = document.getElementById('country_search_btn');

countrySearchBtn.addEventListener("click", () => {
    const c_query = countrySearchInput.value;
    if (!c_query){
        return
    }
    fetchCountryNews(c_query);
    selectedClickItem?.classList.remove('active');
    selectedClickItem = null;
})

// https://newsdata.io/api/1/news?apikey=pub_577574f79679ff0176758cf266b73293fcded&q=trending&country=al 