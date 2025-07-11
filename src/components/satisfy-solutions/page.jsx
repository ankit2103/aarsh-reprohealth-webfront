"use client";
import icon3 from "../../../public/assets/images/drconsultant/dildo-3.png";
import { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import Slider from "react-slick";
import Image from "next/image";
import { clienttestimonialimages } from "../element/images";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Head from "next/head";


const data = [
  {
    id: 1,
    name: "Endometriosis Management",
    des:
      "Endometriosis management involves a combination of medical treatments, such as pain relief medications...",
    fullDes:
      "Endometriosis management involves a combination of medical treatments, such as pain relief medications and hormone therapy, alongside surgical options like laparoscopy to remove endometrial tissue. The goal is to reduce symptoms, improve fertility, and enhance quality of life for those affected.",
    color: "yellow",
  },
  {
    id: 2,
    name: "Polycystic Ovary Syndrome (PCOS)",
    des:
      "PCOS is a common hormonal disorder that affects women , leading to irregular menstrual cycles, excess...",
    fullDes:
      "Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder that affects women, leading to irregular menstrual cycles, excess androgen levels, and cysts on the ovaries. It can cause infertility, weight gain, and other metabolic issues, but can be managed with lifestyle changes medications and Health diet.",
    color: "grey",
  },
  {
    id: 3,
    name: "Infertility Consultations",
    des:
      "Infertility consultations involve a comprehensive evaluation of both partners to diagnose underlying causes of infertility,...",
    fullDes:
      "Infertility consultations involve a comprehensive evaluation of both partners to diagnose underlying causes of infertility, using tests like hormone assessments and imaging. Treatment options range from lifestyle changes and medications to assisted reproductive technologies like IVF, tailored to individual needs.",
    color: "green",
  },
  {
    id: 4,

    name: "Menstrual Disorder Issues",
    des:
      "Menstrual disorder issues include heavy bleeding, irregular cycles, or painful periods, often caused by hormonal...",
    fullDes:
      "Menstrual disorder issues encompass a range of conditions such as heavy bleeding, irregular cycles, or painful periods, often caused by hormonal imbalances, fibroids, or endometriosis. Treatment typically involves medication, lifestyle adjustments, or procedures and healthy diet to restore normal menstrual health.",
    color: "grey",
  },
  {
    id: 5,
    name: "Erectile Dysfunction (ED) Treatment",
    des:
      "Erectile Dysfunction (ED) treatment aims to improve sexual function through medications like PDE5 inhibitors...",
    fullDes:
      "Erectile Dysfunction (ED) treatment aims to improve sexual function through medications like PDE5 inhibitors, lifestyle changes, and addressing underlying health conditions.Effective treatments include oral medications like Viagra and Cialis.Lifestyle changes such as quitting smoking and exercising regularly can improve symptoms.",
    color: "yellow",
  },
  {
    id: 6,
    name: "Maternity Care",
    des:
      "Maternity care involves medical services and support provided to women during pregnancy, and the postpartum period...",
    fullDes:
      "Maternity care involves medical services and support provided to women during pregnancy, and the postpartum period, ensuring the health and well-being of both mother and baby. It includes prenatal checkups, and postpartum recovery care. Postnatal care helps mothers recover and adjust to newborn care confidently.",
    color: "green",
  },
  {
    id: 6,
    name: "Mental Health Issue",
    des: "",
    fullDes:
      "Mental health is a crucial part of overall well-being, yet it is often overlooked. Depression, one of the most common mental health disorders, affects how a person feels, thinks, and handles daily activities. It can cause persistent sadness, loss of interest, and fatigue. Seeking help early through therapy, support systems, or medication can make a significant difference.",
    color: "yellow",
  },
  {
    id: 7,
    name: "Prostate Health Issue",
    des: "",
    fullDes:
      "Prostate management involves regular check-ups, especially for men over 50, to monitor prostate health and detect issues early. Common concerns include benign prostatic hyperplasia (BPH) and prostate cancer. A healthy lifestyle, routine screenings like PSA tests, and early intervention play key roles in effective management. Always consult a healthcare provider for personalized advice.",
    color: "green",
  },
];
const CustomNext = ({ onClick }) => (
  <div
    className="bg-[var(--White)] p-1 sm:p-2 rounded-full  md:block absolute top-[40%] sm:top-1/2 right-[0%] sm:right-[-1%]  md:right-[-4%] lg:right-[-4%] cursor-pointer z-40 "
    // right-[30%] sm:right-[42%]
    onClick={onClick}
  >
    <FaChevronRight className="text-[var(--listText)] text-lg" />
  </div>
);

const CustomPrev = ({ onClick }) => (
  <div
    className="bg-[var(--White)] p-1 sm:p-2 rounded-full   md:block  absolute top-[40%] sm:top-1/2  left-[0%] sm:left-[-1%]   md:left-[-4%] lg:left-[-4%] cursor-pointer z-40 "
    // left-[30%] sm:left-[42%] md:left-[45%] lg:left-[-4%]
    onClick={onClick}
  >
    <FaChevronLeft className="text-[var(--listText)] text-lg " />
  </div>
);

const SatisfySolution = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3, // show 3 cards per slide
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // for tablets
        settings: {
          slidesToShow: 2,
          dots: false,
        },
      },
      {
        breakpoint: 768, // for mobile
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
    prevArrow: <CustomPrev />,
    nextArrow: <CustomNext />,
  };

  const handleCardClick = (index) => {
    setActiveCard(index === activeCard ? null : index); // Toggle active state
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Symptom-Based Health Consultations | Aarsh ReproHealth</title>
        <meta
          name="description"
          content="Find doctors for specific symptoms like PCOS, ED, fertility issues, or menstrual disorders. Book personalized consultations with Aarsh ReproHealth."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Consult Specialists by Health Symptoms" />
        <meta
          property="og:description"
          content="Browse and book consultations by common symptoms such as PCOS, endometriosis, fertility issues, and more. Trusted medical support at Aarsh ReproHealth."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aarshreprohealth.com/consult-by-symptoms" />
        <meta property="og:image" content="https://www.aarshreprohealth.com/assets/images/symptom-banner.jpg" />
        <link rel="canonical" href="https://www.aarshreprohealth.com/consult-by-symptoms" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Symptom-Based Consultation | Aarsh ReproHealth",
              "description": "Explore reproductive health concerns such as PCOS, ED, infertility, and more. Book consultations with specialists based on your symptoms.",
              "url": "https://www.aarshreprohealth.com/consult-by-symptoms",
              "publisher": {
                "@type": "Organization",
                "name": "Aarsh ReproHealth",
                "url": "https://www.aarshreprohealth.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.aarshreprohealth.com/assets/images/logo.png"
                }
              }
            })
          }}
        />
      </Head>
      <div className="w-full">
        <div className="main-container">
          <div className="container px-2">
            <h2 className="heading capitalize text-center pt-10">
              Consultation by health symptoms
            </h2>
            <p className=" text-[var(--greyP)] text-center mt-2">
              Select the health symptom to find relevant doctors
            </p>
            <div className="pt-10 pb-10 relative ">
              <Slider {...settings}>
                {data.map((item) => (
                  <div key={item.id} className="px-2">
                    {" "}
                    {/* spacing between cards */}
                    <div
                      className={`min-h-[250px] max-h-[300px] md:min-h-[250px] md:max-h-[300px] lg:min-h-[250px] lg:max-h-[350px] p-6 rounded-[20px] transform transition duration-300 ease-in-out hover:bg-white-500 
                                  ${item.color === "yellow"
                          ? "bg-[#FEF0C3]"
                          : ""
                        }
                                  ${item.color === "green" ? "bg-[#DFF7EA]" : ""
                        }
                                  ${item.color === "grey" ? "bg-[#FEE6DC]" : ""}
                                  w-full`}
                    >
                      <h3 className="fontsizexl font-[300]">{item.name}</h3>
                      <p className="mt-4 text-[var(--greyP)] w-full">
                        {item.fullDes}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default SatisfySolution;

{
  /* <button
                      onClick={() => handleCardClick(index)}
                      className="bg-white  mt-4 text-md lg:text-md px-4 py-2 rounded-full flex justify-center items-center gap-2"
                    >
                      {activeCard === index ? "Read Less" : "Read More"}
                      <span>
                        <GoArrowUpRight />
                      </span>
                    </button> */
}
