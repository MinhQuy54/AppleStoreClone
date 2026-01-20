document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) return;

    fetch(`http://localhost:8000/api/product/${productId}`)
        .then(res => res.json())
        .then(p => renderProduct(p))
        .catch(err => console.error(err));
});

function renderProduct(p) {
    const price = new Intl.NumberFormat('vi-VN').format(p.price);

    document.getElementById("product-detail").innerHTML = `
        <div class="col-md-6">
            <img src="http://localhost:8000${p.image}" class=""
            style="
                max-width: 420px;
                width: 100%;
                display: block;
                margin: auto;
            "
            >
        </div>

        <div class="col-md-6">
            <h1 class="fw-bold">${p.productname}</h1>
            <p class="text-muted">${p.description || ""}</p>
            <h3 class="my-4">${price}đ</h3>

            <div class="d-flex gap-3">
                <button class="btn btn-outline-dark px-4" onclick="addToCart(${p.id})">
                    Thêm vào giỏ
                </button>

                <button class="btn btn-dark px-4" onclick="buyNow(${p.id})">
                    Mua ngay
                </button>
            </div>
        </div>
        <div class="pt-4">
            <h3>Thông số chi tiết</h3>
            <p>${p.detail}</p>
        </div>

        
    `;
}
