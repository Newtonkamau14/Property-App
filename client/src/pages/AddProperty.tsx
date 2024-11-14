import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

function AddProperty() {
  const [property_name, setproperty_name] = useState<string>("");
  const [property_location, setproperty_location] = useState<string>("");
  const [property_price, setproperty_price] = useState<string>("");
  const [property_type, setproperty_type] = useState<string>("");
  const [property_purpose, setproperty_purpose] = useState<string>("");

  return (
    <div>
      <form className="border rounded p-3 col-6" encType="multipart/form-data">
        <div className="form-group my-4">
          <label htmlFor="propertyname">Property Name</label>
          <input
            type="text"
            className="form-control"
            id="propertyname"
            name="property_name"
            placeholder="Enter property name"
            onChange={(e) => setproperty_name(e.target.value)}
            value={property_name}
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="propertylocation">Property Location</label>
          <input
            type="text"
            className="form-control"
            id="propertylocation"
            name="property_location"
            placeholder="Enter property location"
            onChange={(e) => setproperty_location(e.target.value)}
            value={property_location}
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="propertyprice">Property Price</label>
          <input
            type="text"
            className="form-control"
            id="propertyprice"
            name="property_price"
            placeholder="Enter property price"
            onChange={(e) => setproperty_price(e.target.value)}
            value={property_price}
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="propertyimage">Main Property Image</label>
          <input
            type="file"
            className="form-control"
            id="propertyimage"
            name="property_image"
            placeholder="Enter property image"
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="propertytype">Property Type</label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="property_type"
            onChange={(e) => setproperty_type(e.target.value)}
            value={property_type}
          >
            <option selected>Open this select menu</option>
            <option value="Studio Apartments">Studio Apartments</option>
            <option value="Single Rooms">Single Rooms</option>
            <option value="1,2,3 Bedrooms">1,2,3 Bedrooms</option>
          </select>
        </div>
        <div className="form-group my-4">
          <label htmlFor="propertypurpose">Property Purpose</label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="property_purpose"
            onChange={(e) => setproperty_purpose(e.target.value)}
            value={property_purpose}
          >
            <option selected>Open this select menu</option>
            <option value="For sale">For sale</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        <div className="form-group my-4">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            className="form-control"
            name="longitude"
            id="longitude"
            placeholder="Enter longitude"
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            className="form-control"
            name="latitude"
            id="latitude"
            placeholder="Enter latitude"
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Add Property
        </button>
      </form>
      <MapContainer center={[-0.0236,18.9062]}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default AddProperty;
