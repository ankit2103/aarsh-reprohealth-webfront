// "use client";
// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {
//   fetchKnowledgeBanks,
//   fetchKnowledgeBankById,
// } from "../../../../utils/knowledge-bank/knowledge-bank.util"; // Replace with actual API calls

// const KnowledgeBankPage = () => {
//   const [kb, setkb] = useState(null);
//   const [kbs, setkbs] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     if (!id) return;

//     const getKnowledgeBankDetails = async () => {
//       const KBData = await fetchKnowledgeBankById(id);
//       setkb(KBData?.data || null);
//     };

//     const getKnowledgeBanks = async () => {
//       const result = await fetchKnowledgeBanks();
//       const relatedKnowledgeBanks =
//         result?.data?.filter((b) => b.kbcId._id !== id) || [];
//       setkbs(relatedKnowledgeBanks);
//     };

//     getKnowledgeBankDetails();
//     getKnowledgeBanks();
//   }, [id]);

//   const formatDate = (utcDate) => {
//     const date = new Date(utcDate);
//     const options = { day: "2-digit", month: "long", year: "numeric" };
//     return date.toLocaleDateString("en-GB", options);
//   };

//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <section className="bg-gradient-to-b from-cyan-100 via-slate-50 to-slate-50 flex flex-col py-4">
//       <div className="container mx-auto px-4 py-8 mb-8 ">
//         {kb?.coverImage && (
//           <Image
//             src={kb.coverImage}
//             alt={kb.title}
//             width={1200}
//             height={200}
//             className="h-[500px] w-full shadow-lg rounded-xl object-cover mt-20 md:mt-24"
//           />
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
//           <div className="lg:col-span-2">
//             {kb ? (
//               <div>
//                 <h2 className="text-3xl font-bold text-black mt-2">
//                   {kb.title}
//                 </h2>
//                 <p className="text-pink-500 mt-2">
//                   {kb.kbcId.name}{" "}
//                   <span className="text-gray-500">
//                     | {formatDate(kb.createdAt)}
//                   </span>
//                 </p>
//                 {kb.knowledgeBankImages &&
//                   kb.knowledgeBankImages.length > 0 && (
//                     <div className="mt-4">
//                       <Slider {...sliderSettings}>
//                         {kb.knowledgeBankImages.map((image, index) => (
//                           <div key={index}>
//                             <Image
//                               src={image}
//                               alt={`Knowledge Bank Image ${index + 1}`}
//                               width={600}
//                               height={100}
//                               className="w-full rounded-lg object-cover h-[300px]"
//                             />
//                           </div>
//                         ))}
//                       </Slider>
//                     </div>
//                   )}
//                 <p className="text-gray-700 mt-4">{kb.description}</p>

//               </div>
//             ) : (
//               <p>Loading Knowledge Bank...</p>
//             )}
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white p-4 rounded-lg border-2 shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 pb-2 mb-4 text-left">
//                 Related Knowledge Banks
//               </h3>

//               <div className="space-y-4">
//                 {kbs.map((relatedKbs) => (
//                   <div
//                     key={relatedKbs._id}
//                     className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-100 p-3 rounded-lg"
//                   >
//                     <div className="flex justify-center items-center sm:w-24 w-full">
//                       <Image
//                         src={relatedKbs.coverImage}
//                         alt={relatedKbs.title}
//                         width={60}
//                         height={60}
//                         className="h-full w-40 rounded-lg object-cover shrink-0"
//                       />
//                     </div>
//                     <div className="flex flex-col items-start space-y-1 w-full min-w-0">
//                       <p className="text-pink-500">
//                         {relatedKbs.kbcId.name}{" "}
//                         <span className="text-gray-500">
//                           | {formatDate(relatedKbs.createdAt)}
//                         </span>
//                       </p>
//                       <h4 className="font-semibold text-black">
//                         {relatedKbs.title}
//                       </h4>
//                       <p
//                         className="text-gray-600 text-sm text-start truncate overflow-hidden w-full"
//                         style={{
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                         }}
//                       >
//                         {relatedKbs.description}
//                       </p>
//                       <a
//                         href={`./${relatedKbs._id}`}
//                         className="text-pink-500 text-sm"
//                       >
//                         Read More →
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default KnowledgeBankPage;

// Just
"use client";
import React, { useEffect, useState } from "react";
import ComingSoon from "../../../../components/coming-soon/page";
import { blogimages } from "../../../../components/element/images";
import Image from "next/image";
import {
  blogrelatedimg,
  healthadvicecardimages,
} from "../../../../components/element/images";
import {
  fetchKnowledgeBankById,
  fetchKnowledgeBanks,
} from "../../../../utils/knowledge-bank/knowledge-bank.util";
import { useParams, useRouter } from "next/navigation";
import { GoClock } from "react-icons/go";
import parse from "html-react-parser";
import KnowledgeCard from "../../../../components/custom-card/knowledge-card";
import Link from "next/link";

