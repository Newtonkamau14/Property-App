import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HamburgerMenu from "../components/HamburgerMenu";

function AdminLayout() {
  return (
    <div className="admin-panel">
      <HamburgerMenu />
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
