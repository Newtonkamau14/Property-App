function InternalServerError() {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <span className="display-1">500</span>
        <div className="mb-4 lead">
          Unfortunately we're having trouble loading the page you are looking
          for. Please come back in a while.
        </div>
        <a href="/" className="btn btn-link">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default InternalServerError;
