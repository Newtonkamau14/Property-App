function NotFoundPage() {
  return (
    <>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <span className="display-1">404</span>
          <div className="mb-4 lead">
            The page you are looking for was not found.
          </div>
          <a href="/" className="btn btn-link">
            Back to Home
          </a>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
