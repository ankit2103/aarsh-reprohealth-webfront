"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import {
  consulttopdoctorimages,
  underlineimg,
} from "../../components/element/images";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Head from "next/head";

const FaqSeo = ({ faqs }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [faq.answer, faq.answer1, faq.answer2, faq.answer3, faq.answer4, faq.answer5, faq.answer6]
          .filter(Boolean)
          .join("<br/>"),
      },
    })),
  };

  return (
    <Head>
      <title>FAQs | Aarsh ReproHealth</title>
      <meta
        name="description"
        content="Find answers to common questions about Aarsh ReproHealth’s services, partnerships, clinics, and more. Get the help you need."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.aarshreprohealth.com/faqs" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </Head>
  );
};

const faqs = [
  {
    id: 1,
    name: "General FAQs",
    question: "What is Aarsh ReproHealth?",
    answer:
      "Aarsh ReproHealth is a comprehensive platform dedicated to reproductive health and wellness. We aim to empower individuals and couples by providing expert guidance, support, and treatment options for fertility, endometriosis, and related concerns. Our network includes experienced doctors, specialists, hospitals, clinics, and labs, all working together to create awareness and improve reproductive health outcomes.",
  },
  {
    id: 2,
    name: "General FAQs",
    question: "What services does Aarsh ReproHealth offer?",
    answer: "We offer:",
    answer1:
      "Access to a network of reproductive health specialists, including gynecologists, andrologists, urologists, and endocrinologists.",
    answer2:
      "Support for mental health through access to psychiatrists and counselors, helping individuals cope with the emotional challenges of reproductive health issues.",
    answer3:
      "Expert consultations for fertility concerns, endometriosis, and other reproductive health conditions.",
    answer4:
      "Awareness programs, seminars, mentorships, and reproductive health medical camps for corporates and communities.",
    answer5:
      "Assistance with diagnostic tests, procedures, and treatments through our partner clinics and laboratories.",
    answer6:
      "Support for male fertility, helping break stigmas around male reproductive health.",
  },
  {
    id: 3,
    name: "General FAQs",
    question: "Who can join Aarsh ReproHealth?",
    answer: "Aarsh ReproHealth is open to:",
    answer1:
      "Individuals and couples seeking guidance for fertility, endometriosis, reproductive health challenges, and mental wellness.",
    answer2:
      "Doctors and specialists looking to collaborate and increase their visibility.",
    answer3:
      "Hospitals, clinics, and labs interested in expanding their reach in reproductive healthcare.",
    answer4:
      "Organizations such as financial institutions, insurance providers, and pharmaceutical companies interested in partnering with us.",
  },
  {
    id: 4,
    name: "General FAQs",
    question: "How can I register on Aarsh ReproHealth?",
    answer:
      "Simply click the ‘Get Started’ button on our platform, enter your email and mobile number for verification, and complete the registration process. This enables seamless booking of consultations, access to prescriptions, reports, and your medical history, while allowing doctors, clinics, and labs to manage their profiles and dashboards.",
  },
  {
    id: 5,
    name: "General FAQs",
    question: "How can I consult a doctor on Aarsh ReproHealth?",
    answer:
      "Browse our platform to find the right doctor or specialist for you. Book an appointment for an in-person or online (video/audio) consultation based on your preference. Our platform ensures privacy, convenience, and comprehensive care from the comfort of your home or at the doctor’s clinic.",
  },
  {
    id: 6,
    name: "General FAQs",
    question: "Does Aarsh ReproHealth offer multilingual consultations?",
    answer:
      "Yes! We provide consultations in multiple Indian languages to ensure patients can communicate comfortably and clearly.",
  },
  {
    id: 7,
    name: "General FAQs",
    question: "Are consultations recorded and transcribed?",
    answer:
      "Yes. Online consultations are securely recorded, and speech is transcribed into text for your reference, enabling you to review key medical advice and instructions.",
  },
  {
    id: 8,
    name: "General FAQs",
    question: "How will I receive prescriptions or reports?",
    answer:
      "Your doctor, clinic, or lab will share prescriptions and reports via the Aarsh ReproHealth platform and through email.",
  },
  {
    id: 9,
    name: "General FAQs",
    question:
      "Can I connect with clinics and diagnostic labs via Aarsh ReproHealth?",
    answer:
      "Absolutely! Aarsh ReproHealth offers access to specialized clinics and diagnostic labs for your tests and treatments. Simply choose a clinic or lab near you and schedule an appointment.",
  },
  {
    id: 10,
    name: "General FAQs",
    question: "Is Aarsh ReproHealth only for women?",
    answer:
      "No. Aarsh ReproHealth is for everyone. We support both male and female reproductive health, aiming to break taboos and promote awareness around male fertility too.",
  },
  {
    id: 11,
    name: "General FAQs",
    question: "Does Aarsh ReproHealth organize awareness events and seminars?",
    answer:
      "Yes! We regularly host awareness programs and community outreach initiatives on topics like fertility, endometriosis, male reproductive health, and more. Follow our platform and social media for updates.",
  },
  {
    id: 12,
    name: "General FAQs",
    question: "Are Aarsh ReproHealth services free?",
    answer:
      "Some services, like basic access to information and resources, are free. Consultations, tests, and treatments have associated charges, which are shown during booking.",
  },
  {
    id: 13,
    name: "General FAQs",
    question: "How can I become a member or partner with Aarsh ReproHealth?",
    answer:
      "Doctors, clinics, and labs can subscribe to our membership plans for exclusive benefits. Non-subscribed members can also join with limited features. For more details, email us at support@aarshreprohealth.com or WhatsApp us at +91 97405 22300.",
  },
  {
    id: 14,
    name: "General FAQs",
    question: "How does Aarsh ReproHealth ensure service quality?",
    answer:
      "We partner with qualified and experienced healthcare professionals. We also encourage ongoing learning through knowledge sharing and professional development.",
  },
  {
    id: 15,
    name: "General FAQs",
    question: "How can I contact Aarsh ReproHealth for support?",
    answer:
      "Reach us via our Contact Us page, email at support@aarshreprohealth.com, or WhatsApp at +91 97405 22300. We’re happy to assist you!",
  },

  {
    id: 23,
    name: "Partnerships & Collaborations",
    question:
      "Does Aarsh ReproHealth partner with organizations to support patients?",
    answer:
      "Yes. We actively seek partnerships with corporates, foundations, and organizations to offer financial assistance, insurance support, and access to reproductive health products. Interested partners can contact us at support@aarshreprohealth.com or WhatsApp at +91 97405 22300.",
  },
  {
    id: 24,
    name: "Partnerships & Collaborations",
    question:
      "How can organizations partner with Aarsh ReproHealth to support patients?",
    answer: "Organizations can collaborate through:",
    answer1: "Sponsorships for patient treatments.",
    answer2: "CSR initiatives for awareness and funding.",
    answer3: "Financial aid for diagnostics, treatments, and medications.",
    answer4: "Educational campaigns to improve reproductive health literacy.",
  },
  {
    id: 25,
    name: "Partnerships & Collaborations",
    question:
      "Does Aarsh ReproHealth collaborate with pharmaceutical companies?",
    answer:
      "Yes. We welcome partnerships with pharmaceutical companies to promote responsible awareness around reproductive health drugs, ensuring accurate information and access to treatments.",
  },
  {
    id: 26,
    name: "Partnerships & Collaborations",
    question:
      "What benefits do pharma companies gain by partnering with Aarsh ReproHealth?",
    answer: "Pharma companies can:",
    answer1: "Showcase their products to a targeted audience.",
    answer2: "Collaborate on educational initiatives.",
    answer3: "Build brand visibility.",
    answer4: "Support patient success stories and awareness drives.",
  },
  {
    id: 27,
    name: "Partnerships & Collaborations",
    question: "Are there costs involved in partnering with Aarsh ReproHealth?",
    answer:
      "Partnership terms are mutually agreed upon based on the nature and scope of the collaboration.",
  },

  {
    id: 52,
    name: "Corporate Camps & Seminars",
    question:
      "Does Aarsh ReproHealth organize reproductive medical camps for corporates?",
    answer:
      "Yes. We organize in-person and online reproductive medical camps at corporate offices, featuring specialist doctors and labs.",
  },
  {
    id: 53,
    name: "Corporate Camps & Seminars",
    question: "Does Aarsh ReproHealth conduct seminars and awareness programs?",
    answer:
      "Yes. We conduct seminars and awareness programs on topics like endometriosis, gynecology, andrology, and other reproductive health areas. Our events are led by medical experts.",
  },
  {
    id: 54,
    name: "Corporate Camps & Seminars",
    question: "Are there charges for seminars and awareness programs?",
    answer:
      "Yes. For details, please email us at support@aarshreprohealth.com or WhatsApp at +91 97405 22300.",
  },
];
const faqtitle = [
  {
    id: 1,
    name: "General FAQs",
    img: consulttopdoctorimages[0].icon,
    img: consulttopdoctorimages[0].iconhover,
  },
  {
    id: 2,
    name: "Partnerships & Collaborations",
    img: consulttopdoctorimages[1].icon,
    img: consulttopdoctorimages[1].iconhover,
  },
  {
    id: 3,
    name: "Corporate Camps & Seminars",
    img: consulttopdoctorimages[2].icon,
    img: consulttopdoctorimages[2].iconhover,
  },
];
const GeneralFrequentlyAskedQuestion = () => {
  const [activeCard, setActiveCard] = useState("General FAQs");
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [filteredCards, setFilteredCards] = useState([]);
  // for next and previous faq category
  const [currentIndex, setCurrentIndex] = useState(0);


const handlePrevious = () => {
  const newIndex = Math.max(currentIndex - 1, 0);
  setCurrentIndex(newIndex);
  setActiveCard(faqtitle[newIndex].name);
};

const handleNext = () => {
  const newIndex = Math.min(currentIndex + 1, faqtitle.length - 1);
  setCurrentIndex(newIndex);
  setActiveCard(faqtitle[newIndex].name);
};

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Calculate current cards to display
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const handleCardClick = (title) => {
    // setActiveCard(title === activeCard ? null : title); // Toggle active state
    const index = faqtitle.findIndex((item) => item.name === title);
  if (index !== -1) {
    setActiveCard(title);
    setCurrentIndex(index); // sync for mobile
  }
  };
  const generatePageNumbers = () => {
    const pages = new Set(); // Use Set to prevent duplicates

    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) pages.add(i);
    } else {
      if (currentPage <= 3) {
        pages.add(1);
        pages.add(2);
        pages.add(3);
        if (totalPages > 3) {
          pages.add("...");
          pages.add(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pages.add(1);
        if (totalPages > 3) {
          pages.add("...");
        }
        pages.add(totalPages - 2);
        pages.add(totalPages - 1);
        pages.add(totalPages);
      } else {
        pages.add(1);
        pages.add("...");
        pages.add(currentPage);
        pages.add("...");
        pages.add(totalPages);
      }
    }

    return Array.from(pages);
  };
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerPage(5); // Large screens
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
  useEffect(() => {
    const newFilteredCards = faqs.filter((item) => item.name === activeCard);
    setFilteredCards(newFilteredCards);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [activeCard, faqs]);

  return (
    <>
    <FaqSeo faqs={faqs} />
      <div className="w-[100%] py-10  lg:py-28 bg-cover bg-[url(/assets/images/faq/faq-banner-img-new-2.png)] mt-16 md:mt-16 lg:mt-10 ">
        <div className="flex h-[100%] justify-center flex-col">
          <p className="text-[#FE76A8] text-[15px] px-10  ">The FAQs</p>
          <h1 className="text-[var(--White)] capitalize text-[20px] lg:text-[40px]  sm:max-w-[100%]  md:max-w-[100%] lg:max-[100%] px-10 sm:px-10 md:px-10">
            FAQs
          </h1>
          <p className="px-10   text-gray-300 ">
            Everything you need to know about the Aarsh ReproHealth platform
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="main-container">
          <div className="container max-md:flex-col  flex">
            <div className="flex flex-col max-md:w-[100%]   md:w-[50%]  lg:w-[40%]">
              <div className="relative inline-block mt-6 md:mt-16 ">
                <p className="text-[#FE76A8] text-[15px] px-10 my-2">Support</p>
                <h1 className=" capitalize text-[24px] lg:text-[35px] w-full sm:max-w-[100%]  md:max-w-[100%] lg:max-[100%] px-10 sm:px-10 md:px-10">
                  Frequently Asked Question
                </h1>
                <Image
                  src={underlineimg.underline}
                  alt="not found"
                  width="100%"
                  height="100%"
                  className="absolute left-1/3 md:left-1/2  bottom-[-2px]  sm:bottom-[-2px] md:bottom-[-7px] lg:bottom-[-5px]  transform -translate-x-1/2 w-[120px] sm:w-[140px] md:w-[350px] lg:w-[300px]"
                />
              </div>
            </div>
            <div className="flex max-md:w-[100%] md:w-[100%] lg:w-[60%]  flex-col">
              <div className=" max-md:w-[100%] mx-auto p-4 md:p-6 ">
                <div className="mb-10">
                  <div className="w-full relative  mt-6 lg:mt-10">
                    {/* ----------- 🟦 Mobile View (One Item) ----------- */}
                    <div className="sm:hidden lg:hidden relative flex items-center justify-center">
                      {/* Previous Button */}
                      <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="absolute left-0 bg-[var(--lightBlue)] text-white p-1 rounded-full"
                      >
                        <FaChevronLeft />
                      </button>

                      {/* Active Card */}
                      <div
                        key={faqtitle[currentIndex].id}
                        className={`group bg-[#F8FAFC] text-[12px] w-full mx-10 flex items-center justify-center flex-col rounded-full border-2 text-gray-400 px-2 py-2 md:px-4 md:py-3 transition duration-300 ease-in-out
        ${
          activeCard === faqtitle[currentIndex].name
            ? "border-[var(--lightBlue)] text-[var(--lightBlue)]"
            : ""
        }`}
                        onClick={() =>
                          handleCardClick(faqtitle[currentIndex].name)
                        }
                      >
                        <button className="font-[400] text-sm">
                          {faqtitle[currentIndex].name}
                        </button>
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={handleNext}
                        disabled={currentIndex === faqtitle.length - 1}
                        className="absolute right-0 bg-[var(--lightBlue)] text-white p-1 rounded-full"
                      >
                        <FaChevronRight />
                      </button>
                    </div>

                    {/* ----------- 🟩 Tablet/Desktop Grid View ----------- */}
                    <div className="hidden lg:grid sm:grid grid-cols-2  lg:grid-cols-3 gap-2">
                      {/* md:grid-cols-1 */}
                      {faqtitle.map((item) => (
                        <div
                          key={item.id}
                          className={`group bg-[#F8FAFC] text-xs  max-lg:text-[12px] flex items-center justify-center flex-col rounded-full border-2 text-gray-400 transform transition duration-300 ease-in-out ${
                            activeCard === item.name
                              ? "border-[var(--lightBlue)] text-[var(--lightBlue)]"
                              : ""
                          }`}
                          onClick={() => handleCardClick(item.name)}
                        >
                          <button
                            className={`text-xs md:text-sm font-[400] px-3 py-3 sm:px-3 sm:py-2 md:px-3 md:py-2 lg:px-3 lg:py-3 ${
                              activeCard === item.name
                                ? "text-[var(--lightBlue)]"
                                : ""
                            }`}
                          >
                            {item.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <div className="w-full relative flex flex-col items-center mt-6">
                   
                  </div> */}
                </div>
                {currentCards.map((faq, index) => (
                  <div
                    key={faq.id}
                    className={`rounded-2xl bg-[#F8FAFC]  ${
                      openIndex === faq.id
                        ? "border-[var(--White)] text-[#FE76A8]"
                        : "mb-3"
                    } `}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className={`w-full flex items-center justify-between p-4 text-left text-sm  md:text-lg`}
                    >
                      <span className="w-[90%]"> {faq.question}</span>
                      {openIndex === faq.id ? (
                        <CiCircleMinus className="text-2xl    font-semibold  " />
                      ) : (
                        <CiCirclePlus className="text-2xl font-semibold" />
                      )}
                    </button>
                    {openIndex === faq.id && <hr />}
                    {openIndex === faq.id && (
                      <div>
                        <div
                          className={` p-4 pb-0  text-start text-gray-700   `}
                        >
                          {faq.answer}
                        </div>
                        <ul className="p-4  list-disc list-inside text-[var(--greyP)] mb-3">
                          {[...Array(6)].map((_, i) => {
                            const key = `answer${i + 1}`;
                            return faq[key] ? (
                              <li key={key}>{faq[key]}</li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-6 gap-2 mb-4">
                {/* Previous Arrow */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`p-3  ${
                    currentPage === 1
                      ? "text-[var(--greyP)] cursor-not-allowed"
                      : "text-[var(--lightBlue)] "
                  }`}
                >
                  <FaArrowLeft />
                </button>
                {/* Page Numbers */}
                {generatePageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && setCurrentPage(page)
                    }
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-full ${
                    currentPage === totalPages
                      ? "text-[var(--greyP)] cursor-not-allowed"
                      : "text-[var(--lightBlue)] hover:bg-gray-200"
                  }`}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralFrequentlyAskedQuestion;
