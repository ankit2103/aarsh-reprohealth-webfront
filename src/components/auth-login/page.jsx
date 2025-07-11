"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Auth from "../../api/auth/auth.api";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  helperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateToken, updateUser } from "../../redux/slice/user.slice";
import { loginsignup, logoimg } from "../element/images";
import Image from "next/image";
import { toast } from "react-toastify";
import ForgetPassword from "./forget-password/page";
import OptToResetPassword from "./otp/page";
import CreateNewPassword from "../auth-login/create-new-password/page";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import InputField from "../custom-mui-input/page";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";
import LoginCard from "../custom-card/login-card";
import { IoArrowBackSharp } from "react-icons/io5";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.x_auth_token);
  const isAuthenticated = useAuthenticated();
  // console.log("isAuthenticated------------", isAuthenticated);

  const [step, setStep] = useState("login");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forgetPassswordData, setForgetPasswordData] = useState({
    id: "",
    otp: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };
  const handleSubmit = async (event) => {
    // Check if any field is empty
    event.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors); // set error messages
      return; // prevent submit
    }

    setError({}); // clear errors
    setLoading(true);

    try {
      const result = await Auth.login(formData);
      console.log("Login response-----------------------", result);
      if (result?.code === 200) {
        let data = result.data;
        if (data?.role) {
          if (data?.role == "Patient") {
            dispatch(updateToken(data?.token));
            dispatch(updateUser(data?.user));
            // if (isAuthenticated) {

            toast.success("Login Successfully!");
            router.back();
            setFormData({
              email: "",
              password: "",
            });
          } else if (data?.role != "Patient") {
            toast.error(
              "Access denied! Please login through the Doctor Portal."
            );
          }
        } else if (data?.role != "Patient" && data?.token) {
          router.push(data?.token);
        } else {
          toast.error("Please contact admin");
        }
      } else if (result?.code === 201) {
        // router.push("/signup");
        toast.error(result.message);
      }
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.back();
    }
  }, []);

  const renderStep = () => {
    switch (step) {
      case "forgetPassword":
        return (
          <ForgetPassword
            step
            setStep={setStep}
            setForgetPasswordData={setForgetPasswordData}
            setUserData={setUserData}
          />
        );
      case "otp":
        return (
          <OptToResetPassword
            step={step}
            setStep={setStep}
            forgetPassswordData={forgetPassswordData}
            setForgetPasswordData={setForgetPasswordData}
            userData={userData}
          />
        );
      case "createPassword":
        return (
          <CreateNewPassword
            step={step}
            setStep={setStep}
            forgetPassswordData={forgetPassswordData}
          />
        );
      default:
        return <ForgetPassword />;
    }
  };

  const handleNavigate = () => {
    setStep("forgetPassword");
  };
  const handleGoBack = () => {
    router.push("/");
  };

  const commonInputStyles = {
    // height: "2em",

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
    <div className="w-full ">
      <div className="w-[100%] h-[100%]">
        <div className="w-[100%] h-[100vh]">
          <div className="flex justify-between items-start flex-row gap-6">
            <div className="w-0 sm:w-[50%] md:hidden lg:w-[50%] h-[100%] hidden sm:inline-block  lg:inline-block">
              <div>
                <LoginCard />
              </div>
            </div>
            <div className="w-[100%] sm:w-[50%] md:w-[100%] lg:w-[70%]">
              {step === "login" ? (
                <div className="w-[90%] flex justify-center items-center mx-auto py-6  h-[90vh]">
                  <div className="flex items-start gap-2 sm:gap-4">
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

                      <div className=" w-full mt-4">
                        <div className="flex items-center gap-2">
                          <div onClick={handleGoBack} className="mt-2">
                            <IoArrowBackSharp className="inline text-lg sm:text-2xl font-bold text-[var(--black)] cursor-pointer" />
                          </div>
                          <h3 className=" authPagesheading font-normal text-[var(--midnight)]">
                            Login
                          </h3>
                        </div>
                        <p className=" text-[var(--pgColor)]">
                          Manage your healthcare information, services, and
                          account in one place.
                        </p>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className=" mt-3 sm:mt-3 md:mt-3 lg:mt-5 "
                      >
                        {/*  Email Field  */}
                        <InputField
                          label="Email"
                          placeholder="Enter your Email"
                          type="email"
                          icon={<MdOutlineMailOutline />}
                          name="email"
                          onChange={handleChange}
                          value={formData.email}
                          sx={commonInputStyles}
                          error={!!error.email}
                          helperText={error.email}
                        />
                        {/* Password Field */}
                        <InputField
                          label="Password"
                          value={formData.password}
                          onChange={handleChange}
                          error={!!error.password}
                          helperText={error.password}
                          placeholder="Enter your Password"
                          type={showPassword ? "text" : "password"}
                          icon={<TbLockPassword />}
                          name="password"
                          sx={commonInputStyles} //2.25rem
                          showPassword={showPassword}
                          togglePasswordVisibility={togglePasswordVisibility}
                        />

                        <div className="w-full flex justify-end ">
                          <p
                            onClick={handleNavigate}
                            className="w-[40%]  text-sm text-end cursor-pointer text-[var(--lightBlue)] mt-2 font-medium"
                          >
                            Forget Password ?{" "}
                          </p>
                        </div>

                        <div className="mt-6">
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
                              "&:hover": {
                                backgroundColor: "var(--lightBlue)",
                              },
                            }}
                          >
                            {loading ? (
                              <CircularProgress
                                size={24}
                                sx={{ color: "white" }}
                              />
                            ) : (
                              "Login"
                            )}
                          </Button>
                        </div>

                        <div className=" flex justify-center items-center gap-1 sm:gap-1 md:gap-2  mt-12">
                          <p className="fontsizesm md:fontsizebase text-center text-[var(--pgColor)]">
                            Don’t have an Account?
                          </p>
                          <span
                            // router.push("/signup")
                            onClick={() => router.push("/signup")}
                            className="text-[var(--lightBlue)] font-medium cursor-pointer"
                          >
                            Register
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                renderStep()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
