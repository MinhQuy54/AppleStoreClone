document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = {
            fullname: document.getElementById("fullname").value,
            email: document.getElementById("email").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            confirm_password: document.getElementById("cofirm_password").value
        };

        fetch("http://localhost:8000/api/auth/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("Đăng ký thành công ");
                    window.location.href = "login.html";
                }
            })
            .catch(err => {
                console.error(err);
                alert("Có lỗi xảy ra");
            });
    });
});
