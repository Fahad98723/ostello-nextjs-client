import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiFillStar, AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import EmptyCourse from "./EmptyCourse";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../../redux/slices/authSlice";
import { host } from "../../../../../utils/constant";
import { useRouter } from "next/router";
import { titleToUrl } from "../../../../utils";
import { clearAddCourseState } from "../../../../../redux/slices/AddCourseSlice";
import CourseImg from "../../../../../assets/courseImg.png";
import { Pagination } from "@mui/material";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { instituteDetails } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAddCourseState());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Courses - Ostello India";
    // setCourses(instituteDetails.courses);
  }, []);


  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState();
  const [limit, setLimit] = useState(15);

  useEffect(() => {
    const run = async () => {
      if (instituteDetails?.id) {
        try {
          const res = await axios.get(
            `${host}/course?instituteId=${instituteDetails?.id}&skip=${
              skip * 15
            }&limit=${limit}`
          );
          if (skip === 0) {
            setPaginationButton(Math.ceil(res?.data.totalCount / 15));
          }
  
          if (skip !== 0) {
            setPaginationButton(Math.ceil(res?.data.totalCount / 15));
          }
        
          setCourses(res?.data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [instituteDetails?.id, limit, skip]);

  const reFetcher = () => {
    dispatch(getInstituteDetails());
  };

  async function handleDelete(id) {
    try {
      await axios.delete(`${host}/course?id=${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });
      reFetcher();
      toast.success("Course deleted successfully !");
    } catch (err) {
      toast.error(`Something went wrong! couldn't delete the course`);
      console.log(err);
    }
  }

  const router = useRouter();

  return (
    <div className="p-5">
      <div className="heading mb-5">
        <h1 className="text-2xl font-bold ">Your Courses</h1>
        <div className=" fixed lg:relative lg:mt-8 bottom-0 lg:right-0 mb-10 lg:mb-0 z-40 lg:flex items-center w-full">
          <button
            className="flex items-center  ml-auto w-32 py-2 lg:py-1  mr-10 rounded-full text-white justify-center bg-primary"
            onClick={(e) => {
              router.push("/merchant/dashboard/addCourses");
            }}
          >
            <AiOutlinePlus className="text-white" />
            <p className="">Add Course</p>
          </button>
        </div>
      </div>
      {courses?.length > 0 ? (
        <>
        <div className="w-full  grid lg:grid-cols-3 gap-4  px-6 lg:px-12 4 lg:py-6  m-auto lg:m-0 ">
          {courses?.map((course, idx) => (
            <CourseCard course={course} handleDelete={handleDelete} key={idx} />
          ))}
        
        </div>
        <Pagination className="mt-3 px-6 lg:px-12"
        onChange={(e, v) => {
          setSkip(v - 1);
          console.log(v);
        }}
        count={paginationButton}
        variant="outlined"
        shape="rounded"
      />
        </>
      ) : (
        <EmptyCourse />
      )}
    </div>
  );
};

export default Courses;

export const CourseCard = (props) => {
  const { course, handleDelete, idx } = props;
  const router = useRouter();
  const { instituteDetails } = useSelector(authSelector);

  return (
    <div className=" w-[300px] rounded-3xl  bg-transparent   m-auto lg:m-0">
      <div className="relative z-0 bg-transparent">
        <RiDeleteBinLine
          className="absolute w-10 h-10 z-10 p-2 border-2 text-2xl bg-transparent mr-2 lg:mr-4 lg:top-4 top-2 right-0 rounded-full text-[#E46060] cursor-pointer"
          onClick={() => {
            handleDelete(course.id);
          }}
        />
        <AiOutlineEdit
          className="absolute w-10 h-10 z-10 p-2 border-2  bg-transparent mr-2 lg:ml-4 lg:top-4 top-2 left-0 rounded-full text-[#00B912] cursor-pointer"
          onClick={() => {
            router.push(`/merchant/dashboard/courses/${course.id}`);
          }}
        />
        <img
          src={
            course?.images?.length
              ? `https://cdn.ostello.co.in/${course?.images[0]?.key}`
              : CourseImg.src
          }
          alt=""
          className=" object-fill min-h-[250px] bg-transparent"
        />
      </div>
      <div className="flex items-center px-4 py-3">
        <div className="">
          <p className="font-bold">{course.name}</p>
        </div>
        <div
          className="flex items-center rounded-lg space-x-1 text-white ml-auto px-2 lg:mr-2"
          style={{ backgroundColor: "#FFD130" }}
        >
          <p className="lg:text-xl">{course.rating}</p>
          <AiFillStar />
        </div>
      </div>

      <div className=" px-4  items-center">
        <div className="">
          {/* <p className="font-bold">{course?.faculties?.name}</p> */}
          <p className="text-md font-bold"> {course?.category?.name}</p>
          {course?.category?.classes?.length ||
          course?.category?.exams?.length ? (
            <p className="text-md">
              {" "}
              {course?.category?.classes.length
                ? course?.category?.classes
                : course?.category?.exams}
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

      <div className="py-2 px-4 flex items-center">
        <div className="">
          <p className="text-2xl font-bold">
            Rs.{" "}
            {course?.pricingdetails?.monthly?.effectiveprice ||
              course?.pricingdetails?.halfYearly?.effectiveprice ||
              course?.pricingdetails?.yearly?.effectiveprice ||
              course?.effectiveprice}
          </p>
          <p
            className="line-through"
            style={{ color: "#E46060", textDecorationLine: "line-through" }}
          >
            Rs.
            {course?.pricingdetails?.monthly?.grossprice ||
              course?.pricingdetails?.halfYearly?.grossprice ||
              course?.pricingdetails?.yearly?.grossprice ||
              course?.grossprice}
          </p>
        </div>
        <div className="bg-[#E3FFE6] p-2 px-4  ml-auto">
          {course.approval === 1 ? (
            <p className="text-[#00B912]">Approved</p>
          ) : (
            <p className="text-[#FF0000]">Not Approved</p>
          )}
        </div>
      </div>
    </div>
  );
};
