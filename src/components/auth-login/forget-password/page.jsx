import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Auth from "../../../api/auth/auth.api";
import { toast } from "react-toastify";
import { TbArrowBackUp } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";
import InputField from "../../custom-mui-input/page";
import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { logoimg } from "../../element/images";
import Image from "next/image";

const ForgetPassword = ({
  step,
  setStep,
  setForgetPasswordData,
  setUserData,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("text");
  const [fieldName, setFieldName] = useState("email "); //or contact
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Check if the value is a number (Assuming phone numbers are only digits and at least 8-10 characters)
    if (/^\d+$/.test(value) && value.length >= 8) {
      setInputType("tel");
      setFieldName("contact");
    } else {
      setInputType("email");
      setFieldName("email");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reqBody =
        fieldName === "contact"
          ? { contact: inputValue }
          : { email: inputValue };
      const result = await Auth.forgetPassword(reqBody);

      console.log("API Response forgetPassword:", result);

      if (result.status === "success") {
        setForgetPasswordData((prev) => ({
          ...prev,
          id: result?.data?.user?._id || "",
        }));

        setUserData(result?.data);

        toast.success(result.message);
        setStep("otp");
        // Show success message or further actions
      }
      setLoading(false);
    } catch (error) {
      console.log("error in forget password:", error);
      toast.error("Something went wrong, please try again.");
    }
  };
  const handleGoBack = () => {
    setStep("login");
  };

  const commonInputStyles = {
    height: "2em",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "& fieldset": {
        borderColor: "var(--greyborder)", // Default border color
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
      color: "var(--black) !important", // Label color on focus
    },
  };

  return (
    <>
      <div className="w-[90%] flex justify-center items-center mx-auto py-6 h-[90vh]">
        <div className="flex items-start gap-2 sm:gap-4">
          {/* <div onClick={() => router.push("/")} className="mt-2">
            <IoArrowBackSharp className="inline text-lg sm:text-2xl font-bold text-[var(--black)] cursor-pointer" />
          </div> */}
          <div>
            <div className="flex flex-col justify-start ">
              <div className="w-full flex items-center justify-center ">
                <div
                  onClick={() => router.push("/")}
                  className="cursor-pointer  pt-2 "
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
            </div>

            <div className=" w-full mt-4">
              <div>
                <div className="flex items-center gap-2">
                  {/* onClick={() => router.push("/")} */}
                  <div  onClick={handleGoBack} className="mt-2">
                    <IoArrowBackSharp className="inline text-lg sm:text-2xl font-bold text-[var(--black)] cursor-pointer" />
                  </div>
                  <h3 className=" authPagesheading font-normal  text-[var(--midnight)] font-medium">
                  Reset Password
                </h3>
                </div>
                
              </div>
              <p className="text-sm text-[var(--pgColor)]">
                Enter your registered email address and we’ll send you
                instructions to reset your password.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className=" mt-3 sm:mt-3 md:mt-3 lg:mt-10"
            >
              <label className="font-[500]">Email</label>
              <InputField
                placeholder={`Enter your ${fieldName}`}
                type={inputType}
                icon={<MdOutlineMailOutline />}
                value={inputValue}
                name={fieldName}
                onChange={handleInputChange}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  padding: "12px 10px",
                  borderRadius: "8px",
                  marginTop: "2.25rem",
                  backgroundColor: "var(--lightBlue)",
                  "&:hover": {
                    backgroundColor: "var(--lightBlue)",
                  },
                }}
              >
                {loading ? "Loading in..." : "Reset Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
