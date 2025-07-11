"use client";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { illustration } from "../../../components/element/images";

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

const KnowledgeBankCard = ({selectMainCategory ,filteredCategory }) => {
  console.log("filteredCategory",selectMainCategory, filteredCategory);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const [displayedItems, setDisplayedItems] = useState([]);
const [allItems, setAllItems] = useState([]); // Store all filtered results
const [isLoading, setIsLoading] = useState(false);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const rowsPerPage = 6;

 const handleNavigate = (knowledgeBankId) => {
    router.push(`/knowledge-bank/knowledge-bank-details/${knowledgeBankId}`);
  };

useEffect(() => {
  const filtered = selectMainCategory === "All"
    ? filteredCategory
    : filteredCategory.filter(item => item?.name === selectMainCategory);

  setAllItems(filtered);
  setPage(1); // Reset to page 1 on filter/search change
  setHasMore(true);
}, [filteredCategory, selectMainCategory]);

useEffect(() => {
  const loadData = () => {
    setIsLoading(true);
    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    const slice = allItems.slice(start, end);

    if (page === 1) {
      setDisplayedItems(slice);
    } else {
      setDisplayedItems(prev => [...prev, ...slice]);
    }

    setHasMore(slice.length === rowsPerPage);
    setIsLoading(false);
  };

  if (allItems.length > 0) {
    loadData();
  }
}, [page, allItems]);

useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight &&
      hasMore &&
      !isLoading  // optional, based on your condition
    ) {
      setPage(prev => prev + 1);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [hasMore, isLoading]);


  

 


  return (
    <div className="mt-10 w-full flex flex-col md:flex-row flex-wrap justify-start gap-2 ">
      {/* flex flex-col md:flex-row gap-4 flex-wrap justify-start  */}
      {displayedItems?.length > 0 ? (
        <>   
         {displayedItems.map((item) => {
            return (
              <div key={item._id} className="w-full sm:w-[50%] lg:w-[33%] mt-4 ">
              
                <div className="w-full  p-4  rounded-xl bg-[var(--White)] border">
                  {/* <div className="testimonial-img w-full h-[300px]  object-cover">
                    <Image
                      src={item?.coverImage || null}
                      alt={item?.title}
                      width={400}
                      height={300}
                      className="rounded-2xl w-full h-full object-cover"
                    />
                  </div> */}
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

export default KnowledgeBankCard;
