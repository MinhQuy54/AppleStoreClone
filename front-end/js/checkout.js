const API_BASE = "http://127.0.0.1:8000";
const token = localStorage.getItem("access");

if (!token) {
    alert("Dang nhap de duoc thanh toan !");
    window.location.href = "login.html"
}

let totalAmount = 0;

async function loadCart() {
    try {
        const res = await fetch(`${API_BASE}/api/cart/`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        if (!res.ok) {
            throw new Error("Khong the tai gio hang");
        }
        const cartItems = await res.json();
        const container = document.getElementById("order-summary-items");
        container.innerHTML = "";
        totalAmount = 0;

        if (cartItems.length === 0) {
            container.innerHTML = `<p class="text-muted">Giỏ hàng trống</p>`;
            return;
        }

        cartItems.forEach(item => {
            const itemTotal = item.product.price * item.quantity;
            totalAmount += itemTotal;
            container.innerHTML += `
                <div class="d-flex justify-content-between mb-2">
                    <small>${item.product.productname} x ${item.quantity}</small>
                    <small>${itemTotal.toLocaleString()}đ</small>
                </div>
            `;
        });

        document.getElementById("subtotal").innerText = totalAmount.toLocaleString() + "đ";
        document.getElementById("total-amount").innerText = totalAmount.toLocaleString() + "đ";
    }
    catch (err) {
        console.error(err);
        alert("Lỗi tải giỏ hàng");
    }
}

loadCart();


document.getElementById("checkout-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const address = document.querySelector("textarea").value.trim();
    const paymentMethod = document.querySelector(
        'input[name="paymentMethod"]:checked'
    ).value;

    if (!address) {
        alert("Vui long nhap dia chi giao hang");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/api/order/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                address: address,
                payment_method: paymentMethod
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Đặt hàng thất bại");
            return;
        }

        if (paymentMethod === "momo") {
            if (!data.payUrl) {
                alert("Không lấy được link thanh toán MoMo");
                console.error(data);
                return;
            }
            window.location.href = data.payUrl;
            return;

        } else if (paymentMethod === "vnpay") {
            alert("Chuyển sang thanh toán VNPAY (mock)");
        }

        window.location.href = "home.html";
        alert("Đặt hàng thành công!");
    } catch (err) {
        console.error(err);
        alert("Lỗi khi thanh toán");
    }
});