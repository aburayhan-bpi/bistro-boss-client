import { FaRegTrashAlt, FaUsersCog } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BlinkBlur } from "react-loading-indicators";
import { Link, Navigate } from "react-router-dom";

const ManageItems = () => {
  const [menu, refetch, isLoading] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${id}`);
        console.log(res.data);

        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Menu item has been deleted.",
            icon: "success",
          });
        }

        // console.log(id);
      }
    });
  };

  //   const updateMenu = (item) => {
  //     console.log(item?._id, item);
  //   };

  return (
    <div>
      <div>
        <div>
          <div className="flex justify-center -mt-14">
            <SectionTitle
              subHeading={"Hurry up!"}
              heading={"Manage all items"}
            ></SectionTitle>
          </div>
          <div className="flex justify-start ml-4 my-4">
            <h2 className="text-xl font-semibold">Total menu: {menu.length}</h2>
          </div>
          <div>
            <div className="overflow-x-auto mx-4 shadow-xl">
              <table className="table overflow-hidden">
                {/* head */}
                <thead className="bg-yellow-600 text-white">
                  <tr className="">
                    <th></th>
                    <th>ITEM IMAGE</th>
                    <th>ITEM NAME</th>
                    <th>PRICE</th>
                    <th>UPDATE</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <div className="flex justify-center p-4">
                      <BlinkBlur
                        color="#D1A054"
                        size="small"
                        text=""
                        textColor=""
                      />
                    </div>
                  )}
                  {menu.map((item, index) => (
                    <tr key={item?._id}>
                      <td className="font-semibold">{index + 1}</td>
                      <td>
                        {" "}
                        {item?.image ? (
                          <div className="flex items-center justify-start">
                            <div className="avatar">
                              <div className="mask rounded-box h-12 overflow-hidden shadow-md">
                                <img src={item?.image} alt={item?.name} />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-start gap-3">
                            <div className="avatar">
                              <div className="mask rounded-box overflow-hidden shadow-md">
                                <img
                                  src="https://i.ibb.co/ZxqXTMB/icons8-utensil-64.png"
                                  alt="N/A"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td>
                        <h2 className="text-gray-500">{item?.name}</h2>
                      </td>
                      <td className="text-gray-500">${item?.price}</td>
                      <td className="opacity-80">
                        {" "}
                        <Link to={`/dashboard/update-item/${item?._id}`}>
                          <button
                            //   onClick={() => updateMenu(item)}
                            className="btn bg-[#D1A054] hover:bg-[#efb866] px-4 py-2 h-full btn-xs"
                          >
                            <FiEdit className="size-5 text-white" />
                          </button>
                        </Link>
                      </td>
                      <th>
                        <button
                          onClick={() => handleDelete(item?._id)}
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

export default ManageItems;
