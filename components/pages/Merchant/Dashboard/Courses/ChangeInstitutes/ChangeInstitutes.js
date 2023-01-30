import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCircleFill } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";

const ChangeInstitute = () => {
  const { loading, adminInstitutes } = useSelector(
    (state) => state.adminInstitutes
  );

  const navigate = useNavigate()

  const handelReview = (id) => {
    console.log(id);
    navigate(`/reviewChanges/${id}`)
  }
  return (
    <div className="grid mt-8 pb-[40px] md:grid-cols-2 gap-8 lg:gap-x-8">
      {adminInstitutes
        .filter((data) => data.requestApproval === 4)
        .map((data, index) => (
          <div key={index}>
            <div className="bg-white px-[18px] border border-light-gray rounded-lg py-3.5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[21px] text-[#414141] font-bold ">
                    {data.name}
                  </h3>
                  <div className="text-[#767676] flex">
                    <p className="mr-1">{data.locations[0].state},</p>
                    {data.locations[0].city}
                  </div>
                </div>
                <button onClick={() => handelReview(data.id)} className="font-medium text-[#ffffff] text-[20px] px-4 rounded-md py-1 bg-[#7D23E0]">
                  Review
                </button>
              </div>
              <div className="flex items-center">
                <BsFillCircleFill className="text-[6px] text-[#3AC817]" />
                <span className="ml-2 my-1 text-[#414141]">Online</span>
              </div>
              <div className="text-[18px] text-[#747474]">
                {data.description}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChangeInstitute;
