import { useEffect, useState } from "react";
import axios from "../api/axios";
import { IProperty } from "../models/property";
import Loading from "../components/Loading";
import Table from "../components/Table";

function AdminBedroom() {
  const [bedrooms, setBedrooms] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/admin/bedrooms")
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
      {bedrooms.length > 0 ? (
        bedrooms.map((property) => (
          <Table key={property.property_id} property={property} />
        ))
      ) : (
        <span></span>
      )}
    </>
  );
}

export default AdminBedroom;
