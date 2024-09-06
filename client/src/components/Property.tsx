import { PropertyProps } from "../models/property";

function Property({ property }: PropertyProps) {
  return (
    <>
      <a
        key={property.property_id}
        href={`/showproperty/${property.property_id}`}
        className="card h-100 card-house"
      >
        <img src={property.property_image} alt="house image" />
        <div className="card-body">
          <h4 className="card-title">{property.property_name}</h4>
          <p className="card-text">{property.property_type}</p>
          <p className="card-house-location">{property.property_location}</p>
          <p className="card-house-price">
            Ksh {property.property_price.toLocaleString("en-UK")}
          </p>
        </div>
      </a>
    </>
  );
}

export default Property;
