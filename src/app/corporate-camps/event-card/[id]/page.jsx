"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { corporateeventimg } from "../../../../components/element/images";
import { FaArrowRightLong } from "react-icons/fa6";
import HealthAdvice from "../../../../components/health-advice/page";

// Sample Event Data (replace this with an API call later)
const data = [
  {
    id: 1,
    image: corporateeventimg.img1,
    name: "Diet Tips for a Healthier Lifestyle",
    tip: "Diet Tips",
    date: "28 April 2025",
    desc: "Healthy diet tips.",
    detail:
      "Maintaining a healthy diet is crucial for overall well-being and can prevent numerous health issues.",
  },
  {
    id: 2,
    image: corporateeventimg.img2,
    name: "Boosting Your Immune System Natu",
    tip: "Health Tips",
    date: "24 April 2025",
    desc: "How to boost immunity naturally.",
    detail:
      "A strong immune system is vital for fighting off infections and staying healthy. This article pro.",
  },
  {
    id: 3,
    image: corporateeventimg.img3,
    name: "The Importance of Regular Health...",
    tip: "Health Tips",
    date: "28 April 2025",
    desc: "Importance of regular health checkups.",
    detail:
      "Regular health screenings are essential for early detection and prevention of various health condition.",
  },
  {
    id: 4,
    image: corporateeventimg.img1,
    name: "Diet Tips for a Healthier Lifestyle",
    tip: "Diet Tips",
    date: "28 April 2025",
    desc: "Healthy diet tips.",
    detail:
      "Maintaining a healthy diet is crucial for overall well-being and can prevent numerous health issues.",
  },
  {
    id: 5,
    image: corporateeventimg.img2,
    name: "Boosting Your Immune System Natu",
    tip: "Health Tips",
    date: "24 April 2025",
    desc: "How to boost immunity naturally.",
    detail:
      "A strong immune system is vital for fighting off infections and staying healthy. This article pro.",
  },
  {
    id: 6,
    image: corporateeventimg.img3,
    name: "The Importance of Regular Health...",
    tip: "Health Tips",
    date: "28 April 2025",
    desc: "Importance of regular health checkups.",

    detail:
      "Regular health screenings are essential for early detection and prevention of various health condition.",
  },
  {
    id: 7,
    image: corporateeventimg.img1,
    name: "Diet Tips for a Healthier Lifestyle",
    tip: "Diet Tips",
    date: "28 April 2025",
    desc: "Healthy diet tips.",

    detail:
      "Maintaining a healthy diet is crucial for overall well-being and can prevent numerous health issues.",
  },
  {
    id: 8,
    image: corporateeventimg.img2,
    name: "Boosting Your Immune System Natu",
    tip: "Health Tips",
    date: "24 April 2025",
    desc: "How to boost immunity naturally.",
    detail:
      "A strong immune system is vital for fighting off infections and staying healthy. This article pro.",
  },
  {
    id: 9,
    image: corporateeventimg.img3,
    name: "The Importance of Regular Health...",
    tip: "Health Tips",
    date: "28 April 2025",
    desc: "Importance of regular health checkups.",

    detail:
      "Regular health screenings are essential for early detection and prevention of various health condition.",
  },
  {
    id: 10,
    image: corporateeventimg.img1,
    name: "Diet Tips for a Healthier Lifestyle",
    tip: "Diet Tips",
    date: "28 April 2025",
    desc: "Healthy diet tips.",
    detail:
      "Maintaining a healthy diet is crucial for overall well-being and can prevent numerous health issues.",
  },
  {
    id: 11,
    image: corporateeventimg.img2,
    name: "Boosting Your Immune System Natu",
    tip: "Health Tips",
    date: "24 April 2025",
    desc: "How to boost immunity naturally.",
    detail:
      "A strong immune system is vital for fighting off infections and staying healthy. This article pro.",
  },
  {
    id: 12,
    image: corporateeventimg.img3,
    name: "The Importance of Regular Health...",
    tip: "Health Tips",
    date: "28 April 2025",
    desc: "Importance of regular health checkups.",
    detail:
      "Regular health screenings are essential for early detection and prevention of various health condition.",
  },
];
const detaillist = [
  {
    id: 1,
    title: "Early Disease Detection",
    description:
      "Identifies health issues at an early stage, allowing for timely treatment and better outcomes.",
  },
  {
    id: 2,
    title: "Preventive Healthcare",
    description:
      "Helps prevent chronic diseases like diabetes, heart conditions, and hypertension through regular monitoring.",
  },
  {
    id: 3,
    title: "Personalized Health Plans",
    description:
      "Enables doctors to recommend lifestyle changes and medical interventions based on individual health status.",
  },
  {
    id: 4,
    title: "Stress & Mental Health Check",
    description:
      "Regular consultations also assess mental well-being, helping manage stress, anxiety, and depression.",
  },
  {
    id: 5,
    title: "Saves Future Medical Costs",
    description:
      "Early diagnosis reduces the risk of expensive treatments and hospitalizations.",
  },
  {
    id: 6,
    title: "Boosts Longevity & Quality of Life",
    description:
      "Proactive healthcare habits ensure a healthier and longer life with improved vitality.",
  },
  // {
  //   id: 7,
  //   title: "Act Now!",
  //   description:
  //     "Don’t wait for symptoms to appear—prioritize your health with regular check-ups!",
  // },
];

