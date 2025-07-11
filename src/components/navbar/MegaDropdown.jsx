// components/navbar/MegaDropdown.jsx
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const MegaDropdown = ({
  isVisible,
  onMouseEnter,
  onMouseLeave,
  refProp,
  description,
  links,
  pathname,
  handleNavigate,
  illustration,
}) => {
  if (!isVisible) return null;

  return (
    <div
      ref={refProp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="mt-4 px-8 py-10 w-[1000px] fixed top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl z-50"
    >
      <div className="flex flex-row gap-6 items-start">
        {/* Description Side */}
        <div className="w-[40%]">
          <p className="text-[var(--greyP)] space-y-2">{description}</p>
        </div>

        {/* Links */}
        <div className="w-[30%]">
          {links.map((item) => (
            <div
              key={item.path}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.img}
                  alt="icon"
                  width={36}
                  height={36}
                  className="w-[36px]"
                />
                <Link
                  href={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`block hover:text-[var(--lightBlue)] text-nowrap ${
                    pathname === item.path ? "text-[var(--lightBlue)]" : ""
                  }`}
                >
                  {item.title}
                </Link>
              </div>
              <div className="text-center text-[var(--pink)]">
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>

        {/* Illustration Image */}
        <div className="w-[30%]">
          <Image
            src={illustration}
            alt="section illustration"
            width={500}
            height={500}
            className="rounded-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MegaDropdown;
