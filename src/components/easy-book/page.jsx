"use client";
import React, { useEffect, useState, useRef } from "react";

const steps = [
  {
    id: 1,
    title: "Choose specialization",
  },
  {
    id: 2,
    title: "Check availability",
  },
  {
    id: 3,
    title: "Select date & time slot",
  },
  {
    id: 4,
    title: "Book an Appointment",
  },
];

const Easybook = () => {
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, bottom } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (top < windowHeight && bottom > 0) {
          setInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length ? prev + 1 : prev));
      }, 2000); // Increased delay time to 2000ms (2 seconds)
      return () => clearInterval(interval);
    }
  }, [inView]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="w-full main-container">
        <div className="container">
          {loading ? (
            <>
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-col items-center">
                   <h2 className="heading capitalize text-center">
                  4 Easy ways to book appointments.
                </h2>
                <p className=" block leading-relaxed text-[var(--greyP)] text-center">
                  Walk just four steps for your good health
                </p>
                </div>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-7">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="sm:px-4 sm:my-3 my-3">
                    <div className="px-5 py-4 rounded-tl-[20px] rounded-tr-[300px] rounded-br-[300px] rounded-bl-[20px] bg-gray-200 animate-pulse h-[140px] flex flex-col justify-between">
                      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
                      <div className="self-end h-10 w-10 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center w-full flex-col ">
                <h2 className="heading capitalize text-center">
                  4 Easy ways to book appointments.
                </h2>
                <p className=" block leading-relaxed text-[var(--greyP)] text-center">
                  Walk just four steps for your good health
                </p>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-7">
                {steps.map((step, index) => (
                  <div key={step.id} className="sm:px-4 sm:my-3 my-3">
                    <div
                      className={`group ease-in-out transform transition-all duration-5000 px-5 py-4 rounded-tl-[20px] rounded-tr-[300px] rounded-br-[300px] rounded-bl-[20px] relative overflow-hidden bg-[var(--athensGray)]`}
                    >
                      <div
                        className={`absolute inset-0 ${
                          index < activeStep ? "bg-[#FFF5F7]" : "bg-transparent"
                        }`}
                        style={{
                          width: index < activeStep ? "100%" : "0%",
                          transition: "width 2s ease",
                        }}
                      ></div>

                      <div className="flex flex-row justify-between items-center gap-6 relative z-10">
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              index < activeStep
                                ? "text-[var(--pink)]"
                                : "text-[var(--fiord)]"
                            }`}
                          >
                            Step {step.id}
                          </p>
                          <p className="text-[var(--black)]  mt-2">
                            {step.title}
                          </p>
                        </div>
                        <p
                          className={`text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold ${
                            index < activeStep
                              ? "text-[var(--pink)]"
                              : "text-[var(--zumthor)]"
                          }`}
                        >
                          {step.id}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Easybook;
