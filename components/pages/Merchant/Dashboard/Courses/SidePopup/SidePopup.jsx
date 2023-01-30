import axios from "axios";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import React, { useState, useEffect, createContext, useContext } from "react";

import { host } from '../../../../../../utils/constant'
import Filters from "../CourseAdding/Filters";
import CoursePrice from "../CourseAdding/CoursePrice";
import { BasicDetails } from "../CourseAdding/BasicDetails";
import ProductionSupport from "../CourseAdding/ProductionSupport";
import SyllabusDescription from "../CourseAdding/SyllabusDescription";
import { addCourseSelector } from "../../../../../../redux/slices/AddCourseSlice";
import AdditionalDescription from "../CourseAdding/AdditionalDescription";
import Faqs from "../CourseAdding/Faqs";

export const SidePopupContext = createContext();

const SidePopup = () => {
  const {
    basicDetails,
    additionalDescription,
    coursePrice,
    selectedImages,
    selectedVideos,
    syllabusDescription,
  } = useSelector(addCourseSelector);
  const [{ isVisible, handleClose }] = useContext(SidePopupContext);

  const [proceed1, setProceed1] = useState(false);
  const [proceed2, setProceed2] = useState(false);
  const [proceed3, setProceed3] = useState(false);
  const [proceed4, setProceed4] = useState(false);
  const [proceed5, setProceed5] = useState(false);
  const [proceed6, setProceed6] = useState(false);
  const [proceed11, setProceed11] = useState(false);
  const [proceed21, setProceed21] = useState(false);
  const [proceed31, setProceed31] = useState(false);
  const [proceed41, setProceed41] = useState(false);
  const [proceed51, setProceed51] = useState(false);
  const [proceed61, setProceed61] = useState(false);
  const [isBasicDetails, setIsBasicDetails] = useState(true);
  const [isBasicDetails11, setIsBasicDetails11] = useState(false);
  const [isAdditionaDetails, setIsAdditionaDetails] = useState(false);
  const [isFilters, setIsFilters] = useState(false);
  const [isSyllabus, setIsSyllabus] = useState(false);
  const [isFaqs, setIsFaqs] = useState(false);
  const [isCoursePrice, setIsCoursePrice] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [isSubmitTrue, setIsSubmitTrue] = useState(false);

  console.log(proceed6);

  const [page1, setPage1] = useState(true);
  const [page2, setPage2] = useState(false);
  const [page3, setPage3] = useState(false);

  const [track1, setTrack1] = useState(false);
  const [track2, setTrack2] = useState(false);

  const [categorySelected, setCategorySelected] = useState("Course category*");

  const [isDropDown1, setisDropDown1] = useState(false);
  const [isDropDown2, setisDropDown2] = useState(false);
  const [isDropDown3, setisDropDown3] = useState(false);
  const [isDropDown4, setisDropDown4] = useState(false);
  const [isDropDown5, setisDropDown5] = useState(false);
  const [isDropDown6, setisDropDown6] = useState(false);
  const [isDropDown7, setisDropDown7] = useState(false);

  useEffect(() => {
    if (proceed1) {
      setIsAdditionaDetails(true);
      setIsBasicDetails(false);
    }
    if (proceed2) {
      setIsAdditionaDetails(false);

      setIsFilters(true);
    }

    if (proceed3) {
      setIsSyllabus(true);
      setIsFilters(false);
    }
    if (proceed4) {
      setIsFaqs(true);
      setIsSyllabus(false);
    }
    if (proceed6) {
      setIsCoursePrice(true);
      setIsFaqs(false);
    }
    if (proceed5) {
      setIsProduct(true);
      setIsCoursePrice(false);
    }
  }, [
    isBasicDetails,
    proceed1,
    isAdditionaDetails,
    proceed2,
    proceed3,
    proceed4,
    proceed6,
    proceed5,
  ]);

  function handleSend() {
    const objectives = [
      additionalDescription.object1,
      additionalDescription.object2,
      additionalDescription.object3,
      additionalDescription.object4,
    ];

    const highlights = [
      additionalDescription.highlight1,
      additionalDescription.highlight2,
      additionalDescription.highlight3,
      additionalDescription.highlight4,
      additionalDescription.highlight5,
    ];

    const instituteid = typeof window !== 'undefined' && window.localStorage.getItem("INSTITUTE_ID");

    const formData = new FormData();
    formData.append("instituteid", instituteid);
    formData.append("name", basicDetails.courseName);
    formData.append("description", basicDetails.courseDescription);
    formData.append(
      "mode",
      basicDetails.courseMode === "Hybrid"
        ? 1
        : basicDetails.courseMode === "Online"
        ? 2
        : 3
    );
    formData.append("duration", basicDetails.courseDuration);
    formData.append("category", JSON.stringify(basicDetails.courseCategories));
    formData.append("syllabus", JSON.stringify(syllabusDescription));
    formData.append("faculty", "demo");
    formData.append("grossprice", coursePrice.grossPriceValue);
    formData.append("discountprice", coursePrice.discPriceValue);
    formData.append("minimumprice", coursePrice.minimumPriceValue);
    formData.append("effectiveprice", coursePrice.effectivePriceValue);
    formData.append("objectives", JSON.stringify(objectives));
    formData.append("highlights", JSON.stringify(highlights));
    formData.append("images", selectedImages);
    formData.append("videos", selectedVideos);
    formData.append("targetaudience", "demo");
    formData.append("coupons", "demo");

    axios
      .post(`${host}/course`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      })
      .then((res) => res.data)
      .catch((e) => console.error(e));

    setIsSubmitTrue(true);
  }

  return (
    <>
      <main
        className={`z-30 w-screen overflow- min-h-screen lg:h-screen absolute top-0 lg:bg-[#F9F9F9] font-dm-sans ${
          isVisible ? "block" : "hidden"
        }`}
        style={{ background: `rgba(0, 0, 0, .3)` }}
      >
        <section
          className={`z-[35] w-screen bg-white lg:bg-[#F9F9F9] h-screen lg:absolute lg:right-0 lg:top-0  duration-500 transition-all lg:delay-300 ${
            !isVisible
              ? "opacity-0 lg:translate-x-[50vw]"
              : "opacity-100 lg:translate-x-0"
          }`}
        >
          <header
            className="flex items-center bg-white h-16  lg:px-10"
            style={{ boxShadow: "0px 8px 60px rgba(122, 129, 220, 0.15)" }}
          >
            {/* <h1 className="text-xl font-bold">{title}</h1> */}

            <button
              className="flex font-medium items-center px-2 lg:px-0 space-x-1 lg:space-x-2"
              onClick={(e) => handleClose(e)}
            >
              <MdKeyboardArrowLeft />
              <p className=""> Back to courses</p>
            </button>

            <div className="flex-1"></div>

            <div className="border-2  px-3 rounded-md mr-10 border-primary">
              <button className="text-primary">Save as draft</button>
            </div>
            {/* <button
            onClick={(e) => handleClose(e)}
            className="w-8 h-8 flex items-center justify-center aspect-square rounded-full bg-light-red border-2 border-red text-[#FF0000]"
          >
            <BiX size={24} />
          </button> */}
          </header>

          {/* Add course For Desktop */}
          <div className="hidden lg:bg-[#F9F9F9]  lg:flex gap-5">
            <nav
              className={`hidden lg:inline font-dm-sans mt-4 mb-10 lg:mb-20 px-10 py-4 lg:bg-[#F9F9F9] h-max z-40  `}
            >
              <div className="">
                <h1 className="text-2xl font-medium ">Profile Section</h1>

                <div className="bg-white my-7 mx-2 mb-10 px-5 py-3 flex flex-col items-start space-y-2 rounded-lg w-72">
                  <div className="flex items-center gap-2 w-full">
                    {" "}
                    <button
                      className={`${
                        isBasicDetails ? "text-primary" : "text-solid"
                      } text-lg `}
                      onClick={() => {
                        setIsBasicDetails(true);
                        setIsAdditionaDetails(false);
                        setIsFilters(false);
                        setIsSyllabus(false);
                        setIsFaqs(false);

                        setIsCoursePrice(false);
                        setIsProduct(false);
                        setProceed1(false);
                        setProceed2(false);
                        setProceed3(false);
                        setProceed4(false);
                        setProceed5(false);
                        setProceed6(false);
                      }}
                    >
                      Basic Details
                    </button>
                    {proceed1 && (
                      <BsCheck
                        className="w-7 h-7 ml-auto text-[#0D9F1C] rounded-full"
                        style={{ background: "rgba(13, 159, 28, 0.25)" }}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <button
                      className={`${
                        isAdditionaDetails ? "text-primary" : "text-solid"
                      } text-lg `}
                      onClick={() => {
                        setIsBasicDetails(false);
                        setIsAdditionaDetails(true);
                        setIsFilters(false);
                        setIsSyllabus(false);
                        setIsFaqs(false);

                        setIsCoursePrice(false);
                        setIsProduct(false);
                        setProceed1(false);
                        setProceed2(false);
                        setProceed3(false);
                        setProceed4(false);
                        setProceed5(false);
                        setProceed6(false);
                      }}
                    >
                      Additional Description
                    </button>

                    {proceed2 && (
                      <BsCheck
                        className="w-7 h-7 ml-auto text-[#0D9F1C] rounded-full"
                        style={{ background: "rgba(13, 159, 28, 0.25)" }}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <button
                      className={`${
                        isFilters ? "text-primary" : "text-solid"
                      } text-lg `}
                      onClick={() => {
                        setIsBasicDetails(false);
                        setIsAdditionaDetails(false);
                        setIsFilters(true);
                        setIsSyllabus(false);
                        setIsFaqs(false);

                        setIsCoursePrice(false);
                        setIsProduct(false);
                        setProceed1(false);
                        setProceed2(false);
                        setProceed3(false);
                        setProceed4(false);
                        setProceed5(false);
                        setProceed6(false);
                      }}
                    >
                      Images & Videos
                    </button>
                    {proceed3 && (
                      <BsCheck
                        className="w-7 h-7 ml-auto text-[#0D9F1C] rounded-full"
                        style={{ background: "rgba(13, 159, 28, 0.25)" }}
                      />
                    )}
                  </div>
                </div>

                <h1 className="text-2xl font-medium ">What’s in the course</h1>

                <div className="bg-white my-7 mx-2 mb-10 px-5 py-3 flex flex-col items-start space-y-2 rounded-lg w-72">
                  <div className="flex items-center gap-2 w-full">
                    <button
                      className={`${
                        isSyllabus ? "text-primary" : "text-solid"
                      } text-lg `}
                      onClick={() => {
                        setIsBasicDetails(false);
                        setIsAdditionaDetails(false);
                        setIsFilters(false);
                        setIsSyllabus(true);
                        setIsFaqs(false);

                        setIsCoursePrice(false);
                        setIsProduct(false);
                        setProceed1(false);
                        setProceed2(false);
                        setProceed3(false);
                        setProceed4(false);
                        setProceed5(false);
                        setProceed6(false);
                      }}
                    >
                      Syllabus description
                    </button>
                    {proceed4 && (
                      <BsCheck
                        className="w-7 h-7 ml-auto text-[#0D9F1C] rounded-full"
                        style={{ background: "rgba(13, 159, 28, 0.25)" }}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <button
                      className={`${
                        isFaqs ? "text-primary" : "text-solid"
                      } text-lg `}
                      onClick={() => {
                        setIsBasicDetails(false);
                        setIsAdditionaDetails(false);
                        setIsFilters(false);
                        setIsSyllabus(false);
                        setIsFaqs(true);
                        setIsCoursePrice(false);
                        setIsProduct(false);
                        setProceed1(false);
                        setProceed2(false);
                        setProceed3(false);
                        setProceed4(false);
                        setProceed5(false);
                        setProceed6(false);
                      }}
                    >
                      FAQs
                    </button>
                    {proceed6 && (
                      <BsCheck
                        className="w-7 h-7 ml-auto text-[#0D9F1C] rounded-full"
                        style={{ background: "rgba(13, 159, 28, 0.25)" }}
                      />
                    )}
                  </div>
                </div>

                <h1 className="text-2xl font-medium ">Payment</h1>

                <div className="bg-white my-7 mx-2  px-5 py-3 flex flex-col items-start space-y-2 rounded-lg w-72">
                  <div className="flex items-center gap-2 w-full">
                    <button
                      className={`${
                        isCoursePrice ? "text-primary" : "text-solid"
                      } text-lg `}
                      onClick={() => {
                        setIsBasicDetails(false);
                        setIsAdditionaDetails(false);
                        setIsFilters(false);
                        setIsSyllabus(false);
                        setIsFaqs(false);

                        setIsCoursePrice(true);
                        setIsProduct(false);
                        setProceed1(false);
                        setProceed2(false);
                        setProceed3(false);
                        setProceed4(false);
                        setProceed5(false);
                        setProceed6(false);
                      }}
                    >
                      Course Price & Coupons
                    </button>
                    {proceed5 && (
                      <BsCheck
                        className="w-7 h-7 ml-auto text-[#0D9F1C] rounded-full"
                        style={{ background: "rgba(13, 159, 28, 0.25)" }}
                      />
                    )}
                  </div>

                  <button
                    className={`${
                      isProduct ? "text-primary" : "text-solid"
                    } text-lg `}
                    onClick={() => {
                      setIsBasicDetails(false);
                      setIsAdditionaDetails(false);
                      setIsFilters(false);
                      setIsSyllabus(false);
                      setIsFaqs(false);

                      setIsCoursePrice(false);
                      setIsProduct(true);
                      setProceed1(false);
                      setProceed2(false);
                      setProceed3(false);
                      setProceed4(false);
                      setProceed5(false);
                      setProceed6(false);
                    }}
                  >
                    Production Support
                  </button>
                </div>
              </div>

              <div className="bg-primary w-48 my-10 px-3 py-3 rounded-lg ">
                <button
                  className="m-auto w-full text-lg font-bold z-50 text-white"
                  onClick={handleSend}
                >
                  Submit for Review
                </button>
              </div>
            </nav>

            {isBasicDetails && (
              <BasicDetails proceedState={[proceed1, setProceed1]} />
            )}
            {isAdditionaDetails && (
              <AdditionalDescription proceedState1={[proceed2, setProceed2]} />
            )}
            {isFilters && <Filters proceedState2={[proceed3, setProceed3]} />}
            {isSyllabus && (
              <SyllabusDescription proceedState3={[proceed4, setProceed4]}  setIsSyllabus={setIsSyllabus} />
            )}
            {isFaqs && <Faqs proceedState5={[proceed6, setProceed6]} />}
            {isCoursePrice && (
              <CoursePrice proceedState4={[proceed5, setProceed5]} />
            )}
            {isProduct && (
              <ProductionSupport
                submitTrueState={[isSubmitTrue, setIsSubmitTrue]}
              />
            )}
          </div>

          {/*-------------------- Course Add for Mobile View -------------------------- */}

          <>
            <div className="flex mt-6 py-2 lg:hidden px-10 ">
              <div className="flex justify-center items-center">
                <p
                  className="bg-primary text-white w-7 h-7 text-center rounded-full"
                  onClick={() => {
                    setPage1(true);
                    setPage2(false);
                    setPage3(false);
                  }}
                >
                  1
                </p>
                <hr
                  className="w-24"
                  style={
                    track1
                      ? { borderTop: "1px solid #7D23E0" }
                      : { borderTop: "1px dashed  rgba(53, 53, 53, 0.33)" }
                  }
                />
              </div>
              <div className="flex justify-center items-center">
                <p
                  className={`${
                    track1 ? "bg-primary" : "bg-gray"
                  } text-white w-7 h-7 text-center rounded-full`}
                  onClick={() => {
                    setPage1(false);
                    setPage2(true);
                    setPage3(false);
                  }}
                >
                  2
                </p>
                <hr
                  className="w-24"
                  style={
                    track2
                      ? { borderTop: "1px solid #7D23E0" }
                      : { borderTop: "1px dashed  rgba(53, 53, 53, 0.33)" }
                  }
                />
              </div>
              <div className="flex justify-center items-center">
                <p
                  className={`${
                    track2 ? "bg-primary" : "bg-gray"
                  }  text-white w-7 h-7 text-center rounded-full `}
                  onClick={() => {
                    setPage1(false);
                    setPage2(false);
                    setPage3(true);
                  }}
                >
                  3
                </p>
              </div>
            </div>

            {page1 && (
              <nav
                className={` lg:hidden font-dm-sans mb-10  px-5 py-4  z-50  `}
              >
                <div className="bg-white">
                  <h1 className="text-2xl font-medium ">Profile Section</h1>

                  <div className="   py-3 flex flex-col items-start space-y-2 rounded-lg w-full">
                    <div
                      className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                        isBasicDetails11 ? "bg-primary " : "bg-white"
                      }`}
                      onClick={() => {
                        setIsBasicDetails11(!isBasicDetails11);
                        setIsAdditionaDetails(false);
                        setIsFilters(false);
                        // setIsSyllabus(false)
                        // setIsCoursePrice(false)
                        setisDropDown1(!isDropDown1);
                      }}
                    >
                      <button
                        className={`${
                          isBasicDetails11 ? "text-white " : "text-solid"
                        } text-lg `}
                      >
                        Basic Details
                      </button>
                      <div className="flex-1"></div>

                      <MdKeyboardArrowDown
                        className={`text-2xl ${
                          isDropDown1 ? "hidden" : "flex"
                        }`}
                      />
                      <MdKeyboardArrowUp
                        className={`text-2xl ${
                          isDropDown1 ? "flex text-white" : "hidden"
                        }`}
                      />
                    </div>

                    {isBasicDetails11 && (
                      <BasicDetails
                        categoryState={[categorySelected, setCategorySelected]}
                        proceedState={[proceed11, setProceed11]}
                      />
                    )}

                    <div
                      className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                        isAdditionaDetails ? "bg-primary " : "bg-white"
                      }`}
                      onClick={() => {
                        setIsBasicDetails11(false);
                        setIsAdditionaDetails(!isAdditionaDetails);
                        setIsFilters(false);
                        // setIsSyllabus(false)
                        // setIsCoursePrice(false)
                        // setIsProduct(false)
                        setisDropDown2(!isDropDown2);
                      }}
                    >
                      <button
                        className={`${
                          isAdditionaDetails ? "text-white" : "text-solid"
                        } text-lg `}
                      >
                        Additional Description
                      </button>
                      <div className="flex-1"></div>

                      <MdKeyboardArrowDown
                        className={`text-2xl ${
                          isDropDown2 ? "hidden" : "flex"
                        }`}
                      />
                      <MdKeyboardArrowUp
                        className={`text-2xl ${
                          isDropDown2 ? "flex text-white" : "hidden"
                        }`}
                      />
                    </div>
                    {isAdditionaDetails && (
                      <AdditionalDescription
                        proceedState1={[proceed21, setProceed21]}
                      />
                    )}

                    <div
                      className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                        isFilters ? "bg-primary " : "bg-white"
                      }`}
                      onClick={() => {
                        setIsBasicDetails11(false);
                        setIsAdditionaDetails(false);
                        setIsFilters(!isFilters);
                        // setIsSyllabus(false)
                        // setIsCoursePrice(false)
                        // setIsProduct(false)
                        setisDropDown3(!isDropDown3);
                      }}
                    >
                      <button
                        className={`${
                          isFilters ? "text-white" : "text-solid"
                        } text-lg `}
                      >
                        Filters
                      </button>
                      <div className="flex-1"></div>

                      <MdKeyboardArrowDown
                        className={`text-2xl ${
                          isDropDown3 ? "hidden" : "flex"
                        }`}
                      />
                      <MdKeyboardArrowUp
                        className={`text-2xl ${
                          isDropDown3 ? "flex text-white" : "hidden"
                        }`}
                      />
                    </div>
                  </div>

                  {isFilters && (
                    <Filters proceedState2={[proceed31, setProceed31]} />
                  )}
                </div>
                <div
                  className="flex mt-5 justify-end"
                  onClick={() => {
                    setPage2(true);
                    setPage1(false);
                    setTrack1(true);
                  }}
                >
                  <button className="text-white bg-primary w-44 py-3 rounded-lg  ">
                    Save and Continue
                  </button>
                </div>
              </nav>
            )}

            {page2 && (
              <nav
                className={` lg:hidden font-dm-sans mb-10  px-5 py-4  z-50  `}
              >
                <div className="">
                  <h1 className="text-2xl font-medium ">
                    What’s in the course
                  </h1>

                  <div className="   py-3 flex flex-col items-start space-y-2 rounded-lg w-full">
                    <div
                      className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                        isSyllabus ? "bg-primary " : "bg-white"
                      }`}
                      onClick={() => {
                        setIsSyllabus(!isSyllabus);
                        setisDropDown4(!isDropDown4);
                        setIsFaqs(false);
                        setisDropDown7(false);
                      }}
                    >
                      <button
                        className={`${
                          isSyllabus ? "text-white " : "text-solid"
                        } text-lg `}
                      >
                        Syallabus description
                      </button>
                      <div className="flex-1"></div>

                      <MdKeyboardArrowDown
                        className={`text-2xl ${
                          isDropDown4 ? "hidden" : "flex"
                        }`}
                      />
                      <MdKeyboardArrowUp
                        className={`text-2xl ${
                          isDropDown4 ? "flex text-white" : "hidden"
                        }`}
                      />
                    </div>

                    {isSyllabus && (
                      <SyllabusDescription
                        proceedState3={[proceed41, setProceed41]}
                        setIsSyllabus={setIsSyllabus}
                      />
                    )}
                  </div>

                  <div className="   py-3 flex flex-col items-start space-y-2 rounded-lg w-full">
                    <div
                      className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                        isFaqs ? "bg-primary " : "bg-white"
                      }`}
                      onClick={() => {
                        setIsSyllabus(false);
                        setisDropDown4(false);
                        setIsFaqs(!isFaqs);
                        setisDropDown7(!isDropDown7);
                      }}
                    >
                      <button
                        className={`${
                          isFaqs ? "text-white " : "text-solid"
                        } text-lg `}
                      >
                        FAQs
                      </button>
                      <div className="flex-1"></div>

                      <MdKeyboardArrowDown
                        className={`text-2xl ${
                          isDropDown7 ? "hidden" : "flex"
                        }`}
                      />
                      <MdKeyboardArrowUp
                        className={`text-2xl ${
                          isDropDown7 ? "flex text-white" : "hidden"
                        }`}
                      />
                    </div>

                    {isFaqs && (
                      <Faqs proceedState5={[proceed61, setProceed61]} />
                    )}
                  </div>
                </div>

                <div
                  className="flex mt-5 justify-end"
                  onClick={() => {
                    setPage3(true);
                    setPage2(false);
                    setPage1(false);
                    setTrack2(true);
                  }}
                >
                  <button className="text-white bg-primary w-44 py-3 rounded-lg  ">
                    Save and Continue
                  </button>
                </div>
              </nav>
            )}

            {page3 && (
              <nav
                className={` lg:hidden font-dm-sans mb-10  px-5 py-4  z-50  `}
              >
                <div className="">
                  <h1 className="text-2xl font-medium ">Payment</h1>

                  <div className="   py-3 flex flex-col items-start space-y-2 rounded-lg w-full">
                    <div
                      className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                        isCoursePrice ? "bg-primary " : "bg-white"
                      }`}
                      onClick={() => {
                        setIsCoursePrice(!isCoursePrice);
                        setIsProduct(false);
                        setisDropDown5(!isDropDown5);
                      }}
                    >
                      <button
                        className={`${
                          isCoursePrice ? "text-white " : "text-solid"
                        } text-lg `}
                      >
                        Set a course price
                      </button>
                      <div className="flex-1"></div>

                      <MdKeyboardArrowDown
                        className={`text-2xl ${
                          isDropDown5 ? "hidden" : "flex"
                        }`}
                      />
                      <MdKeyboardArrowUp
                        className={`text-2xl ${
                          isDropDown5 ? "flex text-white" : "hidden"
                        }`}
                      />
                    </div>
                    {isCoursePrice && (
                      <CoursePrice proceedState4={[proceed51, setProceed51]} />
                    )}

                    <div
                      className={`border border-primary w-full py-3 px-4 rounded-lg flex ${
                        isProduct ? "bg-primary " : "bg-white"
                      }`}
                      onClick={() => {
                        setIsCoursePrice(false);
                        setIsProduct(!isProduct);
                        setisDropDown6(!isDropDown6);
                      }}
                    >
                      <button
                        className={`${
                          isProduct ? "text-white " : "text-solid"
                        } text-lg `}
                      >
                        Production Support
                      </button>
                      <div className="flex-1"></div>

                      <MdKeyboardArrowDown
                        className={`text-2xl ${
                          isDropDown6 ? "hidden" : "flex"
                        }`}
                      />
                      <MdKeyboardArrowUp
                        className={`text-2xl ${
                          isDropDown6 ? "flex text-white" : "hidden"
                        }`}
                      />
                    </div>
                    {isProduct && (
                      <ProductionSupport
                        submitTrueState={[isSubmitTrue, setIsSubmitTrue]}
                      />
                    )}

                    <div className="bg-primary w-48 my-10 px-3 py-3 rounded-lg ">
                      <button
                        className="m-auto w-full text-lg font-bold z-50 text-white"
                        onClick={handleSend}
                      >
                        Submit for Review
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            )}
          </>
        </section>
      </main>
    </>
  );
};

export default SidePopup;
