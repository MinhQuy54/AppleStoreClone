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
    const oldPrice = new Intl.NumberFormat('vi-VN').format(p.price * 1.15); // Giá ảo để hiện giảm giá

    document.getElementById("product-detail").innerHTML = `
        <div class="container my-4">
            <nav aria-label="breadcrumb" class="mb-4">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="../home.html" class="text-secondary text-decoration-none">Home</a></li>
                    <li class="breadcrumb-item text-dark fw-bold" aria-current="page">${p.productname}</li>
                </ol>
            </nav>

            <div class="row g-5">
                <div class="col-lg-7">
                    <div class="d-flex flex-column align-items-center">
                        <div class="main-image-bg p-5 rounded w-100 d-flex justify-content-center">
                            <img src="http://localhost:8000${p.image}" class="img-fluid"
                                style="max-height: 500px; mix-blend-mode: multiply;">
                        </div>
                    </div>
                </div>

                <div class="col-lg-5">
                    <h2 class="fw-bold mb-2">${p.productname}</h2>
                    <div class="mb-3">
                        <span class="text-success fw-bold me-2">${p.status == 1 ? 'In Stock' : 'Out of Stock'}</span>
                        <span class="text-muted">| 4.5 Stars (150 Reviews)</span>
                    </div>

                    <div class="fs-3 fw-bold mb-3">
                        ${price}đ
                        <span class="fs-5 text-muted text-decoration-line-through ms-2">${oldPrice}đ</span>
                    </div>

                    <p class="text-muted mb-4 border-bottom pb-3">
                        ${p.description}
                    </p>

                    <div class="mb-4">
                        <h6 class="fw-bold">Colours:</h6>
                        <div class="d-flex gap-2">
                            <button class="product-variant-btn active">Trắng</button>
                            <button class="product-variant-btn">Sa mạc</button>
                            <button class="product-variant-btn">Đen</button>
                        </div>
                    </div>

                    <div class="mb-4">
                        <h6 class="fw-bold">ROM:</h6>
                        <div class="d-flex gap-2">
                            <button class="product-variant-btn">128GB</button>
                            <button class="product-variant-btn active">256GB</button>
                            <button class="product-variant-btn">512GB</button>
                        </div>
                    </div>

                    <div class="d-flex align-items-center gap-3 mb-4">
                        <div class="qty-container">
                            <button class="qty-btn" onclick="this.nextElementSibling.value--">-</button>
                            <input type="text" value="1" class="qty-input">
                            <button class="qty-btn" onclick="this.previousElementSibling.value++">+</button>
                        </div>
                        <button class="btn btn-danger flex-grow-1 py-2 fw-bold" style="background-color: #db4444; border:none;">
                            Add To Cart
                        </button>
                        <button class="btn btn-outline-dark px-3 py-2">
                            <span class="material-symbols-outlined align-middle">favorite</span>
                        </button>
                    </div>

                    <button class="btn btn-outline-danger w-100 py-2 fw-bold mb-4">Buy Now</button>
                </div >
            </div >
        </div >
    `;
}