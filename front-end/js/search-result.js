const params = new URLSearchParams(window.location.search);
const q = params.get("q");
const container = document.getElementById("search-result");

// Hiển thị trạng thái đang tải
container.innerHTML = `
    <div class="col-12 text-center py-5">
        <div class="spinner-border text-secondary" role="status"></div>
        <p class="mt-2 text-secondary">Đang tìm kiếm sản phẩm cho "${q}"...</p>
    </div>`;

fetch(`http://localhost:8000/api/product/search?q=${encodeURIComponent(q)}`)
    .then(res => {
        if (!res.ok) throw new Error("Lỗi kết nối Server");
        return res.json();
    })
    .then(data => renderProducts(data))
    .catch(err => {
        container.innerHTML = `<p class="text-center text-danger">Có lỗi xảy ra: ${err.message}</p>`;
    });

function renderProducts(products) {
    container.innerHTML = "";

    if (!products || products.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <span class="material-symbols-outlined fs-1 text-secondary">search_off</span>
                <p class="fs-5 mt-3">Rất tiếc, không tìm thấy sản phẩm nào khớp với từ khóa "${q}"</p>
                <a href="../home.html" class="btn btn-primary rounded-pill px-4">Quay lại trang chủ</a>
            </div>`;
        return;
    }

    products.forEach(p => {
        const imageUrl = `http://localhost:8000${p.image}`;

        container.innerHTML += `
        <div class="col-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100 border-0 shadow-sm product-card transition-all">
                <div class="position-relative overflow-hidden p-3" style="background: #f5f5f7;">
                    <img src="${imageUrl}" class="card-img-top object-fit-contain mt-3" 
                         alt="${p.productname}" style="height: 200px; transition: transform 0.5s ease;">
                </div>
                <div class="card-body text-center d-flex flex-column">
                    <h6 class="card-title mb-2 fw-semibold text-dark">${p.productname}</h6>
                    <p class="card-text text-danger fw-bold mt-auto">
                        ${Number(p.price).toLocaleString('vi-VN')} ₫
                    </p>
                    <button class="btn btn-outline-dark btn-sm rounded-pill mt-2">Xem chi tiết</button>
                </div>
            </div>
        </div>
        `;
    });
}