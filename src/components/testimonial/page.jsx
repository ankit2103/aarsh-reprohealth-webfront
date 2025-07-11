"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import Image from "next/image";
import { clienttestimonialimages } from "../element/images";

const testimonials = [
  {
    name: "Vikram Patel",
    position: "HealthCare Consultant",
    image: clienttestimonialimages.clientimg1, // Replace with your image path
    quote:
      "Health awareness is crucial, and Aarsh ReproHealth provides the right information at the right time.",
  },
  {
    name: "Arjun Mehra",
    position: "Nutritionist",
    image: clienttestimonialimages.clientimg2,
    quote:
      "Managing reproductive health is easier with Aarsh ReproHealth. Their support is excellent!",
  },
  {
    name: "Amit Khanna",
    position: "Wellness Coach",
    image: clienttestimonialimages.clientimg1,
    quote:
      "Aarsh ReproHealth provides expert advice that has truly improved my well-being. Their resources are a lifesaver!",
  },
  {
    name: "Rohit Sharma",
    position: "Fitness Trainer",
    image: clienttestimonialimages.clientimg2,
    quote:
      "Reliable resources and expert guidance make this platform stand out. Highly recommended!",
  },
];

// const CustomNext = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute bottom-0 left-[50%] md:left-[50%] cursor-pointer"
//       onClick={onClick}
//     >
//       <Image
//         src={clienttestimonialimages.nextBtnimg}
//         alt="image"
//         width={40}
//         height={40}
//       />
//     </div>
//   );
// };
// const Customprev = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute bottom-0 left-[35%] md:left-[45%] cursor-pointer"
//       onClick={onClick}
//     >
//       <Image
//         src={clienttestimonialimages.prevBtnimg}
//         alt="image"
//         width={40}
//         height={40}
//       />
//     </div>
//   );
// };
const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const CustomNext = ({ onClick }) => (
    <div
      className="hidden md:block absolute bottom-0 right-[30%] sm:right-[42%] md:right-[42%] lg:right-[45%] cursor-pointer z-40"
      onClick={onClick}
    >
      <Image
        src={clienttestimonialimages.nextBtnimg}
        alt="next"
        width={40}
        height={40}
      />
    </div>
  );

  const CustomPrev = ({ onClick }) => (
    <div
      className="hidden md:block absolute bottom-0 left-[30%] sm:left-[42%] md:left-[45%] lg:left-[45%] cursor-pointer z-40"
      onClick={onClick}
    >
      <Image
        src={clienttestimonialimages.prevBtnimg}
        alt="prev"
        width={40}
        height={40}
      />
    </div>
  );

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  return (
    <div className="w-[96%] m-auto ">
      <div className="main-container">
        <div className="container">
          <div className="flex justify-center items-center flex-col w-full pt-4">
                <button className=" bg-[var(--lightgrey)] text-[var(--lightBlue)] fontsizebase  px-6 rounded-full py-2">
                  Testimonial
                </button>
                {/* <h2 className="heading capitalize text-center mt-4">
                  Client Testimonial
                </h2> */}
                <p className=" text-[var(--greyP)]  text-center mt-2 ">
                  Have a look to how medical professionals view us.
                </p>
              </div>

          <div className="mt-10 ">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-main-card">
                  <div
                    className={`testimonial-card ${
                      index === activeIndex ? "active" : ""
                    }`}
                  >
                    <div className="testimonial-content mt-10 lg:mt-16">
                      <div className="testimonial-img">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={100}
                          height={100}
                          className="rounded-full"
                        />
                      </div>
                      <p className="text-[var(--greyP)]  text-center">
                        {testimonial.quote}
                      </p>
                      {/* text-md lg:text-xl */}
                      <h3 className="text-black text-md  text-center mt-4 lg:mt-6 ">
                        {testimonial.name}
                      </h3>
                      <p className="text-[var(--greyP)] text-xs lg:text-sm mt-2">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <style jsx>{`
        .subtitle {
          font-size: 16px;
          color: var(--greyP);
        }
        .testimonial-main-card {
          width: 100%;
          min-height: 400px;
          max-width: 100%;
          position: relative;
          margin-bottom: 30px;
        }
        .testimonial-card {
          opacity: 0.5;
          transform: scale(0.9);
          transition: all 0.3s ease;
          padding: 20px;
          text-align: center; /* Centering content */
          border-radius: 10px;
          background: #fff;
          margin-top: 60px;
        }
        .testimonial-card.active {
          opacity: 1;
          transform: scale(1);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--greyP);
          padding: 30px;
        }
        .testimonial-content {
          text-align: center;
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
          background: var(--pink);
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

          @media (max-width: 768px) {
    .testimonial-main-card {
      min-height: 300px;
    }
  }

      `}</style>
    </div>
  );
};

export default Testimonial;
