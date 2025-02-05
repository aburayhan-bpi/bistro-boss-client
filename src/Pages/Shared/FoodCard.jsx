import React from "react";
import useAuth from "../../hooks/useAuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();
  const { name, image, price, recipe, _id } = item || {};

  const handleAddToCard = (item) => {
    // console.log(item);
    if (user && user?.email) {
      // send cart item to db

      const cartItem = {
        menuId: _id,
        email: user?.email,
        name,
        image,
        price,
      };

      // axios.post("http://localhost:5000/carts", cartItem).then((res) => {
      //   console.log(res.data);
      // });

      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        Swal.fire({
          title: `${item?.name} Added to cart!`,
          icon: "success",
        });
        // refetch cart to update the cart items count
        refetch();
      });
    } else {
      return Swal.fire({
        title: "You are not logged in!",
        text: "Please login first!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log in!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: location.pathname });
        }
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 rounded-none shadow-xl flex flex-col h-full">
        {" "}
        {/* Full height */}
        <figure className="h-52">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <p className="absolute right-3 top-3 bg-black text-white px-3 py-1 rounded-sm">
            ${price}
          </p>
        </figure>
        <div className="card-body flex flex-col flex-1 items-center">
          {" "}
          {/* Makes the body grow */}
          <h2 className="card-title  text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-600 flex-grow text-center">
            {recipe}
          </p>
          {/* Recipe grows */}
          <div className="card-actions justify-end mt-auto">
            {" "}
            {/* Sticks button to the bottom */}
            <button
              onClick={() => handleAddToCard(item)}
              className="bg-gray-200 px-4 py-2 rounded-lg border-b-4 border-yellow-300 text-yellow-700 hover:bg-black hover:border-black hover:text-white transition-all"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
