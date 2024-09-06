import Property from "../components/Property";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { IProperty } from "../models/property";
import Loading from "../components/Loading";

function StudioApartments() {
  const [loading, setLoading] = useState(false);
  const [studioapt, setStudioApt] = useState<IProperty[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get("/properties/studioapartments")
      .then((response) => {
        setStudioApt(response.data.studioapt);
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
    return <Loading />;
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
      <h3 className="house-type-title">Studio Apartments</h3>
      <div className="row row-cols-3 row-cols-md-4 g-4">
        {studioapt.length > 0 ? (
          studioapt.map((property) => (
            <div key={property.property_id} className="col">
              <Property property={property} />
            </div>
          ))
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}

export default StudioApartments;
