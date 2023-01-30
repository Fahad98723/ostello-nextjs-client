import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import class10 from "../../../../../assets/Pages/Home/icons/10.svg";
import class12 from "../../../../../assets/Pages/Home/icons/12.svg";
import commerce from "../../../../../assets/Pages/Home/icons/commerce.svg";
import humanities from "../../../../../assets/Pages/Home/icons/humanities.svg";
import law from "../../../../../assets/Pages/Home/icons/law.svg";
import medical from "../../../../../assets/Pages/Home/icons/medical.svg";
import non_medical from "../../../../../assets/Pages/Home/icons/non-medical.svg";
import skill from "../../../../../assets/Pages/Home/icons/skillBased2.svg";
import cuet from "../../../../../assets/Pages/Home/icons/Text.svg";
import k12 from "../../../../../assets/Pages/Home/icons/K12.svg";
import { setFields, setSearch } from "../../../../../redux/slices/courseSlice";
import {
  setCategory,
  setClass,
  setLocationQuery,
} from "../../../../../redux/slices/SearchSlice";
import Search from "./Search";
import dynamic from "next/dynamic";


const LocationSearch = dynamic(
  () => {
    return import("./LocationSearch");
  },
  { ssr: false })

export default function SearchBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  

  const shortcuts = [
    // {
    //   title: "Class",
    //   img: class10.src,
    //   url: "/class-10-coaching-institutes-in-delhi",
    //   action: () => {
    //     dispatch(setClass(["Class 10"]));
    //     dispatch(setFields(""));
    //     // dispatch(setLocationQuery("Delhi"));
    //     dispatch(
    //       setSearch({
    //         type: null,
    //         name: "",
    //       })
    //     );
    //   },
    // },
    {
      title: "Academic",
      img: k12.src,
      class : 'w-[70px] h-[40px] mb-1',
      url: "/academics-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setClass(["Class 12"]));
        // dispatch(setLocationQuery("Delhi"));
        dispatch(setFields(""));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Medical",
      img: medical.src,
      class : 'w-[75px] h-[40px] mb-1',
      url: "/medical-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setFields("Medical"));
        // dispatch(setLocationQuery("Delhi"));
        dispatch(setClass([]));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Engineering",
      img: non_medical.src,
      class : 'w-[80px] h-[40px] mb-1',
      url: "/engineering-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setFields("Engineering"));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Humanities",
      img: humanities.src,
      class : 'w-[80px] h-[40px] mb-1',
      url: "/humanities-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setCategory("Arts/Humanities"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Law",
      img: law.src,
      class : 'w-[80px] h-[40px] mb-1',
      url: "/law-coaching-institutes-in-delhi",

      action: () => {
        dispatch(setCategory());
        dispatch(setFields("LAW"));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Commerce",
      img: commerce.src,
      class : 'w-[80px] h-[40px] mb-1',
      url: "/commerce-coaching-institutes-in-delhi",
      action: () => {
        dispatch(setCategory("Commerce"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Skill Based",
      img: skill.src,
      class : 'w-[85px] h-[40px] mb-1',
      url: "/skillbased",
      action: () => {
        dispatch(setCategory("Skill Based"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
    {
      title: "Boards + CUET",
      img: cuet.src,
      class : 'w-[85px] h-[40px] mb-1',
      url: "/exams/cuet",
      action: () => {
        dispatch(setCategory("Boards + CUET"));
        dispatch(setFields(""));
        dispatch(setClass([]));
        // dispatch(setLocationQuery("Delhi"));
        dispatch(
          setSearch({
            type: null,
            name: "",
          })
        );
      },
    },
  ];

  return (
    <div className="px-5 sm:px-0">
      <div className=" sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 divide-gray/30 divide-y sm:divide-x sm:divide-y-0 rounded-md border border-gray px-2 py-5  sm:mx-auto bg-white ">
        <div className="w-full">
          <LocationSearch />
        </div>
        <div className="relative w-full">
          <Search />
        </div>
      </div>
      <div className=" sm:w-[73%] grid sm:grid-cols-8 grid-cols-4  md:gap-4 gap-3 justify-around rounded-md border border-gray  sm:mx-auto mt-5  bg-[#101828]   px-2 py-6 ">
        <>
          {shortcuts.map((item, key) => (
            <div
              onClick={() => {
                router.push(item.url, undefined, { shallow: true });
              }}
              className='sm:max-h-[50px] max-h-[70px]'
              key={key}
            >
              <a
                onClick={() => {
                  setTimeout(() => {
                    item.action();
                  }, 1500);
                }}
                className="flex flex-col items-center  hover:scale-[1.2]  sm:p-0 p-2  text-white"
              >
                <img src={item.img} className={`${item.class}`} alt="" />
                <p className="md:text-[12px] text-[11px] whitespace-nowrap  text-white">{item.title}</p>
              </a>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
