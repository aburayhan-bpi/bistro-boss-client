import React from "react";
import MenuItem from "../../Shared/MenuItem";
import Cover from "../../Shared/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title }) => {
  // console.log(title)
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>{" "}
      <button className="mt-4 rounded-lg border-black border-b-4 hover:border-white hover:bg-black hover:text-white w-36 p-1">
        <Link to={`/our-shop/${title}`}>Order your food</Link>
      </button>
    </div>
  );
};

export default MenuCategory;
