import { createBrowserRouter,RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ClientLayout from "./pages/ClientLayout";
import AdminLayout from "./pages/AdminLayout";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/property/bedrooms",
        element: "",
      },
      {
        path: "/property/singlerooms",
        element: ""
      },
      {
        path: "/property/studioapartments",
        element: ""
      },
      {
        path: "/showproperty/:property_id",
        element: ""
      },
      {
        path: "/search-property",
        element: ""
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    children: [
      {
        path: "/admin",
        element: ""
      },
      {
        path: "/admin/studioapartments",
        element: ""
      },
      {
        path: "/admin/singlerooms",
        element: ""
      },
      {
        path: "/admin/bedrooms",
        element: ""
      },
      {
        path: "/admin/addproperty",
        element: ""
      },
      {
        path: "/admin/editproperty/:property_id",
        element: ""
      },
      {
        path: "/admin/search-property",
        element: ""
      },
    ]
  },
  {
    path: "/auth",
    children: [
      {
        path: "/auth/admin/login",
        element: <Login/>
      },
      {
        path: "/auth/admin/signup",
        element: <Signup/>
      }
    ]
  }
])


function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
