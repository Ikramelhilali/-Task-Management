const users = [
    { username: "ikram", password: "1234" },
    { username: "admin", password: "admin" }
];

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html";
    } else {
        error.textContent = "Invalid username or password";
    }
}