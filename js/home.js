function reload(){
    window.location.reload();
}

// for footer during loading
window.addEventListener("load", () => {
    const foot = document.querySelector("footer");
    foot.style.opacity = 1;
});


// for item_click or nav items active state -
let selectedClickItem = null;
function onCatClick(id){
    fetchNews(id);
    const clickItem = document.getElementById(id);
    selectedClickItem?.classList.remove('active');
    selectedClickItem = clickItem;
    selectedClickItem.classList.add('active');
}

// content search box
const contSearchInput = document.getElementById('cont_search_input');
const contSearchBtn = document.getElementById('cont_search_btn');

contSearchBtn.addEventListener("click", () => {
    const query = contSearchInput.value;
    if (!query){
        return
    }
    fetchNews(query);
    selectedClickItem?.classList.remove('active');
    selectedClickItem = null;
})

