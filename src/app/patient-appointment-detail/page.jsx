"use client";
import React, { useEffect, useState } from "react";
import PatientDetail from "../../components/patient-appointment-booking/patient-details/page";
import SpecificTestDetail from "../../components/patient-appointment-booking/specific-test-detail/page";
import {
  getUserAppointmentOrderSummary,
  userRegisterViaPhone,
  userRegisterViaPhoneOTPSend,
} from "../../utils/user/user.util";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OrderSummary from "../../components/patient-appointment-booking/order-summary/page";
import GuestUSercontact from "../../components/patient-appointment-booking/guest-user-contact-form/page";
import GuestUserOtpForm from "../../components/patient-appointment-booking/guest-user-otp-form/page";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { updateToken, updateUser } from "../../redux/slice/user.slice";

const PatientAppointmentDetail = () => {
  const userOrderDetail = useSelector((state) => state?.user?.x_user_order_detail);
  const userDetail = useSelector((state) => state?.user?.v_user_info);
  const isAuthenticated = useAuthenticated();
  console.log(
    "userOrderDetail----------------",
    userOrderDetail,
    isAuthenticated,
    userDetail
  );
  const [orderData, setOrderData] = useState({
    date: userOrderDetail?.date || "",
    startTime: userOrderDetail?.startTime || "",
    endTime: userOrderDetail?.endTime || "",
    labId: userOrderDetail?.labId || "",
    clinicId: userOrderDetail?.clinicId || "",
    tests: userOrderDetail?.tests || "",
    doctorId: userOrderDetail?.doctorId || "",
    doctorClinicId:
      userOrderDetail?.mode === "online" &&
      (userOrderDetail?.onlineType === "doctorVideoConsultation" ||
        userOrderDetail?.onlineType === "doctorVoiceConsultation")
        ? ""
        : userOrderDetail?.doctorClinicId,
    mode: userOrderDetail?.mode || "",
    services: userOrderDetail?.services || "",
    onlineType:
      userOrderDetail?.mode === "online" &&
      (userOrderDetail?.onlineType === "doctorVideoConsultation" ||
        userOrderDetail?.onlineType === "doctorVoiceConsultation")
        ? userOrderDetail?.onlineType
        : "",
    userId:userDetail?._id || null    
  });
  const [getData, setGetData] = useState(null);
  const [step, setStep] = useState("contact");
  const [contact, setContact] = useState("");
  const [contactOtp, setContactOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); // 👈 loading state

 
    const fetchOrderSummary = async () => {
      setLoading(true); // 👈 start loading
      try {
        console.log("orderData---------------------",orderData)
        const result = await getUserAppointmentOrderSummary(orderData);
        console.log(
          "getUserAppointmentOrderSummary result------------------",
          result
        );
        if (result?.code === 200) {
          setGetData(result?.data);
        } else if (result?.code === 201) {
          toast(result?.message || "please register as a patient");
        }
      } catch (error) {
        console.error("Error fetching order summary:", error);
      } finally {
        setLoading(false); // 👈 stop loading
      }
    };
 useEffect(() => {
    fetchOrderSummary();
  }, [orderData]);

  const handleSubmitRegisterViaPhone = async (mobile) => {
    try {
      const response = await userRegisterViaPhone({ contact: mobile });
      console.log("response od contact-------------------", response);
      if (response?.code === 200) {
        setContact(mobile);
        
        setStep("otp");
      } else {
        alert(response?.message || "Failed to register");
      }
    } catch (error) {
      console.error("Register error:", error);
      // alert("Something went wrong");
    }
  };
  const handleSubmitOtp = async () => {
    try {
      const response = await userRegisterViaPhoneOTPSend({
        contact,
        contactOtp,
      });

      console.log("response--------------", response);
      if (response?.code === 200) {
        console.log("OTP verified");
        dispatch(updateToken(response?.data?.token));
        dispatch(updateUser(response?.data?.user));
         setOrderData((prev) => ({
        ...prev,
        userId: response?.data?.user?._id || "", // Adjust according to your user object
      }));
        
        await fetchOrderSummary()
        //  setStep("otp");
        // continue to booking
      } else {
        alert(response?.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("Something went wrong while verifying OTP");
    }
  };
  // console.log(
  //   "PatientAppointmentDetail result-------------------x_user_order_detail",
  //   getData
  // );

  return (
    <div className="w-full  my-10  flex justify-center items-center">
      <div className="w-full">
        <div className="main-container">
          <div className="container ">
            <div className="pt-20 px-0  md:pt-20">
              <div className="flex justify-center md:justify-evenly items-center flex-col gap-3 sm:flex-col md:flex-row ">
                <div className="w-full md:w-[50%]">
                  <PatientDetail
                    getData={getData}
                    loading={loading}
                    
                    // isAuthenticated={isAuthenticated}
                  />
                </div>
                <div className="w-full md:w-[50%]">
                  
                    {isAuthenticated ? (
                      <OrderSummary getData={getData} loading={loading} />
                    ) : (
                      <>
                        {step === "contact" && (
                          <GuestUSercontact
                            step={step}
                            setStep={setStep}
                            handleSubmitRegisterViaPhone={
                              handleSubmitRegisterViaPhone
                            }
                          />
                        )}
                        {step === "otp" && (
                          <GuestUserOtpForm
                            step={step}
                            setStep={setStep}
                            contact={contact}
                            contactOtp={contactOtp}
                            setContactOtp={setContactOtp}
                            handleSubmitOtp={handleSubmitOtp}
                          />
                        )}
                      </>
                    )}
                  </div>

                  {/* <OrderSummary getData={getData} loading={loading}/> */}
                  {/* <SpecificTestDetail getData={getData} loading={loading} /> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentDetail;
