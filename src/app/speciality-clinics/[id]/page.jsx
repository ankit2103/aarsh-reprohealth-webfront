"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { fetchClinicById } from "../../../utils/speciality-clinic/clinic.util";
import { FaThumbsUp } from "react-icons/fa";
import { doctordetailsimg } from "../../../components/element/images";
import {
  FaBriefcaseMedical,
  FaCheckCircle,
  FaHandHoldingMedical,
  FaRegClock,
} from "react-icons/fa";
import TabsComponentSpecialityClinic from "../../../components/doctor-details/tab-componet-hospital";
import Image from "next/image";
import ClinicTimeSlotSelection from "../../../components/doctor-details/time-slot-selection-clinic";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserOrder } from "../../../redux/slice/user.slice";
import Head from "next/head";


const ClinicSEO = ({ clinicData }) => {
  const clinic = clinicData?.[0];
  const name = clinic?.name || "Clinic";
  const locality = clinic?.address?.locality || "";
  const city = clinic?.address?.city || "";
  const state = clinic?.address?.state || "";
  const description = clinic?.description?.replace(/<[^>]*>/g, " ") || ""; // Remove HTML tags
  const services = clinic?.serviceDetails?.map((s) => s?.serviceName?.name || s?.serviceName)?.join(", ");
  const img = clinic?.clinicPics?.[0] || "https://your-default-image.png";

  const pageTitle = `${name} in ${locality}, ${city} | Aarsh Repro Health`;
  const metaDescription = `${name} in ${locality}, ${city}, ${state}. Verified clinic offering ${services}. Book appointments online.`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
    </Head>
  );
};


function useDraggableScroll() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Increase or decrease scroll speed here
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return {
    containerRef,
    eventHandlers: { onMouseDown, onMouseLeave, onMouseUp, onMouseMove },
  };
}

