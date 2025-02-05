import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mt-20 mb-10 space-y-3">
      <p className="text-center text-yellow-500 italic">---{subHeading}---</p>
      <h2 className="text-3xl font-semibold text-center uppercase border-t-4 py-3 max-w-lg mx-auto border-b-4">
        {heading}
      </h2>
    </div>
  );
};

export default SectionTitle;