const normalimg = [
  {
    id: 1,
    title: "Diet Tips for a Healthier...",
    category: "Diet Tips",
    date: "28 April 2025",
    description:
      "Maintaining a healthy diet is crucial for overall well-being and can prevent...",
    image: blogrelatedimg.blog1,
  },
  {
    id: 2,
    title: "5 Easy Workouts to Stay Fit",
    category: "Fitness",
    date: "12 March 2025",
    description: "Simple exercises to keep your body active and healthy...",
    image: blogrelatedimg.blog2,
  },
  {
    id: 3,
    title: "Diet Tips for a Healthier...",
    category: "Diet Tips",
    date: "28 April 2025",
    description:
      "Maintaining a healthy diet is crucial for overall well-being and can prevent...",
    image: blogrelatedimg.blog3,
  },
  {
    id: 4,
    title: "5 Easy Workouts to Stay Fit",
    category: "Fitness",
    date: "12 March 2025",
    description: "Simple exercises to keep your body active and healthy...",
    image: blogrelatedimg.blog4,
  },
];
const formatted = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
const renderDescription = (desc) => {
  if (!desc) return null;

  const parsed = parse(desc);

  if (Array.isArray(parsed)) {
    return parsed; // or more advanced logic if needed
  } else {
    const text = typeof desc === "string" ? desc : "";
    const stripped = text.replace(/<[^>]*>/g, ""); // or use `striptags` package
    // const truncated =
    //   stripped.length > 100 ? `${stripped.slice(0, 100)}...` : stripped;

    return <>{stripped}</>;
  }
};
const dummyLink = [
  {
    title: "Understanding Common Urological Conditions",
    link: "https://www.urologyhealth.org/urologic-conditions"
  },
  {
    title: "Urology Overview - Mayo Clinic",
    link: "https://www.mayoclinic.org/departments-centers/urology"
  },
  {
    title: "American Urological Association - Patient Info",
    link: "https://www.auanet.org/education/patient-education"
  },
  {
    title: "Men's Urologic Health - WebMD",
    link: "https://www.webmd.com/urinary-incontinence-oab/default.htm"
  },
  {
    title: "Kidney Stones: Causes and Treatment",
    link: "https://www.kidney.org/atoz/content/kidneystones"
  }
];


