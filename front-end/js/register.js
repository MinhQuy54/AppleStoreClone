const API_BASE = "http://localhost:8000/api";

document.getElementById("sendOtpBtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;

    if (!email) {
        alert("Vui lòng nhập email");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/auth/send-otp/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Gửi OTP thất bại");
            return;
        }

        alert("OTP đã gửi về email 📩");
    } catch (err) {
        alert("Lỗi kết nối server");
    }
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        confirm_password: document.getElementById("confirm_password").value,
        otp: document.getElementById("otp").value
    };

    try {
        const res = await fetch(`${API_BASE}/auth/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Đăng ký thất bại");
            return;
        }

        alert("Đăng ký thành công 🎉");
        window.location.href = "login.html";

    } catch (err) {
        alert("Lỗi kết nối server");
    }
});
