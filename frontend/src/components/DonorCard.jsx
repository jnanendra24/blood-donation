import React from "react";

const DonorCard = ({ name, bloodGroup, location, phone }) => {
  return (
    <div className="flex justify-between bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-all duration-500">
      <div className="flex flex-col">
        <span className="text-lg font-bold">{name}</span>
        <span>{location}</span>
        <span>{phone}</span>
      </div>
      <div>
        <span className="text-4xl">{bloodGroup}</span>
      </div>
    </div>
  );
};

export default DonorCard;
