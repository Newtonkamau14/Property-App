function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <a
          href="/admin"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img
            src="/img/house-home-hut-svgrepo-com.svg"
            alt="logo"
            width="40"
            height="32"
          />
          <span className="fs-4">MyProperty</span>
        </a>
        <nav className="menu">
          <a href="/admin" className="menu-item">
            <i className="fa-solid fa-house"></i>
            Home
          </a>
          <a href="/admin/studioapartments" className="menu-item">
            <i className="fa-solid fa-building"></i>
            Studio Apartments
          </a>
          <a href="/admin/singlerooms" className="menu-item">
            <i className="fa-solid fa-bed"></i>
            Single Rooms
          </a>
          <a href="/admin/bedrooms" className="menu-item">
            <i className="fa-solid fa-truck"></i>
            1,2,3 Bedrooms
          </a>
          <a href="/admin/addproperty" className="menu-item">
            <i className="fa-solid fa-plus"></i>
            Add Property
          </a>

          <div className="dropdown menu-item">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="fa-solid fa-user rounded-circle me-2"
                width="32"
                height="32"
              ></i>
              <strong>Current username</strong>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a href="/logout" className="btn btn-danger">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
