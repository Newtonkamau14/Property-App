function Forbidden() {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <span className="display-1">403</span>
        <div className="mb-4 lead">Not this time,access forbidden.</div>
        <a href="/" className="btn btn-link">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default Forbidden;
