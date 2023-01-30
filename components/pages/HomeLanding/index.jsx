import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../../../redux/slices/UserAnalytics";
import dynamic from "next/dynamic";
import Header from "./Header";
import Footer from "../../layout/Footer";
import Navbar from "./Header/Navbar";
import InstituteSection from "./InstituteSection";
import { setLocationQuery } from "../../../redux/slices/SearchSlice";
import RegisterForm from "../RegisterTution/RegisterForm";
import Banner from "../RegisterTution/Banner";
import { authSelector } from "../../../redux/slices/authSlice";
const OstelloConnect = dynamic(
  () => {
    return import("./OstelloConnect");
  },
  { ssr: false }
);
const OstelloOffers = dynamic(
  () => {
    return import("./OstelloOffers");
  },
  { ssr: false }
);
const OstelloStatistics = dynamic(
  () => {
    return import("./OstelloStatistics");
  },
  { ssr: false }
);
const OstelloExplore = dynamic(
  () => {
    return import("./OstelloExpore");
  },
  { ssr: false }
);
const OstelloWorkshop = dynamic(
  () => {
    return import("./OstelloWorkshop");
  },
  { ssr: false }
);
const OstelloReviews = dynamic(
  () => {
    return import("./OstelloReviews");
  },
  { ssr: false }
);
const OstelloFAQ = dynamic(
  () => {
    return import("./OstelloFAQ");
  },
  { ssr: false }
);
const OstelloSubscribe = dynamic(
  () => {
    return import("./OstelloSubscribe");
  },
  { ssr: false }
);

export default function HomeLanding() {
  const description = "Ostello ";
  const dispatch = useDispatch();
  const {isAuthenticated } = useSelector(authSelector)
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
    dispatch(setLocationQuery(""));
    console.log("ravi");
  });

  return (
    <main className="md:max-w-[1350px] mx-auto ">
      <div className="fixed  bg-white z-50 top-0 md:max-w-[1350px] w-full mx-auto  shadow">
        <Navbar />
      </div>
      <Header />
      <OstelloConnect />
      <OstelloOffers />
      <OstelloStatistics />
      <InstituteSection />
      <OstelloExplore
        header={"Explore the world of Ostello with us"}
        description={description}
        usingFor={"mainLanding"}
      />
      <OstelloWorkshop />
      <OstelloReviews />
      <OstelloFAQ usingFor={"userLanding"} />
      {
        !isAuthenticated ?
        <Banner /> : ''
      }
      {/* <RegisterForm />
      <OstelloSubscribe /> */}
      <Footer />
    </main>
  );
}
