"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  meetspecialdoctorimages,
  underlineimg,
} from "../../../components/element/images";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import Head from "next/head";

const drList = [
  {
    drImg: meetspecialdoctorimages.img1,
    name: "Preetam Petkar",
    speciality: "CEO & Founder",
    project: "Aarsh ReproHealth",
    company: "A unit of EndoDaylights India Pvt. Ltd.",
    about:
      "I am the Founder of Aarsh ReproHealth, bringing over 30 years of expertise in leadership, business development, strategic planning, and customer engagement across industries such as e-commerce, consulting, process improvement, data management, and finance.  I have held leadership positions in organizations like",
    viewMore:
      " Shopmatic, Just Dial Ltd., ActiveOps and Writer Corporation. Inspired by transformative life experiences with my wife, Sheila, I established Aarsh ReproHealth to raise awareness of endometriosis—a condition that many women may have but are unaware of—and to support, guide, and treat reproductive and fertility challenges in all individuals. Our mission includes breaking the taboos surrounding both male and female fertility issues.",
    // "Founder of Aarsh ReproHealth with 30+ years of expertise in leadership, business development, and strategic growth across industries. Inspired by his wife Sheila's journey with endometriosis, he launched the platform to raise awareness and provide reproductive health solutions for all.",
  },
  {
    drImg: meetspecialdoctorimages.img2,
    name: "Sheila Petkar",
    speciality: "Co-Founder & Brand Ambassador",
    project: "Aarsh ReproHealth",
    company: "A unit of EndoDaylights India Pvt. Ltd.",
    about:
      "I am the Co-founder and face of Aarsh ReproHealth. With a Commerce degree, my career encompasses roles in acquisition, customer support, and service within the IT and banking industries. Until 2005, I held senior positions at organizations such as American Express and National Instruments.",
    viewMore:
      "My personal journey, particularly the challenges faced with endometriosis—a condition affecting many women who may be unaware of it—has been a significant inspiration behind the vision and mission of Aarsh ReproHealth.",
    // "Co-founder of Aarsh ReproHealth, Sheila draws from personal experience with endometriosis to inspire and represent the brand’s mission. With a background in IT and banking, she is the empathetic face of the initiative.",
  },
  {
    drImg: meetspecialdoctorimages.img3,
    name: "Naveen R",
    speciality: "Technical Advisor & Expert",
    project: "Aarsh ReproHealth",
    company: "A unit of EndoDaylights India Pvt. Ltd.",
    about:
      "With over 28 years of experience across various domains, including more than 15 years in the IT sector, I have successfully led projects for esteemed companies such as Canara HSBC, DMI Finance, and Airtel. Having retired from the corporate world as a Project Manager, I bring a wealth of expertise ",
    viewMore:
      "in managing projects from inception to completion with precision and efficiency. My strategic mindset, attention to detail, and commitment to seamless collaboration ensure clear communication and successful project execution. As a strong leader, I foster teamwork, innovation, and accountability, empowering teams to achieve their goals while maintaining high-quality standards. Passionate about problem-solving and process optimization, I am dedicated to driving results and cultivating a positive, productive work environment. I have primarily worked in the healthcare domain, gaining experience in developing applications for hospitals like Sri Sathya Sai Hospital in Puttaparthi. This passion for healthcare technology led me to Aarsh ReproHealth, where I was eager to contribute to its mission and vision.",
    // "Naveen brings 28+ years of project management and tech experience. Having developed hospital apps and worked with top healthcare clients, his focus is using tech to support Aarsh’s mission.",
  },
  {
    drImg: meetspecialdoctorimages.img5,
    name: "Shenaz Bapooji",
    speciality: "Strategic Marketing Advisor",
    project: "Aarsh ReproHealth",
    company: "A unit of EndoDaylights India Pvt. Ltd.",
    about:
      "A veteran marketing and brand strategist with over 30 years of experience across advertising, digital commerce, and startups, she advises founders, leadership teams, and VCs on brand growth, customer demand, and go-to-market strategy. As a mentor and board advisor, she brings clarity, empathy, and sharp",
    viewMore:
      " execution to every engagement. Shenaz Bapooji is a brand strategist, founder, and marketing advisor who believes that when purpose and clarity meet, powerful brands are born. With over three decades of experience across global agencies like Ogilvy and as CMO of high-growth startups like Shopmatic, Shenaz has helped launch and scale brands that make a real difference. Through her firm, Skyful, she now partners with founders, growth brands and startups to craft go-to-market strategies rooted in empathy, sharp storytelling, and business alignment. She also serves as a mentor with Startup India’s MAARG initiative. As an Independent Director and strategic advisor, she brings clarity, empathy, and executional sharpness to the boardroom.",
    viewMoreNext:
      "At Aarsh, Shenaz brings her heart, mind, and marketing expertise to a space that urgently needs both compassion and clarity.  As an advisory partner, she’s working closely with the founding team to shape Aarsh into a brand that puts people first, breaks stigma, and builds lasting trust with those it serves. Her belief: when you put the patient at the center, everything else follows.",
  },
  {
    drImg: meetspecialdoctorimages.img6,
    name: "Pranava Peri",
    speciality: "Analytics & Strategy Advisor",
    project: "Aarsh ReproHealth",
    company: "A unit of EndoDaylights India Pvt. Ltd.",
    about:
      "Pranava leads Analytics & Strategy at Aarsh ReproHealth, combining 8+ years of fintech and e-commerce experience with a calm, data-driven and empathetic approach to create impactful user experiences in reproductive health. With over eight years of experience at the intersection of e-commerce, fintech,",
    viewMore:
      " and data strategy, Pranava brings a unique blend of analytical depth and human-centered thinking to Aarsh ReproHealth. As a key contributor to analytics and strategic planning, he helps refine patient journeys, develop intelligent dashboards, and ensure that every insight translates into meaningful impact in reproductive health. Previously a core team member at Shopmatic, where he built customer success and analytics frameworks across India and Southeast Asia, and currently serving as Senior Manager at MatchMove, Pranava’s work reflects his deep commitment to creating systems that empower individuals. His work with Aarsh reflects his commitment to equity, clarity, and breaking down taboos around fertility and reproductive challenges.",
  },
];

