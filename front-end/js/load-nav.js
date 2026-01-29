fetch('../component/nav.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById("nav-container").innerHTML = html;

        initAuthUI();
        initSearch();

        ["mac", "ipad", "watch", "iphone", "airpod"].forEach(setupMegaMenu);
    });