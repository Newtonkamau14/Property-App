document.querySelector(".yr").textContent = new Date().getFullYear();

let map = document.getElementById("map");

map = L.map("map", {
  renderer: L.svg(),
}).setView([-1.3241063562821818, 36.79701692712248], 16);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([-1.3241063562821818, 36.79701692712248]).addTo(map);

var popup = L.popup()
  .setLatLng([-1.3241063562821818, 36.79701692712248])
  .setContent("Langata Road")
  .openOn(map);
// marker.bindPopup("<b></b")
let url = window.location.href.split('/')
console.log(url[url.length - 1])

