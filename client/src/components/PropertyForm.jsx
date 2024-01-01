import "bootstrap/dist/css/bootstrap.min.css";

function PropertyForm() {
  return (
    <>
      <form
        action="/admin/addproperty"
        method="post"
        className="border rounded p-3 col-6"
        encType="multipart/htmlForm-data"
      >
        <div className="htmlForm-group my-4">
          <label htmlFor="propertyname">Property Name</label>
          <input
            type="text"
            className="htmlForm-control"
            id="propertyname"
            name="property_name"
            placeholder="Enter property name"
          />
        </div>
        <div className="htmlForm-group my-4">
          <label htmlFor="propertylocation">Property Location</label>
          <input
            type="text"
            className="htmlForm-control"
            id="propertylocation"
            name="property_location"
            placeholder="Enter property location"
          />
        </div>
        <div className="htmlForm-group my-4">
          <label htmlFor="propertyprice">Property Price</label>
          <input
            type="text"
            className="htmlForm-control"
            id="propertyprice"
            name="property_price"
            placeholder="Enter property price"
          />
        </div>
        <div className="htmlForm-group my-4">
          <label htmlFor="propertyimage">Main Property Image</label>
          <input
            type="file"
            className="htmlForm-control"
            id="propertyimage"
            name="property_image"
            placeholder="Enter property image"
          />
        </div>
        <div className="htmlForm-group my-4">
          <label htmlFor="propertytype">Property Type</label>
          <select
            className="htmlForm-select"
            aria-label="Default select example"
            name="property_type"
          >
            <option selected>Open this select menu</option>
            <option value="Studio Apartments">Studio Apartments</option>
            <option value="Single Rooms">Single Rooms</option>
            <option value="1,2,3 Bedrooms">1,2,3 Bedrooms</option>
          </select>
        </div>
        <div className="htmlForm-group my-4">
          <label htmlFor="propertypurpose">Property Purpose</label>
          <select
            className="htmlForm-select"
            aria-label="Default select example"
            name="property_purpose"
          >
            <option selected>Open this select menu</option>
            <option value="htmlFor sale">htmlFor sale</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        <div className="htmlForm-group my-4">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            className="htmlForm-control"
            name="longitude"
            id="longitude"
            placeholder="Enter longitude"
          />
        </div>
        <div className="htmlForm-group my-4">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            className="htmlForm-control"
            name="latitude"
            id="latitude"
            placeholder="Enter latitude"
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Add Property
        </button>
        
      </form>
    </>
  );
}

export default PropertyForm;
