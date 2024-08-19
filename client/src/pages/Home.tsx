import { useEffect, useState } from "react";
import { IProperty } from "../models/property";
import Banner from "../components/Banner";
import axios from "../api/axios";
import Property from "../components/Property";

function Home() {
  const [randproperties, setRandProperties] = useState<IProperty[]>([]);
  const [studioapt, setStudioApt] = useState<IProperty[]>([]);
  const [singlerms, setSingleRms] = useState<IProperty[]>([]);
  const [bedrooms, setBedrooms] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/")
      .then((response) => {
        setLoading(true);
        setRandProperties(response.data.randproperties);
        console.log(response.data.randproperties)
        setStudioApt(response.data.studioapt);
        setSingleRms(response.data.singlerms);
        setBedrooms(response.data.bedrooms);
        setLoading(false);
      })
      .catch((error) => {
        const message = error.response?.data?.message || "An error occurred";
        setErrorMessage(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      <Banner />

      <h3 className="house-type-title">Promoted</h3>
      <div className="row row-cols-3 row-cols-md-4 g-4">
        {randproperties.length > 0 ? (
          randproperties.map((property) => (
            <div className="col">
              <Property key={property.property_id} property={property} />
            </div>
          ))
        ) : (
          <h3>No properties</h3>
        )}
      </div>

      {studioapt.length > 0 ? (
        studioapt.map((property) => (
          <div className="col">
            <Property key={property.property_id} property={property} />
          </div>
        ))
      ) : (
        <span></span>
      )}

      {singlerms.length > 0 ? (
        singlerms.map((property) => (
          <div className="col">
            <Property key={property.property_id} property={property} />
          </div>
        ))
      ) : (
        <span></span>
      )}

      {bedrooms.length > 0 ? (
        bedrooms.map((property) => (
          <div className="col">
            <Property key={property.property_id} property={property} />
          </div>
        ))
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Home;
