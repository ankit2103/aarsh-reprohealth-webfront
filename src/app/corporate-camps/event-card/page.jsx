"use client";
import React,{useState, useEffect} from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { corporateeventimg} from "../../../components/element/images";
import { useRouter } from "next/navigation";

const data = [
    {
      id: 1,
      image: corporateeventimg.img1,
      name: "Diet Tips for a Healthier Lifestyle",
      tip: "Diet Tips",
      date: "28 April 2025",
      desc: "Healthy diet tips.",
      detail: "Maintaining a healthy diet is crucial for overall well-being and can prevent numerous health issues.",
    },
    {
      id: 2,
      image: corporateeventimg.img2,
      name: "Boosting Your Immune System Natu",
      tip: "Health Tips",
      date: "24 April 2025",
      desc: "How to boost immunity naturally.",
      detail: "A strong immune system is vital for fighting off infections and staying healthy. This article pro.",
    },
    {
      id: 3,
      image: corporateeventimg.img3,
      name: "The Importance of Regular Health...",
      tip: "Health Tips",
      date: "28 April 2025",
      desc: "Importance of regular health checkups.",
      detail: "Regular health screenings are essential for early detection and prevention of various health condition.",
    },
    {
      id: 4,
      image: corporateeventimg.img1,
      name: "Diet Tips for a Healthier Lifestyle",
      tip: "Diet Tips",
      date: "28 April 2025",
      desc: "Healthy diet tips.",
      detail: "Maintaining a healthy diet is crucial for overall well-being and can prevent numerous health issues.",
    },
    {
      id: 5,
      image: corporateeventimg.img2,
      name: "Boosting Your Immune System Natu",
      tip: "Health Tips",
      date: "24 April 2025",
      desc: "How to boost immunity naturally.",
      detail: "A strong immune system is vital for fighting off infections and staying healthy. This article pro.",
    },
    {
      id: 6,
      image: corporateeventimg.img3,
      name: "The Importance of Regular Health...",
      tip: "Health Tips",
      date: "28 April 2025",
      desc: "Importance of regular health checkups.",

      detail: "Regular health screenings are essential for early detection and prevention of various health condition.",
    },
    {
      id: 7,
      image: corporateeventimg.img1,
      name: "Diet Tips for a Healthier Lifestyle",
      tip: "Diet Tips",
      date: "28 April 2025",
      desc: "Healthy diet tips.",

      detail: "Maintaining a healthy diet is crucial for overall well-being and can prevent numerous health issues.",
    },
    {
      id: 8,
      image: corporateeventimg.img2,
      name: "Boosting Your Immune System Natu",
      tip: "Health Tips",
      date: "24 April 2025",
      desc: "How to boost immunity naturally.",
      detail: "A strong immune system is vital for fighting off infections and staying healthy. This article pro.",
    },
    {
      id: 9,
      image: corporateeventimg.img3,
      name: "The Importance of Regular Health...",
      tip: "Health Tips",
      date: "28 April 2025",
      desc: "Importance of regular health checkups.",

      detail: "Regular health screenings are essential for early detection and prevention of various health condition.",
    },
    {
      id: 10,
      image: corporateeventimg.img1,
      name: "Diet Tips for a Healthier Lifestyle",
      tip: "Diet Tips",
      date: "28 April 2025",
      desc: "Healthy diet tips.",
      detail: "Maintaining a healthy diet is crucial for overall well-being and can prevent numerous health issues.",
    },
    {
      id: 11,
      image: corporateeventimg.img2,
      name: "Boosting Your Immune System Natu",
      tip: "Health Tips",
      date: "24 April 2025",
      desc: "How to boost immunity naturally.",
      detail: "A strong immune system is vital for fighting off infections and staying healthy. This article pro.",
    },
    {
      id: 12,
      image: corporateeventimg.img3,
      name: "The Importance of Regular Health...",
      tip: "Health Tips",
      date: "28 April 2025",
      desc: "Importance of regular health checkups.",
      detail: "Regular health screenings are essential for early detection and prevention of various health condition.",
    }

  ];
  

const EventCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(9);
  const router = useRouter()

  // Adjust cards per page based on screen size
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerPage(9); // Large screens
      } else if (window.innerWidth >= 768) {
        setCardsPerPage(4); // Tablets
      } else {
        setCardsPerPage(2); // Mobile
      }
    };

    updateCardsPerPage(); // Set initial value
    window.addEventListener("resize", updateCardsPerPage);

    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // Calculate current cards to display
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(data.length / cardsPerPage);

  // Generate page numbers with ellipsis logic
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="w-full px-8 sm:px-10 md:px-14 lg:px-14">
      {/* Cards Grid */}
      <div className="pt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-12">
        {currentCards.map((item, index) => (
          <div
          key={item.id}
            className="w-full flex flex-col justify-start items-center text-start cursor-pointer"
            onClick={() => router.push(`/corporate-events/event-card/${item.id}`)}
          >
            <div className="">
              <div className="w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="rounded-2xl w-full object-cover "
                />
              </div>

              <div className="fontsizelg  flex gap-4 mt-6   justify-start w-full">
                {/* text-lg */}
                <p className=" text-[var(--pink)]">{item.tip}</p>
                <p className="text-[var(--greyP)]">{item.date}</p>
              </div>

              <h2 className="fontsizexl w-full  mt-4 text-start">
                {item.name}
              </h2>
              <p className="fontsizebase w-full text-md text-[var(--greyP)] mt-4 text-start">
                {item.detail}
              </p>

              <button className="fontsizelg fontmedium mt-4 text-[var(--pink)] flex gap-3 items-center">
                {/* font-semibold text-lg  */}
                Read More <FaArrowRightLong />
              </button>
            </div>
          </div>
        ))}
      </div>

       {/* Pagination Controls */}
       <div className="flex justify-center items-center mt-6 gap-2">
        {/* Previous Arrow */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`p-3  ${
            currentPage === 1 ? "text-[var(--greyP)] cursor-not-allowed" : "text-[var(--lightBlue)] "
          }`}
        >
          <FaArrowLeft />
        </button>

        {/* Page Numbers */}
        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-[var(--lightBlue)] text-white"
                : "bg-gray-200 text-[var(--lightBlue)] hover:bg-gray-300"
            } ${page === "..." ? "cursor-default" : ""}`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        {/* Next Arrow */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`p-3 rounded-full ${
            currentPage === totalPages ? "text-[var(--greyP)] cursor-not-allowed" : "text-[var(--lightBlue)] hover:bg-gray-200"
          }`}
        >
          <FaArrowRight />
        </button>
      </div>

    </div>
  );
};

export default EventCard;


