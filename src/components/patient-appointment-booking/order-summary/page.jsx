"use client";
import React, { useState, useEffect } from "react";
import { FaClinicMedical } from "react-icons/fa";
import InputField from "../../custom-mui-input/page";
import { MdOutlineMailOutline } from "react-icons/md";
import { TextField } from "@mui/material";
import { LiaRupeeSignSolid } from "react-icons/lia";
import useRazorpay from "../../../hooks/useRazorpay";
import { getUSerAppliedCoupon } from "../../../utils/user/user.util";
import { useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

const OrderSummary = ({ getData, loading }) => {
  console.log("getData---------------", getData, getData?.mode);
  const userInfo = useSelector((state) => state.user?.v_user_info);
  const userOrderInfo = useSelector((state) => state.user?.x_user_order_detail);
  const PatientDetail = useSelector(
    (state) => state.user?.x_user_appointment_detail
  );
  console.log(
    "OrderSummary PatientDetail---------------",
    
    userOrderInfo
  );
  const { handlePayment, isProcessing } = useRazorpay();
  const [formData, setFormData] = useState({
    service: getData?.type == "Doctor" ? "Doctor Consultation" : "-",
    fees: getData?.fees || "",
    discount: getData?.discount || "0",
    discountedFees: "",
    // companyCode: "",
    couponCode: "",
    gstAmount: "",
    // gstNo: "",
    grandTotal: getData?.totalPrice || "",
  });
  const [activeField, setActiveField] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [userAppliedCouponData, setUserAppliedCouponData] = useState(null);
  const [patientInfo, setPatientInfo] = useState({
    name: userInfo?.fullName || "", // from stored PatientDetail
    contact: userInfo?.contact || "",
    email: userInfo?.email || "",
  });

  const handleToggle = (field) => {
    setActiveField((prev) => (prev === field ? null : field));
  };

  const prepareAppointmentData = () => {
    const {
      type,
      doctorId = getData?.doctorDetail?.doctorId,
      doctorClinicId = getData?.doctorDetail?.doctorClinicId,
      clinicId = getData?.clinicDetail?.clinicId || userOrderInfo?.clinicId,
      // labId = getData?.tests?._id,
      labId=  getData?.labDetail?.labId || getData?._id ,
      // tests = getData?.tests?.testDetails?.map((test) => test.testId) || [],
      services = getData?.services?.serviceName?._id
        ? [getData.services.serviceName._id]
        : [],
      mode = userOrderInfo?.mode || "",
      homeCollection = getData?.homeSampleCollection || false,
      appointmentDate = userOrderInfo?.date || getData?.date || "",
      startTime = getData?.startTime || "",
      endTime = getData?.endTime || "",
    } = getData || {};

    
    const bookingFor = userInfo?.userType === "guest";

    // Define bookingUser based on bookingFor value
    const bookingUser =
      bookingFor === "guest"
        ? {
            name: userInfo?.fullName || "", 
            contact: userInfo?.contact || "",
            email: userInfo?.email || "",
          }
        : getData?.userInfo || {};

    console.log("booking USer------------------", bookingFor, bookingUser);

    let appointmentData = {
      type,
      services,
      mode,
      homeCollection,
      appointmentDate,
      startTime,
      endTime,
      name: patientInfo?.name,
      contact: patientInfo?.contact,
      email: patientInfo?.email,
      couponCode: userAppliedCouponData?.couponCode || "",
      userType: userInfo?.userType|| "normal"
    };

    if (doctorId) {
      appointmentData = {
        ...appointmentData,
        doctorId: userOrderInfo?.doctorId,
        doctorClinicId:
          userOrderInfo?.mode == "offline" ? userOrderInfo?.doctorClinicId : "",
        type:
          userOrderInfo?.mode == "offline"
            ? "doctorConsultation"
            : userOrderInfo?.mode === "online" &&
              userOrderInfo?.onlineType === "doctorVideoConsultation"
            ? "doctorVideoConsultation"
            : userOrderInfo?.mode === "online" &&
              userOrderInfo?.onlineType === "doctorVoiceConsultation"
            ? "doctorVoiceConsultation"
            : "",
      };
    } else if (clinicId) {
      appointmentData = {
        ...appointmentData,
        clinicId,
        services: getData?.services?.serviceName?._id
          ? [getData.services.serviceName._id]
          : null,
        type: getData?.type === "SpecialistClinic" ? "clinicService" : "",
      };
    } else if (labId) {
      appointmentData = {
        ...appointmentData,
        labId,
        tests: getData?.tests?.testDetails?.map((test) => test.testId) || [],
        // type: "labTest",
        type: "Lab",
        mode: getData?.homeCollection ? "online" : "offline",
      };
    }
    console.log(
      "before return appointmentData---------------------",
      getData?.tests?.testDetails?.map((test) => test.testId) || []
    );
    return appointmentData;
  };

  const handleApplyCoupon = async (code) => {
    event.preventDefault();
    console.log("coupon code:", code);

    const appointmentData = prepareAppointmentData();
    const { name, email, contact } = appointmentData;
    const reqBody = {
      date: getData?.date,
      ...appointmentData
    }

    // const reqBody = {
    //   date: getData?.date,
    //   doctorId: getData?.doctorDetail?.doctorId
    //     ? getData?.doctorDetail?.doctorId
    //     : "",
    //   doctorClinicId: getData?.doctorDetail?.doctorClinicId
    //     ? getData?.doctorDetail?.doctorClinicId
    //     : null,
    //   startTime: getData?.startTime,
    //   endTime: getData?.endTime,
    //   labId: getData?.labDetail?.labId ? getData?.labDetail?.labId : "",
    //   tests: getData?.tests?.testDetails?.map((test) => test.testId) || [],
    //   clinicId:
    //     getData?.type === "SpecialistClinic"
    //       ? getData?.clinicDetail?.clinicId
    //       : "",
    //   services: getData?.services?.serviceName?._id
    //     ? [getData.services.serviceName._id]
    //     : null,
    //   mode: getData?.mode ? getData?.mode : "",
    //   onlineType: getData?.onlineType ? getData?.onlineType : "",
    //   couponCode: formData?.couponCode,
    // };
      console.log("reqBody coupon code-------------------------",reqBody ,appointmentData);
    // const isValid = Object.values(reqBody).every(
    //   (value) => value !== "" && value !== null && value !== undefined
    // );
    // if (!isValid) {
    //   return; // or show error to user
    // }

  
    const response = await getUSerAppliedCoupon(reqBody);
    console.log("response before sending:", response);
    if (response?.code == 200) {
      setFormData((prev) => ({
        ...prev,
        fees: response?.data?.fees,
        grandTotal:
          response?.data?.type == "Lab"
            ? response?.data?.totalTestPrice
            : response?.data?.totalPrice,
        discount: response?.data?.discount,
        gstAmount: response?.data?.gstAmount,
      }));
      setUserAppliedCouponData(response?.data);
      setPromoMessage(`Promocode applied for ${response?.data?.discount}`);
    } else {
      setPromoMessage(""); // optional: reset message if invalid
    }
    // console.log("response of getUSerAppliedCoupon:", response);
  };
  const handleDeleteApplliedCoupon = async () => {
    console.log("getData------------- dele", getData);
    setFormData((prev) => ({
      ...prev,
      couponCode: "",
      grandTotal:
        getData?.type == "Lab" ? getData?.totalTestPrice : getData?.totalPrice,
      fees: getData?.fees,
      discount: getData?.discount,
      gstAmount: getData?.gstAmount,
    }));
    setPromoMessage("");
  };
  
  const onBookClick = async (e) => {
    e.preventDefault();

    const appointmentData = prepareAppointmentData();
    const { name, email, contact } = appointmentData;

    // ✅ Validate guest fields using shorthand
    if (userInfo?.userType === "guest") {
      const requiredFields = { name, email, contact };
      const fieldLabels = {
        name: "Name",
        email: "Email",
        contact: "Contact",
      };
      console.log("requiredFields-----------",appointmentData, requiredFields);
      for (const [key, value] of Object.entries(requiredFields)) {
        if (!value?.trim()) {
          console.log("key, value----------", key, value);
          toast(`Please enter your ${fieldLabels[key]}.`);
          return;
        }
      }
    }

    // console.log(
    //   "appointmentData--------------------------",
    //   appointmentData,
    //   getData
    // );

    await handlePayment(appointmentData);
  };

  useEffect(() => {
    if (getData) {
      setFormData((prev) => ({
        ...prev,
        service:
          getData?.type === "Lab"
            ? "Test Booking "
            : getData?.type === "Doctor"
            ? "Doctor Consultation"
            : getData?.type === "SpecialistClinic"
            ? "Appointment Booking"
            : "-",
        fees:
          getData?.type === "Lab"
            ? getData?.fees?.toLocaleString("en-IN")
            : getData?.type === "Doctor"
            ? getData?.fees
            : getData?.type === "SpecialistClinic"
            ? getData?.fees?.toLocaleString("en-IN")
            : "",
        discount: getData?.discount || "0",
        gstAmount: getData?.gstAmount || "",
        grandTotal:
          getData?.type === "Lab"
            ? getData?.totalTestPrice
            : getData?.type === "Doctor"
            ? getData?.totalPrice
            : getData?.type === "SpecialistClinic"
            ? getData?.totalServicePrice?.toLocaleString("en-IN")
            : "",
      }));
    }
  }, [getData]);

  useEffect(() => {
  if (userInfo) {
    setPatientInfo({
      name: userInfo?.name || "",
      contact: userInfo?.contact || "",
      email: userInfo?.email || "",
    });
  }
}, [userInfo]);
// console.log("patientInfo-----------------",patientInfo);

  return (
    <div className="w-full  bg-cover bg-[url(/assets/images/booking/order-summary-bg.svg)] rounded-md shadow-lg  py-4 md:py-3 px-4">
      <div className="flex items-center gap-2 px-3 pb-2">
        <div className="w-8 h-8 rounded-full bg-[var(--lightBlue)]  text-center flex items-center justify-center">
          <FaClinicMedical className="text-[var(--White)]  opacity-100" />
        </div>
        <span className="capitalize md:text-2xl text-[var(--White)]">
          Order Details:
        </span>
      </div>
      <div className="px-3 py-2">
        <form onSubmit={onBookClick} className="">
          {/* Service */}
          <div className="w-full text-[var(--White)] flex justify-between items-center flex-wrap">
            <label
              className="w-1/2 bg-transparent "
              style={{ minWidth: "auto" }}
            >
              Service:
            </label>
            <input
              type="text"
              value={formData.service || "Doctor Consultation"}
              className="w-1/2 px-2  rounded bg-transparent  cursor-not-allowed flex-wrap"
              disabled
            />
          </div>
          {/* Fees */}
          <div className="w-full text-[var(--White)] flex justify-between items-center mt-4 ">
            <label className="w-1/2" style={{ minWidth: "auto" }}>
              Fees:
            </label>
            <input
              type="text"
              value={formData.fees}
              className="w-1/2  px-2  rounded bg-transparent cursor-not-allowed"
              disabled
            />
          </div>
          {/* Discount */}
          <div className="w-full text-[var(--White)] flex justify-between items-center mt-4 ">
            <label className="w-1/2 " style={{ minWidth: "auto" }}>
              Discount:
            </label>
            <input
              type="text"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              className="w-1/2  px-2 rounded bg-transparent cursor-not-allowed "
              disabled
            />
          </div>

          {/* GST */}
          <div className="w-full  text-[var(--White)] flex justify-between items-center mt-4">
            <label className="w-1/2" style={{ minWidth: "auto" }}>
              GST (18%):
            </label>
            <input
              type="text"
              value={formData.gstAmount.toLocaleString("en-IN")}
              readOnly
              className="w-1/2 px-2 rounded  cursor-not-allowed bg-transparent"
              disabled
            />
          </div>
          {/* add gst no. */}
          {/* <div
            onClick={() => handleToggle("gst")}
            className="text-[var(--lightBlue)] underline cursor-pointer text-sm mt-4"
          >
            Add GST No. +
          </div>

          {activeField === "gst" && (
            <div className="flex justify-between items-center mt-2">
              <label className="" style={{ minWidth: "auto" }}>
                GST No.:
              </label>
              <input
                type="text"
                value={formData.gstNo}
                onChange={(e) =>
                  setFormData({ ...formData, gstNo: e.target.value })
                }
                className="px-2 py-2 rounded text-black border border-[var(--greyP)] focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]"
              />
            </div>
          )} */}

          {/* Company Code Toggle */}
          {/* <div
            onClick={() => handleToggle("company")}
            className="text-[var(--lightBlue)] underline cursor-pointer text-sm mt-4"
          >
            Add Company Code +
          </div>

          {activeField === "company" && (
            <div className="flex justify-between items-center mt-2">
              <label className="w-1/2">Company Code:</label>
              <input
                type="text"
                value={formData.companyCode}
                onChange={(e) =>
                  setFormData({ ...formData, companyCode: e.target.value })
                }
                className="w-1/2 px-2 py-2 rounded text-black border border-[var(--greyP)] bg-white  focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)]"
              />
            </div>
          )} */}

          {/* Coupon / Promo Code */}
          <div className="w-full text-[var(--White)] flex justify-between items-center gap-2 mt-4  rounded ">
            <label className="w-1/2" style={{ minWidth: "auto" }}>
              Apply Promo Code:
            </label>
            <div className="w-1/2 flex gap-2  items-center">
              <input
                type="text"
                value={formData.couponCode}
                onChange={(e) =>
                  setFormData({ ...formData, couponCode: e.target.value })
                }
                className="w-full md:px-4 md:py-3 lg:px-4 lg:py-3 rounded-lg  text-[#060606] opacity-20 border-2 border-[#94f4ff] bg-[#2ED1E2]"
              />

              {promoMessage.length > 0 ? (
                <button
                  type="button"
                  className="bg-[#70ceda]  border-2 border-[#94f4ff]  px-4 py-2 rounded"
                  onClick={() =>
                    handleDeleteApplliedCoupon(formData.couponCode)
                  }
                >
                  <RiDeleteBinLine className="text-xl " />
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-[var(--White)] text-[var(--lightBlue)] border-2 border-[var(--lightBlue)]  md:px-4 md:py-3 lg:px-4 lg:py-3 rounded-lg"
                  onClick={() => handleApplyCoupon(formData.couponCode)}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
          {promoMessage.length > 0 && (
            <p className="text-[#c1f8ff] text-sm mt-1">
              {promoMessage}{" "}
              {userAppliedCouponData?.discountType === "flat"
                ? // <LiaRupeeSignSolid className="inline" /> RS
                  "Rs."
                : "%"}
            </p>
          )}

          {/* <hr className="border border-[var(--lightBlue)] my-2" /> */}

          {/* Grand Total */}
          <div className="w-full text-[var(--White)] flex justify-between gap-3 font-bold text-xl mt-4">
            <p className="w-1/2">Grand total: </p>
            <button className="w-1/2 px-2  text-start">
              {formData?.grandTotal?.toLocaleString("en-IN")}
            </button>
          </div>

          {/* Submit / Pay Button */}
          <button
            type="submit"
            className="w-full  my-4 bg-[var(--lightBlue)] text-white text-xl px-2 py-2 sm:px-3 sm:py-3 md:text-xl md:px-4 md:py-3 lg:px-4 lg:py-3 rounded-lg"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderSummary;
