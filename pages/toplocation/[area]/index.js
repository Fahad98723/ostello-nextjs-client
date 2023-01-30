import React, { useState } from "react";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/pages/HomeLanding/Header/Navbar";
import OstelloSubscribe from "../../../components/pages/HomeLanding/OstelloSubscribe";
import banner from '../../../assets/toplocationbanner.png'
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const TopLocation = dynamic(
  () => {
    return import("../../../components/pages/TopLocation/TopLocation");
  },
  { ssr: false }
);

const TopLocationData = () => {


  return (
    <section>
      <div className=" md:max-w-[1350px] mx-auto">
        <div className="md:mb-[100px]">
          <div className="fixed top-0 z-50 bg-white  md:max-w-[1350px] w-full mx-auto  shadow">
            <Navbar text={"text-[#667085]"} />
          </div>         
        </div>
       <div className="md:p-10 p-5 container mx-auto">
       <img className="w-full" src={banner.src} alt="" />
       </div>
       <TopLocation/>
      </div>

      <div className="md:p-10 p-5 container mx-auto">
        <OstelloSubscribe />
        <Footer />
      </div>
    </section>
  );
};

export default TopLocationData;
