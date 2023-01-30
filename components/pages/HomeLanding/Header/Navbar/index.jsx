import {
  AppstoreOutlined,
  CloseOutlined,
  IdcardOutlined,
  NotificationOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import { MdOutlineLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getUser,
  setAuthModalState,
} from "../../../../../redux/slices/authSlice";

import { useRouter } from "next/router";
import AuthModal from "./AuthModal";

import { assets } from "../../../../../utils/assets";
// import ostelloLogo from "../../../../../utils/assets/images/AnimatedLogo.gif";

import { capitalizeFirstLetter, isEmpty } from "../../../../../utils/utils";
import { IoIosArrowBack } from "react-icons/io";

const iconStyle = `flex items-center text-2xl `;
const text = `hover:text-primary`;
const links = [
  {
    title: "About Us",
    url: "/about-us",
    icon: <TeamOutlined className={iconStyle} />,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: <AppstoreOutlined className={iconStyle} />,
  },
  // {
  //   title: 'Achievements',
  //   url: '/achievements',
  //   icon: <BsAward className={iconStyle} />,
  // },
  {
    title: "Institutes",
    url: "/search",
    icon: <IdcardOutlined className={iconStyle} />,
  },
  {
    title: "Career",
    url: "/careers",
    icon: <UserOutlined className={iconStyle} />,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: <NotificationOutlined className={iconStyle} />,
  },
];
export default function Navbar({ usingFor, bg }) {
  const ostelloLogo = assets.images.ostello_titled_logo;
  // const ostelloLogo = assets.images.AnimatedLogo_1;
  const [isSelected, setIsSelected] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, userData } = useSelector(authSelector);
  const { usertype } = userData;
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  let userName = userData?.name?.split(" ")[0] || userData?.name;

  const [topLocationBar, setTopLocationBar] = useState(false);
  const [courseBar, setCourseBar] = useState(false);

  return (
    <section className="">
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      {/* Mobile Navbar */}
      <div className="relative flex z-10 lg:hidden items-center justify-between px-4  py-2 space-x-2">
        <AiOutlineMenu
          className="hover:text-primary cursor-pointer"
          size={26}
          onClick={() => {
            setIsMenuOpen((prv) => !prv);
            setIsSearching(false);
          }}
        />
        {!isSearching && (
          <>
            <div
              className={`transition-all duration 300 ${
                !isMenuOpen ? "-translate-x-full" : "translate-x-0"
                // } w-[50vh] h-screen bg-white shadow-4xl absolute -left-2 top-0 p-5  rounded-r-xl `}
              } w-[50vh] h-screen bg-white shadow-4xl absolute -left-2 top-0 p-5  rounded-r-xl `}
            >
              <div className="flex justify-between items-center">
                <Link prefetch={false} href={"/"}>
                  <img src={ostelloLogo} alt="logo-ostello" />
                </Link>
                <CloseOutlined
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="text-xl text-[#FF0000]-500 cursor-pointer"
                />
              </div>
              <div className="mt-16 ">
                <div
                  onClick={() => router.push("/about-us")}
                  className="flex space-x-5 hover:text-primary my-3"
                >
                  <TeamOutlined className={iconStyle} />
                  <span className="text-xl">About Us</span>
                </div>
                <div className="relative flex space-x-5 hover:text-primary my-3">
                  <IdcardOutlined className={iconStyle} />
                  <p
                    onClick={() => {
                      setCourseBar(!courseBar);
                      setTopLocationBar(false);
                    }}
                    className="flex items-center mx-3 cursor-pointer"
                  >
                    <p className={`${text} text-[#000000] text-xl `}>Courses</p>
                    {courseBar ? (
                      <GoChevronDown className="ml-1 text-[16px] rotate-180" />
                    ) : (
                      <GoChevronDown className="ml-1 text-[16px]" />
                    )}
                  </p>
                  {courseBar ? (
                    <div className="absolute left-0 z-10 mt-6 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="none">
                        <div
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            router.push(
                              "/academics-coaching-institutes-in-delhi"
                            );
                          }}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>
                            K12 (Academics)
                          </p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                        <div
                          onClick={() => {
                            router.push(
                              "/medical-coaching-institutes-in-delhi"
                            );
                          }}
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>Medical</p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                        <div
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            router.push(
                              "/engineering-coaching-institutes-in-delhi"
                            );
                          }}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>
                            Engineering
                          </p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                        <div
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            router.push(
                              "/humanities-coaching-institutes-in-delhi"
                            );
                          }}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>
                            Humanities
                          </p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                        <div
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            router.push("/law-coaching-institutes-in-delhi");
                          }}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>Law</p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                        <div
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            router.push(
                              "/commerce-coaching-institutes-in-delhi"
                            );
                          }}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>
                            Commerce
                          </p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                        <div
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            router.push("/skillbased");
                          }}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>
                            Skill Based
                          </p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                        <div
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            router.push("/exams/cuet");
                          }}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>
                            Boards + CUET
                          </p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div                
                    onClick={() => router.push('/about-us')}
                    className="flex space-x-5 hover:text-primary my-3"
                  >
                    <TeamOutlined className={iconStyle} />
                    <span className="text-xl">About Us</span>
                  </div> */}
                <div className="relative flex space-x-5 hover:text-primary my-3">
                  <IdcardOutlined className={iconStyle} />
                  <p
                    onClick={() => {
                      setTopLocationBar(!topLocationBar);
                      setCourseBar(false);
                    }}
                    className="flex items-center mx-3 cursor-pointer"
                  >
                    <p className={`${text} text-[#000000] text-xl `}>
                      Top Locations
                    </p>
                    {topLocationBar ? (
                      <GoChevronDown className="ml-1 text-[16px] rotate-180" />
                    ) : (
                      <GoChevronDown className="ml-1 text-[16px]" />
                    )}
                  </p>
                  {topLocationBar ? (
                    <div className="absolute left-0 z-10 mt-6 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="none">
                        <div
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            router.push("/toplocation/delhi");
                          }}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>Delhi</p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                        <div
                          onClick={() => {
                            router.push("/toplocation/haryana");
                          }}
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>Haryana</p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                        <div
                          className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                          onClick={() => {
                            router.push("/toplocation/uttar-pradesh");
                          }}
                        >
                          <p className={`  text-[16px]  px-4 py-2 `}>
                            Uttar Pradesh
                          </p>
                          <IoIosArrowBack
                            className={`mr-2   text-[16px] rotate-180`}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  onClick={() => router.push("/blogs")}
                  className="flex space-x-5 hover:text-primary my-3"
                >
                  <NotificationOutlined className={iconStyle} />
                  <span className="text-xl">Blogs</span>
                </div>
                <div
                  onClick={() => router.push("/mentor")}
                  className="flex space-x-5 hover:text-primary my-3"
                >
                  <TeamOutlined className={iconStyle} />
                  <span className="text-xl">Mentor Zone</span>
                </div>

                {usingFor === "blog" ? (
                  // <div className="flex space-x-4">
                  //   <button
                  //     onClick={() => {
                  //       setOpen(true);
                  //       dispatch(setAuthModalState(1));
                  //     }}
                  //     className="py-2 text-xl px-4 border border-gray/20 rounded-md"
                  //   >
                  //     Log In
                  //   </button>
                  //   <button
                  //     onClick={() => {
                  //       setOpen(true);
                  //       dispatch(setAuthModalState(4));
                  //     }}
                  //     className="py-2 px-4 text-xl border border-primary rounded-md bg-primary text-white"
                  //   >
                  //     Sign up
                  //   </button>
                  // </div>

                  <button
                    onClick={() => {
                      setOpen(true);
                      dispatch(setAuthModalState(2));
                    }}
                    className="py-2 text-[16px] px-4 border hover:bg-primary hover:text-white rounded-2xl text-primary border-gray/20 "
                  >
                    Get Started
                  </button>
                ) : usingFor === "merchant" ? (
                  !isAuthenticated ? (
                    <div className="flex space-x-4">
                      <MdOutlineLogin className={iconStyle} />
                      <button
                        onClick={() => {
                          router.push("/merchant/login");
                        }}
                        className="py-2 px-4 border text-xl border-primary bg-primary text-white rounded-md"
                      >
                        Log In
                      </button>
                    </div>
                  ) : (
                    <div className="flex text-black space-x-2">
                      <div
                        className="flex justify-center items-center"
                        onClick={() =>
                          router.push(
                            usertype === 1
                              ? "/admin-dashboard/overview"
                              : usertype === 3
                              ? "/profile"
                              : "/merchant/dashboard"
                          )
                        }
                      >
                        <div className="bg-primary h-10 w-10 text-xl rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                          {userName?.slice(0, 1).toUpperCase()}
                        </div>
                        <p className="text-primary text-lg ml-2 cursor-pointer">
                          {!isEmpty(userName) &&
                            capitalizeFirstLetter(userName)}
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="">
                    {!isAuthenticated ? (
                      <div className="flex text-black items-center space-x-5">
                        {/* <MdOutlineLogin className={iconStyle} /> */}
                        {/* <div className="space-x-2"> 
                <button
                  onClick={() => {
                    setOpen(true);
                    dispatch(setAuthModalState(1));
                  }}
                  className="text-black text-xl hover:text-primary"
                  href=""
                >
                  Login
                </button>
                <span className="text-xl">/</span>
                <button
                  onClick={() => {
                    setOpen(true);
                    dispatch(setAuthModalState(4));
                  }}
                  className="text-black text-xl hover:text-primary"
                  href=""
                >
                  Sign up
                </button>
                </div> */}
                        <button
                          onClick={() => {
                            setOpen(true);
                            dispatch(setAuthModalState(2));
                          }}
                          className="py-2 text-[16px] px-4 border border-gray/20 hover:bg-primary hover:text-white rounded-2xl text-primary"
                        >
                          Get Started
                        </button>
                      </div>
                    ) : (
                      <div className="flex text-black space-x-2">
                        <div
                          className="flex justify-center items-center"
                          onClick={() =>
                            router.push(
                              usertype === 1
                                ? "/admin-dashboard/overview"
                                : usertype === 3
                                ? "/profile"
                                : "/merchant/dashboard/profile"
                            )
                          }
                        >
                          {userData?.avatar?.url ? (
                            <img
                              src={`https://cdn.ostello.co.in/${userData?.avatar?.key}`}
                              className="h-10 w-10 cursor-pointer"
                              style={{
                                // height: "200px",
                                // width: "200px",
                                borderRadius: "50%",
                              }}
                              alt=""
                            />
                          ) : (
                            <div className="bg-primary h-10 text-xl w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                              {userName?.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          <p className="text-primary text-xl ml-2 cursor-pointer">
                            {!isEmpty(userName) &&
                              capitalizeFirstLetter(userName)}
                          </p>
                        </div>
                      </div>
                    )}

                    <Link prefetch={false} href="/merchant-landing">
                      <a
                        className={`${
                          usertype === 1 || usertype === 2 ? "hidden" : "block"
                        } text-white text-[16px] w-full text-center bg-primary hover:text-primary border border-primary  hover:bg-white rounded-2xl px-4 mt-2 py-2 duration-300`}
                      >
                        List your institute
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {!isSearching && (
              <Link prefetch={false} href={"/"}>
                {/* <img src={ostelloLogo.src} alt="" className="w-40 h-[82px] my-1 " /> */}
                <img src={ostelloLogo} alt="" className="w-40 my-1" />
              </Link>
            )}
          </>
        )}
        <div
          className={`flex border rounded-xl  items-center justify-center space-x-2 px-2  ${
            isSearching ? " border-primary w-full" : "border-white"
          }`}
        >
          {/* {isSearching && (
            <input
              className=" outline-none w-full p-2 placeholder:text-center"
              type="text"
              placeholder="Search for courses, institutes, exams..."
            />
          )}
          <FiSearch
            onClick={() => {
              setIsSearching((prv) => !prv);
              setIsMenuOpen(false);
            }}
            className={`${isSearching && "text-primary"} cursor-pointer`}
            size={26}
          /> */}
        </div>
      </div>

      {/* Desktop Navbar */}
      <div
        className={`hidden lg:flex justify-between items-center md:px-10 py-3  ${text} ${bg}`}
      >
        <Link prefetch={false} href={"/"}>
          <img src={ostelloLogo} alt="" className="w-40 h-[45px]" />
        </Link>

        <nav className="flex">
          <Link prefetch={false} href="/about-us">
            <a className={`${text} text-[#000000] text-[16px] mx-3`}>
              About Us
            </a>
          </Link>
          <div className="relative ">
            <p
              onClick={() => {
                setCourseBar(!courseBar);
                setTopLocationBar(false);
              }}
              className="flex items-center mx-3 cursor-pointer"
            >
              <p
                className={`${text} text-[#000000] text-[#000000] text-[16px]  `}
              >
                Courses
              </p>
              {courseBar ? (
                <GoChevronDown className="ml-1 text-[16px] rotate-180" />
              ) : (
                <GoChevronDown className="ml-1 text-[16px]" />
              )}
            </p>
            {courseBar ? (
              <div className="absolute left-0 z-10 mt-6 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/academics-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>
                      K12 (Academics)
                    </p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    onClick={() => {
                      router.push("/medical-coaching-institutes-in-delhi");
                    }}
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Medical</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/engineering-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Engineering</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/humanities-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Humanities</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/law-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Law</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/commerce-coaching-institutes-in-delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Commerce</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/skillbased");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Skill Based</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/exams/cuet");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Boards + CUET</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* <Link prefetch={false} href="/search">
            <a className={`${text} text-[#000000] text-[16px] mx-3`}>
              Institutes
            </a>
          </Link> */}
          <div className="relative">
            <p
              onClick={() => {
                setTopLocationBar(!topLocationBar);
                setCourseBar(false);
              }}
              className="flex items-center mx-3 cursor-pointer"
            >
              <p className={`${text} text-[#000000] text-[16px] `}>
                Top Locations
              </p>
              {topLocationBar ? (
                <GoChevronDown className="ml-1 text-[16px] rotate-180" />
              ) : (
                <GoChevronDown className="ml-1 text-[16px]" />
              )}
            </p>
            {topLocationBar ? (
              <div className="absolute left-0 z-10 mt-6 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/toplocation/delhi");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Delhi</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    onClick={() => {
                      router.push("/toplocation/haryana");
                    }}
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Haryana</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                  <div
                    className={`flex ${text} text-[#000000] justify-between cursor-pointer  items-center`}
                    onClick={() => {
                      router.push("/toplocation/uttar-pradesh");
                    }}
                  >
                    <p className={`  text-[16px]  px-4 py-2 `}>Uttar Pradesh</p>
                    <IoIosArrowBack
                      className={`mr-2   text-[16px] rotate-180`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <Link prefetch={false} href="/blogs">
            <a className={`${text} text-[#000000] text-[16px] mx-3`}>Blogs</a>
          </Link>
          <Link prefetch={false} href="/mentor">
            <a className={`${text} text-[#000000] text-[16px] mx-3`}>
              Mentor Zone
            </a>
          </Link>
          {/* {isAuthenticated && usertype === 3 ? (
            <Link prefetch={false} href="/entrance-exam">
              <a className={`${text} text-[16px] mx-3`}>Enroll Now</a>
            </Link>
          ) : (
            ""
          )} */}
        </nav>

        {usingFor === "blog" ? (
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setOpen(true);
                dispatch(setAuthModalState(2));
              }}
              className="py-2 px-4 border border-gray/20 rounded-md"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setOpen(true);
                dispatch(setAuthModalState(4));
              }}
              className="py-2 px-4 border border-primary rounded-md bg-primary text-white"
            >
              Sign up
            </button>
          </div>
        ) : usingFor === "merchant" ? (
          !isAuthenticated ? (
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  router.push("/merchant/login");
                }}
                className="py-2 px-4 border border-primary bg-primary text-white rounded-md"
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="flex justify-center text-black space-x-2">
              <div
                className="flex items-center"
                onClick={() =>
                  router.push(
                    usertype === 1
                      ? "/admin-dashboard/overview"
                      : usertype === 3
                      ? "/profile"
                      : "/merchant/dashboard"
                  )
                }
              >
                <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                  {userName?.slice(0, 1).toUpperCase()}
                </div>
                <p className="text-primary text-lg ml-2 cursor-pointer">
                  {!isEmpty(userName) && capitalizeFirstLetter(userName)}
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center space-x-5">
            {!isAuthenticated ? (
              // <div className="flex justify-center text-black space-x-2">
              //   <button
              //     onClick={() => {
              //       setOpen(true);
              //       dispatch(setAuthModalState(1));
              //     }}
              //     className="text-black hover:text-primary text-[16px]"
              //     href=""
              //   >
              //     Login
              //   </button>
              //   <span>/</span>
              //   <button
              //     onClick={() => {
              //       setOpen(true);
              //       dispatch(setAuthModalState(4));
              //     }}
              //     className="text-black hover:text-primary text-[16px]"
              //     href=""
              //   >
              //     Sign up
              //   </button>
              // </div>
              <button
                onClick={() => {
                  setOpen(true);
                  dispatch(setAuthModalState(2));
                }}
                className="py-2 text-[16px] hover:bg-primary hover:text-white rounded-2xl text-primary px-4 border border-gray/20 rounded-md"
              >
                Get Started
              </button>
            ) : (
              <div className="flex justify-center text-black space-x-2">
                <div
                  className="flex items-center"
                  onClick={() =>
                    router.push(
                      usertype === 1
                        ? "/admin-dashboard/overview"
                        : usertype === 3
                        ? "/profile"
                        : "/merchant/dashboard/profile"
                    )
                  }
                >
                  {userData?.avatar?.url ? (
                    <img
                      src={`https://cdn.ostello.co.in/${userData?.avatar?.key}`}
                      className="mx-auto h-10 w-10 cursor-pointer"
                      style={{
                        // height: "200px",
                        // width: "200px",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  ) : (
                    <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                      {userName?.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <p className="text-primary text-lg ml-2 cursor-pointer">
                    {!isEmpty(userName) && capitalizeFirstLetter(userName)}
                  </p>
                </div>
              </div>
            )}

            <Link prefetch={false} href="/merchant-landing">
              <a
                className={`${
                  usertype === 1 || usertype === 2 ? "hidden" : "block"
                } text-white text-[16px] bg-primary hover:text-primary border border-primary  hover:bg-white rounded-2xl px-4 py-2 duration-300`}
              >
                List your institute
              </a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
