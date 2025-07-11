"use client";
import React, { useEffect, useState } from "react";
import { TiStar } from "react-icons/ti";
import Image from "next/image";
import Rating from "../../../public/assets/images/svg/Rating";
import { specialdoctorimages } from "../element/images";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";

import {
  getCurrentLatitudeLongitude,
  getCityFromCoordinates,
} from "../../utils/geolocation";
import {
  fetchDoctorOnlineConsultationSlots,
  fetchDoctors,
} from "../../utils/doctor/doctor.util";
import { IoIosHeart } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import Head from "next/head";

const DoctorCardSkeleton = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col  ">
        <button className="text-[var(--lightBlue)] bg-[var(--athensGray)] px-6 py-2 rounded-full fontsizebase">
          {/* text-xl */}
          Our Doctor's
        </button>
        <div className="w-full md:w-[60%] flex justify-center items-center flex-col gap-2 mt-4">
          <h2 className="heading capitalize ">our special doctors</h2>
          <p className="text-[var(--greyP)] text-center ">
            {/* text-sm md:text-xl lg:text-xl xl:text-xl */}
            {doctorsdDetail}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6 mt-12">
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className="border-[var(--ebb)]">
            <div className="py-4 px-4 border rounded-lg shadow-md shadow-grey-300 animate-pulse">
              {/* Image Placeholder */}
              <div className="bg-[var(--zircon)] rounded-lg flex justify-center items-center w-full h-[300px]">
                <div className="bg-gray-300 w-[180px] md:w-[300px] sm:w-[350px] lg:w-[300px] lg:h-[280px] rounded-md"></div>
              </div>

              <div className="flex flex-col mt-5 gap-2">
                {/* Name */}
                <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>

                {/* Rating */}
                <div className="flex justify-between items-center mt-2">
                  <div className="w-2/3 h-3 bg-gray-300 rounded-md"></div>
                  {/* <div className="w-10 h-6 bg-gray-300 rounded-lg"></div> */}
                </div>

                {/* Reviews */}
                <div className="w-2/3 h-3 bg-gray-300 rounded-md"></div>

                {/* Location */}
                <div className="w-2/3 h-3 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const doctorsdDetail =
  "Our team of specialists is at the forefront of medical innovation. Each specialist brings a unique blend of expertise, empathy, and experience to ensure that your health is in the best hands:";

