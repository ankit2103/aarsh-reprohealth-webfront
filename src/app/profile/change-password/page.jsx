"use client";
import React, { use, useState } from "react";
import { ChangePasswordicons } from "../../../components/element/icons";
import {Grid} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Auth from "../../../api/auth/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputField from "../../../components/custom-mui-input/page";
import { TbLockPassword } from "react-icons/tb";
import { logout } from "../../../utils/common.util";
import { useRouter } from "next/navigation";
//  Define Form Validation Schema

const ChangePassword = () => {
   const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user?.v_user_info);
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: userInfo?._id || "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
  password: "",
  newPassword: "",
  confirmNewPassword: "",
});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState("");
  // Disable submit button if passwords don't match
  const isDisabled = formData.newPassword !== formData.confirmNewPassword;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };
  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((prev) => !prev);
  };

  const validatePasswords = () => {
  if (formData.newPassword !== formData.confirmNewPassword) {
    setFormErrors((prev) => ({
      ...prev,
      confirmNewPassword: "Confirm Password must match New Password.",
    }));
    return false;
  }
  return true;
};

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  setFormErrors((prev) => {
    const newErrors = { ...prev };
    if (name === "confirmNewPassword" || name === "newPassword") {
      if (
        name === "confirmNewPassword" &&
        formData.newPassword &&
        value !== formData.newPassword
      ) {
        newErrors.confirmNewPassword = "Confirm Password must match New Password.";
      } else if (
        name === "newPassword" &&
        formData.confirmNewPassword &&
        formData.confirmNewPassword !== value
      ) {
        newErrors.confirmNewPassword = "Confirm Password must match New Password.";
      } else {
        newErrors.confirmNewPassword = "";
      }
    }
    return newErrors;
  });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePasswords()) return; // Stop submission if passwords don't match
    setLoading(true);
    // alert("Appointment booked successfully!");

    try {
      const reqBody = {
        id: formData.id,
        password: formData.password,
        newPassword: formData.newPassword,
      };

      const result = await Auth.resetPassword(reqBody);
      if (result.code == 200) {
        toast.success(result.message || "Password updated successfully");
        setFormData({
          id: userInfo?._id || "",
          password: "",
          newPassword: "",
          confirmNewPassword: "",
        });

        setLoading(false);
        logout(router, dispatch);
      }
    } catch (error) {
      console.log("error in change password:", error);
    }
  };
  const commonInputStyles = {
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": { borderRadius: "10px" },
    "& fieldset": { borderColor: "var(--Iron) !important" },
    "&:hover fieldset": { borderColor: "var(--lightBlue)" },
    "&.Mui-focused fieldset": {
      borderColor: "var(--lightBlue) !important",
      borderWidth: "2px",
    },
    "& .MuiInputLabel-root": { color: "var(--Iron)" },
    "& .Mui-focused": { color: "var(--lightBlue) !important" },
  };

  return (
    <div className="w-full flex ">
      <div className="w-[100%] md:mt-10 lg:mt-10 md:px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full  md:shadow md:rounded-lg p-0 sm:p-2  md:p-2 lg:p-8 space-y-12  "
        >
          <div className="text-[var(--black)] hidden md:flex items-center gap-2 bold">
            <span className="text-4xl text-[var(--lightBlue)]">
              {ChangePasswordicons.RiKey2Line}
            </span>
            <h3 className="text-xl text-[var(--listText)] font-500">Change Password</h3>
          </div>
          <Grid container alignItems="center"  columnSpacing={2} rowSpacing={2} mb={2}>
            <Grid item xs={12} md={4}>
              <InputField
                label="Current password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your current password"
                type={showPassword ? "text" : "password"}
                icon={<TbLockPassword />}
                sx={{
                  // height:"2em",
                  // marginTop: "0.5rem",
                  paddingRight: "1rem",

                  ...commonInputStyles,
                }}
                name="password"
                helperText={formErrors.password}

                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField
                label="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Create your new password"
                type={showNewPassword ? "text" : "password"}
                icon={<TbLockPassword />}
                sx={{
                  // marginTop: "1rem",
                  paddingRight: "1rem",
                  ...commonInputStyles,
                }}
                name="newPassword"
                helperText={formErrors.newPassword}
                showNewPassword={showNewPassword}
                toggleNewPasswordVisibility={toggleNewPasswordVisibility}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField
                label="Confirm Password"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                type={showConfirmNewPassword ? "text" : "password"}
                icon={<TbLockPassword />}
                sx={{
                  // marginTop: "1rem",
                  paddingRight: "1rem",
                  ...commonInputStyles,
                }}
                name="confirmNewPassword"
                helperText={formErrors.confirmNewPassword}
                showConfirmNewPassword={showConfirmNewPassword}
                toggleConfirmNewPasswordVisibility={
                  toggleConfirmNewPasswordVisibility
                }
              />
            </Grid>
          </Grid>

          <div className="flex justify-end gap-3  px-2 sm:px-2 md:px-3 lg:px-3">
            <button
              // type="submit"
              onClick={handleSubmit}
              disabled={isDisabled || loading}
              className="bg-[var(--lightBlue)] text-[var(--White)] hover:bg-[var(--lightBlue)]  transition duration-300 font-semibold rounded-full  p-2   sm:p-2 md:p-2 lg:p-2 sm:w-[150px] md:w-[150px] lg:w-[150px]"
            >
              {loading ? "Updating..." : "Save Details"}
            </button>
            <button
              type="submit"
              className="bg-[var(--pink)] text-[var(--White)] hover:bg-[var(--lightBlue)]  transition duration-300 font-semibold rounded-full  p-2   sm:p-2 md:p-2 lg:p-2 sm:w-[150px] md:w-[150px] lg:w-[150px]"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

{
  /* <InputLabel sx={{ color: "var(--black)", ...commonInputStyles }}>
Current Password <span className="text-[var(--red)]">*</span>
</InputLabel> */
}

{
  /* <TextField
                label="Enter your currrent password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                name="password"
                onChange={handleChange}
                sx={{ ...commonInputStyles, mt: 1, pr: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                
              /> */
}
{
  /* <TextField
                label="Enter new Paswword"
                type={showNewPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                sx={{ ...commonInputStyles, mt: 1, pr: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleNewPasswordVisibility}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */
}
{
  /* <TextField
                label="Enter Confirm New Paswword"
                type={showConfirmNewPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                sx={{ ...commonInputStyles, mt: 1, pr: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleConfirmNewPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmNewPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */
}
