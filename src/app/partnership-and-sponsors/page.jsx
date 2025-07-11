"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { PartnershipAndSponsors } from "../../utils/user/user.util";
import { partner } from "../../components/element/images";
import InputField from "../../components/custom-mui-input/page";

const PartnershipSponsors = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    companyName: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (formData.firstName.trim().length < 2)
      newErrors.firstName = "First name is required";

    if (formData.lastName.trim().length < 2)
      newErrors.lastName = "Last name is required";

    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (formData.contact.trim().length < 10)
      newErrors.contact = "Invalid phone number";

    if (!/^[a-zA-Z\s-]{3,}$/.test(formData.companyName.trim()))
      newErrors.companyName =
        "Company name must be at least 3 characters and contain only letters, spaces, or hyphens";

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
    const dataToSend = { name: `${firstName} ${lastName}`, ...rest };

    setLoading(true);
    try {
      const result = await PartnershipAndSponsors(dataToSend);
      if (result?.status === "success") {
        toast.success(result.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
          companyName: "",
          message: "",
        });
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

    const style={
    // background: "linear-gradient(191.42deg, rgba(255, 181, 208, 0.3) -16.56%, #FFFFFF 91.6%)",
    // background: "linear-gradient(197deg, rgba(46, 209, 226, 0.12) -19.27%, rgba(255, 255, 255, 0.6) 74.19%)",
    background: "linear-gradient(218.13deg, rgba(46, 209, 226, 0.12) 9.16%, rgba(255, 197, 220, 0.6) 78%)"
  }

  return (
    <div className="w-full  bg-[#F8F8F8] min-h-screen pt-28 px-4 md:px-8 lg:px-12" > 
     {/* style={style} */}
     {/* bg-[#F3F8F9] */}
      {/*old: bg-[#f4e7dd] */} 

      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 pb-20">
        {/* Left Side */}

        <div className="w-full md:w-1/2 space-y-6 md:pr-8">
          <div className="space-y-4">
            <h1 className="text-[28px] md:text-[36px] font-bold text-[#2b2b2b] leading-tight">
              Partner with Aarsh ReproHealth
            </h1>
            <p className="text-[#4a4a4a] text-base md:text-lg">
              Join us in shaping the future of healthcare. Become a valued sponsor or partner and grow with our trusted network..
            </p>
          </div>
          <div className="w-full  max-w-sm md:max-w-[600px] border rounded-lg">
            <Image
              src={partner.partnersFormImg}
              alt="abstract illustration"
              className="w-full h-full object-contain border rounded-lg"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  First Name
                </label>
                <InputField
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Type name"
                  type="text"
                  icon={<FaRegUser />}
                  helperText={errors.firstName}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Last Name
                </label>
                <InputField
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Type name"
                  type="text"
                  icon={<FaRegUser />}
                  helperText={errors.lastName}
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-800">
                  What's your email address?
                </label>
                <InputField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type email address"
                  type="email"
                  icon={<MdOutlineMailOutline />}
                  helperText={errors.email}
                />
              </div>

              {/* Company */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-800">
                  What's your company?
                </label>
                <InputField
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Type company name"
                  type="text"
                  icon={<AiOutlineMedicineBox />}
                  helperText={errors.companyName}
                />
              </div>

              {/* Phone */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-800">
                  What's your phone number?
                </label>
                <InputField
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Type phone number"
                  type="text"
                  icon={<BsTelephone />}
                  helperText={errors.contact}
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-800">
                  How can we help you?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 text-sm rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="A brief message here"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex mt-6 text-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--lightBlue)] hover:bg-[var(--lightBlue)] text-white text-sm font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  <>
                    Submit
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnershipSponsors;
