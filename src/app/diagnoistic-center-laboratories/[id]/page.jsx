"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
// import TabsComponent from "../../components/doctor-details/tab-component";
import TimeSlotSelection from "../../../components/doctor-details/time-slot-selection";
import imgg from "../../../components/element/logoPathkind.png";
import { useParams, useRouter } from "next/navigation";
import TimeSlotSelectionM from "../../../components/doctor-details/time-slot-selection-morning";
import TimeSlotSelectionE from "../../../components/doctor-details/time-slot-selection-evening";
import TabsComponentLab from "../../../components/doctor-details/tab-component-lab";
import { fetchLabById, fetchLabSlot } from "../../../utils/lab/lab.util";
import AppointmentBooking from "../../../components/razorpaybutton";
import { DateRange } from "../../../components/generate-lab-time-slots/page";
import { useDispatch } from "react-redux";
import { updateUserOrder } from "../../../redux/slice/user.slice";
import { toast } from "react-toastify";
import { doctordetailsimg } from "../../../components/element/images";
import { useAuthenticated } from "../../../hooks/useAuthenticated.hook";
import Head from "next/head";

const LabSEO = ({ labData }) => {
  const lab = labData?.data;

  const ratingValue = lab?.ratingPercentage
    ? (lab.ratingPercentage / 20).toFixed(1)
    : "4.0";

  return (
    <Head>
      <title>{`${lab?.name} in ${lab?.address?.locality}, ${lab?.address?.city} | Aarsh Reprohealth`}</title>
      <meta
        name="description"
        content={lab?.description?.replace(/<[^>]+>/g, " ")?.slice(0, 160) || "Trusted diagnostic centre near you"}
      />
      <meta name="robots" content="index, follow" />
      <link
        rel="canonical"
        href={`https://www.aarshreprohealth.com/labs/${lab?._id}`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: lab?.name,
            description: lab?.description?.replace(/<[^>]+>/g, " "),
            image: lab?.labPics?.[0],
            address: {
              "@type": "PostalAddress",
              addressLocality: lab?.address?.locality,
              addressRegion: lab?.address?.state,
              addressCountry: "IN",
              postalCode: lab?.address?.pincode
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              opens: lab?.availabilitySchedule?.openingTime,
              closes: lab?.availabilitySchedule?.closingTime
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: ratingValue,
              reviewCount: lab?.totalReviews || lab?.reviewsArray?.length || 1
            },
            review:
              lab?.reviewsArray?.map((r) => ({
                "@type": "Review",
                author: {
                  "@type": "Person",
                  name: r?.userName
                },
                datePublished: new Date(r?.date).toISOString(),
                reviewBody: r?.comment,
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: r?.rating
                }
              })) || [],
            availableService: lab?.testDetails?.map((test) => ({
              "@type": "MedicalTest",
              name: test?.testName?.name,
              estimatedDuration: test?.estimatedTime,
              offers: {
                "@type": "Offer",
                price: test?.testPrice,
                priceCurrency: "INR"
              },
              homeSample: test?.homeSampleCollection ? "Yes" : "No"
            }))
          })
        }}
      />
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

const LabDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useAuthenticated();
  const router = useRouter();
  const dateRange = DateRange();

  const [labData, setLabData] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("lab");
  const options = [
    { id: "lab", title: "Lab Visit", homeSampleCollection: false },
    { id: "home", title: "Home Visit", homeSampleCollection: true },
  ];
  const [filteredTests, setFilteredTests] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({
    startTime: "",
    endTime: "",
  });
  const [slots, setSlots] = useState({
    morning: [],
    afternoon: [],
    evening: [],
  });
  const [labSlotData, setLabSlotData] = useState({
    allSlot: null,
    labVisitSlotData: [],
    homeVisitSlotData: [],
  }); //set from api response
  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDate, setAvailableDate] = useState("");

  const [availableSlots, setAvailableSlots] = useState([]);

  // inside your component
  const {
    containerRef: dateContainerRef,
    eventHandlers: dateDragHandlers,
  } = useDraggableScroll();

  const {
    containerRef: timeContainerRef,
    eventHandlers: timeDragHandlers,
  } = useDraggableScroll();

  // console.log("labData dateRange--------------------", dateRange, labSlotData?.labVisitSlotData);

  function stripHtml(htmlString) {
    if (!htmlString) return ""; // fallback for undefined/null
    return htmlString.replace(/<[^>]*>/g, "");
  }

  const handleOptionChange = (optionId) => {
    if (selectedOption !== optionId) {
      // Reset common states on switch
      setSelectedDate(getDateFromSelectedIndex(0));
      setSelectedTest([]);
      setSelectedTestId([]);
    }
    setSelectedOption(optionId);
  };

  const handleSelectTest = (testNameId) => {
    // console.log("lab testId_______________________", testNameId, filteredTests);
    setSelectedSlot(null);
    setSelectedTestId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setSelectedTest((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (t) => t.testName._id === testNameId
      );

      if (isAlreadySelected) {
        // Remove the test from selectedTests
        return prevSelected.filter((t) => t.testName._id !== testNameId);
      } else {
        // Find the full test object from filteredTests
        const testToAdd = filteredTests.find(
          (t) => t.testName._id === testNameId
        );
        return testToAdd ? [...prevSelected, testToAdd] : prevSelected;
      }
    });
  };
  const dates = useMemo(() => {
    const sourceData =
      selectedOption === "lab"
        ? labSlotData?.labVisitSlotData
        : labSlotData?.homeVisitSlotData;
    // console.log("sourceData-------------------------", sourceData)
    return (
      sourceData?.map((item, index) => {
        const dateObj = new Date(item.date);

        let formattedDate;
        if (index === 0) formattedDate = "Today";
        else if (index === 1) formattedDate = "Tomorrow";
        else {
          formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }

        return {
          id: index,
          display: formattedDate,
          date: item.date, // used for slot filtering
        };
      }) || []
    );
  }, [selectedOption, labSlotData]);

  const getDateFromSelectedIndex = (index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  };
  const handleSelectDate = (selectedDateIndex) => {
    // console.log("selectedDateIndex--------", selectedDateIndex);
    const formattedDate = getDateFromSelectedIndex(selectedDateIndex); // returns YYYY-MM-DD
    // console.log("formattedDate", formattedDate);
    setSelectedDate(formattedDate);
  };
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") hours = "00";
    if (modifier === "PM") hours = parseInt(hours, 10) + 12;

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };
  const handleSlotSelect = (time) => {
    const selectedSlot = availableSlots.find((slot) => slot.startTime === time);

    if (!selectedSlot) return;

    setSelectedTimeSlot({
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    });
  };
  const handleNavigate = () => {
    // console.log("selectedSlot---------------", selectedSlot);
    const { startTime, endTime } = selectedSlot || {};
    if (
      selectedTest.length > 0 &&
      selectedDate &&
      selectedSlot &&
      selectedTestId.length > 0 &&
      id &&
      startTime &&
      endTime
    ) {

      dispatch(
        updateUserOrder({
          selectedTest,
          labId: id,
          date: selectedDate,
          selectedSlot,
          tests: selectedTestId,
          startTime,
          endTime,
        })
      );
      // toast.success("Appointment details saved!");
      router.push("/patient-appointment-detail");

    } else {
      toast.error("Some required fields are missing");
      console.warn("Some required fields are missing");
      // Optionally show a toast or message to the user
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchDetailById = async () => {
      try {
        const result = await fetchLabById({ labId: id });
        console.log(
          "Lab detail by id api response id:",
          result
        );
        if (result?.code === 200) {
          setLabData(result?.data);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.log("Error in api response of Lab Detail:", error);
      }
    };
    fetchDetailById();
  }, []);
  useEffect(() => {
    if (!id) return;
    const fetchLabSlotById = async () => {
      try {
        const result = await fetchLabSlot({ labId: id });
        // console.log(
        //   "Lab slot detail by id api response id:",
        //   result?.data,
        //   result?.data?.next15Days,
        //   result?.data?.PatientTimeAvailability
        // );

        setLabSlotData({
          allSlot: result?.data,
          labVisitSlotData: result?.data?.next15Days || [],
          homeVisitSlotData: result?.data?.PatientTimeAvailability || [],
        });
      } catch (error) {
        console.log("Error in api response of Lab slot:", error);
      }
    };
    fetchLabSlotById();
  }, []);
  useEffect(() => {
    if (!labData?.testDetails) return;

    const filtered = labData.testDetails.filter((test) => {
      if (selectedOption === "lab") return test.homeSampleCollection === false;
      if (selectedOption === "home") return test.homeSampleCollection === true;
      return true;
    });

    setFilteredTests(filtered);
  }, [selectedOption, labData]);
  useEffect(() => {
    const ids = [
      ...new Set(
        selectedTest.map((test) => test.testName?._id).filter(Boolean)
      ),
    ];
    setSelectedTestId(ids);
    setSelectedDate(getDateFromSelectedIndex(0));
    // Reset slot selection when selectedTest changes
    setSelectedSlot(null);
    setSelectedTimeSlot({ startTime: "", endTime: "" });
  }, [selectedTest]);
  useEffect(() => {
    const sourceData =
      selectedOption === "lab"
        ? labSlotData?.labVisitSlotData
        : labSlotData?.homeVisitSlotData;

    if (selectedDate && sourceData?.length) {
      const matched = sourceData.find((item) => item.date === selectedDate);
      const slots = matched?.slots || [];

      setTimeSlots(slots);
      setAvailableSlots(slots);
    } else {
      setTimeSlots([]);
      setAvailableSlots([]); // ✅ reset if nothing found
    }
  }, [selectedOption, selectedDate, labSlotData]);
  useEffect(() => {
    const morning = [];
    const afternoon = [];
    const evening = [];

    availableSlots.forEach((slot) => {
      const hour = new Date(
        `1970-01-01T${convertTo24Hour(slot.startTime)}:00`
      ).getHours();

      if (hour < 12) {
        morning.push(slot);
      } else if (hour >= 12 && hour < 17) {
        afternoon.push(slot);
      } else {
        evening.push(slot);
      }
    });

    setSlots({ morning, afternoon, evening });
  }, [availableSlots]);

  return (
    <>
      <LabSEO labData={labData} />
      <div className="w-full ">
        <div className="main-container border">
          <div className="container mx-auto mt-20 lg:mt-24 ">
            {/* Grid Layout */}

            <div key={labData._id} className="grid grid-cols-12 gap-8 mt-10">
              {/* Left Section (col-span-8) */}
              <div className="col-span-12 lg:col-span-7">
                {/* Heading */}

                {/* Card Section */}
                {loading ? (
                  // skeleton of Card
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
                    <h3 className="mb-4 text-[var(--listText)] ">
                      Laboratory Information
                    </h3>
                    <div className="bg-[var(--White)] rounded-xl p-6 flex flex-col lg:flex-row gap-6 ">
                      {/* Left: Doctor Image */}
                      {labData?.labPics?.[0] ? (
                        <div className="w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0 mx-auto lg:mx-0 bg-gray-300 rounded-full  ">
                          <Image
                            src={labData?.labPics?.[0] || imgg}
                            alt="Doctor"
                            width={160}
                            height={160}
                            className="rounded-full object-cover h-full w-full"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0 mx-auto lg:mx-0 bg-gray-300 rounded-full flex justify-center items-center">
                          <HiMiniUserCircle className="w-full h-full text-gray-400" />
                        </div>
                      )}

                      {/* Right: Doctor Details */}
                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex flex-col lg:flex-row lg:justify-between mt-1">
                          <h3 className=" text-[var(--listText)]">
                            {labData?.name}
                          </h3>
                          <div className="uppercase flex items-center gap-2 bg-green-100 text-[var(--applegreen)] px-3 py-2 rounded-full text-xs font-medium">
                            <FaCheckCircle className="text-base" />
                            AARSH VERIFIED
                          </div>
                        </div>

                        {/* Specialization & Experience */}
                        <p className="text-gray-700 text-sm mt-3 flex items-center justify-center lg:justify-start ">
                          {labData?.address?.locality || null},{" "}
                          {labData?.address?.city}, {labData?.address?.state},{" "}
                          {labData?.address?.pincode}
                        </p>

                        {/* College & Degree */}

                        <p className="text-gray-600 text-sm mt-3">
                          {stripHtml(
                            isExpanded
                              ? labData?.description
                              : labData?.description?.slice(0, 140)
                          )}
                          {!isExpanded &&
                            labData?.description?.length > 100 &&
                            ""}{" "}
                          <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[var(--cyanblue)] font-semibold  cursor-pointer text-sm"
                          >
                            {isExpanded ? "View Less" : "View More..."}
                          </button>
                        </p>

                        {/* Assured & Rating */}
                        <div className="flex flex-row items-center justify-center lg:justify-start gap-3 mt-3">
                          {/* <div className="uppercase flex items-center gap-2 bg-green-100 text-[var(--applegreen)] px-3 py-1 rounded-full text-xs font-medium">
                          <FaCheckCircle />
                          AARSH VERIFIED
                        </div> */}
                          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-500 px-3 py-2 rounded-full text-xs font-medium">
                            <FaThumbsUp />
                            {labData?.ratingPercentage}% ({labData?.totalReviews}{" "}
                            Patients)
                          </div>
                        </div>

                        {/* Expandable Bio */}
                      </div>
                    </div >
                    <TabsComponentLab labData={labData} setLabData={setLabData} loading={loading} setLoading={setLoading} />
                  </div>
                )}
              </div>

              {/* Right Section (col-span-4) - Appointment Selection */}
              <div className="col-span-12 lg:col-span-5">
                {/* First Bar - Choose Appointment Type */}
                {loading ? (
                  <>
                    <div className="h-5 w-48 bg-gray-300 rounded mb-3 animate-pulse" />
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
                  </>
                ) : (
                  <div className=" px-6 py-6 rounded-lg shadow">
                    <h3 className="mb-3 text-[var(--listText)] text-sm mt-4">
                      Choose Appointment Type
                    </h3>

                    <div className="flex bg-[] rounded-lg shadow-md w-full p-3">
                      {options.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center gap-2 w-full border-r last:border-r-0 cursor-pointer p-2"
                        >
                          <input
                            type="radio"
                            name="appointment"
                            value={option.id}
                            checked={selectedOption === option.id}
                            onChange={() => handleOptionChange(option.id)}
                            className="h-4 w-4 text-[var(--cyanblue)] focus:ring-[var(--cyanblue)]"
                          />
                          <div className="flex flex-col">
                            <h3 className="text-[var(--black)] text-sm font-medium">
                              {option.title}
                            </h3>
                          </div>
                        </label>
                      ))}
                    </div>
                    <h3 className="mb-3 text-[var(--listText)] text-sm mt-4">
                      Choose Available Test
                    </h3>
                    <div
                      ref={dateContainerRef}
                      {...dateDragHandlers}
                      className="flex overflow-x-auto whitespace-nowrap bg-[var(--White)]  px-2  scrollbar-hide"
                    >
                      <label className="  flex items-center  gap-2 w-full  cursor-pointer py-2 ">
                        {filteredTests.map((test) => {
                          const isSelected = selectedTest.some(
                            (t) => t.testName._id === test.testName._id
                          );

                          return (
                            <div
                              key={test._id}
                              onClick={() =>
                                handleSelectTest(test?.testName?._id)
                              }
                              className={`flex flex-col rounded-md border p-2 cursor-pointer transition  ${isSelected
                                  ? "bg-[var(--lightBlue)] text-[var(--White)] border-[var(--lightBlue)]"
                                  : "border-gray-300 bg-[var(--White)]"
                                }`}
                            >
                              <h3
                                className={`text-sm font-medium ${isSelected
                                    ? "bg-[var(--lightBlue)] text-[var(--White)] border-[var(--lightBlue)]"
                                    : "border-gray-300 text-black "
                                  }`}
                              >
                                {test.testName?.name || "Test Name"}
                              </h3>
                              <div className="flex justify-between gap-2">
                                <p
                                  className={`text-sm font-medium ${isSelected
                                      ? "bg-[var(--lightBlue)] text-[var(--White)] border-[var(--lightBlue)]"
                                      : "border-gray-300 text-[var(--cyanblue)] "
                                    }`}
                                >
                                  ₹ {test.testPrice}
                                </p>
                                <p
                                  className={`text-sm font-medium ${isSelected
                                      ? "bg-[var(--lightBlue)] text-[var(--White)] border-[var(--lightBlue)]"
                                      : "border-gray-300 text-[var(--cyanblue)] "
                                    }`}
                                >
                                  Reports In: {test.estimatedTime}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </label>
                    </div>

                    {selectedTest.length > 0 && (
                      <>
                        <h3 className="mb-4 text-[var(--listText)] text-sm mt-4">
                          Choose Time slot
                        </h3>

                        <div className="bg-[var(--White)] p-4 rounded-xl shadow mt-2 ">
                          <div
                            ref={timeContainerRef}
                            {...timeDragHandlers}
                            className="flex overflow-x-auto whitespace-nowrap scrollbar-hide"
                          >
                            <div className="flex gap-4">
                              {dates.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex flex-col items-center min-w-[80px]"
                                >
                                  <div
                                    onClick={() => handleSelectDate(item.id)}
                                    className={`text-sm border rounded-md px-4 py-2 font-medium text-center cursor-pointer transition-all duration-200
                                        ${selectedDate ===
                                        getDateFromSelectedIndex(item.id)
                                        ? "text-white bg-[var(--lightBlue)]"
                                        : "border-gray-400"
                                      }`}
                                  >
                                    {item.display}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 space-y-3">
                            {["morning", "afternoon", "evening"].map((period) => (
                              <div key={period} className="mt-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <Image
                                    src={doctordetailsimg[period]} // assuming keys: morning, noon, evening
                                    width={20}
                                    height={20}
                                    alt={
                                      period.charAt(0).toUpperCase() +
                                      period.slice(1)
                                    }
                                  />
                                  <h3 className="text-sm font-semibold capitalize">
                                    {period === "afternoon"
                                      ? "Afternoon "
                                      : period.charAt(0).toUpperCase() +
                                      period.slice(1)}
                                  </h3>
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                  {slots[period] && slots[period].length > 0 ? (
                                    slots[period].map((slot) => (
                                      <button
                                        key={slot._id}
                                        onClick={() => {
                                          setSelectedSlot(slot);
                                          handleSlotSelect(slot.startTime);
                                        }}
                                        className={`px-4 py-2 text-sm rounded-lg border transition ${selectedTimeSlot.startTime ===
                                            slot.startTime
                                            ? "bg-white text-[var(--lightBlue)] border-[var(--lightBlue)]"
                                            : "bg-gray-100 "
                                          }`}
                                      >
                                        {slot.startTime}
                                      </button>
                                    ))
                                  ) : (
                                    <p className="px-4 py-2  text-sm rounded-lg  text-gray-500  bg-gray-200 border-transparent">
                                      No slots available
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    <button
                      onClick={handleNavigate}
                      className="w-full my-4 bg-[var(--lightBlue)] text-white text-xs px-2 py-2 sm:px-3  sm:py-3  md:text-sm md:px-4 md:py-3 lg:px-4 lg:py-3 rounded-md "
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

export default LabDetail;

<div className="flex flex-col flex-wrap  gap-2  mt-2">
  {/* {timeSlots.map((slot, index) => (
<p  
key={index}
onClick={() => setSelectedSlot(slot)}
className={`text-sm border rounded-md p-2 cursor-pointer transition
${
selectedSlot === slot
? "bg-[var(--lightBlue)] text-[var(--White)] border-[var(--lightBlue)]"
: "bg-[var(--White)] text-[var(--greyP)] border-gray-300"
}`}
>
{slot.startTime}
</p>
))} */}
  {/* {["morning", "afternoon", "evening"].map((part) => (
<div key={part}>
<h4 className="font-semibold capitalize mb-1">{part}</h4>
<div className="flex flex-wrap gap-2">
{slots[part].length > 0 ? (
slots[part].map((slot, idx) => (
  <button
    key={idx}
    onClick={() => setSelectedSlot(slot)}
    className="px-3 py-1 border rounded text-sm bg-white shadow"
  >
    {slot.startTime}
  </button>
))
) : (
<span className="text-sm text-gray-400">
  No slots
</span>
)}
</div>
</div>
))} */}
</div>;
