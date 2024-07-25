import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <Link
          to="/admin"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img
            src="/img/house-home-hut-svgrepo-com.svg"
            alt="logo"
            width="40"
            height="32"
          />
          <span className="fs-4">MyProperty</span>
        </Link>
        <nav className="menu">
          <Link to="/admin" className="menu-item">
            <i className="fa-solid fa-house"></i>
            Home
          </Link>
          <Link to="/admin/studioapartments" className="menu-item">
            <i className="fa-solid fa-building"></i>
            Studio Apartments
          </Link>
          <Link to="/admin/singlerooms" className="menu-item">
            <i className="fa-solid fa-bed"></i>
            Single Rooms
          </Link>
          <Link to="/admin/bedrooms" className="menu-item">
            <i className="fa-solid fa-truck"></i>
            1,2,3 Bedrooms
          </Link>
          <Link to="/admin/addproperty" className="menu-item">
            <i className="fa-solid fa-plus"></i>
            Add Property
          </Link>

          {/* { if(currentUser) } */}
          <div className="dropdown menu-item">
            <Link
              to="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-user rounded-circle me-2"></i>
              {/* <strong><%= currentUser.username %></strong> */}
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <Link className="dropdown-item" to="#">
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link to="/logout" className="btn btn-danger">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          {/* { } */}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
