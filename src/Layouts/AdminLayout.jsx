import { Outlet } from "react-router-dom";
import { useState } from "react";

import NavBar from "../Components/NavBar";
import Sidebar from "../Components/SideBar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-app">
      {/* Top Navbar */}
      <NavBar onMenuClick={() => setSidebarOpen(true)} />

      <div className="admin-body">
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Page Content */}
        <div className="admin-content">
          <Outlet /> {/*  admin pages render here */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
