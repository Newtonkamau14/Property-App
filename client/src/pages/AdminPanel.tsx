import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { IProperty } from "../types/property";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import PageTitle from "../components/PageTitle";

function AdminPanel() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (query: string = "") => {
    setLoading(true);
    setErrorMessage(null); // Clear any previous error
    try {
      const endpoint = query
        ? `/admin/search-property?search=${query}`
        : "/admin";
      const response = await axiosInstance.get(endpoint);
      setProperties(response.data.properties);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "An error occurred"
        : "An unknown error occurred";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    fetchProperties(query);
  };

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
      <PageTitle title="Admin Panel"/>
      <h1>Dashboard</h1>

      <SearchBar handleSearch={handleSearch} />

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
