import axios from "axios";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";
import MetaHelmet from "../../../components/MetaHelmet";
import Navbar from "../../../components/pages/HomeLanding/Header/Navbar";
import Footer from "../../../components/layout/Footer";
import InstituteHeader from "../../../components/pages/institutes/InstituteHeader";
import EnquirySection from "../../../components/pages/institutes/EnquirySection";
import { authSelector } from "../../../redux/slices/authSlice";
import { setCurrentInstitute } from "../../../redux/slices/instituteSlice";
import {
  postUserAnalytics,
  selectUserAnalytics,
  setUserLocation
} from "../../../redux/slices/UserAnalytics";
import { host } from "../../../utils/constant";
import { isEmpty } from "../../../utils/utils";
import Error404 from "../../404";
const SimilarInstitute = dynamic(
  () => {
    return import("../../../components/pages/institutes/SimilarInstitute");
  },
  { ssr: false }
);
const Join = dynamic(
  () => {
    return import("../../../components/pages/institutes/Join");
  },
  { ssr: false }
);
const Faculty = dynamic(
  () => {
    return import("../../../components/pages/institutes/Faculty");
  },
  { ssr: false }
);
const Ratings = dynamic(
  () => {
    return import("../../../components/pages/institutes/Rating");
  },
  { ssr: false }
);
const Toppers = dynamic(
  () => {
    return import("../../../components/pages/institutes/Toppers");
  },
  { ssr: false }
);
const Courses = dynamic(
  () => {
    return import("../../../components/pages/institutes/Courses");
  },
  { ssr: false }
);

const OstelloExplore = dynamic(
  () => {
    return import("../../../components/pages/HomeLanding/OstelloExpore");
  },
  { ssr: false }
);

