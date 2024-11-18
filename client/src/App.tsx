import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ClientLayout from "./pages/ClientLayout";
import AdminLayout from "./pages/AdminLayout";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ShowProperty from "./pages/ShowProperty";
import SingleRooms from "./pages/SingleRooms";
import Bedrooms from "./pages/Bedrooms";
import StudioApartments from "./pages/StudioApartments";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPanel from "./pages/AdminPanel";
import AdminStudioApartment from "./pages/AdminStudioApartment";
import AdminSingleRoom from "./pages/AdminSingleRoom";
import AdminBedroom from "./pages/AdminBedroom";
import AddProperty from "./pages/AddProperty";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/properties/bedrooms",
        element: <Bedrooms />,
      },
      {
        path: "/properties/singlerooms",
        element: <SingleRooms />,
      },
      {
        path: "/properties/studioapartments",
        element: <StudioApartments />,
      },
      {
        path: "/showproperty/:property_id",
        element: <ShowProperty />,
      },
      {
        path: "/search-property",
        element: "",
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        index: true,
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/studioapartments",
        element: (
          <ProtectedRoute>
            <AdminStudioApartment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/singlerooms",
        element: (
          <ProtectedRoute>
            <AdminSingleRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/bedrooms",
        element: (
          <ProtectedRoute>
            <AdminBedroom />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/addproperty",
        element: (
          <ProtectedRoute>
            <AddProperty />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/editproperty/:property_id",
        element: "",
      },
      {
        path: "/admin/search-property",
        element: "",
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "/auth/admin/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/auth/admin/signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/error/:statusCode",
    element: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
