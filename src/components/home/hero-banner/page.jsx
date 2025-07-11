"use client";

import React from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { bannerimages } from "../../../components/element/images";

import Underline from "../../../../public/assets/images/svg/underline-hero";
import "../../../../src/app/globals.css";

const HeroBanner = () => {
  const router = useRouter();
  const handleNavigate = () => {
   router.push("/medical-specialist");
  };



  return (
    <div className="  heroSectionStyle lg:h-[100%] ">

      <div className="w-full px-1  sm:px-6 md:p-8 md:pb-0 lg:pb-0 pb-0 ">

        <div className=" navbar-container ">

          <div className="header-container">

            <div className="flex flex-col justify-between md:flex-row gap-3  pb-0 sm:pb-0 md:pt-6 lg:pt-10 md:pb-0 lg:pb-0 items-center ">

              <div className="w-full md:w-[50%] ">
                <div>
                  <p className=" text-[var(--greyP)]">
                    {/* <span className="text-[var(--lightBlue)]">Rated #1</span> choice
              for reproductive health appointments by users */}
                    The only Healthcare Platform focusing on Endometriosis care, Male Fertility </p>
                  <p className=" text-[var(--greyP)]">
                    among other Reproductive Healthcare challenges
                  </p>
                  <h1 className="text-3xl sm:text-[32px] lg:text-[56px] font-bold mt-4 leading-tight  px-1">
                    Caring for
                    {/* <span>{" "}Health</span> */}
                    {/* <Underline/> */}
                    <span className="relative text-[var(--lightBlue)] font-bold pl-3 after:content-[''] after:absolute after:left-1/2 after:bottom-[-3px] after:w-[90%] after:h-[2px] after:bg-[var(--lightBlue)] after:rounded-[100%] after:-translate-x-1/2 after:scale-x-110">
                      Health
                    </span>
                    <br />
                    Caring for <span className="text-[var(--pink)]">You</span>
                  </h1>

                  <p className=" mt-4 lg:mt-4 xl:mt-2  text-[var(--greyP)] pr-4">

                    {/* text-sm md:text-xl lg:text- xl:text-xl */}

                    {/*   A brief statement outlining the purpose and mission of the clinic. This can include the commitment to patient care, community health. */}

                    Your trusted partner in Endometriosis care and Reproductive

                    Health.

                  </p>



                  <div className="mt-6 sm:mb-5 lg:mt-6 flex flex-wrap  gap-2 lg:gap-6">
                    {/* text-lg font-semibold */}
                    <button onClick={handleNavigate}
                      className=" text-[var(--White)] py-2 px-4 lg:py-3 lg:px-8 rounded-full bg-[var(--lightBlue)]  "
                    >
                      Book an Appointment
                    </button>
                  </div>
                </div>

                {/* <PaymentPage appointmentData={appointmentData} /> */}

              </div>

              <div className="w-full md:w-[50%] mt-4 md:mt-0 lg:mt-0 ">

                <Image

                  src={bannerimages.doctorimg}

                  alt="doctor image"

                  width={"auto"}

                  height={"auto"}

                />

              </div>

            </div>

          </div>



        </div>

      </div>

    </div>

  );

};



export default HeroBanner;



// past code

//  <div className="  heroSectionStyle lg:h-screen ">

//         <div className="main-container">

//         <div className="flex flex-col md:flex-row gap-2 md:gap-6 p-6  sm:p-6 md:p-8 lg:p-12  items-center">

//           <div className="flex-1">

//             <p className="text-xs lg:text-xl text-[var(--greyP)]"><span className="text-[var(--lightBlue)]">Rated #1</span> choice for reproductive health appointments by users</p>

//             <h1 className="text-3xl sm:text-[32px] lg:text-[62px] font-bold mt-4 leading-tight">

//               Caring for

//               <span className="relative text-[var(--lightBlue)] font-bold pl-3 after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-[90%] after:h-[2px] after:bg-[var(--lightBlue)] after:rounded-[100%] after:-translate-x-1/2 after:scale-x-110">

//                 {/* <span className="health-curve"> */}

//                 Health

//               </span>



//               <br />

//               Caring for <span className="text-[var(--pink)]">You</span>

//             </h1>

//             <p className="mt-4 lg:mt-4 xl:mt-2 text-sm md:text-xl lg:text-xl xl:text-xl text-[var(--greyP)]">

//               Your trusted partner in Endometriosis care and Reproductive Health.

//             </p>



//             <div className="mt-6 lg:mt-6 flex flex-wrap  lg:ml-16 gap-2 lg:gap-6">

//               <button className="text-white text-lg py-2 px-4 lg:py-4 lg:px-10 rounded-full bg-[var(--lightBlue)] lg:ml-16 font-semibold"

//                       onClick={handleNavigate}

//               >

//                 Book an Appointment

//               </button>

//               {/* <button className="bg-[#F0F3F8] border-2 border-[var(--lightBlue)] text-[var(--lightBlue)] py-2 px-4 lg:py-4 lg:px-10 rounded-full">

//                 Get Started

//               </button> */}

//             </div>



//           </div>

//           <div className="flex-1 mt-4 md:mt-0 lg:mt-0 ">

//             <Image src={bannerimages.doctorimg} alt="doctor image" width={'auto'} height={'auto'} />

//           </div>

//         </div>

//         </div>

//       </div>







