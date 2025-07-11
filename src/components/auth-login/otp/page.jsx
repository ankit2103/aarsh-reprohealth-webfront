"use client";
import React, { useState, useEffect, useRef } from "react";
import Auth from "../../../api/auth/auth.api";
import { OTPInput } from "../../otp-verification/page";
import { toast } from "react-toastify";
import { logoimg } from "../../element/images";
import Image from "next/image";
import { TbArrowBackUp } from "react-icons/tb";
import { IoArrowBackSharp } from "react-icons/io5";

const OptToResetPassword = ({
  step,
  setStep,
  forgetPassswordData,
  setForgetPasswordData,
  userData,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [isCounting, setIsCounting] = useState(true); // need to set true to start count for timeout
  const inputsRef = useRef([]);

  const goback = () => {
    setStep("forgetPassword");
  };

  console.log("userdata in login otp------", userData);
  const resendOtp = async (event) => {
    event.preventDefault();
    setMinutes(0);
    setSeconds(30);

    try {
      const userInfo = {
        id: userData?.user?._id,
        email: userData?.user?.email,
        contact: userData?.user?.contact,
      };
      const result = await Auth.resendOtp(userInfo);

      if (result?.code === 200) {
        toast.success(result?.message || "OTP Resent Successfully");
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setOtpData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOtpInputChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Allow only numbers
    if (value.length > 1) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    setForgetPasswordData((prev) => ({
      ...prev,
      otp: newOtp.join(""), // Correctly updating the OTP value
    }));

    // Move to next input if filled
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const reqBody = forgetPassswordData;

      const result = await Auth.verifyOtpToResetPassword(reqBody);

      if (result?.status === "success") {
        toast.success(result?.message);
        setForgetPasswordData((prevData) => ({
          ...prevData,
          id: result?.data?.user?._id || "",
        }));
        setStep("createPassword");
      }
    } catch (error) {
      console.log("error in otp to reset password:", error);
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
          setDisabled(true);
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
    <div className=" ">
      <div className="w-[90%] flex justify-center items-center mx-auto py-6 h-[90vh]">
        <div className="flex items-start gap-2 sm:gap-4">
          {/* <div onClick={() => router.push("/")} className="mt-2">
            <IoArrowBackSharp className="inline text-lg sm:text-2xl font-bold text-[var(--black)] cursor-pointer" />
          </div> */}
          <div className="flex flex-col justify-start">
            <div className="w-full flex items-center justify-center ">
              <div
                onClick={() => router.push("/")}
                className="cursor-pointer pt-2 "
              >
                <Image
                  src={logoimg.logo}
                  alt="logo"
                  width={180}
                  height={40}
                  className="w-[180px] lg:w-[250px]"
                />
              </div>
            </div>

            <div className=" w-full mt-4">
              <div>
                <div className="flex items-center gap-2">
                  <div onClick={() => router.push("/")} className="">
                    <IoArrowBackSharp className="inline text-lg sm:text-2xl font-bold text-[var(--black)] cursor-pointer" />
                  </div>
                  <h2 className=" authPagesheading font-bold text-[var(--midnight)]">
                    Verify Your Contact Details
                  </h2>
                </div>
                <p className=" text-[var(--pgColor)]">
                  We've sent a one-time password (OTP) to your registered mobile
                  and email. Please enter it below to continue.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className=" mt-3 sm:mt-3 md:mt-3 lg:mt-4 py-6"
            >
              <div className="mb-4 w-[100%]  md:w-[100%] ">
                <label className="block mb-2  text-left">
                  Email/Contact<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-1  md:gap-4 justify-start sm:justify-start  md:justify-start md:items-center   ">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputsRef.current[index] = el)}
                      type="tel"
                      value={digit}
                      maxLength={1}
                      className="w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 border border-[var(--greyborder)] text-center sm:text-md md:text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]"
                      onChange={(e) => handleOtpInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col   items-center">
                <div className=" w-[100%] ">
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
                      onClick={resendOtp}
                      className={` ${
                        seconds > 0 || minutes > 0
                          ? "text-red-500"
                          : "text-black"
                      } border-none cursor-pointer underline `}
                    >
                      Resend OTP
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[var(--lightBlue)] text-[var(--White)]  py-3 my-3 md:my-3  sm:mb-3 rounded-md hover:text-[var(--White)]  hover:border-[var(--pink)]   "
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Verify OTP"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptToResetPassword;
