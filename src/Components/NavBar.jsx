import React from "react";
import { Link } from "react-router-dom";
import "../Style/NavBar.css";

const NavBar = ({ onMenuClick }) => {
  return (
    <header className="admin-navbar">
      {/* Left: Hamburger + Logo */}
      <div className="admin-navbar__left">
        <button
          className="admin-navbar__menu"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <Link to="/admin" className="admin-navbar__logo">
          <span>My</span>Admin
        </Link>
      </div>

      {/* Right: Profile */}
      <div className="admin-navbar__profile">
        <div className="admin-navbar__avatar">A</div>
      </div>
    </header>
  );
};

export default NavBar;
