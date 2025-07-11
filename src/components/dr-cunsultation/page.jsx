"use client";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { consulttopdoctorimages } from "../element/images";
import { fetchConsultTopDoctor } from "../../utils/home/home.util";
import { useRouter } from "next/navigation";
import Head from "next/head";

const data = [
  {
    id: 1,
    img: consulttopdoctorimages[0].icon,
    imghover: consulttopdoctorimages[0].iconhover,
    name: "Endometriosis",
    des:
      "Consult top doctors online with specific speciality. Endometriosis is a chronic condition where tissue like the uterine lining grows outside the uterus, often causing pain.",
    // "Endometriosis is a chronic condition where tissue similar to the lining of the uterus grows outside it, causing pain, irregular bleeding, & potential fertility issues.It commonly affects the ovaries, fallopian tubes, and pelvic tissue.",
    //  It commonly affects the ovaries, fallopian tubes, and pelvic tissue.
  },
  {
    id: 2,
    img: consulttopdoctorimages[1].icon,
    imghover: consulttopdoctorimages[1].iconhover,
    name: "Gynecology & Obstetrics",
    des:
      "Gynecology focuses on female reproductive health, addressing issues related to the uterus, ovaries, and overall well-being",
    // "Gynecology focuses on the health of the female reproductive system, diagnosing and treating disorders related to the uterus, and ovaries.Obstetrics involves the care of pregnant women, including prenatal.",
    // Obstetrics involves the care of pregnant women, including prenatal, labor, and postnatal care, ensuring the health of both mother and baby.
  },
  {
    id: 3,
    img: consulttopdoctorimages[2].icon, //icon3
    imghover: consulttopdoctorimages[2].iconhover,
    name: "Andrology",
    des:
      "Andrology focuses on male reproductive health, addressing conditions like infertility and erectile dysfunction.",
    // "Andrology is the branch of medicine that focuses on male reproductive health, including conditions related to the male genital and urinary systems. It also deals with issues such as infertility, erectile dysfunction.",
    //  It also deals with issues such as infertility, erectile dysfunction, and hormone imbalances in men.
  },
  {
    id: 4,
    img: consulttopdoctorimages[3].icon,
    imghover: consulttopdoctorimages[3].iconhover,
    name: "Urology",
    des:
      "Urology deals with urinary tract and male reproductive issues, including conditions like kidney stones and related treatments.",
    // "Urology is a medical specialty that focuses on the diagnosis, treatment, and prevention of diseases related to the urinary tract and male reproductive system.It involves both surgical and non-surgical procedures to address conditions like kidney stones",
    // It involves both surgical and non-surgical procedures to address conditions like kidney stones, urinary infections, and prostate issues.
  },
  {
    id: 5,
    img: consulttopdoctorimages[5].icon,
    imghover: consulttopdoctorimages[5].iconhover,
    name: "Endocrinology",
    des:
      "Endocrinology focuses on hormone-related disorders like diabetes and thyroid issues, helping maintain overall health through hormone balance.",
    // "Endocrinology specializes in the diagnosis and treatment of hormone-related disorders. It addresses conditions such as diabetes, thyroid problems, and metabolic issues. By balancing hormones, endocrinologists help improve overall health and well-being.",
  },
  {
    id: 6,
    img: consulttopdoctorimages[4].icon,
    imghover: consulttopdoctorimages[4].iconhover,
    name: "Psychiatry & Counsellors",
    des:
      "Psychiatry and counseling support mental health by diagnosing disorders and offering therapy, medication, and emotional guidance.",
    // "Psychiatry and counseling are vital in supporting mental health and well-being. Psychiatrists diagnose and treat mental health disorders with a medical approach, often using therapy or medication. Counselors offer a safe space for individuals to explore emotions and develop coping strategies.",
  },
];

