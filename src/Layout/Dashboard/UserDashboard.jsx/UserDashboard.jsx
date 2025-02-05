import React from "react";
import {
  FaBook,
  FaCalendar,
  FaCalendarAlt,
  FaCalendarCheck,
  FaFileContract,
  FaHome,
  FaMoneyBill,
  FaSignOutAlt,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { FaCartShopping, FaListCheck, FaShop } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { IoWallet } from "react-icons/io5";
import { MdEmail, MdFeedback } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../assets/others/com1.jpg";
import "./userDashboard.css";
import { ImSpoonKnife } from "react-icons/im";
import useAdmin from "../../../hooks/useAdmin";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuthContext";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const { logOut } = useAuth();

  const hanldeLogout = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="flex">
      <div className="flex flex-col bg-yellow-600 p-4 py-10 ">
        {/* <h2 className="text-white font-semibold text-lg mb-4">
          User Dashboard
        </h2> */}
        <div className="mb-4">
          <img
            className="w-48 mx-auto"
            // src={logo}
            src="https://i.ibb.co/vhmLh3T/bistroboss.jpg"
            alt="Bistro Boss Restaurant | Logo"
          />
          <ul className="menu">
            {isAdmin ? (
              <>
                <li className="flex justify-center">
                  <NavLink to="/dashboard/admin-home" end>
                    <FaHome className="size-6"></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li className="flex justify-center">
                  <NavLink to="/dashboard/addItems">
                    <ImSpoonKnife className="size-6"></ImSpoonKnife>
                    Add Items
                  </NavLink>
                </li>
                <li className="flex justify-center">
                  <NavLink to="/dashboard/manage-items">
                    <FaListCheck className="size-6"></FaListCheck>
                    Manage Items
                  </NavLink>
                </li>
                <li className="flex justify-center">
                  <NavLink to="/dashboard/manage-bookings">
                    <FaBook className="size-6"></FaBook>
                    Manage Bookings
                  </NavLink>
                </li>
                <li className="flex justify-center">
                  <NavLink to="/dashboard/users">
                    <FaUsers className="size-6"></FaUsers>
                    All Users
                  </NavLink>
                </li>
                {/* <li className="flex justify-center">
                <NavLink to="/userDashboard/myBooking">
                  <FaCalendarCheck className="size-6"></FaCalendarCheck>
                  My Booking
                </NavLink>
              </li> */}
              </>
            ) : (
              <>
                <li className="flex justify-center">
                  <NavLink to="/dashboard" end>
                    <FaHome className="size-6"></FaHome>
                    User Home
                  </NavLink>
                </li>
                <li className="flex justify-center">
                  <NavLink to="/dashboard/reservation">
                    <FaCalendarAlt className="size-6"></FaCalendarAlt>
                    Reservation
                  </NavLink>
                </li>

                <li className="flex justify-center">
                  <NavLink to="/dashboard/myCart">
                    <FaCartShopping className="size-6"></FaCartShopping>
                    My Cart ({cart.length})
                  </NavLink>
                </li>
                <li className="flex justify-center">
                  <NavLink to="/dashboard/add-review">
                    <MdFeedback className="size-6"></MdFeedback>
                    Add Review
                  </NavLink>
                </li>
                <li className="flex justify-center">
                  <NavLink to="/dashboard/my-bookings">
                    <FaCalendarCheck className="size-6"></FaCalendarCheck>
                    My Booking
                  </NavLink>
                </li>
                <li className="flex justify-center">
                  <NavLink to="/dashboard/payment-history">
                    <FaWallet className="size-6"></FaWallet>
                    Payment History
                  </NavLink>
                </li>
              </>
            )}
            {/* divider */}
            <div className="bg-white border my-5"></div>
            <li className="flex justify-center">
              <NavLink to="/">
                <FaHome className="size-6"></FaHome>
                Home
              </NavLink>
            </li>
            <li className="flex justify-center">
              <NavLink to="/dashboard/menu">
                <FiMenu className="size-6"></FiMenu>
                Menu
              </NavLink>
            </li>
            <li className="flex justify-center">
              <NavLink to="/our-shop/salad">
                <FaShop className="size-6"></FaShop>
                Shop
              </NavLink>
            </li>
            <li className="flex justify-center">
              <NavLink to="/dashboard/contact">
                <MdEmail className="size-6"></MdEmail>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="">
          <button
            onClick={hanldeLogout}
            className="flex gap-2 items-center btn rounded-none w-full bg-yellow-600 hover:bg-yellow-600 hover:text-white hover:border-black"
          >
            {" "}
            <FaSignOutAlt></FaSignOutAlt> Logout
          </button>
        </div>
      </div>

      {/* outlet section */}
      <div className="flex-1">
        <div className="m-4 min-h-screen pb-20">
          <Outlet></Outlet>
        </div>
      </div>
      {/* <div className="flex-1 mt-16 mr-4 mb-4 min-h-screen">
        <Outlet></Outlet>
      </div> */}
    </div>
  );
};

export default UserDashboard;
