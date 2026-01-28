document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch("http://localhost:8000/api/auth/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                localStorage.setItem("access", data.access);
                localStorage.setItem("refresh", data.refresh);
                if (data.username) localStorage.setItem("username", data.username);

                const redirect = localStorage.getItem("redirect_after_login") || "home.html";
                localStorage.removeItem("redirect_after_login");

                alert("Đăng nhập thành công");
                window.location.href = redirect;
            })
            .catch(() => alert("Đăng nhập thất bại"));
    });
});
