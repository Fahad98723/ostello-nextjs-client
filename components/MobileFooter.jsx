import React from "react";
import { FaUserCircle, FaBook, FaUniversity } from "react-icons/fa";

const MobileFooter = ({ className, isExpanded }) => {

  return (
    <nav
      className={`${className} transition-transform duration-200 ${isExpanded ? "ease-in translate-y-0" : "ease-in-out translate-y-20"}  font-dm-sans h-20 bg-white text-white flex flex-row justify-center items-center space-x-6`}
    >
      <button className="flex flex-col justify-center items-center h-full px-2 focus:bg-secondary">
        <FaUserCircle className="text-primary" size={32} />
        <p className="text-primary">About us</p>
      </button>
      <button className="flex flex-col justify-center items-center h-full px-2 focus:bg-secondary">
        <FaBook className="text-primary" size={32} />
        <p className="text-primary">Courses</p>
      </button>
      <button className="flex flex-col justify-center items-center h-full px-2 focus:bg-secondary">
        <FaUniversity className="text-primary" size={32} />
        <p className="text-primary">Institute</p>
      </button>
    </nav>
  );
};

export default MobileFooter;
