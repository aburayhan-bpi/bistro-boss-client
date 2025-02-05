import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTimeFilled, MdOutlineWifiCalling3 } from "react-icons/md";

const LocationCard = ({ icon, title, phone, date1, date2 }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-yellow-500 w-full flex justify-center items-center p-2">
        {icon === "phone" && (
          <MdOutlineWifiCalling3 className="text-white size-6" />
        )}
        {icon === "location" && <FaLocationDot className="text-white size-6" />}
        {icon === "time" && (
          <MdAccessTimeFilled className="text-white size-6" />
        )}
      </div>

      <div className="flex flex-col justify-center items-center my-10">
        <h2 className="mb-2 font-semibold text-lg uppercase">{title}</h2>
        <p className="text-xs">{phone}</p>
        <p className="text-xs">{date1}</p>
        <p className="text-xs">{date2}</p>
      </div>
    </div>
  );
};

export default LocationCard;
