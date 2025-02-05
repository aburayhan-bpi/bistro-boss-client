import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import Logo from "../../assets/com2.png";
import re from "../../assets/others/re.png";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuthContext";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();

  const [cart] = useCart();
  console.log(cart);

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log("logged out...", result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const navOptions = (
    <>
      {/* <div className=" flex-col lg:flex items-center text-black"> */}
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us">Contact Us</NavLink>
      </li>
      {/* <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li> */}
      <li>
        <NavLink to="/our-menu">Our Menu</NavLink>
      </li>
      <li>
        <NavLink to="/our-shop/salad">Our Shop</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myCart" className="hover:bg-yellow-900">
          <FaCartShopping />

          {user?.email && (
            <div className="badge badge-secondary">{cart.length}</div>
          )}
        </NavLink>
      </li>

      {user && isAdmin && (
        <li>
          <Link to="/dashboard/admin-home">Dashboard</Link>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      {/* </div> */}
    </>
  );

  return (
    <div className="">
      <div className="navbar bg-black bg-opacity-35 fixed z-10  lg:text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow items-center justify-center"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            {/* <img src={re} alt="Bistro Boss" /> */}
            <img
              className="w-36 rounded-md"
              src="https://i.ibb.co/vhmLh3T/bistroboss.jpg"
              alt="Bistro Boss"
            />
          </Link>
        </div>
        <div className="navbar-end ">
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1 items-center justify-center">
              {navOptions}
            </ul>
          </div>
          <div className="flex gap-1 text-white items-center justify-center ml-3">
            {user?.email ? (
              <button
                onClick={handleLogOut}
                className="w-28 bg-yellow-800 rounded-md p-1"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex items-center justify-center">
                <Link to="/register">
                  <button className="w-20">Register</button>
                </Link>
                <Link to="/login">
                  <button className="w-20">Login</button>
                </Link>
              </div>
            )}

            <div className="mr-4">
              {user?.photoURL ? (
                <img
                  className="w-10 h-10 object-cover ml-2 rounded-full overflow-hidden"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
              ) : (
                <FaUserCircle className="size-8 cursor-pointer" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
