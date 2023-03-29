import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Tracker from "./components/Tracker";
import Education from "./pages/Education";
import Login from "./pages/Login";
import Personal from "./pages/Personal";
import Preferences from "./pages/Preferences";
import Register from "./pages/Register";
import Samples from "./pages/Samples";
import Skills from "./pages/Skills";
import "@coreui/coreui/dist/css/coreui.min.css";
import Search from "./pages/admin/search/Search";
import Error404 from "./pages/Error404";
import { AuthContext, AuthContextProvider } from "./context/authContext";
import Profile from "../src/pages/Profile";
import { useContext } from "react";



const App = () => {



  const DetailsLayout = () => {
    return (
      <>
        <Navbar />
        <Tracker />
        <Outlet />
      </>
    );
  };


  const ProtectedRoutes = ({ children }) => {
    const ID = JSON.parse(localStorage.getItem("user"))?._id;
    if (!ID) {
      return <Navigate to="/" />
    }
    return children;
  }
  const AdminRoute = ({ children }) => {
    const ROLE = JSON.parse(localStorage.getItem("user"))?.role;

    if (ROLE !== "admin") {
      return <Navigate to="/preferences" />
    }
    return children;
  }
  const LoggedInRoute = ({ children }) => {
    const ID = JSON.parse(localStorage.getItem("user"))?._id;
    if (ID) {
      return <Navigate to="/preferences" />
    }
    return children;
  }


  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <Search />
        </AdminRoute>
      )
    }
    , {
      path: "/",
      element: (
        <LoggedInRoute>
          <Login />
        </LoggedInRoute>
      )
    },
    {
      path: "/register",
      element: (
        <LoggedInRoute>
          <Register />
        </LoggedInRoute>
      )
    },
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <DetailsLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "/preferences",
          element: <Preferences />,
        },
        {
          path: "/personal",
          element: <Personal />,
        },
        {
          path: "/education",
          element: <Education />,
        },
        {
          path: "/skills",
          element: <Skills />,
        },
        {
          path: "/samples",
          element: <Samples />,
        },
      ],
    },
    {
      path: "/profile/:id",
      element:
        <ProtectedRoutes>
          <Profile />,
        </ProtectedRoutes>
    },
    {
      path: "*",
      element: <Error404 />
    },
  ]);


  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
