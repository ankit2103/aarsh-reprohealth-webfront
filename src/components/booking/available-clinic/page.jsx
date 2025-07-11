"use client";
import { useState } from "react";
import { booking } from "../../../components/element/images";
import Image from "next/image";
import data from "../../../_data/availabledoctor.json";
import SearchAvailableDoctorForm from "../search-available-doctor-form/page";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import {
  FaCheckCircle,
  FaHandHoldingMedical,
  FaRegClock,
} from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaThumbsUp } from "react-icons/fa";
// import { FaThumbsUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { illustration } from "../../../components/element/images";

const images = [
  { id: 1, src: booking.img1 },
  { id: 2, src: booking.img2 },
  { id: 3, src: booking.img3 },
];
const itemsPerPage = 4;

const AvailableClinic = ({
  getData,
  setGetData,
  loading,
  setLoading,
  labList,
  setLabList,
  doctorList,
  setDoctorList,
  location,
  setLocation,
  city,
  setCity,
  selectedLanguage,
  setSelectedLanguage,
  onSelectLanguage,
  search,
  setSearch,
  onSearchData,
  test,
  setAvailableTest,
  availableTest,
}) => {
  // console.log("AvailableClinic-------------", test);

  const router = useRouter();
  const [currentClinicId, setCurrentClinicId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(getData.length / itemsPerPage);

  // set for clinic list in 5 at a time
  const [DoctorVisibleCount, setDoctorVisibleCount] = useState(5);
  const [labVisibleCount, setLabVisibleCount] = useState(5);
  const handleDoctorShowMore = () => {
    setDoctorVisibleCount((prev) => prev + 3);
  };
  const handleDoctorShowLess = () => {
    setDoctorVisibleCount(5);
  };
  const handleLabShowMore = () => {
    setLabVisibleCount((prev) => prev + 2);
  };
  const handleLabShowLess = () => {
    setLabVisibleCount(5);
  };
  const paginatedClinics = getData.slice(
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

  const handleSelectedClinicId = (clinicId) => {
    setCurrentClinicId(clinicId);
    router.push(`/speciality-clinics/${clinicId}`);
  };

  return (
    <div className="w-full">
      <div className="main-container">
        <div className="container">
          <div className="pt-8 px-0 md:pt-20">
            {/* sm:px-10 md:px-20 lg:px-14  */}
            <div className=" md:relative availablebgbanner hidden sm:flex md:flex md:justify-between w-full ">
              <div className="text-[var(--White)] px-0 py-4 md:p-0 md:px-4 lg:px-8 font-semibold md:w-auto hidden sm:hidden md:block lg:block">
                <h3 className="font-[600]">
                  Skip the waiting room consult your doctor online from the
                  comfort of home!{" "}
                </h3>
                <h3 className="font-[600] mt-0  md:mt-3">
                  {data[0].availabledoctor.title2}
                </h3>
                <p className="py-1 md:py-3">In-person</p>

              </div>
              <div className="pr-0 md:pr-2  md:w-auto  mt-0 sm:-mt-12 md:-mt-11 hidden sm:hidden md:block lg:block  ">
                <Image
                  src={booking.availabledoctorbannerimg}
                  alt="not found"
                  width="100%"
                  height="100%"
                  className=" md:h-[300px] lg:h-[100%] object-cover"
                />
              </div>

              <div className="md:absolute w-[100%] sm:w-[100%] md:w-[90%] lg:w-[90%] left-1/2 bottom-1/2  md:transform  md:-translate-x-1/2 top-[10%] md:top-[90%]  z-200 ">
                <SearchAvailableDoctorForm
                  getData={getData}
                  setGetData={setGetData}
                  loading={loading}
                  setLoading={setLoading}
                  location={location}
                  setLocation={setLocation}
                  city={city}
                  setCity={setCity}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                  onSelectLanguage={onSelectLanguage}
                  search={search}
                  setSearch={setSearch}
                  onSearchData={onSearchData}
                  test={test}
                  setAvailableTest={setAvailableTest}
                  availableTest={availableTest}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-col lg:flex-row gap-5 mt-4 md:mt-52 lg:mt-40">
            {/* new layout */}
            {loading ? (
              <div className="grid md:w-[70%] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-2 flex flex-col justify-start gap-3 rounded-md animate-pulse px-3 py-3 md:px-2 md:py-2 lg:px-3 lg:py-4"
                  >
                    <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
                    <hr />
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                      </li>
                      <li className="flex gap-3">
                        <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                        <div className="h-6 w-28 bg-gray-300 rounded-full"></div>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                      </li>
                    </ul>
                    <div className="mt-3 h-8 w-24 bg-gray-300 rounded-full"></div>
                  </div>
                ))}
              </div>
            ) : paginatedClinics &&  paginatedClinics.length > 0 ? (
              <div className="grid md:w-[100%] lg:w-[70%] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {paginatedClinics?.length > 0 &&
                  paginatedClinics.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleSelectedClinicId(item?._id)}
                      className="w-full  border shadow-md flex flex-col justify-start gap-3 rounded-md px-3 py-3 md:px-2 md:py-2 lg:px-3 lg:py-4 md:min-h-[300px] md:max-h-[350px] lg:min-h-[300px] lg:max-h-[350px]"
                    >
                      <h2 onClick={() => handleSelectedClinicId(item?._id)} className="font-normal text-lg capitalize text-[var(--gravel)] cursor-pointer ">
                        <FaHandHoldingMedical className="inline text-[var(--applegreen)]" />{" "}
                        {item?.name}
                      </h2>
                      <hr />

                      <ul>
                        <li>
                          <div className="flex items-center  gap-2 py-2">
                            <IoLocation className="text-[var(--red)] text-base w-[10%] " />
                            <span className="w-[90%] ">
                              {item?.address?.locality}, {item?.address?.city},{" "}
                              {item?.address?.state} - ({item?.address?.pincode}
                              )
                            </span>
                          </div>
                        </li>

                        <li>
                          <div className=" flex flex-row  md:items-center md:justify-start lg:justify-start  lg:items-center gap-3 my-3 capitalize">
                            {item?.isVerifiedProfile === "Verified" ? (
                              <div className="uppercase flex items-center gap-2 bg-green-100 text-[var(--applegreen)] px-3 py-2 rounded-full font-medium">
                                <FaCheckCircle className="text-base" />
                                AARSH VERIFIED
                              </div> 
                            ) : (
                              <div className="flex items-center gap-2 bg-red-100 text-[var(--red)] px-4 py-1 rounded-full">
                                <FaCheckCircle className="text-base" />
                                Unverified
                              </div>
                            )}

                            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-500 px-3 py-2 rounded-full text-xs font-medium">
                              <FaThumbsUp className="text-base " />
                              {item?.ratingPercentage}% Patients
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="flex items-center gap-2 py-2 uppercase">
                            <FaRegClock className="w-[10%]  text-base " />
                            <span className="w-[90%]">
                              {item?.operatingHours?.openingTime} -{" "}
                              {item?.operatingHours?.closingTime}
                            </span>
                          </div>
                        </li>

                        <li>
                          <div className="flex items-center gap-2 py-2 capitalize">
                            <MdOutlineEventAvailable className="w-[10%] text-base " />
                            <span className="w-[90%]">
                              {item?.operatingHours?.startDay} -{" "}
                              {item?.operatingHours?.endDay}
                            </span>
                          </div>
                        </li>
                      </ul>

                      <div className="flex gap-3  items-center">
                        <button
                          onClick={() => handleSelectedClinicId(item?._id)}
                          className="bg-[var(--lightBlue)] p-2 sm:p-2 md:p-2 lg:px-4 lg:py-2 rounded-full border text-[var(--White)] hover:border-[var(--lightBlue)] hover:bg-[var(--White)] hover:text-[var(--lightBlue)]"
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ): paginatedClinics ?(
              <div className="w-full ">
                <div className="w-full flex  flex-col-reverse justify-center items-center py-8 ">
                  <Image
                    src={illustration?.empty}
                    alt="not found"
                    width={300}
                    height={300}
                    className="w-[240px] h-[240px]"
                  />
                </div>
                <p className="text-center">
                  We could not find any clinics near you
                </p>
              </div>
            ): null}

            {/* Right Side - Fixed Card */}
            <div className=" w-full flex flex-col  md:w-full lg:w-1/3  md:gap-5 lg:gap-5">
              <div className="w-full bg-white  border border-[var(--greyborder)]  p-4 rounded-md h-fit">
                <h2 className="fontsizebase sm:fontsizebase md:fontsizebase  font-[500]  ">
                  Available Medicals specialist near you
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

              <div className="w-full bg-white border border-[var(--greyborder)]  p-4 rounded-md h-fit mt-5 md:mt-5 lg:mt-0">
                <h2 className="fontsizebase sm:fontsizebase md:fontsizebase  font-[500]">
                 Available Labs near you
                </h2>
                <p className="text-[var(--greyP)]">
                  {Array.isArray(labList) &&
                  labList.length === 0 &&
                 city?.sublocality !== undefined
                    ? `No Lab found in ${city?.sublocality}`
                    : city?.sublocality != undefined
                    ? `You are seeing results from ${city?.sublocality}`
                    : "You are seeing all results "}{" "}
                </p>
                <div className="flex flex-row flex-wrap justify-start gap-2 rounded-md   hover:border-[var(--lightskyblue)] px-3 py-3  md:px-2 md:py-2  lg:py-4">
                  {labList.slice(0, labVisibleCount).map((item) => (
                    <div
                      key={item?._id}
                      className="text-[var(--lightBlue)] border border-[var(--lightBlue)] px-4 py-2 rounded-full bg-[var(--White)]"
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
                {labList.length > 5 && (
                  <div className="mt-3">
                    {labVisibleCount < labList.length ? (
                      <button
                        onClick={handleLabShowMore}
                        className="text-sm text-[var(--lightBlue)] underline"
                      >
                        Show More
                      </button>
                    ) : (
                      <button
                        onClick={handleLabShowLess}
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
          {/* Pagination */}
          <div className="flex justify-center my-4 gap-2 flex-wrap">
            {/* Previous Arrow */}
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
                onClick={() => typeof page === "number" && setCurrentPage(page)}
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
  );
};

export default AvailableClinic;
