"use client";
import React, { useEffect, useState } from "react";
import { fetchOurStory } from "../../../utils/blog/blog.util";
import { underlineimg } from "../../element/images";
import Image from "next/image";
import Slider from "react-slick";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Head from "next/head";

const renderDescription = (desc) => {
  if (!desc) return null;
  const parsed = parse(desc);
  return Array.isArray(parsed)
    ? parsed
    : desc.replace(/<[^>]*>/g, "");
};

const CustomPrev = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 z-10 bg-[var(--lightBlue)] shadow-md rounded-full p-1 md:p-2 ml-0 md:-ml-8 top-1/2 -translate-y-1/2"
    aria-label="Previous Slide"
  >
    <FaChevronLeft className="text-[var(--White)] text-sm md:text-lg" />
  </button>
);

const CustomNext = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 z-10 bg-[var(--lightBlue)] shadow-md rounded-full p-1 md:p-2 mr-0 md:-mr-8 top-1/2 -translate-y-1/2"
    aria-label="Next Slide"
  >
    <FaChevronRight className="text-[var(--White)] text-sm md:text-lg" />
  </button>
);

const OurStoryTestimonial = () => {
  const [story, setStory] = useState([]);
  const router = useRouter();


  const formatDate = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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
    autoplaySpeed: 3000,
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

  useEffect(() => {
    const getOurStory = async () => {
      try {
        const result = await fetchOurStory();
        if (result?.code === 200) {
          setStory(result.data.sort((a, b) => (a.sequence || 0) - (b.sequence || 0)));
        } else {
          setStory([]);
        }
      } catch (error) {
        console.error("Failed to fetch our story:", error);
      }
    };
    getOurStory();
  }, []);

  return (
    <>
      <Head>
        <title>Our Story – Aarsh ReproHealth</title>
        <meta
          name="description"
          content="Explore real-life experiences, challenges, and journeys behind Aarsh ReproHealth. Stories that inspired awareness and change around endometriosis and fertility."
        />
        <link rel="canonical" href="https://www.aarshreprohealth.com/our-story" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Our Story | Aarsh ReproHealth" />
        <meta property="og:description" content="Real experiences of battling endometriosis and fertility challenges. Read the stories behind Aarsh ReproHealth." />
        <meta property="og:url" content="https://www.aarshreprohealth.com/our-story" />
        <meta property="og:image" content="https://www.aarshreprohealth.com/assets/images/seo/our-story-banner.jpg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Our Story",
              "url": "https://www.aarshreprohealth.com/our-story",
              "blogPost": story.map((blog) => ({
                "@type": "BlogPosting",
                "headline": blog?.title,
                "image": [`https://www.aarshreprohealth.com${blog?.coverImage}`],
                "datePublished": blog?.createdAt,
                "author": {
                  "@type": "Person",
                  "name": "Preetam Petkar"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Aarsh ReproHealth",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.aarshreprohealth.com/logo.png"
                  }
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://www.aarshreprohealth.com/our-story/${blog?.slug}/${blog?._id}`
                },
                "description": blog?.description?.replace(/<[^>]*>?/gm, "").slice(0, 160)
              }))
            }),
          }}
        />
      </Head>
      <div className="main-container">
        <div className="container">
          <div className="flex flex-col justify-center items-center text-center">
            <div className="relative inline-block mb-6">
              <h1 className="font-bold heading capitalize text-4xl text-[var(--midnight)] w-full px-0 sm:px-0 md:px-10 lg:px-10">
                Our Story
              </h1>
              <Image
                src={underlineimg.underline}
                alt="underline"
                width="100%"
                height="100%"
                className="absolute left-2/3 bottom-[-7px] transform -translate-x-1/2 w-[120px] sm:w-[140px] md:w-[150px] lg:w-[200px]"
              />
            </div>
            <p className="fontsizebase text-[var(--greyP)] text-center w-full md:max-w-[80%] lg:max-w-[60%]">
              "Our fight with endometriosis — Sheila’s physical pain, our emotional scars, and the hope we found together." - Based on our life experience, read on... Preetam
            </p>
          </div>

          <div className="w-full relative mt-10">
            <Slider {...settings}>
              {Array.isArray(story) &&
                story.length > 0 &&
                story.map((blog) => (
                  <div key={blog?._id}>
                    <div
                      onClick={() =>
                        router.push(`/our-story/${blog?.slug}/${blog._id}`)
                      }
                      className="testimonial-main-card p-4 rounded-xl bg-[var(--White)] mx-[5px] cursor-pointer"
                    >
                      <div className="testimonial-img w-full h-[300px]">
                        <Image
                          src={blog?.coverImage}
                          alt={blog?.title}
                          width={400}
                          height={300}
                          className="rounded-2xl w-full h-full object-cover border"
                        />
                      </div>
                      <div className="flex justify-between gap-4 mt-6 fontsizelg">
                        <p className="text-[var(--pink)]">{blog?.bcId?.name || "Health Tips"}</p>
                        <p className="text-[var(--greyP)]">{formatDate(blog?.createdAt) || "N/A"}</p>
                      </div>
                      <h2 className="fontsizexl text-start mt-4">
                        {blog?.title.slice(0, 60)}
                        {blog?.title.length > 60 && "..."}
                      </h2>
                      <p
                        className="text-gray-600 text-sm text-start truncate overflow-hidden w-full"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {renderDescription(blog?.description) || "No description available."}
                      </p>
                      <button
                        className="mt-4 text-[var(--pink)] font-medium text-sm flex gap-3 items-center"
                        onClick={() => router.push(`/blogs/${blog?.slug}/${blog?._id}`)}
                      >
                        Read More <FaArrowRightLong />
                      </button>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </>

  );
};

export default OurStoryTestimonial;
