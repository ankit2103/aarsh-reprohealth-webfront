"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { userprofileimg } from "../../../components/element/images";
import { useDispatch, useSelector } from "react-redux";
import User from "../../../api/user/user.api";
import { updateUser } from "../../../redux/slice/user.slice";
import { toast } from "react-toastify";
import { ImagePlus } from "lucide-react";
import { updateProfileImage } from "../../../utils/file/file.util";
import { Country, State, City } from "country-state-city";
import PincodeAutoFill from "../../../utils/geolocation";
import { CircularProgress } from "@mui/material";
import InputField from "../../../components/custom-mui-input/page";
import { FaRegUser } from "react-icons/fa";
import { Grid } from "@mui/material";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { useAuthenticated } from "../../../hooks/useAuthenticated.hook";
import { useRouter } from "next/navigation";
import { MdOutlineBloodtype } from "react-icons/md";
import { TbMapPinCode } from "react-icons/tb";
import { LuLandmark } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { LuCalendar1 } from "react-icons/lu";
import dayjs from "dayjs";

import SelectField, {
  SelectLocalityField,
} from "../../../components/custome-select-input/page";

const UserProfile = () => {
  const isAuthenticated = useAuthenticated();
  const router = useRouter();
  // local state for dropdown
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [availableLocalities, setAvailableLocalities] = useState([]);
  const [languages, setLanguages] = useState(["English", "Hindi"]);
  const [genders, setGenders] = useState(["Male", "Female"]);
  const [bloodType, setBloodType] = useState([
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ]);

  const [selectedImage, setSelectedImage] = useState(null); // For preview and updated image
  const userInfo = useSelector((state) => state.user?.v_user_info);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    contact: "",
    gender: "",
    bloodGroup: "",
    dateOfBirth: "",
    houseNo: "",
    locality: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    alternateContact: "",
    language: "English",
  });
  const [errors, setErrors] = useState({});
  const [formErrors, setFormErrors] = useState({
    name: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "email",
      "contact",
      "gender",
      "bloodGroup",
      "dateOfBirth",
      "houseNo",
      "locality",
      "city",
      "state",
      "country",
      "pincode",
      "language",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file) return;

    // Create local preview URL
    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL); // Show preview
    // Create FormData
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await updateProfileImage(formData); // Send formData
      // console.log("Upload Success:", response);
      if (response?.code === 200) {
        setSelectedImage(response?.data);
      }

      // if (response?.data) {
      //   setSelectedImage(response?.data); // Update with server URL
      // }
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   let updatedValue = value;
  //   console.log("updated value--------------", updatedValue);
  //   if (name === "dateOfBirth") {
  //     const [day, month, year] = value.split("-"); // Convert YYYY-MM-DD to DD/MM/YYYY
  //     updatedValue = `${day}-${month}-${year}`;
  //     console.log("Updated value ---------------------", updatedValue, value);
  //   }

  //   // Restrict alternateContact to numeric input up to 15 digits
  //   if (name === "alternateContact") {
  //     if (!/^\d{0,15}$/.test(value)) return; // block invalid characters or length > 15
  //   }
  //   if (name === "pincode") {
  //     if (!/^\d{0,6}$/.test(value)) return;
  //   }

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: updatedValue, // Dynamically update form field based on name
  //   }));
  //   // Clear the error for this field when user starts typing/selecting again
  //   setErrors((prev) => ({
  //     ...prev,
  //     [name]: "",
  //   }));
  // };

  const handleChange = (eOrName, dateValue) => {
    let name, value;

    if (typeof eOrName === "object" && eOrName?.target) {
      name = eOrName.target.name;
      value = eOrName.target.value;
    } else {
      name = eOrName;
      value = dateValue?.format?.("DD/MM/YYYY");
    }
    if (!name) return;
    let updatedValue = value;

    // if (name === "dateOfBirth") {
    //   if (typeof value?.format === "function") {
    //     // dayjs instance
    //     updatedValue = value.format("DD/MM/YYYY");
    //   }
    // }

    if (name === "alternateContact") {
      if (!/^\d{0,15}$/.test(updatedValue)) return;
    }

    if (name === "pincode") {
      if (!/^\d{0,6}$/.test(updatedValue)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // If validation fails, stop the submission
    }
    const { countryCode, ...rest } = formData;
    const submitData = {
      ...rest,
      contact: `${countryCode} ${formData.contact}`, // Merge countryCode & contact
      profilePic: selectedImage,
    };

    setLoading(true);
    // console.log("user Data in UpdateProfile before submit:", submitData);
    try {
      const result = await User.updateUserProfile(submitData);
      if (result?.code === 200) {
        let data = result.data;
        dispatch(updateUser(data?.user));
        setLoading(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(result?.message || "Failed to update profile.");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData({
      gender: "",
      bloodGroup: "",
      dateOfBirth: "",
      houseNo: "",
      locality: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      alternateContact: "",
      language: "",
      profilePic: "",
    });
  };
  // select country
  const handleCountryChange = (e) => {
    // alert("called")
    const selectedCountryCode = e.target.value;
    const selectedCountry = countries.find(
      (c) => c.isoCode === selectedCountryCode
    );

    const stateList = State.getStatesOfCountry(selectedCountryCode);
    setStates(stateList);
    setCities([]); // Clear cities when country changes
    // console.log("selectedCountry---------", selectedCountry);
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry.name,
      state: "",
      city: "",
      pincode: "",
    }));
  };
  const handleStateChange = (e) => {
    const selectedStateCode = e.target.value;
    const selectedState = states.find((s) => s.isoCode === selectedStateCode);

    if (!selectedState) return;
    const countryIsoCode =
      countries.find((c) => c.name === formData.country)?.isoCode || "IN";

    const cityList = City.getCitiesOfState(countryIsoCode, selectedStateCode); // Make sure both values are correct

    setCities(cityList);

    setFormData((prev) => ({
      ...prev,
      state: selectedState.name,
      city: "",
      pincode: "",
    }));
  };

  const handleCityChange = async (e) => {
    const selectedCity = e.target.value;
    const stateCode = states.find((s) => s.name === formData.state)?.isoCode;
    const countryCode = countries.find((c) => c.name === formData.country)
      ?.isoCode;

    setFormData((prev) => ({
      ...prev,
      city: selectedCity,
      pincode: "",
    }));
  };
  const handleAutoComplete = ({ state, city, localities }) => {
    setAvailableLocalities(localities);
  };

  useEffect(() => {
    if (userInfo?.profilePic) {
      setSelectedImage(userInfo.profilePic);
    }

    if (userInfo) {
      const contactParts = userInfo.contact?.split(" ") || [];
      setFormData({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        countryCode: contactParts[0] || "+91",
        contact: userInfo?.contact?.replace(/^\+\d+/, "") || "",
        gender: userInfo?.gender || "",
        bloodGroup: userInfo?.bloodGroup || "",
        dateOfBirth: userInfo?.dateOfBirth
          ? dayjs(userInfo.dateOfBirth).format("MM/DD/YYYY")
          : "",
        houseNo: userInfo?.address?.houseNo || "",
        locality: userInfo?.address?.locality || "",
        city: userInfo?.address?.city || "",
        state: userInfo?.address?.state || "",
        country: userInfo?.address?.country || "",
        pincode: userInfo?.address?.pincode || "",
        alternateContact: userInfo?.alternateContact || "",
        language: userInfo?.language || "English",
      });
    }
  }, [userInfo?.profilePic, userInfo]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);

    const defaultCountryCode =
      allCountries.find((c) => c.name === formData.country)?.isoCode || "IN";
    const allStates = State.getStatesOfCountry(defaultCountryCode);
    setStates(allStates);
  }, []);

  useEffect(() => {
    isAuthenticated === false ? router.push("/login") : "/";
  }, []);
  const selectStyles = {
    colors: {
      iron: "var(--Iron)",
      lightBlue: "var(--lightBlue)",
      greyP: "var(--greyP)",
      white: "var(--White)",
    },
    control: (base, state) => ({
      ...base,
      marginTop: "3px",
      padding: "2px",
      color: selectStyles.colors.greyP,
      border: `2px solid ${selectStyles.colors.iron}`,
      borderRadius: "8px",
      borderColor: state.isFocused
        ? selectStyles.colors.lightBlue
        : selectStyles.colors.iron,
      boxShadow: state.isFocused
        ? `0 0 0 2px ${selectStyles.colors.lightBlue}`
        : "none",
      "&:hover": {
        borderColor: state.isFocused
          ? selectStyles.colors.white
          : selectStyles.colors.iron,
      },
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      borderRadius: "3px",
      backgroundColor:
        isFocused || isSelected ? selectStyles.colors.lightBlue : "white",
      color: isFocused ? "white" : selectStyles.colors.greyP,
    }),
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
      <div className="w-[100%] md:mt-10 lg:mt-10 px-4">
        <div className="w-full relative ">
          <div className="relative">
            <Image
              src={userprofileimg.img1}
              alt="banner Image"
              className="w-full "
            />
          </div>

          <div className=" flex items-center gap-3 absolute md:top-[6.5rem]">
            <div className="w-[120px] h-[120px] relative">
              {/* left-5 -mt-10 */}
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="opacity-0 w-[120px] h-[120px] z-10 absolute  cursor-pointer"
                onChange={handleImageChange}
              />
              <ImagePlus
                size={20}
                className="text-[var(--lightBlue)]  cursor-pointer  absolute left-20 mt-16 bg-[var(--White)]"
              />
              {/* {userInfo?.profilePic ? ( */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--lightBlue)] bg-[var(--White)]">
                {(userInfo?.profilePic || selectedImage) && (
                  <Image
                    src={userInfo?.profilePic || selectedImage}
                    alt="Profile Image"
                    width={120}
                    height={120}
                    className="object-contain w-[94px] h-[94px] rounded-full"
                  />
                )}
              </div>
            </div>

            <div className="lg:mt-6 hidden md:block">
              {/* absolute left-36 -mt-13 */}
              <p> {userInfo?.name}</p>
              <p className="text-[var(--lightgray)]"> {userInfo?.email}</p>
            </div>

          </div>
        </div>
        <div className="md:w-[100%] mt-5 flex flex-col md:flex-row justify-end items-end gap-3  px-2 sm:px-2 md:px-3 lg:px-3 ">
          <button
            // type="submit"
            // onClick={handleSubmit}
            className="bg-[var(--lightBlue)] capitalize text-[var(--White)] hover:bg-[var(--lightBlue)]  transition duration-300 font-semibold rounded-full  p-2   sm:p-2 md:p-2 lg:p-2 sm:w-[150px] md:w-[150px] lg:w-[150px]"
          >
            purchased plan
          </button>
        </div>
        <div className="mt-20 lg:mt-8 mb-5">
          <form onSubmit={handleSubmit} className="">
            {/* Personal detail */}
            <div className="mb-6">
              <h3 className="text-[var(--lightgray)] font-medium">
                Personal Details
              </h3>
            </div>
            <Grid
              container
              alignItems="center"
              columnSpacing={2}
              rowSpacing={2}
              mb={2}
            >
              <Grid item xs={12} md={4}>
                <InputField
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  icon={<FaRegUser />}
                  sx={{
                    paddingRight: "1rem",
                    ...commonInputStyles,
                  }}
                  name="name"
                  helperText={formErrors.name}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  icon={<MdOutlineMailOutline />}
                  sx={{
                    paddingRight: "1rem",
                    ...commonInputStyles,
                  }}
                  name="email"
                  helperText={formErrors.email}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="Mobile Number"
                  value={formData.contact}
                  // onChange={handleChange}
                  placeholder="Enter your contact"
                  icon={<BsTelephone />}
                  // sx={{
                  //   paddingRight: "1rem",
                  //   ...commonInputStyles,
                  // }}
                  sx={{
                    // ...commonInputStyles,
                    paddingRight: "1rem",
                    backgroundColor: "transparent !important",
                    color: "inherit",
                    WebkitTextFillColor: "inherit", // override MUI disabled style
                    cursor: "not-allowed",
                  }}
                  name="contact"
                  helperText={formErrors.contact}
                  isRequired={true}
                  disabled
                 
                />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              columnSpacing={2}
              rowSpacing={2}
              mb={2}
            >
              <Grid item xs={12} md={4}>
                <SelectField
                  label="Gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  placeholder="Select your Gender"
                  name="gender"
                  options={genders}
                  className="border border-[var(--greyborder)] text-[var(--black)]"
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectField
                  label="Blood Group"
                  value={formData.bloodGroup || ""}
                  //  value={options.find(
                  //   (opt) => opt.value === formData.bloodGroup
                  // )}
                  onChange={handleChange}
                  placeholder="Select your blood group"
                  name="bloodGroup"
                  options={bloodType}
                  className="border border-[var(--greyborder)] text-[var(--black)]"
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="DOB"
                  // value={
                  //   formData.dateOfBirth
                  //     ? formData.dateOfBirth.split("/").reverse().join("-") // Convert DD/MM/YYYY to YYYY-MM-DD for input field
                  //     : ""
                  // }
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="Enter your date of birth"
                  icon={<LuCalendar1 />}
                  sx={{
                    borderRadius: "10px!important",
                    border: "1px!important",
                  }}
                  name="dateOfBirth"
                  helperText={formErrors.dateOfBirth}
                  isRequired={true}
                />
              </Grid>
            </Grid>

            {/* Address detail */}

            <div className="mt-6 mb-6">
              <h3 className="text-[var(--lightgray)] font-medium">
                Address Details
              </h3>
            </div>
            <Grid
              container
              alignItems="center"
              columnSpacing={2}
              rowSpacing={2}
              mb={2}
            >
              <Grid item xs={12} md={4}>
                <InputField
                  label="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter your pincode"
                  icon={<TbMapPinCode />}
                  sx={{
                    paddingRight: "1rem",
                    ...commonInputStyles,
                  }}
                  name="pincode"
                  helperText={formErrors.pincode}
                  isRequired={true}
                />
                <PincodeAutoFill
                  formData={formData}
                  setFormData={setFormData}
                  pinField="pincode"
                  onAutoComplete={handleAutoComplete}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectField
                  label={"Colony/Locality"}
                  value={formData.locality}
                  onChange={handleChange}
                  placeholder="Select your locality"
                  name="locality"
                  options={availableLocalities}
                  className="border border-[var(--greyborder)] text-[var(--black)]"
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label={"House no./Street/Area"}
                  value={formData.houseNo}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  name="houseNo"
                  className="border border-[var(--greyborder)] text-[var(--black)]"
                  isRequired={true}
                  icon={<LuLandmark />}
                />
              </Grid>
            </Grid>
            {/* Country Dropdown */}
            <Grid
              container
              alignItems="center"
              columnSpacing={2}
              rowSpacing={2}
              mb={2}
            >
              <Grid item xs={12} md={4}>
                <SelectLocalityField
                  label="Country"
                  name="country"
                  value={
                    countries.find((c) => c.name === formData.country)
                      ?.isoCode || ""
                  }
                  onChange={(e) => {
                    const selectedIsoCode = e.target.value;
                    const selectedCountry =
                      countries.find((c) => c.isoCode === selectedIsoCode)
                        ?.name || "";

                    setFormData((prev) => ({
                      ...prev,
                      country: selectedCountry,
                    }));

                    handleCountryChange(e);
                  }}
                  placeholder="Select Country"
                  options={countries.map((c) => ({
                    label: c.name,
                    value: c.isoCode,
                  }))}
                  className="border border-[var(--greyborder)] text-[var(--black)]"
                  isRequired={true}
                  error={errors.country}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectLocalityField
                  label="State"
                  name="state"
                  value={
                    states.find((s) => s.name === formData.state)?.isoCode || ""
                  }
                  onChange={(e) => {
                    const selectedIsoCode = e.target.value;
                    const selectedState =
                      states.find((s) => s.isoCode === selectedIsoCode)?.name ||
                      "";

                    setFormData((prev) => ({
                      ...prev,
                      state: selectedState,
                    }));

                    handleStateChange(e); // Optional: if you have other side effects
                  }}
                  placeholder="Select State"
                  options={states.map((s) => ({
                    label: s.name,
                    value: s.isoCode,
                  }))}
                  className="border border-[var(--greyborder)] text-[var(--black)]"
                  isRequired={true}
                  error={errors.state}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectLocalityField
                  label="City"
                  name="city"
                  value={formData.city.trim()}
                  onChange={(e) => {
                    const selectedName = e.target.value;
                    const selectedCity = cities.find(
                      (c) => c.name === selectedName
                    );
                    setFormData((prev) => ({
                      ...prev,
                      city: selectedCity,
                    }));

                    handleCityChange(e);
                  }}
                  placeholder="Select City"
                  options={cities.map((c) => c.name.trim())}
                  className="border border-[var(--greyborder)] text-[var(--black)]"
                  isRequired={true}
                  error={errors.city}
                />
              </Grid>
            </Grid>

            {/* other details */}
            <div className="mt-6 mb-6">
              <h3 className="text-[var(--lightgray)] font-medium">
                Other Details
              </h3>
            </div>
            <Grid
              container
              alignItems="center"
              columnSpacing={2}
              rowSpacing={2}
              mb={2}
            >
              <Grid item xs={12} md={4}>
                <InputField
                  label="Alternative Phone No."
                  value={formData.alternateContact}
                  onChange={handleChange}
                  placeholder="Enter your alternate phone no."
                  icon={<BsTelephone />}
                  sx={{
                    paddingRight: "1rem",
                    ...commonInputStyles,
                  }}
                  name="alternateContact"
                  helperText={formErrors.alternateContact}
                  isRequired={false}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectField
                  label="language"
                  value={formData.language || ""}
                  onChange={handleChange}
                  placeholder="Select language"
                  name="language"
                  options={languages}
                  className="border border-[var(--greyborder)] text-[var(--black)]"
                  isRequired={true}
                />
              </Grid>
            </Grid>
            <div className="md:w-[100%] mt-14 flex flex-col md:flex-row justify-end items-end gap-3  px-2 sm:px-2 md:px-3 lg:px-3 ">
              <button
                type="submit"
                // onClick={handleSubmit}
                disabled={loading}
                className="bg-[var(--lightBlue)] text-[var(--White)] hover:bg-[var(--lightBlue)]  transition duration-300 font-semibold rounded-full  p-2   sm:p-2 md:p-2 lg:p-2 sm:w-[150px] md:w-[150px] lg:w-[150px]"
              >
                {loading ? (
                  <CircularProgress size={10} sx={{ color: "white" }} />
                ) : (
                  "Update Profile"
                )}
              </button>
              <button
                // type="submit"
                onClick={handleReset}
                className="bg-[var(--pink)] text-[var(--White)] hover:bg-[var(--lightBlue)]  transition duration-300 font-semibold rounded-full  p-2   sm:p-2 md:p-2 lg:p-2 sm:w-[150px] md:w-[150px] lg:w-[150px]"
              >
                Reset
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

