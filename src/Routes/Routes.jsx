import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Home from "../Pages/Home/Home";
import CategoriesShow from "../Pages/Categories/CategoriesShow";
import Shop from "../Pages/Shop/Shop";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/User/UserHome";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <div>404 Not Found</div>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/shop',
          element: <Shop></Shop>
        },
        {
          path: '/show/:category',
          element: <CategoriesShow></CategoriesShow>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'adminHome',
          element: <AdminHome></AdminHome>
        }
      ]
    }
  ]);