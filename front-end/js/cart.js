document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

function loadCart() {
    const token = localStorage.getItem("access");

    if (!token) {
        alert("Vui lòng đăng nhập để xem giỏ hàng");
        localStorage.setItem("redirect_after_login", window.location.pathname);
        window.location.href = "../page/login.html";
        return;
    }

    fetch("http://localhost:8000/api/cart/", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(res => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then(cart => renderCart(cart))
        .catch(err => {
            console.error(err);
            alert("Phiên đăng nhập hết hạn");
            window.location.href = "../page/login.html";
        });
}

function renderCart(cart) {
    const container = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total-amount");

    container.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        const price = item.product.price;
        const quantity = item.quantity;
        const itemTotal = price * quantity;
        subtotal += itemTotal;

        container.innerHTML += `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-3">
                        <img src="http://localhost:8000${item.product.image}" class="cart-img">
                        <div>
                            <div class="fw-bold">${item.product.productname}</div>
                        </div>
                    </div>
                </td>
                <td>${formatPrice(price)}đ</td>
                <td>
                    <input type="number"
                        class="qty-input"
                        value="${quantity}"
                        min="1"
                        onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td class="fw-bold">${formatPrice(itemTotal)}đ</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger"
                        onclick="removeFromCart(${item.id})">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </td>
            </tr>
        `;
    });

    subtotalEl.innerText = formatPrice(subtotal) + "đ";
    totalEl.innerText = formatPrice(subtotal) + "đ";
}

function formatPrice(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
}

function removeFromCart(cartItemId) {

    const token = localStorage.getItem("access");
    fetch(`http://localhost:8000/api/cart/${cartItemId}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (res.status == 204) {
                alert("Da xoa san pham thanh cong");
                loadCart();
            }
            else if (res.status == 401) {
                alert("Phien dang nhap het han");
            } else {
                alert("Co loi khi xoa san pham");
            }
        })
        .catch(err => {
            console.error("Error deleting item: ", err);
            alert("Loi ket noi may chu");
        })
}

function updateQuantity(cartItemId, newQuantity) {
    if (newQuantity < 1) {
        alert("Số lượng tối thiểu là 1");
        loadCart();
        return;
    }

    const token = localStorage.getItem("access");

    fetch(`http://localhost:8000/api/cart/${cartItemId}`, {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quantity: newQuantity
        })
    })
        .then(res => {
            if (res.ok) {
                console.log("Updated successfully");
                loadCart();
            } else {
                throw new Error("Update failed");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Không thể cập nhật số lượng");
        });
}