import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsersCog } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { GoDotFill } from "react-icons/go";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const handleActivity = (id) => {
    axiosSecure
      .patch(`/bookings-status/${id}`, { status: "completed" })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  return (
    <div>
      <SectionTitle
        heading={"Manage all bookings"}
        subHeading={"At a Glance!"}
      ></SectionTitle>

      <div>
        <div>
          <div>
            <div>
              <div className="flex justify-start ml-4 my-4">
                <h2 className="text-xl font-semibold">
                  Bookings Record: {bookings.length}
                </h2>
              </div>
              <div>
                <div className="overflow-x-auto mx-4 shadow-xl">
                  <table className="table overflow-hidden">
                    {/* head */}
                    <thead className="bg-yellow-600 text-white">
                      <tr className="">
                        <th></th>
                        <th>USER EMAIL</th>
                        <th>PHONE NUMBER</th>
                        <th>BOOKING DATE</th>
                        <th>BOOKING TIME</th>
                        <th>ACTIVITY</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((singleData, index) => (
                        <tr key={singleData?._id}>
                          <td className="font-semibold">{1 + index}</td>
                          <td>{singleData?.email}</td>

                          <td className="opacity-75">{singleData?.phone}</td>
                          <td className="opacity-75">{singleData?.date}</td>
                          <td className="opacity-75">{singleData?.time}</td>
                          <td className="capitalize">
                            {singleData?.status === "pending" ? (
                              <p className="flex items-center w-fit bg-yellow-100 text-yellow-700 p-1 rounded-md">
                                <GoDotFill />
                                {singleData?.status}
                              </p>
                            ) : (
                              <p className="flex items-center w-fit bg-green-100 text-green-700 p-1 rounded-md">
                                <GoDotFill />
                                {singleData?.status}
                              </p>
                            )}
                          </td>

                          <th>
                            <button
                              onClick={() => handleActivity(singleData?._id)}
                              className={`${
                                singleData?.status === "pending"
                                  ? "btn bg-green-200 hover:bg-green-300 px-4 py-2 h-full btn-xs"
                                  : "btn bg-gray-200 hover:bg-gray-300 px-4 py-2 h-full btn-xs"
                              }`}
                            >
                              <GiConfirmed
                                className={`${
                                  singleData?.status === "pending"
                                    ? "size-5 text-green-500"
                                    : "size-5 text-gray-500"
                                }`}
                              />
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
