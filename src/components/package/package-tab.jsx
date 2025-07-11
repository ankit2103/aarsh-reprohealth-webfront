// "use client";
// import React, { useEffect, useState } from "react";

// const PackageTab = ({ getData, setGender, gender, setTenure, tenure, tenureTime }) => {
//   const [tabOption, setTabOption] = useState([
//     { id: "12 month", label: "Yearly" },
//     { id: "6 month", label: "Half-yearly" },
//     { id: "3 month", label: "Quartly" },
//   ]);
//   const handleChangeTenure = (tenureId) => {
//     setTenure(tenureId);
//   };

//   console.log("getData-------------------------", getData, gender, tenure, tenureTime);

//   return (
//     <div className="w-full flex flex-col  items-center justify-center">
//       <div className="w-full text-center lg:w-[50%] ">
//         <h1 className="text-xl md:text-2xl lg:text-3xl capitalize">
//           Select the Best Plan For You
//         </h1>
//         <p className="text-sm text-[var(--greyP)] mt-2">
//           "Choose the perfect subscription plan tailored to your needs, offering
//           exclusive healthcare benefits and savings. Get access to doctor
//           consultations, tests, and reports—all in one plan!"
//         </p>
//       </div>
//       <div className="w-[60%] bg-[var(--silver)] px-4 py-2 rounded-[6px] mt-8">
//         <ul className="w-full flex gap-2 ">
//           {tabOption.map((item, index) => {
//             return (
//               <li
//                 key={item.id}
//                 onClick={() => handleChangeTenure(item.id)}
//                 className={`px-6 py-2 rounded-[6px]  ${
//                   tenure === item.id
//                     ? "bg-[var(--lightBlue)]"
//                     : "bg-[var(--silver)]"
//                 } text-[var(--White)] w-[300px]`}
//               >
//                 {item.label}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PackageTab;

"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import {
  FetchPackages,
  getUserPurchasedSuscriptionPlan,
} from "../../utils/user/user.util";
import { GoArrowUpRight } from "react-icons/go";
import { IoCheckmarkSharp } from "react-icons/io5";
import { packageIcon } from "../element/images";
import Image from "next/image";
import useRazorpay from "../../hooks/useRazorpay";
import parse, { domToReact } from "html-react-parser";

const PlanCardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mb-14">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="relative animate-pulse rounded-[32px] p-6 min-h-[500px] border border-gray-200 shadow-md bg-white"
        >
          {/* Plan name */}
          <div className="h-8 w-24 mx-auto rounded bg-gray-200 mb-4" />

          {/* Price */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-5 w-4 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-gray-200 rounded" />
          </div>

          {/* Discount badge */}
          <div className="flex justify-center mt-3">
            <div className="h-6 w-40 rounded-full bg-gray-200" />
          </div>

          {/* Features list */}
          <ul className="mt-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <li key={i} className="flex gap-2 items-center">
                <div className="h-4 w-4 bg-gray-200 rounded-full mt-1" />
                <div className="h-4 w-48 bg-gray-200 rounded" />
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="absolute bottom-4 left-0 w-full px-6 mt-5">
            <div className="w-full h-11 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
const MaleCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center mt-6 mb-14 space-y-6">
      {/* First Row: 2 centered cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl justify-center">
        {[...Array(2)].map((_, index) => (
          <div
            key={`row1-${index}`}
            className="relative animate-pulse rounded-[32px] p-6 min-h-[500px] border border-gray-200 shadow-md bg-white"
          >
            {/* Plan name */}
            <div className="h-8 w-24 mx-auto rounded bg-gray-200 mb-4" />

            {/* Price */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-5 w-4 bg-gray-200 rounded" />
              <div className="h-6 w-20 bg-gray-200 rounded" />
            </div>

            {/* Discount badge */}
            <div className="flex justify-center mt-3">
              <div className="h-6 w-40 rounded-full bg-gray-200" />
            </div>

            {/* Features list */}
            <ul className="mt-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <div className="h-4 w-4 bg-gray-200 rounded-full mt-1" />
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="absolute bottom-4 left-0 w-full px-6 mt-5">
              <div className="w-full h-11 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Second Row: 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {[...Array(3)].map((_, index) => (
          <div
            key={`row2-${index}`}
            className="relative animate-pulse rounded-[32px] p-6 min-h-[500px] border border-gray-200 shadow-md bg-white"
          >
            {/* Plan name */}
            <div className="h-8 w-24 mx-auto rounded bg-gray-200 mb-4" />

            {/* Price */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-5 w-4 bg-gray-200 rounded" />
              <div className="h-6 w-20 bg-gray-200 rounded" />
            </div>

            {/* Discount badge */}
            <div className="flex justify-center mt-3">
              <div className="h-6 w-40 rounded-full bg-gray-200" />
            </div>

            {/* Features list */}
            <ul className="mt-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <div className="h-4 w-4 bg-gray-200 rounded-full mt-1" />
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="absolute bottom-4 left-0 w-full px-6 mt-5">
              <div className="w-full h-11 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PLAN_ORDER = ["Gold", "Silver", "Bronze"];
const TENURE_ORDER = ["12 month", "6 month", "3 month"];
const GENDER_TABS = ["male", "female"];

const PackageTab = () => {
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [gender, setGender] = useState("male");
  const [tenure, setTenure] = useState("12 month");
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleGender, setIsToggleGender] = useState("female");
  const [expandedCards, setExpandedCards] = useState({});

  const { handlePayment, handleSubscriptionPayment, isProcessing } =
    useRazorpay();
  const isMale = gender === "male";
  const MALE_STATIC_PLANS = [
    {
      _id: "01",
      name: "Gold",
      Oname: "Aarsh Elite",
      gender: "male",
      features: `
      <li>
        Basic STD Screening
        <ul>
          <li>HIV</li>
          <li>Syphilis</li>
          <li>Gonorrhea</li>
          <li>Chlamydia</li>
          <li>HSV 1 & 2 (Herpis)</li>
          <li>HBsAG (Hepatitis B & C)</li>
        </ul>
      </li>
      <li>
        Blood Test (Hormonal Panel)
        <ul>
          <li>FSH</li>
          <li>LH</li>
          <li>Estradiol</li>
          <li>FT3 & FT4</li>
          <li>TSH</li>
          <li>Testosterone Total Profile</li>
        </ul>
      </li>
    `,
      variants: {
        _id: "elite_12m",
        tenure: "12 month",
        price: 15168,
        finalPrice: 13650,
        discount: 10,
        plan: { tenure: "12 month" },
      },
      color: "c59c26",
    },
    {
      _id: "02",
      name: "Silver",
      Oname: "Aarsh Essential",
      gender: "male",
      features: `
      <li>
        Basic STD Screening
        <ul>
          <li>HIV</li>
          <li>Syphilis</li>
          <li>Gonorrhea</li>
          <li>Chlamydia</li>
          <li>HSV 1 & 2 (Herpis)</li>
          <li>HBsAG (Hepatitis B & C)</li>
        </ul>
      </li>
    `,
      variants: {
        _id: "essential_12m",
        tenure: "12 month",
        price: 10245,
        finalPrice: 9220,
        discount: 10,
        plan: { tenure: "12 month" },
      },
      color: "9f9f9f",
    },
    {
      _id: "03",
      name: "Gold",
      Oname: "Aarsh Precision",
      gender: "male",
      features: `
      <li>
        Blood Test
        <ul>
          <li>FSH</li>
          <li>LH</li>
          <li>Estradiol</li>
          <li>FT3 & FT4</li>
          <li>TSH</li>
          <li>Testosterone Total Profile</li>
          <li>ED</li>
          <li>Lipid Profile</li>
          <li>Serum Homocysteine</li>
          <li>Vitamin D and B12</li>
          <li>Prolactin</li>
        </ul>
      </li>
      <li>Penile Doppler</li>
    `,
      variants: {
        _id: "bronze_12m",
        tenure: "12 month",
        price: 15611,
        finalPrice: 14050,
        discount: 10,
        plan: { tenure: "12 month" },
      },
      color: "c59c26",
    },
    {
      _id: "04",
      name: "Silver",
      Oname: "Aarsh Vital",
      gender: "male",
      features: `
      <li>
        Blood Test
        <ul>
          <li>FSH</li>
          <li>LH</li>
          <li>Estradiol</li>
          <li>FT3 & FT4</li>
          <li>TSH</li>
          <li>Testosterone Total Profile</li>
          <li>ED</li>
          <li>Lipid Profile</li>
          <li>Serum Homocysteine</li>
          <li>Vitamin D and B12</li>
        </ul>
      </li>
      <li>Ultrasound Scan - Scrotal Doppler</li>
    `,
      variants: {
        _id: "titanium_12m",
        tenure: "12 month",
        price: 13170,
        finalPrice: 11853,
        discount: 10,
        plan: { tenure: "12 month" },
      },
      color: "9f9f9f",
    },
    {
      _id: "05",
      name: "Bronze",
      Oname: "Aarsh Prime",
      gender: "male",
      features: `
      <li>
        Blood Test
        <ul>
          <li>FSH</li>
          <li>LH</li>
          <li>Estradiol</li>
          <li>FT3 & FT4</li>
          <li>TSH</li>
          <li>Testosterone Total Profile</li>
          <li>ED</li>
          <li>Lipid Profile</li>
          <li>Serum Homocysteine</li>
          <li>Vitamin D and B12</li>
          <li>Prolactin</li>
        </ul>
      </li>
      <li>Rectal Ultrasound</li>
    `,
      variants: {
        _id: "platinum_12m",
        tenure: "12 month",
        price: 10435,
        finalPrice: 9390,
        discount: 10,
        plan: { tenure: "12 month" },
      },
      color: "cd7f32",
    },
  ];
  const terms = [
    {
      _id: 1,
      title: "Eligibility",
      des: "These packages are intended for adult male individuals (18 years and above). Aarsh ReproHealth reserves the right to request identification or medical history if necessary.",
    },
    {
      _id: 2,
      title: "Inclusions",
      des: "The scope of each package is as detailed in the package description (e.g., tests, screenings, diagnostics). All medical tests and procedures will be conducted by empanelled and qualified healthcare partners (labs, clinics, radiology centers). The package cost includes professional fees, lab charges, and applicable medical reports.",
    },
    {
      _id: 3,
      title: "Booking & Validity",
      des: "Bookings must be made via the Aarsh ReproHealth platform only and are subject to slot availability. Packages must be availed within 15 days of booking unless otherwise stated. Appointment confirmation is mandatory before visiting any partner facility in case of Retail or visitors’ bookings. In case of medical camps, certain tests may be conducted at the camp premises itself.",
    },
    {
      _id: 4,
      title: "Cancellations & Refunds",
      des: "Cancellations made 24 hours prior to the scheduled appointment are eligible for a refund, subject to a 10% administrative fee. No refunds will be provided for cancellations made within 24 hours or no-shows. Refunds, where applicable, will be processed within 7-10 business days.",
    },
    {
      _id: 5,
      title: "Reporting & Timelines",
      des: "Reports will typically be delivered within 3–7 working days, depending on the complexity of tests. Aarsh ReproHealth is not liable for any delay caused by the partner lab or clinic.",
    },
    {
      _id: 6,
      title: "Medical Disclaimer",
      des: "The packages are designed for screening and diagnostic support, not for emergency or life-threatening conditions. The reports should be reviewed with a certified physician. Aarsh ReproHealth does not offer direct medical diagnosis, treatment, or prescription services. Results may vary based on individual health conditions; no outcomes are guaranteed.",
    },
    {
      _id: 7,
      title: "Third-party Responsibility",
      des: "Tests and procedures are conducted by verified third-party medical partners. Aarsh ReproHealth is not responsible for operational or service-related issues arising at partner clinics or labs. Any malpractice or negligence must be addressed directly with the concerned provider, though we will support communication where possible.",
    },
    {
      _id: 8,
      title: "Privacy & Data Protection",
      des: "All personal and medical data shared with Aarsh ReproHealth is handled in compliance with applicable data protection laws. Your health data will be shared only with partner service providers directly involved in your selected package.",
    },
    {
      _id: 9,
      title: "Pricing & Offers",
      des: "All prices are exclusive of applicable taxes unless stated otherwise. Aarsh ReproHealth reserves the right to modify prices, discontinue packages, or change included services without prior notice. Discounts or promotional pricing (e.g., 10% discount) are valid only at the time of booking and may not be applied retroactively.",
    },
    {
      _id: 10,
      title: "Customer Support",
      des: "For queries, cancellations, or complaints, please contact our team at support@aarshreprohealth.com or WhatsApp on +91 9740522300.",
    },
  ];

  const handleRazorpayPayment = async (item) => {
    // alert("call");
    // console.log("item----------------",item,activeTab, tenure, gender)
    // const variant = item?.variants.find((variantTenure)=>variantTenure?.tenure===tenure? variantTenure?.variantId:"");
    const variantId = item?.variants.find((v) => v.tenure === tenure)?._id;

    const reqBody = {
      packageId: item?._id,
      variantId: variantId || "",
      coupon: "",
    };

    try {
      const result = await getUserPurchasedSuscriptionPlan(reqBody);

      console.log("Result handleRazorpayPayment", result);
      if (result.code === 200) {
        const data = result;
        console.log("Data to pass orderid:", data.orderId);
        await handleSubscriptionPayment(data);
      }
    } catch (error) {
      console.log("error in purchased plan", error);
    }
  };

  useEffect(() => {
    const getAllPackages = async () => {
      try {
        setLoading(true);
        const response = await FetchPackages();

        if (response.data) {
          const allPackages = response.data;
          console.log("response of package-------------------", allPackages);
          // Find if "12 month" exists in any variant
          const foundTenure = allPackages
            ?.flatMap((pkg) => pkg.variants || [])
            ?.find((v) => v.tenure === "12 month")?.tenure;

          const defaultTenure = foundTenure || TENURE_ORDER[0];
          const defaultTabIndex = TENURE_ORDER.indexOf(defaultTenure);

          setGetData(allPackages);
          // setGender(allPackages?.[0]?.gender || "female");
          setTenure(defaultTenure);
          setActiveTab(defaultTabIndex >= 0 ? defaultTabIndex : 0);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Package error:", error);
        setLoading(true);
      }
    };
    getAllPackages();
  }, []);

  const filteredPlansAccToGender =
    gender === "female"
      ? getData
          ?.filter((pkg) => {
            const matchesGender = pkg.gender === "female";
            const matchesTenure = pkg.variants?.some(
              (v) => v.tenure === TENURE_ORDER[activeTab]
            );
            return matchesGender && matchesTenure;
          })
          .sort(
            (a, b) => PLAN_ORDER.indexOf(a.name) - PLAN_ORDER.indexOf(b.name)
          )
          .map((pkg) => ({
            ...pkg,
            variant: pkg.variants.find(
              (v) => v.tenure === TENURE_ORDER[activeTab]
            ),
          }))
      : []; // leave male logic separate

  const rowOne = isMale ? MALE_STATIC_PLANS.slice(0, 2) : [];
  const rowTwo = isMale ? MALE_STATIC_PLANS.slice(2) : [];

  // const filteredPlansAccToGender = getData
  //   ?.filter((pkg) => {
  //     // Default to showing all if no gender is set (optional)
  //     const matchesGender = gender ? pkg.gender === gender : true;
  //     const matchesTenure = pkg.variants?.some(
  //       (v) => v.tenure === TENURE_ORDER[activeTab]
  //     );
  //     return matchesGender && matchesTenure;
  //   })
  //   .sort((a, b) => PLAN_ORDER.indexOf(a.name) - PLAN_ORDER.indexOf(b.name))
  //   .map((pkg) => ({
  //     ...pkg,
  //     variant: pkg.variants.find((v) => v.tenure === TENURE_ORDER[activeTab]),
  //   }));
  const filteredPlans = getData
    ?.filter(
      (pkg) =>
        pkg.gender === gender &&
        pkg.variants?.some((v) => v.tenure === TENURE_ORDER[activeTab])
    )
    .sort((a, b) => PLAN_ORDER.indexOf(a.name) - PLAN_ORDER.indexOf(b.name))
    .map((pkg) => ({
      ...pkg,
      variant: pkg.variants.find((v) => v.tenure === TENURE_ORDER[activeTab]),
    }));

  const tenureLabels = {
    "12 month": "Yearly",
    "6 month": "Half-Yearly",
    "3 month": "Quarterly",
  };

  const handleChangeTenure = (tenureId, index) => {
    setTenure(tenureId);
    setActiveTab(index);
  };
  useEffect(() => {
    if (!gender && getData?.length) {
      const firstGender = getData[0].gender;
      setGender(firstGender);
    }
  }, [getData]);

  const renderHTMLList = (htmlString) => {
    const options = {
      replace: (domNode) => {
        if (
          domNode.type === "tag" &&
          domNode.name === "li" &&
          domNode.children
        ) {
          const hasNestedUL = domNode.children.find(
            (child) => child.type === "tag" && child.name === "ul"
          );

          const labelText = domNode.children
            .filter((child) => child.type === "text")
            .map((node) => node.data.trim())
            .join(" ");

          return (
            <li className="flex flex-col gap-2 items-start">
              <div className="flex gap-2 items-start">
                <span className="text-black-600 mt-[3px]">
                  <IoCheckmarkSharp />
                </span>
                <span className="text-[13px] leading-5 font-light">
                  {labelText}
                </span>
              </div>
              {hasNestedUL && (
                <ul className="ml-6 list-disc space-y-1 mt-1">
                  {domToReact([hasNestedUL], options)}
                </ul>
              )}
            </li>
          );
        }
      },
    };

    return parse(`<ul>${htmlString}</ul>`, options);
  };

  // console.log("filteredPlansAccToGender-------------",filteredPlans, filteredPlansAccToGender);

  return (
    <div className="w-full px-4">
      {/* Gender Switcher */}
      <div className="w-full flex flex-col  items-center justify-center">
        <div className="w-full text-center lg:w-[50%] ">
          {activeTab == 0 ? (
            <>
              <h1 className="text-xl md:text-2xl lg:text-3xl capitalize">
                Select The Best ReproHealth Package For You.
              </h1>
              <p className="text-sm text-[var(--greyP)] mt-2">
                "Choose the perfect ReproHealth package that best suits your needs,
                offering exclusive healthcare benefits and savings. Get access
                to doctor consultations, tests, and reports—all in one package!"
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl md:text-2xl lg:text-3xl capitalize">
                Select the Best Plan For You
              </h1>
              <p className="text-sm text-[var(--greyP)] mt-2">
                "Choose the perfect subscription plan tailored to your needs,
                offering exclusive healthcare benefits and savings. Get access
                to doctor consultations, tests, and reports—all in one plan!"
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mb-6 mt-6 flex justify-center flex-row">
        <div className="w-full max-w-xl mx-auto">
          {/* Tabs for Tenure */}
          {/* <div className="flex justify-evenly bg-[var(--silver)] rounded-full px-2 py-2">
            {TENURE_ORDER.map((label, index) => (
              <button
                key={label}
                onClick={() => handleChangeTenure(label, index)}
                className={`w-full py-3 px-2 text-base capitalize font-medium transition-colors duration-200  rounded-full
              ${
                activeTab === index
                  ? "bg-[var(--lightBlue)] text-[var(--White)]"
                  : ""
              }`}
              >
                {tenureLabels[label] || label}
              </button>
            ))}
          </div> */}

          {/* Tabs for Gender */}
          <div className="flex justify-evenly bg-[var(--silver)] rounded-full px-2 py-1 mb-4">
            {GENDER_TABS.map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`w-full py-3 px-2 text-base  font-medium transition-colors duration-200 rounded-full
                ${
                  gender === g
                    ? "bg-[var(--lightBlue)] text-[var(--White)]"
                    : "text-[var(--listText)]"
                }`}
              >
                I'm a {g}
              </button>
            ))}
          </div>
          {/* Toggle radio button */}
          {/* <div className="flex items-center justify-center space-x-4 mt-6">
            <span
              className={`text-[greyP] font-[500] ${
                gender === "male" ? "block" : "block"
              }`}
            >
              {gender === "male" ? "I'm a female" : "I'm a female "}
            </span>

            <div
              onClick={() => setGender(gender === "female" ? "male" : "female")}
              className={`w-16 h-6 flex items-center rounded-full cursor-pointer transition-all duration-500 ${
                gender === "male" ? "bg-[var(--silver)]" : "bg-[var(--silver)]"
              }`}
            >
              <div
                className={`h-4 w-4  rounded-full shadow-md transform transition-all duration-500  ease-in-out ${
                  gender === "male"
                    ? " bg-[var(--lightBlue)] translate-x-10"
                    : "bg-pink-400 translate-x-1"
                }`}
              ></div>
            </div>
            <span
              className={`text-[greyP] font-[500] ${
                gender === "female" ? "block" : "block"
              }`}
            >
              {gender === "female" ? "I'm a male " : " I'm a male "}
            </span>
          </div> */}
        </div>
      </div>

      {/* Package Cards */}
      {loading ? (
        isMale ? (
          <MaleCardSkeleton />
        ) : (
          <PlanCardSkeleton />
        )
      ) : isMale ? (
        <>
          <div className="flex-col items-center mb-14">
            <h3 className="font-bold">Sexual & Fertility Wellness</h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:w-[66%] justify-center gap-6 mt-6 [grid-auto-columns:max-content] items-start">
                {rowOne.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className={`relative transition-transform duration-300 ease-in-out transform hover:scale-[1.05] rounded-[32px] px-6 pt-6 ${
                        expandedCards[item._id]
                          ? "h-auto pb-4"
                          : "min-h-[580px] md:min-h-[580px] lg:min-h-[530px] pb-6"
                      } ${
                        item.name === "Gold"
                          ? "border-[1px] border-[#c59c26]"
                          : item.name === "Silver"
                          ? "border-[1px] border-[#9f9f9f]"
                          : item.name === "Bronze"
                          ? "border-[1px] border-[#cd7f32]"
                          : "border"
                      } shadow-md bg-white`}
                    >
                      <h3
                        className={`text-3xl font-normal text-center ${
                          item.name === "Gold"
                            ? "text-[#c59c26]"
                            : item.name === "Silver"
                            ? "text-[#9f9f9f]"
                            : item.name === "Bronze"
                            ? "text-[#cd7f32]"
                            : "text-black"
                        }`}
                      >
                        {item.Oname}
                      </h3>

                      {/* Pricing */}
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <h3 className="line-through text-[var(--listText)]">
                          <span className="text-xl">₹</span>
                          <span className="font-normal text-xl">
                            {item?.variants?.price?.toLocaleString("en-IN")}
                          </span>
                        </h3>
                        <h3
                          className={`font-normal rounded-full ${
                            item.name === "Gold"
                              ? "text-[#c59c26]"
                              : item.name === "Silver"
                              ? "text-[#9f9f9f]"
                              : item.name === "Bronze"
                              ? "text-[#cd7f32]"
                              : "text-black"
                          }`}
                        >
                          <span className="text-xl">₹</span>
                          <span className="font-normal text-xl">
                            {item?.variants?.finalPrice?.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </h3>
                      </div>
                      <div>
                        <p className="text-[11px]">*prices exclusive of GST</p>
                      </div>
                      {/* Discount Pill */}
                      <div className="flex gap-2 justify-center mt-2">
                        <span
                          className={`text-xl font-normal px-4 py-1 rounded-full ${
                            item.name === "Gold"
                              ? "text-[#c59c26] border border-[#c59c26] bg-[rgba(197,156,38,0.1)]"
                              : item.name === "Silver"
                              ? "text-[#9f9f9f] border border-[#9f9f9f] bg-[rgba(188,188,188,0.1)]"
                              : item.name === "Bronze"
                              ? "text-[#cd7f32] border border-[#cd7f32] bg-[rgba(205,127,50,0.1)]"
                              : item.name === "Platinum"
                              ? "text-[#3b82f6] border border-[#3b82f6] bg-[rgba(59,130,246,0.1)]"
                              : item.name === "Titanium"
                              ? "text-[#6b7280] border border-[#6b7280] bg-[rgba(107,114,128,0.1)]"
                              : "text-black border border-gray-300 bg-gray-50"
                          }`}
                        >
                          {item?.variants?.discount}% off
                        </span>
                      </div>

                      {/* Features */}
                      {/* {typeof item.features === "string" && (
                      <ul className="mt-6 space-y-2 text-sm text-[var(--packageList)] text-left max-h-60 overflow-hidden">
                        {renderHTMLList(item.features)}
                      </ul>
                    )} */}
                      {typeof item.features === "string" && (
                        <div className="relative">
                          <ul
                            className={`mt-6 space-y-2 text-sm text-[var(--packageList)] text-left transition-all duration-300 ease-in-out ${
                              expandedCards[item._id]
                                ? ""
                                : "max-h-60 overflow-hidden"
                            }`}
                          >
                            {renderHTMLList(item.features)}
                          </ul>

                          {/* {!expandedCards[item._id] && (
                            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                          )} */}
                          {typeof item.features === "string" &&
                            item.features.length > 350 && (
                              <div className="text-center mt-3">
                                <button
                                  onClick={() =>
                                    setExpandedCards((prev) => ({
                                      ...prev,
                                      [item._id]: !prev[item._id],
                                    }))
                                  }
                                  className={`text-sm font-medium text-[#${item.color}]  focus:outline-none`}
                                >
                                  {expandedCards[item._id]
                                    ? "View Less"
                                    : "View More"}
                                </button>
                              </div>
                            )}
                        </div>
                      )}

                      {/* CTA */}
                      {/* <div className="absolute bottom-4 left-0 w-full px-6 mt-5">
                      <button
                        onClick={() => handleRazorpayPayment(item)}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-white ${
                          item.name === "Gold"
                            ? "bg-[#c59c26]"
                            : item.name === "Silver"
                            ? "bg-[#9f9f9f]"
                            : item.name === "Bronze"
                            ? "bg-[#cd7f32]"
                            : item.name === "Platinum"
                            ? "bg-[#3b82f6]"
                            : item.name === "Titanium"
                            ? "bg-[#6b7280]"
                            : "bg-black"
                        }`}
                      >
                        Choose this plan
                        <GoArrowUpRight />
                      </button>
                    </div> */}
                      <div
                        className={`w-full ${
                          expandedCards[item._id]
                            ? "px-0 mt-5"
                            : "absolute bottom-4 left-0 px-6 mt-5"
                        }`}
                      >
                        <button
                          onClick={() => handleRazorpayPayment(item)}
                          className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-white ${
                            item.name === "Gold"
                              ? "bg-[#c59c26]"
                              : item.name === "Silver"
                              ? "bg-[#9f9f9f]"
                              : item.name === "Bronze"
                              ? "bg-[#cd7f32]"
                              : "bg-black"
                          }`}
                        >
                          Choose this plan
                          <GoArrowUpRight />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-col items-center">
            <h3 className="font-bold">Treatment Related Packages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-14 items-start">
              {rowTwo.map((item) => (
                <div
                  key={item._id}
                  className={`relative transition-transform duration-300 ease-in-out transform hover:scale-[1.05] rounded-[32px] px-6 pt-6 ${
                    expandedCards[item._id]
                      ? "h-auto pb-4"
                      : "min-h-[580px] md:min-h-[580px] lg:min-h-[530px] pb-6"
                  } ${
                    item.name === "Gold"
                      ? "border-[1px] border-[#c59c26]"
                      : item.name === "Silver"
                      ? "border-[1px] border-[#9f9f9f]"
                      : item.name === "Bronze"
                      ? "border-[1px] border-[#cd7f32]"
                      : "border"
                  } shadow-md bg-white`}
                >
                  <h3
                    className={`text-3xl font-normal text-center ${
                      item.name === "Gold"
                        ? "text-[#c59c26]"
                        : item.name === "Silver"
                        ? "text-[#9f9f9f]"
                        : item.name === "Bronze"
                        ? "text-[#cd7f32]"
                        : "text-black"
                    }`}
                  >
                    {item.Oname}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <h3 className="line-through text-[var(--listText)]">
                      <span className="text-xl">₹</span>
                      <span className="font-normal text-xl">
                        {item?.variants?.price?.toLocaleString("en-IN")}
                      </span>
                    </h3>
                    <h3
                      className={`font-normal rounded-full ${
                        item.name === "Gold"
                          ? "text-[#c59c26]"
                          : item.name === "Silver"
                          ? "text-[#9f9f9f]"
                          : item.name === "Bronze"
                          ? "text-[#cd7f32]"
                          : "text-black"
                      }`}
                    >
                      <span className="text-xl">₹</span>
                      <span className="font-normal text-xl">
                        {item?.variants?.finalPrice?.toLocaleString("en-IN")}
                      </span>
                    </h3>
                  </div>

                  <div>
                    <p className="text-[11px]">*prices exclusive of GST</p>
                  </div>

                  {/* Discount Pill */}
                  <div className="flex gap-2 justify-center mt-2">
                    <span
                      className={`text-xl font-normal px-4 py-1 rounded-full ${
                        item.name === "Gold"
                          ? "text-[#c59c26] border border-[#c59c26] bg-[rgba(197,156,38,0.1)]"
                          : item.name === "Silver"
                          ? "text-[#9f9f9f] border border-[#9f9f9f] bg-[rgba(188,188,188,0.1)]"
                          : item.name === "Bronze"
                          ? "text-[#cd7f32] border border-[#cd7f32] bg-[rgba(205,127,50,0.1)]"
                          : "text-black border border-gray-300 bg-gray-50"
                      }`}
                    >
                      {item?.variants?.discount}% off
                    </span>
                  </div>

                  {/* Features */}
                  {/* {typeof item.features === "string" && (
                      <ul className="mt-6 space-y-2 text-sm text-[var(--packageList)] text-left max-h-60 overflow-hidden">
                        {renderHTMLList(item.features)}
                      </ul>
                    )} */}
                  {typeof item.features === "string" && (
                    <div className="relative">
                      <ul
                        className={`mt-6 space-y-2 text-sm text-[var(--packageList)] text-left transition-all duration-300 ease-in-out ${
                          expandedCards[item._id]
                            ? ""
                            : "max-h-60 overflow-hidden"
                        }`}
                      >
                        {renderHTMLList(item.features)}
                      </ul>

                      <div className="text-center mt-4">
                        <button
                          onClick={() =>
                            setExpandedCards((prev) => ({
                              ...prev,
                              [item._id]: !prev[item._id],
                            }))
                          }
                          className={`text-sm font-medium text-[#${item.color}]  focus:outline-none`}
                        >
                          {expandedCards[item._id] ? "View Less" : "View More"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  {/* <div className="absolute bottom-4 left-0 w-full px-6 mt-5">
                      <button
                        onClick={() => handleRazorpayPayment(item)}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-white ${
                          item.name === "Gold"
                            ? "bg-[#c59c26]"
                            : item.name === "Silver"
                            ? "bg-[#9f9f9f]"
                            : item.name === "Bronze"
                            ? "bg-[#cd7f32]"
                            : item.name === "Platinum"
                            ? "bg-[#3b82f6]"
                            : item.name === "Titanium"
                            ? "bg-[#6b7280]"
                            : "bg-black"
                        }`}
                      >
                        Choose this plan
                        <GoArrowUpRight />
                      </button>
                    </div> */}
                  <div
                    className={`w-full ${
                      expandedCards[item._id]
                        ? "px-0 mt-5"
                        : "absolute bottom-4 left-0 px-6 mt-5"
                    }`}
                  >
                    <button
                      onClick={() => handleRazorpayPayment(item)}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-white ${
                        item.name === "Gold"
                          ? "bg-[#c59c26]"
                          : item.name === "Silver"
                          ? "bg-[#9f9f9f]"
                          : item.name === "Bronze"
                          ? "bg-[#cd7f32]"
                          : "bg-black"
                      }`}
                    >
                      Choose this plan
                      <GoArrowUpRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* terms and condition */}
          <div className="text-left mb-14">
            {/* <p>
              * during the tenure of their membership ** 20% or 35% to the
              Company and balance to the Subscriber/Non Subscriber
            </p> */}
            <h3 className="py-4 font-bold">
              Terms & Conditions for Subscription Plans – Aarsh ReproHealth
            </h3>
            {Array.isArray(terms) &&
              terms?.length > 0 &&
              terms.map((item, index) => {
                return (
                  <div key={index}>
                    <ul className="list-disc py-3 px-3">
                      <li>
                        <span className="font-bold">{item.title}:</span>{" "}
                        {item.des}
                      </li>
                    </ul>
                  </div>
                );
              })}
            <br />
            {/* <p>
              <span className="font-bold">* </span>during the tenure of their
              membership
              <br />
              <span className="font-bold">** </span> 20% or 35% to the Company
              and balance to the Subscriber/Non Subscriber.
            </p> */}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-14">
          {filteredPlansAccToGender.map((item) => (
            <div
              key={item._id}
              className={`relative transition-transform duration-300 ease-in-out transform hover:scale-[1.05] rounded-[32px] p-6 min-h-[580px] md:min-h-[580px] lg:min-h-[530px] ${
                item.name === "Gold"
                  ? "border-[1px] border-[#c59c26]"
                  : item.name === "Silver"
                  ? "border-[1px] border-[#9f9f9f]"
                  : "border-[1px] border-[#cd7f32]"
              } shadow-md bg-white`}
            >
              <h3
                className={`text-3xl font-normal text-center ${
                  item.name === "Gold"
                    ? "text-[#c59c26]"
                    : item.name === "Silver"
                    ? "text-[#9f9f9f]"
                    : "text-[#cd7f32]"
                }`}
              >
                {item.name}
              </h3>

              {/* <div className="flex items-start justify-center gap-1 mt-2">
                <span className="text-black text-lg">₹</span>
                <span className="text-2xl font-medium text-black">
                  {item.variant.finalPrice.toLocaleString("en-IN")} prices
                </span>
              </div> */}

              <div className="flex items-center justify-center gap-2 mt-2">
                <h3 className=" line-through text-[var(--listText)]">
                  <span className="text-xl">₹</span>
                  <span className="font-normal text-xl">
                    {item?.variant?.price.toLocaleString("en-IN")}
                  </span>
                </h3>
                <h3
                  className={` font-normal  rounded-full ${
                    item?.variant?.plan?.tenure === "Try for Free"
                      ? "text-[#fff] border-[1px] bg-blue-500 "
                      : item.name === "12 Months"
                      ? "text-[#c59c26]  "
                      : item.name === "6 Months"
                      ? "text-[#9f9f9f]  "
                      : "text-[#cd7f32]  "
                  }`}
                >
                  <span className="text-xl">₹</span>
                  <span className="font-normal text-xl">
                    {item?.variant?.finalPrice.toLocaleString("en-IN")}
                  </span>
                </h3>
              </div>
              <div>
                <p className="text-[11px]">*prices exclusive of GST</p>
              </div>

              <div className="flex gap-2  justify-center mt-2">
                <span
                  className={`text-xl font-normal px-4 py-1 rounded-full ${
                    item?.plan?.tenure === "Try for Free"
                      ? "text-[#fff] border-[1px] bg-blue-500 "
                      : item.name === "12 Months"
                      ? "text-[#c59c26] border border-[#c59c26] bg-[rgba(197,156,38,0.1)]"
                      : item.name === "6 Months"
                      ? "text-[#9f9f9f] border border-[#9f9f9f] bg-[rgba(188,188,188,0.1)]"
                      : "text-[#cd7f32] border border-[#cd7f32] bg-[rgba(205,127,50,0.1)]"
                  }`}
                >
                  {item.variant.discount}% off
                </span>
              </div>

              {/* Features (li items parsed from HTML) */}
              {typeof item.features === "string" && (
                <ul className="mt-6 space-y-2 text-sm text-[var(--packageList)] text-left">
                  {item.features
                    .match(/<(li|p)[^>]*>(.*?)<\/\1>/g)
                    ?.map((html, idx) => {
                      const tempDiv = document.createElement("div");
                      tempDiv.innerHTML = html;
                      const content =
                        tempDiv.textContent || tempDiv.innerText || "";
                      return (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="text-black-600 mt-[3px]">
                            <IoCheckmarkSharp />
                          </span>
                          <span className="text-[13px] leading-5 font-light">
                            {content}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              )}

              {/* Button */}
              <div className="absolute bottom-4 left-0 w-full px-6 mt-5">
                <button
                  onClick={() => handleRazorpayPayment(item)}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-white ${
                    item.name === "Gold"
                      ? "bg-[#c59c26]"
                      : item.name === "Silver"
                      ? "bg-[#9f9f9f]"
                      : "bg-[#cd7f32]"
                  }`}
                >
                  Choose this plan
                  <GoArrowUpRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageTab;
