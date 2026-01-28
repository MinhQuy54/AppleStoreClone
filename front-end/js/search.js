function initSearch() {
    document.getElementById("search-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const keyword = document.getElementById("search-input").value.trim();
        if (!keyword) return;

        window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;

    })

}