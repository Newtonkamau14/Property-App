import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/house-home-hut-svgrepo-com.svg";

function Sidebar() {
  const { logout } = useLogout();
  const {
    state: { user },
  } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <>
      <aside className="sidebar">
        <Link
          to="/admin"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img src={logo} alt="logo" width="40" height="32" />
          <span className="fs-4">MyProperty</span>
        </Link>
        <nav className="menu">
          <Link to="/admin" className="menu-item">
            <i className="fa-solid fa-house mx-2"></i>
            Home
          </Link>
          <Link to="/admin/studioapartments" className="menu-item">
            <i className="fa-solid fa-building mx-2"></i>
            Studio Apartments
          </Link>
          <Link to="/admin/singlerooms" className="menu-item">
            <i className="fa-solid fa-bed mx-2"></i>
            Single Rooms
          </Link>
          <Link to="/admin/bedrooms" className="menu-item">
            <i className="fa-solid fa-truck mx-2"></i>
            1,2,3 Bedrooms
          </Link>
          <Link to="/admin/addproperty" className="menu-item">
            <i className="fa-solid fa-plus mx-2"></i>
            Add Property
          </Link>
          {user && (
            <div className="dropdown menu-item mx-2">
              <Link
                to="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user rounded-circle me-2"></i>
                {user.username}
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
                  <button className="btn btn-danger mx-2" onClick={handleClick}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