const OstelloSubscribe = dynamic(
  () => {
    return import("../../../components/pages/HomeLanding/OstelloSubscribe");
  },
  { ssr: false }
);
const OstelloWorkshop = dynamic(
  () => {
    return import("../../../components/pages/HomeLanding/OstelloWorkshop");
  },
  { ssr: false }
);
const NewInstitutePage = ({ currentInstitute, notFound, ip, review }) => {
  console.log(notFound, "notFound..");
  const { metatitle, metadesc, slug, locations, phonenumber, name,rating, images } = currentInstitute || {};
  const dispatch = useDispatch();
  const router = useRouter();
  const { userData, isAuthenticated } = useSelector(authSelector);
  const { userLocation } = useSelector(selectUserAnalytics);
  console.log(ip);
  let t0 = moment().format();
  const url = router.pathname;
  console.log(currentInstitute)
  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
  });
  useEffect(() => {
    dispatch(setCurrentInstitute(currentInstitute));
  }, [currentInstitute, dispatch]);

  useEffect(() => {
    const exitingFunction = () => {
      if (isAuthenticated) {
        var t1 = moment().format();
        const timeSpent = moment(t1).diff(t0, "seconds");
        console.log(timeSpent);
        const data = {
          activity_type: "visit_time",
          payload: {
            instituteid: currentInstitute?.id,
            ipaddress: ip,
            userid: userData?.id,
            user_name: userData?.name,
            total_time_in_seconds: timeSpent,
          },
        };
        if (userLocation?.latitude !== "") {
          data.location = {
            longitude: userLocation?.longitude?.toString(),
            latitude: userLocation?.latitude?.toString(),
          };
        } else {
          data.location = null;
        }
        console.log(data);
        dispatch(postUserAnalytics(data));
      }
    };

    router.events.on("routeChangeStart", exitingFunction);

    return () => {
      router.events.off("routeChangeStart", exitingFunction);
    };
  }, [isAuthenticated, userLocation?.latitude]);


  const [currentCourse, setCurrentCourse] = useState({})

  const [currentInstituteCourse, setCurrentInstituteCourse] = useState([])
  const [totalCount, setTotalCount] = useState()

  useEffect(() => {
    const run = async () => {
      if(currentInstitute?.id){
        try {
          const res = await axios.get(
            `${host}/course?instituteId=${currentInstitute?.id}&limit=${currentInstitute?.courses?.length}`
          );
          setCurrentInstituteCourse(res?.data?.message);
        
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [currentInstitute?.id, currentInstitute?.courses?.length]);

  const [instituteFaculty, setInstituteFaculty] = useState([])


  console.log(currentInstituteCourse, currentInstitute);

  useEffect(() => {
    const run = async () => {
      if(currentInstitute?.id){
        try {
          const res = await axios.get(
            `${host}/institute/faculty?instituteId=${currentInstitute?.id}`
          );
          setInstituteFaculty(res?.data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [currentInstitute?.id]);

  if (notFound) {
    return <Error404 />;
  }

  return router.isFallback ? (
    <LoadingSpinner />
  ) : (
    <main className=" ">
      <MetaHelmet
        title={metatitle}
        description={metadesc}
        link={`https://www.ostello.co.in/institute/${slug}`}
        name={name}
        images={images}
        locations={locations}
        phonenumber={phonenumber}
        rating={rating}
        review={review}
      />
      <div className="bg-[#F9F5FF]">
        <div className=" md:max-w-[1350px] mx-auto">
        <div className="md:mb-[70px]">
        <div className="fixed top-0 z-50 bg-white  md:max-w-[1350px] w-full mx-auto  shadow">
        <Navbar text={"text-[#667085]"} />
        </div>
        </div>
          <InstituteHeader currentInstitute={currentInstitute} instituteFaculty={instituteFaculty} ipAddress={ip} />
        </div>
        <div className="bg-[#7F56D9] py-3">
          <marquee className="text-white text-[20px] flex font-medium">
            {currentInstitute?.name === "Aryabhatta Classes" ||
            !currentInstitute?.images?.length ||
            !currentInstitute?.videos.length ? (
              <>
                <a>
                Preparation For CUET + Boards
                </a>
                <a
                  onClick={() => {
                    router.push(`/entrance-exam/${currentInstitute?.id}`);
                  }}
                  className={`text-[16px] mx-3 border-2 border-white text-white p-2`}
                >
                  Enroll Now
                </a>
              </>
            ) : (
              <a>{metadesc}</a>
            )}
          </marquee>
        </div>
      </div>
      <Courses currentInstitute={currentInstitute} currentInstituteCourses={currentInstituteCourse} ipAddress={ip} setCurrentCourseData={setCurrentCourse} />
      <div className=" md:max-w-[1350px] mx-auto">
        <Toppers />
        {!isEmpty(instituteFaculty?.length) && (
          <Faculty currentInstitute={currentInstitute} instituteFaculty={instituteFaculty} ipAddress={ip} />
        )}
        <OstelloExplore
          header={"About The Institute"}
          description={currentInstitute?.description}
          mainLanding={false}
          currentInstitute={currentInstitute}
          ipAddress={ip}
          image={currentInstitute?.images}
        />
        <OstelloWorkshop />
      </div>
      <div className="bg-[#F9F5FF]">
        <Ratings
          isForInstitute={true}
          currentInstitute={currentInstitute}
          reviews={review}
        />
      </div>

      <div className="md:max-w-[1350px] mx-auto">
        {/* new section for enquiry */}
        <EnquirySection currentInstitute={currentInstitute} currentCourse={currentCourse} /> 
        <Join />
        {currentInstitute?.name !== "Aryabhatta Classes" ? (
          <SimilarInstitute />
        ) : (
          ""
        )}
        <OstelloSubscribe />
        <Footer />
      </div>
    </main>
  );
};

export default NewInstitutePage;

export async function getServerSideProps({ params, req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  let currentInstitute;
  console.log(params);
  try {
    const res = await axios.get(
      `${host}/institute?slug=${params.instituteId}`
    );
    currentInstitute = res?.data?.message;
  } catch (err) {
    console.log(err);
  }
  let ip;

  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  var review = []
  let reviews 

  try {
    const res = await axios.get(
      `${host}/review?instituteId=${params.instituteId}&nolimit=true`
    );
    reviews = res?.data?.message
  } catch (err) {
    console.log(err);
  }

 
  if(reviews?.length){
    await Promise.all(reviews?.map(async (item)=> {
      var reviewDetails = {
        "@type": "Review",
        datePublished: '' ,
        reviewBody: '',
        reviewRating: {
          worstRating: "1",
          bestRating: "",
          ratingValue: ""
        },
        author: {
          "@type": "Person",
          name: '',
      },
      publisher: {
        "@type": "Organization",
        name: "",
        url: ""
      }
      }
      const {data} = await axios.get(`${host}/review?id=${item?.id}`)
  
          if(data && data.message?.user?.name?.length > 2){
          reviewDetails.datePublished = new Date(`${data.message.publishedon}`).toDateString();
          reviewDetails.reviewBody = data.message.reviewtext;
          reviewDetails.author.name = data.message.user.name;
          reviewDetails.reviewRating.bestRating = data.message.rating.toString();
          reviewDetails.reviewRating.ratingValue = data.message.rating.toString();
          reviewDetails.publisher.name = data.message.institute.name;
          reviewDetails.publisher.url = `https://www.ostello.co.in/institute/${data.message.institute.slug}`;
          review.push(reviewDetails)
          }
        
  console.log(reviewDetails) 
  }))
  }
console.log(review)
  if (!currentInstitute) {
    return {
      props: {
        notFound: true,
        currentInstitute: {},
      },
    };
  }

  return { props: { currentInstitute, review, ip } };
}
