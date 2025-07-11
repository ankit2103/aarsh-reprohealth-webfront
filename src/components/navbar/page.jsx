"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { loginsignup, logoimg, navbar, packageIcon } from "../element/images";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdHeartEmpty,
  IoMdLogOut,
} from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../utils/common.util";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import {
  logoutUser,
  updateToken,
  updateUser,
} from "../../redux/slice/user.slice";
import { IoMdContact } from "react-icons/io";
import { LuCalendarHeart } from "react-icons/lu";
import { BsCalendar2Check } from "react-icons/bs";

const appointments = [
  {
    img: navbar.appointmentimage1,

    id: 1,
    title: "Medical Specialists",
    path: "/medical-specialist",
  },
  {
    img: navbar.appointmentimage2,
    id: 2,
    title: "Speciality Clinics",
    path: "/speciality-clinics",
  },
  {
    img: navbar.appointmentimage3,
    id: 3,
    title: "Diagnoistic Center & Laboratories",
    path: "/diagnoistic-center-laboratories",
  },
];
const resource = [
  {
    img: navbar.resourceimg1,
    id: 1,
    title: "Knowledge Bank",
    path: "/knowledge-bank",
    // path:"/knowledge-bank-new"
  },
  { img: navbar.resourceimg2, id: 2, title: "Blogs", path: "/blogs" },
  // {
  //   img: navbar.resourceimg3,
  //   id: 3,
  //   title: "FAQs",
  //   path: "/frequently-asked-question",
  // },
];

