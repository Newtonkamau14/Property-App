import { useEffect, useState } from "react";
import { IProperty } from "../types/property";
import Banner from "../components/Banner";
import axiosInstance from "../api/axios";
import Property from "../components/Property";
import Loading from "../components/Loading";
import { usePropertiesContext } from "../hooks/usePropertiesContext";
import axios from "axios";

interface PropertyData {
  randproperties: IProperty[];
  studioapt: IProperty[];
  singlerms: IProperty[];
  bedrooms: IProperty[];
}

function Home() {
  const { dispatch } = usePropertiesContext();
  const [data, setData] = useState<PropertyData>({
    randproperties: [],
    studioapt: [],
    singlerms: [],
    bedrooms: [],
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await axiosInstance.get("/properties");

      if (response.data) {
        setData(response.data);
        dispatch({
          type: "SET_PROPERTIES",
          payload: response.data,
        });
      } else {
        setErrorMessage("No data found");
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

  useEffect(() => {
    fetchData();
  }, []); // Removed dispatch from dependency

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

  const renderPropertySection = (
    title: string,
    properties: IProperty[],
    noDataMessage: string
  ) => (
    <div>
      <h3 className="house-type-title">{title}</h3>
      <div className="row row-cols-3 row-cols-md-4 g-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.property_id} className="col">
              <Property property={property} />
            </div>
          ))
        ) : (
          <h3>{noDataMessage}</h3>
        )}
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <Banner />
      {renderPropertySection(
        "Promoted",
        data.randproperties,
        "No promoted properties"
      )}
      {renderPropertySection(
        "Studio Apartments",
        data.studioapt,
        "No studio apartments"
      )}
      {renderPropertySection("Single Rooms", data.singlerms, "No single rooms")}
      {renderPropertySection("Bedrooms", data.bedrooms, "No bedrooms")}
    </div>
  );
}

export default Home;
