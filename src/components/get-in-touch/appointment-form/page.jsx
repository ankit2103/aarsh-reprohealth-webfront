"use client";
import { contactUser } from "../../../utils/user/user.util";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
  FormHelperText,
} from "@mui/material";
import InputField from "../../../components/custom-mui-input/page";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { CircularProgress } from "@mui/material";



const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    message: "",
  });
  const [errors, setErrors] = useState({});


  const validate = () => {
    const newErrors = {};

    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name is required";
    }

    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name is required";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.contact.trim().length < 10) {
      newErrors.contact = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const { firstName, lastName, ...rest } = formData;
    const dataToSend = {
      name: `${firstName} ${lastName}`,
      ...rest,
    };

    try {
      const result = await contactUser(dataToSend);
      if (result?.status === "success") {
        toast.success(result.message);
        setFormData({ firstName: "", lastName: "", email: "", contact: "", message: "" });
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    // px-8 sm:px-10 md:px-14 lg:px-14
    <div className="w-full  flex justify-start items-center ">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleSubmit}
        className="w-full  shadow-md rounded-lg p-1 sm:p-2  md:p-2 lg:p-8 space-y-12   bg-[var(--White)]" 
        
      >
        <div className="px-2 sm:px-2 md:px-3 lg:px-3 mt-2 ">
          {/* Name Fields */}

          {/* Name Fields */}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <label className="text-left font-light block text-sm sm:text-sm md:text-lg lg:text-sm text-[var(--midnight)] mt-4">
                First Name
              </label>
              <InputField
                // label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                type="text"
                icon={<FaRegUser />}
                helperText={errors.firstName}
                sx={{ backgroundColor: "var(--White)" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="text-left font-light block text-sm sm:text-sm md:text-lg lg:text-sm text-[var(--midnight)] mt-4">
                Last Name
              </label>
              <InputField
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                type="text"
                icon={<FaRegUser />}
                helperText={errors.lastName}
                sx={{ backgroundColor: "var(--White)" }}
              />
            </Grid>
          </Grid>

          {/* Email */}
          <Grid item xs={12} md={10}>
            <label className="text-left font-light block text-sm sm:text-sm md:text-lg lg:text-sm text-[var(--midnight)] mt-4">
              Email
            </label>
            <InputField
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              type="email"
              icon={<MdOutlineMailOutline />}
              helperText={errors.email}
              sx={{ backgroundColor: "var(--White)" }}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} md={10}>
            <label className="text-left font-light block text-sm sm:text-sm md:text-lg lg:text-sm text-[var(--midnight)] mt-4">
              WhatsApp Number
            </label>
            <InputField
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone No."
              type="text"
              icon={<BsTelephone />}
              helperText={errors.contact}
              sx={{ backgroundColor: "var(--White)" }}
            />
          </Grid>


          {/* Message */}
          <div>
            <label className="text-left font-light block  text-sm sm:text-sm md:text-lg lg:text-sm text-[var(--midnight)] mt-4">
              Message
            </label>
            <textarea
              // {...register("message")}
              name="message"
              value={formData.message}
              onChange={handleChange}
              row={4}
              className="w-full border border-[var(--Iron)]   rounded-lg p-2 mt-4 md:p-4 focus:outline-none  focus:ring-2 focus:ring-[var(--lightBlue)] focus:border-transparent  capitalize"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            // style={{ background: "linear-gradient(181.59deg, rgba(46, 209, 226, 0.4) -24.65%, #FFFFFF 98.65%)" }}
            className="w-full bg-[var(--lightBlue)] text-[var(--White)] hover:bg-[var(--lightBlue)]  transition duration-300  rounded-lg mt-8  p-2   sm:p-2 md:px-2 md:py-2 lg:px-2 lg:py-3 mb-5"
          >
            Submit
          </button>
        </div>
        {/* Submit Button */}


      </form>
    </div>
  );
};
export default AppointmentForm;


{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-0 sm:gap-0 md:gap-5 lg:gap-5">
            <div className="">
              <label className="text-left font-light block text-sm sm:text-sm md:text-lg lg:text-lg text-[var(--midnight)] mt-4">
                First Name
              </label>
              <input
                // {...register("firstName")}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-2 border-[var(--Iron)] rounded-lg p-2 mt-4 md:p-4  focus:outline-none  focus:ring-2 focus:ring-[var(--lightBlue)] focus:border-transparent  capitalize"
                placeholder="First name"
                type="text"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="text-left font-light block text-sm sm:text-sm md:text-lg lg:text-lg text-[var(--midnight)] mt-4">
                Last Name
              </label>
              <input
                // {...register("lastName")}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-2 border-[var(--Iron)]  rounded-lg p-2 mt-4 md:p-4  focus:outline-none  focus:ring-2 focus:ring-[var(--lightBlue)] focus:border-transparent  capitalize"
                placeholder="Last name"
                type="text"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div> */}

//   <div>
//   <label className="text-left font-light block text-sm sm:text-sm md:text-lg lg:text-lg text-[var(--midnight)] mt-4">
//     Email
//   </label>
//   <input
//     // {...register("email")}
//     name="email"
//     value={formData.email}
//     onChange={handleChange}
//     className="w-full border-2 border-[var(--Iron)]  rounded-lg p-2 mt-4 md:p-4  focus:outline-none  focus:ring-2 focus:ring-[var(--lightBlue)] focus:border-transparent  lowercase"
//     placeholder="you@company.com"
//     type="email"
//   />
//   {errors.email && (
//     <p className="text-red-500 text-xs mt-2 text-left">
//       {errors.email}
//     </p>
//   )}
// </div>