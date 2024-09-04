import { useEffect, useState } from "react";
import axios from "../api/axios";
import { IProperty } from "../models/property";
import Loading from "../components/Loading";
import Table from "../components/Table";

function AdminStudioApartment() {
  const [studioapt, setStudioApt] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/admin/studioapartments")
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
    <>
      {studioapt.length > 0 ? (
        studioapt.map((property) => (
          <Table key={property.property_id} property={property} />
        ))
      ) : (
        <span></span>
      )}
    </>
  );
}

export default AdminStudioApartment;
