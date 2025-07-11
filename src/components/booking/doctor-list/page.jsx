"use client";
import React, { useEffect, useState } from "react";
import data from "../../../_data/availabledoctor.json";
import { LuBadgeCheck } from "react-icons/lu";
import Image from "next/image";
import { booking, illustration } from "../../../components/element/images";
import { MdThumbUp } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { fetchDoctors } from "../../../utils/doctor/doctor.util";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";

const DoctorList = ({
  getData,
  setGetData,
  loading,
  setLoading,
  labList,
  setLabList,
  clinicList,
  setClinicList,
  city,
}) => {
  console.log("getData-----------", getData)
  const selectedData =
    Array.isArray(getData[5]) && getData[5].length > 0
      ? getData[5]
      : Array.isArray(getData[10]) && getData[10].length > 0
      ? getData[10]
      : Array.isArray(getData[15]) && getData[15].length > 0
      ? getData[15]
      : [];
  const router = useRouter();
  const [currentDoctorId, setCurrentDoctorId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [tabOptions, setTabOptions] = useState(["Today", "Tomorrow", "Other"]);
  // Find the selected doctor
  const doctorsPerPage = 3;
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = selectedData?.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  const totalPages = Math.ceil(selectedData?.length / doctorsPerPage);
  // set for clinic list in 5 at a time
  const [clinicVisibleCount, setClinicVisibleCount] = useState(5);
  const [labVisibleCount, setLabVisibleCount] = useState(5);
  const handleClinicShowMore = () => {
    setClinicVisibleCount((prev) => prev + 3);
  };
  const handleClinicShowLess = () => {
    setClinicVisibleCount(5);
  };

  const handleLabShowMore = () => {
    setLabVisibleCount((prev) => prev + 2);
  };
  const handleLabShowLess = () => {
    setLabVisibleCount(5);
  };

  const generatePageNumbers = () => {
    const pages = new Set(); // Use Set to prevent duplicates

    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) pages.add(i);
    } else {
      if (currentPage <= 3) {
        pages.add(1);
        pages.add(2);
        pages.add(3);
        if (totalPages > 3) {
          pages.add("...");
          pages.add(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pages.add(1);
        if (totalPages > 3) {
          pages.add("...");
        }
        pages.add(totalPages - 2);
        pages.add(totalPages - 1);
        pages.add(totalPages);
      } else {
        pages.add(1);
        pages.add("...");
        pages.add(currentPage);
        pages.add("...");
        pages.add(totalPages);
      }
    }

    return Array.from(pages);
  };

  const handleSelectedDoctorId = (doctorId) => {
    setCurrentDoctorId(doctorId);
    router.push(`/medical-specialist/${doctorId}`);
  };
  // console.log("currentDoctorId :", selectedDoctor, currentDoctorId);
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
  }, [selectedDoctorId, selectedData]);

  console.log(
    "Get data doctor-----------------------",
    getData,
    currentDoctors,
    labList,
    clinicList
  );

  return (
    <div className="w-full  lg:mt-[7rem]">
      {/* px-8 sm:px-10 md:px-14 lg:px-14 mt-4 pt-0 md:mt-[10rem]  */}
      <div className="main-container">
        <div className="container">
          <div className="pt-0 md:pt-10 ">
            {/* {Array.isArray(selectedData) && (
              <p className="fontsize2xl">
                 {" "}
                {selectedData?.length>0 
                  ? `${selectedData?.length } doctors available  ${ city?.sublocality!=="" && city?.sublocality!== undefined ? `in ${city.sublocality}` :""}`
                  : " Please select other option"}
                 
              </p>
            )} */}
            {loading ? (
              <p className="fontsize2xl">Please wait while we load doctors near you..</p>
            ) : city?.sublocality ? (
              <p className="fontsize2xl">
                {selectedData?.length > 0 &&
                  `${selectedData?.length} doctors available in ${city?.sublocality}`}
              </p>
            ) : (city?.sublocality=="" || city?.sublocality==undefined || city?.sublocality==null) && selectedData?.length>0 ? (
              <p className="fontsize2xl"> {selectedData?.length} doctors available </p>
            ): (
              <p className="fontsize2xl">Please select another option</p>
            )}
            <div className="text-sm md:text-2xl flex items-center  gap:2 md:gap-3 text-[var(--greyP)]">
              <LuBadgeCheck className="text-2xl text-[var(--black)] mr-3 md:mr-0" />
              <p className="fontsizebase">{data[0].availabledoctor?.title3}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row  gap-4 py-4">
            {/* Left Side - Doctor Cards */}
            {loading ? (
              <div className="w-full md:w-2/3 py-4 space-y-6">
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white border rounded-md p-4 animate-pulse"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                      {/* Doctor image and details */}
                      <div className="flex gap-4 w-full">
                        <div className="w-[160px] h-[160px] bg-gray-300 rounded-full"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
                          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                          <div className="h-4 w-1/3 bg-gray-200 rounded mt-2"></div>
                          <div className="h-[1px] w-[90%] bg-gray-200 my-2"></div>
                          <div className="flex gap-4 items-center">
                            <div className="w-24 h-8 bg-gray-300 rounded"></div>
                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>

                      {/* View more button */}
                      <div className="w-full md:w-[30%] flex md:items-end md:justify-end">
                        <div className="w-full md:w-[120px] h-10 bg-gray-300 rounded-full mt-4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : currentDoctors?.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <Image
                  src={illustration?.empty}
                  alt="no blogs"
                  width={300}
                  height={300}
                />
                <p className="text-[var(--greyP)] text-sm">
                  We could not find any doctors near you
                </p>
              </div>
            ) : (
              <div className="w-full  md:w-2/3  rounded-lg py-4 ">
                {currentDoctors?.length > 0 &&
                  currentDoctors?.map((doctor) => {
                    // Determine the third tab dynamically for each doctor
                    return (
                      <div
                        key={doctor?._id}
                        className=" bg-white border border-[var(--greyborder)]  rounded-md mb-4"
                        // onClick={() => handleSelecteDoctorId(doctor._id)}
                      >
                        {/* Doctor Card */}
                        <div
                          className={`flex flex-col md:flex-row md:justify-between  p-4 ${
                            selectedDoctor ? "border-b-2 rounded-2xl" : ""
                          }`}
                        >
                          <div className="flex gap-2 ">
                            <div className="w-[160px] h-[160px] flex justify-start items-center border rounded-full ">
                              {doctor?.profilePic ? (
                                <Image
                                  src={
                                    doctor?.profilePic
                                      ? doctor?.profilePic
                                      : null
                                  }
                                  alt={doctor?.name}
                                  className="w-full h-full md:w-full  md:h-full rounded-full border-2 border-[var(--pink)] bg-[var(--White)] object-contain cursor-pointer"
                                  width={100}
                                  height={100}
                                  onClick={() =>
                                  handleSelectedDoctorId(doctor?._id)
                                }
                                />
                              ) : (
                                <div className="w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0 mx-auto lg:mx-0 bg-gray-300 rounded-full flex justify-center items-center">
                                  <HiMiniUserCircle className="w-full h-full text-gray-400" />
                                </div>
                              )}
                            </div>

                            <div className="  w-[60%] capitalize">
                              <h2 onClick={() =>
                                  handleSelectedDoctorId(doctor?._id)
                                } className="fontsizelg font-semibold text-[var(--gravel)] cursor-pointer">
                                {doctor?.name?.startsWith("Dr.")
                                  ? doctor?.name
                                  : `Dr. ${doctor?.name}`}
                              </h2>
                              <p className="text-[var(--listText)] mt-2">
                                <span className="font-bold">Specialization :</span>{" "}
                                {doctor?.specialization?.join(", ")}
                              </p>
                              <p className="text-[var(--listText)]">
                                <span className="font-bold">Qualification :</span>{" "}
                                <span className="uppercase">{doctor?.qualification?.degree}{" "}</span>
                                 {/* <span className="capitalize">
                            {doctor?.qualification?.collegeName
                              ? doctor?.qualification?.collegeName
                              : ""}
                          </span> */}
                              </p>
                              <p className="text-[var(--listText)]">
                                <span className="font-bold">Experience :</span> {doctor?.experience} years
                              </p>
                              <p><span className="font-bold">Language :</span>{" "}{doctor?.language?.join(", ")}</p>
                              <p className="fontsizesm text-[var(--listText)] ">
                                <span className="font-bold">City :</span> {" "}
                                <span>
                                  {Array.from(
                                    new Set(
                                      doctor?.clinic?.map((clinic) => clinic?.city)
                                    )
                                  ).join(", ")}
                                </span>
                              </p>
                              <p className="fontsizesm text-[var(--packageList)]">
                                {doctor?.additional}
                              </p>
                              <p className="fontsizesm text-[var(--listText)] ">
                                <span className="font-bold">Patient Stories :</span>{" "}
                                <span className=" font-normal ">
                                  {doctor?.totalReviews}%{" "}
                                </span>{" "}
                              </p>
                              <div className="w-[90%]">
                                <hr className="my-3 border-[var(--Iron)] border-1 border-dashed"></hr>
                              </div>
                              <div className="flex items-end gap-2 fontsizesm  ">
                                <div className=" bg-[var(--applegreen)] text-[var(--White)] flex gap-2 justify-center items-center rounded-md px-4 md:px-0  md:py-2 md:w-24">
                                  <MdThumbUp />
                                  <button>{doctor?.ratingPercentage}%</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col  md:items-end  md:flex-col-reverse w-full md:w-[30%]">
                            <div className=" mt-5 md:0">
                              <button
                                className="bg-[var(--lightBlue)] p-2 sm:p-2 md:p-2 lg:px-4 lg:py-2 rounded-full border text-[var(--White)] hover:border-[var(--lightBlue)] hover:bg-[var(--White)] hover:text-[var(--lightBlue)]"
                                onClick={() =>
                                  handleSelectedDoctorId(doctor?._id)
                                }
                              >
                                View More
                              </button>
                              {/* px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-4 lg:py-3  */}
                            </div>
                          </div>
                        </div>

                        {/* Slots Section (Appears Just Below the Selected Doctor) */}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Right Side - Fixed Card */}
            <div className=" w-full flex flex-col md:w-1/3 lg:w-1/3 mt-0 md:mt-2 lg:mt-4   md:gap-5 lg:gap-5">
              <div className="w-full bg-white border border-[var(--greyborder)]   p-4 rounded-md h-fit">
                <h2 className="sm:fontsizebase md:fontsizelg">
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
                <div className="flex flex-row flex-wrap justify-start gap-2 rounded-md hover:border-[var(--lightskyblue)] px-3 py-3  md:px-2 md:py-2  lg:py-4">
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

              <div className="w-full bg-white border border-[var(--greyborder)] mt-5 md:mt-0 p-4 rounded-md h-fit">
                <h2 className="sm:fontsizebase md:fontsizelg  font-semibold">
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

export default DoctorList;
{
  /* <div className="flex gap-4">
                    {tablist.map((item) => (
                      <div key={item.id} className="text-center">
                        <p className="font-semibold">{item.day}</p>
                        <p className="text-gray-500">{item.no_available_slots} Slots Available</p>
                      </div>
                    ))}
                  </div> */
}

{
  /* <div className="w-full md:w-[100%] lg:w-[60%] flex md:justify-between   ">
{Object.keys(availableSlots).map((key) => (
  <div
    key={key}
    className={` w-full text-center cursor-pointer border-b-4 rounded-sm  ${
      selectedDay === key
        ? " border-green-600"
        : "border-[var(--Iron)] "
    }`}
    onClick={() => setSelectedDay(key)}
  >
    <p className="text-xs md:text-base ">{availableSlots[key].day}</p>
    <p
      className={`text-xs md:text-base ${
        selectedDay === key
          ? "text-[var(--applegreen)]  "
          : ""
      }`}
    >
      {availableSlots[key].slots.length} Slots Available
    </p>
    
  </div>
))}
</div> */
}
{
  /* <hr
    className={`text-center cursor-pointer ${
      selectedDay === key
        ? "text-[var(--applegreen)] font-semibold border-b-3 border-green-600"
        : ""
    }`}
  /> */
}
