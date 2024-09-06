import { useState } from "react";

function HamburgerMenu() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`menu-toggle ${isActive ? "is-active" : ""}`} onClick={toggleMenu}>
      <div className="hamburger">
        <span></span>
      </div>
      <div className={`sidebar ${isActive ? "is-active" : ""}`}>
        {/* Sidebar content here */}
      </div>
    </div>
  );
}

export default HamburgerMenu;
