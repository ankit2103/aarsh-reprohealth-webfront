"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { HiMiniUserCircle } from "react-icons/hi2";

import { FaCheckCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import TabsComponent from "../../../components/doctor-details/tab-component";
import TimeSlotSelection from "../../../components/doctor-details/time-slot-selection";
import { useParams, useRouter } from "next/navigation";
import {
  fetchDoctorById,
  fetchDoctorOnlineConsultationSlots,
  fetchDoctorSlotsBySelectedClinic,
} from "../../../utils/doctor/doctor.util";
import { useDispatch } from "react-redux";
import { updateUserOrder } from "../../../redux/slice/user.slice";
import { toast } from "react-toastify";
import { useAuthenticated } from "../../../hooks/useAuthenticated.hook";
import Head from "next/head";

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

const DoctorDetail = () => {
  const { id } = useParams();
  const isAuthenticated = useAuthenticated();
  const dispatch = useDispatch();
  // console.log("userOrderData--------------------", userOrderData, userAuthToken);
  const router = useRouter();
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [navigateLoading, setNavigateLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Video");
  const options = [
    { id: "Video", title: "Video Consult" },
    { id: "Audio", title: "Audio Consult" },
    { id: "Inpersonal", title: "In-personal Consult" },
  ];
  const [selectedClinic, setSelectedClinic] = useState(""); //take id of selected clinic
  const [selectedClinicSlotDetail, setSelectedClinicSlotDetail] = useState(
    null
  );
  const [slotsData, setSlotsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({
    startTime: "",
    endTime: "",
  });

  const [selectedSlotData, setSelectedSlotData] = useState({
    date: selectedDate || "",
    mode: selectedOption === "Inpersonal" ? "offline" : "online",
    doctorId: id,
    // doctorClinicId: "",
    startTime: "",
    endTime: "",
    onlineType:
      selectedOption === "Video"
        ? "doctorVideoConsultation"
        : selectedOption === "Audio" ? "doctorVoiceConsultation" : "",
  });

  // inside your component
  const {
    containerRef: consultationTypeContainerRef,
    eventHandlers: consultationTypeDragHandlers,
  } = useDraggableScroll();

  const {
    containerRef: clinicContainerRef,
    eventHandlers: clinicDragHandlers,
  } = useDraggableScroll();

  const getSlotsBySelectedClinic = async (doctorClinicId) => {
    setSelectedClinic(doctorClinicId);
    // console.log("update-----------------------clinic id:",doctorClinicId)
    if (!doctorClinicId || !id) return;
    else {
      const dataToSend = { doctorId: id, doctorClinicId };
      try {
        const result = await fetchDoctorSlotsBySelectedClinic(dataToSend);
        console.log("get slot by doctor clinicId of particular doctor--------------", result, result.data, result.data[0]);
        if (result.code === 200 && result.data.length > 0) {
          setSelectedClinicSlotDetail(result.data[0]);
          setSlotsData(result.data);
          setSelectedSlotData((prev) => ({
            ...prev,
            doctorClinicId: doctorClinicId,
          }));
        } else {
          setSlotsData([]);
          setSelectedClinicSlotDetail(null);
        }
      } catch (error) {
        console.log("Error in getSlotsBySelectedClinic :", error);
      }
    }
  };
  const getOnlineConsultationSlot = async (doctorId) => {

    try {

      if (!doctorId) return;
      else {
        const result = await fetchDoctorOnlineConsultationSlots(doctorId);
        // console.log("Result of fetchDoctorOnlineConsultationSlots: ", result);
        if (result?.code === 200) {
          // setGetData(result?.data || []);
          // setGetSlots(result?.data?.slots || []);
          // setLoading(false);
          setSlotsData(result?.data);
          setSelectedClinic("");
        } else {
          setLoading(true);
        }
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    try {
      setNavigateLoading(true)
      const missingField = Object.entries(selectedSlotData).find(([key, value]) => {
        // Skip checking onlineType if mode is offline
        if (key === "onlineType" && selectedSlotData.mode === "offline") return false;
        return !value;
      });
      if (missingField) {
        toast(`Missing field: ${missingField[0]}`);
        return;
      }
      if (!missingField) {
        // && isAuthenticated
        dispatch(
          updateUserOrder({
            ...selectedSlotData, // includes date, mode, doctorId, doctorClinicId, startTime, endTime
          })
        );
        router.push("/patient-appointment-detail");
      }
      // else {
      //   router.push("/login");
      // }
    } catch (error) {
      setNavigateLoading(false)

    } finally {
      setNavigateLoading(false)
    }

  };

  // console.log("isAuthenticated-------------------",selectedSlotData,isAuthenticated);
  useEffect(() => {
    const fetchDetailById = async () => {
      try {
        const result = await fetchDoctorById({ doctorId: id });
        console.log("result.data-------------------", result.data);
        if (result?.code === 200) {
          // console.log("result.data-------------------", result.data);
          setDoctorInfo(result.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error in api response of Doctor Detail:", error);
      }
    };
    fetchDetailById();
  }, [id]);

  useEffect(() => {
    if (
      selectedOption === "Inpersonal" &&
      doctorInfo?.clinic?.length > 0 &&
      !selectedClinic
    ) {
      const firstClinicId = doctorInfo.clinic[0]._id;
      setSelectedClinic(firstClinicId);
      getSlotsBySelectedClinic(firstClinicId); // also fetch slots for the first clinic
      setSelectedDate(0);
      setSelectedSlotData((prev) => ({
        ...prev,
        mode: "offline",
        onlineType: "",
      }));
    } else if (selectedOption === "Video" || selectedOption === "Audio") {
      getOnlineConsultationSlot({ doctorId: id });
      setSelectedDate(0);
      setSelectedSlotData((prev) => ({
        ...prev,
        mode: "online",
        onlineType:
          selectedOption === "Video"
            ? "doctorVideoConsultation"
            : selectedOption === "Audio" ? "doctorVoiceConsultation" : "",
      }));
    }
  }, [doctorInfo, selectedOption]);
  useEffect(() => {
    // Dispatch reset when selectedOption changes
    dispatch(updateUserOrder({})); // Reset to empty or default object
  }, [selectedOption]);
  // console.log("SelectedOption:", selectedOption);

  return (
    <>
      <Head>
        <title>Dr. {doctorInfo?.name} | Book Online Appointment | Aarsh ReproHealth</title>
        <meta
          name="description"
          content={`Book appointment with Dr. ${doctorInfo?.name}, a ${doctorInfo?.specialization?.join(", ")} in ${doctorInfo?.clinic?.[0]?.city || "India"}. Experience: ${doctorInfo?.experience} years. Languages: ${doctorInfo?.language?.join(", ")}.`}
        />
        <meta name="keywords" content={`Dr. ${doctorInfo?.name}, ${doctorInfo?.specialization?.join(", ")}, Doctor in ${doctorInfo?.clinic?.[0]?.city || "India"}, Online doctor consultation, Book doctor appointment`} />
        <meta property="og:title" content={`Dr. ${doctorInfo?.name} - Online Consultation`} />
        <meta property="og:description" content={`Consult Dr. ${doctorInfo?.name}, specialist in ${doctorInfo?.specialization?.join(", ")}. ₹${doctorInfo?.fees} fees. Verified by Aarsh Repro Health.`} />
        <meta property="og:image" content={doctorInfo?.profilePic} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://www.aarshreprohealth.com/doctor/${doctorInfo?._id}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.aarshreprohealth.com/doctor/${doctorInfo?._id}`} />
      </Head>
      <div className="w-full">
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
                  <div className=" px-6 py-6 rounded-lg shadow mb-5">
                    <h3 className="mb-4 text-[var(--listText)]">
                      Doctor’s Information
                    </h3>

                    {/* Card Section */}
                    <div className="bg-[var(--White)] rounded-xl p-6 flex flex-col lg:flex-row gap-6  ">
                      {/* Left: Doctor Image */}
                      {doctorInfo?.profilePic ? (
                        <div className="w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0 mx-auto lg:mx-0 bg-[var(--White)] rounded-full border">
                          <Image
                            src={doctorInfo?.profilePic}
                            alt="Doctor"
                            width={160}
                            height={160}
                            className="rounded-full object-contain h-full w-full"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0 mx-auto lg:mx-0 bg-gray-200 rounded-full flex justify-center items-center">
                          <HiMiniUserCircle className="w-full h-full text-gray-100" />
                        </div>
                      )}

                      {/* Right: Doctor Details */}
                      <div className="flex-1 text-center lg:text-left">
                        {/* Top Row: Share Button (Right Aligned) */}


                        <div className="flex flex-col md:flex-col items-center md:justify-center md:items-center lg:flex-row lg:justify-between mt-1">
                          <h3 className="capitalize text-[var(--listText)] font-semibold ">
                            Dr. {doctorInfo.name}
                          </h3>

                          <div className="w-[150px]">
                            {doctorInfo?.isVerifiedProfile === "Verified" ? (
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

                        {/* Specialization & Experience */}

                        {doctorInfo?.specialization.length > 0 && (
                          <p className="text-[var(--listText)] mt-2">
                            <span className="font-bold">Specialization :</span>{" "}
                            {doctorInfo?.specialization?.join(", ")}
                          </p>
                        )}
                        <p className="text-[var(--listText)]">
                          <span className="font-bold">Qualification :</span>{" "}
                          <span className="uppercase">{doctorInfo?.qualification?.degree}{", "}</span>
                          {/* <span className="capitalize">
                            {doctorInfo?.qualification?.collegeName
                              ? doctorInfo?.qualification?.collegeName
                              : ""}
                          </span> */}
                        </p>
                        <p>
                          <span className="font-bold"> Experience : </span>{doctorInfo.experience} Years{" "}
                          {/* <span className="text-gray-400">|</span> */}
                        </p>
                        {doctorInfo?.language?.length > 0 && (
                          <p className="text-[var(--listText)] ">
                            <span className="font-bold">
                              Language :{" "}
                            </span>{doctorInfo?.language?.join(", ")}
                          </p>
                        )}
                        <p className="text-[var(--listText)]">
                          <span className="font-bold"> Consultation Fees : </span>₹ {doctorInfo?.fees}
                        </p>
                        {/* 
                      <p className="text-[var(--listText)] text-sm  flex gap-2 items-center justify-center lg:justify-start capitalize ">
                       <span className="font-bold"> Degree :</span>{" "}
                        <span className="uppercase ">
                          {" "}
                          {doctorInfo?.qualification?.degree}
                          {", "}
                          <span className="capitalize">
                            {doctorInfo?.qualification?.collegeName
                              ? doctorInfo?.qualification?.collegeName
                              : ""}
                          </span>
                        </span>
                       
                      </p> */}


                        {/* Assured & Rating */}

                        <div className="flex flex-row items-center justify-center lg:justify-start gap-3 mt-3 capitalize">


                          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-500 px-3 py-1 rounded-full text-xs font-medium">
                            <FaThumbsUp />
                            {doctorInfo?.ratingPercentage}% (
                            {doctorInfo?.totalReviews} Patients)
                          </div>
                        </div>
                      </div>
                    </div>
                    <TabsComponent
                      doctorInfo={doctorInfo}
                      setDoctorInfo={setDoctorInfo}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </div>
                )}
              </div>

              {/* Right Section (col-span-4) - Appointment Selection */}
              <div className="col-span-12 lg:col-span-5">
                {loading ? (
                  <div className=" px-6 py-6 rounded-lg shadow">
                    <div className="h-5 w-48 bg-gray-300 rounded mb-4 animate-pulse" />
                    <div className="flex bg-gray-100 rounded-lg shadow-md w-full p-3 animate-pulse">
                      {[...Array(2)].map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 w-full border-r last:border-r-0 p-2"
                        >
                          <div className="h-4 w-4 bg-gray-300 rounded-full" />
                          <div className="flex flex-col w-full">
                            <div className="h-4 w-3/4 bg-gray-300 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="h-5 w-48 bg-gray-300 rounded mb-3 mt-3 animate-pulse" />
                    <div className="flex overflow-x-auto whitespace-nowrap bg-gray-100 rounded-lg shadow-md px-2 py-4 scrollbar-hide animate-pulse">
                      {Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="flex flex-col rounded-md border border-gray-300 bg-white p-3 mx-2 min-w-[180px] max-w-[200px]"
                          >
                            <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
                            <div className="flex justify-between gap-2 mt-2">
                              <div className="h-4 w-16 bg-gray-300 rounded" />
                              <div className="h-4 w-20 bg-gray-300 rounded" />
                            </div>
                          </div>
                        ))}
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
                  <div className="col-span-12 lg:col-span-5">
                    <div className="px-6 py-6 rounded-lg shadow">
                      {/* Step 1: Choose Appointment Type */}
                      <h3 className="mb-3 text-[var(--listText)] text-sm font-medium">Choose Appointment Type</h3>
                      <div className="flex overflow-x-auto gap-3 scrollbar-hide">
                        {options.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)}
                            className={`cursor-pointer min-w-[120px] px-4 py-3 rounded-md border text-center text-sm font-medium shadow-sm transition-all duration-300 ${selectedOption === option.id
                              ? "bg-[var(--lightBlue)] text-white border-[var(--lightBlue)]"
                              : "bg-white hover:bg-gray-100 text-gray-800"
                              }`}
                          >
                            {option.title}
                          </div>
                        ))}
                      </div>

                      {/* Step 2: Choose Clinic (only for In-person) */}
                      {selectedOption === "Inpersonal" && (
                        <>
                          <h3 className="mt-6 mb-3 text-[var(--listText)] text-sm font-medium">Choose Clinic</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {doctorInfo?.clinic?.map((hospital) => (
                              <div
                                key={hospital._id}
                                onClick={() => {
                                  setSelectedClinic(hospital._id);
                                  getSlotsBySelectedClinic(hospital._id);
                                }}
                                className={`cursor-pointer border rounded-md p-4 shadow-sm transition duration-300 ${selectedClinic === hospital._id
                                  ? "bg-[var(--lightBlue)] text-white border-[var(--lightBlue)]"
                                  : "hover:bg-gray-50 text-gray-800"
                                  }`}
                              >
                                <p className="text-sm font-medium">{hospital.clinicName}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Step 3: Choose Time Slot */}
                      <h3 className="mt-6 mb-3 text-[var(--listText)] text-sm font-medium">Choose Time Slot</h3>
                      <TimeSlotSelection
                        loading={loading}
                        setLoading={setLoading}
                        selectedOption={selectedOption}
                        id={selectedSlotData.doctorId}
                        selectedClinic={selectedClinic}
                        setSelectedClinic={setSelectedClinic}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        slotsData={slotsData}
                        selectedClinicSlotDetail={selectedClinicSlotDetail}
                        setSelectedClinicSlotDetail={setSelectedClinicSlotDetail}
                        selectedTimeSlot={selectedTimeSlot}
                        setSelectedTimeSlot={setSelectedTimeSlot}
                        selectedSlotData={selectedSlotData}
                        setSelectedSlotData={setSelectedSlotData}
                      />

                      {/* Step 4: Continue Button */}
                      {navigateLoading ? (
                        <div className="flex justify-center mb-4">
                          <svg
                            className="animate-spin h-6 w-6 text-[var(--lightBlue)]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <circle
                              className="opacity-25"
                              cx="24"
                              cy="24"
                              r="20"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M24 4a20 20 0 0120 20h-4a16 16 0 00-16-16V4z"
                            />
                          </svg>

                        </div>
                      ) : (<button
                        onClick={handleNavigate}
                        className="w-full mt-2 bg-[var(--lightBlue)] text-white font-semibold py-3 rounded-md hover:opacity-90 transition"
                        disabled={navigateLoading}
                      >
                        Continue
                      </button>)}



                    </div>
                  </div>

                )}
              </div>

              {/* <div className="col-span-12 md:col-span-4"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default DoctorDetail;
