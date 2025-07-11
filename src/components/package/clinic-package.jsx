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
import { useRouter } from "next/navigation";
import Head from "next/head";

const ClinicSubscriptionSEO = ({ staticData, nonStaticData, terms }) => {
  const allPlans = [...staticData, ...nonStaticData];

  return (
    <Head>
      <title>Clinic Subscription Plans | Aarsh ReproHealth</title>
      <meta
        name="description"
        content="Explore exclusive subscription packages for specialty clinics with Aarsh ReproHealth. Enhance online visibility, boost earnings, and access corporate wellness opportunities."
      />
      <meta name="robots" content="index, follow" />
      <link
        rel="canonical"
        href="https://www.aarshreprohealth.com/clinic-subscription"
      />

      {/* Clinic Subscription Plans - Product List Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Specialty Clinic Subscription Packages - Aarsh ReproHealth",
            itemListElement: allPlans.map((plan, index) => ({
              "@type": "Product",
              position: index + 1,
              name: `${plan.package} - ${plan.plan.tenure}`,
              description: plan.plan.features.map((f) => f.list).join(" "),
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: plan.plan.discountedPrice || 0,
                priceValidUntil: "2025-12-31",
                availability: "https://schema.org/InStock",
              },
            })),
          }),
        }}
      />

      {/* Terms - FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: terms.map((term) => ({
              "@type": "Question",
              name: term.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: term.des,
              },
            })),
          }),
        }}
      />
    </Head>
  );
};

const staticData = [
  {
    package: "Subscription Packages",
    plan: {
      tenure: "3 Months",
      originalPrice: 8999,
      discountPrecent: 15,
      discountedPrice: 7649,
      features: [
        { list: "1 month extra (Complimentary)" },
        { list: "Social Media Visibility – Feature in 1 Social Posts of Aarsh ReproHealth's, complimentary*" },
        {
          list: "Advertising opportunity - 2 Videos or Banner of the clinic, per month to feature on the Platform.",
        },
        {
          list: "Complimentary Portfolio Page showcasing the Clinic’s profile and services hosted by Aarsh ReproHealth.",
        },
        { list: "80% Revenue Share with the Specialty Clinic on Clinical Procedure**" },
      ],
      extraDiscount: "A further 5% can be given with a Promo Code",
      colorCode: "cd7f32",
    },
    _id: 2,
  },
  {
    package: "Subscription Packages",
    plan: {
      tenure: "6 Months",
      originalPrice: 11999,
      discountPrecent: 15,
      discountedPrice: 10199,
      features: [
        { list: "2 months extra (Complimentary)" },
        { list: "Social Media Visibility – Feature in 3 Social Posts of Aarsh ReproHealth's, complimentary*" },
        {
          list: "Invites to 2 Corporate Reproductive Wellness Drives*",
        },
        {
          list: "Advertising opportunity - 2 Videos or Banner of the clinic, per month to feature on the Platform.",
        },
        {
          list: "Complimentary Portfolio Page showcasing the Clinic’s profile and services hosted by Aarsh ReproHealth.",
        },
        { list: "80% Revenue Share with the Specialty Clinic on Clinical Procedure**" },
      ],
      extraDiscount: "A further 5% can be given with a Promo Code",
      colorCode: "9f9f9f",
    },
    _id: 1,
  },
  {
    package: "Subscription Packages",
    plan: {
      tenure: "12 Months",
      originalPrice: 15999,
      discountPrecent: 15,
      discountedPrice: 13599,
      features: [
        { list: "3 months extra (Complimentary)" },
        { list: "Social Media Visibility – Feature in 6 Social Posts of Aarsh ReproHealth's, complimentary*" },
        {
          list: "Invites to 3 Corporate Reproductive Wellness Drives*",
        },
        {
          list: "Advertising opportunity - 2 Videos or Banner of the clinic, per month to feature on the Platform.",
        },
        {
          list: "Complimentary Portfolio Page showcasing the Clinic’s profile and services hosted by Aarsh ReproHealth.",
        },
        { list: "80% Revenue Share with the Specialty Clinic on Clinical Procedure**" },
      ],
      extraDiscount: "A further 5% can be given with a Promo Code",
      colorCode: "c59c26",
    },
    _id: 0,
  },
];

const nonStaticData = [
  {
    package: "Non-Subscribed Member",
    plan: {
      tenure: "Till upgradation to Paid Packages", // Updated as per real context
      originalPrice: 0,
      discountPrecent: 0,
      discountedPrice: 0,
      features: [
        {
          list: "Social Media Visibility – INR 4000.00 per Social post on Instagram, Facebook & LinkedIn",
        },
        {
          list: "Portfolio Page showcasing the Clinic’s  profile and services hosted by Aarsh ReproHealth for INR 4000.00",
        },
        {
          list: "65% Commission on Clinical Procedure**",
        },
      ],
    },
    _id: 3,
  },
];

const terms = [
  {
    _id: 0,
    title: "Fees & Payment",
    des: "All fees are exclusive of GST and must be paid in full in advance for the chosen subscription tenure.",
  },
  {
    _id: 1,
    title: "Revenue Share for Corporate Reproductive Health Drives",
    des: "For Corporate Reproductive Health Drives, the revenue share between Aarsh ReproHealth and the Subscribed Member will be 35% & 65%, respectively.",
  },
  {
    _id: 2,
    title: "Social Posts for Non-Subscribed Members",
    des: "The number and tenure of Social Posts for Non-Subscribed Members can be mutually agreed upon by Aarsh ReproHealth and the Member during the course of their relationship. Once agreed upon, the total cost of the posts, along with applicable GST, must be paid in full and in advance by the Member to Aarsh ReproHealth.",
  },
  {
    _id: 3,
    title: "Additional Social Posts for Subscribed Members",
    des: "Subscribed Members may choose to add Social Posts during their subscription tenure at a cost of INR 1,500 per post (excluding GST). The number and schedule of such posts must be mutually agreed upon, and the payment must be made upfront before the posts are showcased.",
  },
  
];

const PlanCardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6 mb-14">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="relative animate-pulse rounded-[32px] p-6 min-h-[450px] border border-gray-200 shadow-md bg-white"
        >
          {/* Plan name */}
          <div className="h-8 w-24 mx-auto rounded bg-gray-200 mb-4" />

          {/* Price */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {/* <div className="h-5 w-4 bg-gray-200 rounded" /> */}
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
        </div>
      ))}
    </div>
  );
};

