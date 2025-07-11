import React from "react";
import Image from "next/image";
import { bannerimages } from "../element/images";

const HealthAdvice = () => {
  return (
    <div className="w-full px-6 sm:px-10 md:px-14 lg:px-14 ">
      <div className="w-full pt-10 bg-[var(--White)]  flex justify-between items-center shadow-lg rounded-md p-10 pb-0  mt-5 sm:max-h-[200px] md:max-h-[350px]">
        {/* Left Content */}
        <div className="flex flex-col justify-start items-start ">
          <h1 className="text-[var(--midnight)] capitalize healthheading  text-start">
            Don’t Let Your Health <br/> Take a Backseat!
          </h1>
          <p className="text-[var(--greyP)] text-start paragraph w-[80%] mt-4">
            Schedule an appointment with one of our experienced medical
            professionals today!
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-end items-end">
            <Image
              src={bannerimages.healthadvicedoctor}
              alt="not found"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default HealthAdvice;
