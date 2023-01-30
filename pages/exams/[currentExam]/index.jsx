import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css/skyblue";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../../assets/exams/exam-banner.svg";
import banner2 from "../../../assets/toplocationbanner.png";
import Footer from "../../../components/layout/Footer";
import MetaHelmet from "../../../components/MetaHelmet";
import AboutExam from "../../../components/pages/exams/AboutExam";
import ExamPreparation from "../../../components/pages/exams/ExamPreparation";
import ExamReviews from "../../../components/pages/exams/ExamReviews";
import Navbar from "../../../components/pages/HomeLanding/Header/Navbar";
import AuthModal from "../../../components/pages/HomeLanding/Header/Navbar/AuthModal";
import Segments from "../../../components/pages/HomeLanding/InstituteSection/Segments";
import OstelloExplore from "../../../components/pages/HomeLanding/OstelloExpore";
import OstelloFAQ from "../../../components/pages/HomeLanding/OstelloFAQ";
import OstelloSubscribe from "../../../components/pages/HomeLanding/OstelloSubscribe";
import InstituteCard from "../../../components/UI/InstituteCard";
import {
  authSelector,
  setAuthModalState,
} from "../../../redux/slices/authSlice";
import {
  selectSearch,
  setFilteredInstitutes,
} from "../../../redux/slices/SearchSlice";
import { host } from "../../../utils/constant";