const KnowledgeBankPage = () => {
  const [getData, setGetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currentCategoryData, setCurrentCategoryData] = useState([]);
  const router = useRouter();
  const [KbIdData, setKbIdData] = useState(null);

  const handleUpdate = (newId) => {
    // console.log("handleUpdate-----", newId);
    router.push(`/knowledge-bank/knowledge-bank-details/${newId}`);
  };

  useEffect(() => {
    try {
      const getKnowledgeBanks = async () => {
        // console.log("Calling fetchKnowledgeBanks...");
        const result = await fetchKnowledgeBanks();
        console.log(
          "KnowledgeBankdetail page  Knowledge Bank Data api :",
          result?.data
        );
        if (result?.code === 200) {
          {
            setData(result?.data);
          }
        } else {
          setLoading(true);
        }
      };
      getKnowledgeBanks();
    } catch (error) {
      console.log("Error in fetching getKnowledgeBanks:", error);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    const getKnowledgeBankDetails = async () => {
      try {
        console.log("id---------------------", id);
        const KBData = await fetchKnowledgeBankById(id);
        console.log("KB DATA BY ID:", KBData);
        setKbIdData(KBData?.data || null);
        
      } catch (error) {
        console.log("error in kb get by id:", error);
      }
    };
    getKnowledgeBankDetails();
  }, []);
  // useEffect(()=>{
  //    console.log("item-----------------------",KbIdData, data)
  //   // const items = data?.length>0 && data?.filter((item, index)=>(item?.name===KbIdData?.data?.name)).map((filterData,id)=>{
  //   //     console.log("item inner-----------------------",filterData)
        
  //   // })
  //   const relatedData = data?.length>0&& data?.filter((item, index)=>(item?.name===KbIdData?.name).map(filterData,id)=>{
  //     })
      
  //   // setGetData(relatedData);
  //   if(KbIdData?._id===""){

  //   }
  // },[data])
  
  useEffect(() => {
    console.log("item-----------------------",KbIdData, data)
  if (!data || !KbIdData?.name) return;

  const relatedData = data.filter((item) => item?.name === KbIdData.name);

  console.log("relatedData:", relatedData);
  setGetData(relatedData);
}, [data, KbIdData]);



  // console.log("object-------------------------", getData);
  return (
    <>
      <section className="main-container w-full pt-16 pb-10 flex flex-col mb-20 text-center mt-28 bg-gradient-to-b from-cyan-100 via-slate-50 to-slate-50">
        {/* Wrapper for Centered Content */}
        <div className="max-w-[1344px] w-full mx-auto px-4">
          <div className="w-full grid grid-cols-1    lg:grid-cols-[3fr_1fr] mt-14 gap-3">
            {/* md:grid-cols-2 (i.e., 50% : 50%)  &  grid-cols-[3fr_1fr] (i.e., 75% : 25%) */}
            <div className="relative h-[250px] md:h-[350px] lg:h-[450px] w-full   flex justify-center rounded-lg items-center">
              <Image
                src={KbIdData?.coverImage}
                alt="Health Tips"
                layout="fill"
                className="rounded-xl "
              />
            </div>
            {/* right side  */}
            <div className=" w-full flex justify-center md:justify-start">
              <div className="bg-white p-4 rounded-lg border-2 w-full lg:max-w-md mx-auto lg:md:max-w-none">
                <h3
                  className="text-[var(--listText)] text-sm mt-2 underline  pb-2 mb-4 text-left"
                  // onClick={() => handleNavigate("/")}
                >
                  Quick links
                </h3>

                <ul className="space-y-4 w-full list-disc px-3">
                  {dummyLink?.length > 0 &&
                    dummyLink.map((item) => (
                      <li
                        key={item._id}
                        className=""
                      >
                        <Link href={item?.link || "#"} legacyBehavior>
                          <a target="_blank" rel="noopener noreferrer">
                            <h4 className="text-[var(--listText)] text-start cursor-pointer hover:text-blue-500 underline decoration-transparent hover:decoration-blue-500">
                              {item?.title}
                            </h4>
                          </a>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Hero Image Section */}

          {/* Content & Related Blogs Container */}
          <div className="w-full  mt-8 grid grid-cols-1 md:grid-cols-1 gap-8 ">
            {/* Blog Content (Left Side) */}
            <div className="col-span-2 text-left w-full h-full  z-22">
              <div className="my-4">
                <p className="text-pink-500 font-semibold">
                  {data[0]?.name}{" "}
                  <span className="text-gray-500 ml-2">
                    {formatted(data[0]?.createdAt)}
                  </span>
                </p>
              </div>
              <h3 className="text-[var(--listText)] mt-2">
                The Importance of Regular Health Check-Ups
              </h3>

              <div>{renderDescription(KbIdData?.description)}</div>
            </div>
            {/* Related Blogs (Right Side) */}
          
          </div>
          {/* testimonial */}
          <div className="w-full  mt-8">  
            <KnowledgeCard filteredCategory={data}/>
          </div>
        </div>
      </section>
    </>
  );
};

export default KnowledgeBankPage;

 {/* Related Blogs (Right Side) */}
  {/* <div>
             
              <div className="flex justify-center md:justify-start w-full ">
                <div className="bg-white p-4 rounded-lg border-2 w-full max-w-md mx-auto md:max-w-none">
                  <h3
                    className="text-[var(--listText)] text-sm mt-2 underline  pb-2 mb-4 text-left"
                    onClick={() => handleNavigate("/")}
                  >
                    See More
                  </h3>

                  <div className="space-y-4 w-full">
                    {data?.length > 0 &&
                      data.map((item) => (
                        <div
                          key={item._id}
                          
                          className="flex flex-col sm:flex-row flex-nowrap space-y-4 sm:space-y-0 sm:space-x-4 w-full"
                        >
                          
                          <div className="flex justify-center items-center w-full sm:w-auto">
                            <Image
                              src={item.coverImage}
                              alt="not found"
                              width={50}
                              height={50}
                              className="h-full w-40 rounded-lg object-cover shrink-0"
                            />
                          </div>

                         
                          <div className="flex flex-col items-start space-y-1 w-full min-w-0">
                            <p className="text-pink-500 font-[500]">
                              {item?.kbcId?.name}{" "}
                            </p>
                            <p>
                              <span className="text-gray-500 ">
                                {formatted(item?.updatedAt)}
                              </span>
                            </p>
                            <h4 className="text-[var(--listText)] text-start">
                              {item?.title}
                            </h4>
                         
                            <p
                              onClick={() => handleUpdate(item?._id)}
                              className="text-pink-500 text-sm font-[400] cursor-pointer"
                            >
                              Read More →
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div> */}