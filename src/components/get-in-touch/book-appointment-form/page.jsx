"use client";
import React, { useState } from "react";
import Image from "next/image";
// import GoogleMap from "../google-map/page";
import MapComponent from "../google-map/page";
import AppointmentForm from "../appointment-form/page";
import { underlineimg } from "../../../components/element/images";

const BookAppointmentForm = () => {



  return (
    <div className="">
      {/* bg-gradient-to-b from-cyan-50 via-slate-50 to-white-50  */}
      <div className="w-full  sm:pt-6 md:pt-8  lg:pt-16 ">
        <div className="main-container">
          <div className="container">

            {/* left and right hand side view */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-8">
              <div className="w-full flex flex-col  justify-start">
                <div className="w-full text-left">
                  <div className="relative inline-block  sm:px-10">
                    <h1 className="text-left  relative font-semibold text-[var(--midnight)] text-3xl">
                      Get In Touch With Us

                    </h1>
                    {/* <Image
                      src={underlineimg.underline}
                      alt="not found"
                      width="100%"
                      height="100%"
                      className="absolute left-1/2 bottom-[-4px] sm:bottom-[-8px] md:bottom-[-8px] lg:bottom-[-16px]  transform -translate-x-1/2 w-[250px] sm:w-[250px] md:w-[300px] lg:w-[440px]"
                    /> */}
                  </div>
                  <p className="text-[var(--greyP)] paragraph w-full sm:max-w-[100%] md:max-w-[100%] lg:max-w-[100%] px-10 py-3 sm:py-3   md:px-10 md:py-5">Let’s hear from you—whether you have a question about fertility support, want to schedule a consultation, or need expert guidance on reproductive health.</p>
                </div>
                <MapComponent />
              </div>
              {/* booking form  */}
              <div className="w-full pt-10 sm:pt-10 md:pt-0 lg:pt-0 pb-5 ">
                <AppointmentForm />
              </div>

            </div>
            {/* FAQ section */}
            {/* <div className="pt-10 w-full">
      <FrequeentlyAskQuestion/>
      </div> */}
          </div>
        </div>

      </div>
    </div>
  )
}

export default BookAppointmentForm