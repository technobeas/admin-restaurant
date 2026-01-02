import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import "../style/Sidebar.css";
import '../Style/sideBar.css'
import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";

const SideBar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // calls GET /user/logout
      // toast.success("Logged out successfully");
      onClose?.(); // close sidebar (mobile)
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      // toast.error("Failed to logout");
    }
  };

  return (
    <>
      {/* Backdrop (mobile only) */}
      {open && (
        <div
          className="admin-sidebar__backdrop"
          onClick={onClose}
        />
      )}

      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        {/* Close button (mobile) */}
        <button
          className="admin-sidebar__close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>

        {/* Account Info */}
        <div className="admin-sidebar__account">
          <div className="admin-sidebar__avatar">A</div>
          <div>
            <p className="admin-sidebar__name">Admin User</p>
            <span className="admin-sidebar__role">
              Administrator
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar__nav">
          <NavLink to="/admin/products" onClick={onClose}>
            All Products
          </NavLink>

          <NavLink to="/admin/add-product" onClick={onClose}>
            Add Product
          </NavLink>

          <NavLink to="/admin/categories" onClick={onClose}>
            All Categories
          </NavLink>

          <NavLink to="/admin/add-category" onClick={onClose}>
            Add Category
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="admin-sidebar__logout">
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
