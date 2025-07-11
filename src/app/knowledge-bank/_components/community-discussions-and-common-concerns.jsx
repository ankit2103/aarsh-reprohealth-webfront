"use client";
import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import InputField from "../../../components/custom-mui-input/page"; // Adjust import path as needed
import { useSelector } from "react-redux";
import { BsTelephone } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

const CommunityDiscussionsAndCommonConcerns = () => {
  const userInfo = useSelector((state) => state?.user?.v_user_info);
  const [formData, setFormData] = useState({
    email: userInfo?.email || "",
    contact: userInfo?.contact || "",
    fullName: userInfo?.name||"",
    message: "",
  });
  const [error, setError] = useState({
    email: "",
    contact: "",
    message: "",
    fullName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    // Handle form submission logic here (e.g., send to API)
    console.log("Form submitted:", formData);

    // Optionally clear form
    setFormData({ email: "", message: "" });
  };

  return (
    <div className="w-full max-w-2xl  mt-8">
      <form onSubmit={handleSubmit}>
        <label className="text-left font-light block text-sm sm:text-sm md:text-sm lg:text-sm text-[var(--black)] mt-4">
          Ask your query or share your story here
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full border border-[var(--Iron)] rounded-lg p-2 mt-4 md:p-4 focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)] focus:border-transparent capitalize"
          placeholder="Your message..."
        ></textarea>
        {error.message && (
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        )}
        <InputField
          label="Full Name"
          placeholder="Enter your Full Name"
          type="tel"
          icon={<FaRegUser />}
          name="fullName"
          onChange={handleChange}
          value={formData.fullName}
          error={!!error.fullName}
          helperText={error.fullName}
        />
        <InputField
          label="Email"
          placeholder="Enter your Email"
          type="email"
          icon={<MdOutlineMailOutline />}
          name="email"
          onChange={handleChange}
          value={formData.email}
          error={!!error.email}
          helperText={error.email}
        />
        <InputField
          label="Contact (optional)"
          placeholder="Enter your Contact"
          type="tel"
          icon={<BsTelephone />}
          name="contact"
          onChange={handleChange}
          value={formData.contact}
          error={!!error.contact}
          helperText={error.contact}
        />

        <button
          type="submit"
          className="bg-[var(--lightBlue)] text-[var(--White)] hover:bg-[var(--lightBlue)] transition duration-300 rounded-lg mt-4 p-2 sm:p-2 md:px-2 md:py-2 lg:px-2 lg:py-4 sm:w-[200px] md:w-full lg:w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommunityDiscussionsAndCommonConcerns;
