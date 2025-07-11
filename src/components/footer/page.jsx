"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { footerimages, logoimg } from "../element/images";

const about =
  "Aarsh ReproHealth simplifies healthcare with an easy-to-use platform for booking appointments, telehealth services, and managing patient records.";
const specialization = [
  "Endometriosis",
  "Gynecology & Obstetrics",
  "Andrology",
  "Urology",
  "Endocrinology",
  "Psychiatry & Counsellors",
];
const doctor = [
  { id: 1, name: "Medical Specialist", path: "/medical-specialist" },
  { id: 2, name: "Speciality Clinics", path: "/speciality-clinics" },
  {
    id: 3,
    name: "Diagnoistic Center & Laboratories",
    path: "/diagnoistic-center-laboratories",
  },
];
const quicklink = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About Us", path: "/about" },
  { id: 3, name: "Contact Us", path: "/contact-us" },
  // { id: 4, name: "Community Involvement", path: "/community" },
  { id: 5, name: "Partners & Sponsors", path: "/partnership-and-sponsors" },
  { id: 6, name: "Corporate Reproductive Health Drives", path: "/corporate-camps" },
  { id: 7, name: "FAQs", path: "/frequently-asked-question" },
  { id: 8, name: "Pricing plans",  path: "/package/reprohealth-package" },
];
const policies = [
  { id: 1, path: "/privacy-policy", name: "Privacy Policies" },
  { id: 2, path: "/terms-and-conditions", name: "Terms and Conditions" },
  { id: 3, path: "/refund-policy", name: "Refund Policy" },
  { id: 4, path: "/cancellation-policy", name: "Cancellation Policy" },
];

// 'Top-Rated Doctors', 'Appointment Scheduling', 'Patient Reviews', 'Doctor Profiles'
const aboutUs = [
  "Our Story",
  "Privacy & Policy",
  "Community Involvment",
  "FAQ",
];
const contactUs = [
  "Partners & Sponors",
  "Corporate Events",
  "preetam@aarshreprohealth.com",
  "+91 9845366900",
  "AG04, Casagrand Lorenza, Bellahalli Village, Yelahanka Hobli, Bangalore-560064, Karnataka, India.",
];
const icons = [
  {
    id: 1,
    src: footerimages.fbimg,
    link: "",
    icon: footerimages.fbImg,
  },
  {
    id: 2,
    src: footerimages.instaimg,
    link: "https://www.instagram.com/aarshreprohealth?igsh=YzljYTk1ODg3Zg==",
    icon: footerimages.instaImg,
  },
  // {
  //   id: 3,
  //   src: footerimages.twitterimg,
  //   link: "",
  //   icon: footerimages.twitterImg,
  // },
  {
    id: 4,
    src: footerimages.linkedinimg,
    link: "https://www.linkedin.com/company/aarsh-reprohealth/",
    icon: footerimages.linkedinImg,
  },
];