export default function EventDetail() {
  const { id } = useParams(); // Get the dynamic ID
  const event = data.find((item) => item.id === Number(id)); //  Find event by ID

  if (!event) {
    return <div className="text-center text-red-500">Event Not Found!</div>;
  }

  return (
    <div className="w-full  ">
      <div className="w-full bg-gradient-to-b from-cyan-50 via-slate-50 to-white-50">
        <div className="  px-6 sm:px-10 md:px-14 lg:px-14">
          <div className="main-container">
            <div className="container">
              <div className="pt-12 sm:pt-6 md:pt-8  lg:pt-16 ">
              <div className="w-full  ">
                {/* section 1  */}

                <div className="w-full  px-0 pt-5 py-2 md:px-8 md:pt-12 md:py-10">
                  <div className="w-[100%]  ">
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={"100%"}
                      height={"100%"}
                      className=" mt-4 w-full  rounded-3xl h-[200px] sm:[300px] md:h-[300px] "
                    />
                  </div>
                </div>
              </div>
              {/* section 2  */}
              <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-0 pr-0 md:px-8  md:pr-10 ">
                {/* left side */}
                <div>
                  <div className="flex gap-4 mt-6 lg:mt-4 text-lg justify-start w-full">
                    <p className=" text-[var(--pink)]">{event.tip}</p>
                    <p className="text-[var(--greyP)]">{event.date}</p>
                  </div>
                  <h2 className="fontsize2xl lg:mt-4 capitalize">
                    {/* lg:text-2xl lg:font-[500] */}
                    {event.name} The Importance of Regular Health Check-Ups
                  </h2>

                  <p className="fontsixelg text-[var(--greyP)] mt-6 sm:pr-10">
                    {/* text-sm md:text-xl lg:text-xl xl:text-xl */}
                    {event.detail}
                  </p>

                  <div className="text-[var(--greyP)] mt-4 sm:pr-10 ">
                    {/* text-sm md:text-xl lg:text-xl xl:text-xl */}
                    {detaillist.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          className="w-full flex items-start flex-row "
                        >
                          {/* Text Content */}
                          <div className="text-start py-3">
                            <h2 className="fontsizelg font-[400] leading-tight inline">
                              ✅{item.title} -
                            </h2>
                            <p className="fontsizebase text-[var(--greyP)] inline">
                              {" "}
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="fontsizebase text-[var(--greyP)]  sm:pr-10 mt-4 ">
                    Don’t wait for symptoms to appear—prioritize your health
                    with regular check-ups!🚑💙
                  </p>
                </div>
                {/* right side */}
                <div className="pl-0 mt-5 mb-0  md:mb-5 md:pl-10">
                  <div className="border-2 w-full rounded-lg px-0 sm:px-4 md:px-6 pt-5 ">
                    <div className="">
                      <h2 className="text-[var(--doveGray)] font-[600] fontsizebase py-3 sm:pr-10">
                        {/* text-sm md:text-xl lg:text-xl xl:text-xl */}
                        Recent Events
                      </h2>
                      <div className="flex flex-col gap-3 ">
                        {data.slice(0, 4).map((item, index) => {
                          return (
                            <div
                              key={item.id}
                              className="flex flex-row gap-3 md:gap-5 mb-3"
                            >
                              <div className="w-full h-full rounded-2xl ">
                                <Image
                                  src={item.image}
                                  alt="not found"
                                  className="w-[100%] h-[200px] md:w-[60%] md:h-[160px] md:min-w-[200px]  md:min-h-[100px] "
                                />
                              </div>
                              <div className="">
                                <div className="flex gap-4 fontsizebase justify-start w-full">
                                  {/* */}
                                  <p className=" text-[var(--pink)]">
                                    {item.tip}
                                  </p>
                                  <p className="text-[var(--greyP)]">
                                    {item.date}
                                  </p>
                                </div>
                                <h2 className="fontsizelg">{item.desc}</h2>
                                <p className="fontsizebase text-[var(--greyP)]">
                                  {item.detail.slice(0, 100)}...
                                </p>
                                <button className="fontsizelg fontmedium mt-2 text-[var(--pink)] flex  items-center">
                                  {/* font-semibold text-lg  */}
                                  Read More <FaArrowRightLong />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-red-600">
                {/* section 2 right */}
                <div className=""></div>
              </div>
              <div className="mt-4">
                <HealthAdvice />
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
