import Property from "../components/Property";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { IProperty } from "../models/property";
import Loading from "../components/Loading";

function SingleRooms() {
  const [loading, setLoading] = useState(false);
  const [singlerms, setSingleRms] = useState<IProperty[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/properties/singlerooms")
      .then((response) => {
        setLoading(true);
        setSingleRms(response.data.singlerms);
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
      <h3 className="house-type-title">Single Rooms</h3>
      <div className="row row-cols-3 row-cols-md-4 g-4">
        {singlerms.length > 0 ? (
          singlerms.map((property) => (
            <div className="col">
              <Property key={property.property_id} property={property} />
            </div>
          ))
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}

export default SingleRooms;
