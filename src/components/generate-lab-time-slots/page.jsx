"use client";
import { format, addDays } from "date-fns";

const GenerateTimeSlots = (openingTime, closingTime) => {
  const parseTime = (timeStr) => {
    const [hour, modifier] = timeStr.toLowerCase().split(' ');
    let hours = parseInt(hour);
    if (modifier === 'pm' && hours !== 12) hours += 12;
    if (modifier === 'am' && hours === 12) hours = 0;
    return hours;
  };

  const formatTime = (hour) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:00 ${ampm}`;
  };

  const slots = [];
  const startHour = parseTime(openingTime);
  const endHour = parseTime(closingTime);

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${formatTime(hour)} - ${formatTime(hour + 1)}`);
  }

  return slots;
};
export default GenerateTimeSlots;



export const DateRange = () => {
  const today = new Date();

  // Generate an array of the next 14 dates starting from today
  const generateDateRange = () => {
    return Array.from({ length: 15 }, (_, i) => {
      const date = addDays(today, i);
      return format(date, "MMM d, yyyy");  // Format it as "Month Day, Year"
    });
  };

  const dateRange = generateDateRange();

  return (dateRange);
};



