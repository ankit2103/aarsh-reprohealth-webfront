import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Auth from "../../../api/auth/auth.api";
import { useDispatch } from "react-redux";
import { updateToken, updateUser } from "../../../redux/slice/user.slice";
import { useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";
import { IoArrowBackSharp } from "react-icons/io5";
import InputField from "../../custom-mui-input/page";
import { TbLockPassword } from "react-icons/tb";
import { logoimg } from "../../element/images";
import Image from "next/image";

const CreateNewPassword = ({ step, setStep, forgetPassswordData }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: forgetPassswordData?.id || "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const goback = () => {
    setStep("otp");
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validateForm = (name, value) => {
    let error = "";

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,40}$/;

    if (name === "password") {
      if (!value.trim()) {
        error = "Password is required";
      } else if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
      } else {
        // Clear errors for both password and confirmPassword if password is valid
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: "", // Clear password error
          confirmPassword: "", // Clear confirmPassword error
        }));
      }
    }

    // Confirm password validation
    if (name === "confirmPassword") {
      if (!value.trim()) {
        error = "Confirm password is required";
      } else if (value !== formData.password) {
        error = "Confirm password must match the password";
      } else {
        // Clear confirmPassword error if passwords match
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "", // Clear confirmPassword error
        }));
      }
    }

    if (error) {
      setFormErrors((prev) => ({ ...prev, [name]: error }));
      return false; // invalid
    }

    return true; // valid
  };

  const isFormValid = () => {
    let valid = true;
    Object.entries(formData).forEach(([name, value]) => {
      if (name === "id") return; // Skip validation for 'id'
      const isFieldValid = validateForm(name, value);
      if (!isFieldValid) valid = false;
    });

    return valid;
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = isFormValid();
    // console.log("isValid----------------", isValid);
    if (!isValid) {
      console.log("Validation failed, errors: ", formErrors); // check for errors
      return;
    }

    setLoading(true);

    try {
      const reqBody = {
        id: formData.id,
        password: formData.password,
      };
      // console.log("reqBody--------------------------", reqBody);
      const result = await Auth.createPassword(reqBody);
      console.log("on Createpassword userInf result", result);
      if (result?.code === 200) {
        let data = result.data;
        if (data?.role) {
          if (data?.role == "Patient") {
            dispatch(updateToken(data?.token));
            dispatch(updateUser(data?.user));
            router.push("/");
          } else if (data?.role != "Patient" && data?.token) {
            router.push(data?.token);
          } else {
            toast.error("Please contact admin");
          }
        }
      }
    } catch (error) {
      console.log("something went wrong in create password Error:", error);
      // alert("create password something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const commonInputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "& fieldset": {
        borderColor: "var(--Iron)", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "var(--lightBlue)", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--lightBlue) !important", // Border color on focus
        borderWidth: "2px", // Optional: Make the border slightly thicker
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
    <div className="w-full">
     

      <div className="w-[90%] flex justify-center items-center mx-auto py-0 h-[90vh]">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="flex flex-col justify-start">
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

            <div>
              <div className=" w-full  mt-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div onClick={() => router.push("/")} className="mt-2">
                      <IoArrowBackSharp className="inline text-lg sm:text-2xl font-bold text-[var(--black)] cursor-pointer" />
                    </div>
                    <h3 className=" authPagesheading font-normal text-[var(--midnight)]">
                      Create New Password
                    </h3>
                  </div>

                  <p className="text-sm text-[var(--pgColor)]">
                    You're almost there! Create a strong password to finish
                    resetting your account.
                  </p>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className=" mt-3 sm:mt-3 md:mt-3 lg:mt-10"
              >
                {/* <label className="font-[500]">Create Password</label> */}
                <InputField
                  label="New Password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  icon={<TbLockPassword />}
                  sx={{
                    marginBottom: "1rem",
                    marginTop: "0.5rem",
                    ...commonInputStyles,
                  }}
                  name="password"
                  helperText={formErrors.password}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
                {/* <label className="font-[500]">Confirm Password</label> */}
                <InputField
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter your confirm password"
                  type={showConfirmPassword ? "text" : "password"}
                  icon={<TbLockPassword />}
                  sx={{
                    // height:"2em",
                    marginTop: "0.5rem",
                    marginBottom: "1rem",
                    ...commonInputStyles,
                  }}
                  name="confirmPassword"
                  helperText={formErrors.confirmPassword}
                  showConfirmPassword={showConfirmPassword}
                  toggleConfirmPasswordVisibility={
                    toggleConfirmPasswordVisibility
                  }
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    padding: "12px 10px",
                    borderRadius: "8px",
                    marginTop: "1rem",
                    backgroundColor: "var(--lightBlue)",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Create Password"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
