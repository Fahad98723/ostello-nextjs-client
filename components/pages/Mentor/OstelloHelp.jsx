import React from 'react';
import helpImg from "../../../assets/mentor/help_img.svg";

const OstelloHelp = () => {
  return (
    <section className='mt-20 bg-primary md:w-full md:max-h-[600px] w-[433px] px-5'>
      <div className="flex items-center md:justify-center md:flex-row flex-col md:gap-10 mt-5">
        <div className="flex flex-col md:w-[600px] md:h-[584px] pt-5">
      <h1 className="md:text-[41px] text-[#FFD600] pt-10 px-5 text-[25px]">How We can help you</h1>
        <div className="flex justify-center items-center gap-5 pt-10">
          <div className="md:w-[90px] md:h-[90px] bg-white py-6 px-6 flex justify-center items-center text-primary md:text-[40px] rounded-full font-bold">01</div>
          <div className="flex flex-col text-white text-start">
            <p className="md:text-[30px] text-[18px]">Career Guidance</p>
            <p className="md:text-[18px] ">Connect to a career mentor near you in just 100 seconds and get ready to launch yourself into the future.</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-5">
          <p className="md:w-[90px] md:h-[90px] bg-white text-primary md:text-[40px] rounded-full font-bold py-6 px-6 flex justify-center items-center">02</p>
          <div className="flex flex-col text-white text-start">
            <p className="md:text-[30px] text-[18px]">Coaching Marketplace</p>
            <p className="md:text-[18px]">Find the right coaching institute for you in your own locality.</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-5">
          <p className="md:w-[90px] md:h-[90px] bg-white text-primary md:text-[40px] rounded-full font-bold py-6 px-6 flex justify-center items-center">03</p>
          <div className="flex flex-col text-white text-start">
            <p className="md:text-[30px] text-[18px]">Get Inspired</p>
            <p className="md:text-[18px] text-[16px]">Englighten your minds by learning about the career journeys of students who were once in your shoes and now have successful professional careers.</p>
          </div>
        </div>
        </div>
        <div className="w-[433px] md:w-[448px]">
        <img
              className=""
              src={helpImg.src}
              alt=""
            />
        </div>
      </div>
    </section>
      
  );
};

export default OstelloHelp;