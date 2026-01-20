document.addEventListener("DOMContentLoaded", () => {
    setupMegaMenu("iphone");
    setupMegaMenu("ipad");
    setupMegaMenu("mac");
    setupMegaMenu("watch");
});

function setupMegaMenu(type) {
    const navItem = document.querySelector(`.apple-mega[data-mega="${type}"]`);
    if (!navItem) return;

    let loaded = false;

    navItem.addEventListener("mouseenter", () => {
        if (!loaded) {
            loadMegaMenu(type);
            loaded = true;
        }
    });
}

function loadMegaMenu(type) {
    fetch(`component/mega-menu/mega-menu-${type}.html`)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById(`mega-${type}`);
            container.innerHTML = html;
            loadCategories(type);
        })
        .catch(err => console.error("Load mega HTML error:", err));
}

function loadCategories(type) {
    fetch(`http://localhost:8000/api/category?type=${type}`)
        .then(res => res.json())
        .then(categories => {
            const list = document.getElementById(`${type}-category-list`);
            if (!list) return;

            categories.forEach(c => {
                list.innerHTML = `
                <li class="fw-semibold">
                    <a href="page/product/product-${type}.html">
                        Khám Phá Tất Cả ${type.toUpperCase()}
                    </a>
                </li>
            `;
            });

            categories.forEach(c => {
                list.innerHTML += `
                    <li>
                        <a href="page/detail.html?id=${c.id}">
                            ${c.categoryname}
                        </a>
                    </li>
                `;
            });
        })
        .catch(err => console.error("Load category error:", err));
}
