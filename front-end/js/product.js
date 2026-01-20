document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadProductsTet();
});

function loadProducts() {
    fetch("http://localhost:8000/api/product")
        .then(res => res.json())
        .then(products => {
            const container = document.getElementById("product-list-new");
            const wrapper = document.getElementById("scroll-container");
            container.innerHTML = "";

            products.forEach(p => {
                const price = new Intl.NumberFormat('vi-VN').format(p.price);
                container.innerHTML += `
                     <div class="col-lg-3">
                        <a href="page/detail.html?id=${p.id}" class="text-decoration-none text-dark">
                            <div class="card product-card p-4 h-100 border-0 shadow-sm" style="border-radius: 20px; min-width: 300px;">
                                <div class="card-body">
                                    <img src="http://localhost:8000${p.image}" class="img-fluid mb-3">
                                    <h5 class="fw-bold">${p.productname}</h5>
                                    <p class="text-primary small fw-bold">Apple Intelligence</p>
                                    <p class="card-text">${price}đ</p>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            });

            initScrollControls(wrapper);
        });
}


function initScrollControls(wrapper) {
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    const scrollAmount = 350; // Khoảng cách mỗi lần cuộn

    btnNext.addEventListener("click", () => {
        wrapper.scrollLeft += scrollAmount;
    });

    btnPrev.addEventListener("click", () => {
        wrapper.scrollLeft -= scrollAmount;
    });
}