const contactus = [
  {
    img: navbar.contactImg2,
    id: 2,
    title: "Corporate Reproductive Health Drives",
    path: "/corporate-camps",
  },
  {
    img: navbar.contactImg1,
    id: 1,
    title: "Partners & Sponsors",
    path: "/partnership-and-sponsors",
  },
  // { img: navbar.contactImg3, id: 3, title: "Engage with us", path: "/contact-us" },
];
const patientPackageOptions = [
  {
    id: 1,
    title: "Reprohealth Packages",
    path: "/package/reprohealth-package",
    img: packageIcon.icon1,
  },
  {
    id: 2,
    title: "ReproReady Wellness Sessions",
    path: "/package/reproready-wellness-sessions",
    img: packageIcon.icon1,
  },
];
const pricingOptions = [
  // {
  //   id: 1,
  //   title: "Healthcare Package",
  //   path: "/package/healthcare-package",
  //   img: packageIcon.icon1,
  // },
  {
    id: 1,
    title: "Subscription for Doctor",
    path: "/package/subscription-for-doctor",
    img: packageIcon.icon2,
  },
  {
    id: 2,
    title: "Subscription for Clinic",
    path: "/package/subscription-for-clinic",
    img: packageIcon.icon3,
  },
  {
    id: 3,
    title: "Subscription for Labs",
    path: "/package/subscription-for-labs",
    img: packageIcon.icon4,
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // e.g., 'appointments', 'resources', etc.

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAppointmentDropdownOpen, setIsAppointmentDropdownOpen] = useState(
    false
  );
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setISProfileDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isContactDropdownVisible, setIsContactDropdownVisible] = useState(
    false
  );

  const [
    isAppointmentsDropdownVisible,
    setIsAppointmentsDropdownVisible,
  ] = useState(false);
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState(false); // if you have a separate mobile toggle
  const [isPricingDropdownVisible, setIsPricingDropdownVisible] = useState(
    false
  );
  const [
    isPatientPackageDropdownOpen,
    setIsPatientPackageDropdownOpen,
  ] = useState(false);
  const [
    isPatientPackageDropdownVisible,
    setIsPatientPackageDropdownVisible,
  ] = useState(false);
  const [isFaqDropdownOpen, setIsFaqDropdownOpen] = useState(false); // if you have a separate mobile toggle
  const [isFaqDropdownVisible, setIsFaqDropdownVisible] = useState(false);
  const [isActive, setIsActive] = useState("/");
  const userInfo = useSelector((state) => state.user?.v_user_info);
  const token = useSelector((state) => state.user.x_auth_token);
  const [hasJustLoggedIn, setHasJustLoggedIn] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // console.log("login data :", userInfo);
  const dispatch = useDispatch();
  const pathname = usePathname(); // Get current route
  const router = useRouter();
  const drawerRef = useRef(null);
  const dropdownRef = useRef(null);
  const contactDropdownRef = useRef(null);
  const appointmentsDropdownRef = useRef(null);
  const pricingDropdownRef = useRef(null);
  const patientPackageDropdownRef = useRef(null);
  const faqDropdownRef = useRef(null);

  const handleLogout = () => {
    logout(dispatch);
    // dispatch(updateUser(null));
    // dispatch(updateToken(null));
    // dispatch(logoutUser(null));
    // setISProfileDropdownOpen(!isProfileDropdownOpen);
    router.push("/");
    setMenuOpen(false);
  };
  const handleUserNavigate = (path) => {
    setISProfileDropdownOpen(!isProfileDropdownOpen);
    router.push(path);
    setMenuOpen(false);
  };

  // Handle navigation and close menus
  const handleNavigate = (path) => {
    // alert("call")
    if (isAppointmentsDropdownVisible === true) {
      setIsAppointmentsDropdownVisible(false);
    } else if (isDropdownVisible === true) {
      setIsDropdownVisible(false);
    } else if (isContactDropdownVisible === true) {
      setIsContactDropdownVisible(false);
    } else if (isPricingDropdownVisible === true) {
      setIsPricingDropdownVisible(false);
    } else if (isPatientPackageDropdownVisible === true) {
      setIsPatientPackageDropdownVisible(false);
    } else if (isFaqDropdownVisible === true) {
      setIsFaqDropdownVisible(false);
    }
    setMenuOpen(false);
    setOpenDropdown(false);
    // setMenuOpen(false);
    // console.log("path-----------------", path);
    router.push(path);

    // setIsActive(path);
    // setIsDropdownOpen(false);
  };

  // Toggle dropdown visibility on click
  const toggleDropdown = (name) => {
    event.preventDefault();
    setOpenDropdown((prev) => (prev === name ? null : name));
    // setOpenDropdown(name);
  };
  const toggleAppointmentsDropdown = () => {
    setIsAppointmentsDropdownVisible((prev) => !prev);
  };
  const toggleDropdownContact = () => {
    setIsContactDropdownVisible((prev) => !prev);
  };
  const toggleDropdownPricing = () => {
    setIsPricingDropdownVisible((prev) => !prev);
  };
  const toggleDropdownPatientPackage = () => {
    setIsPatientPackageDropdownVisible((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    // e.preventDefault();
    // alert("profile :",isProfileDropdownOpen)
    // setISProfileDropdownOpen(!isProfileDropdownOpen);
    setISProfileDropdownOpen((prev) => !prev);
  };

  // Ensure dropdown stays open while hovering over button or dropdown
  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  // Delay hiding the dropdown to allow cursor transition
  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.matches(":hover")) {
        setIsDropdownVisible(false);
      }
    }, 200); // Small delay to ensure smooth transition
  };
  const handleMouseEnterAppointments = () => {
    setIsAppointmentsDropdownVisible(true);
  };
  const handleMouseLeaveAppointments = () => {
    setTimeout(() => {
      if (!appointmentsDropdownRef.current?.matches(":hover")) {
        setIsAppointmentsDropdownVisible(false);
      }
    }, 200);
  };
  const handleMouseEnterContact = () => {
    setIsContactDropdownVisible(true);
  };
  const handleMouseLeaveContact = () => {
    setTimeout(() => {
      if (!contactDropdownRef.current?.matches(":hover")) {
        setIsContactDropdownVisible(false);
      }
    }, 100);
  };
  const handleMouseEnterPricing = () => {
    setIsPricingDropdownVisible(true);
  };
  const handleMouseLeavePricing = () => {
    setTimeout(() => {
      if (!pricingDropdownRef.current?.matches(":hover")) {
        setIsPricingDropdownVisible(false);
      }
    }, 200);
  };

  const handleMouseEnterPatientPackage = () => {
    setIsPatientPackageDropdownVisible(true);
  };
  const handleMouseLeavePatientPackage = () => {
    setTimeout(() => {
      if (!patientPackageDropdownRef.current?.matches(":hover")) {
        setIsPatientPackageDropdownVisible(false);
      }
    }, 200);
  };
  // const handleMouseEnterFaq = () => {
  //   setIsFaqDropdownVisible(true);
  // };
  // const handleMouseLeaveFaq = () => {
  //   setTimeout(() => {
  //     if (!faqDropdownRef.current?.matches(":hover")) {
  //       setIsFaqDropdownVisible(false);
  //     }
  //   }, 200);
  // };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutsideContact = (event) => {
      if (
        contactDropdownRef.current &&
        !contactDropdownRef.current.contains(event.target)
      ) {
        setIsContactDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideContact);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideContact);
  }, []);
  useEffect(() => {
    const handleClickOutsideAppointments = (event) => {
      if (
        appointmentsDropdownRef.current &&
        !appointmentsDropdownRef.current.contains(event.target)
      ) {
        setIsAppointmentsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideAppointments);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAppointments);
    };
  }, []);
  useEffect(() => {
    const handleClickOutsidePricing = (event) => {
      if (
        pricingDropdownRef.current &&
        !pricingDropdownRef.current.contains(event.target)
      ) {
        setIsPricingDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsidePricing);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePricing);
    };
  }, []);
  useEffect(() => {
    const handleClickOutsidePatientPackage = (event) => {
      if (
        patientPackageDropdownRef.current &&
        !patientPackageDropdownRef.current.contains(event.target)
      ) {
        setIsPatientPackageDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsidePatientPackage);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsidePatientPackage
      );
    };
  }, []);
  useEffect(() => {
    if (userInfo && token && hasJustLoggedIn) {
      setISProfileDropdownOpen(false);
      setHasJustLoggedIn(false); // prevent resetting again
    }
  }, [userInfo, token]);

  return (
    <div className="w-full ">
      <div className="fixed top-0 z-50 left-0 w-full bg-white shadow-sm">
        <div className="navbar-container   flex justify-between items-center xl:px-8 px-4 py-4 w-full">
          {/* Logo */}
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <Image
              src={logoimg.logo}
              alt="logo"
              width={180}
              height={40}
              className="w-[180px]  lg:w-[250px]"
            />
          </div>

          {/* Hamburger Menu Button */}
          <div className="block lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Drawer Menu (Mobile) */}
          <div
            ref={drawerRef}
            className={`${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-0 bg-white z-50 transition-transform w-72 shadow-lg lg:hidden`}
          >
            <div className="flex flex-col items-start p-6 space-y-6">
              <Link
                href="/"
                onClick={() => handleNavigate("/")}
                // setMenuOpen(false)
                className={`cursor-pointer
                  ${
                    pathname === "/"
                      ? "text-[var(--lightBlue)]"
                      : "hover:text[var(--lightBlue)]"
                  }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => handleNavigate("/about")}
                className={
                  pathname === "/about"
                    ? "text-[var(--lightBlue)]"
                    : "hover:text[var(--lightBlue)]"
                }
              >
                About
              </Link>
              {/* appointments mobile view */}
              <div>
                <p
                  className={`flex gap-2 items-center font-light cursor-pointer ${
                    openDropdown === "appointments"
                      ? "text-[var(--lightBlue)]"
                      : "black"
                  }`}
                  onClick={() => toggleDropdown("appointments")}
                >
                  Appointments{" "}
                  {openDropdown === "appointments" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </p>
                {openDropdown === "appointments" && (
                  <div className="mt-1">
                    <li
                      onClick={() => handleNavigate("/medical-specialist")}
                      className={` block pl-4 py-3 cursor-pointer ${
                        pathname === "/medical-specialist"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      Medical Specialists
                    </li>
                    <li
                      onClick={() => handleNavigate("/speciality-clinics")}
                      className={`block pl-4 pb-3 cursor-pointer ${
                        pathname === "/speciality-clinics"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      Speciality Clinics
                    </li>
                    <li
                      onClick={() =>
                        handleNavigate("/diagnoistic-center-laboratories")
                      }
                      className={`block pl-4 pb-3 cursor-pointer ${
                        pathname === "/diagnoistic-center-laboratories"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      Diagnoistic Center & Laboratories
                    </li>
                  </div>
                )}
              </div>
              {/* resources mobile view */}
              <div>
                <p
                  className={`flex gap-2 items-center font-light cursor-pointer ${
                    openDropdown === "resources"
                      ? "text-[var(--lightBlue)]"
                      : "black"
                  }`}
                  onClick={() => toggleDropdown("resources")}
                >
                  Resources{" "}
                  {openDropdown === "resources" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </p>
                {openDropdown === "resources" && (
                  <div className="mt-1">
                    <li
                      onClick={() => handleNavigate("/knowledge-bank")}
                      className={`block pl-4 py-3 cursor-pointer ${
                        pathname === "/knowledge-bank"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      Knowledge Bank
                    </li>
                    <li
                      onClick={() => handleNavigate("/blogs")}
                      className={`block pl-4 pb-3 cursor-pointer ${
                        pathname === "/blogs" ? "text-[var(--lightBlue)]" : ""
                      } text-nowrap`}
                    >
                      Blogs
                    </li>
                  </div>
                )}
              </div>
              {/* FAQs mobile view */}
              <Link
                href="/frequently-asked-question"
                onClick={() => handleNavigate("/frequently-asked-question")}
                className={
                  pathname === "/frequently-asked-question"
                    ? "text-[var(--lightBlue)]"
                    : "hover:text[var(--lightBlue)]"
                }
              >
                FAQs
              </Link>

              {/* Engage with Us mobile view */}
              <div>
                <p
                  className={`flex gap-2 items-center font-light cursor-pointer ${
                    openDropdown === "engagewithus"
                      ? "text-[var(--lightBlue)]"
                      : "black"
                  }`}
                  onClick={() => toggleDropdown("engagewithus")}
                >
                  Engage with Us{" "}
                  {openDropdown === "engagewithus" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </p>
                {openDropdown === "engagewithus" && (
                  <div className="mt-1">
                    <li
                      onClick={() => handleNavigate("/corporate-camps")}
                      className={`block pl-4 py-3 cursor-pointer ${
                        pathname === "/corporate-camps"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-wrap`}
                    >
                      Corporate Reproductive Health Drives
                    </li>
                    <li
                      onClick={() =>
                        handleNavigate("/partnership-and-sponsors")
                      }
                      className={`block pl-4 pb-3 cursor-pointer ${
                        pathname === "/partnership-and-sponsors"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      Partners & Sponsors
                    </li>
                  </div>
                )}
              </div>
              {/* patient packages mobile view */}
              <div>
                <p
                  className={`flex gap-2 items-center font-light cursor-pointer ${
                    openDropdown === "patientPackages"
                      ? "text-[var(--lightBlue)]"
                      : "black"
                  }`}
                  onClick={() => toggleDropdown("patientPackages")}
                >
                  Patient Packages{" "}
                  {openDropdown === "patientPackages" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </p>
                {openDropdown === "patientPackages" && (
                  <div className="mt-1">
                    <li
                      onClick={() =>
                        handleNavigate("/package/reprohealth-package")
                      }
                      className={`block pl-4 py-3 cursor-pointer ${
                        pathname === "/package/reprohealth-package"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      ReproHealth Packages
                    </li>
                    <li
                      onClick={() =>
                        handleNavigate("/package/reproready-wellness-sessions")
                      }
                      className={`block pl-4 pb-3 cursor-pointer ${
                        pathname === "/package/reproready-wellness-sessions"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      ReproReady Wellness Sessions
                    </li>
                  </div>
                )}
              </div>

              {/* pricing mobile view */}
              <div>
                <p
                  className={`flex gap-2 items-center font-light cursor-pointer ${
                    openDropdown === "pricing"
                      ? "text-[var(--lightBlue)]"
                      : "black"
                  }`}
                  onClick={() => toggleDropdown("pricing")}
                >
                  Pricing Plans{" "}
                  {openDropdown === "pricing" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </p>
                {openDropdown === "pricing" && (
                  <div className="mt-1">
                    {/* <li
                      onClick={() =>
                        handleNavigate("/package/healthcare-package")
                      }
                      className={`block pl-4 py-3 cursor-pointer ${
                        pathname === "/package/healthcare-package"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      Healthcare Package
                    </li> */}
                    <li
                      onClick={() =>
                        handleNavigate("/package/subscription-for-doctor")
                      }
                      className={`block pl-4 pb-3 cursor-pointer ${
                        pathname === "/package/subscription-for-doctor"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      Subscription for Doctors
                    </li>
                    <li
                      onClick={() =>
                        handleNavigate("/package/subscription-for-clinic")
                      }
                      className={`block pl-4 pb-3 cursor-pointer ${
                        pathname === "/package/subscription-for-clinic"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      Subscription for Clinics
                    </li>
                    <li
                      onClick={() =>
                        handleNavigate("/package/subscription-for-labs")
                      }
                      className={`block pl-4 pb-3 cursor-pointer ${
                        pathname === "/package/subscription-for-labs"
                          ? "text-[var(--lightBlue)]"
                          : ""
                      } text-nowrap`}
                    >
                      Subscription for Labs
                    </li>
                  </div>
                )}
              </div>
              {/* Profile dropdown mobile view */}
              {userInfo ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="bg-[var(--brightgray)] w-[90%] rounded-full px-2 py-1  inline-block"
                  >
                    <div className="flex gap-2  items-center">
                      <div className="max-w-[40px] max-h-[40px] rounded-full">
                        <Image
                          src={loginsignup.profileimg}
                          alt="Profile"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex flex-col items-start text-sm">
                        <p className="text-[var(--black)] capitalize">
                          {userInfo?.name}
                        </p>
                        <p className="text-[var(--lightBlue)] lowercase">
                          {userInfo?.email}
                        </p>
                      </div>
                      {isProfileDropdownOpen ? (
                        <IoIosArrowUp className="w-20 " />
                      ) : (
                        <IoIosArrowDown className="w-20 " />
                      )}
                    </div>
                  </button>
                  {userInfo !== null &&
                    token !== null &&
                    isProfileDropdownOpen && (
                      <div className="absolute mt-3 w-[200px] md:w-[200px] rounded-none md:rounded-2xl md:shadow-lg">
                        <div className="flex flex-col gap-2 items-start p-0 md:p-2 ">
                          <button
                            onClick={() =>
                              handleNavigate("/profile/user-profile")
                            }
                            className="cursor-pointer flex justify-start items-center  gap-4  border-b-2 border-[var(--brightgray)] hover:bg-[var(--brightgray)]  hover:rounded-md px-0 py-2 md:p-2 w-full"
                          >
                            <GoPerson className="text-md md:text-2xl font-[400]" />
                            <span className="font-[500] text-sm text-[greyP] cursor-pointer">
                              Profile Settings
                            </span>
                          </button>

                          <button
                            onClick={() =>
                              handleNavigate("/profile/my-booked-appointments")
                            }
                            className="flex justify-start items-center  gap-4 border-b-2 border-[var(--brightgray)] hover:bg-[var(--brightgray)]  hover:rounded-md   px-0 py-2 md:p-2  w-full"
                          >
                            <BsCalendar2Check className="text-md md:text-2xl font-[400]" />
                            <span className="font-[500] text-sm  text-[greyP]">
                              Appointments
                            </span>
                          </button>

                          <button
                            onClick={() => handleLogout()}
                            className="flex justify-start items-center gap-4 border-b-2 border-[var(--brightgray)] hover:bg-[var(--brightgray)]  hover:rounded-md  px-0 py-2 md:p-2  w-full text-[var(--red)]"
                          >
                            <IoMdLogOut className="text-md md:text-2xl font-[400] " />
                            <span className="font-[500] text-sm ">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                 <div className="flex flex-col gap-2">
                <button
                  className="border border-[var(--lightBlue)] px-6 py-3 rounded-full bg-white text-[var(--lightBlue)]"
                  onClick={() => handleNavigate("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="bg-[var(--lightBlue)] px-6 py-3 rounded-full text-white"
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </button>
              </div>
              )}
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex">
            <ul className="flex items-center sm:gap-3 md:gap-3 lg:gap-6 ">
              <li
                className={`${
                  pathname === "/" ? "text-[var(--lightBlue)]" : ""
                } hover:text-[var(--lightBlue)]`}
              >
                <Link
                  href="/"
                  onClick={() => handleNavigate("/")}
                  className="hover:text-[var(--lightBlue)]"
                >
                  Home
                </Link>
              </li>
              <li
                className={`${
                  pathname === "/about" ? "text-[var(--lightBlue)]" : ""
                } hover:text-[var(--lightBlue)]`}
              >
                <Link
                  href="/about"
                  onClick={() => handleNavigate("/about")}
                  className="hover:text-[var(--lightBlue)]"
                >
                  About
                </Link>
              </li>

              <div
                ref={appointmentsDropdownRef}
                className="relative inline-block"
                onMouseEnter={handleMouseEnterAppointments}
                onMouseLeave={handleMouseLeaveAppointments}
              >
                {/* Button to toggle dropdown */}
                <p
                  onClick={toggleAppointmentsDropdown}
                  // className="focus:outline-none hover:text-[var(--lightBlue)]"
                  className={`focus:outline-none hover:text-[var(--lightBlue)] font-light cursor-pointer ${
                    isAppointmentsDropdownVisible
                      ? "text-[var(--lightBlue)]"
                      : "text-[var(--black)]"
                  }`}
                >
                  Appointments
                </p>

                {/* Dropdown Menu */}
                {isAppointmentsDropdownVisible && (
                  <div className="mt-4 px-8 py-10 w-[1000px] fixed top-[60px] left-1/2 -translate-x-1/2 bg-white rounded-2xl">
                    {/* absolute left-1/2 -translate-x-1/2 */}
                    <div className="flex flex-row gap-6  items-start ">
                      <div className=" w-[40%]">
                        {/* <h2 className="text-[var(--lightBlue)] text-3xl ">Resources</h2> */}
                        <p className=" text-[var(--greyP)]  space-y-2">
                          More than just a consultation platform—Aarsh Repro
                          Health is a modern, compassionate space where
                          reproductive health meets expert guidance,
                          personalized care, and a supportive community.
                        </p>
                      </div>

                      <div className="w-[30%] ">
                        {appointments.map((item, index) => {
                          return (
                            <div
                              key={item.id}
                              className="w-full flex justify-between items-center mb-4 "
                            >
                              <div className="w-full flex items-center gap-3  ">
                                <Image
                                  src={item.img}
                                  alt="not found"
                                  width={"20px"}
                                  height={"20px"}
                                  className="w-[36px]"
                                />
                                <div
                                  onClick={() => handleNavigate(item.path)}
                                  className="w-full  hover:text-[var(--lightBlue)] group cursor-pointer flex  items-center justify-between "
                                >
                                  <Link
                                    href={item.path}
                                    onClick={() => handleNavigate(item.path)}
                                    className={`block   text-wrap  ${
                                      pathname === item.path
                                        ? "text-[var(--lightBlue)]"
                                        : ""
                                    }`}
                                  >
                                    {item.title}
                                  </Link>
                                  <span
                                    className={`text-center group-hover:text-[var(--lightBlue)] ${
                                      pathname === item.path
                                        ? "text-[var(--lightBlue)]"
                                        : " text-[var(--pink)]"
                                    }`}
                                  >
                                    {/* hover:text-[var(--lightBlue)] */}
                                    <FaArrowRight className="text-inherit" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-[30%]">
                        <Image
                          src={navbar.appointmentIllustration}
                          alt="not found"
                          width={"100%"}
                          height={"100%"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Resoureces */}
              <div
                ref={dropdownRef}
                className="relative inline-block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Button to toggle dropdown */}
                <p
                  onClick={toggleDropdown}
                  className={`focus:outline-none hover:text-[var(--lightBlue)] font-light cursor-pointer ${
                    isDropdownVisible
                      ? "text-[var(--lightBlue)]"
                      : "text-[var(--black)]"
                  }`}
                >
                  Resources
                </p>

                {/*Resources Dropdown Menu */}
                {isDropdownVisible && (
                  <div className="absolute mt-4 px-8 py-10 w-[1000px] left-1/2 -translate-x-1/2 bg-white rounded-2xl ">
                    <div className="flex flex-row gap-6  items-start ">
                      <div className=" w-[40%]">
                        {/* <h2 className="text-[var(--lightBlue)] text-3xl ">Resources</h2> */}
                        <p className=" text-[var(--greyP)]  space-y-2">
                          More than just a consultation platform—Aarsh Repro
                          Health is a modern, compassionate space where
                          reproductive health meets expert guidance,
                          personalized care, and a supportive community.
                        </p>
                      </div>

                      <div className="w-[30%] ">
                        {resource.map((item, index) => {
                          return (
                            <div
                              key={item.id}
                              className="flex justify-between items-center mb-4"
                            >
                              <div className="w-full flex items-center  gap-3">
                                <Image
                                  src={item.img}
                                  alt="not found"
                                  width={"20px"}
                                  height={"20px"}
                                  className="w-[36px]"
                                />
                                <div
                                  onClick={() => handleNavigate(item.path)}
                                  className="w-full hover:text-[var(--lightBlue)] group cursor-pointer  flex  items-center justify-between"
                                >
                                  <Link
                                    href={item.path}
                                    className={`w-full block   text-nowrap ${
                                      pathname === item.path
                                        ? "text-[var(--lightBlue)]"
                                        : ""
                                    }`}
                                  >
                                    {item.title}
                                  </Link>
                                  <span
                                    className={` text-center group-hover:text-[var(--lightBlue)] ${
                                      pathname === item.path
                                        ? "text-[var(--lightBlue)]"
                                        : " text-[var(--pink)]"
                                    }`}
                                  >
                                    <FaArrowRight />
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-[30%] ">
                        <Image
                          src={navbar.resourcesIllustration}
                          alt="not found"
                          width={"100%"}
                          height={"100%"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* FAQ */}
              <li
                className={`${
                  pathname === "/frequently-asked-question"
                    ? "text-[var(--lightBlue)]"
                    : ""
                } hover:text-[var(--lightBlue)]`}
              >
                <Link
                  href="/frequently-asked-question"
                  onClick={() => handleNavigate("/frequently-asked-question")}
                  className="hover:text[var(--lightBlue)]"
                >
                  FAQs
                </Link>
              </li>
              {/* <div
                ref={faqDropdownRef}
                className="relative inline-block"
                onMouseEnter={handleMouseEnterFaq}
                onMouseLeave={handleMouseLeaveFaq}
              >
                <p
                  onClick={toggleDropDownFaq}
                  className={`focus:outline-none hover:text-[var(--lightBlue)] font-light ${
                    isFaqDropdownVisible
                      ? "text-[var(--lightBlue)]"
                      : "text-[var(--black)]"
                  }`}
                >
                  FAQs
                </p>

               
              </div> */}
              {/* engage with us */}
              <div
                ref={contactDropdownRef}
                className="relative inline-block"
                onMouseEnter={handleMouseEnterContact}
                onMouseLeave={handleMouseLeaveContact}
              >
                {/* Button to toggle dropdown */}
                <p
                  onClick={toggleDropdownContact}
                  // className="focus:outline-none hover:text-[var(--lightBlue)]"
                  className={`focus:outline-none hover:text-[var(--lightBlue)] font-light cursor-pointer ${
                    isContactDropdownVisible
                      ? "text-[var(--lightBlue)]"
                      : "text-[var(--black)]"
                  }`}
                >
                  Engage with Us
                </p>
                {/* {`${isActive==="/appointments"? "text-[var(--lightBlue)]" :""}`} */}
                {/* Dropdown Menu */}
                {isContactDropdownVisible && (
                  <div className="mt-4 px-8 py-10 w-[1000px] fixed top-[60px] left-1/2 -translate-x-1/2 bg-white rounded-2xl">
                    {/* absolute -left-3/4 -translate-x-1/2*/}
                    <div className="flex flex-row gap-6  items-start ">
                      <div className=" w-[40%]">
                        {/* <h2 className="text-[var(--lightBlue)] text-3xl ">Resources</h2> */}
                        <p className=" text-[var(--greyP)]  space-y-2  w-full lg:w-[90%]">
                          More than just a consultation platform—Aarsh Repro
                          Health is a modern, compassionate space where
                          reproductive health meets expert guidance,
                          personalized care, and a supportive community.
                        </p>
                      </div>

                      <div className="w-[30%] ">
                        {contactus.map((item, index) => {
                          return (
                            <div
                              key={item.id}
                              className="w-full flex justify-between items-center mb-4"
                            >
                              <div className="w-full flex items-center gap-5">
                                <Image
                                  src={item.img}
                                  alt="not found"
                                  width={"20px"}
                                  height={"20px"}
                                  className="w-[36px]"
                                />
                                <div
                                  onClick={() => handleNavigate(item.path)}
                                  className="w-full hover:text-[var(--lightBlue)] group cursor-pointer flex  items-center justify-between"
                                >
                                  <Link
                                    href={item.path}
                                    // onClick={() => handleNavigate(item.path)}
                                    className={`w-full block  text-wrap ${
                                      pathname === item.path
                                        ? "text-[var(--lightBlue)]"
                                        : ""
                                    }`}
                                  >
                                    {item.title}
                                  </Link>
                                  <span
                                    className={` text-center group-hover:text-[var(--lightBlue)] ${
                                      pathname === item.path
                                        ? "text-[var(--lightBlue)]"
                                        : "text-[var(--pink)]"
                                    }`}
                                  >
                                    <FaArrowRight />
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-[30%] rounded-xl">
                        <Image
                          src={navbar.engagewithusIllustration}
                          alt="not found"
                          width={"100%"}
                          height={"100%"}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* patient packages */}
              <div
                ref={patientPackageDropdownRef}
                className="relative inline-block"
                onMouseEnter={handleMouseEnterPatientPackage}
                onMouseLeave={handleMouseLeavePatientPackage}
              >
                <p
                  onClick={toggleDropdownPatientPackage}
                  className={`focus:outline-none hover:text-[var(--lightBlue)] font-light cursor-pointer ${
                    isPatientPackageDropdownVisible
                      ? "text-[var(--lightBlue)]"
                      : "text-[var(--black)]"
                  }`}
                >
                  Patient Packages
                </p>

                {isPatientPackageDropdownVisible && (
                  <div className="mt-4 px-10 py-10 w-[850px] fixed top-[60px] left-1/2 -translate-x-1/2 bg-white rounded-2xl z-50">
                    <div className="flex flex-row gap-6 items-start">
                      {/* Description */}
                      <div className="w-[30%]">
                        <p className="text-[var(--greyP)] space-y-2 w-full">
                          Discover curated packages crafted to elevate patient
                          wellness and provide holistic care — customized just
                          for them.
                        </p>
                      </div>

                      {/* Package Links */}
                      <div className="w-[40%]">
                        {patientPackageOptions.map((item) => (
                          <div
                            key={item.id}
                            className="w-full flex justify-between items-center mb-4"
                          >
                            <div className="w-full flex items-center gap-3">
                              <Image
                                src={item.img}
                                alt="icon"
                                width={20}
                                height={20}
                                className="w-[36px]"
                              />
                              <div
                                onClick={() => handleNavigate(item.path)}
                                className="w-full hover:text-[var(--lightBlue)] group cursor-pointer flex items-center justify-between"
                              >
                                <Link
                                  href={item.path}
                                  className={`w-full block text-nowrap ${
                                    pathname === item.path
                                      ? "text-[var(--lightBlue)]"
                                      : ""
                                  }`}
                                >
                                  {item.title}
                                </Link>
                                <span
                                  className={`text-center group-hover:text-[var(--lightBlue)] ${
                                    pathname === item.path
                                      ? "text-[var(--lightBlue)]"
                                      : "text-[var(--pink)]"
                                  }`}
                                >
                                  <FaArrowRight />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Illustration */}
                      <div className="w-[30%]">
                        <Image
                          src={navbar.pricingIllustration} // 🌈 Replace with your image path
                          alt="illustration"
                          width={"100%"}
                          height={"100%"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* pricing */}
              <div
                ref={pricingDropdownRef}
                className="relative inline-block"
                onMouseEnter={handleMouseEnterPricing}
                onMouseLeave={handleMouseLeavePricing}
              >
                <p
                  onClick={toggleDropdownPricing}
                  className={`focus:outline-none hover:text-[var(--lightBlue)] font-light cursor-pointer ${
                    isPricingDropdownVisible
                      ? "text-[var(--lightBlue)]"
                      : "text-[var(--black)]"
                  }`}
                >
                  Pricing Plans
                </p>

                {isPricingDropdownVisible && (
                  // -translate-y-1/2
                  <div className="mt-4 px-8 py-10 w-[1000px] fixed top-[60px] left-1/2 -translate-x-1/2  bg-white rounded-2xl">
                    {/* fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 ||  absolute  -left-3/4 -translate-x-1/2 */}
                    <div className="flex flex-row gap-6 items-start">
                      <div className="w-[20%]">
                        <p className="text-[var(--greyP)] space-y-2 w-full lg:w-[90%]">
                          Explore flexible pricing plans designed to suit
                          individuals, families, and businesses of all sizes.
                          Get the care you need, at a price that fits.
                        </p>
                      </div>

                      <div className="w-[25%]">
                        {pricingOptions.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className="w-full flex justify-between items-center mb-4"
                          >
                            <div className="w-full flex items-center gap-3">
                              <Image
                                src={item.img}
                                alt="icon"
                                width={20}
                                height={20}
                                className="w-[36px]"
                              />
                              <div
                                onClick={() => handleNavigate(item.path)}
                                className="w-full hover:text-[var(--lightBlue)] group cursor-pointer  flex  items-center justify-between"
                              >
                                <Link
                                  href={item.path}
                                  // onClick={() => handleNavigate(item.path)}
                                  className={`w-full block text-nowrap ${
                                    pathname === item.path
                                      ? "text-[var(--lightBlue)]"
                                      : ""
                                  }`}
                                >
                                  {item.title}
                                </Link>
                                <span
                                  className={` text-center group-hover:text-[var(--lightBlue)] ${
                                    pathname === item.path
                                      ? "text-[var(--lightBlue)]"
                                      : " text-[var(--pink)]"
                                  }`}
                                >
                                  <FaArrowRight />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-[25%]">
                        {pricingOptions.slice(2, 4).map((item) => (
                          <div
                            key={item.id}
                            className="w-full flex justify-between items-center mb-4"
                          >
                            <div className="w-full  flex items-center gap-3">
                              <Image
                                src={item.img}
                                alt="icon"
                                width={20}
                                height={20}
                                className="w-[36px]"
                              />
                              <div className="w-full hover:text-[var(--lightBlue)] group cursor-pointer flex  items-center justify-between">
                                <Link
                                  href={item.path}
                                  onClick={() => handleNavigate(item.path)}
                                  className={`w-full block  text-nowrap ${
                                    pathname === item.path
                                      ? "text-[var(--lightBlue)]"
                                      : ""
                                  }`}
                                >
                                  {item.title}
                                </Link>
                                <span
                                  className={`text-center   group-hover:text-[var(--lightBlue)] ${
                                    pathname === item.path
                                      ? "text-[var(--lightBlue)]"
                                      : "text-[var(--pink)]"
                                  }`}
                                >
                                  <FaArrowRight />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="w-[30%] ">
                        <Image
                          src={navbar.pricingIllustration}
                          alt="not found"
                          width={"100%"}
                          height={"100%"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ul>
          </div>

          {/* Login Button */}
          <div className="hidden lg:block">
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="bg-[var(--brightgray)] rounded-full md:px-2 md:py-1  relative inline-block"
                >
                  <div className="flex md:gap-2 lg:gap-4 items-center ">
                    <div className="md:max-w-[30px] md:max-h-[30px] lg:max-w-[36px] lg:max-h-[36px] w-[36px] h-[36px] rounded-full ">
                      {userInfo?.profilePic ? (
                        <Image
                          src={userInfo?.profilePic}
                          alt="Profile"
                          width={36}
                          height={36}
                          className=" object-contain rounded-full md:max-w-[30px] md:max-h-[30px]  lg:max-w-[36px] lg:max-h-[36px] w-[36px] h-[36px] bg-[var(--White)] "
                        />
                      ) : (
                        <IoMdContact className="w-[36px] h-[36px] bg-[var(--White)] rounded-full text-[var(--lightBlue)]" />
                      )}
                    </div>
                    <div className="flex flex-col items-start text-sm">
                      <p className="text-[var(--black)] capitalize">
                        {userInfo?.name}
                      </p>
                      <p className="text-[var(--lightBlue)] lowercase">
                        {userInfo?.email}
                      </p>
                    </div>
                    {isProfileDropdownOpen ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </div>
                </button>

                {/* 🔹 Ensure dropdown only appears when both conditions are met */}
                {userInfo !== null && token !== null && isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-[260px] bg-white rounded-2xl shadow-lg">
                    <div className="flex flex-col gap-2 items-start px-2 py-2">
                      {/* Profile Settings */}
                      <button
                        onClick={() =>
                          handleUserNavigate("/profile/user-profile")
                        }
                        className="flex gap-4 border-b-2 border-[var(--brightgray)] hover:bg-[var(--brightgray)]  hover:rounded-md  px-2 py-2 w-full"
                      >
                        <GoPerson className="text-xl font-[400]" />
                        <span className=" font-[500] text-sm text-[greyP]">
                          Profile Settings
                        </span>
                      </button>

                      {/* Wishlist */}
                      <button
                        onClick={() =>
                          handleUserNavigate("/profile/my-booked-appointments")
                        }
                        className="flex gap-4 border-b-2 border-[var(--brightgray)] hover:bg-[var(--brightgray)]  hover:rounded-md  px-2 py-2 w-full"
                      >
                        <BsCalendar2Check className="text-xl font-[400]" />
                        <span className=" font-[500]  text-sm text-[greyP]">
                          My Appointments
                        </span>
                      </button>

                      {/* Logout */}
                      <button
                        onClick={() => handleLogout()}
                        className="flex gap-4 border-b-2 border-[var(--brightgray)] hover:bg-[var(--brightgray)]  hover:rounded-md  px-2 py-2 w-full text-[var(--red)]"
                      >
                        <IoMdLogOut className="text-xl font-[400] " />
                        <span className=" font-[500]  text-sm ">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  className="border border-[var(--lightBlue)] px-6 py-3 rounded-full bg-white text-[var(--lightBlue)]"
                  onClick={() => handleNavigate("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="bg-[var(--lightBlue)] px-6 py-3 rounded-full text-white"
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*absolute -left-3/4 -translate-x-1/2 */
}
//  {isFaqDropdownVisible && (
//                   <div className=" mt-4 px-8 py-10 w-[1000px]  fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl">

//                     <div className="flex flex-row gap-6 items-start">
//                       <div className="w-[40%]">
//                         <p className="text-[var(--greyP)] space-y-2 w-full lg:w-[90%]">
//                           Fertility services are designed for individuals and
//                           couples of all genders and orientations who are
//                           planning to start or grow their families. Whether
//                           you're just exploring options or have been trying for
//                           some time, we’re here to support your journey.
//                         </p>
//                       </div>

//                       <div className="w-[30%]">
//                         {faq.map((item) => (
//                           <div
//                             key={item.id}
//                             className="flex justify-between items-center mb-4"
//                           >
//                             <div className="flex items-center gap-3">
//                               <Image
//                                 src={item.img}
//                                 alt="icon"
//                                 width={20}
//                                 height={20}
//                                 className="w-[36px]"
//                               />
//                               <Link
//                                 href={item.path}
//                                 onClick={() => handleNavigate(item.path)}
//                                 className={`block hover:text-[var(--lightBlue)] text-nowrap ${
//                                   pathname === item.path
//                                     ? "text-[var(--lightBlue)]"
//                                     : ""
//                                 }`}
//                               >
//                                 {item.title}
//                               </Link>
//                             </div>
//                             <div className="text-center text-[var(--pink)]">
//                               <FaArrowRight />
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="w-[30%] ">
//                         <Image
//                           src={navbar.helpcenterIllustration}
//                           alt="not found"
//                           width={"100%"}
//                           height={"100%"}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
