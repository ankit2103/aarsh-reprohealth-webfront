"use client";
import Slider from "react-slick";
import React, { useState } from "react";
import parse from "html-react-parser";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { illustration } from "../../components/element/images";

const renderDescription = (desc) => {
  if (!desc) return null;

  try {
    const parsed = parse(desc);

    // If parsed is a single <ul> element
    if (parsed?.type === "ul" && Array.isArray(parsed.props?.children)) {
      return <ul>{parsed.props.children.slice(0, 1)}</ul>;
    }

    // If parsed is an array of nodes (e.g., multiple elements like <ul>, <p>, etc.)
    if (Array.isArray(parsed)) {
      const ulElement = parsed.find((el) => el?.type === "ul");

      if (ulElement && Array.isArray(ulElement.props?.children)) {
        return <ul>{ulElement.props.children.slice(0, 1)}</ul>;
      }
    }
  } catch (err) {
    console.error("Failed to parse description:", err);
  }

  // Fallback: plain text (truncated)
  const text = typeof desc === "string" ? desc : "";
  const stripped = text.replace(/<[^>]*>/g, "");
  const truncated =
    stripped.length > 100 ? `${stripped.slice(0, 100)}...` : stripped;

  return <>{truncated}</>;
};

const formatted = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
const KnowledgeCard = ({ selectMainCategory, filteredCategory }) => {
  console.log("filteredCategory", selectMainCategory, filteredCategory);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const CustomNext = ({ onClick }) => (
    <div
      className="p-2  md:block absolute top-[50%] right-[-5%] sm:right-[-4%] md:right-[-4%] lg:-right-[3%] lg:top-[50%] cursor-pointer z-50"
      onClick={onClick}
    >
      <GrFormNext className="text-xl text-[var(--White)] rounded-full bg-[var(--lightBlue)]" />
    </div>
  );

  const CustomPrev = ({ onClick }) => (
    <div
      className="p-2  md:block absolute top-[50%] left-[-5%]  sm:left-[-4%] md:left-[-4%] lg:-left-[3%]  lg:top-[50%] cursor-pointer z-50"
      onClick={onClick}
    >
      <GrFormPrevious className="text-xl text-[var(--White)] rounded-full bg-[var(--lightBlue)]" />
    </div>
  );

  const handleNavigate = (knowledgeBankId) => {
    router.push(`/knowledge-bank/knowledge-bank-details/${knowledgeBankId}`);
    // router.push(`/knowledge-bank/knowledge-bank-details/${id}`)
  };
  const sliderSettings = {
    dots: false,
    infinite: filteredCategory?.length > 2,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, infinite: filteredCategory?.length > 2 },
      },
    ],
    prevArrow: <CustomPrev />,
    nextArrow: <CustomNext />,
  };

  return (
    <div className="mt-10 w-full  ">
      {/* flex flex-col md:flex-row gap-4 flex-wrap justify-start  */}
      {filteredCategory?.length > 0 ? (
        <>
         <Slider {...sliderSettings}>
        
          {filteredCategory.map((item) => {
            return (
              <div
                key={item._id}
                className="w-full sm:w-[50%] lg:w-[33%] mt-4 mx-auto md:px-2"
              >
                {/* px-3 */}
                <div className="w-[100%] sm:w-[100%] md:w-full  p-4  rounded-xl bg-[var(--White)] border">
                  <div className="flex gap-4 mt-4  justify-between">
                    <p className="text-[var(--pink)]">{item?.name}</p>
                    <p className="text-[var(--greyP)]">
                      {formatted(item?.createdAt)}
                    </p>
                  </div>

                  <p className="mt-2 text-left">
                    {item?.title?.trim().slice(0, 40) +
                      (item?.title?.length > 40 ? "..." : "")}
                  </p>
                  <div className="text-[var(--greyP)] mt-2 text-left">
                    {renderDescription(item?.description)}
                  </div>

                  <button
                    onClick={() => handleNavigate(item.knowledgeBankId)}
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
        </>
      ) : (
        <div className="w-full flex justify-center items-center py-8">
          <Image
            src={illustration?.empty}
            alt="not found"
            width={300}
            height={300}
            className="w-[240px] h-[240px]"
          />
        </div>
      )}
    </div>
  );
};

export default KnowledgeCard;
