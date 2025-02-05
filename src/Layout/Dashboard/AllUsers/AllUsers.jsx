import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import { FaRegTrashAlt, FaUsersCog } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  console.log(users);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((result) => {
          console.log(result);
          if (result.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user?._id}`).then((result) => {
      console.log(result.data);
      if (result?.data?.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `${user?.name} is an Admin now!`,
          text: "User role updated successfully.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div>
        <div>
          <div className="flex justify-center -mt-14">
            <SectionTitle
              subHeading={"How Many??"}
              heading={"Manage all users"}
            ></SectionTitle>
          </div>
          <div className="flex justify-start ml-4 my-4">
            <h2 className="text-xl font-semibold">
              Total users: {users.length}
            </h2>
          </div>
          <div>
            <div className="overflow-x-auto mx-4 shadow-xl">
              <table className="table overflow-hidden">
                {/* head */}
                <thead className="bg-yellow-600 text-white">
                  <tr className="">
                    <th></th>
                    <th>PROFILE</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((singleData, index) => (
                    <tr key={singleData?._id}>
                      <td className="font-semibold">{1 + index}</td>
                      <td>
                        {" "}
                        {singleData?.photoURL ? (
                          <div className="flex items-center justify-start">
                            <div className="avatar">
                              <div className="mask rounded-full h-12 overflow-hidden shadow-md">
                                <img
                                  src={singleData?.photoURL}
                                  alt={singleData?.name}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-start gap-3">
                            <div className="avatar">
                              <div className="mask rounded-full h-12 overflow-hidden shadow-md">
                                <img
                                  src="https://i.ibb.co/ZKC1JP1/7718888.png"
                                  alt="N/A"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td>
                        <h2>{singleData?.name}</h2>
                      </td>
                      <td className="opacity-75">{singleData?.email}</td>
                      <td className="opacity-80">
                        {" "}
                        {singleData?.role === "admin" ? (
                          "Admin"
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(singleData)}
                            className="btn bg-[#D1A054] hover:bg-[#efb866] px-4 py-2 h-full btn-xs"
                          >
                            <FaUsersCog className="size-5 text-white" />
                          </button>
                        )}
                      </td>
                      <th>
                        <button
                          onClick={() => handleDelete(singleData?._id)}
                          className="btn bg-red-200 hover:bg-red-300 px-4 py-2 h-full btn-xs"
                        >
                          <FaRegTrashAlt className="size-5 text-red-500" />
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
  );
};

export default AllUsers;
