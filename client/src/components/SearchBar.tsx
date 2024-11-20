import { useState } from "react";
import axiosInstance from "../api/axios";
import axios from "axios";
import { IProperty } from "../types/property";

function SearchBar() {
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSearch = async () => {
    try {
     const response = await axiosInstance.get("/admin/search-property");
            setProperties(response.data.properties);

    }catch (error) {
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
  return (
    <form className="d-flex my-2" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Property"
        aria-label="Search"
        name="search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
