import React, { useState } from "react";

const AddFaculty = () => {
  const [faculties, setFaculties] = useState([]);

  return (
    <>
      <div className="shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0">
        {faculties.length === 0 ? (
          <h4>No Faculties Found</h4>
        ) : (
          faculties.map((faculty,idx) => (
            <div key={idx} className="flex items-center ">
              <input type="checkBox" />

              <img
                src={`${faculty.src}`}
                className="rounded-full w-8 h-8 lg:w-10 lg:h-10 ml-5 "
                alt=""
              />

              <div className="flex flex-col ml-2 lg:ml-4 ">
                <input
                  type="text"
                  className="text-sm lg:text-lg font-bold focus:outline-none"
                  defaultValue={faculty.name}
                  disabled
                />

                <p className="text-xs lg:text-sm" style={{ color: "#A4A4A4" }}>
                  {faculty.qulalification}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AddFaculty;
