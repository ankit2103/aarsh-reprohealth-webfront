"use client";
import Consultation from "../../components/dr-cunsultation/page";
import TestiMonial from "../../components/testimonial/page";
import HealthAdviceCard from "../../components/health-advice-cards/page";
import SatisfySolution from "../../components/satisfy-solutions/page";
import SpecialDoctors from "../../components/special-doctors/page";
import Easybook from "../../components/easy-book/page";
import Explolrewebapp from "../../components/explore-webApp/page";
import HeroBanner from "../../components/home/hero-banner/page";
import Aboutus from "../../components/home/about-us/page";
import PartnerSponsorsTestimonial from "../../components/partner-sponsorship-testimonial/page";
import BlogCard from "./_component/blog-card";
import SubscribeForKnowledgeBankUpdate from "./_component/subscribe-for-knowledge-bank-update";
import KnowledgeCard from "../../components/custom-card/knowledge-card";
import { fetchKnowledgeBanks } from "../../utils/knowledge-bank/knowledge-bank.util";
import { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Walpage = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    try {
      const getKnowledgeBanks = async () => {
        const result = await fetchKnowledgeBanks();
        console.log("Calling fetchKnowledgeBanks...", result?.data);
        if (result?.code === 200) {
          setGetData(result?.data || []);
          if (result.data.length > 0 && result.data[0]?.name) {
          }

          setLoading(false);
        } else {
          setLoading(true);
        }
      };
      getKnowledgeBanks();
    } catch (error) {
      console.log("Error in fetching getKnowledgeBanks:", error);
    }
  }, []);

  return (
    <div className="w-full  ">
      {/* Hero banner */}
      <div className="">
        <HeroBanner />
      </div>

      {/* dr consultation */}
      <div className="w-full  p-5  sm:p-5 md:p-8 mt-3">
        <Consultation />
      </div>

      <div className="w-full   mt-5 ">
        <Aboutus />
      </div>
      {/* SpecialDoctors */}
      <div className="w-full p-6 sm:p-6 md:p-8 mt-5 md:mt-12 ">
        <SpecialDoctors />
      </div>
      {/* Explolrewebapp */}
      <div className="w-full  bg-[var(--vista)] mt-14">
        <Explolrewebapp />
      </div>

      {/* Easybook */}
      <div className="w-full  mt-5 md:mt-14">
        <Easybook />
      </div>
      {/* satisfy-solution */}
      <div className="w-full  bg-[var(--vista)] mt-5 px-1  md:mt-14">
        <SatisfySolution />
      </div>

      {/* testimonials */}

      <div className="w-full mt-10">
        <TestiMonial />
      </div>
      {/* health advice cards */}
      <div className="w-full  bg-[var(--vista)] mt-10 pt-8 ">
        <BlogCard />
  
      </div>
      <div lassName="w-full mt-10">
        <PartnerSponsorsTestimonial/>
      </div>
      <div className="w-full mt-10">
        <SubscribeForKnowledgeBankUpdate />
      </div>
      {/* Knowledge-bank card  */}
      <div className="w-full mx-auto pb-10 relative mt-10">
        <div className="main-container">
          <div className="container">
            <div className=" w-full px-2 mb-6">
              <div className="w-full flex  justify-between">
                <div>
                  <h2 className="heading text-start capitalize">
                    Knowledge Bank
                  </h2>
                  <p className="text-[var(--greyP)] text-start mt-2">
                    Everything you need to know — from treatments and
                    technologies to lifestyle tips and real experiences.
                  </p>
                </div>

                <div>
                  <p
                    className="border bg-[var(--lightBlue)] text-center w-[112px] py-3 px-5 rounded-full text-[var(--White)] cursor-pointer hover:bg-[var(--vista)] hover:text-[var(--lightBlue)] hover:border-[var(--lightBlue)] flex items-center gap-2 mt-4 md:mt-0"
                    onClick={() => router.push("/knowledge-bank")}
                  >
                    See all <FaArrowRightLong />
                  </p>
                </div>
              </div>

              <div className="w-full ">
                {loading ? (
                  <div className="w-full">
                    <div className="mt-10 animate-pulse flex flex-col lg:flex-row gap-4 flex-wrap justify-start">
                      {[...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="w-full sm:w-[100%] md:w-full lg:w-[400px] p-4 bg-gray-100 rounded-2xl"
                        >
                          <div className="h-5 bg-gray-300 w-3/4 rounded mb-2" />
                          <div className="h-4 bg-gray-300 w-[90%] rounded mb-1" />
                          <div className="h-4 bg-gray-300 w-[80%] rounded mb-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Render actual blog data here when not loading
                  <KnowledgeCard filteredCategory={getData} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full   my-10 container px-8 border ">
        <KnowledgeCard filteredCategory={getData}/>
      
      </div> */}
        {/* <PartnerSponsorsTestimonial/> */}
      </div>
    </div>
  );
};

export default Walpage;
