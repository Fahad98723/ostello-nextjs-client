import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Box, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";
import { Divider } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Data } from "../Search/Data";
import DistanceSlider from "../Search/Distance";
import Dropdown from "../Search/Dropdown";
import GroupCheckbox from "../Search/GroupCheckbox";
import GroupRadio from "../Search/GroupRadio";
import PriceSlider from "../Search/PriceSlider";
import RatingSlider from "../Search/RatingSlider";
import SubjectGroupCheckbox from "../Search/SubjectGroupCheckBox";
import instituteImage from "../../../assets/images/institute.png";
import {
  selectCourse,
  setFields,
  setSearch,
} from "../../../redux/slices/courseSlice";
import { institutesSelector } from "../../../redux/slices/instituteSlice";
import {
  selectSearch,
  setCategory,
  setClass,
  setExam,
  setFilteredCourses,
  setFilteredInstitutes,
  setLocationQuery,
  setPrice,
  setRating,
  setSortBy,
  setSubjects,
} from "../../../redux/slices/SearchSlice";
import { host } from "../../../utils/constant";
import { isEmpty, urlToTitle } from "../../../utils/utils";
import Scroll from "../HomeLanding/Header/SearchBar/scroll";
import ExamCheckbox from "../Search/ExamCheckBox";
import MobileFilterBar from "./MobileFilterBar";
import RecommendedCard from "./RecommendedCard";
import TopLocation from "./TopLocation";
import { useClickOutside } from "../../hooks/useClickOutside";
import Card from "../HomeLanding/Header/SearchBar/card";
import { divide } from "lodash";
import { capitalizeFirst } from "../../utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",

  borderRadius: "5px",
  backgroundColor: "white",
  color: "black",
  overflow: "hidden",
};
const Recommended = ({ name }) => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const router = useRouter();
  const [searchShow, setSearchShow] = useState(false);
  const {
    selectedInstituteName,
    filteredCourses,
    filteredInstitutes,
    locationQuery,
    searchQuery,
    filters,
    areaLocation,
    searchByName,
  } = useSelector(selectSearch);
  const { courses, search, fields } = useSelector(selectCourse);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(router.query);

  const dispatch = useDispatch();

  const filterByLocation = async (locName) => {
    try {
      const { data } = await axios.get(
        `${host}/institute?location=${
          locName === "Jangpura" ? "Jungpura" : locName
        }&nolimit=true`
      );
      console.log(data.message);
      setItemCount(data?.count)
      dispatch(
        setFilteredInstitutes(
          data.message
            .slice()
            .sort((a, b) => b?.images?.length - a?.images?.length)

            .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
            .sort((a, b) => b?.rating - a?.rating)
        )
      );
    } catch (error) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    if (router.query.toplocation) {
      const { toplocation } = router.query;
      const loc = urlToTitle(toplocation);
      console.log(loc);
      dispatch(setLocationQuery(loc));
      filterByLocation(loc);
      dispatch(
        setSearch({
          type: "institute",
          name: "",
        })
      );
    } else if (router.query.location) {
      const { location } = router.query;
      const loc = urlToTitle(location);
      console.log(loc);
      dispatch(setLocationQuery(loc));
      filterByLocation(loc);
      dispatch(
        setSearch({
          type: "institute",
          name: "",
        })
      );
    }
  }, [router.query.toplocation, router.query.location]);

  console.log(searchQuery, search.type);

  useEffect(() => {
    if (searchQuery?.length > 1) {
      filterBySearch(searchQuery,"");
    }
    if (selectedInstituteName?.length > 0) {
      const filterByName = courses.filter((course) => {
        return course.institute?.name
          .toLowerCase()
          .includes(selectedInstituteName.toLowerCase());
      });
      console.log(filterByName);
      dispatch(setFilteredCourses(filterByName));
    }
  }, [selectedInstituteName, searchQuery, courses]);

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "60%",
        overflowY: "scroll!important",
      },
    },
  });

  const [classOpen, setClassOpen] = useState(true);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  let {
    classType,
    category,
    duration,
    sortBy,
    rating,
    price,
    classes,
    subjects,
    board,
    exam,
    skill,
  } = filters;

  const { institutes } = useSelector(institutesSelector);
  const [sort, setSort] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [academics, setAcademics] = useState(true);
  const [engineering, setEngineering] = useState(false);
  const [entranceExam, setEntranceExam] = useState(false);
  const [medical, setMedical] = useState(false);
  const [skillBase, setSkillBased] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchInstitutes());
  // }, []);

  const [locationWiseIns, setLocationWiseIns] = useState([]);

  const [instituteData, setInstituteData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  // useEffect(() => {
  //   if (searchField?.length > 1) {
  //     getCourses();
  //   }
  // }, [searchField]);

  const filterBySearch = async (text,area) => {
    // dispatch(setLocationQuery(""));
    try {
      const { data } = await axios.get(`${host}/institute/query?name=${text}&location=${area}`)
      const sortInstitutes = data.message?.filter(items => 'classmode' in items)
   
      const sortCourses = data.message?.filter(items => 'classtype' in items)
      console.log("filter search 3");
      setItemCount(data?.count)
      dispatch(setFilteredInstitutes(sortInstitutes.slice()
      .sort((a, b) => b?.images?.length - a?.images?.length)
      .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
      .sort((a, b) => b?.rating - a?.rating) || []));
   
      dispatch(setFilteredCourses(sortCourses.slice()
      .sort((a, b) => b?.images?.length - a?.images?.length)
      .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
      .sort((a, b) => b?.rating - a?.rating) || []));
 
     //  if(area?.length > 1){
     //   filterByArea(area,sortInstitutes);
     // }
      console.log("first",data.message,sortInstitutes,sortCourses)
    } catch (error) {
      toast.error(error.toString())
    }
   }

  const filterByCategory = async (cat,area) => {
    try {
      const query = JSON.stringify(cat);
      const { data } = await axios.get(
        `${host}/institute?services=${query}&location=${area}`
      );
      const sortInstitutes = data?.message?.slice()
      .sort((a, b) => b?.images?.length - a?.images?.length)
      .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
      .sort((a, b) => b?.rating - a?.rating) || []
      setItemCount(data?.count)
      console.log("filter categiry 4",area,query);
      // const sortCourses = data.message?.filter((items) => "classtype" in items);
      dispatch(
        setFilteredInstitutes(
         sortInstitutes
        )
      );
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
  const allInstitutes = async (limit) => {
    try {
      const { data } = await axios.get(`${host}/institute?limit=${limit}`);
      setItemCount(data?.count)
      dispatch(
        setFilteredInstitutes(
          data?.message
            ?.slice()
            .sort((a, b) => b?.images?.length - a?.images?.length)
            .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
            .sort((a, b) => b?.rating - a?.rating) || []
        )
      );
    } catch (error) {
      toast.error(error.toString());
    }
  };
  useEffect(() => {
    if (!isEmpty(search)) {
      if (
        search.type === "institute" ||
        search.type === null ||
        !search.type === "course"
      ) {
        if (search.name.length > 1) {
          filterBySearch(search?.name,"");
        }
      }
    } else if (locationQuery?.length > 1) {
      // if (!locationQuery.includes(",")) {
      filterByLocation(locationQuery);
    } 
    // else {
    //   allInstitutes(10);
    // }
  }, [locationQuery, search]);

  console.log(search);

  // useEffect(() => {
  //   if (search.type === "course") {
  //     filterBySearch(search?.name);
  //   }
  // }, [courses, search]);

  console.log(filteredCourses, courses, search?.name);

  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const data = [];
    if (classes) {
      data.push(...data, ...classes);
    }
    if (subjects) {
      subjects.forEach((s) => {
        const subject = s.split("/")[1];
        data.push(...data, subject);
      });
    }
    // if (fields) {
    //   data.push(...data, fields);
    // }
    if (rating) {
      const rate = `${rating} Rated`;
      data.push(...data, rate);
    }
    if (category) {
      data.push(
        ...data,
        category.split("/")[1] ? category.split("/")[1] : category
      );
    }

    if (exam) {
      data.push(...data, ...exam);
    }

    let uniqueChars = [...new Set(data)];

    setSearchList(uniqueChars);
  }, [classes, subjects, category, exam, rating]);

  const [searchData, setSearchData] = useState([]);

  const ApplyFilters = () => {
    if (isEmpty(filteredInstitutes)) {
      return;
    }

    let updatedData = filteredInstitutes;

    if (!isEmpty(rating)) {
      updatedData = updatedData.filter((item) => item.rating <= rating);
    }

    if (!isEmpty(price)) {
      const minPrice = price[0];
      const maxPrice = price[1];

      updatedData = updatedData.filter(
        (items) =>
          !isEmpty(
            items?.courses?.filter(
              (item) =>
                item.effectiveprice >= minPrice &&
                item.effectiveprice <= maxPrice
            )
          )
      );
    }

    if (!isEmpty(areaLocation)) {
      updatedData = updatedData?.filter(
        (item) =>
          !isEmpty(
            item.areas.find((a) => a.includes(areaLocation.toLowerCase()))
          )
      );
    }

    if (searchField) {
      updatedData =
        searchField.length > 0 &&
        searchData.filter((item) => {
          return item?.keywords
            ?.toLowerCase()
            .includes(searchField.toLowerCase());
        });
    }
    if (!searchField) {
      updatedData = updatedData;
      category;
    }

    console.log(updatedData);
    dispatch(
      setFilteredInstitutes(
        updatedData
          .slice()
          .sort((a, b) => b?.images?.length - a?.images?.length)
          .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
          .sort((a, b) => b?.rating - a?.rating)
      )
    );
  };

  // useEffect(() => {
  //   if (!isEmpty(filteredInstitutes)) {
  //     ApplyFilters();
  //   }
  // }, [filteredInstitutes]);//locationQuery dependnecy removed if institute not came by location add that again

  useEffect(() => {
    let updatedData = filteredInstitutes;
    if (!isEmpty(sortBy)) {
      if (sortBy === "Newest") {
        updatedData = updatedData
          ?.map((item) => {
            return {
              ...item,
            };
          })
          .reverse();
      }
      if (sortBy === "Most Popular") {
        updatedData = updatedData
          ?.map((item) => {
            return {
              ...item,
            };
          })
          .reverse();
      }
    }
    console.log(updatedData);
    dispatch(
      setFilteredInstitutes(
        updatedData
          ?.slice()
          .sort((a, b) => b?.images?.length - a?.images?.length)
          .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
          .sort((a, b) => b?.rating - a?.rating)
      )
    );
  }, [sortBy]);

  const removeHandle = (n) => {
    dispatch(setLocationQuery(""));

    allInstitutes(10);

    if (classes) {
      const filterClasses = classes?.filter((c) => c !== n);
      dispatch(setClass(filterClasses));
    }
    if (subjects) {
      const filterSubject = subjects?.filter((c) => c.split("/")[1] !== n);

      dispatch(setSubjects(filterSubject));
    }
    if (exam) {
      const filterExam = exam?.filter((c) => c !== n);

      dispatch(setExam(filterExam));
    }
    if (fields) {
      dispatch(setFields(""));
    }

    if (rating) {
      dispatch(setRating(null));
    }
  };

  // useEffect(() => {
  //   const courseData = courses.map((item, idx) => {
  //     const { id, name, ratings, images, slug } = item;
  //     return {
  //       ...item,
  //       id,
  //       name,
  //       rating: ratings,
  //       type: "course",
  //       url: slug,
  //       img: images,
  //       keywords: name,
  //     };
  //   });
  //   const institutesData = instituteData.map((item, idx) => {
  //     const { id, name, rating, images, locations, slug, services } = item;
  //     const { city, area, state, line1 } = locations[0];

  //     return {
  //       ...item,
  //       id,
  //       name,
  //       rating,
  //       type: "institute",
  //       url: `/institute/${slug}`,
  //       img: images,
  //       keywords: name + line1 + area + city + state + exam,
  //     };
  //   });
  //   if (!isEmpty(courseData) || !isEmpty(instituteData)) {
  //     setSearchData([...institutesData, ...courseData]);
  //   }
  // }, [instituteData]);

  console.log(locationQuery);
  let domNode = useClickOutside(() => {
    setSearchShow(false);
  });
  const { modalBox } = useStyle();
  return (
    <div>
      <div className="divide-y divide-gray/20">
        <div className="md:px-24 px-5 md:py-10 py-5">
          <p className="text-[36px] text-[#101828] font-bold md:block hidden mb-10">
            Result for you
          </p>

          <div className="flex justify-between ">
            <div className="grid grid-cols-2 gap-1  md:grid-cols-5 md:gap-3 ">
              <button
                onClick={() => setOpen(true)}
                className="bg-primary py-2 px-5 rounded-md text-white"
              >
                FILTER
              </button>
              {searchList.map((s, i) => (
                <div
                  key={i}
                  onClick={() => {
                    removeHandle(s);
                  }}
                  className="border-primary border-2  py-2 px-3 md:ml-2 rounded-md text-primary flex items-center justify-between"
                >
                  <p className="mr-2"> {s}</p>
                  <CloseOutlined className="cursor-pointer" />
                </div>
              ))}
            </div>
            <div>
              <Dropdown primaryVariant={true} placeholderText={"Sort By"}>
                <GroupRadio
                  onChange={(e) => dispatch(setSortBy(e))}
                  options={Data.sortBy}
                />
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="md:px-24 md:pt-10 px-5 pt-5">
          <div>
            {router.query.toplocation ? (
              <p className="text-primary font-bold text-[36px]">
                {`${fields || exam?.toString() || ""} Coaching Institutes`}{" "}
                in{" "}
                <span className="text-primary font-bold">
                {locationQuery ? capitalizeFirst(locationQuery) : "all"}
                </span>{" "}
              </p>
            ) : (
              <p className="text-[ #101828] font-bold text-[36px]">
                {fields || exam?.toString() || ""}{" "}
                {search.type === "course" ? "Courses" : "Coaching Institutes"}{" "}
                in{" "}
                <span className="text-primary font-bold">
                  {capitalizeFirst(locationQuery) || "all"}
                </span>{" "}
              </p>
            )}
            {search.type === "course" ? (
              <p className="md:w-[720px] text-[#667085] text-[18px] mt-3">
                There are {filteredCourses.length} Courses in{" "}
                {locationQuery ? `${capitalizeFirst(locationQuery)} area` : "Our site"}
              </p>
            ) : (
              <p className="md:w-[720px] text-[#667085] text-[18px] mt-3">
                There {itemCount} Institutes in{" "}
                {locationQuery ? `${capitalizeFirst(locationQuery)} area` : "Our site"}
              </p>
            )}
          </div>

          <div className="">
            <div className="">
              {/* <h1 className='text-2xl sm:text-4xl my-10'>Institutes near you</h1> */}
              <RecommendedCard />
              {/* <div
          onClick={() => {
            const itemHandler = () => {
              if (!isViewMore) {
                setItemCount(30)
              } else {
                setItemCount(15)
              }
            }
            itemHandler()

            setIsViewMore(!isViewMore)
          }}
          className='text-xl text-primary flex items-center space-x-2 cursor-pointer justify-center'
        >
          <p>{isViewMore ? 'View Less' : 'View More'}</p>
          {isViewMore ? (
            <UpOutlined className='flex items-center text-sm' />
          ) : (
            <DownOutlined className='flex items-center text-sm' />
          )}
        </div> */}
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className={modalBox}>
            <div className="divide-y divide-gray/20">
              <div className="flex justify-between px-5 py-3 items-center">
                <p className="text-[27px] text-[#333333] font-semibold">
                  Filters
                </p>
                <CloseOutlined
                  onClick={() => setOpen(false)}
                  className="text-[20px]"
                />
              </div>
              <div className="p-3 md:block hidden">
                <div className="grid grid-cols-9 gap-x-5">
                  <div className="col-span-2 bg-[#F4EBFF] ">
                    <div className="pl-2 py-2">
                      <div
                        onClick={() => {
                          setClassOpen(true);
                          setSubjectOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(false);
                          setRatingOpen(false);
                          setPriceOpen(false);
                        }}
                        className={`pl-2 mb-2 ${
                          classOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Class</p>
                      </div>
                      <div
                        onClick={() => {
                          setSubjectOpen(true);
                          setClassOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(false);
                          setRatingOpen(false);
                          setPriceOpen(false);
                        }}
                        className={`pl-2 mb-2 ${
                          subjectOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Subject</p>
                      </div>
                      <div
                        onClick={() => {
                          setSubjectOpen(false);
                          setClassOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(false);
                          setPriceOpen(false);
                          setRatingOpen(true);
                        }}
                        className={`pl-2 mb-2 ${
                          ratingOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Ratings</p>
                      </div>
                      <div
                        onClick={() => {
                          setSubjectOpen(false);
                          setClassOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(true);
                          setRatingOpen(false);
                          setPriceOpen(false);
                        }}
                        className={`pl-2 mb-2 ${
                          distanceOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Distance</p>
                      </div>
                      <div
                        onClick={() => {
                          setSubjectOpen(false);
                          setClassOpen(false);
                          setLocationOpen(false);
                          setDistanceOpen(false);
                          setRatingOpen(false);
                          setPriceOpen(true);
                        }}
                        className={`pl-2 mb-2 ${
                          priceOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Price</p>
                      </div>

                      <div
                        onClick={() => {
                          setSubjectOpen(false);
                          setClassOpen(false);
                          setLocationOpen(true);
                          setDistanceOpen(false);
                          setPriceOpen(false);
                          setRatingOpen(false);
                        }}
                        className={`pl-2 mb-2 ${
                          locationOpen && "bg-white border-[#7F56D9] border-l-4"
                        } cursor-pointer`}
                      >
                        <p className="text-[14px] p-2">Locations</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-7">
                    <div
                      className={`flex border rounded-xl  items-center justify-center space-x-2 px-2 mb-1 border-primary w-2/4 ml-auto
        }`}
                    >
                      <input
                        className=" outline-none w-full p-2 "
                        type="text"
                        defaultValue={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                        placeholder="Search"
                      />

                      <FiSearch
                        onClick={() => {}}
                        className={`bg-primary p-1 rounded-full text-white cursor-pointer`}
                        size={26}
                      />
                    </div>
                    <div className="p-3 overflow-y-scroll h-[200px]">
                      {classOpen && (
                        <div className="divide-y divide-gray/20">
                          <div
                            onClick={() => {
                              setAcademics(!academics);
                              setEngineering(false);
                              setMedical(false);
                              setSkillBased(false);
                              setEntranceExam(false);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Academics
                            </p>
                            {academics ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {academics && (
                            <GroupCheckbox
                              checkedState={classes[0]}
                              onChange={(v) => {
                                dispatch(setClass([]));
                                dispatch(setExam([]));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setClass(v));
                                let json = {};
                                if (
                                  v?.toString() == "Class-11" ||
                                  v?.toString() == "Class-12"
                                ) {
                                  json = {
                                    "Senior Secondary School (Class 11-12th)": {
                                      streams: ["Science"],
                                    },
                                  };
                                } else {
                                  json = {
                                    "Junior Secondary School (Class 6-10th)": {
                                      classes: [
                                        v?.toString().replace("-", " "),
                                      ],
                                    },
                                  };
                                }
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.classNames}
                            />
                          )}
                          <div
                            onClick={() => {
                              setEntranceExam(!entranceExam);
                              setAcademics(false);
                              setEngineering(false);
                              setMedical(false);
                              setSkillBased(false);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Entrance Exams
                            </p>
                            {entranceExam ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {entranceExam && (
                            <ExamCheckbox
                              checkedState={exam[0]}
                              onChange={(v) => {
                                dispatch(setExam([]));
                                dispatch(setClass([]));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setExam(v));
                                let json = {};
                                if(v?.toString() === "CUET"){
                                  json = {
                                    "Competitive Exams": {
                                      examsPerFields: ["Common University Entrance Test (CUET)"],
                                    },
                                  };
                                }
                                else{
                                  json = {
                                    "Competitive Exams": {
                                      examsPerFields: [v?.toString()],
                                    },
                                  };
                                }
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.entranceExam}
                            />
                          )}
                          <div
                            onClick={() => {
                              setAcademics(false);
                              setEngineering(!engineering);
                              setMedical(false);
                              setSkillBased(false);
                              setEntranceExam(false);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Engineering
                            </p>
                            {engineering ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {engineering && (
                            <ExamCheckbox
                              checkedState={exam[0]}
                              onChange={(v) => {
                                dispatch(setExam([]));
                                dispatch(setClass([]));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setExam(v));
                                const json = {
                                  "Competitive Exams": {
                                    examsPerFields: [v?.toString()],
                                  },
                                };
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.engineeringExam}
                            />
                          )}
                          <div
                            onClick={() => {
                              setAcademics(false);
                              setEngineering(false);
                              setMedical(!medical);
                              setSkillBased(false);
                              setEntranceExam(false);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Medical
                            </p>
                            {medical ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {medical && (
                            <ExamCheckbox
                              checkedState={exam[0]}
                              onChange={(v) => {
                                dispatch(setExam([]));
                                dispatch(setExam(v));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setClass([]));
                                const json = {
                                  "Competitive Exams": {
                                    examsPerFields: [v?.toString()],
                                  },
                                };
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.medicalExam}
                            />
                          )}
                          <div
                            onClick={() => {
                              setAcademics(false);
                              setEngineering(false);
                              setMedical(false);
                              setEntranceExam(false);
                              setSkillBased(!skillBase);
                            }}
                            className={`pl-2 mb-2 cursor-pointer flex items-center justify-between`}
                          >
                            <p className="text-[16px] font-[600px] p-2">
                              Skill Based
                            </p>
                            {skillBase ? <UpOutlined /> : <DownOutlined />}
                          </div>
                          {skillBase && (
                            <ExamCheckbox
                              checkedState={exam[0]}
                              onChange={(v) => {
                                dispatch(setExam([]));
                                dispatch(setExam(v));
                                dispatch(setCategory(""));
                                dispatch(setFields(v?.toString()));
                                dispatch(setClass([]));
                                const json = {
                                  "Skill Based Courses": {
                                    skills: [v?.toString()],
                                  },
                                };
                                filterByCategory(json,"");
                                dispatch(setLocationQuery(""));
                                // locationQuery?.length > 0
                                //   ? router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-${locationQuery
                                //         ?.toLowerCase()
                                //         ?.replace(/ /g, "-")}`
                                //     )
                                //   : router.push(
                                //       `/${v
                                //         ?.toString()
                                //         ?.toLowerCase()
                                //         ?.replace(
                                //           / /g,
                                //           "-"
                                //         )}-coaching-institutes-in-delhi`
                                //     );
                              }}
                              options={Data.skillBased}
                            />
                          )}
                        </div>
                      )}
                      {subjectOpen && (
                        <>
                          <div className=" p-4 rounded-md mb-5 ">
                            <div className="flex ">
                              {Data.subjects.slice(0, 2).map((item, i) => (
                                <SubjectGroupCheckbox
                                  key={i}
                                  groupTitle={item.subjectType}
                                  dropdownEffect={false}
                                  options={item.subjectList}
                                  checkedState={subjects[0]}
                                  onChange={(v) => {
                                    dispatch(setSubjects([]));
                                    dispatch(setFields(v?.toString()));
                                    dispatch(setSubjects(v));
                                    const sub = v?.toString().split("/")[1];
                                    const json = {
                                      "Junior Secondary School (Class 6-10th)":
                                        {
                                          subjects: [
                                            sub?.replace("-", " "),
                                          ],
                                        },
                                    };
                                    filterByCategory(json,"");
                                    dispatch(setLocationQuery(""));
                                    // locationQuery?.length > 0 ? router.push(
                                    //   `/${v}-Coaching-Institutes-in-${locationQuery?.replace(/ /g,"-")}`
                                    // ): router.push(
                                    //   `/${v}-Coaching-Institutes-in-Delhi`
                                    // );
                                  }}
                                />
                              ))}
                            </div>
                            <Divider type="horizontal" />
                            <div className="flex ">
                              {Data.subjects.slice(2, 4).map((item, i) => (
                                <SubjectGroupCheckbox
                                  key={i}
                                  groupTitle={item.subjectType}
                                  dropdownEffect={false}
                                  options={item.subjectList}
                                  checkedState={subjects[0]}
                                  onChange={(v) => {
                                    dispatch(setSubjects([]));
                                    dispatch(setFields(v?.toString()));
                                    dispatch(setSubjects(v));
                                    const grp = v?.toString().split("/")[0];
                                    const sub = v?.toString().split("/")[1];
                                    const json = {
                                      "Senior Secondary School (Class 11-12th)":
                                        { "subjectsForStreams": { [grp]: [sub] } },
                                    };
                                    filterByCategory(json,"");
                                    dispatch(setLocationQuery(""));
                                    // locationQuery?.length > 0
                                    //   ? router.push(
                                    //       `/${v
                                    //         ?.toString()
                                    //         ?.toLowerCase()
                                    //         ?.replace(
                                    //           / /g,
                                    //           "-"
                                    //         )}-coaching-institutes-in-${locationQuery
                                    //         ?.toLowerCase()
                                    //         ?.replace(/ /g, "-")}`
                                    //     )
                                    //   : router.push(
                                    //       `/${v
                                    //         ?.toString()
                                    //         ?.toLowerCase()
                                    //         ?.replace(
                                    //           / /g,
                                    //           "-"
                                    //         )}-coaching-institutes-in-delhi`
                                    //     );
                                  }}
                                />
                              ))}
                            </div>
                            <Divider type="horizontal" />
                            <div className="flex ">
                              {Data.subjects.slice(4, 6).map((item, i) => (
                                <SubjectGroupCheckbox
                                  key={i}
                                  groupTitle={item.subjectType}
                                  dropdownEffect={false}
                                  options={item.subjectList}
                                  checkedState={subjects[0]}
                                  onChange={(v) => {
                                    dispatch(setSubjects([]));
                                    dispatch(setFields(v?.toString()));
                                    dispatch(setSubjects(v));
                                    const grp = v?.toString().split("/")[0];
                                    const sub = v?.toString().split("/")[1];
                                    const json = {
                                      "Senior Secondary School (Class 11-12th)":
                                        { "subjectsForStreams": { [grp]: [sub] } },
                                    };
                                    filterByCategory(json,"");
                                    dispatch(setLocationQuery(""));
                                    // locationQuery?.length > 0 ? router.push(
                                    //   `/${v}-Coaching-Institutes-in-${locationQuery?.replace(/ /g,"-")}`
                                    // ): router.push(
                                    //   `/${v}-Coaching-Institutes-in-Delhi`
                                    // );
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      {ratingOpen && (
                        <RatingSlider
                          ratings={rating}
                          onChange={(e) => {
                            dispatch(setRating(e));
                          }}
                        />
                      )}
                      {priceOpen && (
                        <PriceSlider onChange={(e) => dispatch(setPrice(e))} />
                      )}
                      {distanceOpen && (
                        <DistanceSlider
                          onChange={(e) => {
                            dispatch(setRating(e));
                          }}
                        />
                      )}
                      {locationOpen && <TopLocation></TopLocation>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 block md:hidden">
                <MobileFilterBar filterByCategory={filterByCategory}/>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Recommended;
