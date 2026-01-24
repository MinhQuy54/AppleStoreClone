document.addEventListener("DOMContentLoaded", () => {
    const accessToken = localStorage.getItem("access");
    const username = localStorage.getItem("username");

    const navLogin = document.getElementById("nav-login");
    const navUser = document.getElementById("nav-user");
    const navUsername = document.getElementById("nav-username");

    if (accessToken) {
        // Đã đăng nhập
        navLogin.classList.add("d-none");
        navUser.classList.remove("d-none");
        navUsername.innerText = username || "User";
    } else {
        // Chưa đăng nhập
        navLogin.classList.remove("d-none");
        navUser.classList.add("d-none");
    }
});


function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    alert("Đã đăng xuất thành công!");

    // 2. Chuyển hướng thông minh
    // Dùng '/' để trình duyệt luôn hiểu là quay về trang chủ từ thư mục gốc
    window.location.href = "./home.html";

    // HOẶC nếu bạn đang chạy local file (không có server) thì dùng:
    // window.location.href = "home.html";
}