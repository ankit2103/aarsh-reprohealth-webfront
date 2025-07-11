import React, { useState, useEffect } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import RoleApi from "../../../api/role/role.api";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { HiOutlineUser } from "react-icons/hi2";
import { BiClinic } from "react-icons/bi";
import { LuFlaskRound } from "react-icons/lu";
import { roleIcon } from "../../element/images";
import Image from "next/image";

// const icons = [

//   { patientIcon: <HiOutlineUser /> },
//   { doctorIcon: <FaUserDoctor /> },
//   { clinic: <BiClinic /> },
//   { lab: <LuFlaskRound /> },
// ];
const icons = [
  { active: roleIcon.patientActive, inActive: roleIcon.patientInActive },
  { active: roleIcon.doctorActive, inActive: roleIcon.doctorInActive },
  { active: roleIcon.clinicActive, inActive: roleIcon.clinicInActive },
  { active: roleIcon.labActive, inActive: roleIcon.labInActive },
];

const RoleComponent = ({ setStep, selectedRole, setSelectedRole }) => {
  const roleApi = new RoleApi();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const result = await roleApi.getAllRole();
      setLoading(false);
      if (result?.data) {
        setRoles(result.data);
        const defaultRole = result.data.find((role) => role.name === "Patient");
        // console.log("defaultRole-------------------", defaultRole);

        if (defaultRole) {
          setSelectedRole(defaultRole);
        }
      }
    } catch (error) {
      console.log("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleContinue = () => {
    console.log("selectedRole", selectedRole);
    if (selectedRole) {
      setStep("register");
    } else {
      toast.error("Please select a role before continuing.");
    }
  };

  return (
    <div className="w-[100%]">
      {/* rounded-md shadow-lg */}
      <div className="w-[100%] sm:w-[95%] lg:w-[80%] flex justify-center items-center mx-auto ">
       
          <div className=" w-full mt-4 text-left ">
            <div className="">
              <div className="flex items-center  gap-2 sm:gap-4">
                <div onClick={() => router.push("/")} className="">
                  <IoArrowBackSharp className=" text-lg sm:text-2xl font-bold text-[var(--black)] cursor-pointer" />
                </div>
                <h3 className="authPagesheading text-[var(--midnight)] font-medium">
                  Choose Your Role
                </h3>
              </div>
              <p className="text-[var(--pgColor)] text-base">
                Select the account type that best fits your needs and get
                started on your reproductive health journey.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleContinue();
              }}
              className="mt-6"
            >
              {loading
                ? // Skeleton Loader
                  [...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 mb-4 bg-gray-100"
                    >
                      <span className="w-6 h-6 rounded-full bg-gray-300" />
                      <div className="h-4 bg-gray-300 rounded w-1/3" />
                    </div>
                  ))
                : roles
                    .filter((role) => role.name !== "Admin")
                    .map((role) => (
                      <div
                        key={role._id}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer mb-4 ${
                          selectedRole._id === role._id
                            ? " border-[var(--lightBlue)]"
                            : "border-gray-300"
                        }`}
                        onClick={() => {
                          {
                            setSelectedRole(role);
                            // console.log("role--------------", role);
                            return <></>;
                          }
                        }}
                      >
                      
                        <span
                          className={`w-8 h-8 flex justify-center items-center  ${
                            selectedRole._id === role._id
                              ? "text-[var(--lightBlue)] border-[var(--lightBlue)]"
                              : "bg-grey-500 text-[var(--greyP)] border-[var(--greyP)]"
                          }`}
                        >
                          <Image
                            src={
                              role.name === "Patient"
                                ? selectedRole._id === role._id
                                  ? icons[0].active
                                  : icons[0].inActive
                                : role.name === "Doctor"
                                ? selectedRole._id === role._id
                                  ? icons[1].active
                                  : icons[1].inActive
                                : role.name === "Specialist Clinic"
                                ? selectedRole._id === role._id
                                  ? icons[2].active
                                  : icons[2].inActive
                                : role.name === "Labs"
                                ? selectedRole._id === role._id
                                  ? icons[3].active
                                  : icons[3].inActive
                                : "/default-icon.svg"
                            }
                            alt={`${role.name} icon`}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </span>

                        <label
                          className={`font-medium fontsizebase ${
                            selectedRole._id === role._id
                              ? "text-[var(--lightBlue)]"
                              : "text-[var(--greyP)]"
                          } `}
                        >
                          {role.name}
                        </label>
                        <input
                          type="radio"
                          id={role._id}
                          value={role._id}
                          className="hidden"
                        />
                      </div>
                    ))}

              <button
                type="submit"
                className="w-full bg-[var(--lightBlue)] text-white py-3 my-3 rounded-md"
                disabled={loading}
              >
                {/* {loading ? <CircularProgress size={24} sx={{ color: "white" }} />: "Continue"} */}
                Continue
              </button>
            </form>
          </div>
        
      </div>
    </div>
  );
};

export default RoleComponent;
