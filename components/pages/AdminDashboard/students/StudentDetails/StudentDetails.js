import React from "react";
import StudentContainer from "../StudentContainer/StudentContainer.js";
import StudentMobileMenu from "../StudentMobileMenu/StudentMobileMenu.js";
import StudentSidebar from "../StudentSidebar/StudentSidebar";

const StudentDetails = () => {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="w-[240px] md:block hidden ">
        <StudentSidebar />
      </div>
      <StudentMobileMenu />
      <div className="w-full">
        <StudentContainer />
      </div>
    </div>
  );
};

export default StudentDetails;
