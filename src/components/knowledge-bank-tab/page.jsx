"use client";
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const KnowledgeBankTab = ({
  kbCategory,
  selectMainCategory,
  selectedCategory,
  handleSelectCategory,
}) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 200;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };


  return (
    <div className="relative w-full">
      {/* Scroll Buttons */}
      {
        Array.isArray(selectedCategory) && selectedCategory.length>5 &&  <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 bg-[var(--lightBlue)] shadow-md rounded-full p-2 -ml-2 top-1/2 -translate-y-1/2"
      >
        <FaChevronLeft  className="text-[var(--White)]"/>
      </button>
      }
     
      <div
        ref={scrollRef}
        className="w-[96%] scrollbar-hide overflow-x-auto whitespace-nowrap no-scrollbar py-4 md:px-10 flex items-center gap-3"
      >
        {kbCategory ? (
          kbCategory?.subCategories.map((category) => (
            <button
              key={category?._id}
              onClick={() => handleSelectCategory(kbCategory,kbCategory.name,category)}
              className={`px-4 py-2 border-2 rounded-full text-sm flex-shrink-0 transition-all bg-white 
              ${
               selectMainCategory === kbCategory.name  && selectedCategory === category.name
                  ? "border-[var(--lightBlue)] text-[var(--lightBlue)]"
                  : "border-gray-300 text-gray-700 hover:border-[var(--lightBlue)] hover:text-[var(--lightBlue)]"
              }`}
            >
              {category.name}
            </button>
          ))
        ) : (
          <span>Getting Categories...</span>
        )}
        </div>
      
      {
        Array.isArray(selectedCategory) && selectedCategory.length>5 &&
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 bg-[var(--lightBlue)] shadow-md rounded-full p-2 -mr-2 top-1/2 -translate-y-1/2"
      >
        <FaChevronRight className="text-[var(--White)]"/>
      </button>
}
    </div>
  );
};

export default KnowledgeBankTab;
