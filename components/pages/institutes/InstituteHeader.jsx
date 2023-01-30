import React, { useEffect, useState } from "react";

import {
  HeartFilled,
  HeartOutlined,
  PlayCircleFilled,
  ShareAltOutlined,
  StarFilled
} from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import Carousel from "react-elastic-carousel";
import toast from "react-hot-toast";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import hybridIndicator from "../../../assets/images/icons/hybridIndicator.svg";
import imgProto from "../../../assets/images/icons/img.svg";
import offlineIndicator from "../../../assets/images/icons/offlineIndicator.svg";
import onlineIndicator from "../../../assets/images/icons/onlineIndicator.svg";
import videoImage from "../../../assets/images/videoImg.png";
import { authSelector, getUser } from "../../../redux/slices/authSlice";
import { ACCESS_TOKEN, host, OWNER_ID } from "../../../utils/constant";
import { isEmpty } from "../../../utils/utils";
import useScreenWidth from "../../hooks/useScreenWidth";
import SharePopup from "../../UI/SharePopup";
import VideoPlayer from "../../VideoPlayer";

export default function InstituteHeader({
  currentInstitute,
  ipAddress,
  instituteFaculty,
}) {
  const [contents, setContents] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loadInactive, setLoadInactive] = useState(false);
  const { screenWidth } = useScreenWidth();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(authSelector);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const reviewClassHandler = (item) => {
    let classes =
      "rating flex xl:space-x-2 justify-between items-center  px-2 py-1  md:text-xl text-sm rounded-md font-bold ";
    if (item === 0) {
      classes += "text-white bg-[#FF3044]";
    } else if (item === 1) {
      classes += "text-white bg-deep_red";
    } else if (item <= 2) {
      classes += " bg-light_red border-light_red";
      if (item < 2) {
        classes += " text-light_red";
      } else {
        classes += " text-white";
      }
    } else if (item <= 3) {
      if (item < 3) {
        classes += " text-light_yellow";
      } else {
        classes += " text-white";
      }
      classes += " bg-light_yellow border-light_yellow";
    } else if (item <= 4) {
      if (item < 4) {
        classes += " text-light_green";
      } else {
        classes += " text-white";
      }
      classes += " bg-light_green border-light_green";
    } else if (item <= 5) {
      if (item < 5) {
        classes += " text-deep_green";
      } else {
        classes += " text-white";
      }
      classes += " bg-deep_green border-deep_green";
    } else {
      return classes;
    }
    return classes;
  };

  useEffect(() => {
    if (!isEmpty(currentInstitute)) {
      let videos = currentInstitute.videos;
      let images = currentInstitute.images;
      setContents(
        []
          .concat(
            videos?.map((item) => {
              return { ...item, type: "video" };
            })
          )
          .concat(
            images?.map((item) => {
              return { ...item, type: "image" };
            })
          )
      );
      return;
    }

    if (!isEmpty(currentInstitute.updatedRequest.videos) && loadInactive) {
      let videos = currentInstitute.updatedRequest.videos;
      let images = currentInstitute.updatedRequest.images;
      setContents(
        []
          .concat(
            videos?.map((item) => {
              return { ...item, type: "video" };
            })
          )
          .concat(
            images?.map((item) => {
              return { ...item, type: "image" };
            })
          )
      );
    }
  }, [currentInstitute, loadInactive]);
  const { classmode, workinghours, locations, slug, short_description } =
    currentInstitute;

  const { line1, line2, state, country } = locations?.[0];

  let time = "14:15 to 17:15";

  const TwentyFourToTwelveHour = (textTime) => {
    console.log(textTime, "textTFime");
    let [starting, ending] = textTime?.split(" to ");
    const converter = (time) => {
      let prefix = "";
      let updatedHour = "";
      let [hour, min] = time.split(":");
      if (hour > 12) {
        prefix = "PM";
        updatedHour = (Number(hour) % 12).toString();
      } else {
        updatedHour = hour;
        prefix = "AM";
      }

      let convertedTime = `${updatedHour}:${min} ${prefix}`;
      return convertedTime;
    };

    let updatedTime = `${converter(starting)} to ${converter(ending)}`;

    return updatedTime;
  };

  const [timings, setTimings] = useState("");

  useEffect(() => {
    if (!isEmpty(workinghours)) {
      let time = TwentyFourToTwelveHour(workinghours);
      setTimings(time);
    }
  }, [workinghours]);

  const [wishListed, setWishListed] = useState(false);
  const { userData } = useSelector(authSelector);

  const handleWishList = async () => {
    if (!isAuthenticated) {
      return toast.error("Please login to add in wishlist !");
    }
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    if (!wishListed) {
      let wishlistedData = [];

      userData?.wishlist?.forEach((e) => {
        wishlistedData.push(e?.id);
      });

      let updatedWishlist = wishlistedData?.concat([currentInstitute?.id]);
      console.log(wishlistedData, updatedWishlist);
      const data = {
        id: OWNER_ID,
        updates: {
          wishlistinstituteids: updatedWishlist,
        },
      };
      console.log(updatedWishlist, data);
      try {
        await axios.patch(`${host}/users/`, data, config);
        toast.success("Successfully Added to whitelist !");
        setWishListed(true);
      } catch (err) {
        console.log(err, "error");
      } finally {
        dispatch(getUser());
      }
    } else {
      console.log("dddd");
      let updatedWishlist = userData?.wishlist?.filter(
        (item) => item.id !== currentInstitute.id
      );

      let wishlistedData = [];

      updatedWishlist?.forEach((e) => {
        wishlistedData.push(e?.id);
      });

      const data = {
        id: OWNER_ID,
        updates: {
          wishlistinstituteids: wishlistedData,
        },
      };

      try {
        await axios.patch(`${host}/users/`, data, config);
        toast.success("Successfully Removed from whitelist !");
        setWishListed(false);
      } catch (err) {
        console.log(err, "error");
      } finally {
        dispatch(getUser());
      }
    }
  };
  useEffect(() => {
    if (userData?.wishlist?.length) {
      let found = userData?.wishlist.filter(
        (item) => item.id === currentInstitute.id
      ).length;
      if (found) {
        setWishListed(true);
      }
    }
  }, [currentInstitute, userData]);

  const getClassType = (num) => {
    if (num === 1) {
      return "Hybrid";
    }
    if (num === 2) {
      return "Online";
    }
    if (num === 3) {
      return "Offline";
    }
  };

  return (
    <div name="Header" className="mt-9">
      <div className=" py-5 md:py-10 ">
        <div className=" px-3 sm:px-5 container  mx-auto  text-black lg:flex  flex-row-reverse justify-between ">
          <section className="lg:w-6/12">
            <div className="  flex flex-col md:hidden  font-bold mb-5 px-3">
              <p className="mr-auto  flex mb-2 space-x-2 uppercase text-[14px] ">
                {
                  <img
                    src={
                      currentInstitute.classmode === 1
                        ? hybridIndicator.src
                        : currentInstitute.classmode === 2
                        ? onlineIndicator.src
                        : offlineIndicator.src
                    }
                    alt=""
                  />
                }
                <span>{getClassType(currentInstitute.classmode)} Course</span>
              </p>
              <div className="flex justify-between">
                <p className="text-3xl xl:text-5xl md:w-3/4 lg:text-4xl font-bold">
                  {currentInstitute.name}{" "}
                </p>
                <div className="flex space-x-2 items-center"></div>
              </div>
              <div className="my-4 md:hidden block ">
                <p className="text-[#5C5C5C] text-base">
                  {short_description?.slice(0, 150)}
                </p>
              </div>
            </div>
            <Carousel
              itemsToShow={1}
              showArrows={
                screenWidth > 768 && contents.length > 1 ? true : false
              }
              enableAutoPlay={false}
              autoPlaySpeed={2000}
              pagination={true}
              renderPagination={({ pages, activePage, onClick }) => {
                return (
                  <div className="flex items-center space-x-2 mt-3 ">
                    {pages?.map((page, i) => {
                      const isActivePage = activePage === page;
                      return (
                        <div
                          className={`cursor-pointer  h-2 rounded-lg my-5 transition-all duration-500 ease-in-out ${
                            isActivePage
                              ? "bg-primary md:w-28 w-16 "
                              : "bg-gray/20 md:w-6 w-2"
                          }`}
                          key={i}
                          onClick={() => onClick(page)}
                        />
                      );
                    })}
                  </div>
                );
              }}
            >
              {contents.map((item, i) => (
                <div key={i} className="video_container w-full ">
                  {item.type === "video" ? (
                    <div className="border relative border-white  rounded-xl overflow-hidden h-full aspect-video">
                      <VideoPlayer
                        thumbnailURL={`https://cdn.ostello.co.in/${item.thumbnail.key}`}
                        videoURL={`https://cdn.ostello.co.in/${item.video.key}`}
                        item={item}
                        id={currentInstitute?.id}
                        ip={ipAddress}
                        name={currentInstitute?.name}
                      />
                      <div
                        onClick={() => router.push(slug + "/gallery")}
                        className=" group absolute top-5 right-5 md:top-5 md:right-5 p-3 bg-white border-solid border-primary border flex rounded-lg gap-2 transition-all ease-in-out duration-30 cursor-pointer"
                      >
                        <img
                          src={imgProto.src}
                          className="w-[10px] text-primary"
                          alt=""
                        />
                        <p className="text-[#414141] hidden group-hover:block   ">
                          See more
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="border relative border-white rounded-xl overflow-hidden ">
                      <img
                        src={`https://cdn.ostello.co.in/${item.key}`}
                        className="w-full md:max-h-[400px]"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
              {isEmpty(contents) && (
                <>
                  {[1].map((item, i) => (
                    <div key={i} className="video_container">
                      <div className="relative">
                        <img
                          src={videoImage.src}
                          className=" w-full  "
                          alt=""
                        />
                        <PlayCircleFilled
                          className="
                              text-black/90
                              absolute
                              text-6xl cursor-pointer active:opacity-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 duration-300"
                        />
                        <div
                          onClick={() => router.push(slug + "/gallery")}
                          className=" group absolute top-5 right-5 md:top-10 md:right-10 p-3 bg-white flex rounded-lg gap-2 transition-all ease-in-out duration-300  cursor-pointer"
                        >
                          <img
                            src={imgProto.src}
                            className="w-[10px] text-primary"
                            alt=""
                          />
                          <p className="text-[#414141] hidden group-hover:block   ">
                            See more
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Carousel>
          </section>
          <div className="lg:w-6/12">
            <div className="md:mr-10">
              <section className=" my-1 cursor-pointer  ">
                <div className="  flex flex-col md:block hidden font-bold ">
                  <p className="mr-auto px-2 flex mb-2 space-x-2 uppercase text-[14px] ">
                    {
                      <img
                        src={
                          currentInstitute.classmode === 1
                            ? hybridIndicator.src
                            : currentInstitute.classmode === 2
                            ? onlineIndicator.src
                            : offlineIndicator.src
                        }
                        alt=""
                      />
                    }
                    <span>
                      {getClassType(currentInstitute.classmode)} Course
                    </span>
                  </p>
                  <div className="flex justify-between">
                    <p className="text-3xl xl:text-5xl md:w-3/4 lg:text-4xl font-bold">
                      {currentInstitute.name}{" "}
                    </p>
                    <div className="flex space-x-2 items-center">
                      <div
                        className={reviewClassHandler(currentInstitute.rating)}
                        //  className=" rating flex xl:space-x-2 justify-between items-center bg-[#FFD130] px-2 py-1  md:text-xl text-sm rounded-md font-bold"
                      >
                        <p className="">{currentInstitute.rating}</p>
                        <StarFilled />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:block hidden">
                  {/* {description.slice(0, 1).map((item, idx) => ( */}
                  <p className="text-[#5C5C5C] text-base">
                    {short_description?.slice(0, 150)}
                  </p>
                  {/* ))} */}
                </div>
              </section>
              <div className="border-b-0 border-l-0 border-[#BBBBBB] border-r-0 border-2 border-dashed w-full my-5 hidden md:block" />

              <section className="   text-black ">
                {/* <div className='border-b-0 border-l-0 border-r-0 border-2 border-dashed w-full my-2 border-[#BBBBBB]  md:hidden block' /> */}
                <div className="info flex items-center justify-between  md:hidden  space-x-5 ">
                  <div className="flex space-x-2 items-center">
                    <div
                      className={reviewClassHandler(currentInstitute.rating)}
                      //  className=" rating flex xl:space-x-2 justify-between items-center bg-[#FFD130] px-2 py-1  md:text-xl text-sm rounded-md font-bold"
                    >
                      <p className="">{currentInstitute.rating}</p>
                      <StarFilled />
                    </div>
                  </div>
                  <div className=" flex  space-x-5 md:text-2xl">
                    <div onClick={() => {}}>
                      {wishListed ? (
                        <HeartFilled
                          onClick={() => handleWishList()}
                          className={`flex   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm  items-center justify-center cursor-pointer  text-[#FF0000] md:ring-2 ring-1 ring-black text-sm md:text-2xl `}
                        />
                      ) : (
                        <HeartOutlined
                          onClick={() => {
                            handleWishList();
                          }}
                          className={`flex items-center text-sm   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-black  md:text-2xl`}
                        />
                      )}
                    </div>

                    <ShareAltOutlined
                      onClick={() => setOpen(true)}
                      className="active:opacity-80 flex items-center text-sm    w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-black md:text-2xl "
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2 items-center ">
                    {/* <img  src={locationIcon.src} alt='' /> */}
                    <HiLocationMarker className=" text-4xl  text-black" />
                    <p className=" text-[14px] font-[400px] mt-3 md:w-3/4 ">
                      {/* 273/2, Shahabad Mohammadpur, Vasant <br /> Kunj, New
                      Delhi-110061 */}
                      {!isEmpty(locations?.[0]) && (
                        <>
                          {line1} {line2} {state} {country}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="   space-x-5 items-center md:flex hidden md:text-2xl">
                    {wishListed ? (
                      <HeartFilled
                        onClick={() => handleWishList()}
                        className={`flex   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm  items-center justify-center cursor-pointer  text-[#FF0000] md:ring-2 ring-1 ring-black text-sm md:text-2xl `}
                      />
                    ) : (
                      <HeartOutlined
                        onClick={() => {
                          handleWishList();
                        }}
                        className={`flex items-center text-sm   w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-black  md:text-2xl`}
                      />
                    )}

                    <ShareAltOutlined
                      onClick={() => setOpen(true)}
                      className="active:opacity-80 flex items-center text-sm    w-6 h-6 md:h-10 md:w-10 rounded-full shadow-sm justify-center cursor-pointer   md:ring-2 ring-1 ring-black md:text-2xl "
                    />
                  </div>
                </div>
              </section>
              <SharePopup
                TextToCopy={
                  typeof window !== "undefined" && window.location.href
                }
                open={open}
                onClose={() => setOpen(false)}
              />

              <div className="border-b-0 border-l-0 border-[#BBBBBB] border-r-0 border-2 border-dashed w-full my-5 k" />

              <section className="statistics mt-7 xl:mb-8 mb-4 ">
                <>
                  <div className="info flex items-center sm:justify-between  space-x-5 ">
                    <div className="border-2 bg-white px-3 py-1 rounded border-[#475467]">
                      <p className="text-center md:text-[24px] text-[20px] font-bold">
                        {currentInstitute?.studentsenrolled || 0}
                      </p>
                      <p className="text-[14px] text-center">
                        Students Enrolled
                      </p>
                    </div>
                    <div className="border-2 bg-white px-3 py-1 rounded border-[#475467]">
                      <p className="text-center md:text-[24px] text-[20px]  font-bold">
                        {currentInstitute?.establishedyear}
                      </p>
                      <p className="text-[14px] text-center">
                        Year of Establishment
                      </p>
                    </div>
                    <div className="border-2 bg-white px-3 py-1 rounded border-[#475467]">
                      <p className="text-center md:text-[24px] text-[20px]  font-bold">
                        {instituteFaculty?.length}
                      </p>
                      <p className="text-[14px] text-center">
                        Faculty Teaching
                      </p>
                    </div>
                    {/* <div onClick={() => setEnquiryOpen(true)} className="border-2 bg-white px-3 py-1 rounded border-[#475467]">
                      <p className="text-center md:text-[24px] text-[20px]  font-bold">
                        Click
                      </p>
                      <p className="text-[14px] text-center">
                        Ravi
                      </p>
                    </div> */}
                  </div>
                </>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
