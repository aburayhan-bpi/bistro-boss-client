import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../components/SectionTitle";
import { GoDotFill } from "react-icons/go";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuthContext";

const Bookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Booking has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
    console.log(id);
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <div className="flex justify-center -mt-14">
              <SectionTitle
                subHeading={"Excellent Ambience"}
                heading={"My bookings"}
              ></SectionTitle>
            </div>
            <div className="flex justify-start ml-4 my-4">
              <h2 className="text-xl font-semibold">
                Total bookings: {bookings.length}
              </h2>
            </div>
            <div>
              <div className="overflow-x-auto mx-4 shadow-xl">
                <table className="table overflow-hidden">
                  {/* head */}
                  <thead className="bg-yellow-600 text-white">
                    <tr className="">
                      <th></th>
                      {/* <th>ITEM IMAGE</th> */}
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                      <th>GUEST NUMBER</th>
                      <th>STATUS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bookings.length===0? <p>No data available</p> : ( bookings.map((singleData, index) => (
                      <tr key={singleData?._id}>
                        <td className="font-semibold">{1 + index}</td>

                        <td>{singleData?.name}</td>
                        <td>{singleData?.email}</td>
                        <td>{singleData?.phone}</td>
                        <td>
                          <h2>{singleData?.guest}</h2>
                        </td>
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
                            onClick={() => handleDelete(singleData?._id)}
                            className="btn bg-red-200 hover:bg-red-300 px-4 py-2 h-full btn-xs"
                          >
                            <FaRegTrashAlt className="size-5 text-red-500" />
                          </button>
                        </th>
                      </tr>
                    )))
                    }
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
