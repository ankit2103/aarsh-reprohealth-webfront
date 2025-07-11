"use client";

import { useEffect, useState } from "react";

const SpecialistClinicInfo = ({ clinicInfo, loading }) => {
  function stripHtml(htmlString) {
    if (!htmlString) return ""; // fallback for undefined/null
    return htmlString.replace(/<[^>]*>/g, "");
  }
  // console.log("SpecialistClinicInfo-------------------",clinicInfo, clinicInfo?.serviceDetails, loading);

  return (
    <>
      <div className="flex-1 text-center lg:text-left p-4">
        {loading ? (
          <>
           <div>
          <div className="flex flex-col lg:flex-row lg:justify-between mt-1 animate-pulse">
            <h3 className="text-xl font-bold text-gray-300 bg-gray-300 w-24 h-6 rounded"></h3>
          </div>

          <div className="my-3 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          <div className="flex-1 text-center lg:text-left mt-3">
            <div className="pb-2 space-y-2">
              <div className="h-5 bg-gray-300 rounded w-48"></div>
              <div className="h-5 bg-gray-300 rounded w-40"></div>
            </div>

            <h3 className="text-xl font-bold text-gray-300 bg-gray-300 w-40 h-6 rounded mt-1"></h3>

            <div className="flex mt-3 flex-col md:flex-row justify-between">
              <div className="flex flex-col space-y-2 mt-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-4 bg-gray-300 rounded w-56"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
          </>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row lg:justify-between ">
              <h3 className="text-xl  text-[var(--listText)] capitalize">About</h3>
            </div>
            <p className="my-3">{stripHtml(clinicInfo?.description)}</p>
            {/* <h4 className="my-3">Apollo Hospitals Indore, also known as Rajshree Apollo Hospitals, is a leading healthcare facility located in the Vijay Nagar area of Indore, Madhya Pradesh. Established as a joint venture between Apollo Hospitals Enterprise Limited and Rajshree Hospital & Research Centre Pvt. Ltd., the hospital offers a comprehensive range of medical services and specialties.</h4> */}
            <div className="flex-1 text-center lg:text-left">
              <div className="pb-2">
                <h3 className="text-lg text-[var(--listText)]  mt-2">
                  Opening:{" "}
                  <span className="text-sm font-light">
                    {" "}
                    {clinicInfo?.operatingHours?.openingTime} -{" "}
                    {clinicInfo?.operatingHours?.closingTime}
                  </span>
                </h3>
                <h3 className="text-lg text-[var(--listText)] mt-2">
                  From:{" "}
                  <span className="text-sm font-light">
                    {" "}
                    {clinicInfo?.operatingHours?.startDay} -{" "}
                    {clinicInfo?.operatingHours?.endDay}
                  </span>
                </h3>
              </div>
             

              <div className="flex flex-col md:flex-row ">
                <div className="flex  flex-col">
                <h3 className="text-lg text-[var(--listText)]  mt-2">Services</h3>
                  <div className="flex flex-row flex-wrap gap-2  text-gray-700 mt-2">
                    {clinicInfo?.serviceDetails?.length > 0 &&
                      clinicInfo?.serviceDetails.map((item, index) => {
                        return (
                          <button key={item.serviceName?._id|| index} className="border border-[var(--lightBlue)] text-[var(--lightBlue)] bg-[var(--White)] px-4 py-2 rounded-md hover:bg-[var(--lightBlue)] hover:text-[var(--White)]">
                            {item.serviceName?.name}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SpecialistClinicInfo;