const ClinicDetail = () => {
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.user.v_user_info);
  const token = useSelector((state) => state.user.x_auth_token);
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [clinicData, setClinicData] = useState([]);
  const [slotsData, setSlotsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedClinicSlotDetail, setSelectedClinicSlotDetail] = useState(
    null
  );
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({
    startTime: "",
    endTime: "",
  });
  const [selectedSlotData, setSelectedSlotData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    type: "clinicService",
    clinicId: id || "",
    services: [],
    mode: "offline",
  });

  // inside your component to make service scrollable
  const {
    containerRef: consultationTypeContainerRef,
    eventHandlers: consultationTypeDragHandlers,
  } = useDraggableScroll();

  //   convert into
  function stripHtml(htmlString) {
    if (!htmlString) return ""; // fallback for undefined/null
    return htmlString.replace(/<[^>]*>/g, "");
  }

  const handleSelectService = (serviceId) => {
    const service = clinicData?.serviceDetails?.find(
      (service) => serviceId === service?.serviceName?._id
    );
    console.log("handleSelectService----------", serviceId, service);
    if (service) {
      setSelectedService(service);
      setSelectedServiceId(serviceId);
      // console.log(
      //   "67ff7d53aa0c968474cd7842-----------------------",
      //   service,
      //   serviceId
      // );
      // setSelectedSlotData((prev)=>({
      //   ...prev,
      //   services:[serviceId]
      // }))
      setSelectedSlotData((prev) => {
        console.log("Previous Slot Data:", prev);
        const updated = { ...prev, services: [serviceId] };
        console.log("Updated Slot Data:", updated);
        return updated;
      });
    }
  };
  const handleNavigate = (e) => {
    e.preventDefault();
    const missingField = Object.entries(selectedSlotData).find(
      ([_, value]) => !value
    );
    console.log("missingField-----------", selectedSlotData)
    if (missingField) {
      toast(`Missing field: ${missingField[0]}`);
      return;
    }
    // else if (userInfo == null && token == null) {
    dispatch(
      updateUserOrder({
        ...selectedSlotData,
        selectedService, // includes date, mode, doctorId, doctorClinicId, startTime, endTime
      })
    );
    router.push("/patient-appointment-detail");
    // } 
    // else if (userInfo === null || token === null) {
    //   toast(`Please login to continue`);
    //   router.push("/login");
    // }

    // router.push("/patient-appointment-detail");
  };

  useEffect(() => {
    const getClinicById = async () => {
      try {
        const result = await fetchClinicById(id);
        console.log("result----------------", result);
        if (result?.code == 200) {
          setClinicData(result?.data?.[0]);
          setSlotsData(result?.data?.[0].slots);
          setLoading(false);
        }
      } catch (error) {
        // console.log("useEffect error in getClinicById------", error);
      }
    };
    getClinicById();
  }, []);
  useEffect(() => {
    if (clinicData?.serviceDetails?.length > 0) {
      const firstService = clinicData.serviceDetails[0];

      setSelectedService(firstService);
      setSelectedServiceId(firstService.serviceName?._id);

      // Delay setting selectedSlotData after ensuring it's initialized
      setSelectedSlotData((prev) => {
        if (!prev) return prev; // if prev is undefined/null, don't set
        return {
          ...prev,
          services: [firstService.serviceName?._id],
        };
      });
    }
  }, [clinicData]);

  return (
    <>
      <ClinicSEO clinicData={clinicData} />
      <div className="w-full ">
        <div className="main-container border">
          <div className="container mx-auto mt-20 lg:mt-24 ">
            {/* Grid Layout */}
            <div className="grid grid-cols-12 gap-8 mt-10">
              {/* Left Section (col-span-8) */}

              <div className="col-span-12 lg:col-span-7">
                {/* Heading */}
                {loading ? (
                  <>
                    <div className="h-5 w-48 bg-gray-300 rounded mb-3 animate-pulse" />

                    <div className="bg-gray-100 rounded-xl p-6 flex flex-col lg:flex-row gap-1 shadow-md animate-pulse">
                      {/* Image Skeleton */}
                      <div className="w-32 h-32 lg:w-48 my-3 lg:h-auto flex-shrink-0 mx-auto lg:mx-0">
                        <div className="rounded-lg bg-gray-300 h-32 w-32 md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]"></div>
                      </div>

                      {/* Details Skeleton */}
                      <div className="flex-1 text-center lg:text-left space-y-3 mt-2 lg:mt-0 px-4">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto lg:mx-0"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto lg:mx-0"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mx-auto lg:mx-0"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mx-auto lg:mx-0"></div>

                        <div className="flex flex-row items-center justify-center lg:justify-start gap-3 mt-4">
                          <div className="h-6 w-28 bg-gray-300 rounded-full"></div>
                          <div className="h-6 w-36 bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="px-6 py-6 rounded-lg shadow">
                    <h3 className="mb-4 text-[var(--listText)]">
                      Specialist Clinic’s Information
                    </h3>
                    {/* Card Section */}
                    <div className="bg-[var(--White)] rounded-xl p-6 flex flex-col lg:flex-row gap-6 ">
                      {/* Left: Doctor Image */}

                      <div className="w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0 mx-auto lg:mx-0 rounded-full">
                        <Image
                          src={
                            clinicData?.clinicPics?.[0] ||
                            doctordetailsimg.profile
                          }
                          alt="Doctor"
                          width={160}
                          height={160}
                          className="rounded-full object-cover h-40 w-40" //h-40 w-40
                        />
                      </div>

                      {/* Right: Doctor Details */}
                      <div className="flex-1 text-center lg:text-left">
                        {/* Top Row: Share Button (Right Aligned) */}

                        {/* Doctor Name & MCI Number */}
                        <div className="flex flex-col md:flex-col items-center md:justify-center md:items-center lg:flex-row lg:justify-between mt-1">
                          <h3 className="capitalize text-[var(--listText)] font-semibold ">
                            {clinicData.name}
                          </h3>

                          <div className="w-[150px]">
                            {clinicData?.isVerifiedProfile === "Verified" ? (
                              <div className=" uppercase text-center flex items-center justify-center gap-2 bg-green-100 text-[var(--applegreen)]  px-2 py-1 rounded-full text-xs font-medium">
                                <FaCheckCircle />
                                AARSH Verified
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 bg-red-100 text-[var(--red)] px-3 py-1 rounded-full text-xs font-medium">
                                <FaCheckCircle />
                                Unverified
                              </div>
                            )}
                          </div>

                        </div>
                        {/* <div className="w-full flex flex-col justify-center items-center lg:flex-row lg:justify-between mt-1">
                        <h3 className="w-[50%] capitalize font-medium text-[var(--gravel)] ">
                          {clinicData.name}
                        </h3>
                        <div className="w-full lg:w-[100%] flex justify-end">
                          {clinicData?.isVerifiedProfile === "Verified" ? (
                          <div className="w-[5%] md:w-[21%] lg:w-[50%] uppercase flex items-center gap-2 bg-green-100 text-[var(--applegreen)] md:px-3  lg:px-3 py-1 rounded-full text-xs font-medium">
                            <FaCheckCircle />
                            AARSH Verified
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-red-100 text-[var(--red)] px-3 py-1 rounded-full text-xs font-medium">
                            <FaCheckCircle />
                            Unverified
                          </div>
                        )}
                        </div>
                      </div> */}

                        {/* Address */}
                        <p className="text-[var(--listText)] text-sm mt-1 flex gap-2 items-center justify-center lg:justify-start capitalize ">
                          <span className="capitalize">
                            {clinicData?.address?.locality},{" "}
                            {clinicData?.address?.city},{" "}
                            {clinicData?.address?.state},{" "}
                            {clinicData?.address?.pincode}
                          </span>
                        </p>

                        <p className="text-[var(--listText)] text-sm mt-3">
                          {stripHtml(
                            isExpanded
                              ? clinicData?.description
                              : clinicData?.description?.slice(0, 50)
                          )}
                          {!isExpanded &&
                            clinicData?.description?.length > 80 &&
                            ""}{" "}
                          <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[var(--cyanblue)] font-semibold  cursor-pointer text-sm"
                          >
                            {clinicData?.description?.length > 50 && isExpanded
                              ? "View Less"
                              : "View More..."}
                          </button>
                        </p>
                        {/* Assured & Rating */}
                        <div className="flex flex-row items-center justify-center lg:justify-start gap-3 mt-3 capitalize">
                          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-500 px-3 py-1 rounded-full text-xs font-medium">
                            <FaThumbsUp />
                            {clinicData?.ratingPercentage}% (
                            {clinicData?.totalReviews} Patients)
                          </div>
                        </div>
                      </div>
                    </div>
                    <TabsComponentSpecialityClinic
                      clinicInfo={clinicData}
                      setClinicInfo={setClinicData}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </div>
                )}
              </div>

              {/* Right Section (col-span-4) - Appointment Selection */}
              <div className="col-span-12 lg:col-span-5">
                {loading ? (
                  <div className="px-6 py-6 rounded-lg shadow">
                    <div className="h-5 w-48 bg-gray-300 rounded mb-3 animate-pulse" />
                    <div className="flex bg-gray-100 rounded-lg shadow-md w-full p-3 animate-pulse">
                      <div className="flex gap-4 overflow-x-auto scroll-smooth whitespace-nowrap mx-0 scrollbar-hide">
                        {[...Array(4)].map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 border-r last:border-r-0 p-2"
                          >
                            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                            <div className="flex flex-col">
                              <div className="h-4 w-24 bg-gray-300 rounded"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-5 w-48 bg-gray-300 rounded mb-3 mt-3 animate-pulse" />
                    <div className="bg-gray-100 p-4 rounded-xl shadow-md mt-2 animate-pulse">
                      {/* Date Pills */}
                      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="flex gap-4">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="flex flex-col items-center min-w-[80px]"
                              >
                                <div className="h-8 w-16 bg-gray-300 rounded-md" />
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Time Periods */}
                      <div className="mt-4 space-y-6">
                        {["Morning", "Afternoon", "Evening"].map((label) => (
                          <div key={label}>
                            {/* Period Heading */}
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-5 w-5 bg-gray-300 rounded-full" />
                              <div className="h-4 w-24 bg-gray-300 rounded" />
                            </div>

                            {/* Time Slots */}
                            <div className="flex gap-3 flex-wrap">
                              {Array(4)
                                .fill(0)
                                .map((_, j) => (
                                  <div
                                    key={j}
                                    className="px-6 py-3 bg-gray-300 rounded-lg w-[80px] h-8"
                                  />
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full my-4">
                      <div className="w-full h-10 sm:h-12 md:h-12 lg:h-12 bg-gray-300 rounded-md animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="px-6 py-6 rounded-lg shadow">
                    <h3 className="text-[var(--listText)] text-sm mb-3 ">
                      Choose Service
                    </h3>
                    <div className="flex bg-[var(--White)] rounded-lg shadow w-full p-3">
                      <div
                        ref={consultationTypeContainerRef}
                        {...consultationTypeDragHandlers}
                        className="flex overflow-x-auto whitespace-nowrap  scrollbar-hide"
                      >
                        {clinicData?.serviceDetails?.map((service, index) => {
                          return (
                            <label
                              // key={service._id}
                              key={index}
                              className="flex items-center gap-2 w-full border-r last:border-r-0 cursor-pointer p-2 text-wrap"
                            >
                              <input
                                type="radio"
                                name="appointment"
                                value={service.serviceName?._id}
                                checked={
                                  selectedServiceId === service.serviceName?._id
                                }
                                onChange={() =>
                                  handleSelectService(service.serviceName?._id)
                                }
                                className="h-4 border text-[var(--cyanblue)] focus:ring-[var(--cyanblue)] cursor-pointer"
                              />
                              <div className="flex flex-col">
                                <h3 className="text-[var(--listText)]  text-wrap text-sm ">
                                  {service.serviceName?.name}
                                </h3>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <h3 className="text-[var(--listText)] text-sm mb-3 mt-4">
                      Choose Time Slot{" "}
                    </h3>
                    <div>
                      <ClinicTimeSlotSelection
                        loading={loading}
                        setLoading={setLoading}
                        slotsData={slotsData}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedTimeSlot={selectedTimeSlot}
                        setSelectedTimeSlot={setSelectedTimeSlot}
                        selectedClinicSlotDetail={selectedClinicSlotDetail}
                        setSelectedClinicSlotDetail={setSelectedClinicSlotDetail}
                        selectedSlotData={selectedSlotData}
                        setSelectedSlotData={setSelectedSlotData}
                      />
                    </div>
                    <button
                      onClick={handleNavigate}
                      // disabled={isAnyFieldMissing}
                      className={`w-full bg-[var(--lightBlue)] text-white text-xs px-2 py-2 sm:px-3 sm:py-3  md:text-sm md:px-4 md:py-3 lg:px-4 lg:py-3 rounded-md mt-2 bg-[var(--lightBlue)]"
                  `}
                    >
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default ClinicDetail;