const Consultation = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleCardClick = (index) => {
    setActiveCard(index === activeCard ? null : index); // Toggle active state
  };
  const handleNavigate = (specialization) => {
    event.preventDefault();
    console.log("id-----------------", specialization);
    router.push(`/medical-specialist?specialization=${encodeURIComponent(specialization)}`);
  };
  useEffect(() => {
    setLoading(true);
    const getDoctors = async () => {
      try {
        const result = await fetchConsultTopDoctor();
        if (result?.code === 200) {
          setLoading(false);
          setGetData(result?.data || []);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    getDoctors();
  }, []);


  return (
    <>
      <Head>
        <title>Consult Top Doctors Online | Aarsh Reprohealth</title>
        <meta
          name="description"
          content="Private online consultations with top specialists in Endometriosis, Gynecology, Andrology, and more at Aarsh Reprohealth."
        />
        <link rel="canonical" href="https://www.aarshreprohealth.com/consultation" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Consult Top Doctors | Aarsh Reprohealth" />
        <meta
          property="og:description"
          content="Book online consultations with verified doctors in gynecology, urology, endocrinology, and more."
        />
        <meta property="og:url" content="https://www.aarshreprohealth.com/consultation" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.aarshreprohealth.com/assets/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Consult Top Doctors | Aarsh Reprohealth" />
        <meta
          name="twitter:description"
          content="Talk to expert doctors online. Specialties include fertility, gynecology, and more."
        />
        <meta name="twitter:image" content="https://www.aarshreprohealth.com/assets/twitter-image.jpg" />

                {/* JSON-LD Structured Data */}
                <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Consultation | Aarsh Reprohealth",
              "url": "https://www.aarshreprohealth.com/consultation",
              "email": "mailto:support@aarshreprohealth.com",
              "telephone": "+91 9740522300",
              "mainEntity": {
                "@type": "MedicalSpecialty",
                "name": [
                  "Gynecology",
                  "Endometriosis",
                  "Andrology",
                  "Urology",
                  "Endocrinology",
                  "Psychiatry"
                ],
              },
              "publisher": {
                "@type": "Organization",
                "name": "Aarsh Reprohealth",
                "url": "https://www.aarshreprohealth.com"
              }
            }),
          }}
        />
      </Head>
      <div className="w-full ">
        <div className="main-container">
          <div className="container">
            {loading ? (
              <>
                <div>
                  <h2 className="heading capitalize ">
                    Consult top doctors online with specific speciality.
                  </h2>
                  <p className=" text-[var(--greyP)] ">
                    {/* text-sm md:text-xl lg:text-xl xl:text-xl */}
                    Private online consultations with verified doctors in all
                    specialists
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-10">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-[#F8FAFC] p-4 rounded-[20px] border border-gray-200"
                    >
                      <div className="rounded-full p-4 bg-gray-200 w-fit mb-4">
                        <div className="w-7 h-7 bg-gray-300 rounded-full" />
                      </div>

                      <div className="h-5 bg-gray-300 rounded w-1/2 mb-2" />
                      <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-300 rounded w-5/6 mb-4" />

                      <div className="flex items-center gap-2">
                        <div className="h-4 bg-gray-300 rounded w-1/3" />
                        <div className="h-4 w-4 bg-gray-300 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="heading capitalize ">
                    Consult top doctors online with specific speciality.
                  </h2>
                  <p className=" text-[var(--greyP)] ">
                    Private online consultations with verified doctors in all
                    specialists
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-10">
                  {data.map((item, index) => (
                    <div
                      key={item.id}
                      className={`relative group bg-[#F8FAFC] rounded-[20px] p-4 pt-4 pb-[60px] min-h-[250px] max-h-[280px] flex flex-col transform transition duration-300 ease-in-out hover:bg-[var(--lightBlue)] 
                      ${activeCard === item.id
                          ? "bg-[var(--lightBlue)] text-[var(--White)]"
                          : ""
                        }`}
                      onClick={() => handleCardClick(item.id)}
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Top Content */}
                      <div>
                        <div className="rounded-full p-2 bg-[#FE76A826] w-fit 2xl:max-w-[300px]">
                          <Image
                            src={
                              hoveredCard === item.id || activeCard === item.id
                                ? item.imghover
                                : item.img
                            }
                            alt="image"
                            width={60}
                            height={60}
                            className="w-8 h-8"
                          />
                        </div>
                        <h3
                          className={`fontsizexl font-[300] mt-4 group-hover:text-[var(--White)] ${activeCard === item.id ? "text-[var(--White)]" : ""
                            }`}
                        >
                          {item.name}
                        </h3>
                        <p
                          className={`mt-2 group-hover:text-[var(--White)] ${activeCard === item.id
                            ? "text-[var(--White)]"
                            : "text-[var(--greyP)]"
                            }`}
                        >
                          {item.des}
                        </p>
                      </div>

                      {/* Fixed Bottom Button */}
                      <div className="absolute bottom-[30px] left-4 right-4">
                        <button
                          onClick={() => handleNavigate(item.name)}
                          className={`fontsizebase bg-transparent flex items-center gap-2 group-hover:text-[var(--White)] ${activeCard === item.id
                            ? "text-[var(--White)]"
                            : "text-[var(--darkGrey)]"
                            }`}
                        >
                          Book Consultation{" "}
                          <span>
                            <FaArrowRightLong className="text-md" />
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>

  );
};
export default Consultation;
