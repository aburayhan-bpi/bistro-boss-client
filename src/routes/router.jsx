import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import OurMenu from "../Pages/OurMenu/OurMenu";
import OurShop from "../Pages/OurShop/OurShop";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../Layout/Dashboard/UserDashboard.jsx/UserDashboard";
import MyCart from "../Layout/Dashboard/UserDashboard.jsx/MyCart";
import UserHome from "../Layout/Dashboard/UserDashboard.jsx/UserHome";
import AllUsers from "../Layout/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../Layout/Dashboard/AddItems/AddItems";
import ManageItems from "../Layout/Dashboard/UserDashboard.jsx/ManageItems";
import UpdateItem from "../Layout/Dashboard/UpdateItem";
import Payment from "../Layout/Dashboard/Payment/Payment";
import PaymentHistory from "../Layout/Dashboard/PaymentHistory";
import AdminHome from "../Layout/Dashboard/AdminHome/AdminHome";
import Review from "../Layout/Dashboard/UserDashboard.jsx/Review";
import Reservation from "../Layout/Dashboard/UserDashboard.jsx/Reservation/Reservation";
import Bookings from "../Layout/Dashboard/UserDashboard.jsx/Bookings/Bookings";
import ManageBookings from "../Layout/Dashboard/ManageBookings/ManageBookings";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "contact-us",
        element: <ContactUs></ContactUs>,
      },
      // {
      //   path: "dashboard",
      //   element: <Dashboard></Dashboard>,
      // },
      {
        path: "our-menu",
        element: <OurMenu></OurMenu>,
      },
      {
        path: "our-shop/:category",
        element: (
          // <PrivateRoute>
          <OurShop></OurShop>
          // </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <UserDashboard></UserDashboard>
        {/* <UserHome></UserHome> */}
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <UserHome></UserHome>,
      },
      {
        path: "myCart",
        element: (
          <PrivateRoute>
            <MyCart></MyCart>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "add-review",
        element: (
          <PrivateRoute>
            <Review></Review>
          </PrivateRoute>
        ),
      },
      {
        path: "reservation",
        element: (
          <PrivateRoute>
            <Reservation></Reservation>
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <Bookings></Bookings>
          </PrivateRoute>
        ),
      },
      // admin routes
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "manage-items",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "update-item/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
      {
        path: "admin-home",
        element: (
          <PrivateRoute>
            <AdminHome></AdminHome>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <PrivateRoute>
            <ManageBookings></ManageBookings>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
