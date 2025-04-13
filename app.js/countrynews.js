const countrySearchInput = document.getElementById('country_search_input');
const countrySearchBtn = document.getElementById('country_search_btn');

countrySearchBtn.addEventListener("click", () => {
    const c_query = countrySearchInput.value;
    if (!c_query){
        return
    }
    fetchNews(c_query);
    selectedClickItem?.classList.remove('active');
    selectedClickItem = null;
})
