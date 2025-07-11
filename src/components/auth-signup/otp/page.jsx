import React, { useEffect, useState, useRef } from "react";
import { OTPInput } from "../../otp-verification/page";
import Image from "next/image";
import { TbArrowBackUp } from "react-icons/tb";
import { LuAmpersand } from "react-icons/lu";
import Auth from "../../../api/auth/auth.api";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { IoArrowBackSharp } from "react-icons/io5";

const Otp = ({ step, setStep, selectedRole, userData }) => {
  console.log("setUserData--------------------------", userData);
  const [loading, setLoading] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [isCounting, setIsCounting] = useState(true); // Control timer start
  const [otpFormData, setOtpFormData] = useState({
    id: userData?.user?._id || "",
    contactOtp: "",
    emailOtp: "",
  });

  const handleResendOtp = async (event) => {
    event.preventDefault();
    console.log("Resend Verifying OTP:");
    setMinutes(0);
    setSeconds(30);
    try {
      if (!otpFormData.id) {
        console.log("Error: User ID is missing when verifying OTP.");
        return;
      }

      const resendOtpData = {
        id: otpFormData.id, // Now always uses latest userId
        contact: userData?.user?.contact,
        email: userData?.user?.email,
      };
      setLoading(true);
      console.log("resendOtpData before send:", resendOtpData);

      const result = await Auth.resendOtp(resendOtpData);

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
  
  const handleChange = (e) => {
    setOtpFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!otpFormData.id) {
        // console.log("Error: User ID is missing when verifying OTP.");
        return;
      }

      const otpData = {
        id: otpFormData.id, // Now always uses latest userId
        contactOtp: otpFormData.contactOtp.trim(),
        emailOtp: otpFormData.emailOtp.trim(),
      };

      // console.log("otpData before send:", otpData);
      // verifyOtp
      setLoading(true);
      const result = await Auth.verifyOtp(otpData);

      if (result?.code === 200) {
        setLoading(false);
        // console.log("opt sent Successfully:", result);
        toast.success(result?.message || "Otp Verified");

        setStep("createPassword");
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
    <div className="w-full ">
      <div className="w-[100%] sm:w-[95%] md:w-[80%] lg:w-[80%] flex justify-center items-center mx-auto py-6 ">
        <div className="flex items-start gap-2 sm:gap-4">
          <div>
            
              <div>
                <div className="flex items-start gap-2">
                  {/* <div onClick={goback}  className="mt-2">
                    <IoArrowBackSharp className="inline text-lg sm:text-2xl font-bold text-[var(--black)] cursor-pointer" />
                  </div> */}
                  <h2 className=" authPagesheading font-medium text-[var(--midnight)]">
                    Verify Your Contact Details
                  </h2>
                </div>
                <p className="text-sm text-[var(--pgColor)]">
                  We've sent a one-time password (OTP) to your registered mobile
                  and email. Please enter it below to continue.
                </p>
              </div>
          

            <form
              onSubmit={handleSubmit}
              className="py-6"
            >
              <OTPInput
              type="tel"
                name="emailOtp"
                value={otpFormData.emailOtp}
                onChange={handleChange}
                label={`OTP sent on email`}
              />

              <OTPInput
              type="tel"
                name="contactOtp"
                value={otpFormData.contactOtp}
                onChange={handleChange}
                label={`OTP sent on mobile`}
              />

              <div className="flex flex-col   items-center">
                <div className=" w-[100%] ">
                  <p
                    onClick={() => setStep("register")}
                    className="text-end text-sm text-[var(--lightBlue)] underline cursor-pointer mb-4"
                  >
                    Change registration details
                  </p>
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
                        seconds > 0 || minutes > 0
                          ? "text-[var(--black)]"
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
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Verify OTP"
                    )}
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

export default Otp;

{
  /* <p className="text-[var(--lightgray)] text-sm md:my-3 lg:my-4 sm:my-3 my-3">
              Check the spam folder if you can’t find the email OTP inside
              inbox.
            </p> */
}

// const {
//   register,
//   handleSubmit,
//   formState: { errors },
//   setValue,
//   reset,
// } = useForm({
//   resolver: zodResolver(
//     step == "join as service provider"
//       ? roleSchema
//       : step === "register"
//       ? signupSchema
//       : step === "otp"
//       ? otpVerifySchema
//       : step === "createPassword"
//       ? createPasswordSchema
//       : roleSchema
//   ),
//   defaultValues: {
//     salutation: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     countryCode: countryCodes[0],
//     contact: "",
//     company: "",
//     emailOtp: "",
//     contactOtp: "",

//     password: "",
//     roleId: "",
//     roleName: "",
//   },
// });
