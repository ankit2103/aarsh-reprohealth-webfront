"use client";
import Image from "next/image";
import { logoimg, loginsignup } from "../element/images";
import { useState } from "react";
import RoleComponent from "./role/page";
import Signup from "./signup/page";
import Createpassword from "./create-password/page";
import Otp from "./otp/page";
import { useRouter } from "next/navigation";
import LoginCard from "../custom-card/login-card";

const AuthSignup = () => {
  const [step, setStep] = useState("selectRole");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedRoleName, setSelectedRoleName] = useState(null);
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  const renderStep = () => {
    switch (step) {
      case "selectRole":
        return (
          <RoleComponent
            setStep={setStep}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            setSelectedRoleName={setSelectedRoleName}
          />
        );
      case "register":
        return (
          <Signup
            step={step}
            setStep={setStep}
            selectedRole={selectedRole}
            setUserData={setUserData}
          />
        );
      case "otp":
        return (
          <Otp
            step={step}
            setStep={setStep}
            selectedRole={selectedRole}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case "createPassword":
        return (
          <Createpassword step={step} setStep={setStep} userData={userData} />
        );
      default:
        return (
          <RoleComponent
            setStep={setStep}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            setSelectedRoleName={setSelectedRoleName}
          />
        );
    }
  };

  return (
    <div className="w-full  "> 
    {/* h-[100vh] overflow-hidden */}
      <div className="flex justify-between items-start flex-row ">
        <div className="w-0 sm:w-[50%]  hidden md:hidden lg:w-[50%] sm:inline-block  lg:inline-block">
          
          <div className="">
            <LoginCard selectedRole={selectedRole} setSelectedRole={setSelectedRole}/>
          </div>
        </div>
        <div
          className="w-[100%] sm:w-[50%] md:w-[100%] lg:w-[70%] h-[100%]"
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
            scrollBehavior: "smooth",
          }}
        >
          <div className="w-[90%] md:w-[80%]  flex justify-center items-center mx-auto py-6  sm:h-auto md:h-auto">
            <div className="flex flex-col justify-center items-center">
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
              <div className="">{renderStep()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSignup;
