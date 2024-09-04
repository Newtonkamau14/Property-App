function Pagination({
  propertiesPerPage,
  length,
  handlePagination,
  currentPage,
}: {
  propertiesPerPage: number;
  length: number;
  handlePagination: (data: number) => void;
  currentPage: number;
}) {
  const paginationNumbers = [];
  for (let i = 1; i <= Math.ceil(length / propertiesPerPage); i++) {
    paginationNumbers.push(i);
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination m-3 p-2">
        {paginationNumbers.map((data) => (
          <li className="page-item">
            <a
              className={currentPage === data ? "page-link active" : ""}
              key={data}
              onClick={() => handlePagination(data)}
            >
              {data}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
