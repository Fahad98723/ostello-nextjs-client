import { Tabs } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFields, setSearch } from "../../../../redux/slices/courseSlice";
import {
  fetchInstitutes,
  institutesSelector,
} from "../../../../redux/slices/instituteSlice";
import {
  setClass,
  setLocationQuery,
} from "../../../../redux/slices/SearchSlice";
import { selectUserAnalytics } from "../../../../redux/slices/UserAnalytics";
import { host } from "../../../../utils/constant";
import InstituteCard from "../../../UI/InstituteCard";
import Segments from "./Segments";

export default function InstituteSection() {
  const [activeTab, setActiveTab] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [topLocationData, setTopLocationData] = useState();
  const { userLocation } = useSelector(selectUserAnalytics);
  const [state, setState] = useState("Delhi");
  const router = useRouter();
  useEffect(() => {
    try {
      axios.get(`${host}/locations?state=${state}&limit=100`).then(function (response) {
        setTopLocationData(response.data.message);
        console.log(response.data.message);
      });
    } catch (err) {
      console.log(err);
    }
    // dispatch(fetchInstitutes());
  }, [dispatch, state]);

  const { institutes } = useSelector(institutesSelector);

  const [instituteShowing, setInstituteShowing] = useState(6);
  const [locationWay, setLocationWay] = useState();
  const dispatch = useDispatch();

  // const getAreaInfo = async (data) => {
  //   const response = await axios.patch(`${host}/utils/geolocation`, data);
  //   console.log(response?.data[1]);
  //   dispatch(fetchInstitutesByUser(response?.data[1]));
  // };

  const getFilterInstitutes = async (place) => {
    await axios
      .get(`${host}/institute?location=${place}`)
      .then(function (response) {
        setLocationWay(response.data.message);
        console.log(locationWay);
      });
  };

  // useEffect(() => {
  //   if (userLocation?.latitude?.length > 1) {
  //     const data = {
  //       longitude: userLocation?.latitude?.toString(),
  //       latitude: userLocation?.latitude?.toString(),
  //     };
  //     getAreaInfo(data);
  //   } else {
  //     dispatch(fetchInstitutes());
  //   }
  // }, [userLocation?.latitude]);

  //push

  const [locations, setLocations] = useState([]);

  // useEffect(() => {
  //   if (state) getFilterInstitutes(locations
  //     ?.filter((a) => a.state === state)[0]?.title);
  // }, [state, locations]);

  useEffect(() => {
    let location = [];
    const data = topLocationData?.filter(
      (a) => a.state.toLowerCase() === state.toLowerCase()
    );
    data?.forEach((element) => {
      location.push({
        state: element?.state,
        title: element?.city,
        subLocations: topLocationData?.filter((t) => t?.city === element?.city),
      });
    });
    let uniqueIds = [];

    const unique = location?.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.title);

      if (!isDuplicate) {
        uniqueIds.push(element.title);

        return true;
      }

      return false;
    });

    setLocations(unique);
    console.log(location, unique);
  }, [topLocationData, state]);

  useEffect(() => {
    if (locations) {
      const data = locations?.filter((a) => a.state === state)[0]?.title;
      if (data && !activeTab) {
        setActiveTab(data);
        getFilterInstitutes(data);
      }
      console.log(data);
    }
  }, [locations, state, activeTab]);

  // useEffect(() => {
  //   getFilterInstitutes(activeTab);
  //   console.log(activeTab);
  // }, [activeTab]);

  const [sortedInstitute, setSortedInstitute] = useState([]);

  console.log(state, locationWay, activeTab);

  return (
    <section className="container mx-auto p-5 lg:p-10 ">
      <div className=" text-center my-10 space-y-5 ">
        <h1 className=" leading-none font-bold text-xl lg:text-5xl ">
          Top Locations in India
        </h1>
        <p className="lg:text-lg">
          Choose from the best and the most suitable locations near you.
        </p>

        <div className="bg-[#F1F1F1] border border-[#DADADA] rounded-[50px] w-fit p-3 mx-auto flex justify-between">
          <button
            onClick={() => {
              setState("Uttar Pradesh");

              setActiveTab(
                locations?.filter((a) => a.state === "Uttar Pradesh")[0]?.title
              );
              getFilterInstitutes(
                locations?.filter((a) => a.state === "Uttar Pradesh")[0]?.title
              );
            }}
            className={`  py-2 md:text-lg   ${
              state === "Uttar Pradesh"
                ? "bg-[#7D23E0] text-white font-semibold px-6 mx-2"
                : "text-[#454C5C] px-3"
            } rounded-[50px] hover:scale-105 duration-200 text-sm whitespace-nowrap`}
          >
            Uttar Pradesh
          </button>
          <div className=" border-r-2 border-black "></div>
          <button
            onClick={() => {
              setState("Delhi");
              setActiveTab(
                locations?.filter((a) => a.state === "Delhi")[0]?.title
              );
              getFilterInstitutes(
                locations?.filter((a) => a.state === "Delhi")[0]?.title
              );
            }}
            className={` px-6 py-2 md:text-lg mx-2 ${
              state === "Delhi"
                ? "bg-[#7D23E0] text-white font-semibold px-6 mx-2"
                : "text-[#454C5C] px-3"
            } rounded-[50px] hover:scale-105 duration-200 text-sm whitespace-nowrap`}
          >
            Delhi
          </button>
          <div className=" border-r-2 border-black "></div>
          <button
            onClick={() => {
              setState("Haryana");
              setActiveTab(
                locations?.filter((a) => a.state === "Haryana")[0]?.title
              );
              getFilterInstitutes(
                locations?.filter((a) => a.state === "Haryana")[0]?.title
              );
            }}
            className={` px-6 py-2 md:text-lg mx-2 ${
              state === "Haryana"
                ? "bg-[#7D23E0] text-white font-semibold px-6 mx-2"
                : "text-[#454C5C] px-3"
            }    rounded-[50px] hover:scale-105 duration-200 text-sm whitespace-nowrap`}
          >
            Haryana
          </button>
        </div>
      </div>

      <Tabs
        centered
        defaultActiveKey={activeTab}
        className="max-w-5xl mx-auto"
        onChange={(e) => {
          getFilterInstitutes(e);
          setActiveTab(e);
          console.log(e);
        }}
      >
        {locations
          .filter((a) => a.title.length > 0)
          .filter((a) => a.state === state)
          .map((item, key) => (
            <>
              <Tabs.TabPane key={item.title} tab={item.title}>
                <Segments
                  className=" "
                  options={item.subLocations}
                  onChange={(value) => setActiveLocation(value)}
                />
              </Tabs.TabPane>
            </>
          ))}
      </Tabs>

      <div className=" mt-10 mx-auto  grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-[60px] ">
        {
          // filteredInstitutes?.length > 0 ? (
          //   filteredInstitutes?.map((item, key) => (
          //     <InstituteCard {...item} key={key} />
          // ))) : (
          locationWay
            ?.sort((a, b) => b?.images?.length - a?.images?.length)
            ?.sort((a, b) => b?.reviews?.length - a?.reviews?.length)
            ?.sort((a, b) => b?.rating - a?.rating)
            ?.slice(0, 6)
            .map((item, key) => (
              <InstituteCard {...item} key={key} />
            ))
          // )
        }
      </div>
      <div className="flex justify-center my-10">
        <button
          onClick={() => {
            dispatch(setFields(""));
            dispatch(setClass([]));
            dispatch(setLocationQuery(state));
            dispatch(
              setSearch({
                type: "institute",
                name: "",
              })
            );
            router.push(`/search/${state?.toLowerCase()?.replace(/ /g, "-")}`);
            // router.push(`/search`);
          }}
          className=" px-6 py-2 md:text-lg  bg-black text-white rounded-md hover:scale-105 duration-200 "
        >
          Explore More
        </button>
      </div>
    </section>
  );
}
