import React from "react";
// import img from '../../util/assets/images/courseBanner.png'
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import defaultImage from "../../../../assets/courseImg.png";
const CourseCard = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded-[2.5rem] shadow-md">
      <div className="flex flex-col">
        <img
          className="rounded-t-xl h-[250px]"
          src={
            data?.images.length
              ? `https://cdn.ostello.co.in/${data?.images[0]?.key}`
              : defaultImage.src
          }
          alt=""
        />
        <div className="my-5 flex-col flex px-4">
          <div className="flex justify-between">
            <Link prefetch={false}
              href={`/admin-dashboard/courses/review-course/${data?.id}`}
              className=" text-[18px] cursor-pointer font-semibold leading-[30px] "
            >
              {data.name}
            </Link>
           
            <div className="flex bg-[#FFD130] px-3 py-0 text-white font-bold rounded-lg  items-center">
              {data.rating}
              <AiFillStar className="ml-1" />
            </div>
          </div>
          <div className=" ">
              <div className="">
                <p className="text-md font-bold"> {data?.category?.name}</p>
                {data?.category?.classes?.length ||
                data?.category?.exams?.length ? (
                  <p className="text-md">
                    {" "}
                    {data?.category?.classes.length
                      ? data?.category?.classes
                      : data?.category?.exams}
                  </p>
                ) : (
                  ""
                )}
                {/* <p
            className="line-through"
            style={{ color: "#E46060", textDecorationLine: "line-through" }}
          >
            Rs.{course.grossprice}
          </p> */}
              </div>
            </div>
          <h3 className="font-bold text-xl">Rs. {data.grossprice}</h3>
          <del className="text-sm text-[#FF0000]">Rs.{data.discountprice}</del>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
