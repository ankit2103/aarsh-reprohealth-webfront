import React from "react";
import Image from "next/image";
import { comingsoonimg } from "../element/images";
const ComingSoon = () => {
  return (
    <div className="w-full pt-16 flex justify-center items-center h-screen text-center bg-gradient-to-b from-slate-50 via-slate-50 to-cyan-100">
      <div className="flex justify-center items-center flex-col gap-2">
        <Image src={comingsoonimg.comingsoon} alt="comingImg" width={350} height={350} />

        <h1 className="heading">Coming Soon</h1>
        {/* <p className="text-[var(--greyP)]  px-8">
          Are you Ready to get something new from us. Then subscribe the news{" "}
          <br /> latter to get latest updates?
        </p> */}
        {/* <div className="flex flex-wrap gap-4 mt-4 items-center justify-center">
          <input
            type="text"
            placeholder="Enter your email"
            className="bg-white py-3 indent-4 w-full md:w-[350px] rounded-xl text-md md:text-lg"
          />
          <button className="bg-[var(--lightBlue)] px-4 md:px-8 py-3 rounded-xl text-md md:text-lg text-white font-normal w-fit">
            Subscribe
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ComingSoon;
