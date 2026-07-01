const moonButton = document.getElementById("button-lua");
const sunButton = document.getElementById("button-sol");

// Carrega o tema salvo
if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark");
}

if (moonButton) {
    moonButton.addEventListener("click", () => {
        document.body.classList.add("dark");
        localStorage.setItem("tema", "dark");
    });
}

if (sunButton) {
    sunButton.addEventListener("click", () => {
        document.body.classList.remove("dark");
        localStorage.setItem("tema", "light");
    });
}