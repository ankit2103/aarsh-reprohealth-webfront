"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ourmissionimages,
  underlineimg,
} from "../../../components/element/images";

const ourmissionParaOne = `Aarsh ReproHealth advocates for creating awareness about Endometriosis & breaking taboos around Male fertility. Focus on educating, supporting, guiding and treating the reproductive & fertility challenges in all individuals.`;

const ourmissionParaTwo = `Aarsh ReproHealth, a unit of EndoDaylights India Pvt. Ltd., is the only platform specifically dedicated to creating awareness about endometriosis and offering a consortium of reproductive and fertility experts for all individuals. It is envisioned as a pivotal platform to raise awareness about endometriosis—a commonly overlooked women's health condition—and to support, guide, and treat reproductive and fertility challenges in all. This platform will serve as a marketplace for endometriosis specialists, emerging gynecologists, andrologists and urologists, counsellors and psychiatrists along with specialty hospitals and diagnostic centers in India and, in the near future, the far and middle eastern countries.`;

const OurMission = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full bg-[#f0fbff] py-16 px-4 md:px-10">
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#112D4E] relative inline-block">
            About Us
            <Image
              src={underlineimg.underline}
              alt="underline"
              width={300}
              height={20}
              className="absolute left-1/2 transform -translate-x-1/2 bottom-[-15px] w-[200px] md:w-[300px]"
            />
          </h1>
        </div>

        {/* Mission Statement */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-[#1F4068] mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {ourmissionParaOne}
          </p>
        </div>

        {/* Company Profile + Image */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="lg:w-3/5">
            <h3 className="text-xl md:text-2xl font-semibold text-[#1F4068] mb-4">
              Company Profile
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {ourmissionParaTwo}
            </p>
          </div>

          {/* Image */}
          <div className="lg:w-2/5 w-full">
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image
                src={ourmissionimages.doctoraboutusimg}
                alt="Doctor in operation theatre"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
