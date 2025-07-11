import React from "react";
import Image from "next/image";
import { underlineimg, welcomeimg } from "../../../components/element/images";

const data =
  "We use only the best quality materials on the market in order to provide the best products to our patients.";

const WelComing = () => {
  return (
    <div className="w-full ">
     <div className="main-container">
     <div className="container">
     <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center ">
        <div className="relative inline-block text-center w-full">
          <h1 className="heading capitalize w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[60%] px-6 sm:px-10 md:px-10 lg:px-10 inline-block">
            We’re{" "}
            <span className="relative inline-block">
              welcoming
              <Image
                src={underlineimg.underline}
                alt="not found"
                width="100%"
                height="100%"
                className="absolute left-1/2 bottom-[-1px] sm:bottom-[-1px] md:bottom-[-2px] lg:bottom-[-2px] transform -translate-x-1/2 w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px]"
              />
            </span>{" "}
            new patients and can’t wait to meet you.
          </h1>
        </div>

        
        <div className="mt-5 mb-10 w-full sm:w-[100%] md:w-[80%] lg:w-[100%] px-6 sm:px-6 md:px-14 lg:px-0 ">
          <Image
            src={welcomeimg.welcome}
            width="100%"
            height="100%"
            alt="Image not found"
          />
        </div>
        
        {/* font-semibold */}
      </div>
      </div>
     </div>
     </div>
    </div>
  );
};

export default WelComing;
