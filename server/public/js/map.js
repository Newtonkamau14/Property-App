let url = window.location.href.split("/");
let property_id = url[url.length - 1];
console.log(property_id);

let map = document.getElementById("map");

/* fetch(`/showproperty/${property_id}`)
.then(response => response.json())
.then(property => {
    console.log(property)
    property.forEach(element => {

        map = L.map("map", {
            renderer: L.svg(),
          }).setView([element.geometry.latitude,element.geometry.longitude], 16);
          
          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(map);
          
          var marker = L.marker([element.geometry.latitude,element.geometry.longitude]).addTo(map);
          
          var popup = L.popup()
            .setLatLng([element.geometry.latitude,element.geometry.longitude])
            .setContent(element.property_name)
            .openOn(map);

        var marker = L.marker([element.geometry.latitude,element.geometry.longitude])
            .addTo(map);
        var popup = L.popup()
        .setLatLng([element.geometry.latitude,element.geometry.longitude])
        .setContent(element.property_name) // Assuming a 'content' property
        .openOn(map);  
    });
})
.catch(error => console.log(error)) */

map = L.map("map", {
    renderer: L.svg(),
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

async function fetchAndUpdateMarker(property_id) {
  try {
    const response = await fetch(`http://localhost:5000/showproperty/${property_id}`);
    const property = await response.json();

    console.log(property)
    if (property) {
      /* map = L.map("map", {
        renderer: L.svg(),
      }).setView([property.geometry.latitude, property.geometry.longitude], 16);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
 */
      const marker = L.marker([
        property.geometry.latitude,
        property.geometry.longitude,
      ]).addTo(map);

      const popup = L.popup()
        .setLatLng([property.geometry.latitude, property.geometry.longitude])
        .setContent(property.property_name)
        .openOn(map);

      // Store a reference to the marker and popup for later updates
      markerData[property_id] = { marker, popup };
    }
  } catch (error) {
    console.log(error);
  }
}

// Example usage:
fetchAndUpdateMarker(property_id);
