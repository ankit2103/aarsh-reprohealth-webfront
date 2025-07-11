import React from "react";
import PackageTab from "../../../components/package/package-tab";
import LabsPackage from "../../../components/package/labs-package";

const Package = () => {
  return (
    <div className="w-full pt-10 text-center bg-gradient-to-b from-cyan-50 via-slate-50 to-white-50">
      <div className="pt-20 w-full">
        <div className="main-container">
          <div className="container">
            <LabsPackage/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;







// "use client";
// import React, { useEffect, useState } from "react";
// import { FaCheck } from "react-icons/fa6";
// import { MdOutlineWorkspacePremium } from "react-icons/md";
// import { LiaRupeeSignSolid } from "react-icons/lia";
// // import PaymentPage from "../payment/page";
// import { FetchPackages } from "../../utils/user/user.util";
// import PackageTab from "../../components/package/package-tab";

// const gold = [
//   { service: "Doctor Consultation", id: 1 },
//   { service: "Endometriosis Tests – Physical Examination & Ultrasound", id: 2 },
//   {
//     service:
//       "Hormonal Assessment - Follicle-Stimulating Hormone (FSH), Luteinizing Hormone (LH), and Prolactin",
//     id: 3,
//   },
//   { service: "Cancer Screening - Mammogram, Pap Smear", id: 4 },
//   { service: "PCOD/PCOS", id: 5 },
//   { service: "Online Prescription & Reports", id: 6 },
// ];
// const silver = [
//   { service: "Doctor Consultation", id: 1 },
//   { service: "Endometriosis Tests – Physical Examination & Ultrasound", id: 2 },
//   { service: "Cancer Screening - Mammogram, Pap Smear", id: 3 },
//   { service: "Online Prescription & Reports", id: 4 },
// ];
// const bronze = [
//   { service: "Doctor Consultation", id: 1 },
//   { service: "Endometriosis Tests – Physical Examination & Ultrasound", id: 2 },
//   { service: "Online Prescription & Reports", id: 3 },
// ];
// const gold_men = [
//   { service: "Doctor Consultation", id: 1 },
//   {
//     service:
//       "Sexual Health & STD Screening - Basic STD Panel (HIV, Syphilis, Gonorrhea, Chlamydia)",
//     id: 2,
//   },
//   {
//     service:
//       "Male Fertility & Reproductive Health - Sperm Count & Quality Analysis, Erectile Dysfunction Tests (Vascular & Neurological Causes) & Hormonal Panel (FSH, Estradiol, DHEA, SHBG, Testosterone)",
//     id: 3,
//   },
//   {
//     service:
//       "Prostate Health Tests - Physical Examination & PSA (Prostate-Specific Antigen)",
//     id: 4,
//   },

//   { service: "Online Prescription & Reports", id: 5 },
// ];
// const silver_men = [
//   { service: "Doctor Consultation", id: 1 },
//   {
//     service:
//       "Male Fertility & Reproductive Health - Sperm Count & Quality Analysis, Erectile Dysfunction Tests (Vascular & Neurological Causes) & Hormonal Panel (FSH, Estradiol, DHEA, SHBG, Testosterone)",
//     id: 2,
//   },
//   {
//     service:
//       "Prostate Health Tests - Physical Examination & PSA (Prostate-Specific Antigen)",
//     id: 3,
//   },
//   { service: "Online Prescription & Reports", id: 4 },
// ];
// const bronze_men = [
//   { service: "Doctor Consultation", id: 1 },
//   {
//     service:
//       "Male Fertility & Reproductive Health - Sperm Count & Quality Analysis & Erectile Dysfunction Tests (Vascular & Neurological Causes)",
//     id: 2,
//   },
//   {
//     service:
//       "Prostate Health Tests - Physical Examination & PSA (Prostate-Specific Antigen)",
//     id: 3,
//   },
//   { service: "Online Prescription & Reports", id: 4 },
// ];

// const parseFeatures = (htmlString) => {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, "text/html");
//   const listItems = Array.from(doc.querySelectorAll("li"));
//   return listItems.map((li, index) => ({
//     id: index,
//     service: li.textContent,
//   }));
// };

// const Package = () => {
//   const [loading, setLoading] = useState(true);
//   const [getData, setGetData] = useState([]);
//   const [gender, setGender] = useState("female");
//   const [tenure, setTenure] = useState(null);
//   const [tenureTime, setTenureTime] = useState([]);

//   useEffect(() => {
//     const getAllPackages = async () => {
//       try {
//         const response = await FetchPackages();
//         console.log(
//           "api response get all package--------------------------",
//           response,
//           response.data,
//           response?.data?.[0]?.variants?.[0]?.tenure
//         );
//         if (response.data.code === 200) {
//           setGetData(response?.data);
//           setGender(response?.data?.gender);
//           setTenure(response?.data?.[0]?.variants?.[0]?.tenure);
//           setLoading(false);
//         } else if (response.data.code === 201) {
//           setLoading(true);
//         }
//       } catch (error) {
//         console.log("Package error:", error);
//       }
//     };
//     getAllPackages();
//   }, []);

//   useEffect(() => {
//     if (getData?.length > 0 && tenure) {
//       const matchedItems = getData.filter(item =>
//         item.variants?.some(variant => variant.tenure === tenure)
//       );
//       setTenureTime(matchedItems);
//     }
//   }, [getData, tenure]);
  




//   return (
//     <div className="w-full pt-10  text-center bg-gradient-to-b from-cyan-50 via-slate-50 to-white-50">
//       <div className="pt-20 w-full">
//         <div className="main-container">
//           <div className="container">
//             <PackageTab
//               getData={getData}
//               setGender={setGender}
//               gender={gender}
//               setTenure={setTenure}
//               tenure={tenure}
//               tenureTime = {tenureTime}
//             />

//             {/* 1.	Packages for Corporates(Women) – Patients. */}
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Package;

// // import React from 'react'
// // import ComingSoon from "../../components/coming-soon/page";
// // const Package = () => {
// //   return (
// //     <div  className="w-full  pt-20 text-center px-8 sm:px-10 md:px-0 lg:px-0 flex justify-center items-center">
// //       <ComingSoon/>
// //     </div>
// //   )
// // }

// // export default Package

// // {getData?.length > 0 && (
// //   <h1 className="text-[var(--black)] text-3xl w-full text-left my-5 capitalize">
// //     Packages for {getData[1]?.gender} Patients Annually
// //   </h1>
// // )}
// // <div className="flex flex-col md:flex-row justify-evenly gap-4 w-full text-left ">
// //   {getData?.length > 0 &&
// //     getData.map((item) => {
// //       return (
// //         <div
// //           key={item._id}
// //           className="relative border w-full md:w-[33%] h-[450px]  rounded-tr-3xl rounded-bl-3xl bg-[var(--White)] cursor-pointer pb-4 "
// //         >
// //           <div
// //             className={`border text-center rounded-tr-3xl rounded-bl-3xl py-4 text-[#083344] ${
// //               item?.name === "Gold"
// //                 ? "bg-[linear-gradient(75deg,_#e1c162_30%,_#f1d97a_65%,_#c9a94a_100%)]"
// //                 : item?.name === "Silver"
// //                 ? "bg-[linear-gradient(135deg,_#d4d4d4,_#f5f5f5,_#c0c0c0,_#e5e5e5)]"
// //                 : // "bg-[linear-gradient(75deg,_#b4b5b8_43%,_#e3e3e3_98%,_#d7d7d8_100%)]"
// //                 item?.name === "Bronze"
// //                 ? "bg-[linear-gradient(90deg,_#a97142_0%,_#cd7f32_25%,_#ffb074_50%,_#cd7f32_75%,_#a97142_100%)]"
// //                 : // ? "bg-[linear-gradient(75deg,_#cd7f32_30%,_#b87333_65%,_#a05a2c_100%)]"
// //                   "bg-[linear-gradient(75deg,_#e1c162_30%,_#f1d97a_65%,_#c9a94a_100%)]"
// //             }`}
// //           >
           
// //             <p className=" font-medium text-3xl">
// //               {item.name === "Gold" ? "Master" : ""} {item.name}{" "}
// //               {item.name === "Gold" ? (
// //                 <MdOutlineWorkspacePremium className="inline" />
// //               ) : (
// //                 ""
// //               )}
// //             </p>
            
// //           </div>
// //         </div>
// //       );
// //     })}
// // </div>