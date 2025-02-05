import React from "react";
import { IoWallet } from "react-icons/io5";
import useAuth from "../../../hooks/useAuthContext";
import { FaShop } from "react-icons/fa6";
import { MdWifiCalling3 } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle";
import useCart from "../../../hooks/useCart";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart
    .reduce((acc, current) => acc + current.price, 0)
    .toFixed(2);
  //   console.log(totalPrice);

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
        axiosSecure.delete(`/carts/${id}`).then((result) => {
          console.log(result);
          if (result.data.deletedCount > 0) {
            refetch();
          }
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center -mt-14">
        <SectionTitle
          subHeading={"My Cart"}
          heading={"Wanna Add More?"}
        ></SectionTitle>
      </div>
      <div>
        <div className="flex justify-evenly items-center mb-3">
          <h2 className="font-bold">Total Orders: {cart.length}</h2>
          <h2 className="font-bold">Total Price: ${totalPrice}</h2>
          {cart.length ? (
            <Link to="/dashboard/payment">
              <div className="btn bg-yellow-600 hover:bg-yellow-700 text-white rounded-md px-7 w-fit">
                Pay
              </div>
            </Link>
          ) : (
            <div
              disabled
              className="btn bg-yellow-600 hover:bg-yellow-700 text-white rounded-md px-7 w-fit"
            >
              Pay
            </div>
          )}
        </div>
        {/* table */}
        <div className="overflow-x-auto mx-4 shadow-xl">
          <table className="table overflow-hidden">
            {/* head */}
            <thead className="bg-yellow-600 text-white">
              <tr className="">
                <th></th>
                <th>ITEM IMAGE</th>
                <th>ITEM NAME</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <p>No data available</p>
              ) : (
                cart.map((singleData, index) => (
                  <tr key={singleData?._id}>
                    <td className="font-semibold">{1 + index}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask rounded-md h-12 w-16 shadow-md">
                            <img
                              src={singleData?.image}
                              alt={singleData?.name}
                            />
                          </div>
                        </div>
                        {/* <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div> */}
                      </div>
                    </td>
                    <td className="opacity-75">
                      {singleData?.name}
                      {/* <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span> */}
                    </td>
                    <td className="opacity-80">${singleData?.price}</td>
                    <th>
                      <button
                        onClick={() => handleDelete(singleData?._id)}
                        className="btn bg-red-200 hover:bg-red-300 px-4 py-2 h-full btn-xs"
                      >
                        <FaRegTrashAlt className="size-5 text-red-500" />
                      </button>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
