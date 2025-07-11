import React from 'react'
import { DontLetYourHealth } from "../element/images"
import Image from 'next/image'

const DontLet = () => {
  return (
    <>
      <section className="max-w-[1296px]  mx-auto  bg-white shadow-lg rounded-xl  flex flex-wrap justify-evenly items-center">
        {/* Left Content */}
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold text-[#274760]">
            Don’t Let Your Health Take a Backseat!
          </h1>
          <p className="text-lg mt-4 text-[#27476085]" style={{ opacity: 0.52 }}>
            Schedule an appointment with one of our experienced medical professionals today!
          </p>
        </div>

        {/* Right Image */}
        <Image src={DontLetYourHealth.health} alt='health' />
      </section>
    </>
  )
}

export default DontLet
