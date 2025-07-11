// import { useRef, useState } from "react";
// import Image from "next/image";
// import { doctordetailsimg } from "../element/images";

// const TimeSlotSelection = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const dateContainerRef = useRef(null);

//   // Generate next 7 days dynamically
//   const dates = Array.from({ length: 7 }, (_, index) => {
//     const date = new Date();
//     date.setDate(date.getDate() + index);

//     let formattedDate;
//     if (index === 0) formattedDate = "Today";
//     else if (index === 1) formattedDate = "Tomorrow";
//     else
//       formattedDate = date.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       });

//     return { id: index, display: formattedDate };
//   });

//   // Sample slots for each category
//   const slots = {
//     morning: ["8:00 AM", "9:30 AM", "10:00 AM"],
//     afternoon: ["12:00 PM", "1:30 PM", "2:00 PM", "3:00 PM"],
//     evening: ["6:00 PM", "7:30 PM", "9:00 PM"],
//   };

//   // Store random slot availability using useRef (ensures it doesn't change)
//   const slotCountsRef = useRef(
//     dates.reduce((acc, item) => {
//       acc[item.id] = Math.floor(Math.random() * 10) + 1;
//       return acc;
//     }, {})
//   );

//   // Scroll function for navigation
//   const scrollDates = (direction) => {
//     if (dateContainerRef.current) {
//       const scrollAmount = 100;
//       dateContainerRef.current.scrollLeft +=
//         direction === "left" ? -scrollAmount : scrollAmount;
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-4 rounded-xl shadow-md">
//       {/* Date Selection with Scroll */}
//       <div className="relative flex items-center">
//         {/* Left Scroll Button */}
//         <button
//           onClick={() => scrollDates("left")}
//           className="absolute left-0 z-10 bg-white px-2 py-1 shadow-md rounded-full"
//         >
//           ◀
//         </button>

//         {/* Date List */}
//         <div
//           ref={dateContainerRef}
//           className="flex gap-4 overflow-x-hidden scroll-smooth whitespace-nowrap mx-8"
//         >
//           {dates.map((item) => (
//             <div
//               key={item.id}
//               className="flex flex-col items-center min-w-[80px]"
//             >
//               <button
//                 onClick={() => setSelectedDate(item.id)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium border ${
//                   selectedDate === item.id
//                     ? "bg-white border-gray-400"
//                     : "bg-gray-200 border-transparent"
//                 }`}
//               >
//                 {item.display}
//               </button>

//               {/* Slot Count Indicator */}
//               <span className="text-xs text-gray-500 mt-1">
//                 {slotCountsRef.current[item.id]} slots
//               </span>

//               {selectedDate === item.id && (
//                 <div className="w-full h-1 bg-[var(--cyanblue)] mt-1"></div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Right Scroll Button */}
//         <button
//           onClick={() => scrollDates("right")}
//           className="absolute right-0 z-10 bg-white px-2 py-1 shadow-md rounded-full"
//         >
//           ▶
//         </button>
//       </div>

//       {/* Time Slots Section */}
//       <div className="mt-4 space-y-3">
//         {/* Morning Slots */}
//         <div>
//           <div className="flex items-center gap-2">
//             <Image
//               src={doctordetailsimg.morning}
//               width={20}
//               height={20}
//               alt="Morning"
//             />
//             <h3 className="text-sm font-semibold mb-1">Morning</h3>
//           </div>
//           <div className="flex gap-3 flex-wrap">
//             {slots.morning.map((time) => (
//               <button
//                 key={time}
//                 onClick={() => setSelectedSlot(time)}
//                 className={`px-4 py-2 text-sm rounded-lg border ${
//                   selectedSlot === time
//                     ? "bg-white border-gray-400"
//                     : "bg-gray-200 border-transparent"
//                 }`}
//               >
//                 {time}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Afternoon Slots */}
//         <div>
//           <div className="flex items-center gap-2">
//             <Image
//               src={doctordetailsimg.noon}
//               width={20}
//               height={20}
//               alt="Afternoon"
//             />
//             <h3 className="text-sm font-semibold mb-1">Afternoon</h3>
//           </div>
//           <div className="flex gap-3 flex-wrap">
//             {slots.afternoon.map((time) => (
//               <button
//                 key={time}
//                 onClick={() => setSelectedSlot(time)}
//                 className={`px-4 py-2 text-sm rounded-lg border ${
//                   selectedSlot === time
//                     ? "bg-white border-gray-400"
//                     : "bg-gray-200 border-transparent"
//                 }`}
//               >
//                 {time}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Evening Slots */}
//         <div>
//           <div className="flex items-center gap-2">
//             <Image
//               src={doctordetailsimg.evening}
//               width={20}
//               height={20}
//               alt="Evening"
//             />
//             <h3 className="text-sm font-semibold mb-1">Evening</h3>
//           </div>
//           <div className="flex gap-3 flex-wrap">
//             {slots.evening.map((time) => (
//               <button
//                 key={time}
//                 onClick={() => setSelectedSlot(time)}
//                 className={`px-4 py-2 text-sm rounded-lg border ${
//                   selectedSlot === time
//                     ? "bg-white border-gray-400"
//                     : "bg-gray-200 border-transparent"
//                 }`}
//               >
//                 {time}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeSlotSelection;
import { useRef, useState } from "react";
import Image from "next/image";
import { doctordetailsimg } from "../element/images";