const NonStaticCardSkeleton = () => {
  return (
    <div className="flex justify-center mt-6 mb-14">
      <div className="animate-pulse rounded-[32px] p-6 min-h-[450px] border shadow-md bg-white w-full max-w-md">
        {/* Plan name */}
        <div className="h-8 w-24 mx-auto rounded bg-gray-200 mb-4" />

        {/* Price */}
        <div className="flex items-center justify-center gap-2 mt-2">
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

        {/* Bottom CTA button placeholder */}
        {/* <div className="mt-6 flex justify-center">
          <div className="h-10 w-40 bg-gray-200 rounded-full" />
        </div> */}
      </div>
    </div>
  );
};

const PLAN_ORDER = ["Gold", "Silver", "Bronze"];
const TENURE_ORDER = ["12 month", "6 month", "3 month"];
const GENDER_TABS = ["Subscription Model", "Non-Subscription Model"];

const ClinicPackage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [gender, setGender] = useState(GENDER_TABS[0]); // 🧘‍♂️ peaceful default
  const [tenure, setTenure] = useState("12 month");
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleGender, setIsToggleGender] = useState("female");
  const { handlePayment, isProcessing } = useRazorpay();
  const [filteredPlans, setFilteredPlans] = useState([]);

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
        await handlePayment(data);
      }
    } catch (error) {
      console.log("error in purchased plan", error);
    }
  };


  const handleNavigate = () => {
    window.open("http://admin.aarshreprohealth.com/", "_blank");
  };

  // useEffect(() => {
  //   const getAllPackages = async () => {
  //     try {
  //       // setLoading(true);
  //       const response = await FetchPackages();

  //       if (response.data) {
  //         const allPackages = response.data;
  //         console.log("response of package-------------------", allPackages);
  //         // Find if "12 month" exists in any variant
  //         const foundTenure = allPackages
  //           ?.flatMap((pkg) => pkg.variants || [])
  //           ?.find((v) => v.tenure === "12 month")?.tenure;

  //         const defaultTenure = foundTenure || TENURE_ORDER[0];
  //         const defaultTabIndex = TENURE_ORDER.indexOf(defaultTenure);

  //         setGetData(allPackages);
  //         // setGender(allPackages?.[0]?.gender || "female");
  //         setTenure(defaultTenure);
  //         setActiveTab(defaultTabIndex >= 0 ? defaultTabIndex : 0);
  //         setLoading(false);
  //       } else {
  //         setLoading(true);
  //       }
  //     } catch (error) {
  //       console.error("Package error:", error);
  //       setLoading(true);
  //     }
  //   };
  //   getAllPackages();
  // }, []);

  const filteredPlansAccToTenureAndPcId = getData
    ?.filter((pkg) => {
      const notPatient = pkg?.pcId?.name !== "Patient";
      const matchesTenure = pkg.variants?.some(
        (v) => v.tenure === TENURE_ORDER[activeTab]
      );
      return notPatient && matchesTenure;
    })
    .sort((a, b) => PLAN_ORDER.indexOf(a.name) - PLAN_ORDER.indexOf(b.name))
    .map((pkg) => ({
      ...pkg,
      variant: pkg.variants.find((v) => v.tenure === TENURE_ORDER[activeTab]),
    }));
  const handleChangeTenure = (label, index) => {
    setActiveTab(index);
    setTenure(label);

    const serviceProviderPlans = filteredPlansAccToTenureAndPcId.filter(
      (plan) => plan.pcId?.name === "Service Provider"
    );

    const filtered = serviceProviderPlans
      .map((plan) => {
        const variant = plan.variants.find((v) => v.tenure === label);
        return {
          ...plan,
          variant,
        };
      })
      .filter((plan) => plan.variant); // Only include plans that have the variant

    setFilteredPlans(filtered);
  };

  useEffect(() => {
    if (!gender && getData?.length) {
      const firstGender = getData[0].gender;
      setGender(firstGender);
    }
  }, [getData]);

  return (
    <>
      <ClinicSubscriptionSEO
        staticData={staticData}
        nonStaticData={nonStaticData}
        terms={terms}
      />
      <div className="w-full px-4">
      {/* Gender Switcher */}
      <div className="w-full flex flex-col  items-center justify-center">
        <div className="w-full text-center lg:w-[50%] ">
          <h1 className="text-xl md:text-2xl lg:text-3xl capitalize">
            Select the Best Plan For Your Clinic
          </h1>
          <p className="text-sm text-[var(--greyP)] mt-2 mb-5">
            "Choose the ideal subscription plan crafted for clinics, offering
            enhanced visibility, advertising opportunities, and revenue-sharing
            benefits. Amplify your presence through social promotions, seminars,
            and professional collaborations—all under one powerful plan!"
          </p>
        </div>
      </div>

      <div className="mb-6 mt-6 flex justify-center flex-row">
        <div className="w-full max-w-xl mx-auto">
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
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Package Cards */}
      {loading ? (
        gender === GENDER_TABS[0] ? (
          <PlanCardSkeleton />
        ) : (
          <NonStaticCardSkeleton />
          // <PlanCardSkeleton />
        )
      ) : gender === GENDER_TABS[0] ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 mb-14">
            {staticData.slice(0, 3).map((item) => (
              <div
                key={item._id}
                className={`relative transition-transform duration-300 ease-in-out transform hover:scale-[1.05] rounded-[32px] p-6 min-h-[620px]  md:min-h-[620px] lg:min-h-[520px] ${
                  item?.plan?.tenure === "Try for Free"
                    ? "border-[1px] border-blue-500"
                    : item?.plan?.tenure === "12 Months"
                    ? "border-[1px] border-[#c59c26]"
                    : item?.plan?.tenure === "6 Months"
                    ? "border-[1px] border-[#9f9f9f]"
                    : "border-[1px] border-[#cd7f32]"
                } shadow-md bg-white`}
              >
                <h3
                  className={`text-3xl font-normal text-center ${
                    item?.plan?.tenure === "Try for Free"
                      ? " text-blue-500"
                      : item.plan?.tenure === "12 Months"
                      ? "text-[#c59c26]"
                      : item?.plan?.tenure === "6 Months"
                      ? "text-[#9f9f9f]"
                      : "text-[#cd7f32]"
                  }`}
                >
                  {item?.plan?.tenure}
                </h3>

                <div className="flex items-center justify-center gap-2 mt-2">
                  <h3 className=" line-through text-[var(--listText)]">
                    <span className="text-xl">₹</span>
                    <span className="font-normal text-xl">
                      {item?.plan?.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </h3>
                  <h3
                    className={` font-normal  rounded-full ${
                      item?.plan?.tenure === "Try for Free"
                        ? "text-[#fff] border-[1px] bg-blue-500 "
                        : item?.plan?.tenure === "12 Months"
                        ? "text-[#c59c26]  "
                        : item?.plan?.tenure === "6 Months"
                        ? "text-[#9f9f9f]  "
                        : "text-[#cd7f32]  "
                    }`}
                  >
                    <span className="text-xl">₹</span>
                    <span className="font-normal text-xl">
                      {item?.plan?.discountedPrice.toLocaleString("en-IN")}
                    </span>
                  </h3>
                </div>
                <div>
                  <p className="text-[11px]">*prices exclusive of GST</p>
                </div>
                <div className="flex gap-2 justify-center mt-4">
                  <span
                    className={`text-md font-normal px-4 py-1 rounded-full ${
                      item?.plan?.tenure === "Try for Free"
                        ? "text-[#fff] border-[1px] bg-blue-500 "
                        : item?.plan?.tenure === "12 Months"
                        ? "text-[#c59c26] border border-[#c59c26] bg-[rgba(197,156,38,0.1)]"
                        : item?.plan?.tenure === "6 Months"
                        ? "text-[#9f9f9f] border border-[#9f9f9f] bg-[rgba(188,188,188,0.1)]"
                        : "text-[#cd7f32] border border-[#cd7f32] bg-[rgba(205,127,50,0.1)]"
                    }`}
                  >
                    {item?.plan?.discountPrecent}% inaugural offer{" "}
                    {/* <Tooltip title="A further 5% can be given with a Promo Code" arrow>
                      <InfoOutlinedIcon className="text-blue-500 cursor-pointer" fontSize="small" />
                    </Tooltip> */}
                  </span>
                </div>

                {/* Features (li items parsed from HTML) */}
                {Array.isArray(item?.plan?.features) &&
                  item?.plan?.features.length > 0 && (
                    <ul className="mt-6 space-y-2 text-sm text-[var(--packageList)] text-left">
                      {item?.plan?.features?.map((feature, idx) => {
                        // const tempDiv = document.createElement("div");
                        // tempDiv.innerHTML = html;
                        // const content =
                        //   tempDiv.textContent || tempDiv.innerText || "";
                        return (
                          <li
                            key={feature.list}
                            className="flex gap-2 items-start"
                          >
                            <span className="text-black-600 mt-[3px]">
                              <IoCheckmarkSharp />
                            </span>
                            <span className="text-[13px] leading-5 font-light">
                              {feature.list}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                {/* <p className={`text-[#${item?.plan?.colorCode}]`} >{item?.plan?.extraDiscount}</p> */}

                {/* Button */}
                <div className="absolute bottom-4 left-0 w-full px-6 mt-5">
                  <button
                    // onClick={() => handleRazorpayPayment(item)}
                    onClick={handleNavigate}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-white ${
                      item?.plan?.tenure === "Try for Free"
                        ? " bg-blue-500"
                        : item?.plan?.tenure === "12 Months"
                        ? "bg-[#c59c26]"
                        : item?.plan?.tenure === "6 Months"
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
        </>
      ) : (
        <>
          {/* Grid container just like static cards */}

          <div className="flex justify-center mt-6 mb-14">
            {nonStaticData
              .filter((item) => item.package === "Non-Subscribed Member")
              .map((plans, index) => (
                <div
                  key={plans._id || index}
                  className="relative transition-transform duration-300 ease-in-out transform hover:scale-[1.05] rounded-[32px] p-6 min-h-[520px] border-[1px] border-blue-500 shadow-md bg-white w-full max-w-md"
                >
                  {/* Card Title */}
                  <h3 className="text-3xl font-normal text-center text-blue-500">
                    {plans.package}
                  </h3>

                  <div className="flex items-center justify-center gap-2 mt-2">
                    <h3 className="text-blue-500 text-[var(--listText)]">
                      <span className="text-2xl">₹</span>
                      <span className="font-normal text-2xl">
                        {plans.plan?.originalPrice?.toLocaleString("en-IN")}
                      </span>
                    </h3>
                  </div>

                  {/* Features */}
                  {Array.isArray(plans?.plan?.features) &&
                    plans.plan.features.length > 0 && (
                      <ul className="mt-6 space-y-2 text-sm text-[var(--packageList)] text-left">
                        {plans.plan.features.map((feature, idx) => (
                          <li
                            key={feature.list}
                            className="flex gap-2 items-start"
                          >
                            <span className="text-black-600 mt-[3px]">
                              <IoCheckmarkSharp />
                            </span>
                            <span className="text-[13px] leading-5 font-light">
                              {feature.list}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                  {/* Button */}
                  <div className="absolute bottom-4 left-0 w-full px-6 mt-5">
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-white bg-blue-500">
                      {plans.plan.tenure || "Choose this plan"}
                      <GoArrowUpRight />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {/* terms and condition */}
      <div className="text-left mb-14">
        {/* <p>
              * during the tenure of their membership ** 20% or 35% to the
              Company and balance to the Subscriber/Non Subscriber
            </p> */}
        <h3 className="py-4 font-bold">
          Terms & Conditions for Pricing Plans – Aarsh ReproHealth
        </h3>
        {Array.isArray(terms) &&
          terms?.length > 0 &&
          terms.map((item, index) => {
            return (
              <div key={index}>
                <ul className="list-disc py-3 px-3">
                  <li>
                    <span className="font-bold">{item.title}:</span> {item.des}
                  </li>
                </ul>
              </div>
            );
          })}
        <br />
        <p>
          <span className="font-bold">* </span>during the tenure of their
          membership
          <br />
          <span className="font-bold">** </span> 20% or 35% Share with Aarsh ReproHealth depending on the Package chosen by the Service Provider - Subscription or the Non Subscription Plan.
        </p>
        <br />

        <p >
          <span className="font-bold">Note: </span> If the Service Provider does not choose any Subscription Plans, then, by default, they will fall under the Non Subscription Plan.
        </p>
      </div>
    </div>
    </>
    
  );
};

export default ClinicPackage;

// {filteredPlansAccToTenureAndPcId.map((item) => (
//               <div
//                 key={item._id}
//                 className={`relative transition-transform duration-300 ease-in-out transform hover:scale-[1.05] rounded-[32px] p-6 min-h-[480px] ${
//                   item.name === "Gold"
//                     ? "border-[1px] border-[#c59c26]"
//                     : item.name === "Silver"
//                     ? "border-[1px] border-[#9f9f9f]"
//                     : "border-[1px] border-[#cd7f32]"
//                 } shadow-md bg-white`}
//               >
//                 <h3
//                   className={`text-3xl font-normal text-center ${
//                     item.name === "Gold"
//                       ? "text-[#c59c26]"
//                       : item.name === "Silver"
//                       ? "text-[#9f9f9f]"
//                       : "text-[#cd7f32]"
//                   }`}
//                 >
//                   {item.name}
//                 </h3>

//                 <div className="flex items-start justify-center gap-1 mt-2">
//                   <span className="text-black text-lg">₹</span>
//                   <span className="text-2xl font-medium text-black">
//                     {item.variant.finalPrice.toLocaleString("en-IN")}
//                   </span>
//                 </div>

//                 <div className="flex justify-center mt-2">
//                   <span
//                     className={`text-sm font-normal px-4 py-1 rounded-full ${
//                       item.name === "Gold"
//                         ? "text-[#c59c26] border border-[#c59c26] bg-[rgba(197,156,38,0.1)]"
//                         : item.name === "Silver"
//                         ? "text-[#9f9f9f] border border-[#9f9f9f] bg-[rgba(188,188,188,0.1)]"
//                         : "text-[#cd7f32] border border-[#cd7f32] bg-[rgba(205,127,50,0.1)]"
//                     }`}
//                   >
//                     {item.variant.discount}% &nbsp;INR ₹
//                     {item.variant.price.toLocaleString("en-IN")}
//                   </span>
//                 </div>

//                 {typeof item.features === "string" && (
//                   <ul className="mt-6 space-y-2 text-sm text-[var(--packageList)] text-left">
//                     {item.features
//                       .match(/<(li|p)[^>]*>(.*?)<\/\1>/g)
//                       ?.map((html, idx) => {
//                         const tempDiv = document.createElement("div");
//                         tempDiv.innerHTML = html;
//                         const content =
//                           tempDiv.textContent || tempDiv.innerText || "";
//                         return (
//                           <li key={idx} className="flex gap-2 items-start">
//                             <span className="text-black-600 mt-[3px]">
//                               <IoCheckmarkSharp />
//                             </span>
//                             <span className="text-[13px] leading-5 font-light">
//                               {content}
//                             </span>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 )}

//                 <div className="absolute bottom-4 left-0 w-full px-6 mt-5">
//                   <button
//                     // onClick={() => handleRazorpayPayment(item)}
//                     onClick={handleNavigate}
//                     className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-white ${
//                       item.name === "Gold"
//                         ? "bg-[#c59c26]"
//                         : item.name === "Silver"
//                         ? "bg-[#9f9f9f]"
//                         : "bg-[#cd7f32]"
//                     }`}
//                   >
//                     Choose this plan
//                     <GoArrowUpRight />
//                   </button>
//                 </div>
//               </div>
//             ))}
