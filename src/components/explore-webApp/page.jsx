"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { explorewebappimages } from "../element/images";
import { useRouter } from "next/navigation";
import Head from "next/head";

const Explolrewebapp = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Explore Services | Aarsh ReproHealth</title>
        <meta
          name="description"
          content="Explore Aarsh ReproHealth’s expert services: talk to doctors, book lab tests, and access specialized packages for reproductive health and wellness across India."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Explore Reproductive Health Services - Aarsh ReproHealth" />
        <meta property="og:description" content="Book consultations, lab tests, packages, and doctor subscriptions for better reproductive care." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aarshreprohealth.com/explore-services" />
        <meta property="og:image" content="https://www.aarshreprohealth.com/assets/images/preview.jpg" />
        <link rel="canonical" href="https://www.aarshreprohealth.com/explore-services" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Explore Our Reproductive Health Services",
              "url": "https://www.aarshreprohealth.com/explore-services",
              "description": "Discover a range of reproductive health services including doctor consultations, lab diagnostics, wellness packages, and flexible subscription plans with Aarsh ReproHealth.",
              "publisher": {
                "@type": "Organization",
                "name": "Aarsh ReproHealth",
                "url": "https://www.aarshreprohealth.com",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91 9740522300",
                  "email": "support@aarshreprohealth.com",
                  "contactType": "Customer Support",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                }
              }
            })
          }}
        />
      </Head>
      <div className="w-full">
        <div className="main-container">
          <div className="container">
            <div className="pt-10">
              <div className="text-center sm:text-center md:text-start lg:text-start">
                <p className="heading capitalize">Explore our services.</p>
                <p className="block leading-relaxed text-[var(--Lynch)]">
                  Explore our world for good reproductive health.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 mt-6 pb-14">
                {/* LEFT COLUMN */}
                <div className="w-full lg:w-[60%]">
                  {/* Talk to Doctor Block */}
                  <div className="flex flex-col sm:flex-row gap-6 bg-[var(--blackhaze)] px-6 py-6 rounded-[20px]">
                    <div>
                      <div className="bg-[#2ED1E21A] rounded-full p-3 w-fit">
                        <Image
                          src={explorewebappimages.calender}
                          alt="calendar icon"
                          width={"auto"}
                          height={"auto"}
                        />
                      </div>
                      <h3
                        className="mt-6 cursor-pointer hover:text-[var(--lightBlue)] hover:underline"
                        onClick={() => handleNavigate("/medical-specialist")}
                      >
                        Talk to a Doctor, Your Way
                      </h3>
                      <p className="mt-3 text-[var(--greyP)] w-full sm:w-[80%] md:w-full">
                        Connect with trusted medical specialists — online or at a
                        clinic — for personalized reproductive health guidance.
                      </p>
                    </div>
                    {/* ✅ Hidden on mobile */}
                    <div className="w-full hidden sm:flex">
                      <Image
                        src={explorewebappimages.mobile1}
                        alt="mobile1"
                        width={""}
                        height={""}
                        className="max-w-full lg:min-h-[130px] lg:max-h-[200px]"
                      />
                    </div>
                  </div>

                  {/* Package Cards */}
                  <div className="flex flex-col lg:flex-row mt-8 gap-6">
                    {/* Advanced Care */}
                    <div className="bg-[var(--blackhaze)] px-6 py-10 md:py-6 rounded-[20px] cursor-pointer w-full">
                      <Image
                        src={explorewebappimages.file}
                        alt="icon"
                        width={65}
                        height={65}
                      />
                      <h3
                        onClick={() => handleNavigate("/speciality-clinics")}
                        className="mt-6 cursor-pointer hover:text-[var(--lightBlue)] hover:underline"
                      >
                        Advanced Care, Trusted Hands
                      </h3>
                      <p className="mt-3 text-[var(--greyP)]">
                        Choose top partner clinics, backed by expert care and
                        compassion for necessary procedures related to the
                        reproductive health for both men and women.
                      </p>
                    </div>

                    {/* ✅ LAB CARD FOR MOBILE (after Advanced Care) */}
                    <div
                      className="block lg:hidden bg-[var(--blackhaze)] px-6 py-6 rounded-[20px] cursor-pointer"
                      onClick={() =>
                        handleNavigate("/diagnoistic-center-laboratories")
                      }
                    >
                      <Image
                        src={explorewebappimages.file}
                        alt="subscription"
                        width={65}
                        height={65}
                      />
                      <h3 className="mt-4 hover:text-[var(--lightBlue)] hover:underline">
                        Essential Lab Tests for Reproductive Health
                      </h3>
                      <p className="mt-2 text-[var(--greyP)]">
                        Access accurate, trusted diagnostic tests to understand
                        and manage reproductive health for both men and women.
                      </p>
                    </div>

                    {/* Personalized Packages */}
                    <div className="bg-[var(--blackhaze)] px-6 py-10 md:py-6 rounded-[20px] cursor-pointer w-full">
                      <Image
                        src={explorewebappimages.confirm}
                        alt="confirm"
                        width={65}
                        height={65}
                      />
                      <h3
                        onClick={() =>
                          handleNavigate("/package/reprohealth-package")
                        }
                        className="mt-6 cursor-pointer hover:text-[var(--lightBlue)] hover:underline"
                      >
                        Personalized Healthcare Packages
                      </h3>
                      <p className="mt-3 text-[var(--greyP)]">
                        Choose from curated reproductive health packages designed
                        to support your journey with clarity and care.
                      </p>
                    </div>

                    {/* Subscription Plans */}
                    <div className="bg-[var(--blackhaze)] px-6 py-10 md:py-6 rounded-[20px] cursor-pointer w-full">
                      <Image
                        src={explorewebappimages.file}
                        alt="subscription"
                        width={65}
                        height={65}
                      />
                      <h3
                        onClick={() =>
                          handleNavigate("/package/subscription-for-doctor")
                        }
                        className="mt-6 cursor-pointer hover:text-[var(--lightBlue)] hover:underline"
                      >
                        Grow with Aarsh – Subscription Plans for Doctors, Clinics
                        & Labs
                      </h3>
                      <p className="mt-3 text-[var(--greyP)]">
                        Join our platform to gain visibility, patient trust, and
                        integrated support through tailored subscription plans.
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="w-full lg:w-[40%] flex flex-col gap-6">
                  {/* ✅ LAB CARD FOR DESKTOP */}
                  <div
                    className="hidden lg:flex flex-col px-6 py-5 md:pt-6 rounded-[20px] bg-[var(--blackhaze)] gap-4 items-start cursor-pointer"
                    onClick={() =>
                      handleNavigate("/diagnoistic-center-laboratories")
                    }
                  >
                    <h3 className="hover:text-[var(--lightBlue)] hover:underline">
                      Essential Lab Tests for Reproductive Health
                    </h3>
                    <p className="text-[var(--greyP)]">
                      Access accurate, trusted diagnostic tests to understand and
                      manage reproductive health for both men and women.
                    </p>
                    {/* ✅ Image hidden in mobile (already in lg-only block) */}
                    <div className="w-full flex justify-start items-center rounded-3xl">
                      <Image
                        src={explorewebappimages.meeting}
                        alt="meeting"
                        width={"auto"}
                        height={"auto"}
                        className="w-full lg:min-h-[230px] lg:max-h-[230px] lg:max-w-[500px] rounded-3xl"
                      />
                    </div>
                  </div>

                  {/* Non-subscription Plan */}
                  <div
                    className="bg-[var(--blackhaze)] px-6 py-5 rounded-[20px] cursor-pointer"
                    onClick={() =>
                      handleNavigate("/package/subscription-for-doctor")
                    }
                  >
                    <div className="bg-[#2ED1E21A] rounded-full p-3 w-fit">
                      <Image
                        src={explorewebappimages.calender}
                        alt="calendar"
                        width={"auto"}
                        height={"auto"}
                      />
                    </div>
                    <h3 className="mt-6 cursor-pointer hover:text-[var(--lightBlue)] hover:underline">
                      Flexible Listing Without Commitment - Non Subscription Plan
                    </h3>
                    <p className="mt-3 text-[var(--greyP)]">
                      Get listed and collaborate with Aarsh ReproHealth without a
                      subscription — a simple way to stay visible and connected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Explolrewebapp;
