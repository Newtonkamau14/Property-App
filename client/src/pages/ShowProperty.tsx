import { useEffect, useState } from "react";
import { IProperty } from "../models/property";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

function ShowProperty() {
  const { property_id } = useParams<{ property_id: string }>();
  const [property, setProperty] = useState<IProperty>({} as IProperty);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`/properties/showproperty/${property_id}`)
      .then((response) => {
        setLoading(true);
        setProperty(response.data.property);
        setLoading(false);
      })
      .catch((error) => {
        const message = error.response?.data?.message || "An error occurred";
        setErrorMessage(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [property_id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="d-flex justify-content-center">
        <p>{errorMessage}</p>
      </div>
    );
  }
  return (
    <div className="main-container">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src={property.property_image}
              alt="..."
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">{property.property_name}</h1>
            <p>{property.property_type}</p>
            <p>{property.property_location}</p>
            <p>{property.property_price}</p>
            <p className="text-primary">{property.property_purpose}</p>
          </div>
        </div>
        <div className="card text-white bg-secondary my-5 py-4 text-center">
          <div className="card-body">
            <p className="card-text">Last updated 3 mins ago</p>
          </div>
        </div>

        <h1 className="font-weight-light m-4">Location</h1>

        <div id="map"></div>

        <h1 className="font-weight-light m-4">Other Pictures</h1>
        <div className="row gx-4 gx-lg-5">
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                src="https://dummyimage.com/300x250/dee2e6/6c757d.jpg"
                className="card-img-top"
                alt="..."
              />
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                src="https://dummyimage.com/300x250/dee2e6/6c757d.jpg"
                className="card-img-top"
                alt="..."
              />
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                src="https://dummyimage.com/300x250/dee2e6/6c757d.jpg"
                className="card-img-top"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProperty;
