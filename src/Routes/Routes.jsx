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
import SellerHome from "../Pages/Dashboard/Seller/SellerHome";
import AddMedicine from "../Pages/Dashboard/Seller/AddMedicine/AddMedicine";
import PrivetRoute from "./PrivetRoute";
import ManageBanner from "../Pages/Dashboard/Admin/ManageBanner/ManageBanner";


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
    element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
    children: [
      {
        path: 'userHome',
        element: <PrivetRoute><UserHome></UserHome></PrivetRoute>
      },
      {
        path: 'adminHome',
        element: <PrivetRoute><AdminHome></AdminHome></PrivetRoute>
      },
      {
        path: 'manageBanner',
        element: <PrivetRoute><ManageBanner></ManageBanner></PrivetRoute>
      },
      {
        path: 'sellerHome',
        element: <SellerHome></SellerHome>
      },
      {
        path: 'addMedicine',
        element: <AddMedicine></AddMedicine>
      }
    ]
  }
]);