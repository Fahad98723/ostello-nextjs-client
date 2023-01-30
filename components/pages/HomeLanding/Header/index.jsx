import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar/index";
import BG from "../../../../assets/courses_institutions/course-banner/GroupBG.webp";
import MBG from "../../../../assets/courses_institutions/course-banner/GroupMBG.webp";
import useScreenWidth from "../../../hooks/useScreenWidth";
export default function Header() {
  const { screenWidth } = useScreenWidth();
  return (
    <div>

      <section className=" px-2 ">
        <div
          style={
            screenWidth > 768
              ? {
                  backgroundImage: `url(${BG.src})`,
                  backgroundRepeat: "no-repeat",
                  borderRadius: "15px",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  marginTop: "70px",
                }
              : {
                  backgroundImage: `url(${MBG.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  padding: "180px  30px 200px 40px",
                  marginTop: "80px",
                  backgroundPosition: "center center",
                }
          }
          className="rounded-xl "
        >
          <div className="xl:py-36  py-16    md:px-8 ">
            <h1 className="my-5 md:my-10 text-[55px] md:block hidden text-black  leading-12 md:leading-none font-bold ">
              Discover the best <br /> coaching institutes <br /> in your area
            </h1>
            <h1 className="my-5 md:my-10 text-[30px] md:hidden block text-black  leading-[40px] font-bold ">
              Discover the best <br /> coaching institutes <br /> in your area
            </h1>
            <p className=" md:w-[400px]  text-justify leading-6 text-lg">
              Designed by creators for millions of students all over India. With
              over a 1000 coaching institutions listed, Ostello lets you compare
              and choose the best for you.
            </p>
          </div>
        </div>
      </section>
      <div
        className="sm:-mt-8 mt-1
       "
      >
        <SearchBar />
      </div>
    </div>
  );
}
