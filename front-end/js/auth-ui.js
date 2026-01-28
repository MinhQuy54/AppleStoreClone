function initAuthUI() {
    const token = localStorage.getItem("access");

    const navLogin = document.getElementById("nav-login");
    const navUser = document.getElementById("nav-user");
    const navUsername = document.getElementById("nav-username");

    if (!navLogin || !navUser) {
        console.error("Không tìm thấy element nav!");
        return;
    }

    if (token) {
        navLogin.classList.add("d-none");
        navUser.classList.remove("d-none");

        const username = localStorage.getItem("username");
        if (username) {
            navUsername.innerText = username;
        } else {
            fetch("http://localhost:8000/api/auth/me/", {
                headers: { Authorization: "Bearer " + token }
            })
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem("username", user.username);
                    navUsername.innerText = user.username;
                })
                .catch(() => logout());
        }
    } else {
        navLogin.classList.remove("d-none");
        navUser.classList.add("d-none");
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "home.html";
}