const SpecialDoctors = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [getData, setGetData] = useState([]);
  const [getSlots, setGetSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isAuthenticated = useAuthenticated();
  const selectedData =
    Array.isArray(getData[5]) && getData[5].length > 0
      ? getData[5]
      : Array.isArray(getData[10]) && getData[10].length > 0
        ? getData[10]
        : Array.isArray(getData[15]) && getData[15].length > 0
          ? getData[15]
          : [];
  console.log("isAuthenticated-------------------", selectedData);

  const handleNavigate = (itemID) => {
    // if(isAuthenticated)
    router.push(`/medical-specialist/${itemID}`);
    // else
    //   router.push('/login');  
  };
  // Get doctor list
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const lat = location?.lat;
        const lng = location?.lng;

        const result = await fetchDoctors({ lat, lng });
        console.log("Result of get all Doctor: ", result);
        if (result?.code === 200) {
          const selectedData =
            Array.isArray(result?.data[5]) && result?.data[5].length > 0
              ? result?.data[5]
              : Array.isArray(result?.data[10]) && result?.data[10].length > 0
                ? result?.data[10]
                : Array.isArray(result?.data[15]) && result?.data[15].length > 0
                  ? result?.data[15]
                  : [];
          setGetData(selectedData || []);
          setGetSlots(result?.data?.slots || []);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getDoctors();
  }, [location]);

  return (

    <>
      <Head>
        <title>our special doctors | Aarsh Reprohealth</title>
        <meta
          name="description"
          content="Our team of specialists is at the forefront of medical innovation. Each specialist brings a unique blend of expertise, empathy, and experience to ensure that your health is in the best hands."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.aarshreprohealth.com/medical-specialist" />
        {Array.isArray(getData) && getData.length > 0 && getData.filter((doctor) => doctor.isSpecialDoctor === true).map((doc) => (
          <script
            key={doc?._id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Physician",
                "name": `Dr. ${doc?.name}`,
                "image": doc?.profilePic,
                "description": `Expert in ${doc?.specialization.join(", ")}, ${doc?.experience || "Experienced"}.`,
                "medicalSpecialty": doc?.specialization,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": doc?.clinic?.[0]?.city || "Bangalore",
                  "addressRegion": doc?.clinic?.[0]?.state || "Karnataka",
                  "postalCode": doc?.clinic?.[0]?.pincode || "560034",
                  "addressCountry": "IN"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": doc?.averageRating || "4",
                  "reviewCount": doc?.totalReviews || "1"
                }
              })
            }}
          />
        ))}

      </Head>
      <div className="w-full ">
        <div className="main-container">
          <div className="container">
            {/* grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-3  */}
            {/* <div className="container"> */}
            {loading ? (
              <DoctorCardSkeleton />
            ) : (
              <>
                {Array.isArray(getData) && getData.length > 0 && (
                  <>
                    <div className="w-full flex justify-center items-center flex-col">
                      <button className="text-[var(--lightBlue)] bg-[var(--athensGray)] px-6 py-2 rounded-full fontsizebase">
                        Our Doctor's
                      </button>
                      <div className="w-full md:w-[100%] lg:w-[60%] flex justify-center items-center flex-col gap-2 mt-4">
                        <h2 className="heading capitalize">
                          our special doctors
                        </h2>
                        <p className="text-[var(--greyP)] text-center">
                          {doctorsdDetail}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6 mt-12">
                      {getData
                        .filter((doctor) => doctor.isSpecialDoctor === true)
                        .slice(-3)
                        .map((doctor) => (
                          <div
                            key={doctor?._id}
                            onClick={() => handleNavigate(doctor?._id)}
                            className="border-[var(--ebb)] cursor-pointer "
                          >
                            <div className="py-4 px-4 border  md:min-h-[390px] md:max-h-[430px]  lg:min-h-[430px] lg:max-h-[430px] rounded-lg shadow-md shadow-grey-300">
                              <div className="bg-[var(--zircon)] rounded-lg flex justify-center items-center w-full lg:max-h-[300px] overflow-hidden">
                                {doctor?.profilePic ? (
                                  <Image
                                    src={doctor.profilePic}
                                    alt="doctor profile"
                                    width={300}
                                    height={200}
                                    className="w-[180px] sm:w-[280px] md:w-[300px] lg:w-[280px] max-h-[280px] object-contain"
                                    style={{ maxHeight: "280px" }}
                                  />
                                ) : (
                                  <div className="flex justify-center items-center w-[180px] sm:w-[280px] md:w-[300px] lg:w-[280px] h-[250px] sm:h-[280px] md:h-[280px] lg:h-[280px]">
                                    <div className="w-32 h-32 rounded-full flex justify-center items-center bg-blue-100">
                                      <FaUserDoctor className="w-16 h-16 text-blue-400" />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col mt-5">
                                <div className="w-full flex justify-between">
                                  <div className="flex flex-col text-left">
                                    <h3 className="capitalize text-[var(--cloudBurst)] font-medium sm:text-sm md:text-md lg:text-xl">
                                      Dr.{" "}
                                      {doctor?.name || "Dr. Namratha Sreenath"}
                                    </h3>
                                    {doctor?.specialization?.length > 0 &&
                                      // doctor.specialization
                                      // .slice(0, 3)
                                      // .map((item, index) => (
                                      <span
                                        // key={index}
                                        className="text-left rounded-md text-[var(--lightBlue)] text-sm md:text-md lg:text-md"
                                      >
                                        {doctor.specialization.join(', ')}
                                      </span>
                                      // ))
                                    }
                                  </div>
                                  {/* <button className="flex flex-row justify-center items-center bg-[#ff2f001f] rounded-lg px-2 py-1 w-16 h-8 my-2">
                                  <IoIosHeart className="text-[var(--red)] text-xl" />
                                  <p className="block font-sans antialiased font-medium leading-relaxed text-[var(--black)] text-sm">
                                    4.2
                                  </p>
                                </button> */}
                                </div>
                                <p className="text-[var(--black)] fontsizebase font-[400] py-1">
                                  Total Experience-{" "}
                                  {doctor?.experience
                                    ? doctor.experience
                                      .toLowerCase()
                                      .includes("year")
                                      ? doctor.experience
                                      : `${doctor.experience.slice(0, 20)} yrs`
                                    : "No experience info"}{" "}
                                </p>
                                {/* <p className="text-[var(--stormGray)] text-xs lg:text-sm">
                                Namratha Hospital, Bangalore
                              </p> */}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </>
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>

  );
};

export default SpecialDoctors;
