"use client";
import { useEffect, useState } from "react";
import { LuBadgeCheck } from "react-icons/lu";
import { booking } from "../../../components/element/images";
import { MdCurrencyRupee, MdThumbUp } from "react-icons/md";
import { IoCall, IoLocation, IoStar } from "react-icons/io5";
import { MdOutlineEventAvailable } from "react-icons/md";
import {
  FaCheckCircle,
  FaHandHoldingMedical,
  FaRegClock,
} from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { FaArrowLeft, FaArrowRight, FaThumbsUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { illustration } from "../../../components/element/images";
import Image from "next/image";
import ReferralModal from "../../element/popup-modal";

const itemsPerPage = 6;

const LabList = ({
  getData,
  setGetData,
  loading,
  setLoading,
  doctorList,
  setDoctorList,
  clinicList,
  setClinicList,
  location,
  setLocation,
  city,
  setCity,
}) => {
  console.log("getData--------------------------", doctorList);
  const selectedData =
    Array.isArray(getData[5]) && getData[5].length > 0
      ? getData[5]
      : Array.isArray(getData[10]) && getData[10].length > 0
      ? getData[10]
      : Array.isArray(getData[15]) && getData[15].length > 0
      ? getData[15]
      : [];
  const [currentLabId, setCurrentLabId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [tabOptions, setTabOptions] = useState(["Today", "Tomorrow", "Other"]);

  const router = useRouter();

  // Calculate total pages
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(getData.length / itemsPerPage);

  // const totalPages = Math.ceil(availablelabs?.length / itemsPerPage);
  const [DoctorVisibleCount, setDoctorVisibleCount] = useState(5);
  const [clinicVisibleCount, setClinicVisibleCount] = useState(5);
  const [isPopupShow, setIsPopupShow] = useState(false);

const handleShowPopup = () => {
  setIsPopupShow((prev) => !prev); // toggles between true/false
};

  const handleClinicShowMore = () => {
    setClinicVisibleCount((prev) => prev + 3);
  };
  const handleClinicShowLess = () => {
    setClinicVisibleCount(5);
  };
  const handleDoctorShowMore = () => {
    setDoctorVisibleCount((prev) => prev + 3);
  };
  const handleDoctorShowLess = () => {
    setDoctorVisibleCount(5);
  };

  const paginatedLabs = getData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    // Remove duplicates while preserving order
    return [...new Set(pages)];
  };

  const handleSelectedLabId = (labId) => {
    setCurrentLabId(labId);
    router.push(`/diagnoistic-center-laboratories/${labId}`);
  };

  // useEffect(() => {
  //   setAvailablelabs(getData);
  // }, [getData]);

  const availableDays = selectedDoctor
    ? selectedDoctor.slots
        .filter((slot) => slot.totalSlotsAvailable > 0)
        .map((slot) => slot.day)
    : [];
  useEffect(() => {
    if (selectedDoctor) {
      setTabOptions([
        "Today",
        "Tomorrow",
        availableDays.length > 0 ? availableDays[0] : "Other",
      ]);
    }
  }, [selectedDoctorId, getData]);

  return (
    <div className="w-full  lg:mt-[7rem]">
      <div className="main-container">
        <div className="container">
          <div className="pt-0 md:pt-56 lg:pt-10 ">
            {Array.isArray(getData) && (
              <p className="fontsize2xl">
                {getData.length} labs available{" "}
                {city?.sublocality
                  ? `in ${city?.sublocality}`
                  : "across all locations"}
              </p>
            )}
            <div className="text-sm md:text-2xl flex items-center  gap:2 md:gap-3 text-[var(--greyP)]">
              <LuBadgeCheck className="text-2xl text-[var(--black)] mr-3 md:mr-0" />
              <p className="fontsizebase">
                Book appointments with minimum wait-time & verified lab details
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row  gap-4 py-4">
            {loading ? (
              <div className="w-full  md:w-2/3  rounded-lg py-4 ">
                <div className="grid grid-cols-1 md:w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="border-2 flex flex-col justify-start gap-3 rounded-md px-3 py-3 md:px-2 md:py-2 lg:px-3 lg:py-4 animate-pulse bg-white"
                    >
                      {/* Title */}
                      <div className="h-5 w-1/2 bg-gray-300 rounded" />
                      <hr />

                      {/* Location */}
                      <div className="flex items-center gap-2 py-2">
                        <div className="w-5 h-5 bg-gray-300 rounded-full" />
                        <div className="h-4 w-3/4 bg-gray-300 rounded" />
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-3 my-3">
                        <div className="h-6 w-24 bg-gray-300 rounded-full" />
                        <div className="h-6 w-32 bg-gray-300 rounded-full" />
                      </div>

                      {/* Timing */}
                      <div className="h-4 w-1/2 bg-gray-300 rounded" />
                      <div className="h-4 w-2/3 bg-gray-300 rounded" />
                      <div className="h-4 w-1/3 bg-gray-300 rounded" />

                      {/* Availability */}
                      <div className="flex gap-3">
                        <div className="h-5 w-32 bg-gray-300 rounded-full" />
                        <div className="h-5 w-24 bg-gray-300 rounded-full" />
                      </div>

                      {/* Button */}
                      <div className="mt-2">
                        <div className="h-10 w-32 bg-gray-300 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : paginatedLabs?.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <Image
                  src={illustration?.empty}
                  alt="no blogs"
                  width={300}
                  height={300}
                />
                <p className="text-[var(--greyP)] text-sm">
                  We could not find any labs near you
                </p>
              </div>
            ) : (
              <div className="py-5 w-full grid md:w-[100%]  lg:w-[100%] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4   ">
                {paginatedLabs?.length > 0 &&
                  paginatedLabs?.map((item, index) => {
                    return (
                      <div
                        key={item._id}
                        
                        className={`w-full lg:min-h-[300px] lg:max-h-[400px]  border-2 flex flex-col justify-start gap-3 rounded-md  hover:border-[var(--lightskyblue)] px-3 py-3  md:px-2 md:py-2 lg:px-3 lg:py-4 cursor-pointer`}
                      >
                        <h1
                          onClick={() => handleSelectedLabId(item._id)}
                          className="font-normal text-lg capitalize text-[var(--gravel)]  cursor-pointer"
                        >
                          <FaHandHoldingMedical className="inline text-[var(--applegreen)]" />{" "}
                          {item.name}
                        </h1>

                        <hr />

                        <ul className="" onClick={() => handleSelectedLabId(item._id)}>
                          <li>
                            <div className="flex items-center gap-2 py-2">
                              <IoLocation className="text-[var(--red)] text-xl" />{" "}
                              <span>
                                {" "}
                                {item.address.locality}, {item.address.city},{" "}
                                {item.address.state} - ({item.address.pincode})
                              </span>
                            </div>
                          </li>

                          <li>
                            <div className="flex flex-row  md:items-center md:justify-start lg:justify-start  lg:items-center gap-3 my-3 capitalize">
                              {item?.isVerifiedProfile === "Verified" ? (
                                <div className="uppercase flex items-center gap-2 bg-green-100 text-[var(--applegreen)] px-3 py-2 rounded-full text-xs font-medium">
                                  <FaCheckCircle className="text-base" />
                                  AARSH VERIFIED
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 bg-red-100 text-[var(--red)] px-3 py-2 rounded-full text-xs font-medium">
                                  <FaCheckCircle />
                                  Unverified
                                </div>
                              )}

                              <div className="flex items-center gap-2 bg-yellow-100 text-yellow-500 px-3 py-2 rounded-full text-xs font-medium">
                                <FaThumbsUp />
                                {/* bg-yellow-100 */}
                                {item.ratingPercentage}% Patients
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="flex items-center gap-2 py-2 uppercase">
                              <FaRegClock />
                              {item.availabilitySchedule.openingTime} -{" "}
                              {item.availabilitySchedule.closingTime}
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center gap-2 py-2 capitalize">
                              <MdOutlineEventAvailable />
                              {item.availabilitySchedule.startDay} -{" "}
                              {item.availabilitySchedule.endDay}
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center gap-2 py-2">
                              <MdOutlineEventAvailable />
                              {item.testDetailsLength} Test Availables
                            </div>
                          </li>
                        </ul>

                        <div className="flex gap-3 items-center">
                          <div
                            className={`flex items-center gap-2  ${
                              item?.homeCollection === true
                                ? "text-[var(--applegreen)]"
                                : "text-[var(--red)]"
                            }`}
                          >
                            {item?.homeCollection ? (
                              <FaCheckCircle className="text-[var(--applegreen)]" />
                            ) : (
                              <RxCrossCircled className="text-[var(--red)]" />
                            )}
                            <span className="text-sm text-wrap">
                              Home Collection
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-2 ${
                              item?.labAvailability === true
                                ? "text-[var(--applegreen)]"
                                : "text-[var(--red)]"
                            }`}
                          >
                            {item?.labAvailability ? (
                              <FaCheckCircle className="text-[var(--applegreen)]" />
                            ) : (
                              <RxCrossCircled className="text-[var(--red)]" />
                            )}
                            <span className="text-sm">Lab Visit</span>
                          </div>
                        </div>
                        <div className="flex gap-3 items-center">
                          <button
                            onClick={() => handleSelectedLabId(item._id)}
                            className="bg-[var(--lightBlue)] p-2 sm:p-2 md:p-2 lg:px-4 lg:py-2 rounded-full border text-[var(--White)] hover:border-[var(--lightBlue)] hover:bg-[var(--White)] hover:text-[var(--lightBlue)]"
                          >
                            View More
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Right Side - Fixed Card */}
            <div className=" w-full flex flex-col md:w-full lg:w-1/3 mt-0 md:mt-2 lg:mt-5  md:gap-5 lg:gap-5">
              <div className="w-full bg-white border border-[var(--greyborder)]  p-4 rounded-md h-fit">
                <h2 className="fontsizebase sm:fontsizebase md:fontsizebase  font-[500]">
                  Available Medicals Specialist near you
                </h2>
                <p className="text-[var(--greyP)]">
                  {Array.isArray(doctorList) &&
                  doctorList.length === 0 &&
                  city?.sublocality !== undefined
                    ? `No Medical Doctor found in ${city?.sublocality}`
                    : city?.sublocality != undefined
                    ? `You are seeing results from ${city?.sublocality}`
                    : "You are seeing all results "}{" "}
                </p>
                <div className="flex flex-row flex-wrap justify-start gap-2 rounded-md   hover:border-[var(--lightskyblue)] px-3 py-3  md:px-2 md:py-2  lg:py-4">
                  {doctorList.slice(0, DoctorVisibleCount).map((item) => (
                    <div
                      key={item?._id}
                      className="text-[var(--lightBlue)] border border-[var(--lightBlue)] px-4 py-2 rounded-full bg-[var(--White)]"
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
                {doctorList?.length > 5 && (
                  <div className="mt-3">
                    {DoctorVisibleCount < doctorList?.length ? (
                      <button
                        onClick={handleDoctorShowMore}
                        className="text-sm text-[var(--lightBlue)] underline"
                      >
                        Show More
                      </button>
                    ) : (
                      <button
                        onClick={handleDoctorShowLess}
                        className="text-sm text-[var(--lightBlue)] underline"
                      >
                        Show Less
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="w-full bg-white border border-[var(--greyborder)]   p-4 rounded-md h-fit mt-5">
                <h2 className="fontsizebase  sm:fontsizebase md:fontsizebase font-[500]">
                  Available Clinics near you
                </h2>
                <p className="text-[var(--greyP)]">
                  {Array.isArray(clinicList) &&
                  clinicList.length === 0 &&
                  city?.sublocality !== undefined
                    ? `No clinic found in ${city?.sublocality}`
                    : city?.sublocality != undefined
                    ? `You are seeing results from ${city?.sublocality}`
                    : "You are seeing all results "}{" "}
                </p>
                <div className="flex flex-row flex-wrap justify-start gap-2 rounded-md   hover:border-[var(--lightskyblue)] px-3 py-3  md:px-2 md:py-2  lg:py-4">
                  {clinicList.slice(0, clinicVisibleCount).map((item) => (
                    <div
                      key={item?._id}
                      className="text-[var(--lightBlue)] border border-[var(--lightBlue)] px-4 py-2 rounded-full bg-[var(--White)]"
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>

                {clinicList?.length > 5 && (
                  <div className="mt-3">
                    {clinicVisibleCount < clinicList?.length ? (
                      <button
                        onClick={handleClinicShowMore}
                        className="text-sm text-[var(--lightBlue)] underline"
                      >
                        Show More
                      </button>
                    ) : (
                      <button
                        onClick={handleClinicShowLess}
                        className="text-sm text-[var(--lightBlue)] underline"
                      >
                        Show Less
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 mb-4 gap-2">
            {/* Previous Button */}
            <div className="flex justify-center my-4 gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 flex items-center gap-2 rounded-md ${
                  currentPage === 1
                    ? "text-[var(--greyP)] cursor-not-allowed"
                    : "text-[var(--lightBlue)] hover:bg-gray-200"
                }`}
              >
                <FaArrowLeft />
                <span className="hidden md:block">Previous</span>
              </button>

              {/* Page Numbers */}
              {generatePageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  className={`px-4 py-2 rounded-md ${
                    page === "..."
                      ? "cursor-default text-gray-500"
                      : currentPage === page
                      ? "bg-[var(--lightBlue)] text-white"
                      : "bg-gray-200 text-[var(--lightBlue)] hover:bg-gray-300"
                  }`}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}

              {/* Next Arrow */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 flex items-center gap-2 rounded-md ${
                  currentPage === totalPages
                    ? "text-[var(--greyP)] cursor-not-allowed"
                    : "text-[var(--lightBlue)] hover:bg-gray-200"
                }`}
              >
                <span className="hidden md:block">Next</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LabList;

