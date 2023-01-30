import React, { useState, useEffect } from "react";
import img1 from "../../../../assets/merchantDashboard/Accountancy/defaultbg.png";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import HeaderCard from "./DashboardHome/HeaderCard/HeaderCard";
// import Charts from './DashboardHome/Chart/Charts';
// import PieChart from './DashboardHome/Chart/PieChart';
import RecentOrder from "./DashboardHome/RecentOrder/RecentOrder";
import { Box, Modal, Rating } from "@mui/material";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  getMerchantAnalytics,
  selectUserAnalytics,
} from "../../../../redux/slices/UserAnalytics";
import { host, INSTITUTE_ID } from "../../../../utils/constant";
import moment from "moment";
import UserStats from "./DashboardHome/Chart/UserStats";
import { authSelector } from "../../../../redux/slices/authSlice";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import DashboardPayment from "./DashboardPayment";

const PieChart = dynamic(() => import("./DashboardHome/Chart/PieChart"), {
  ssr: false,
});

const Charts = dynamic(() => import("./DashboardHome/Chart/Charts"), {
  ssr: false,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

const DashboardHome = () => {
  const [slice, setSlice] = useState(2);
  const [dates, setDates] = useState([]);
  const [datesData, setDatesData] = useState([]);
  const [visitInstitute, setVisitInstitute] = useState([]);
  const [knowInstitute, setKnowInstitute] = useState([]);
  const [researchFaculty, setResearchFaculty] = useState([]);
  const [watchVideos, setWatchVideos] = useState([]);
  const [exploreCourses, setExploreCourses] = useState([]);
  const [openStats, setOpenStats] = useState(false);
  const { merchantAnalytics } = useSelector(selectUserAnalytics);
  const dispatch = useDispatch();
  const data = [];

  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleStats = () => {
    setOpenStats(!openStats);
  };
  const [revenueData, setRevenueData] = useState({});
  const getRevenue = async (id)=> {
    try{
    const response = await axios.get(`${host}/course/purchased?instituteid=${id}`,{
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${
        typeof window !== 'undefined' &&
        window.localStorage.getItem('ACCESS_TOKEN')
      }`,
    },
  })
  
  let studentCount = 0;
  let revenueCount = 0;
  response?.data?.courses?.map((item)=>{
    studentCount = studentCount + item?.studentsenrolled;
    revenueCount = revenueCount + item?.pricingdetails?.subscription?.amount;
  })
  const c = {
    totalStudent : studentCount,
    totalRevenue : revenueCount,
    coursesSold : response?.data?.courses?.length,

  }
  setRevenueData(c);
  console.log(response);
} catch (err) {
  console.log(err)
}
}
console.log(revenueData);

  useEffect(()=>{
    if(INSTITUTE_ID?.length > 0){
      getRevenue(INSTITUTE_ID);
      dispatch(getMerchantAnalytics(INSTITUTE_ID))
    }
  },[dispatch])


  const { instituteDetails } = useSelector(authSelector);

  const [city, setCity] = useState(instituteDetails?.locations?.[0].city);
  const [area, setArea] = useState(instituteDetails?.locations?.[0].area);
  const [areaError, setAreaError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState(instituteDetails?.locations?.[0].state);
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState(
    instituteDetails?.locations?.[0].pincode
  );
  const [pincodeError, setPincodeError] = useState("");

  useEffect(() => {
    if (instituteDetails) {
      setCity(instituteDetails?.locations?.[0].city);
      setArea(instituteDetails?.locations?.[0].area);
      setPincode(instituteDetails?.locations?.[0].pincode);
      setState(instituteDetails?.locations?.[0].state);
    }
  }, [instituteDetails]);

  console.log(pincode);

  const handleGenerateFromPincode = (pinCode) => {
    console.log(pinCode, pinCode.length);
    if (pinCode?.length) {
      if (pinCode.length !== 6) {
        toast.error("Enter a valid pincode");
        setPincodeError("Enter a valid pincode");
        setAreaOptions([]);
        setArea("");
        setCity("");
        setState("");
        setCountry("");
        return;
      }
      return;
    }
    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((res) => {
        setAreaOptions([]);
        res?.data?.map((item) =>
          item?.PostOffice?.forEach((po) => {
            setAreaOptions((prev) => {
              if (prev.indexOf(po.Name) === -1) {
                return [...prev, po.Name];
              }
              return prev;
            });
          })
        );

        setCity(res?.data[0]?.PostOffice[0]?.District);
        setState(res?.data[0]?.PostOffice[0]?.State);
        setCountry(res?.data[0]?.PostOffice[0]?.Country);
        setPincodeError("");
      })
      .catch((err) => console.log(err));
  };

  const infoGenRef = useRef(null);

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    let visit_institute = [];
    let know_institute = [];
    let research_faculties = [];
    let explore_courses = [];
    let watch_videos = [];

    let DataWithTime = (time = "", dataArray = []) => {
      const temp = new Set();
      let arr = [];
      dataArray?.map((u) => temp.add(u?.payload?.userid));
      arr = [...temp];
      return {
        date: time,
        data: dataArray,
        totalUsers: dataArray?.length,
        oldUsers: arr?.length,
        newUsers: dataArray?.length - arr?.length,
      };
    };

    const set_of_dates = new Set();
    const setOfType = new Set();
    const setOfLocations = new Set();
    merchantAnalytics?.map((items) => {
      set_of_dates?.add(
        moment(items?.timestamp?.split("T")[0])?.format("ll")?.split(",")[0]
      );
      setOfType.add(items?.activity_type);
      // setOfLocations.add(items?.area)
    });
    let allArea = [...setOfLocations];
    let allDates = [...set_of_dates];
    console.log(allArea);
    let dates_data = [];
    allDates?.map((date) => {
      let data_of_date = merchantAnalytics?.filter(
        (item) =>
          moment(item?.timestamp?.split("T")[0])
            ?.format("ll")
            ?.split(",")[0] === date
      );
      let visit_institute_dod = [];
      let know_institute_dod = [];
      let research_faculties_dod = [];
      let explore_courses_dod = [];
      let watch_videos_dod = [];

      dates_data.push({ date: date, data: data_of_date });

      data_of_date.forEach((data) => {
        if (data.activity_type === "visit_institute") {
          visit_institute_dod.push(data);
        }
        if (data.activity_type === "know_institute") {
          know_institute_dod.push(data);
        }
        if (data.activity_type === "explore_courses") {
          explore_courses_dod.push(data);
        }
        if (data.activity_type === "research_faculties") {
          research_faculties_dod.push(data);
        }
        if (data.activity_type === "watch_videos") {
          watch_videos_dod.push(data);
        }
      });
      visit_institute.push(DataWithTime(date, visit_institute_dod));
      know_institute.push(DataWithTime(date, know_institute_dod));
      explore_courses.push(DataWithTime(date, explore_courses_dod));
      research_faculties.push(DataWithTime(date, research_faculties_dod));
      watch_videos.push(DataWithTime(date, watch_videos_dod));
    });
    setDates(allDates);
    setDatesData(dates_data);
    setVisitInstitute(visit_institute);
    setKnowInstitute(know_institute);
    setExploreCourses(explore_courses);
    setResearchFaculty(research_faculties);
    setWatchVideos(watch_videos);
  }, [merchantAnalytics]);

  console.log(
    datesData,
    visitInstitute,
    knowInstitute,
    exploreCourses,
    researchFaculty,
    watchVideos
  );
  const [showSidebar, setShowSidebar] = useState(false);
  const [select, setSelect] = useState("monthly");

  console.log(select);

  const [billingArea, setBillingArea] = useState(
    instituteDetails?.locations?.[0].area
  );
  const [billingCity, setBillingCity] = useState(
    instituteDetails?.locations?.[0].city
  );
  const [billingPincode, setBillingPincode] = useState(
    instituteDetails?.locations?.[0].pincode
  );

  const [plan, setPlan] = useState("");

  useEffect(() => {
    if (instituteDetails?.locations) {
      setBillingArea(instituteDetails?.locations?.[0].area);
      setBillingCity(instituteDetails?.locations?.[0].city);
      setBillingPincode(instituteDetails?.locations?.[0].pincode);
    }
  }, [instituteDetails?.locations]);

  const changeHandle = () => {
    if (area) {
      setBillingArea(area);
    }
    if (city) {
      setBillingCity(city);
    }
    if (pincode) {
      setBillingPincode(pincode);
    }
  };
  const [pricing, setPricing] = useState("3999");
  const [totalPrice, setTotalPrice] = useState(0);

  

  const [proceed, setProceed] = useState(false);
  const handleProceed = () => {
    setProceed(true);
  };

  const handlePayment = () => {
    setTotalPrice(pricing);
    handleModalOpen();
    setProceed(false)
  };

  return (
    <div className="p-5 ">
      <div className="heading mb-5 md:flex justify-between">
        <h1 className="text-2xl font-bold  ">Dashboard</h1>

        <div className="md:flex items-center">
          <p className="md:mr-4 mt-2 text-xl ">
            Ostello Business Account Status :{" "}
            <span className="text-[#239B56]"> FREE</span>
          </p>

          <button
            onClick={() => {
              setShowSidebar(true);
            }}
            className=" py-3  px-4 mt-2 bg-primary rounded-3xl text-white"
          >
            Upgrade Now
          </button>
        </div>
      </div>
      <div
        className={`top-7 right-0 md:w-[500px] w-[90%] rounded-3xl  bg-[#F8F9F9] border-2 border-light-gray  fixed max-h-[90%]  my-auto overflow-y-scroll z-50  ease-in-out duration-[300ms] ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="   ">
          <div className="flex justify-between p-3  bg-white items-center">
            <p className="text-3xl font-bold">Change Plan</p>

            <button
              className="flex text- items-center cursor-pointer"
              style={{ color: "#414141" }}
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <ImCross className="" />
            </button>
          </div>

          <div className="p-3 ">
            {}
            <div className=" p-3 rounded border-2 border-[#95A5A6] ">
              {/* <p className="text-xl my-3">Select Plan</p>
              <div className="flex justify-between">
                <select
                  onChange={(e) => {
                    setPlan(e.target.value);
                    if (e.target.value === "Basic") {
                      setPricing(500);
                    }
                    if (e.target.value === "Standard") {
                      setPricing(1000);
                    }
                  }}
                  value={plan}
                  className={` form-select   marker:block w-2/4 px-4 py-3   text-slate bg-[#F2E9FC] bg-clip-padding bg-no-repeat text-xl font-bold  rounded-md   first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
                >
                  <option className="" value="Basic">
                    Basic
                  </option>
                  <option className="" value="Standard">
                    Standard
                  </option>
                </select>
                <div>
                  <p className="text-primary text-2xl font-bold">
                    ₹{pricing * `${select === "monthly" ? 1 : 10}`}/
                    {select === "monthly" ? "mo" : "yr"}
                  </p>
                  <small>(Tax Excl,)</small>
                </div>
              </div> */}
              <p className="text-xl my-3 ">Choose your billing</p>
              <div className="flex justify-between">
                <div className="flex">
                  <button
                    onClick={() => {
                      setSelect("monthly");
                      setPricing("3999");
                    }}
                    className={`${
                      select === "monthly"
                        ? "bg-primary text-white"
                        : "bg-[#F2E9FC]  text-black"
                    } p-1 px-6  text-[20px]  rounded cursor-pointer mr-2 flex items-center `}
                  >
                    <p className="">Monthly</p>
                  </button>
                  <button
                    onClick={() => {
                      setSelect("yearly");
                      setPricing("34999");
                    }}
                    className={`${
                      select === "yearly"
                        ? "bg-primary text-white"
                        : "bg-[#F2E9FC]  text-black"
                    } p-2 px-4  text-[17px]  rounded cursor-pointer items-center mr-2 text-center`}
                  >
                    <p>Yearly </p>
                    <small className="text-[12px]">
                      Flexible Usage | 10% off
                    </small>
                  </button>
                </div>

                <div>
                  <p className="text-primary text-2xl font-bold">
                    ₹{pricing}/{select === "monthly" ? "mo" : "yr"}
                  </p>
                  <small>(Tax Excl,)</small>
                </div>
              </div>

              <div></div>
            </div>

            <div className=" p-3  items-center justify-between mt-3 rounded border-2 border-[#95A5A6]">
              <div className="flex items-center justify-between">
                <div className="">
                  <p className="text-xl ">Billing Address </p>

                  <p className="text-md">
                    {" "}
                    {billingArea}, {billingCity} IN - {billingPincode}
                  </p>
                </div>
                <p
                  onClick={() => {
                    setOpen(true);
                    if (pincode) {
                      handleGenerateFromPincode(pincode);
                    }
                  }}
                  className=" cursor-pointer border-2 border-[#95A5A6] text-[#95A5A6] p-1 px-2"
                >
                  Edit
                </p>
              </div>
            </div>

            <div className=" p-3  items-center justify-between mt-3 rounded border-2 border-[#95A5A6]">
              <div className="flex items-center justify-between">
                <div className="">
                  <p className="text-xl ">Payment Method </p>

                  <p className="text-md">Credit Card ending with - ***110014</p>
                </div>
                <p className=" cursor-pointer border-2 border-[#95A5A6] text-[#95A5A6] p-1 px-2">
                  Update
                </p>
              </div>
            </div>

            <div className=" p-3  items-center justify-between mt-3 ">
              <div className="">
                <p className="text-md">
                  Upgrade : This plan will be applied immediately, term will end
                  in 1 year from current biling start date on{" "}
                  {new Date().toJSON().slice(0, 10)}
                </p>
              </div>
              <p
                onClick={() => {
                  handlePayment();
                }}
                className=" cursor-pointer border-2 my-3 text-center text-2xl font-bold rounded border-2 bg-primary text-white p-1 px-2"
              >
                Place Order
              </p>
            </div>
          </div>
        </div>
      </div>
      <HeaderCard revenueData={revenueData}></HeaderCard>

      <div className=" grid grid-cols-6 gap-6 ">
        <div className=" col-span-6 lg:col-span-4">
          <Charts
            {...{
              datesData,
              dates,
              visitInstitute,
              knowInstitute,
              exploreCourses,
              researchFaculty,
              watchVideos,
              handleStats,
            }}
          ></Charts>
        </div>
        <div className=" col-span-6 lg:col-span-2 bg-white rounded-2xl  ">
          <PieChart revenueData={revenueData}></PieChart>
        </div>
      </div>
      <div className=" grid grid-cols-6 gap-6 mt-4  ">
        <div className=" col-span-6 lg:col-span-4">
          <RecentOrder revenueData={revenueData}></RecentOrder>
        </div>
        <div
          style={{ height: "360px" }}
          className=" thin-scroll h-65  col-span-6 lg:col-span-2  bg-white p-4 rounded-2xl "
        >
          <div className="heading mb-1">
            <h1 style={{ fontWeight: "700", fontSize: "20px" }}>
              Top Selling Courses
            </h1>
          </div>
          <div className="sm:block hidden overflow-y-scroll h-60 ">
            {data
              .map((d, idx) => (
                <div key={idx} className="">
                  <div className=" flex justify-between items-center mt-5">
                    <div className="flex items-center">
                      <img
                        src={img1.src}
                        style={{
                          height: "95px",
                          width: "95px",
                          borderRadius: "8px",
                        }}
                        className="share-image"
                        alt=""
                      />
                      <div className="texts ml-4">
                        <h2 className="text-base mb-1">{d.name}</h2>
                        <Rating
                          className="text-2xl"
                          name="read-only"
                          value={d.rating}
                          readOnly
                        />
                        <h4 className="text-sm font-bold">₹{d.totalAmount}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              .slice(0, 4)}
          </div>
          <div className="sm:hidden block mb-2">
            {data
              .map((d, idx) => (
                <div key={idx} className="">
                  <div className=" flex justify-between items-center mt-5">
                    <div className="flex items-center">
                      <img
                        src={img1}
                        style={{
                          height: "95px",
                          width: "95px",
                          borderRadius: "8px",
                        }}
                        className="share-image"
                        alt=""
                      />
                      <div className="texts ml-4">
                        <h2 className="text-base mb-1">{d.name}</h2>
                        <Rating
                          className="text-orange/40"
                          emptySymbol="fa fa-star-o "
                          fullSymbol="fa fa-star "
                          initialRating={d?.rating}
                          readonly
                        />
                        <h4 className="text-sm font-bold">₹{d.totalAmount}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              .slice(0, slice)}
          </div>

          <div className="sm:hidden block">
            {slice === 2 ? (
              <div
                style={{
                  cursor: "pointer",
                  color: "#7D23E0",
                  fontWeight: "500",
                }}
                onClick={() => setSlice(4)}
                className="flex items-center justify-center  font-medium "
              >
                <p className="mr-2">View More</p>
                <AiOutlineArrowDown></AiOutlineArrowDown>
              </div>
            ) : (
              <div
                style={{
                  cursor: "pointer",
                  color: "#7D23E0",
                  fontWeight: "500",
                }}
                onClick={() => setSlice(2)}
                className="flex items-center justify-center  font-medium "
              >
                <p className="mr-2">View Less</p>
                <AiOutlineArrowUp></AiOutlineArrowUp>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between ">
            <p className="text-xl font-bold">Change Billing Address</p>
            <GiCancel
              onClick={() => {
                handleClose();
              }}
              className="text-right text-2xl text-primary cursor-pointer"
            ></GiCancel>
          </div>

          <div
            className={`shrink px-3 py-2   rounded-md  font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 flex`}
          >
            <input
              type="text"
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              name="pincode"
              placeholder="Pincode"
              onChange={(e) => handleChange(e, setPincode)}
              value={pincode}
            />
            <button
              ref={infoGenRef}
              onClick={(e) => {
                e.preventDefault();
                handleGenerateFromPincode(pincode);
              }}
              className="text-xs p-1 bg-primary text-white m-1 rounded-md"
            >
              Generate
            </button>
          </div>

          <div className="shrink px-3 py-2  rounded-md font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 ">
            <input
              type="text"
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              name="state"
              placeholder="State"
              onChange={(e) => handleChange(e, setState)}
              value={state}
            />
          </div>
          <div className="shrink px-3 py-2  rounded-md font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-xl mt-2 ">
            <input
              type="text"
              autoFocus
              className="text-xl bg-white   focus:outline-none w-full"
              name="city"
              placeholder="City"
              onChange={(e) => handleChange(e, setCity)}
              value={city}
            />
          </div>
          <div className={`w-full mt-2`}>
            {/* <select
                  onChange={(e) => setArea(e.target.value)}
                  value={area}
                  className={` form-select  marker:block w-full px-3 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border border-solid border-[#D0D5DD]  first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
                >
                  <option className="w-full" selected value="" disabled>
                    Choose Area
                  </option>
                  {areaOptions.map((category, idx) => {
                    return (
                      <option
                        key={idx}
                        className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                      >
                        {category}
                      </option>
                    );
                  })}
                </select> */}
            <div className="shrink  w-full  px-3 py-2    text-[14px] font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
              <input
                list="area-option-list"
                id="area-choice"
                name="area-choice"
                type="text"
                autoFocus
                className="text-xl bg-white  focus:outline-none w-full cursor-pointer"
                onChange={(e) => handleChange(e, setArea)}
                value={area}
              />

              <datalist id="area-option-list">
                {areaOptions.map((category, idx) => {
                  return (
                    <option
                      key={idx}
                      value={category}
                      className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                    />
                  );
                })}
              </datalist>
            </div>
          </div>

          <button
            onClick={() => {
              changeHandle();
            }}
            className="   my-3 text-center text-xl font-bold rounded bg-primary text-white  p-2"
          >
            Change
          </button>
        </Box>
      </Modal>

      <DashboardPayment
        openModal={openModal}
        handleModalClose={handleModalClose}
        totalPrice={totalPrice}
        select={select}
        handleProceed={handleProceed}
        proceed={proceed}
      />
    </div>
  );
};

export default DashboardHome;
