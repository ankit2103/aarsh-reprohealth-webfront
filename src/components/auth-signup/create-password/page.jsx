import React, { useState } from "react";
import Auth from "../../../api/auth/auth.api";
import { useDispatch } from "react-redux";
import { updateToken, updateUser } from "../../../redux/slice/user.slice";
import { useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IoArrowBackSharp } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";

import InputField from "../../custom-mui-input/page";

const Createpassword = ({ step, setStep, userData }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: userData?.user?._id || "",
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

  const validateForm = (name, value) => {
    let error = "";

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,40}$/;

    if (name === "password") {
      if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
      } else if (!value.trim()) {
        error = "Password is required";
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
    console.log("isValid----------------", isValid);
    if (!isValid) {
      console.log("Validation failed, errors: ", formErrors); // check for errors
      return;
    }
    try {
      const reqBody = {
        id: formData.id,
        password: formData.password,
      };
      console.log("reqBody--------------------------", reqBody);
      setLoading(true);
      const result = await Auth.createPassword(reqBody);
      console.log("on Createpassword userInf result", result);
      if (result?.code === 200) {
        let data = result.data;
        setLoading(false);
        if (data?.role) {
          if (data?.role == "Patient") {
            toast.success(result?.message || "Password created successfully");
            dispatch(updateToken(data?.token));
            dispatch(updateUser(data?.user));
            router.push("/");
          } else if (data?.role != "Patient" && data?.token) {
            setLoading(false);
            toast.success(result?.message || "Password created successfully");
            router.push(data?.token);

            // window.location.href = `http://192.168.1.42:5173/`;
            // Live url
            window.location.href = process.env.NEXT_PUBLIC_API_URL;
          } else {
            toast.error("Please contact admin");
          }
        }
      }
    } catch (error) {
      console.log("something went wrong in create password Error:", error);
      // alert("create password something went wrong.");
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const commonInputStyles = {
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
        borderWidth: "2px", // Optional: Make the border slightly thicker
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--Iron)", // Default label color
    },
    "& .Mui-focused": {
      color: "var(--lightBlue) !important", // Label color on focus
    },
  };

  return (
    <div className="w-full ">
      <div className="w-[100%] sm:w-[95%] md:w-[100%] lg:w-[100%] flex justify-center items-center py-6">
        <div className="">
          <div className="flex items-center gap-2 sm:gap-4">
            <div onClick={goback} className="">
              <IoArrowBackSharp className=" text-lg sm:text-2xl font-bold text-[var(--black)] cursor-pointer" />
            </div>
            <h2 className=" authPagesheading font-bold text-[var(--midnight)]">
              Create Password
            </h2>
          </div>
          <div>
            <div className=" w-full ">
              <div>
                <p className="text-sm text-[var(--pgColor)]">
                  You're almost there! Create a strong password to finish
                  setting your account.
                </p>
              </div>
            </div>
            {/* </div> */}
            <form onSubmit={handleSubmit} className="py-6">
              <InputField
                label="Password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                name="password"
                onChange={handleChange}
                helperText={formErrors.password}
                sx={{
                  marginBottom: "1rem",
                  marginTop: "0.5rem",
                  ...commonInputStyles,
                }}
                icon={<TbLockPassword />}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <IconButton onClick={togglePasswordVisibility} edge="end">
                //         {showPassword ? <VisibilityOff /> : <Visibility />}
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
              />

              <InputField
                label="Confirm Password"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                helperText={formErrors.confirmPassword}
                icon={<TbLockPassword />}
                sx={{
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                  ...commonInputStyles,
                }}
                showConfirmPassword={showConfirmPassword}
                toggleConfirmPasswordVisibility={
                  toggleConfirmPasswordVisibility
                }
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <IconButton
                //         onClick={toggleConfirmPasswordVisibility}
                //         edge="end"
                //       >
                //         {showConfirmPassword ? (
                //           <VisibilityOff />
                //         ) : (
                //           <Visibility />
                //         )}
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
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
  );
};

export default Createpassword;
