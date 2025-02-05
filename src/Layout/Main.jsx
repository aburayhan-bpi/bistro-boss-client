import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
  const location = useLocation();
  const isLoginRegister =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div>
      <div className="">
        {isLoginRegister || (
          <header className="bg-red-500">
            <Navbar></Navbar>
          </header>
        )}

        <main className="">
          {" "}
          <Outlet></Outlet>
        </main>
      </div>
      {isLoginRegister || (
        <footer>
          <Footer></Footer>
        </footer>
      )}
    </div>
  );
};

export default Main;