export default function Footer() {
  const router = useRouter();
  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="w-full bg-gray-100 ">
      <div className="main-container">
        <div className="">
          <div className="w-full flex flex-col sm:flex-col md:flex-col lg:flex-row gap-5 break-words px-10 sm:px-10 md:px-10 md:py-10 ">
            {/* py-6 px-4 sm:px-3 sm:py-8 md:px-10 md:py-10 */}
            {/* grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 gap-5  */}
            <div className="md:w-full lg:w-[40%]">
              {/*  pr-6  */}
              {/* Logo */}
              <div
                className="my-2 sm:my-0 w-full sm:py-6 md:py-2 lg:py-0"
                //  mt-10 sm:mt-0 md:mt-0  sm:py-3
                onClick={() => router.push("/")}
              >
                <Image
                  src={logoimg.logo}
                  alt="logo"
                  width={"auto"}
                  height={"auto"}
                  className="w-[180px] md:w-[250px]"
                />
              </div>
              {/* [var(--Iron)] */}
              <div className="text-black text-left  lg:py-3 fontsizebase">
                {/* lg  sm:lg md:lg lg:lg*/}
                {about}
              </div>
                <div className="hidden md:hidden  lg:flex justify-start items-center gap-3  w-full mt-1 md:mt-4 ">
                {icons.map((item, index) => {
                  return (
                    <Link
                      href={item?.link || "#"}
                      key={item?.id || index}
                      legacyBehavior
                    >
                      <a target="_blank" rel="noopener noreferrer">
                        <div className="w-30 h-30 p-2 sm:p-1 md:p-2 bg-[var(--doveGray)] shadow-sm rounded-full text-[var(--White)] text-xl">
                          {item?.icon}
                        </div>
                      </a>
                    </Link>
                    
                  );
                })}
               
              </div>
              <div
                className="hidden md:hidden  lg:block w-full mt-5 "
                onClick={() => router.push("/")}
              >
                <Image
                  src={logoimg.startupLogoImg}
                  alt="logo"
                  width={"auto"}
                  height={"auto"}
                  className="w-[180px] md:w-[200px]"
                />
              </div>
              
            </div>
           <div className="w-full md:w-full lg:w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
             <div className="">
              {/* pr-6 sm:py-3 lg:py-9 */}
              <h3 className="text-black font-semibold sm:font-semibold fontsizebase sm:py-6 md:py-4 lg:py-5 ">
                Quick Links
              </h3>
              {quicklink.map((item) => (
                <p
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className="text-black fontsizesm  py-1 md:py-1 cursor-pointer "
                >
                  {item.name}
                </p>
              ))}
            </div>
            <div className="">
              <h3 className="text-black font-semibold sm:font-semibold fontsizebase sm:py-3 md:py-1 lg:py-5 ">
                Areas of Specialization
              </h3>
              {specialization.map((item) => (
                <p
                  key={item}
                  className="text-black fontsizesm py-1 md:py-1   cursor-pointer "
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="">
              <p className="text-black font-semibold sm:font-semibold fontsizebase sm:py-3 md:py-1 lg:py-5">
                Appointments For{" "}
              </p>
              {doctor.map((item) => (
                <p
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className="text-black fontsizesm  py-1 md:py-1 cursor-pointer"
                >
                  {item.name}
                </p>
              ))}
            </div>
            <div className="">
              <h3 className="text-black font-semibold sm:font-semibold fontsizebase sm:py-3 md:py-1 lg:py-5 ">
                Policies{" "}
              </h3>
              {policies.map((item) => (
                <p
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className="text-black fontsizesm  py-1 md:py-1 cursor-pointer"
                >
                  {item.name}
                </p>
              ))}
            </div>
           </div>
          
          </div>
          {/* logo in mobile and tab view */}
           <div className="block md:block lg:hidden px-10 sm:px-10 md:px-10 md:pb-10">
            <div className="flex justify-start items-center gap-2  w-full mt-4 md:mt-4 ">
                {icons.map((item, index) => {
                  return (
                    <Link
                      href={item?.link || "#"}
                      key={item?.id || index}
                      legacyBehavior
                    >
                      <a target="_blank" rel="noopener noreferrer">
                        <div className="w-30 h-30 p-2 sm:p-1 md:p-2 bg-[var(--doveGray)] shadow-sm rounded-full text-[var(--White)] text-xl">
                          {item?.icon}
                        </div>
                      </a>
                    </Link>
                    
                  );
                })}
               
              </div>
              <div
                className=" w-full mt-5 mb-5"
                onClick={() => router.push("/")}
              >
                <Image
                  src={logoimg.startupLogoImg}
                  alt="logo"
                  width={"auto"}
                  height={"auto"}
                  className="w-[180px] md:w-[200px]"
                />
              </div>
           </div>
        </div>
      </div>
      <div className="bg-[var(--black)]  px-5 py-2  sm:px-3 sm:py-8 md:px-5 md:py-2">
        <div className="items-center">
          <p className="sm:fontsizebase fontsizebase text-center text-[var(--White)]">
            {/* sm:fontsizebase fontsizebase */}© Aarsh ReproHealth 2025. All
            Right Reserved.
          </p>
        </div>
        {/* <div className="text-[var(--White)] flex flex-row justify-start items-center gap-2   ">
          <div className="flex flex-row ">
            <IoLocationOutline />

            <p className="sm:tesxt-md tesxt-md">AG04, Casagrand Lorenza,Bellahalli Village,Yelahanka Hobli,Bangalore - 560064.

            </p>
          </div>
        </div>
        <div className="text-[var(--White)] flex flex-row justify-start items-center gap-2   ">
          <div className="flex flex-row ">
            <IoLocationOutline />

            <p className="sm:tesxt-md tesxt-md">preetam@aarshreprohealth.com</p>
          </div>
        </div>
        <div className="text-[var(--White)] flex flex-row justify-start items-center gap-2   ">
          <div className="flex flex-row px-1 gap-1">
            <FaPhoneSquareAlt />

            <p className="sm:tesxt-md tesxt-md">Connect on Whatsapp</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
