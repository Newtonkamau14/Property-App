import { useEffect, useState } from "react";
import axios from "../api/axios";
import { IProperty } from "../types/property";
import Loading from "../components/Loading";
import Table from "../components/Table";

function AdminSingleRoom() {
  const [singlerms, setSingleRms] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/admin/singlerooms")
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
      {singlerms.length > 0 ? (
        singlerms.map((property) => (
          <Table key={property.property_id} property={property} />
        ))
      ) : (
        <span></span>
      )}
    </>
  );
}

export default AdminSingleRoom;
