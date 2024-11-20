import { useEffect, useState } from "react";
import axios from "../api/axios";
import { IProperty } from "../types/property";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";

function AdminPanel() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/admin")
      .then((response) => {
        setProperties(response.data.properties);
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
      <h1>Dashboard</h1>

      <SearchBar />

      <h3 className="text-primary text-center">All Properties</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Type</th>
              <th>Purpose</th>
            </tr>
          </thead>

          <tbody>
            {properties.length > 0 ? (
              properties.map((property) => (
                <tr>
                  <td>{property.property_name}</td>
                  <td>{property.property_location}</td>
                  <td>{property.property_price.toLocaleString()}</td>
                  <td>{property.property_type}</td>
                  <td>{property.property_purpose}</td>
                </tr>
              ))
            ) : (
              <span></span>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminPanel;
