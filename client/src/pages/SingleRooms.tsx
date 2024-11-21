import Property from "../components/Property";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { IProperty } from "../types/property";
import Loading from "../components/Loading";
import PageTitle from "../components/PageTitle";

function SingleRooms() {
  const [loading, setLoading] = useState(false);
  const [singlerms, setSingleRms] = useState<IProperty[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/properties/singlerooms")
      .then((response) => {
        setSingleRms(response.data.singlerms);
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
    <>
      <PageTitle title="Single Rooms" />
      <div className="main-container">
        <h3 className="house-type-title">Single Rooms</h3>
        <div className="row row-cols-3 row-cols-md-4 g-4">
          {singlerms.length > 0 ? (
            singlerms.map((property) => (
              <div key={property.property_id} className="col">
                <Property property={property} />
              </div>
            ))
          ) : (
            <h3>No single rooms available</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleRooms;
