"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import {
  consulttopdoctorimages,
  underlineimg,
} from "../../../components/element/images";

const data = `We use only the best quality materials on the market in order to provide the best products to our patients.`;
const faqs = [
  {
    id: 1,
    name: "Endometriosis",
    question: "What are the symptoms of endometriosis?",
    answer:
      "Endometriosis symptoms can include pelvic pain, heavy or irregular periods, and pain during sex or urination. Other symptoms include fatigue, bloating, and nausea.",
  },
  {
    id: 2,
    name: "Endometriosis",
    question: "How can one manage endometriosis?",
    answer:
      "Endometriosis is typically managed through a combination of pain medication, like nonsteroidal anti-inflammatory drugs (NSAIDs) like ibuprofen, and hormonal therapies, such as birth control pills or other hormonal medications, depending on the severity of symptoms and whether pregnancy is desired; in some cases, surgery may be necessary to remove endometriosis tissue when medication isn't enough.",
  },
  {
    id: 3,
    name: "Endometriosis",
    question: "Can you get pregnant with endometriosis?",
    answer:
      "Yes, it's possible to get pregnant if you have endometriosis, though it may be more difficult.",
  },
  {
    id: 4,
    name: "Endometriosis",
    question: "What is the treatment for endometriosis?",
    answer:
      "Endometriosis treatments include pain medication, hormone therapy, and surgery. There is no known cure for endometriosis, but treatments can help control symptoms.",
  },
  {
    id: 5,
    name: "Endometriosis",
    question: "What is laparoscopy?",
    answer:
      "Laparoscopy is a minimally invasive surgery where a small camera is inserted through the abdomen to diagnose or treat conditions like endometriosis, cysts, or infertility.",
  },
  {
    id: 6,
    name: "Endometriosis",
    question: "How is endometriosis diagnosed?",
    answer:
      "Endometriosis is diagnosed by a doctor through a physical exam, history, and sometimes a surgical procedure called laparoscopy.",
  },
  {
    id: 7,
    name: "Endometriosis",
    question: "What are the symptoms of endometriosis?",
    answer:
      "Endometriosis symptoms can include pelvic pain, heavy or irregular periods, and pain during sex or urination. Other symptoms include fatigue, bloating, and nausea.",
  },
  {
    id: 8,
    name: "Endometriosis",
    question: "How can one manage endometriosis?",
    answer:
      "Endometriosis is typically managed through a combination of pain medication, like nonsteroidal anti-inflammatory drugs (NSAIDs) like ibuprofen, and hormonal therapies, such as birth control pills or other hormonal medications, depending on the severity of symptoms and whether pregnancy is desired; in some cases, surgery may be necessary to remove endometriosis tissue when medication isn't enough.",
  },
  {
    id: 9,
    name: "Endometriosis",
    question: "Can you get pregnant with endometriosis?",
    answer:
      "Yes, it's possible to get pregnant if you have endometriosis, though it may be more difficult.",
  },
  {
    id: 10,
    name: "Endometriosis",
    question: "What is the treatment for endometriosis?",
    answer:
      "Endometriosis treatments include pain medication, hormone therapy, and surgery. There is no known cure for endometriosis, but treatments can help control symptoms.",
  },
  {
    id: 11,
    name: "Endometriosis",
    question: "What is laparoscopy?",
    answer:
      "Laparoscopy is a minimally invasive surgery where a small camera is inserted through the abdomen to diagnose or treat conditions like endometriosis, cysts, or infertility.",
  },
  {
    id: 12,
    name: "Endometriosis",
    question: "How is endometriosis diagnosed?",
    answer:
      "Endometriosis is diagnosed by a doctor through a physical exam, history, and sometimes a surgical procedure called laparoscopy.",
  },
  {
    id: 13,
    name: "Endometriosis",
    question: "What are the causes of endometriosis?",
    answer:
      "Endometriosis may be caused by retrograde menstruation, genetics, immune system disorders, or environmental factors. The exact cause is still not fully understood.",
  },
  {
    id: 14,
    name: "Endometriosis",
    question: "What are the risks in endometriosis?",
    answer:
      "Risks include chronic pelvic pain, infertility, ovarian cysts, adhesions, heavy bleeding, and an increased chance of developing certain cancers.",
  },
  {
    id: 15,
    name: "Endometriosis",
    question: "Is endometriosis hereditary?",
    answer:
      "Yes, endometriosis can run in families. If a close relative has it, your risk of developing the condition may be higher.",
  },
  {
    id: 16,
    name: "Endometriosis",
    question: "What kind of doctor do you consult for endometriosis?",
    answer:
      "A gynecologist or a reproductive endocrinologist specializes in diagnosing and treating endometriosis.",
  },
  {
    id: 17,
    name: "Endometriosis",
    question: "Who is more inclined to get endometriosis?",
    answer:
      "Women in their reproductive years, especially those with a family history of endometriosis or who have early menstruation or short cycles, are more likely to develop the condition.",
  },
  {
    id: 18,
    name: "Endometriosis",
    question: "Is endometriosis a deadly disease?",
    answer:
      "Endometriosis itself isn’t deadly, but it can cause severe pain, infertility, and complications that affect quality of life. In rare cases, it may be linked to cancer.",
  },
  {
    id: 19,
    name: "Endometriosis",
    question: "What is endometrial tissue?",
    answer:
      "Endometrial tissue lines the uterus and thickens during the menstrual cycle. In endometriosis, this tissue grows outside the uterus, causing pain and complications.",
  },
  {
    id: 20,
    name: "Endometriosis",
    question: "Can endometriosis affect other organs?",
    answer:
      "Yes, in severe cases, endometriosis can spread to organs like the bladder, intestines, and even the lungs, causing a range of complications.",
  },
  {
    id: 21,
    name: "Endometriosis",
    question: "Does diet affect endometriosis?",
    answer:
      "Diet can impact endometriosis symptoms. Anti-inflammatory foods like fruits, vegetables, whole grains, and omega-3s may help, while processed foods and red meat can worsen symptoms.",
  },
  {
    id: 22,
    name: "Endometriosis",
    question: "What is endometrial ablation?",
    answer:
      "Endometrial ablation is a procedure that destroys the lining of the uterus to reduce heavy menstrual bleeding, usually for women who don’t want future pregnancies.",
  },
  {
    id: 23,
    name: "Gynecology",
    question: "When should I seek help for fertility?",
    answer:
      "You should consider seeking help for fertility if you've been trying to conceive for a year without success, or if you're over 35 and have been trying for six months. You should also consider seeking help if you have a known reproductive issue, or if you've had multiple miscarriages.",
  },
  {
    id: 24,
    name: "Gynecology",
    question: "What are some common causes for female and male infertility?",
    answer:
      "Infertility in both men and women can be caused by a number of factors, including age, health, lifestyle, and other conditions.",
  },
  {
    id: 25,
    name: "Gynecology",
    question:
      "What are some fertility treatments for male and female fertility?",
    answer:
      "Fertility treatments for men and women include medications, surgery, and assisted.",
  },
  {
    id: 26,
    name: "Gynecology",
    question: "What is dysmenorrhea?",
    answer:
      "Dysmenorrhea refers to painful menstrual cramps that occur before or during your period. It can range from mild discomfort to severe pain that interferes with daily activities.",
  },
  {
    id: 27,
    name: "Gynecology",
    question: "What is infertility?",
    answer:
      "Infertility is the inability to conceive after one year of regular, unprotected intercourse. It can affect both men and women and may result from various medical conditions.",
  },
  {
    id: 28,
    name: "Gynecology",
    question: "How is infertility diagnosed?",
    answer:
      "Infertility is diagnosed through medical history, physical exams, blood tests, ultrasound, semen analysis (for men), and specialized tests like hysterosalpingography (HSG) or laparoscopy for women.",
  },
  {
    id: 29,
    name: "Gynecology",
    question: "What are treatment options for infertility?",
    answer:
      "Treatments include lifestyle changes, medication, hormone therapy, intrauterine insemination (IUI), in vitro fertilization (IVF), surgery, or assisted reproductive technologies (ART).",
  },
  {
    id: 30,
    name: "Gynecology",
    question: "What is an IUD (Intrauterine Device)?",
    answer:
      "An IUD is a small, T-shaped device placed inside the uterus to prevent pregnancy. It can be hormonal or non-hormonal and provides long-term, reversible contraception.",
  },
  {
    id: 31,
    name: "Gynecology",
    question: "What is IVF?",
    answer:
      "In vitro fertilization (IVF) is a fertility treatment where eggs are retrieved, fertilized with sperm in a lab, and implanted into the uterus to achieve pregnancy.",
  },
  {
    id: 32,
    name: "Gynecology",
    question: "What is IUI?",
    answer:
      "Intrauterine insemination (IUI) is a fertility treatment where sperm is directly placed into the uterus around ovulation to increase the chances of fertilization.",
  },
  {
    id: 33,
    name: "Gynecology",
    question: "What is the endometrium lining?",
    answer:
      "The endometrium is the inner lining of the uterus that thickens during the menstrual cycle in preparation for pregnancy. If no pregnancy occurs, it sheds during menstruation.",
  },
  {
    id: 34,
    name: "Gynecology",
    question: "What is a hysterectomy?",
    answer:
      "A hysterectomy is a surgical procedure to remove the uterus, and sometimes the cervix, ovaries, and fallopian tubes, depending on the condition being treated.",
  },
  {
    id: 35,
    name: "Gynecology",
    question: "What is the reproductive age for men and women?",
    answer:
      "For women, reproductive age typically spans from puberty to menopause (around 12–51 years). Men remain fertile longer, but sperm quality may decline after 40–45 years.",
  },
  {
    id: 36,
    name: "Gynecology",
    question: "What is a menstrual cycle?",
    answer:
      "The menstrual cycle is a monthly series of changes in a woman’s body to prepare for pregnancy. It includes menstruation, the follicular phase, ovulation, and the luteal phase.",
  },
  {
    id: 37,
    name: "Gynecology",
    question: "What is the procedure of hysteroscopy?",
    answer:
      "Hysteroscopy involves inserting a thin, lighted tube through the vagina and cervix to examine or treat issues inside the uterus, like polyps or fibroids.",
  },
  {
    id: 38,
    name: "Gynecology",
    question: "What is a fallopian tube?",
    answer:
      "Fallopian tubes connect the ovaries to the uterus, allowing eggs to travel for potential fertilization. Blocked tubes can cause infertility.",
  },
  {
    id: 39,
    name: "Gynecology",
    question: "What is an ectopic pregnancy",
    answer:
      "An ectopic pregnancy occurs when a fertilized egg implants outside the uterus, usually in the fallopian tube. It’s a serious condition that requires urgent medical attention.",
  },
  {
    id: 40,
    name: "Gynecology",
    question: "What is ovulation?",
    answer:
      "Ovulation is the release of an egg from the ovary, typically occurring around the middle of the menstrual cycle. It’s the most fertile window for conception.",
  },
  {
    id: 41,
    name: "Gynecology",
    question: "What are ovarian cysts?",
    answer:
      "Ovarian cysts are fluid-filled sacs that form on or inside the ovaries. Most are harmless, but some can cause pain, irregular periods, or fertility issues.",
  },
  {
    id: 42,
    name: "Gynecology",
    question: "What causes irregular periods?",
    answer:
      "Irregular periods can be caused by hormonal imbalances, stress, excessive exercise, thyroid issues, PCOS, or underlying medical conditions.",
  },
  {
    id: 43,
    name: "Gynecology",
    question: "What is polycystic ovary syndrome (PCOS)?",
    answer:
      "PCOS is a hormonal disorder causing enlarged ovaries with small cysts, irregular periods, weight gain, and fertility challenges.",
  },
  {
    id: 44,
    name: "Gynecology",
    question: "What is Polycystic Ovary Disease (PCOD)?",
    answer:
      "PCOD is a hormonal disorder where the ovaries produce immature or partially mature eggs, which can turn into cysts. It often leads to irregular periods, weight gain, acne, and excessive hair growth. Lifestyle changes, medication, and hormone therapy can help manage symptoms.",
  },
  {
    id: 45,
    name: "Gynecology",
    question: "Can lifestyle affect fertility?",
    answer:
      "Yes, factors like diet, exercise, smoking, alcohol, stress, and weight can significantly impact fertility in both men and women.",
  },
  {
    id: 46,
    name: "Gynecology",
    question: "What is premature ovarian failure?",
    answer:
      "Premature ovarian failure (or primary ovarian insufficiency) happens when the ovaries stop functioning properly before age 40, leading to infertility and low hormone levels.",
  },
  {
    id: 47,
    name: "Gynecology",
    question: "What are fibroids?",
    answer:
      "Fibroids are non-cancerous growths in the uterus that can cause heavy periods, pain, and fertility issues in some cases.",
  },
  {
    id: 48,
    name: "Gynecology",
    question: "How common is infertility?",
    answer:
      "Infertility affects about 10–15% of couples globally, with male and female factors contributing equally.",
  },
  {
    id: 49,
    name: "Gynecology",
    question: "What is assisted reproductive technology (ART)?",
    answer:
      "ART includes advanced fertility treatments like IVF, ICSI, and embryo freezing that help couples conceive when natural methods fail.",
  },
  {
    id: 50,
    name: "Gynecology",
    question: "What is a miscarriage?",
    answer:
      "A miscarriage is the loss of a pregnancy before 20 weeks. It can happen for many reasons, including genetic abnormalities, hormone imbalances, or structural issues in the uterus.",
  },
  {
    id: 51,
    name: "Gynecology",
    question: "What is a pelvic inflammatory disease (PID)?",
    answer:
      "PID is an infection of the female reproductive organs, often caused by untreated STIs, and can lead to infertility if left untreated.",
  },
  {
    id: 52,
    name: "Andrology",
    question: "What is normal sperm count and methods to improve the count?",
    answer:
      "A normal sperm count ranges from 15 million to 200 million sperm per milliliter of semen. Improving count involves lifestyle changes, diet, supplements, reducing stress, and avoiding smoking or excessive alcohol.",
  },
  {
    id: 53,
    name: "Andrology",
    question: "What is erectile dysfunction (ED) in men?",
    answer:
      "ED is the inability to get or maintain an erection firm enough for sexual intercourse. It can result from physical, hormonal, or psychological factors.",
  },
  {
    id: 54,
    name: "Andrology",
    question: "What tests diagnose low sperm count in men?",
    answer:
      "Tests include semen analysis, hormone testing, scrotal ultrasound, genetic tests, and specialized sperm function tests.",
  },
  {
    id: 55,
    name: "Andrology",
    question: "What are treatment options for erectile dysfunction?",
    answer:
      "Treatment options include medication (like Viagra), hormone therapy, lifestyle changes, counseling, penile implants, or vacuum erection devices.",
  },
  {
    id: 56,
    name: "Andrology",
    question: "What is andrology?",
    answer:
      "Andrology is a medical specialty focusing on male reproductive health and urological issues, including fertility, ED, and hormone disorders.",
  },
  {
    id: 57,
    name: "Andrology",
    question: "When should you consult an andrologist?",
    answer:
      "Consult an andrologist if you experience infertility, low libido, erectile dysfunction, low testosterone, testicular pain, or abnormal semen analysis results.",
  },
  {
    id: 58,
    name: "Andrology",
    question: "What is sperm motility?",
    answer:
      "Sperm motility refers to the ability of sperm to swim properly. Low motility can make it harder for sperm to reach and fertilize an egg.",
  },
  {
    id: 59,
    name: "Andrology",
    question: "What causes low testosterone?",
    answer:
      "Low testosterone can be caused by aging, chronic illness, obesity, testicular injury, or certain medications.",
  },
  {
    id: 60,
    name: "Andrology",
    question: "Can lifestyle changes improve male fertility?",
    answer:
      "Yes! A healthy diet, regular exercise, stress reduction, quitting smoking, and limiting alcohol can all boost sperm health and fertility.",
  },
  {
    id: 61,
    name: "Andrology",
    question: "What is premature ejaculation?",
    answer:
      "Premature ejaculation (PE) is when a man ejaculates sooner than desired during sexual activity, often within a minute of penetration, with little control. It’s a common condition that can cause distress or affect relationships, but it’s treatable through therapy, medication, or behavioral techniques.",
  },
  {
    id: 62,
    name: "Andrology",
    question: "How can we cure premature ejaculation?",
    answer:
      "Premature ejaculation (PE) can be managed through techniques like the start-stop method, pelvic floor exercises, and counseling for stress or anxiety. Medications (like SSRIs or topical creams) and healthy lifestyle changes can also improve control. Treatment depends on the cause, and combining methods often gives the best results.",
  },
  {
    id: 63,
    name: "Urology",
    question: "What is a UTI?",
    answer:
      "A urinary tract infection (UTI) is a bacterial infection that affects any part of the urinary system, including the bladder, kidneys, ureters, and urethra.",
  },
  {
    id: 64,
    name: "Urology",
    question: "What is the prostate?",
    answer:
      "The prostate is a small gland in men that produces seminal fluid, which nourishes and transports sperm.",
  },
];
const faqtitle = [
  {
    id: 1,
    name: "Endometriosis",
    img: consulttopdoctorimages[0].icon,
    img: consulttopdoctorimages[0].iconhover,
  },
  {
    id: 2,
    name: "Gynecology",
    img: consulttopdoctorimages[1].icon,
    img: consulttopdoctorimages[1].iconhover,
  },
  {
    id: 3,
    name: "Andrology",
    img: consulttopdoctorimages[2].icon,
    img: consulttopdoctorimages[2].iconhover,
  },
  {
    id: 4,
    name: "Urology",
    img: consulttopdoctorimages[3].icon,
    img: consulttopdoctorimages[3].iconhover,
  },
];

