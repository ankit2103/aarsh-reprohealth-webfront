"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  underlineimg,
  latesttechimg,
} from "../../../components/element/images";

const techpara = `Thanks to major technological advancements, Aarsh ReproHealth allows treating the most complex cases with less time and more efficiency.`;
const abouttech = [
  `Gynecology and obstetrics focus on women's reproductive health. Gynecology deals with conditions like menstrual disorders, infections, and hormonal imbalances, along with preventive care such as cancer screenings and contraception guidance.`,
  `Obstetrics specializes in pregnancy, childbirth, and postpartum care, ensuring the health of both mother and baby. Obstetricians manage fetal development, high-risk pregnancies, and complications while assisting in safe deliveries.`,
  `Together, these fields provide comprehensive care from adolescence to menopause. Many doctors practice both, offering services like prenatal care, fertility treatments, and menopause management to improve women's health.`,
];

const LatestTechnology = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full ">
      <div className="main-container">
        <div className="container">
          {/* {loading ? (
            <>
              <div className="flex flex-col justify-center items-center text-center animate-pulse">
                <div className="relative inline-block">
                  <div className="h-10 w-60 bg-gray-300 rounded mx-auto mb-2" />
                  <div className="absolute left-2/3 bottom-[-5px] transform -translate-x-1/2 w-[120px] sm:w-[140px] md:w-[150px] lg:w-[200px] h-[10px] bg-gray-200 rounded" />
                </div>
                <div className="mt-4 w-full sm:max-w-[100%] md:max-w-[80%] lg:max-w-[60%] space-y-2 px-4">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                 
                </div>
              </div>

              <div className="w-full flex flex-col sm:flex-col md:flex-row lg:flex-row pt-10 animate-pulse ">
                <div className="w-full flex justify-center md:justify-start">
                  <div className="w-[80%] h-[350px] bg-gray-300 rounded-lg" />
                </div>

               <div className="w-[100%] flex flex-col">
               <div className="flex flex-col gap-2 text-center sm:text-center md:text-start lg:text-start w-full mt-4">
                  <div className="h-6 w-56 bg-gray-300 rounded mx-auto md:mx-0" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-[95%] bg-gray-200 rounded" />
                    <div className="h-4 w-[85%] bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-center md:text-start lg:text-start w-full mt-2">
                  <div className="h-6 w-56 bg-gray-300 rounded mx-auto md:mx-0" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-[95%] bg-gray-200 rounded" />
                    <div className="h-4 w-[85%] bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-center md:text-start lg:text-start w-full mt-2">
                  <div className="h-6 w-56 bg-gray-300 rounded mx-auto md:mx-0" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-[95%] bg-gray-200 rounded" />
                    <div className="h-4 w-[85%] bg-gray-200 rounded" />
                  </div>
                </div>
               </div>
              </div>
            </>
          ) : ( */}
          <>
            <div className="flex flex-col justify-center items-center text-center">
              <div className="relative inline-block mb-6">
                <h1 className="font-bold heading capitalize text-4xl text-[var(--midnight)] w-full sm:max-w-[100%]  md:max-w-[100%] lg:max-[100%] px-0 sm:px-0 md:px-10 lg:px-10">
                  Latest Technology
                </h1>
                <Image
                  src={underlineimg.underline}
                  alt="not found"
                  width="100%"
                  height="100%"
                  className="absolute  left-2/3  bottom-[-2px]  sm:bottom-[-2px] md:bottom-[-7px] lg:bottom-[-5px]  transform -translate-x-1/2 w-[120px] sm:w-[140px] md:w-[150px] lg:w-[200px]"
                />
              </div>
              <p className="fontsizebase text-[var(--greyP)] text-center    w-full sm:max-w-[100%] md:max-w-[80%] lg:max-w-[60%] px-0 sm:py-3  sm:px-0  md:py-4">
                {techpara}
              </p>
            </div>
            <div className="w-[100%]  flex  justify-between md:items-center  flex-col sm:flex-col md:flex-row lg:flex-row pt-8">
              <div className="w-[100%] flex justify-center md:justify-between lg:justify-between px-8 md:px-0 mb-6 md:mb-0">
                <Image
                  src={latesttechimg.latesttech}
                  alt="drBrent"
                  width="100%"
                  height="100%"
                  className=""
                />
              </div>

              <div className="flex flex-col gap-4 md:pl-5 text-center sm:text-center md:text-start lg:text-start px-6 md:px-0">
                <h1 className="text-[var(--midnight)] capitalize subheading sm:mt-8 md:mt-0">
                  Gynecology & Obstetrics
                </h1>
                {
                  abouttech.map((item, index) => (
                    <p
                      key={index}
                      className="fontsizesm sm:fontsizebase text-[var(--greyP)]   "
                    >
                      {item}
                    </p>
                  ))
                  // text-sm md:text-xl lg:text-xl xl:text-xl
                }
              </div>
            </div>
          </>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default LatestTechnology;
