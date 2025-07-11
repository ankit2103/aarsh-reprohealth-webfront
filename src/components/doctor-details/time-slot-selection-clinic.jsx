"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { doctordetailsimg } from "../element/images";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateUserOrder } from "../../redux/slice/user.slice";

const ClinicTimeSlotSelection = ({
  //   selectedOption,
  //   id,
  //   selectedClinic,
  loading,
  setLoading,
  slotsData,
  selectedDate,
  setSelectedDate,
  selectedClinicSlotDetail,
  setSelectedClinicSlotDetail,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedSlotData,
  setSelectedSlotData,
}) => {
  const dispatch = useDispatch();
  const userOrderData = useSelector((state) => state.user.x_user_order_detail);
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState({
    morning: [],
    afternoon: [],
    evening: [],
  });
  const dateContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);
  // Generate next 15 days dynamically
  const dates = Array.from({ length: slotsData.length || 15 }, (_, index) => {
    const date = new Date();
    // console.log("data today----------------",date)
    date.setDate(date.getDate() + index);

    let formattedDate;
    if (index === 0) formattedDate = "Today";
    else if (index === 1) formattedDate = "Tomorrow";
    else
      formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    // console.log("index, formattedDate:", index, formattedDate);
    return { id: index, display: formattedDate };
  });
  // convert AM/PM to 24-hour format
  const convertTo24Hour = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    hours = parseInt(hours, 10);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };
  const handleMouseDown = (e) => {
    if (dateContainerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - dateContainerRef.current.offsetLeft);
      setScrollLeft(dateContainerRef.current.scrollLeft);
    }
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !dateContainerRef.current) return;
    const x = e.pageX - dateContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    dateContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const getDateFromSelectedIndex = (index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  };

  const handleDateSelected = (selectedDateIndex) => {
    setSelectedDate(selectedDateIndex);

    const formattedDate = getDateFromSelectedIndex(selectedDateIndex); // returns YYYY-MM-DD
    // console.log("selected Date----------------", selectedDateIndex, formattedDate) //3 2025-07-01

    const updatedSlotData = {
      ...selectedSlotData,
      date: formattedDate,
      startTime: "",
      endTime: "",
    };

    // Update local state
    setSelectedSlotData(updatedSlotData);

    // Update Redux
    dispatch(updateUserOrder(updatedSlotData));
  };
  const handleSlotSelect = (time) => {
  console.log("slot time---------------------", time);

  const selectedSlotObj = availableSlots.find(
    (slot) => slot.startTime === time
  );

  if (!selectedSlotObj) return;

  // If the clicked slot is already selected, unselect it
  if (
    selectedTimeSlot &&
    selectedTimeSlot.startTime === selectedSlotObj.startTime &&
    selectedTimeSlot.endTime === selectedSlotObj.endTime
  ) {
    setSelectedTimeSlot(null);
    setSelectedSlotData((prev) => {
      const updated = {
        ...prev,
        startTime: null,
        endTime: null,
      };
      dispatch(updateUserOrder(updated));
      return updated;
    });
    return;
  }

  // Otherwise, select the new slot
  setSelectedTimeSlot({
    startTime: selectedSlotObj.startTime,
    endTime: selectedSlotObj.endTime,
  });

  setSelectedSlotData((prev) => {
    const updated = {
      ...prev,
      startTime: selectedSlotObj.startTime,
      endTime: selectedSlotObj.endTime,
    };

    dispatch(updateUserOrder(updated));
    return updated;
  });
};





  useEffect(() => {
    if (slotsData && slotsData.length > 0) {
      const slotDetail = slotsData[selectedDate];
      // console.log(
      //   "slotDetail--------------",
      //   slotDetail,
      //   slotDetail?.availableSlots
      // );
      if (slotDetail) {
        setSelectedClinicSlotDetail(slotDetail);
        setAvailableSlots(slotDetail.availableSlots || []);
      }
    }
  }, [selectedDate]);
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
    <div className="bg-white  rounded-xl  mt-2">
      {/* Date Selection with Scroll (Mouse/Touch) */}
      <div
        ref={dateContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth whitespace-nowrap mx-0 scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {dates.map((item) => {
          const matchingSlot = slotsData.find(
            (slot) => slot.date === getDateFromSelectedIndex(item.id)
          );
          
          return (
            <div
              key={item.id}
              className="flex flex-col items-center min-w-[80px]"
            >
              <button
                onClick={() => handleDateSelected(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                  selectedDate === item.id
                    ? "text-white bg-[var(--lightBlue)]"
                    : "bg-[var(--White)] border-gray-400 text-[var(--listText)]"
                }`}
              >
                {item.display}
              </button>
              {matchingSlot && (
                <span className="text-xs text-[var(--listText)] mt-1">
                  {matchingSlot.totalAvailable} slots
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Time Slots Section */}
      <div className="mt-4 space-y-3">
        {/* Time Slot Sections */}
        {["morning", "afternoon", "evening"].map((period) => (
          <div key={period} className="mt-4">
            <div className="flex items-center gap-2 mb-1">
              <Image
                src={doctordetailsimg[period]} // assuming keys: morning, noon, evening
                width={20}
                height={20}
                alt={period.charAt(0).toUpperCase() + period.slice(1)}
              />
              <h3 className="text-sm font-semibold capitalize">
                {period === "afternoon"
                  ? "Afternoon "
                  : period.charAt(0).toUpperCase() + period.slice(1)}
              </h3>
            </div>
            <div className="flex gap-3 flex-wrap">
              {slots[period] && slots[period].length > 0 ? (
                slots[period].map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => {
                      if (selectedSlot === slot._id) {
                        setSelectedSlot(null); // Unselect if already selected
                        handleSlotSelect(null); // You can modify this function to handle null if needed
                      } else {
                        setSelectedSlot(slot._id);
                        handleSlotSelect(slot.startTime);
                      }
                    }}
                    // onClick={() => {
                    //   setSelectedSlot(slot?._id);
                    //   handleSlotSelect(slot.startTime);
                    // }}
                    className={`px-4 py-2 text-sm rounded-lg border transition ${
                      selectedSlot === slot._id
                        ? // userOrderData?.startTime === slot.startTime
                          " border-[var(--lightBlue)] text-[var(--lightBlue)]"
                        : "bg-gray-100 border-transparent"
                    }`}
                  >
                    {slot.startTime}
                  </button>
                ))
              ) : (
                <p className="px-4 py-2  text-sm rounded-lg  text-gray-500  bg-gray-100 border-transparent">
                  No slots available
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicTimeSlotSelection;
