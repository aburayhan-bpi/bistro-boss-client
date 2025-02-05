import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuthContext";
import { IoWallet } from "react-icons/io5";
import { FaCartShopping, FaShop, FaStar } from "react-icons/fa6";
import { MdFeedback, MdWifiCalling3 } from "react-icons/md";
import usePaymentHistory from "../../../hooks/usePaymentHistory";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaListAlt } from "react-icons/fa";

const UserHome = () => {
  const { user } = useAuth();
  const [myReviews, setMyReviews] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [paymentHistory] = usePaymentHistory();

  useEffect(() => {
    axiosSecure.get(`/reviews/${user?.email}`).then((res) => {
      setMyReviews(res.data);
    });
  }, []);

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const totalOrder = paymentHistory.reduce(
    (acc, total) => acc + total.price,
    0
  );
  console.log(totalOrder, myReviews.length, bookings.length);
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">
        Hi, Welcome{" "}
        <span>{user?.displayName ? user?.displayName : "Back"}</span>
      </h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* counter statistics card start */}
        {/* card 1 - Menu */}
        <div className="card bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] text-white">
          <div className="flex gap-3 justify-center items-center p-8 text-center">
            <IoWallet className="size-10"></IoWallet>
            <div>
              <p className="font-bold text-3xl text-left">
                ${totalOrder.toFixed(2)}
              </p>
              <p className="text-left">Total Spend</p>
            </div>
          </div>
        </div>

        {/* card 2 - Shop */}
        <div className="card bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] text-white">
          <div className="flex gap-3 justify-center items-center p-8 text-center">
            <MdFeedback className="size-10"></MdFeedback>
            <div>
              <p className="font-bold text-3xl text-left">{myReviews.length}</p>
              <p className="text-left">Reviews</p>
            </div>
          </div>
        </div>

        {/* card 3 - Contact */}
        <div className="card bg-gradient-to-r from-[#FE4880] to-[#FECDE9] text-white">
          <div className="flex gap-3 justify-center items-center p-8 text-center">
            <FaCartShopping className="size-10"></FaCartShopping>
            <div>
              <p className="font-bold text-3xl text-left">
                {paymentHistory.length}
              </p>
              <p className="text-left">Orders</p>
            </div>
          </div>
        </div>
      </div>
      {/* counter statistics card end */}

      {/* profile statistics */}
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Section */}
          <div className="bg-[#FFEDD5] border-r-4 border-r-[#D1A054] p-16">
            <div className="flex flex-col items-center justify-center">
              {/* Outer circle */}
              <div className="rounded-full border-4 border-[#D1A054] w-64 h-64 flex items-center justify-center">
                {/* Image */}
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
              </div>
            </div>
            <h2 className="text-center mt-5 font-semibold text-xl">
              {user?.displayName}
            </h2>
          </div>

          {/* Right Section */}
          <div className="bg-[#FEF9C3] flex flex-col p-16">
            <h2 className="text-xl font-semibold mb-5">YOUR ACTIVITIES</h2>
            <div>
              <p className="flex items-center gap-1 text-[#0088FE] font-semibold">
                <FaCartShopping /> ORDERS: {paymentHistory.length}
              </p>
              <p className="flex items-center gap-1 text-[#00C4A1] font-semibold">
                <FaStar /> REVIEWS: {myReviews.length}
              </p>
              <p className="flex items-center gap-1 text-[#FFBB28] font-semibold">
                <FaListAlt /> BOOKINGS: {bookings.length}
              </p>
              <p className="flex items-center gap-1 text-[#FF8042] font-semibold">
                <IoWallet /> PAYMENTS: {paymentHistory.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
