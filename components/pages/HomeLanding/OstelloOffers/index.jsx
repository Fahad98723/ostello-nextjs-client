import React from "react";
import InstituteDisplayCard from "./InstituteDisplayCard";
import ListingCard from "./ListingCard";
import TwoColCard from "./TwoColCard";
import TwoRowCard from "./TwoRowCard";

export default function OstelloOffers() {
  return (
    <section className=" mx-auto px-10 p-5 lg:px-16 my-10 space-y-10  max-w-6xl ">
      <div className="  w-full lg:ml-10">
        <div className=" my-5">
          <p className="lg:text-4xl text-2xl font-bold my-5">
            From Academics to IIT we have it all. <br /> Choose your future in
            the best way today.
          </p>
          <p className="lg:text-xl mb-16">
            Ostello has over a 1000+ institutions varying courses from Academics
            to Competitive exams.
          </p>
        </div>

        <div className="hidden    lg:flex  text-white  ">
          <TwoRowCard />
          <div className="flex flex-col ml-5  space-y-5">
            <div className="flex justify-between   ">
              <InstituteDisplayCard />
              <ListingCard />
            </div>
            <TwoColCard />
          </div>
        </div>

        <div className="lg:hidden w-full mx-auto space-y-5">
          <TwoRowCard />
          <InstituteDisplayCard />
          <ListingCard />
          <TwoColCard />
        </div>
      </div>
    </section>
  );
}