const TimeSlotSelectionE = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const dateContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Generate next 7 days dynamically
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    let formattedDate;
    if (index === 0) formattedDate = "Today";
    else if (index === 1) formattedDate = "Tomorrow";
    else
      formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

    return { id: index, display: formattedDate };
  });

  // Sample slots for each category
  const slots = {
    evening: ["5:15 PM", "5:30 PM", "7:00 PM", "7:30PM", "8:30PM", "9:15PM"],
    
  };

  // Store random slot availability using useRef (ensures it doesn't change)
  const slotCountsRef = useRef(
    dates.reduce((acc, item) => {
      acc[item.id] = Math.floor(Math.random() * 10) + 1;
      return acc;
    }, {})
  );

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

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-md">
      {/* Date Selection with Scroll (Mouse/Touch) */}
      <div
        ref={dateContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth whitespace-nowrap mx-0"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          scrollbarWidth: "none", // Firefox
          WebkitOverflowScrolling: "touch", // iOS momentum scrolling
          msOverflowStyle: "none", // IE and Edge
          // "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari, Opera
        }}
      >
        {dates.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center min-w-[80px]"
          >
            <button
              onClick={() => setSelectedDate(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                selectedDate === item.id
                  ? "bg-white border-gray-400"
                  : "bg-gray-200 border-transparent"
              }`}
            >
              {item.display}
            </button>

            {/* Slot Count Indicator */}
            <span className="text-xs text-gray-500 mt-1">
              {slotCountsRef.current[item.id]} slots
            </span>

            {selectedDate === item.id && (
              <div className="w-full h-1 bg-[var(--cyanblue)] mt-1"></div>
            )}
          </div>
        ))}
      </div>

      {/* Time Slots Section */}
      <div className="mt-4 space-y-3">
        {/* Morning Slots */}
        {/* <div>
          <div className="flex items-center gap-2">
            <Image
              src={doctordetailsimg.morning}
              width={20}
              height={20}
              alt="Morning"
            />
            <h3 className="text-sm font-semibold mb-1">Morning</h3>
          </div>
          <div className="flex gap-3 flex-wrap">
            {slots.morning.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedSlot(time)}
                className={`px-4 py-2 text-sm rounded-lg border ${
                  selectedSlot === time
                    ? "bg-white border-gray-400"
                    : "bg-gray-200 border-transparent"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div> */}

        {/* Afternoon Slots */}
        {/* <div>
          <div className="flex items-center gap-2">
            <Image
              src={doctordetailsimg.noon}
              width={20}
              height={20}
              alt="Afternoon"
            />
            <h3 className="text-sm font-semibold mb-1">Afternoon</h3>
          </div>
          <div className="flex gap-3 flex-wrap">
            {slots.afternoon.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedSlot(time)}
                className={`px-4 py-2 text-sm rounded-lg border ${
                  selectedSlot === time
                    ? "bg-white border-gray-400"
                    : "bg-gray-200 border-transparent"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div> */}

        {/* Evening Slots */}
         <div>
          <div className="flex items-center gap-2">
            <Image
              src={doctordetailsimg.evening}
              width={20}
              height={20}
              alt="Evening"
            />
            <h3 className="text-sm font-semibold mb-1">Evening</h3>
          </div>
          <div className="flex gap-3 flex-wrap">
            {slots.evening.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedSlot(time)}
                className={`px-4 py-2 text-sm rounded-lg border ${
                  selectedSlot === time
                    ? "bg-white border-gray-400"
                    : "bg-gray-200 border-transparent"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div> 
      </div>
    </div>
  );
};

export default TimeSlotSelectionE;
