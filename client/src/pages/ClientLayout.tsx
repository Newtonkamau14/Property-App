import { Outlet } from "react-router-dom";
import Navbar  from "../components/Navbar";
import Footer from "../components/Footer";


function ClientLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default ClientLayout;
