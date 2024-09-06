import { Link } from "react-router-dom";
import h1 from "../assets/h1.jpg";

function Banner() {
  return (
    <div className="header-banner">
      <div className="categories">
        <h3>Categories</h3>
        <ul>
          <li>
            <i className="fa-solid fa-building"></i>
            <Link to="/properties/studioapartments">Studio Apartments</Link>
          </li>
          <li>
            <i className="fa-solid fa-bed"></i>
            <Link to="/properties/singlerooms">Single Rooms</Link>
          </li>
          <li>
            <i className="fa-solid fa-truck"></i>
            <Link to="/properties/bedrooms">1,2,3 Bedrooms</Link>
          </li>
        </ul>
      </div>

      <div className="banner">
        <img src={h1} alt="banner" />
      </div>
    </div>
  );
}

export default Banner;
