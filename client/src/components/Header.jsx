import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
        <div className="container-fluid">
          <a className="navbar-brand brand-title" href="/">
            <i className="fa-solid fa-house" />
            MyProperty
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <form
              className="d-flex mx-auto"
              action="/search-property"
              method="get"
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search property.."
                name="searchproperty"
                aria-label="Search"
              />
              <button className="btn border-primary" type="submit">
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
