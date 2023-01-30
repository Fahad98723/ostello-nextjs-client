import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import instituteImage from "../../../../../assets/images/institute.png";
import {
  fetchCourses,
  selectCourse,
  setFields,
  setSearch,
} from "../../../../../redux/slices/courseSlice";
import {
  fetchInstitutes,
  institutesSelector,
} from "../../../../../redux/slices/instituteSlice";
import {
  setCategory,
  setClass,
  setExam,
  setLocationQuery,
  setSearchQuery,
} from "../../../../../redux/slices/SearchSlice";
import { host } from "../../../../../utils/constant";
import { isEmpty } from "../../../../../utils/utils";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import Card from "./card";
import Scroll from "./scroll";

const data = [
  "IIT-JEE-MAIN",
  "IIT-JEE-ADVANCE",
  "BITSAT",
  "VITEEE",
  "SRMJEE",
  "COMEDK",
  "KIITEE",
  "WBJEE",
  "MHTCET",
  "MET",
  "NEET",
  "NEET PG",
  "AIIMS",
  "AIIMS PG",
  "PGIMER",
  "CMSE",
  "FPMT",
  "NPE FET",
];

function Search({
  style,
  className = "input-courses w-full relative",
  placeholder,
}) {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();
  const { institutes } = useSelector(institutesSelector);
  const { courses, search } = useSelector(selectCourse);

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    dispatch(fetchInstitutes());
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    const category = {
      name: searchField,
    };

    const run = async () => {
      const { data } = await axios.get(
        `${host}/institute/query?name=${searchField}&nolimit=true`
      );
      console.log(
        data,
        searchField,
        `${host}/institute/query?name=${searchField}&category=${JSON.stringify(
          category
        )}&nolimit=true`
      );
      setAllData(
        data.message?.map((item, idx) => {
          if (item?.classtype) {
            const { id, name, ratings, images, slug, category } = item;
            return {
              ...item,
              id,
              name,
              category,
              rating: ratings,
              type: "course",
              url: slug,
              img: instituteImage,
              keywords: name + category?.name,
            };
          }
          if (item?.classmode) {
            const { id, name, rating, images, locations, services, slug } =
              item;
            const { city, area, state, line1 } = locations[0];

            return {
              ...item,
              id,
              name,
              rating,
              type: "institute",
              url: `/institute/${slug}`,
              img: images,
              keywords: name + line1 + area + city + state,
            };
          }
        })
      );
    };
    if (searchField?.length > 1) {
      run();
    }
  }, [searchField, dispatch]);

  useEffect(() => {
    let uniqueData = [];

    const dataSorting = allData?.map((item, idx) => {
      if (item?.classtype) {
        const { id, name, ratings, images, slug, category } = item;
        return {
          ...item,
          id,
          name,
          category,
          rating: ratings,
          type: "course",
          url: slug,
          img: instituteImage,
          keywords: name + category?.name,
        };
      }
      if (item?.classmode) {
        const { id, name, rating, images, locations, services, slug } = item;
        const { city, area, state, line1 } = locations[0];

        // let exam
        // if(services.filter(a => a.examsPerFields)){
        //   exam = services.map(a => a.examsPerFields).filter(elm => elm)[0]?.join().replaceAll(',', ' ')
        // }

        return {
          ...item,
          id,
          name,
          rating,
          type: "institute",
          url: `/institute/${slug}`,
          img: images,
          keywords: name + line1 + area + city + state,
        };
      }
    });

    console.log(dataSorting);

    const removeDuplicatesData = allData?.filter((element) => {
      let isDuplicate;
      if (element?.category?.name)
        isDuplicate = uniqueData.includes(element?.category?.name?.trim());
      if (!element?.category?.name)
        isDuplicate = uniqueData.includes(element?.name?.trim());
      if (!isDuplicate) {
        if (element?.category?.name)
          uniqueData.push(element?.category?.name?.trim());
        if (!element?.category?.name) uniqueData.push(element?.name?.trim());

        return true;
      }

      return false;
    });

    const examData = data.map((item, idx) => {
      return {
        name: item,
        rating: 5,
        type: "Exam",
        img: instituteImage,
        keywords: item,
      };
    });

    if (!isEmpty(removeDuplicatesData)) {
      setSearchData([...removeDuplicatesData, ...examData]);
    }
  }, [allData]);

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(
      searchField.length > 0 &&
        searchData?.filter((item) => {
          return item?.keywords
            ?.toLowerCase()
            .includes(searchField?.toLowerCase());
        })
    );
    // setFilteredItems(searchData);
  }, [searchField, searchData]);

  console.log(filteredItems);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!filteredItems.length) {
        setSearchShow(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [filteredItems]);

  const router = useRouter();

  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (e.target.value.length > 0) {
      setSearchShow(true);
    }
  };

  let domNode = useClickOutside(() => {
    setSearchShow(false);
  });

  return (
    <form
      onSubmit={() => {
        dispatch(setSearchQuery(searchField));
        router.push(`/search`);
      }}
      ref={domNode}
      style={style}
      className="flex items-center  sm:mx-5"
    >
      <FiSearch size={20} />
      <input
        onClick={() => setSearchShow(true)}
        className="w-full h-12 px-2 text-[20px] search placeholder:text[20px] outline-none  "
        type="search"
        onChange={handleChange}
        defaultValue={search?.name || ""}
        placeholder={"Search for courses, institutes, exams"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            dispatch(
              setSearch({
                type: null,
                name: searchField,
              })
            );
            dispatch(setLocationQuery(""));
            dispatch(setExam([]));
            dispatch(setFields(""));
            dispatch(setCategory(""));
            dispatch(setClass([]));
            router.push("/search");
          }
        }}
      />
      {searchShow && (
        <Scroll
          style={{
            height: "30vh",
            boxShadow: "0px 4px 15px rgba(125, 35, 224, 0.2)",
          }}
          className="overflow-y-scroll "
        >
          {filteredItems.length > 0 ? (
            <>
              {filteredItems.map((item, index) => (
                <Card key={index} currentValue={item} />
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              No matched Courses or Institutions
            </div>
          )}
        </Scroll>
      )}
    </form>
  );
}

export default Search;
