import { useSearchParams } from "react-router-dom";
import { FormEvent, useState } from "react";

type SearchBarProps = {
  handleSearch: (query: string) => void;
}

function SearchBar({ handleSearch }: SearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); 
    setSearchParams({ search: searchQuery });
    handleSearch(searchQuery);
  };

  return (
    <form className="d-flex my-2" onSubmit={onSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Property"
        aria-label="Search"
        name="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
