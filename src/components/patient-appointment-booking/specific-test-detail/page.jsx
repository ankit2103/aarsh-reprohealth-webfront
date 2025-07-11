"use client";
import {
  TextField,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaClinicMedical } from "react-icons/fa";
import { useSelector } from "react-redux";
import useRazorpay from "../../../hooks/useRazorpay";
import InputField from "../../custom-mui-input/page";
import { FaRegUser } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  updateUser,
  userAppointmentOrderDetail,
} from "../../../redux/slice/user.slice";

const SpecificTestDetail = ({ getData, loading }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user?.v_user_info);
  const userOrderInfo = useSelector((state) => state.user?.x_user_order_detail);
  console.log("SpecificTestDetail--------------------------------", getData, userInfo);
  const { handlePayment, isProcessing } = useRazorpay();
  const [formData, setFormData] = useState({
    salutation: "", //userInfo?.salutation ||
    fullName: "", //userInfo?.name==="User" && "Guest User"|| getData?.userInfo?.name  ||
    contact: "", //getData?.userInfo?.contact || userInfo?.contact ||
    email: "", //getData?.userInfo?.email || userInfo?.email ||
  });
  const [errors, setErrors] = useState({});
  const [bookingFor, setBookingFor] = useState("normal");
  const [bookingUserType, setBookingUserType] = useState(null);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedForm);

    if (bookingUserType === "guest") {
      console.log("updatedForm for someoneElse:", bookingFor);
      dispatch(userAppointmentOrderDetail(updatedForm));
      if (name === "fullName" || name === "email") {
        const updatedUser = {
          ...userInfo, // existing Redux user data
          ...(name === "fullName" ? { name: value } : { email: value }), // map fullName → name
        };
        dispatch(updateUser(updatedUser));
      }
    } else {
      dispatch(userAppointmentOrderDetail(updatedForm));
      dispatch(updateUser(updatedForm));
    }
  };

  const prepareAppointmentData = () => {
    const {
      type,
      doctorId = getData?.doctorDetail?.doctorId,
      // doctorClinicId = getData?.doctorDetail?.doctorClinicId,
      clinicId = getData?.clinicDetail?.clinicId || userOrderInfo?.clinicId,
      labId = getData?.tests?._id,
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

    //booking for
    const bookingUser =
      bookingFor === "normal"
        ? getData?.userInfo
        : {
            name: formData.fullName,
            contact: formData.contact,
            email: formData.email,
          };

    let appointmentData = {
      type,
      services,
      mode,
      homeCollection,
      appointmentDate,
      startTime,
      endTime,
      name: bookingUser?.name,
      contact: bookingUser?.contact,
      email: bookingUser?.email,
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
        labId:getData?.labDetail?.labId || getData?._id,
        tests: getData?.tests?.testDetails?.map((test) => test.testId) || [],
        // type: "labTest",
        type:"Lab"
      };
    }
    // console.log("before return appointmentData---------------------", appointmentData)
    return appointmentData;
  };
  const onBookClick = async (e) => {
    e.preventDefault();

    console.log("Submitted data:", formData);
    const appointmentData = prepareAppointmentData();
    console.log("appointmentData--------------------------", appointmentData);

    await handlePayment(appointmentData);
  };

  const commonInputStyles = {
    height: "2em",

    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "& fieldset": {
        borderColor: "var(--lightBlue)", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "var(--lightBlue)", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--lightBlue) !important", // Border color on focus
        borderWidth: "1px", // Optional: Make the border slightly thicker
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--Iron)", // Default label color
    },
    "& .Mui-focused": {
      color: "var(--lightBlue) !important", // Label color on focus
    },
  };
  useEffect(() => {
    if (userInfo?.userType) {
      setBookingUserType(userInfo?.userType);

      if (userInfo?.userType === "guest") {
        setFormData({
          fullName: userInfo?.name|| "", // empty, user types
          contact: userInfo?.contact || "", // contact prefilled
          email: userInfo?.email||"", // email empty
        });
      } else if (userInfo.userType === "normal") {
        setFormData({
          fullName: userInfo?.name || "",
          contact: userInfo?.contact || "",
          email: userInfo?.email || "",
        });
      }
    }
  }, [userInfo]);

  return (
    <div className="w-full py-4 md:py-3 px-4">
      <div className="flex items-center gap-2 px-3 pb-2">
        <div className="w-8 h-8 rounded-full bg-[var(--lightBlue)] text-center flex items-center justify-center">
          <FaClinicMedical className="text-[var(--White)]" />
        </div>
        <span className="capitalize md:text-2xl">patient Details</span>
      </div>
      <div className="px-3 py-2">
        {/* <p className="text-[var(--darkGrey)] font-medium  text-sm  md:text-sm">
          This {} appointment is for:
        </p> */}
        <form className="mt-3 sm:mt-3 md:mt-4 lg:mt-2">
          {/* onSubmit={onBookClick} */}

          <div style={{ display: "flex", gap: "1rem", marginTop: "15px" }}>
            <InputField
              label="Full Name"
              name="fullName"
              onChange={handleChange}
              value={formData.fullName}
              placeholder="Type name *"
              type="text"
              icon={<FaRegUser />}
              helperText={errors.fullName}
              InputProps={{
                readOnly: bookingUserType === "normal", // ✅ this now works
              }}
              isRequired={true}
            />
          </div>

          <InputField
            label="Contact No."
            value={formData.contact}
             placeholder="Enter your contact*"
            onChange={handleChange}
            name="contact"
            type="tel"
            icon={<BsTelephone />}
            helperText={errors.contact}
            InputProps={{
              readOnly: bookingUserType === "normal", // ✅ this now works
            }}
          />
          <InputField
          label="Email Id"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email *"
            type="email"
            icon={<MdOutlineMailOutline />}
            helperText={errors.email}
            isRequired={true}
          />
          {/* <TextField
              label="Enter your fullname*"
              type="text"
              variant="outlined"
              fullWidth
              name="fullName"
              onChange={handleChange}
              value={formData.fullName}
              sx={{ flex: 2, ...commonInputStyles }}
              InputProps={{
                readOnly: bookingFor === "myOwn",
              }}
            /> */}
          {/* 
          <TextField
            label="Enter your contact*"
            type="text"
            variant="outlined"
            fullWidth
            name="contact"
            onChange={handleChange}
            value={formData.contact}
            sx={{ marginTop: "3rem", ...commonInputStyles }}
            InputProps={{
              readOnly: bookingFor === "myOwn",
            }}
          /> */}
          {/* <TextField
            label="Enter your email (optional)"
            type="text"
            variant="outlined"
            fullWidth
            name="email"
            onChange={handleChange}
            value={formData.email}
            sx={{ marginY: "3rem", ...commonInputStyles }}
          /> */}

          {/* <div className="flex items-center gap-2 text-[var(--darkGrey)] font-medium text-base py-2">
            <p className="m-0">Total Amount:</p>
            <span className="flex items-center ">
              <LiaRupeeSignSolid className="font-semibold" />
              {getData?.type == "Lab"
                ? getData?.totalTestPrice?.toLocaleString("en-IN")
                : getData?.type == "Doctor"
                ? getData?.totalPrice?.toLocaleString("en-IN")
                : getData?.type == "SpecialistClinic"
                ? getData?.totalServicePrice?.toLocaleString("en-IN")
                : ""}
            </span>
          </div>
          <p className="text-[var(--darkGrey)] font-medium">
            Confirm & Proceed a Payment to Book Appointment
          </p>
          <button
            type="submit"
            className="w-full my-4 bg-[var(--lightBlue)] text-white text-xl px-2 py-2 sm:px-3 sm:py-3 md:text-xl md:px-4 md:py-3 lg:px-4 lg:py-3 rounded-lg"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Book Appointment"}
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default SpecificTestDetail;
