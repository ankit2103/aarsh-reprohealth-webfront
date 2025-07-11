"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { doctordetailsimg } from "../element/images";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateUserOrder } from "../../redux/slice/user.slice";

const TimeSlotSelection = ({
  loading,
  setLoading,
  selectedOption,
  id,
  selectedClinic,
  setSelectedClinic,
  selectedDate,
  setSelectedDate,
  slotsData,
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
    // console.log("index, formattedDate:", index, formattedDate)
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
    console.log("formattedDate:",formattedDate);
    // setAvailableSlots()
    setSelectedSlotData((prev) => ({
      ...prev,
      date: formattedDate, // update only the date
    }));

    // If you want to update the Redux store as well:
    dispatch(
      updateUserOrder({
        ...selectedSlotData, // previous data
        date: formattedDate,
      })
    );
  };
  const handleSlotSelect = (time) => {
    const selectedSlot = availableSlots.find((slot) => slot.startTime === time);

    // const formattedDate = getDateFromSelectedIndex(selectedSlot); // returns YYYY-MM-DD
    // console.log("formattedDate",formattedDate)
    if (!selectedSlot) return;
  
    setSelectedTimeSlot({
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    });

    const updatedSlotData = {
      ...selectedSlotData,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    };

    setSelectedSlotData(updatedSlotData);
    dispatch(updateUserOrder(updatedSlotData));
  };

  useEffect(() => {
    if (
      Array.isArray(slotsData) &&
      slotsData.length > 0 &&
      typeof selectedDate === "number" &&
      selectedDate >= 0 &&
      selectedDate < slotsData.length
    ) {
      
      const slotDetail = slotsData[selectedDate];
  
      setSelectedClinicSlotDetail(slotDetail || {});
      setAvailableSlots(slotDetail?.slots || []);
      handleDateSelected(selectedDate)
    } else {
      setSelectedClinicSlotDetail({});
      setAvailableSlots([]);
      
    }
  }, [selectedClinic, slotsData, selectedDate]);
  
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
  }, [availableSlots, selectedClinic, selectedDate]);

  
  
  // useEffect(()=>)

  console.log(
    "Time slot set---------------",
    selectedOption,
    userOrderData,
    selectedDate
  );

  return (
    <div className="bg-[var(--White)]   mt-2 ">
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
          console.log("selectedDate === item",selectedDate,item, selectedDate === item.id)
          return (
            <div
              key={item.id}
              className="flex flex-col items-center gap-2"
            >
              <button
                onClick={() => handleDateSelected(item.id)}
                className={`px-4 py-2 rounded-lg text-sm text-[var(--listText)] border ${
                selectedDate === item.id
                    ? "text-white bg-[var(--lightBlue)] border-[var(--lightBlue)]"
                    : "border  border-gray-400"
                }`}
              >
                {/* userOrderData?.date === getDateFromSelectedIndex(item.id) */}
                {item.display}
              </button>
              {/* Slot Count Indicator */}

              {matchingSlot && (
                <span className="text-xs text-gray-500 mt-1">
                  {matchingSlot.totalSlotsAvailable} slots
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
                      setSelectedSlot(slot?._id);
                      handleSlotSelect(slot.startTime);
                    }}
                    className={`px-4 py-2 text-sm rounded-lg border transition ${
                      selectedTimeSlot.startTime === slot.startTime
                        ? "text-white bg-[var(--lightBlue)] border-[var(--lightBlue)]"
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

export default TimeSlotSelection;
