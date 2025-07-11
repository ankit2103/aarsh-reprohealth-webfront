"use client";
import React, { useState } from "react";
import { CircularProgress } from "@mui/material";

const GuestUSercontact = ({step, setStep, handleSubmitRegisterViaPhone }) => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(mobile)) {
      setError("Please enter a valid mobile number."); //Please enter a valid  10-digit mobile number.
      return;
    }
    setError("");
    try {
      setLoading(true);
      const result = await handleSubmitRegisterViaPhone(mobile);
      console.log("result-----------------", result);
      
    } catch (error) {
      console.log("Error in register via phone:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md"
    >
      <h2 className="text-lg font-medium mb-4 text-[var(--listText)]">Enter your mobile number</h2>

      <label
        htmlFor="mobile"
        className="block text-sm font-medium text-[var(--greyP)] mb-1"
      >
        Mobile<span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        id="mobile"
        name="mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        onKeyDown={(e) => {
          const allowedKeys = [
            "Backspace",
            "ArrowLeft",
            "ArrowRight",
            "Delete",
            "Tab",
          ];
          if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
          }
        }}
        placeholder="Mobile Number"
        className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightBlue)] text-sm mb-2"
      />
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

      <p className="text-xs text-[var(--greyP)] mb-1">
        You will receive an OTP shortly.
      </p>
      <p className="text-xs text-[var(--greyP)] mb-4">
        We will send appointment-related communications on this number.
      </p>

      <button
        type="submit"
        className="w-full bg-[var(--lightBlue)] text-white py-4 px-4 rounded-lg transition cursor-pointer" //hover:bg-gray-500
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Continue"
        )}
      </button>
    </form>
  );
};

export default GuestUSercontact;
