import React from "react";

const MenuItem = ({ item }) => {
  const { name, image, price, recipe } = item || {};
  return (
    <div>
      <div className="md:flex gap-4">
        <img
          className="rounded-r-full rounded-b-full w-32 h-20"
          src={image}
          alt="menu-card"
        />
        <div>
          <p className="text-lg uppercase">{name}------------</p>
          <p className="text-gray-500 text-sm">{recipe}</p>
        </div>
        <p className="text-yellow-500">${price}</p>
      </div>
    </div>
  );
};

export default MenuItem;
