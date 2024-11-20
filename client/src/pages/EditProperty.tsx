import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { IProperty } from "../types/property";
import Loading from "../components/Loading";

function EditProperty() {
  const { property_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [property, setProperty] = useState<IProperty>({} as IProperty);

  useEffect(() => {
    axiosInstance
      .get(`/admin/property/${property_id}`)
      .then((response) => {
        setLoading(true);
        setProperty(response.data);
      })
      .catch((error) => {
        const message = error.response?.data?.message || "An error occurred";
        setErrorMessage(message);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [property_id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const property_name = formData.get("property_name") as string;
    const property_location = formData.get("property_location") as string;
    const property_price = formData.get("property_price") as string;
    const property_type = formData.get("property_type") as string;
    const property_purpose = formData.get("property_purpose") as string;

    setLoading(true);

    try {
      const response = await axiosInstance.patch(
        `/admin/editproperty/${property_id}`,
        {
          property_name,
          property_location,
          property_price,
          property_type,
          property_purpose,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Property updated successfully, navigating to /admin");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Failed to update property:", error);
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
    <>
      <h1>Edit Property</h1>
      <div className="d-flex align-items-center justify-content-center">
        <form
          action="/admin/editproperty/<%= property.property_id %>?_method=PATCH"
          method="post"
          className="border rounded p-3 col-6"
          onSubmit={handleSubmit}
        >
          <div className="form-group my-4">
            <label htmlFor="propertyname">Property Name</label>
            <input
              type="text"
              className="form-control"
              id="propertyname"
              name="property_name"
              placeholder="Enter property name"
              defaultValue={property.property_name}
            />
          </div>
          <div className="form-group my-4">
            <label htmlFor="propertylocation">Property Location</label>
            <input
              type="text"
              className="form-control"
              id="propertylocation"
              name="property_location"
              placeholder="Enter property location"
              defaultValue={property.property_location}
            />
          </div>
          <div className="form-group my-4">
            <label htmlFor="propertyprice">Property Price</label>
            <input
              type="text"
              className="form-control"
              id="propertyprice"
              name="property_price"
              placeholder="Enter property price"
              defaultValue={property.property_price}
            />
          </div>

          <div className="form-group my-4">
            <label htmlFor="propertytype">Property Type</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="property_type"
            >
              <option selected>{property.property_type}</option>
              <option value="Studio Apartments">Studio Apartments</option>
              <option value="Single Rooms">Single Rooms</option>
              <option value="1,2,3 Bedrooms">1,2,3 Bedrooms</option>
            </select>
          </div>
          <div className="form-group my-4">
            <label htmlFor="propertypurpose">Property Purpose</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="property_purpose"
            >
              <option selected>{property.property_purpose}</option>
              <option value="For sale">For sale</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Save Property
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProperty;