const Exams = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const infoGenRef = useRef(null);
  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const { filteredInstitutes } = useSelector(selectSearch);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, userData } = useSelector(authSelector);
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      dispatch(setAuthModalState(2));
      setOpen(true);
      return;
    }

    if (
      !name?.length ||
      !area?.length ||
      !email?.length ||
      !number?.length ||
      !program?.length ||
      !year?.length
    ) {
      toast.error("Please fill the fields");
      return;
    }

    const d = {
      name: userData?.name || name,
      email: userData?.email || email,
      phonenumber: userData?.phonenumber || number,
      address: `${area},${city},${state}`,
      program: program,
      year: year,
    };
    console.log(d);
    try {
      console.log(d);
      const data = await axios.post(`${host}/forms/`, d, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });
      console.log(data.data);
      toast.success(
        "Thank you, We have received your submission successfully."
      );
      setEmail("");
      setName("");
      setCity("");
      setArea("");
      setState("");
      setNumber("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      // window.location.reload();
    }
  };
  useEffect(() => {
    if (router?.query?.currentExam === "cuet") {
      const json = {
        "Competitive Exams": {
          examsPerFields: ["Common University Entrance Test (CUET)"],
        },
      };

      console.log("sssssssss");
      filterByCategory(json, "");
    }
  }, [router?.query?.currentExam]);

  const filterByCategory = async (cat, area) => {
    try {
      const query = JSON.stringify(cat);
      const { data } = await axios.get(
        `${host}/institute?services=${query}&location=${area}`
      );
      const sortInstitutes =
        data?.message
          ?.slice()
          .sort((a, b) => b?.images?.length - a?.images?.length)
          .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
          .sort((a, b) => b?.rating - a?.rating) || [];
      console.log("filter categiry 4", area, query);
      // const sortCourses = data.message?.filter((items) => "classtype" in items);
      dispatch(setFilteredInstitutes(sortInstitutes));
      // dispatch(
      //   setFilteredCourses(
      //     sortCourses
      //       .slice()
      //       .sort((a, b) => b?.images?.length - a?.images?.length)
      //       .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
      //       .sort((a, b) => b?.rating?.length - a?.rating?.length) || []
      //   )
      // );
      //  if(area?.length > 1){
      //    filterByArea(area,sortInstitutes);
      //  }
    } catch (error) {
      toast.error(error.toString());
    }
  };
  const handleGenerateFromPincode = (pinCode) => {
    if (pinCode?.length !== 6) {
      setPincodeError("Enter a valid pincode");
      setAreaOptions([]);
      setArea("");
      setCity("");
      setState("");
      setCountry("");
      return;
    }
    setIsLoading(true);

    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((res) => {
        setAreaOptions([]);
        res.data.map((item) =>
          item.PostOffice.forEach((po) => {
            setAreaOptions((prev) => {
              if (prev.indexOf(po.Name) === -1) {
                return [...prev, po.Name];
              }
              return prev;
            });
          })
        );
        console.log(res.data[0].PostOffice[0]);
        setCity(res.data[0].PostOffice[0].District);
        setState(res.data[0].PostOffice[0].State);
        setCountry(res.data[0].PostOffice[0].Country);
        setIsLoading(false);
        setPincodeError("");
      })
      .catch((err) => console.log(err));
  };
  const programs = [
    { name: "Online Coaching" },
    { name: "Classroom Coaching" },
    { name: "Self Paced Learning" },
    { name: "Test Series" },
  ];
  const years = [{ name: "2023" }, { name: "2024" }, { name: "2025" }];

  const examOptions = [
    { name: "Jangpura" },
    { name: "Mayur Vihar" },
    { name: "South Ext-II" },
    { name: "Kalka Ji" },
    { name: "Dilshad Garden" },
    { name: "Shalimar Garden" },
    { name: "Shahdara" },
    { name: "Karkardooma" },
    { name: "Lajpat Nagar" },
    { name: "Laxmi Nagar" },
    { name: "Sahibabad" },
  ];

  return (
    <section>
      <MetaHelmet
        title="CUET Exam Preparation Coaching Institutes | Delhi | Uttar Pradesh | Haryana | Ostello"
        description="CUET Exam preparation Coaching Institutes in Delhi, Haryana, Faridabad, Uttar Pradesh at Ostello. Get best CUET Coaching Centres/Classes at Ostello."
        link="https://www.ostello.co.in/exams/cuet"
      />
      <div className="mx-auto">
        <AuthModal handleClose={handleClose} open={open} />
        <div className="">
          <div className="fixed top-0 z-50 bg-white w-full mx-auto  shadow">
            <Navbar text={"text-[#667085]"} />
          </div>
        </div>
        <div className="container mx-auto mt-20">
          <div className="justify-center grid grid-cols-10 gap-4  items-center transition-all duration-300">
            <div className="flex md:col-span-7 col-span-10 md:mx-auto mx-5">
              <div className="">
                <h1 className=" leading-none font-bold text-2xl lg:text-4xl ">
                  Crack CUET with{" "}
                  <span className="text-primary font-bold">OSTELLO</span>
                </h1>
                <p className="lg:text-lg mb-5">
                  Choose from the best and the most suitable locations near you.
                </p>
                <div className="mb-5 px-5">
                  <Splide
                    options={{
                      rewind: true,
                      autoplay: true,
                      pauseOnHover: true,
                      pagination: true,
                      arrows: false,
                      perPage: 1,
                      // breakpoints: {
                      //     1200: { perPage: 2, gap: '1rem' },
                      //     640: { perPage: 1, gap: 0 },
                      // },
                    }}
                  >
                    <SplideSlide>
                      <div>
                        <img className="w-full" src={banner.src} alt="" />
                      </div>
                    </SplideSlide>
                    <SplideSlide>
                      <div>
                        <img className="w-full" src={banner2.src} alt="" />
                      </div>
                    </SplideSlide>
                  </Splide>
                </div>
                <div className=" flex justify-center items-center gap-4 mt-10">
                  <div className="py-2 md:w-[350px] text-center bg-[#F6F2FC] px-2">
                    <h1 className="md:text-4xl text-sm lg:text-6xl my-2 font-bold text-primary ">
                      431
                    </h1>
                    <h2 className=" mt-2 lg:text-lg text-xs whitespace-nowrap font-bold">
                      100%-lies in CUET
                    </h2>
                    <h2 className="lg:text-lg text-xs whitespace-nowrap font-bold">
                      2022 & counting
                    </h2>
                  </div>
                  <div className=" grid grid-cols-2 gap-2">
                    <div className="p-2 md:w-[212px] text-center bg-[#E2D0F6] rounded-md">
                      <h1 className="md:text-2xl text-sm lg:text-xl  font-bold ">
                        123
                      </h1>
                      <h2 className=" md:text-lg text-xs  md:font-bold">
                        In Commerce
                      </h2>
                    </div>
                    <div className="p-2 md:w-[212px] text-center bg-primary  rounded-md ">
                      <h1 className="md:text-2xl text-sm lg:text-xl font-bold text-white">
                        140
                      </h1>
                      <h2 className=" md:text-lg text-xs  md:font-bold text-white">
                        In Humanities
                      </h2>
                    </div>
                    <div className="p-2 md:w-[212px] text-center  bg-primary rounded-md ">
                      <h1 className="md:text-2xl text-sm lg:text-xl  font-bold text-white">
                        5
                      </h1>
                      <h2 className="md:text-lg text-xs  md:font-bold text-white">
                        in Science
                      </h2>
                    </div>
                    <div className="p-2 md:w-[212px] text-center bg-[#E2D0F6] rounded-md">
                      <h1 className="md:text-2xl text-sm lg:text-xl font-bold ">
                        163
                      </h1>
                      <h2 className="md:text-lg text-xs  md:font-bold">
                        in English + GT
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex md:col-span-3 col-span-10 mx-3 md:mx-10 rounded-[10px] px-5 py-3 bg-white border border-[#B0B0B0]">
              <form
                action="
              "
              >
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-gray-500 md:text-[14px] font-bold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="First name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none h-10"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="number"
                    className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Mobile Number"
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
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
                <div className="flex justify-between gap-2">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 md:text-[14px] font-bold"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      autoFocus
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      name="state"
                      placeholder="State"
                      onChange={(e) => handleChange(e, setState)}
                      value={state}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      autoFocus
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      name="city"
                      placeholder="City"
                      onChange={(e) => handleChange(e, setCity)}
                      value={city}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 md:text-[14px] font-bold"
                    >
                      Area Options
                    </label>
                    <input
                      list="area-option-list"
                      id="area-choice"
                      name="area-choice"
                      type="text"
                      autoFocus
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      placeholder="Area"
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
                <div className="">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                    >
                      Preferred Program
                    </label>
                    <select
                      onChange={(e) => handleChange(e, setProgram)}
                      value={program}
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    >
                      <option
                        className="md:w-9/12 w-full text-slate bg-white"
                        selected
                        value=""
                        disabled
                        hidden
                      >
                        Preferred Program
                      </option>
                      {programs?.map((a, idx) => {
                        return (
                          <option
                            key={idx}
                            className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                          >
                            {a?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-500 pt-2 md:text-[14px] font-bold"
                    >
                      Year of appearing XII boards exam
                    </label>
                    <select
                      onChange={(e) => handleChange(e, setYear)}
                      value={year}
                      className="form-control block w-full px-3 py-1.5 md:text-[12px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-[#D0D5DD] rounded-[10px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    >
                      <option
                        className="md:w-9/12 w-full text-slate bg-white"
                        selected
                        value=""
                        disabled
                        hidden
                      >
                        Year of appearing XII boards exam
                      </option>
                      {years.map((a, idx) => {
                        return (
                          <option
                            key={idx}
                            className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                          >
                            {a?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => handleSubmit()}
                  className="bg-primary text-white w-full rounded-lg mt-3 pb-2 py-1.5 xl:mb-0"
                >
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
        <AboutExam />
        <div className="container mx-auto mt-20 ">
          <h1 className=" leading-none font-bold text-center text-xl lg:text-4xl ">
            Institutes Offering{" "}
            <span className="text-primary font-bold"> CUET Coaching</span>
          </h1>
          <div className="mt-10 md:px-0 px-5">
            <Segments
              className=" "
              options={examOptions}
              onChange={(value) => console.log(value)}
              usingFor="examPage"
            />
          </div>
          <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
            {filteredInstitutes?.length > 0 ? (
              filteredInstitutes?.map((item, key) => (
                <div className="px-5" key={key}>
                  <InstituteCard {...item} />
                </div>
              ))
            ) : (
              <div>
                <p className="text-[#FF0000] text-3xl ">No Result Found </p>
              </div>
            )}
          </div>
          <Link prefetch={false} href="/search/">
            <p className="text-center mt-10 mb-20 underline hover:text-primary cursor-pointer font-bold text-[18px]">
              ...view more institutes
            </p>
          </Link>
        </div>
        <div className="bg-[#F4EBFF] mt-10">
          <ExamReviews />
        </div>
        {/* <ExamsMentor /> */}
        <ExamPreparation />
        <div className="bg-[#F4EBFF] md:py-0 py-1">
          <OstelloExplore header={"CUET ka king kaun?"} usingFor={"examPage"} />
        </div>
        <OstelloFAQ usingFor={"examPage"} />
      </div>

      <div className="md:p-10 p-5 container mx-auto">
        <OstelloSubscribe />
        <Footer />
      </div>
    </section>
  );
};

export default Exams;
