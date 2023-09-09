// Dark Mode
const changeThemeBtn = document.querySelector("#change-theme")

changeThemeBtn.addEventListener("change", function() {
    document.body.classList.toggle("dark");
    document.getElementById("table").classList.toggle("table-dark");
});