import "bootstrap/dist/css/bootstrap.min.css";


function Footer() {
  return (
    <>
      <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center ms-3">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <i className="fa-solid fa-house"></i>
          </a>
          <span className="mb-3 mb-md-0 fs-4">
            MyProperty &#169; <span className="yr"></span>
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me-3">
          <li className="ms-3">
            <a className="text-muted" href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default Footer;
