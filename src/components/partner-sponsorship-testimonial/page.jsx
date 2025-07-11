"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Image from "next/image";
import { clienttestimonialimages, partnertestimonialimages } from "../element/images";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";


const testimonials = [
  {
    name: "NextGenTechServices",
    
    image: partnertestimonialimages.partnerlogo1, // Replace with your image path
    quote:
      "Health awareness is crucial, and Aarsh ReproHealth provides the right information at the right time.",
    url:"https://ngtsindore.com/"
  },
  {
    name: "First500Days",
    
    image: partnertestimonialimages.partnerlogo2,
    quote:
      "Managing reproductive health is easier with Aarsh ReproHealth. Their support is excellent!",
      url:"https://first500days.com/"
  },
  // {
  //   name: "Amit Khanna",
  //   image: partnertestimonialimages.partnerlogo1,
  //   quote:
  //     "Aarsh ReproHealth provides expert advice that has truly improved my well-being. Their resources are a lifesaver!",
  // },
  // {
  //   name: "Rohit Sharma",
  //   image: partnertestimonialimages.partnerlogo2,
  //   quote:
  //     "Reliable resources and expert guidance make this platform stand out. Highly recommended!",
  // },
  //    {
  //   name: "Arjun Mehra",
  //   image: partnertestimonialimages.partnerlogo1,
  //   quote:
  //     "Managing reproductive health is easier with Aarsh ReproHealth. Their support is excellent!",
  // },
  //  {
  //   name: "Arjun Mehra",
  //   image: partnertestimonialimages.partnerlogo2,
  //   quote:
  //     "Managing reproductive health is easier with Aarsh ReproHealth. Their support is excellent!",
  // },
];

const CustomNext = ({ onClick }) => (
  <div
    className="p-1 sm:p-2 rounded-full border border-[var(--lightBlue)] bg-[var(--lightBlue)]   md:block absolute top-[50%] sm:top-1/2 right-[0%] sm:right-[-1%]  md:right-[-4%] lg:right-[-4%] cursor-pointer z-40 "
    // right-[30%] sm:right-[42%]
    onClick={onClick}
  >
    <FaChevronRight className=" text-[var(--White)] text-lg" />
  </div>
);

const CustomPrev = ({ onClick }) => (
  <div
    className="p-1 sm:p-2 rounded-full border border-[var(--lightBlue)]  bg-[var(--lightBlue)]  md:block  absolute top-[50%] sm:top-1/2  left-[0%] sm:left-[-1%]   md:left-[-4%] lg:left-[-4%] cursor-pointer z-40 "
    // left-[30%] sm:left-[42%] md:left-[45%] lg:left-[-4%]
    onClick={onClick}
  >
    <FaChevronLeft className="text-[var(--White)] text-lg " />
  </div>
);
const PartnerSponsorsTestimonial = () => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleNavigate= async(path)=>{
    router.push(path);
  }

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: testimonials.length>4?true:false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: <CustomPrev />,
    nextArrow: <CustomNext />,
  };

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
  
      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }, []);

  return (
    <div className="w-[100%] ">
      <div className="main-container">
        <div className="container">
          {loading ? (
            <>
              <div className="flex justify-center w-full animate-pulse mt-10">
                <button className="fontsizexl bg-gray-200 text-gray-400 font-medium px-8 rounded-full py-3 w-40 h-10" />
              </div>

              <div className="text-center mt-4 animate-pulse">
                <div className="h-6 bg-gray-300 w-1/3 mx-auto rounded mb-2" />
                <div className="h-4 bg-gray-300 w-2/3 mx-auto rounded" />
              </div>

              <div className="mt-10 animate-pulse">
                <div className="flex overflow-x-scroll gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="min-w-[300px] max-w-[350px] mx-auto p-6 bg-gray-100 rounded-2xl flex flex-col items-center text-center"
                    >
                      <div className="w-34 h-34 bg-gray-300 rounded-full mb-4" />
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-300 rounded w-[90%] mb-1" />
                     
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-10 pb-8 rounded-2xl">
                 <div className="flex justify-center items-center flex-col w-full pt-4">
                <button className=" bg-[var(--lightgrey)] text-[var(--lightBlue)] fontsizebase  px-6 rounded-full py-2">
                  Our Partners
                </button>
                <h2 className="heading capitalize text-center mt-4">Our Trusted Partners</h2>
              <p className=" text-[var(--greyP)]  text-center mt-2 ">
               The trusted partner of choice for medical professionals
              </p>
              </div>
            
                <Slider {...settings}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index} onClick={()=>handleNavigate(testimonial.url)} className="testimonial-main-card">
                      <div
                        className={`testimonial-card ${
                          index === activeIndex ? "active" : ""
                        }`}
                      >
                        <div className="testimonial-content border border-[var(--lightBlue)] rounded-lg  bg-[var(--White)] cursor-pointer">
                         
                          <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={100}
                              height={100}
                              className=" w-full h-full p-4"
                            />
                         
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .subtitle {
          font-size: 14px;
          color: var(--greyP);
        }
        .testimonial-main-card {
          width: 100%;
          min-height: 100px;
          max-width: 100%;
          position: relative;
          margin-bottom: 30px;
          background-color:"black"
        }
        .testimonial-card {
        //   opacity: 0.5;
          transform: scale(0.9);
          transition: all 0.3s ease;
          padding: 20px;
          text-align: center; /* Centering content */
          border-radius: 10px;
          
          margin-top: 60px;


        }
        // .testimonial-card.active {
        //   opacity: 1;
        //   transform: scale(1);
        //   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        //   tex-align:center;
        //   padding: 30px;

        // }
        .testimonial-content {
          text-align: center;
          width:100%;
          height:100px;
          // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding:4px;
          // border-radius:6%;
          // border:2px solid red;
        }
        .testimonial-img {
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0px 8px 16px #125fb752;
          width: 100px;
          height: 100px;
          position: absolute;
          top: -50px; /* Adjust to move the image upwards */
          left: 50%;
          transform: translateX(-50%); /* Center horizontally */
          z-index: 9;
        }

        /* Ensure arrows are styled correctly and positioned at the bottom */
        .slick-prev-arrow,
        .slick-next-arrow {
          background: var(--greyP);
          color: red;
          font-size: 18px;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          position: absolute;
          bottom: 10px; /* Positioned at the bottom */
          z-index: 9999;
          transition: background-color 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .slick-prev-arrow {
          left: 20px; /* Position left */
        }

        .slick-next-arrow {
          right: 20px; /* Position right */
        }

        .slick-prev-arrow:hover,
        .slick-next-arrow:hover {
          background-color: var(--darkPink); /* Change color on hover */
        }

        /* Ensure the arrows are visible */
        .slick-prev-arrow,
        .slick-next-arrow {
          display: block !important; /* Forces visibility */
        }
      `}</style>
    </div>
  );
};

export default PartnerSponsorsTestimonial;
