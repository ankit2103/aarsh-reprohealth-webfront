import React, { useState, useEffect } from "react";

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
import Auth from "../../../api/auth/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TbArrowBackUp } from "react-icons/tb";
import { customList } from "country-codes-list";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { CircularProgress } from "@mui/material";
import { color } from "framer-motion";
import { useAuthenticated } from "../../../hooks/useAuthenticated.hook";
import { IoArrowBackSharp } from "react-icons/io5";
import InputField from "../../custom-mui-input/page";
import SelectField from "../../custome-select-input/page";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMedicineBox } from "react-icons/ai";

const callingCodes = Object.values(
  customList("countryCode", "+{countryCallingCode}")
);
// Remove duplicates (some countries share the same code)
const countryCodes = [...new Set(callingCodes)];

const Signup = ({ step, setStep, selectedRole, setUserData }) => {
  console.log("Signup selectedRole:", selectedRole);
  const isAuthenticated = useAuthenticated();
  const router = useRouter();
  const [selectedRoleName, setSelectedRoleName] = useState(null);
  const [loading, setLoading] = useState(false);

  const [salutations, setSalutations] = useState([
    "Dr.",
    "Mr.",
    "Mrs.",
    "Miss",
  ]);
  const [formData, setFormData] = useState({
    roleId: "",
    salutation: "",
    firstName: "",
    lastName: "",
    countryCode: "",
    contact: "",
    email: "",
    company: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });

  const goback = () => {
    setStep("selectRole");
  };
  // Validate individual fields
  const validateForm = (name, value) => {
    let error = "";

    // Basic text fields: firstName, lastName, company
    const alphabetRegex = /^[A-Za-z\s]+$/;
    // Fields that share the same validation rules
    const alphabetOnlyFields = ["firstName", "lastName", "company"];
    const isAlphabetOnlyField = alphabetOnlyFields.includes(name);
    

    if (isAlphabetOnlyField) {
      const isRequired =
        name === "company"
          ? formData.company !== "" && formData.company !== undefined
          : true;

      if (isRequired) {
        if (!value.trim()) {
          error = "This field is required";
        } else if (value.length <= 0 || value.length > 60) {
          error = "Maximum  60 characters long";
        } else if (!alphabetRegex.test(value)) {
          error = "Only alphabets are allowed";
        }
      }
    }

    // Email field
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = "Email is required";
      } else if (value.length < 8 || value.length > 60) {
        error = "Email must be between 8 and 60 characters";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email format";
      }
    }
    // Contact
    if (name === "contact") {
      const countryDialCode = formData.countryCode; // e.g. "+91"
      const phoneNumberStr = `${countryDialCode}${value}`;

      if (!value.trim()) {
        error = "Contact number is required";
      } else if (!/^\d+$/.test(value)) {
        error = "Contact number must contain only digits";
      } else if (value.length > 15) {
        error = "Contact number must not exceed 15 digits";
      } else {
        const phoneNumber = parsePhoneNumberFromString(phoneNumberStr);
        if (!phoneNumber || !phoneNumber.isValid()) {
          error = "Invalid contact number for selected country code";
        }
      }
    }
    if (error) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
      return false; // field is invalid
    }
    // If no error, return true (field is valid)
    return true;
  };
  // Validate all fields before submit
  const isFormValid = () => {
    let valid = true;

    Object.entries(formData).forEach(([name, value]) => {
      const isFieldValid = validateForm(name, value);
      if (!isFieldValid) valid = false;
    });

    return valid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValue =
      name === "email"
        ? value.toLowerCase()
        : name === "firstName"
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : name === "lastName"
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : name === "contact"
        ? value.replace(/\D/g, "")
        : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Run full form validation
    const isValid = isFormValid();
    // console.log("is valid--------------", isValid);
    const reqBody = {
      salutation: formData.salutation,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      contact: `${formData.countryCode} ${formData.contact}`,
      email: formData.email,
      roleId: selectedRole._id || "",
      company: formData.company || "",
    };
    if (!isValid) {
      console.log("Validation failed, errors: ", formErrors); // check for errors
      return;
    }
    try {
      setLoading(true);

      const result = await Auth.signup(reqBody);

      if (result?.code === 200) {
        setLoading(false);
        setUserData(result?.data);
        setStep("otp");

      }
      else if(result?.code ===201){
        toast.error(result?.message);
        setLoading(false);
      }
       

        setLoading(false);
      
    } 
    catch (error) {
      console.log("error in signup submit:", error);
    }
    finally{
      setLoading(false);
    }

    if (selectedRole) {
    } else {
      toast.error("Please select a role before continuing.");
    }
  };
  useEffect(() => {
    setSelectedRoleName(selectedRole?.name);
    if (countryCodes.length > 0 && !formData.countryCode) {
      setFormData((prev) => ({ ...prev, countryCode: countryCodes[85] }));
    }

    if (selectedRoleName == "Patient") {
      setSalutations(["Mr.", "Mrs.", "Miss"]);
      setFormData((prev) => ({ ...prev, salutation: "Mr." }));
    } else if (selectedRoleName == "Doctor") {
      setSalutations(["Dr."]);
      setFormData((prev) => ({ ...prev, salutation: "Dr." }));
    } else {
      setSalutations(["Dr.", "Mr.", "Mrs.", "Miss"]);
      setFormData((prev) => ({ ...prev, salutation: "Dr." }));
    }
  }, [selectedRole, selectedRoleName]);

  const commonInputStyles = {
    borderRadius: "10px",
    color: "var(--black) !important",
    "& .MuiOutlinedInput-root": { borderRadius: "10px" },
    "& fieldset": {
      borderColor: "var(--greyborder) !important",
      color: "var(--black) !important",
    },
    "&:hover fieldset": { borderColor: "var(--lightBlue)" },
    "&.Mui-focused fieldset": {
      borderColor: "var(--lightBlue) !important",
      // borderWidth: "1px",
    },
    "& .MuiInputLabel-root": { color: "var(--greyP) !important" },
    "& .Mui-focused": { color: "var(--black) !important" },
  };
  const ITEM_HEIGHT = 38; // height of one item
  const VISIBLE_ITEMS = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
      },
    },
  };

  return (
    <div className="w-[100%] h-[100%] ">
      
        <div className=" flex justify-center items-center flex-col">
          <div className="w-[100%] sm:w-[95%] lg:w-[80%] mt-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div onClick={goback} className="">
                    <IoArrowBackSharp className="inline text-lg sm:text-2xl font-medium text-[var(--black)] cursor-pointer" />
                  </div>
                  <h3 className=" authPagesheading font-medium text-[var(--midnight)]">
                    Create Your Account
                  </h3>
                </div>
                <p className="text-[var(--pgColor)] text-base">
                  Start your journey with secure access to your healthcare
                  services.
                </p>

                <form onSubmit={handleSubmit} className="py-6">
                  {["Specialist Clinic", "Labs"].includes(selectedRoleName) && (
                    <>
                      {/* <label className="font-[500] pt-6" >Company Name</label> */}
                      <InputField
                        name="company"
                        label="Company Name"
                        fullWidth
                        placeholder="Enter your company name"
                        // required
                        icon={<AiOutlineMedicineBox />}
                        value={formData.company}
                        onChange={handleChange}
                        // error={Boolean(formErrors.company)}
                        helperText={formErrors.company}
                        sx={{ marginBottom: "0.5rem" }}
                        // sx={{ marginBottom: "1.25rem", ...commonInputStyles }}
                      />
                    </>
                  )}

                  <Grid container spacing={2}>
                    {selectedRoleName !== "Doctor" ? (
                      <Grid item xs={4} md={2}>
                        <SelectField
                          label="Salutation"
                          value={formData.salutation || ""}
                          onChange={handleChange}
                          placeholder="Select salutation"
                          name="salutation"
                          options={salutations}
                          className="border border-[var(--greyborder)] text-[var(--black)]"
                        />
                      </Grid>
                    ) : (
                      // Automatically set salutation to 'Dr.' if it's not already set
                      formData.salutation !== "Dr." &&
                      setFormData((prev) => ({ ...prev, salutation: "Dr." }))
                    )}

                    <Grid
                      item
                      xs={8}
                      md={selectedRoleName === "Doctor" ? 6 : 5}
                    >
                      <InputField
                        label="First Name"
                        name="firstName"
                        value={
                          selectedRoleName === "Doctor"
                            ? `Dr. ${formData.firstName}`
                            : formData.firstName
                        }
                        // onChange={handleChange}
                        onChange={(e) => {
                          // Remove "Dr. " prefix if present before storing
                          const cleanedValue =
                            selectedRoleName === "Doctor"
                              ? e.target.value.replace(/^Dr\.\s*/i, "")
                              : e.target.value;

                          handleChange({
                            target: {
                              name: "firstName",
                              value: cleanedValue,
                            },
                          });
                        }}
                        helperText={formErrors.firstName}
                        placeholder="Enter your first name"
                        icon={<FaRegUser />}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={selectedRoleName === "Doctor" ? 6 : 5}
                    >
                      <InputField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        helperText={formErrors.lastName}
                        placeholder="Enter your last name"
                        icon={<FaRegUser />}
                      />
                    </Grid>

                    <Grid item xs={12} md={10}></Grid>
                    {/* <label className="font-bold" >First Name</label> */}

                    {/* <div className="mt-2">
                        <TextField
                          name="firstName"
                          label="First Name"
                          fullWidth
                          value={formData.firstName}
                          onChange={handleChange}
                          variant="outlined"
                          // error={Boolean(formErrors.firstName)}
                          helperText={formErrors.firstName}
                          // sx={commonInputStyles}
                        />
                      </div> */}

                    {/* <Grid item xs={12} md={12}>
                      <TextField
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        value={formData.lastName}
                        onChange={handleChange}
                        // error={Boolean(formErrors.lastName)}
                        helperText={formErrors.lastName}
                        sx={commonInputStyles}
                      />
                    </Grid> */}
                  </Grid>

                  {/* Specialty Clinics/Hospitals */}
                  {/* <label className="font-[500]">Email</label> */}

                  <InputField
                  type="email"
                    name="email"
                    label="Email"
                    fullWidth
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    // error={Boolean(formErrors.email)}
                    helperText={formErrors.email}
                    // sx={commonInputStyles}
                    icon={<MdOutlineMailOutline />}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <Box sx={{ width: "100px" }}>
                      <FormControl
                        fullWidth
                        error={Boolean(formErrors.countryCode)}
                      >
                        <label className="font-[500] mt-[0.5rem]">
                          Country Code
                        </label>
                        <Select
                          // label="Country code"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          // error={Boolean(formErrors.countryCode)}
                          helperText={formErrors.countryCode}
                          sx={{ marginTop: "0.5rem", ...commonInputStyles }}
                          MenuProps={MenuProps}
                        >
                          {countryCodes.map((code, index) => (
                            <MenuItem key={index} value={code}>
                              {code}
                            </MenuItem>
                          ))}
                        </Select>
                        {formErrors.countryCode && (
                          <FormHelperText>
                            {formErrors.countryCode}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>

                    <Box className="w-[100%]">
                      <InputField
                        type="tel"
                        name="contact"
                        label="Contact No."
                        icon={<BsTelephone />}
                        fullWidth
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Enter your contact no."
                        helperText={formErrors.contact}
                      />
                    </Box>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                      padding: "12px 10px",
                      borderRadius: "8px",
                      marginTop: "2.2rem",
                      backgroundColor: "var(--lightBlue)",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Send OTP"
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

export default Signup;

{
  /* <p className="text-[var(--lightgray)]">
              Join Aarsh ReproHealth for expert guidance, personalized care, and
              a supportive community on your reproductive health journey.
            </p> */
}
