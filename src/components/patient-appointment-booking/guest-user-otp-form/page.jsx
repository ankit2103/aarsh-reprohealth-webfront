"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { registerGuestUSerResendOtp } from "../../../utils/user/user.util";

const GuestUserOtpForm = ({
  step,
  setStep,
  contact,
  contactOtp,
  setContactOtp,
  handleSubmitOtp,
}) => {
  const [receivePromo, setReceivePromo] = React.useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [isCounting, setIsCounting] = useState(true);
  const [loading, setLoading] =useState(false);

  const handleChangeNo = (e) => {
    e.preventDefault();
    setStep("contact");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactOtp.length !== 6) {
      toast.success("Please enter a valid 6-digit OTP");
      return;
    }

    handleSubmitOtp(); // 🔁 call parent handler
  };
  const handleResendOtp = async (event) => {
    event.preventDefault();
    console.log("Resend Verifying OTP:");
    setMinutes(0);
    setSeconds(30);
    try {
      // if (!.contact) {
      //   console.log("Error: User ID is missing when verifying OTP.");
      //   return;
      // }

      const resendOtpData = {
        contact: contact,
      };
      setLoading(true);
      console.log("resendOtpData before send:", resendOtpData);

      const result = await registerGuestUSerResendOtp(resendOtpData);

      if (result?.code === 200) {
        setLoading(false);
        toast.success(result?.message || "opt sent Successfully");
        // console.log("opt sent Successfully:", result);
      } else {
        setLoading(false);
        toast.error(result.message);
      }
    } catch (error) {
      console.log(
        "Something went wrong. Please try again in otp-verify.",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!isCounting) return;

    const interval = setInterval(() => {
      //decrease if seconds is greater than 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      //when seconds reach 0 , then  decrease minutes if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          //stop the countdown when both minutes and seconds ar 0
          clearInterval(interval);
        } else {
          // Reset seconds to 59 and decrease minutes by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      //cleanup: stop the interval when component unmounts
      clearInterval(interval);
    };
  }, [isCounting, seconds, minutes]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md"
    >
      <p className="text-sm mb-2">We have sent you an OTP on</p>
      <div className="flex items-center gap-2 mb-4">
        <span className="font-semibold text-gray-800">{contact}</span>
        <button
          type="button"
          onClick={handleChangeNo}
          className="text-[var(--lightBlue)] text-sm underline"
        >
          ✎
        </button>
      </div>

      <label
        htmlFor="otp"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        OTP
      </label>
      <input
        type="text"
        id="otp"
        name="otp"
        maxLength={6}
        pattern="\d{6}"
        required
        value={contactOtp}
        onChange={(e) => setContactOtp(e.target.value)}
        placeholder="Please enter the 6 digit OTP here to verify"
        className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)] text-sm mb-3"
      />

      {/* <div className="flex justify-between items-center text-xs text-[var(--lightBlue)] mb-3">
        <button type="button" className="hover:underline">Get via call</button>
        <button type="button" className="hover:underline">
          Resend OTP
        </button>
      </div> */}

      {/* <div className="flex items-center mb-4">
        <input
          id="promo"
          type="checkbox"
          checked={receivePromo}
          onChange={(e) => setReceivePromo(e.target.checked)}
          className="mr-2 accent-[var(--lightBlue)] "//custom-checkbox
        />
        <label htmlFor="promo" className="text-sm text-gray-700 text-wrap">
          Receive relevant offers and promotional communication from AarshReproHealth
        </label>
      </div> */}
      <div className="w-[100%] flex justify-between  pb-2 ">
        <p>
          Time Remaining:{" "}
          <strong>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </strong>
        </p>
        <button
          disabled={seconds > 0 || minutes > 0}
          onClick={handleResendOtp}
          className={`${
            seconds > 0 || minutes > 0 ? "text-[var(--black)]" : "text-black"
          } border-none cursor-pointer underline `}
        >
          Resend OTP
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--lightBlue)] text-white py-4 px-4 rounded-lg transition cursor-pointer"
      >
        Continue To Booking
      </button>
    </form>
  );
};

export default GuestUserOtpForm;

// 'use client';
// import { useState } from 'react';

// const GuestUserOtpForm = () => {
//      const [otp, setOtp] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('+916266344405');
//   const [receivePromo, setReceivePromo] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('OTP:', otp);
//     console.log('Receive Promo:', receivePromo);
//     // Add OTP verification logic here
//   };

//   return (
//    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
//       <p className="text-sm mb-2">We have sent you an OTP on</p>
//       <div className="flex items-center gap-2 mb-4">
//         <span className="font-semibold text-gray-800">{phoneNumber}</span>
//         <button type="button" className="text-[var(--lightBlue)] text-sm underline">✎</button>
//       </div>

//       <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
//       <input
//         type="text"
//         id="otp"
//         name="otp"
//         maxLength={6}
//         pattern="\d{6}"
//         required
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         placeholder="Please enter the 6 digit OTP here to verify"
//         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)] text-sm mb-3"
//       />

//       <div className="flex justify-between items-center text-xs text-[var(--lightBlue)] mb-3">
//         <button type="button" className="hover:underline">Get via call</button>
//         <button type="button" className="hover:underline">Resend OTP</button>
//       </div>

//       <div className="flex items-center mb-4">
//         <input
//           id="promo"
//           type="checkbox"
//           checked={receivePromo}
//           onChange={(e) => setReceivePromo(e.target.checked)}
//           className="mr-2"
//         />
//         <label htmlFor="promo" className="text-sm text-gray-700 text-wrap">
//           Receive relevant offers and promotional communication from Practo
//         </label>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-[var(--lightBlue)] text-white py-2 px-4 rounded hover:bg-sky-600 transition"
//       >
//         Continue To Booking
//       </button>
//     </form>
//   )
// }

// export default GuestUserOtpForm
