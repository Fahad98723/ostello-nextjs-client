import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../../../assets/images/exploreImage.webp";
import exploreVectorImage1 from "../../../../assets/images/exploreClipVector1.png";
import examExploreImage from "../../../../assets/exams/chart_image.svg";
import { authSelector } from "../../../../redux/slices/authSlice";
import {
  postUserAnalytics,
  selectUserAnalytics,
  setKnowInstitute,
} from "../../../../redux/slices/UserAnalytics";
import { isJsonParsable } from "../../../../utils/utils";
import { Adsense } from "@ctrl/react-adsense";
export default function OstelloExplore({
  header,
  description,
  usingFor,
  currentInstitute,
  ipAddress,
  image,
}) {
  const router = useRouter();
  console.log(description);
  const { userData, isAuthenticated } = useSelector(authSelector);
  const { knowInstitute, userLocation } = useSelector(selectUserAnalytics);
  const [descriptions, setDescriptions] = useState([]);
  const dispatch = useDispatch();
  const [images, setImages] = useState();
  useEffect(() => {
    if (!usingFor) {
      if (isJsonParsable(description)) {
        setDescriptions(JSON.parse(description));
      } else {
        setDescriptions([description]);
      }
    }
    if (currentInstitute?.avatar?.length) {
      setImages(`https://cdn.ostello.co.in/${currentInstitute?.avatar[0].key}`);
    }
  }, [description, usingFor, currentInstitute]);
  return (
    <section className="container mx-auto lg:px-20 px-5 grid grid-cols-1 place-items-center  lg:grid-cols-2  gap-y-5 my-10">
      <h1 className="text-2xl lg:hidden text-center ">
        {header}{" "}
        {usingFor === "examPage" && (
          <span className="text-primary font-bold">Ostello</span>
        )}
      </h1>

      <div className="relative items-center w-[380px] h-[380px]  sm:w-[530px] sm:h-[530px]">
        {usingFor === "mainLanding" ? (
          <>
            <div
              className="w-full h-full absolute   bg-contain "
              style={
                images
                  ? {
                      backgroundImage: `url(${exploreVectorImage1.src})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      zIndex: 110,
                    }
                  : {}
              }
            ></div>
            <img
              className=" rounded-full sm:w-[368px]  sm:h-[368px] w-[290px] h-[290px] absolute  sm:top-[60px] top-[60px] z-10 left-[50px] sm:left-[100px]"
              src={images || Image.src}
              alt={header + " Ostello "}
            />
          </>
        ) : usingFor === "examPage" ? (
          <img
            className=" rounded-full w-[368px]  h-[368px] md:w-[518px] md:h-[518px] absolute  z-10 "
            src={examExploreImage.src}
            alt={"Exams Ostello"}
          />
        ) : (
          <img
            className=" rounded-full sm:w-[368px]  sm:h-[368px] w-[290px] h-[290px] absolute  sm:top-[60px] top-[60px] z-10 left-[50px] sm:left-[100px]"
            src={images || Image.src}
            alt={header + " Ostello "}
          />
        )}
      </div>
      <div className="md:w-10/12 mr-auto">
        <h1 className="hidden text-4xl lg:block font-bold leading-[44px]">
          {header}{" "}
          {usingFor === "examPage" && (
            <span className="text-primary font-bold">Ostello</span>
          )}
        </h1>
        <div className="space-y-5 mt-10 text-lg">
          {usingFor === "mainLanding" ? (
            <>
              <p>
                Ostello is the world's first B2B marketplace for coaching
                institutions. It gives the institutions a platform to tell the
                students about their institute, facilities, faculty, and success
                stories. Every institute can stand among the best institutes in
                India and use Ostello's resources to grow its business.
              </p>
              <p>
                If you are a student, you just got lucky as Ostello lets you
                find the best coaching institutes near you. Compare and choose
                through location, demo classes, course fees, and discount
                offers, and select what’s best for you & make the right decision
                for your career. It's time to OWN YOUR CAREER!
              </p>
            </>
          ) : usingFor === "examPage" ? (
            <>
              <p>
                Ostello provides you a 360 degree approach to the Syllabus,
                covering every aspect of the paper with guidance from some of
                the most renowned names in academia and education.
              </p>
              <p>
                With Ostello as your mentor, we guarantee you a fruitful
                learning experience that you will always look back to with
                fondness and regard and an opportunity to be able to crack CUET
                with flying colors!
              </p>
            </>
          ) : (
            Array.isArray(descriptions) &&
            descriptions.map((item, idx) => (
              <p className="" key={idx}>
                {item}
              </p>
            ))
          )}

          <button
            onClick={() => {
              let currentTime = moment().format();
              let previousTime = moment(knowInstitute?.timeStamps);
              let diff = moment(currentTime).diff(previousTime, "seconds");
              const data = {
                activity_type: "know_institute",
                payload: {
                  instituteid: currentInstitute?.id,
                  ipaddress: ipAddress,
                  institute_name: currentInstitute?.name,
                },
              };
              if (isAuthenticated) {
                data.payload.userid = userData?.id;
                data.payload.user_name = userData?.name;
              }
              if (userLocation?.latitude !== "") {
                data.location = {
                  longitude: userLocation?.longitude?.toString(),
                  latitude: userLocation?.latitude?.toString(),
                };
              } else {
                data.location = null;
              }
              if (knowInstitute?.instituteId === id && diff > 10) {
                dispatch(postUserAnalytics(data));
                dispatch(
                  setKnowInstitute({
                    instituteId: currentInstitute?.id,
                    timeStamps: currentTime,
                  })
                );
              } else {
                dispatch(postUserAnalytics(data));
                dispatch(
                  setKnowInstitute({
                    instituteId: currentInstitute?.id,
                    timeStamps: currentTime,
                  })
                );
              }
              router.push("/about-us");
            }}
            className="px-3 py-2 bg-black text-white rounded"
          >
            Know More
          </button>
        </div>
        <Adsense
          client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          slot="3223821993"
          style={{ display: "block", marginTop: "10px" }}
          layout="in-article"
          format="fluid"
        />
      </div>
    </section>
  );
}