const FrequeentlyAskQuestion = () => {
  const [activeCard, setActiveCard] = useState("Endometriosis");
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [filteredCards, setFilteredCards] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerPage(6); // Large screens
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

  // Calculate current cards to display
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const handleCardClick = (title) => {
    setActiveCard(title === activeCard ? null : title); // Toggle active state
  };
  // console.log("activeCard:", activeCard)
  // Generate page numbers with ellipsis logic
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

  return (
    <>
      {/* <div className="w-[100%] h-[40vh] bg-cover bg-[url(/assets/images/faq/faq-banner-img.png)]  ">
        <div className="flex h-[100%] justify-center flex-col">
          <p className="text-[#FE76A8] text-[15px] px-10 ">The FAQs</p>
          <h1 className="capitalize text-[40px]  sm:max-w-[100%]  md:max-w-[100%] lg:max-[100%] px-10 sm:px-10 md:px-10">
            Help Center
          </h1>
          <p className="px-10 text-[var(--greyP)] ">
            Everything you need to know about Aarsh Repro Health platform
          </p>
        </div>
      </div> */}
      <div className="w-full">
        {/* <div className="main-container">
          <div className="container max-md:flex-col  flex"> */}
        {/* <div className="flex flex-col max-md:w-[100%]  w-[40%]  ">
              <div className="relative inline-block mt-16 ">
                <p className="text-[#FE76A8] text-[15px] px-10 my-2">Support</p>
                <h1 className=" capitalize text-[35px] w-full sm:max-w-[100%]  md:max-w-[100%] lg:max-[100%] px-10 sm:px-10 md:px-10">
                  Frequently Asked Question
                </h1>

                <Image
                  src={underlineimg.underline}
                  alt="not found"
                  width="100%"
                  height="100%"
                  className="absolute  left-1/2  bottom-[-2px]  sm:bottom-[-2px] md:bottom-[-7px] lg:bottom-[-5px]  transform -translate-x-1/2 w-[120px] sm:w-[140px] md:w-[350px] lg:w-[300px]"
                />
              </div>
            </div> */}
        <div className="flex max-md:w-[100%] w-[100%] flex-col">
          <div className=" max-md:w-[100%] ">
            {/*  mx-auto p-6 */}
            <div className="mb-10">
              <div className="w-full md:w-[50%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4   gap-4 mt-10">
                {faqtitle.map((item, index) => (
                  <div
                    key={item.id}
                    className={`  group bg-[#F8FAFC] max-lg:text-[12px]  flex items-center justify-center flex-col rounded-full border-2  text-gray-400  transform transition duration-300 ease-in-out    
                     ${
                       activeCard === item.name
                         ? "bg-[#F8FAFC] border-[var(--lightBlue)]  text-[var(--lightBlue)]"
                         : ""
                     }`}
                    onClick={() => handleCardClick(item.name)}
                  >
                    <button
                      className={`text-md font-[400] px-8 py-2 ${
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
            <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-4 [grid-auto-rows:min-content]">
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
                    className={`w-full flex items-center justify-between p-4 text-left  text-lg `}
                  >
                    <span className=" w-[90%]"> {faq.question}</span>
                    {openIndex === faq.id ? (
                      <CiCircleMinus className="text-2xl    font-semibold " />
                    ) : (
                      <CiCirclePlus className="text-2xl font-semibold" />
                    )}
                  </button>
                  {openIndex === faq.id && <hr />}
                  {openIndex === faq.id && (
                    <div className={` p-4  text-start text-gray-700 mb-3  `}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 gap-2 mb-4">
            {/* Previous Arrow */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
        {/* </div>
        </div> */}
      </div>
    </>
  );
};

export default FrequeentlyAskQuestion;