const CustomPrev = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-2 sm:-left-2  md:-left-2 lg:-left-2 z-10 bg-[var(--lightBlue)] shadow-md rounded-full p-1 md:p-2 ml-0  top-1/2 -translate-y-1/2" //md:-ml-8
    aria-label="Previous Slide"
  >
    <FaChevronLeft className="text-[var(--White)] text-sm md:text-lg" />
  </button>
);

const CustomNext = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-2 sm:-right-2 md:-right-2 lg:-right-2 z-10 bg-[var(--lightBlue)] shadow-md rounded-full p-1 md:p-2 top-1/2 -translate-y-1/2"
    // className="absolute right-2 z-10 bg-[var(--lightBlue)] shadow-md rounded-full p-1 md:p-2 mr-0 md:-mr-8 top-1/2 -translate-y-1/2"
    aria-label="Next Slide"
  >
    <FaChevronRight className="text-[var(--White)] text-sm md:text-lg" />
  </button>
);

const MeetOurSpecialists = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const settings = {
    centerMode: false,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300000,
    arrows: true,
    prevArrow: <CustomPrev />,
    nextArrow: <CustomNext />,
    responsive: [
      {
        breakpoint: 996,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Meet Our Specialists | Aarsh ReproHealth Team</title>
        <meta
          name="description"
          content="Get to know the experts behind Aarsh ReproHealth – founders, advisors, and specialists dedicated to endometriosis and reproductive health awareness."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.aarshreprohealth.com/our-team" />

        <meta property="og:title" content="Meet Our Specialists - Aarsh ReproHealth" />
        <meta
          property="og:description"
          content="Explore the leadership team and advisors at Aarsh ReproHealth who are committed to breaking the stigma around reproductive health and fertility."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aarshreprohealth.com/our-team" />
        <meta
          property="og:image"
          content="https://www.aarshreprohealth.com/assets/images/team-og.jpg"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aarsh ReproHealth",
              "url": "https://www.aarshreprohealth.com",
              "employee": drList.map((dr) => ({
                "@type": "Person",
                "name": dr.name,
                "jobTitle": dr.speciality,
                "worksFor": {
                  "@type": "Organization",
                  "name": "Aarsh ReproHealth"
                },
                "description": dr.about,
              })),
            }),
          }}
        />
      </Head>
      <section className="w-full bg-white pt-20 ">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#1f1f1f]">
              Meet Our Team
            </h2>
            <div className="mt-2 flex justify-center">
              <Image
                src={underlineimg.underline}
                alt="underline"
                width={150}
                height={30}
                className="w-[120px] md:w-[150px]"
              />
            </div>
          </div>

          <div className="w-full relative mt-10 ">
            <Slider {...settings}>
              {Array.isArray(drList) &&
                drList?.length > 0 &&
                drList.map((dr, index) => (
                  <div key={index} className="px-2 ">
                    <div className="lg:min-h-[550px]  bg-[#f9fafb] rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-6  flex flex-col items-center text-center">
                      <div className="w-full flex items-center justify-center">
                        <Image
                          src={dr?.drImg}
                          alt={`Photo of ${dr?.name}, ${dr?.speciality} at Aarsh ReproHealth`}
                          width={160}
                          height={160}
                          className="rounded-full object-cover mb-4 w-[160px] h-[160px] border-4 border-[#E0F6E3]"
                        />
                      </div>

                      <h3 className="text-xl font-semibold text-[#1f1f1f]">
                        {dr?.name}
                      </h3>
                      <p className="text-sm text-[#666] font-medium mt-1">
                        {dr?.speciality}
                      </p>
                      <p className="text-sm text-[#888] mt-1">{dr?.project}</p>
                      <p className="text-sm text-[#aaa] mb-3">{dr?.company}</p>
                      <p className="text-[15px] text-[#444] leading-relaxed">
                        {dr?.about}
                      </p>
                      {expandedIndex === index && (
                        <>
                          {dr?.viewMore && (
                            <p className="mt-2 text-gray-700">{dr?.viewMore}</p>
                          )}
                          {dr?.viewMoreNext && (
                            <p className="mt-2 text-gray-700">
                              {dr?.viewMoreNext}
                            </p>
                          )}
                        </>
                      )}

                      {(dr?.viewMore || dr?.viewMoreNext) && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="mb-2 text-[var(--lightBlue)] hover:underline text-sm cursor-pointer"
                        >
                          {expandedIndex === index ? "View Less" : "View More"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
          {/* Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        </div> */}
        </div>
      </section>
    </>

  );
};

export default MeetOurSpecialists;
