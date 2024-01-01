function Property() {
  return (
    <>
      <h3 className="house-type-title">Property Type</h3>
      <div className="row row-cols-3 row-cols-md-4 g-4">
        <div className="col">
          <a href="/showproperty/property_id" className="card h-100 card-house">
            <img src="" alt="house image" />
            <div className="card-body">
              <h4 className="card-title">Property Name</h4>
              <p className="card-text">Property Type</p>
              <p className="card-house-location">Property Location</p>
              <p className="card-house-price">Price</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Property;
