"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowDropright } from "react-icons/io";
import { latesttechtestimonialimages } from "../../../components/element/images";

const testimonials = [
  {
    img: latesttechtestimonialimages.img2,
    title: "Endometriosis",
    quote:
      "Endometriosis is a chronic condition where tissue similar to the lining of the uterus grows outside it, causing pain, irregular bleeding, & potential fertility issues.",
  },
  {
    img: latesttechtestimonialimages.img4,
    title: "Gynecology",
    quote:
      "Urology is a medical specialty that focuses on the diagnosis, treatment, and prevention of diseases related to the urinary tract and male reproductive system.",
  },
  {
    img: latesttechtestimonialimages.img5,
    title: "Andrology",
    quote:
      "Psychiatry is a branch of medicine that deals with the diagnosis, treatment, and prevention of mental health disorders. It includes addressing conditions like depression, anxiety, and other interventions.",
  },
];

const LatestTechTestimonial = () => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100000,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 996,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-container">
      <div className="container">
        <section className="latest-main p-0 sm:p-[2.5rem] md:p-0  lg:p-0  ">
          <div className="latest">
            <div
              className={`flex justify-center items-center border bgslider rounded-md `}
            >
              {/* {loading ? (
                <>
                  <div className="w-full mt-2 rounded-md">
                    <div className="flex flex-col sm:flex-row gap-4 overflow-hidden px-4">
                      {[...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="testimonial-main-card1 w-full max-w-sm bg-white rounded-lg p-6 text-center shadow"
                        >
                          <div className="testimonial-card">
                            <div className="testimonial-content">
                              <div className="mx-auto mb-4 bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
                                <div className="w-[30px] h-[30px] bg-gray-200 rounded-full" />
                              </div>
                              <div className="h-5 w-3/4 bg-gray-300 rounded mx-auto mb-3" />
                              <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-200 rounded" />
                                <div className="h-4 w-[90%] bg-gray-200 rounded mx-auto" />
                              </div>
                              <div className="flex items-center justify-center gap-1 mt-4">
                                <div className="h-4 w-24 bg-gray-300 rounded" />
                                <div className="w-4 h-4 bg-gray-300 rounded-full" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : ( */}
              <>
                <div className="w-[100%] mt-2 rounded-md ">
                  <div className="">
                    <Slider {...settings}>
                      {testimonials.map((item, index) => (
                        <div key={index} className="testimonial-main-card1">
                          <div
                            className={`testimonial-card ${
                              index === activeIndex ? "active" : ""
                            }`}
                          >
                            <div className="testimonial-content xl:h-[280px] lg:h-[300px] sm:h-[250px] md:h-[300px]">
                              <div className="testimonial-img text-center">
                                <Image
                                  src={item.img}
                                  alt={item.title}
                                  width={50}
                                  height={50}
                                  className=" rounded-full text-center object-cover "
                                />
                              </div>
                              <h3 className="text-[var(--midnight)] break-words subheading mt-5 ">
                                {item.title}
                              </h3>

                              <p className="fontsizebase text-[var(--greyP)]   ">
                                {/* text-sm md:text-xl lg:text-xl xl:text-xl */}
                                {item.quote}
                              </p>
                              <div className="flex items-center justify-center gap-1  mt-3">
                                <p className="fontsizebase text-[var(--midnight)] text-semibold   underline capitalize">
                                  {/* text-sm md:text-xl lg:text-xl xl:text-xl  */}
                                  Learn more{" "}
                                </p>
                                <IoIosArrowDropright className="mt-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </>
              {/* )} */}

              <style jsx>{`
            .testimonial-content {
              // line-height: 40px;
              // border:1px solid red;
              // padding: 0px 10px;
            }
            .subtitle {
              font-size: 16px;
              color: var(--greyP);
            }
            .bgslider {
              background: #011632;
              padding: 20px 20px;
            }
            .slick-slide .testimonial-main-card {
              padding: 0 10px; /* Adjust spacing between slides */
            }

            .slick-list .testimonial-main-card {
              margin: 0 -10px; /* Compensate for the added padding */
            }
            .latest {
              padding: 0px; //20px
              margin: 20px ;
            }
            .test {
            }
            .testimonial-img {
              // height: 70px;
              // width: 70px;
              padding: 13px;
              background: #25b4f8;
              border: none;
              margin: auto;
              border-radius: 50%;
              box-shadow: 0px 8px 16px #125fb752;
              width: 50px;
              height: 50px;
              text-align: center;
            }
            .testimonial-img img {
              margin: auto;
              display: block;
            }

            .testimonial-main-card {
              width: 100%;
              // min-height: 400px;
              max-width: 100%;
              text-align: center;
              background-color: var(--White);
            }

            .testimonial-card {
              opacity: 1;
              transform: scale(0.9);
              transition: all 0.3s ease;
              padding: 20px;
              text-align: center; /* Centering content */
              border-radius: 10px;
              background: #fff;
              // margin-top: 60px;
            }

            .testimonial-img {
              
            }
              /* Media query for small screens (phones) */
  @media (max-width: 768px) {
    .testimonial-content{
            padding:0px 0px;
    }
    .testimonial-img {
      width: 60px;  /* Smaller width for mobile */
      height: 60px;  /* Smaller height for mobile */
      padding: 6px;  /* Adjust padding */
    }

    .testimonial-img img {
      width: 40px; /* Make sure image scales properly */
      height: 40px;
    }
      /*  Media Query for iPads (Tablets) */
  @media (min-width: 768px) and (max-width: 1024px) {
   .testimonial-content{
            padding:0px 0px;
    }
    .testimonial-img {
      width: 70px;  /* Slightly smaller for tablets */
      height: 70px;
      padding: 10px;
    }
      .testimonial-img img {
      width: 50px;
      height: 50px;
    }
          }
          `}</style>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LatestTechTestimonial;
