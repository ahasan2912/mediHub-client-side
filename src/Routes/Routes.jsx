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
import OrderList from "../Pages/Dashboard/User/order/OrderList";
import OrderDetails from "../Pages/Dashboard/User/order/OrderDetails";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import ManageUser from "../Pages/Dashboard/Admin/ManageUers/ManageUser";
import PaymentManage from "../Pages/Dashboard/Admin/Payment/PaymentManage";
import SalesReport from "../Pages/Dashboard/Admin/SalesReport/SalesReport";

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
        path: 'orderList',
        element: <PrivetRoute><OrderList></OrderList></PrivetRoute>
      },
      {
        path: 'orderDetails/:id',
        element: <PrivetRoute><OrderDetails></OrderDetails></PrivetRoute>
      },
      {
        path: 'adminHome',
        element: <PrivetRoute>
          <AdminRoute><AdminHome></AdminHome></AdminRoute>
        </PrivetRoute>
      },
      {
        path: 'manageUsers',
        element: <PrivetRoute>
          <AdminRoute><ManageUser></ManageUser></AdminRoute>
        </PrivetRoute>
      },
      {
        path: 'manageBanner',
        element: <PrivetRoute>
          <AdminRoute><ManageBanner></ManageBanner></AdminRoute>
        </PrivetRoute>
      },
      {
        path: 'salesReport',
        element: <PrivetRoute>
          <AdminRoute><SalesReport></SalesReport></AdminRoute>
        </PrivetRoute>
      },
      {
        path: 'paymentManage',
        element: <PrivetRoute>
          <AdminRoute><PaymentManage></PaymentManage></AdminRoute>
        </PrivetRoute>
      },
      {
        path: 'sellerHome',
        element: <PrivetRoute>
          <SellerRoute><SellerHome></SellerHome></SellerRoute>
        </PrivetRoute>
      },
      {
        path: 'addMedicine',
        element: <PrivetRoute>
          <SellerRoute><AddMedicine></AddMedicine></SellerRoute>
        </PrivetRoute>
      },
      {
        path: 'profile',
        element: <PrivetRoute><Profile></Profile></PrivetRoute>
      }

    ]
  }
]);