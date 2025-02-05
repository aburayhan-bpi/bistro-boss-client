import React from "react";
import SectionTitle from "../../../../components/SectionTitle";
import LocationCard from "./LocationCard";

const OurLocation = () => {
  return (
    <div>
      <SectionTitle
        heading={"Our location"}
        subHeading={"Visit Us"}
      ></SectionTitle>
      {/* Location Card */}
      <div className="grid gap-1 grid-cols-1 md:grid-cols-3 bg-gray-200">
        <div>
          <LocationCard
            icon={"phone"}
            title={"Phone"}
            phone={"+38 (012) 34 56 789"}
          />
        </div>
        <div>
          <LocationCard
            icon={"location"}
            title={"Address"}
            phone={"+38 (012) 34 56 789"}
          />
        </div>
        <div>
          <LocationCard
            icon={"time"}
            title={"Working hours"}
            date1={"Mon-Fri: 08:00 - 22:00"}
            date2={"Sat-Sun: 10:00 - 23:00"}
          />
        </div>
      </div>
    </div>
  );
};

export default OurLocation;
