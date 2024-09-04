import { PropertyProps } from "../models/property";
import axiosInstance from "../api/axios";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useState } from "react";

function Table({ property }: PropertyProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/admin/deleteproperty/${property.property_id}`
      );

      if (response.status === 200) {
        console.log("Property was deleted");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An error occurred";
        setErrorMessage(message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
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
    <div className="table-responsive">
      <table className="my-5 table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Type</th>
            <th>Purpose</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{property.property_name}</td>
            <td>{property.property_location}</td>
            <td>{property.property_price.toLocaleString("en-UK")}</td>
            <td>{property.property_type}</td>
            <td>{property.property_purpose}</td>
            <td>
              <Link
                to={`/admin/editproperty/${property.property_id}`}
                className="btn btn-secondary"
              >
                Edit
              </Link>
            </td>
            <td>
              <button onClick={handleClick} className="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
