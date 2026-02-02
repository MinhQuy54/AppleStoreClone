document.addEventListener("DOMContentLoaded", () => {
    setupMegaMenu("ipad");
    setupMegaMenu("mac");
    setupMegaMenu("watch");
    setupMegaMenu("airpod");
    setupMegaMenu("iphone");
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
    fetch(`../component/mega-menu/mega-menu-${type}.html`)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById(`mega-${type}`);
            container.innerHTML = html;

            const menu = container.querySelector(".apple-mega-menu");
            container.closest(".apple-mega").appendChild(menu);
            container.remove();

            loadCategories(type);
        });
}

function loadCategories(type) {
    fetch(`http://localhost:8000/api/productname?name=${type}`)
        .then(res => {
            if (!res.ok) throw new Error("API error");
            return res.json();
        })
        .then(categories => {
            const list = document.getElementById(`${type}-product-list`);
            console.log(type, list);
            if (!list) return;

            list.innerHTML = `
                <li class="fw-semibold">
                    <a href="../page/product/product-${type}.html">
                        Khám Phá Tất Cả ${type.toUpperCase()}
                    </a>
                </li>
                `;

            categories.slice(0, 5).forEach(c => {
                list.innerHTML += `
                <li>
                    <a href="./detail.html?id=${c.id}">
                        ${c.productname}
                    </a>
                </li>
                `;
            });
        })
        .then(categories => {
            console.log(type, categories)
        })
        .catch(err => console.error("Load category error:", err));
}