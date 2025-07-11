"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { healthadvicecardimages } from "../element/images";
import { useRouter, usePathname } from "next/navigation";
import { fetchKnowledgeBanks } from "../../utils/knowledge-bank/knowledge-bank.util";
import { Category } from "@mui/icons-material";
import parse from "html-react-parser";

const testimonials = [
  {
    id: 1,
    name:
      "Essential Andrology Health Tips for Men: Boosting Reproductive, Sexual, and Overall Well-being",
    desc:
      "Here are some andrology-related health tips that can help men maintain optimal reproductive, sexual, and overall health",
    image: healthadvicecardimages.img1,
    tip: "Health Tips",
    date: "25 Feb,2025",
    category: "andrology",
  },
  {
    id: 2,
    name:
      "Essential Gynecology Health Tips for Women: Maintaining Reproductive, Hormonal, and Overall Wellness",
    desc:
      "Here are some gynecology-related health tips for women to maintain optimal reproductive, sexual, and overall health",
    image: healthadvicecardimages.img2,
    tip: "Health Tips",
    date: "25 Feb,2025",
    category: "gynecology",
  },
  {
    id: 3,
    name:
      "Essential Psychiatry and Counseling Health Tips: Nurturing Mental and Emotional Well-being",
    desc:
      "Here are some psychiatry and counseling-related health tips for maintaining mental and emotional well-being",
    image: healthadvicecardimages.img3,
    tip: "Health Tips",
    date: "25 Feb,2025",
    category: "psychiatry",
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

const HealthAdviceCard = () => {
  const [loading, setLoading] = useState(true);
  const [getData, setGetData] = useState([]);
  const router = useRouter(); // Initialize router
  const pathname = usePathname(); // Get the current path

  const settings = {
    dots: false,
    infinite: getData.length > 2,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    try{
      const getKnowledgeBanks = async () => {
      
      // console.log("Calling fetchKnowledgeBanks...");
      const result = await fetchKnowledgeBanks();
      console.log("HealthAdviceCard  Knowledge Bank Data api :", result?.data);
      if (result?.code === 200) {
        setGetData(result?.data || []);
        setLoading(false);
      }
      else{
          setLoading(true);
      }
    };
    getKnowledgeBanks();
    }
    catch(error){
      console.log("Error in fetching getKnowledgeBanks:",error);
    }
  }, []);





  const handleNavigate = (id) => {
    router.push(`/knowledge-bank/knowledge-bank-details/${id}`);
    // router.push(`/knowledge-bank/knowledge-bank-details/${id}`)
  };

  // console.log("getData knowledge bank----------------", getData);


  return (
    <div className="w-[95%] lg:w-[96%] m-auto ">
      <div className="main-container">
        <div className="container">
          {loading ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full px-2 ">
                 <div className="w-full ">
                  <h2 className="heading text-start capitalize">
                    Knowledge Bank
                  </h2>
                  <p className="text-[var(--greyP)] text-start mt-2 ">
                    Read about how your surrounding defines your health.
                  </p>
                </div>
                <p
                    className=" border bg-[var(--lightBlue)] text-center w-[10%] py-3 px-3 rounded-full mt-8 text-[var(--White)]  cursor-pointer hover:border-[var(--lightBlue)] hover:bg-[var(--vista)] hover:text-[var(--lightBlue)]"
                    disabled
                  >
                    See all
                  </p>
              </div>

              <div className="mt-10 animate-pulse">
                <div className="flex overflow-x-scroll gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="min-w-[400px] max-w-[450px] p-3 bg-gray-100 rounded-2xl"
                    >
                      <div className="h-[180px] bg-gray-300 rounded-2xl mb-4 w-full" />
                      <div className="flex justify-between gap-4 mb-2">
                        <div className="h-4 bg-gray-300 w-1/3 rounded" />
                        <div className="h-4 bg-gray-300 w-1/4 rounded" />
                      </div>
                      <div className="h-5 bg-gray-300 w-3/4 rounded mb-2" />
                      <div className="h-4 bg-gray-300 w-[90%] rounded mb-1" />
                      <div className="h-4 bg-gray-300 w-[80%] rounded mb-4" />
                      <div className="h-5 w-1/3 bg-gray-300 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center md:flex-row md:items-center justify-between w-full px-2 ">
                <div className="w-full ">
                  <h2 className="heading text-center  md:text-start capitalize">
                    Knowledge Bank
                  </h2>
                  <p className="text-[var(--greyP)] capitalize text-center md:text-start mt-2 ">
                    Fast Facts For smarter care- Because every detail matters
                  </p>
                </div>
                {pathname !== "/knowledge-bank" && (
                  <p
                    className=" border bg-[var(--lightBlue)] text-center w-[50%] md:w-[10%] lg:w-[8%] py-3 px-2 rounded-full mt-5 md:mt-8 text-[var(--White)]  cursor-pointer hover:border-[var(--lightBlue)] hover:bg-[var(--vista)] hover:text-[var(--lightBlue)]"
                    onClick={() => router.push("/knowledge-bank")}
                  >
                    See all
                  </p>
                )}
                
              </div>
              <div className="mt-10">
                <Slider {...settings}>
                  {getData?.length > 0 &&
                    getData?.map((item, index) => {
                      const parsed = parse(item?.description);
                      let contentToRender;
                      if (Array.isArray(parsed)) {
                        contentToRender = parsed[0];
                      } else {
                        const text =
                          typeof item?.description === "string"
                            ? item?.description
                            : "";
                        const stripped = text.replace(/<[^>]*>/g, ""); // or use `striptags` if preferred
                        const truncated =
                          stripped.length > 100
                            ? `${stripped.slice(0, 100)}...`
                            : stripped;
                        contentToRender = <>{truncated}</>;
                      }
                      // console.log("parse(item.description)-------------",parse(item?.description))
                      return (
                        <div key={index} className="testimonial-main-card">
                          <div className="p-6">
                            <div className="testimonial-img">
                              <Image
                                src={item?.coverImage}
                                alt="not found"
                                width={400} // Provide a number in pixels
                                height={300}
                                className="rounded-2xl w-full"
                              />
                            </div>
                            <div className="flex gap-4 mt-4  justify-between">
                              <p className="text-[var(--pink)]">
                                {item?.kbcId?.name}
                              </p>
                              <p className="text-[var(--greyP)]">
                                {formatted(item?.updatedAt)}
                              </p>
                            </div>

                            <p className="mt-2">{item?.title}</p>
                            <div className="text-[var(--greyP)] mt-2 fontsizebase">
                              {contentToRender}
                            </div>

                            <button
                              onClick={() => handleNavigate(item._id)}
                              className="mt-4 text-[var(--pink)] font-medium  flex gap-3 items-center fontsizesm cursor-pointer"
                              // disabled
                            >
                              Read More <FaArrowRightLong />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .subtitle {
          font-size: 14px;
          color: var(--greyP);
        }
        .testimonial-main-card {
          width: 100%;
          min-height: 400px;
          max-width: 100%;
          position: relative;
          margin-bottom: 30px;
        }
         
      `}</style>   
    </div>
  );
};

export default HealthAdviceCard;
