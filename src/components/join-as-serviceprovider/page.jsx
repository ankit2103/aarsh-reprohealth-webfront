"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import OtpVerify from "./page";
import Auth from "../../api/auth/auth.api";


const otpVerifySchema = z.object({
  emailOtp: z
    .string()
    .length(6, { message: "Email OTP must be exactly 6 digits long" })
    .regex(/^\d{6}$/, {
      message: "Invalid OTP. Please enter the 6-digit OTP sent to your registered email.",
    }),

  contactOtp: z
    .string()
    .length(6, { message: "Contact OTP must be exactly 6 digits long" })
    .regex(/^\d{6}$/, {
      message: "Invalid OTP. Please enter the 6-digit OTP sent to your registered phone.",
    }),
});

const OtpVerify = () => {
  

  return (
    <div className="w-full    ">
      {/* loginsignupbanner  */}
      
    </div>
  );
};

export default OtpVerify