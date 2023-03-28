const menu_toggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
document.querySelector(".yr").textContent = (new Date().getFullYear());



menu_toggle.addEventListener("click", () => {
  menu_toggle.classList.toggle("is-active");
  sidebar.classList.toggle("is-active");
});
