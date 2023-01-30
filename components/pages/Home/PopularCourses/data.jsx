import React from "react";
import CourseCard from "./CourseCard";
import UiUx from "../../../assets/courses_institutions/popular-courses/UI-UX.svg";

const CardData = [
  {
    id: 1,
    src: UiUx,
    academy: "XYZ Academy",
    title: "UX Design Program",
    duration: "3 months",
    studentnumber: "80",
    EMi: "Available",
    price: "599",
    discount: "1500",
    rate: "3.0",
    detailsLink: "/",

    ratingCount: "(22,400)",
  },
  {
    id: 2,
    src: UiUx,
    academy: "XYZ Academy",
    title: "UX Design Program",
    duration: "3 months",
    studentnumber: "80+ Students joined recently",
    EMi: "EMI Available",
    price: "Rs. 599",
    discount: "Rs. 1500",
    rate: "3.0",
    detailsLink: "/",

    ratenumber: "(22,400)",
  },
  {
    id: 3,
    src: UiUx,
    academy: "XYZ Academy",
    title: "UX Design Program",
    duration: "3 months",
    studentnumber: "80+ Students joined recently",
    EMi: "EMI Available",
    price: "Rs. 599",
    discount: "Rs. 1500",
    rate: "3.0",
    detailsLink: "/",

    ratenumber: "(22,400)",
  },
  {
    id: 4,
    src: UiUx,
    academy: "XYZ Academy",
    title: "UX Design Program",
    duration: "3 months",
    studentnumber: "80+ Students joined recently",
    EMi: "EMI Available",
    price: "Rs. 599",
    discount: "Rs. 1500",
    rate: "3.0",
    detailsLink: "/",

    ratenumber: "(22,400)",
  },
  {
    id: 5,
    src: UiUx,
    academy: "XYZ Academy",
    title: "UX Design Program",
    duration: "3 months",
    studentnumber: "80+ Students joined recently",
    EMi: "EMI Available",
    price: "Rs. 599",
    discount: "Rs. 1500",
    rate: "3.0",
    detailsLink: "/",

    ratenumber: "(22,400)",
  },
  {
    id: 6,
    src: UiUx,
    academy: "XYZ Academy",
    title: "UX Design Program",
    duration: "3 months",
    studentnumber: "80+ Students joined recently",
    EMi: "EMI Available",
    price: "Rs. 599",
    discount: "Rs. 1500",
    rate: "3.0",
    detailsLink: "/",

    ratenumber: "(22,400)",
  },
];

const {
  id,
  src,
  academy,
  title,
  duration,
  studentnumber,
  Emi,
  price,
  discount,
  rate,
  detailsLink,
  ratenumber,
} = CardData[0];

export const DemoCard = () => {
  return (
    <>
      <CourseCard
        id={id}
        images={[src]}
        name={title}
        instituteName={academy}
        duration={duration}
        studentEnrolled={studentnumber}
        emi={Emi}
        effectivePrice={price}
        grossPrice={discount}
        rating={rate}
        ratingCount={ratenumber}
        detailsLink={detailsLink}
      />
    </>
  );
};

export default CardData;
