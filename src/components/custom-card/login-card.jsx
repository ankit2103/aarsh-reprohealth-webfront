"use client";
import React, { useEffect, useState } from "react";
import { loginsignup, logoimg } from "../element/images";
import Image from "next/image";
import { usePathname } from 'next/navigation';

const LoginCard = ({selectedRole, setSelectedRole}) => {
  const [loginImage, setLoginImage] = useState(null);
  const path = usePathname();
  console.log("path---------------", path,selectedRole, selectedRole?.name);

    const loginSignupImages = {
    loginLeftImageNew: loginsignup?.loginLeftImageNew, // for Doctor
    loginImagePatient: loginsignup?.loginImagePatient,
    loginImageClinic: loginsignup?.loginImageClinic,
    loginImageLab: loginsignup?.loginImageLab,
  };
  
  useEffect(() => {
    const role = selectedRole?.name || 'Patient'; // Default to Patient

    switch (role) {
      case 'Patient':
        setLoginImage(loginSignupImages.loginImagePatient);
        break;
      case 'Doctor':
        setLoginImage(loginSignupImages.loginLeftImageNew);
        break;
      case 'Specialist Clinic':
        setLoginImage(loginSignupImages.loginImageClinic);
        break;
      case 'Labs':
        setLoginImage(loginSignupImages.loginImageLab);
        break;
      default:
        setLoginImage(loginSignupImages.loginImagePatient); // fallback default
    }
  }, [selectedRole?.name]);

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full ">
        {loginImage && (
        <Image
          src={loginImage || loginsignup.loginLeftImageNew}
          alt="image"
          height={"100%"}
          width={"100%"}
          className="w-[100%] h-[60vh]"
        />
        )}
      </div>
      <div className="w-full custom-gradient text-[var(--listText)]  h-[40vh] flex items-center flex-col justify-center">
        <div className="w-[80%] border-[var(--lightBlue)] border-l-4 rounded-l-lg rounded-r-lg  bg-[White] px-4 py-2 text-left  shadow-lg">
          <div className=" w-[100%] py-3">
            <div className="flex flex-row justify-start items-left">
              <h3 className="font-medium text-[#000]">Welcome to
             
                <span className="text-[#6CA8E6]"> Aar</span>
                <span className="text-[#FE85BD]">sh</span> ReproHealth
            </h3>
            </div>
            <p className="py-2">Compassionate Care. Smarter Access.</p>

            <p>Empowering You at Every Step of Your Reproductive Journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
