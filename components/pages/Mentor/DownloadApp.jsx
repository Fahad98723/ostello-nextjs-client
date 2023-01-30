import React from 'react'
import mobile from "../../../assets/mentor/mobile.svg";
import google from "../../../assets/mentor/google.svg";
import apple from "../../../assets/mentor/apple.svg";

export default function DownloadApp() {
  return (
    <section className='mt-20 w-[433px] bg-primary md:w-full md:h-[567px]'>
      <div className="flex items-center md:justify-center md:flex-row flex-col md:gap-[250px]">
        <div className="flex flex-col items-start text-[20px] px-5 text-white md:w-[531px] md:h-[308px]">
        <p className="md:text-[23px] md:mt-3 mt-10">GET THIS APP</p>
        <p className="md:text-[41px] mt-3">Download the Application</p>
        <p className="md:text-[18px] mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
        <div className="flex md:justify-center md:flex-row flex-col items-center gap-5 md:mt-[80px] mt-[50px]">
        <img
              className="w-[205px] h-[60px] cursor-pointer"
              src={google.src}
              alt=""
            />
        <img
              className="w-[205px] h-[60px] cursor-pointer"
              src={apple.src}
              alt=""
            />
        </div>
        </div>
        <div className="">
        <img
              className="w-[308px] md:h-[439px] mt-[150px]"
              src={mobile.src}
              alt=""
            />
        </div>
      </div>
    </section>
  )
}
