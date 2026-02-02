document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadProductsTet();

    const path = window.location.pathname;
    // /front-end/page/product/product-mac.html

    let name = "";

    if (path.includes("product-iphone")) name = "iphone";
    else if (path.includes("product-mac")) name = "mac";
    else if (path.includes("product-ipad")) name = "ipad";
    else if (path.includes("product-airpod")) name = "airpod";
    else if (path.includes("product-watch")) name = "watch";

    switch (name) {
        case "iphone":
        case "mac":
        case "ipad":
        case "airpod":
        case "watch":
            loadName(name);
            break;
        default:
            break;
    }
});


function loadProducts() {
    fetch("http://localhost:8000/api/product?new=true")
        .then(res => res.json())
        .then(products => {
            const container = document.getElementById("product-list-new");
            container.innerHTML = "";

            products.forEach(p => {
                const price = new Intl.NumberFormat('vi-VN').format(p.price);
                container.innerHTML += `
                    <div class="col-xl-3 col-lg-4 col-md-6 col-12"> <a href="detail.html?id=${p.id}" class="text-decoration-none text-dark">
                            <div class="card product-card p-4 h-100 border-0 shadow-sm" style="border-radius: 24px; transition: transform 0.3s ease;">
                                <div class="card-body d-flex flex-column align-items-center text-center">
                                    <div style="height: 180px; width: 100%;" class="d-flex align-items-center justify-content-center mb-4">
                                        <img src="http://localhost:8000${p.image}" class="img-fluid" style="max-height: 100%; width: auto; object-fit: contain;">
                                    </div>
                                    <h5 class="fw-bold mb-2" style="font-size: 1.2rem; min-height: 3rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                        ${p.productname}
                                    </h5>
                                    <p class="text-primary small fw-bold mb-3">Apple Intelligence</p>
                                    <p class="card-text fw-semibold" style="font-size: 1.1rem;">${price}đ</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            });
        });
}

function loadProductsTet() {
    fetch("http://localhost:8000/api/product?")
        .then(res => res.json())
        .then(products => {
            const container = document.getElementById("product-list-tet");
            container.innerHTML = "";

            products.forEach(p => {
                const price = new Intl.NumberFormat('vi-VN').format(p.price);
                container.innerHTML += `
                     <div class="col-xl-3 col-lg-4 col-md-6 col-12"> <a href="detail.html?id=${p.id}" class="text-decoration-none text-dark">
                            <div class="card product-card p-4 h-100 border-0 shadow-sm" style="border-radius: 24px; transition: transform 0.3s ease;">
                                <div class="card-body d-flex flex-column align-items-center text-center">
                                    <div style="height: 180px; width: 100%;" class="d-flex align-items-center justify-content-center mb-4">
                                        <img src="http://localhost:8000${p.image}" class="img-fluid" style="max-height: 100%; width: auto; object-fit: contain;">
                                    </div>
                                    <h5 class="fw-bold mb-2" style="font-size: 1.2rem; min-height: 3rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                        ${p.productname}
                                    </h5>
                                    <p class="text-primary small fw-bold mb-3">Apple Intelligence</p>
                                    <p class="card-text fw-semibold" style="font-size: 1.1rem;">${price}đ</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            });
        });
}

function loadName(name) {
    fetch(`http://localhost:8000/api/productname?name=${name}`)
        .then(res => res.json())
        .then(products => {
            const container = document.getElementById(`${name}-list`);
            let htmlContent = "";

            products.forEach(p => {
                const price = new Intl.NumberFormat('vi-VN').format(p.price);

                htmlContent += `
                     <div class="col-xl-3 col-lg-4 col-md-6 col-12 mb-4"> 
                        <a href="../detail.html?id=${p.id}" class="text-decoration-none text-dark">
                            <div class="card product-card p-4 h-100 border-0 shadow-sm" style="border-radius: 24px; transition: transform 0.3s ease;">
                                <div class="card-body d-flex flex-column align-items-center text-center">
                                    <div style="height: 180px; width: 100%;" class="d-flex align-items-center justify-content-center mb-4">
                                        <img src="http://localhost:8000${p.image}" class="img-fluid" style="max-height: 100%; width: auto; object-fit: contain;">
                                    </div>
                                    <h5 class="fw-bold mb-2" style="font-size: 1.2rem; min-height: 3rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                        ${p.productname}
                                    </h5>
                                    <p class="text-primary small fw-bold mb-3">Apple Intelligence</p>
                                    <p class="card-text fw-semibold" style="font-size: 1.1rem;">${price}đ</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            });

            container.innerHTML = htmlContent;
        })
        .catch(err => console.error("Lỗi tải dữ liệu:", err));
}