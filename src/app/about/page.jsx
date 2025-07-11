"use client";

import Image from "next/image";
import React from "react";
import { ourmissionimages } from "../../components/element/images";
import MeetOurSpecialists from "../../components/about-us/meet-our-specialists/page";
import OurStoryTestimonial from "../../components/about-us/out-story-testimonial/page";
import { useRouter } from "next/navigation";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import Head from "next/head";


const About = () => {
  const router = useRouter();
  const isAuthenticated = useAuthenticated();
  const handleNavigate = () => {
    if (isAuthenticated) router.push("/medical-specialist");
    else router.push("/login");
  };
  return (
    <>
       <Head>
        <title>About Aarsh ReproHealth | Endometriosis & Fertility Awareness</title>
        <meta
          name="description"
          content="Learn about Aarsh ReproHealth – a platform dedicated to raising awareness on endometriosis and fertility challenges for all genders. Explore our mission and vision."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.aarshreprohealth.com/about-us" />

        <meta property="og:title" content="About Aarsh ReproHealth" />
        <meta
          property="og:description"
          content="Aarsh ReproHealth is a purpose-driven platform addressing awareness, education, and access to care for endometriosis, male fertility, and reproductive health."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aarshreprohealth.com/about-us" />
        <meta
          property="og:image"
          content="https://www.aarshreprohealth.com/assets/images/aboutus-banner.jpg"
        />

        {/* Structured Data with JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aarsh ReproHealth",
              "url": "https://www.aarshreprohealth.com",
              "logo": "https://www.aarshreprohealth.com/assets/images/logo.png",
              "description":
                "Aarsh ReproHealth is a digital platform dedicated to endometriosis awareness, male fertility education, and access to reproductive healthcare specialists in India and beyond.",
              "sameAs": [
                "https://www.facebook.com/aarshreprohealth",
                "https://www.instagram.com/aarshreprohealth",
                "https://www.linkedin.com/company/aarshreprohealth"
              ]
            }),
          }}
        />
      </Head>
   
   
      <div className="w-full text-[#1f1f1f] mt-10 md:mt-24">
        {/* Hero Section */}
        <div className="max-w-[1300px] mx-auto bg-white py-16 px-4 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Text Side - 60% */}
            <div className="md:w-[60%] w-full space-y-6">
              <span className="inline-block bg-[var(--lightgrey)] text-[var(--lightBlue)]  text-sm font-semibold px-4 py-1 rounded-full">
                Who are we?
              </span>
              <h2 className="text-2xl font-semibold mb-4">
                <span className="text-[#000]">A Platform with a Purpose:</span>{" "}
                <span className="text-[#6CA8E6]"> Aar</span>
                <span className="text-[var(--pink)]">sh</span>{" "}
                <span className="text-black/70">ReproHealth</span>
              </h2>
              <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-base">
                Aarsh ReproHealth, a unit of EndoDaylights India Pvt. Ltd., is the
                only platform specifically dedicated to creating awareness about
                endometriosis and offering a consortium of reproductive and
                fertility experts for all individuals. It is envisioned as a
                pivotal platform to raise awareness about endometriosis—a commonly
                overlooked women's health condition—and to support, guide, and
                treat reproductive and fertility challenges in all. This platform
                will serve as a marketplace for endometriosis specialists,
                emerging gynecologists, andrologists and urologists, counsellors
                and psychiatrists along with specialty hospitals and diagnostic
                centers in India and, in the near future, the far and middle
                eastern countries.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-base">
                The company is essentially addressing awareness, access to
                specialist care, stigma, and education related to endometriosis
                and reproductive health for all genders.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleNavigate}
                  className="px-6 py-3 bg-[var(--lightBlue)] text-white rounded-full font-medium"
                >
                  Book an Appointment
                </button>

              </div>
            </div>

            {/* Image Side - 40% */}
            <div className="hidden md:block md:w-[40%] w-full relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-[#E0F6E3]">
                <Image
                  src={ourmissionimages.doctoraboutusimg}
                  alt="doctor"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        {/* from-[#62b1ee] to-[#5bbae3] */}
        <section className="w-full bg-gradient-to-br from-[#7fc4f8] to-[#5bbae3] py-20 px-4 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              Aarsh ReproHealth advocates for creating awareness about
              Endometriosis & breaking taboos around Male fertility. Focus on
              educating, supporting, guiding and treating the reproductive &
              fertility challenges in all individuals.
            </p>
          </div>
        </section>

        <div className="w-full">
          {/* w-full p-6 sm:p-6 md:p-0 mt-5  md:mt-20 */}
          <MeetOurSpecialists />
        </div>


        <div className="pt-6 md:mt-12 mb-10 w-full">
          <OurStoryTestimonial />
        </div>

      </div>
      </>

  );
};

export default About;
