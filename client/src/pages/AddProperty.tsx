import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import axiosInstance from "../api/axios";
import { usePropertiesContext } from "../hooks/usePropertiesContext";

function AddProperty() {
  const { dispatch } = usePropertiesContext();
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: -1.2802582028021525,
    lng: 36.82516939299642,
  });
  const [property_name, setproperty_name] = useState<string>("");
  const [property_location, setproperty_location] = useState<string>("");
  const [property_price, setproperty_price] = useState<string>("");
  const [property_type, setproperty_type] = useState<string>("");
  const [property_purpose, setproperty_purpose] = useState<string>("");
  const [latitude, setlatitude] = useState<string>(position.lat.toString());
  const [longitude, setlongitude] = useState<string>(position.lng.toString());
  const [error, setError] = useState<string | null>(null);

  // Custom hook to handle map events and update position
  function MapEventHandler({
    onPositionChange,
  }: {
    onPositionChange: (pos: { lat: number; lng: number }) => void;
  }) {
    useMap().on("moveend", (e) => {
      const center = e.target.getCenter();
      onPositionChange({ lat: center.lat, lng: center.lng });
    });
    return null;
  }

  // Update position from input fields
  const updatePositionFromInputs = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      setPosition({ lat, lng });
    } else {
      alert("Please enter valid coordinates.");
    }
  };

  useEffect(() => {
    setlatitude(position.lat.toString());
    setlongitude(position.lng.toString());
  }, [position]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById("propertyimage") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    formData.append("property_name", property_name);
    formData.append("property_location", property_location);
    formData.append("property_price", property_price);
    if (file) formData.append("property_image", file);
    formData.append("property_type", property_type);
    formData.append("property_purpose", property_purpose);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);

    try {
      const response = await axiosInstance.post(
        "/admin/addproperty",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setproperty_name("");
        setproperty_location("");
        setproperty_price("");
        setproperty_type("");
        setproperty_purpose("");
        setlongitude("");
        setlatitude("");
        dispatch({ type: "CREATE_PROPERTY", payload: response.data });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An error occurred";
        setError(message);
      } else {
        setError("An error occurred while adding the workout");
      }
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form
        className="border rounded p-3 col-6"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
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
            value={longitude}
            onChange={(e) => setlongitude(e.target.value)}
            onBlur={updatePositionFromInputs}
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
            value={latitude}
            onChange={(e) => setlatitude(e.target.value)}
            onBlur={updatePositionFromInputs}
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Add Property
        </button>
      </form>
      <div
        className="map"
        style={{ marginTop: "1.5rem", marginBottom: "1rem" }}
      >
        <h3>Select the coordinates of the property by dragging the marker</h3>
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[position.lat, position.lng]}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const { lat, lng } = marker.getLatLng();
                setPosition({ lat, lng });
              },
            }}
          >
            <Popup>
              Current Position: {position.lat.toFixed(3)},{" "}
              {position.lng.toFixed(3)}
            </Popup>
          </Marker>
          <MapEventHandler onPositionChange={setPosition} />
        </MapContainer>
      </div>
    </div>
  );
}

export default AddProperty;
