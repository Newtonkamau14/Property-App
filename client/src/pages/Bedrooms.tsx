import Property from "../components/Property";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { IProperty } from "../models/property";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

function Bedrooms() {
  const [loading, setLoading] = useState(false);
  const [bedrooms, setBedrooms] = useState<IProperty[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [propertiesPerPage, setPropertiesPerPage] = useState<number>(15);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/properties/bedrooms")
      .then((response) => {
        setBedrooms(response.data.bedrooms);
      })
      .catch((error) => {
        const message = error.response?.data?.message || "An error occurred";
        setErrorMessage(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = bedrooms.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
    <div className="main-container">
      <h3 className="house-type-title">Bedrooms</h3>
      <div className="row row-cols-3 row-cols-md-4 g-4">
        {bedrooms.length > 0 ? (
          bedrooms.map((property) => (
            <div key={property.property_id} className="col">
              <Property property={property} />
            </div>
          ))
        ) : (
          <span></span>
        )}
      </div>
      <Pagination
        length={bedrooms.length}
        propertiesPerPage={propertiesPerPage}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Bedrooms;
