"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@mui/material";
import toast from "react-toastify";
// import Sidebar from "../../../components/sidebar/page";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  getUserAllBookedAppointment,
  getUserAppointmentCancle,
} from "../../../utils/user/user.util";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlineVoicemail } from "react-icons/md";
import Image from "next/image";
import { illustration } from "../../../components/element/images";

const AppointmentCardSkeleton = () => {
  return (
    <div className="w-full bg-white p-4 rounded-2xl border animate-pulse">
      <div className="flex justify-between items-start">
        {/* Left: Date Box */}
        <div className="uppercase text-center border border-gray-300 rounded-md px-4 py-4 w-[50px] flex flex-col items-center">
          <div className="h-4 w-6 bg-gray-300 rounded mb-1" />
          <div className="h-4 w-8 bg-gray-300 rounded" />
        </div>

        {/* Right: Details */}
        <div className="flex-1 ml-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-56" />
          <div className="h-4 bg-gray-300 rounded w-40" />
          <div className="h-4 bg-gray-300 rounded w-32" />

          <div className="h-4 bg-gray-300 rounded w-28 mt-2" />
          <div className="h-4 bg-gray-300 rounded w-24" />
        </div>

        {/* Status Pill */}
        <div className="h-6 w-14 bg-gray-300 rounded-full" />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <div className="h-8 w-36 bg-gray-300 rounded-full" />
        <div className="h-8 w-24 bg-gray-300 rounded-full" />
        <div className="h-8 w-20 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

const OnlineConsultations = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [numRowsPerPage, setNumRowsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleDownloadInvoice = (invoiceUrl) => {
    alert("call")
    const link = document.createElement("a");
    link.href = invoiceUrl;
    link.download = "invoice.pdf"; // Optional: You can extract filename from URL if needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Search Handler
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  };
  const filteredData = searchQuery
    ? data?.filter((item) => {
        const search = searchQuery.toLowerCase();
        return (
          item?.doctorName?.toLowerCase().includes(search) ||
          item?.name?.toLowerCase().includes(search) ||
          item?.status?.toLowerCase().includes(search) ||
          item?.mode?.toLowerCase().includes(search) ||
          item?.day?.toLowerCase().includes(search)
        );
      })
    : data;

  // console.log("Data--------------------------", data);
  const totalPages = Math.ceil(data?.length / numRowsPerPage);

  const paginatedData = searchQuery
    ? filteredData // show all filtered results if searching
    : filteredData?.slice(
        (currentPage - 1) * numRowsPerPage,
        currentPage * numRowsPerPage
      );
  const formatDateWithoutYear = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short" };

    const formatted = date.toLocaleDateString("en-GB", options);
    const [day, month] = formatted.split(" ");
    return { day, month };
  };

  // const handleJoin = (appointmentId) => {
  //   setCurrentAppointmentId(appointmentId);
  //   router.push(`/profile/my-booked-appointments/${appointmentId}`);
  // };
  const handleJoin = (item) => {
    if (item?.isclick && item?.guestUrl) {
      window.open(item.guestUrl, "_blank"); // opens in a new tab
    }
    //  else {
    //   setCurrentAppointmentId(item?._id);
    //   router.push(`/profile/my-booked-appointments/${item?._id}`);
    // }
  };

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    // Remove duplicates while preserving order
    return [...new Set(pages)];
  };

  const handleCancleAppointment = async (appointmentId) => {
    // console.log("appointmentId to cancle:", appointmentId);
    try {
      const result = await getUserAppointmentCancle(appointmentId);
      // console.log("Result of Appointment:",result);
      if (result.code == 200) {
        fetchAppointmentList();
      }
    } catch (error) {
      console.log("Handle cancle Appointment:", error);
    }
  };

  const fetchAppointmentList = async () => {
    try {
      setLoading(true);
      const dataToSend = { type: "onlineDoctor" };
      const result = await getUserAllBookedAppointment(dataToSend);
      console.log("result of online---------------------", result);
      if (result?.code === 200) {
        const onlineData = result?.data?.filter(
          (item) =>
            (item?.mode === "online" &&
              item?.type === "doctorVideoConsultation") ||
            item.type === "doctorVoiceConsultation"
        );
        setData(onlineData);
      }
    } catch (error) {
      console.log("getUserAllBookedAppointment Error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAppointmentList();
  }, []);
  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="px-2 lg:px-4 w-full">
        <Input
          // fullWidth
          placeholder="Search by doctor, mode, status etc..."
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            mt: 3,
            width: {
              xs: "100%", // full width on mobile
              sm: "100%", // full width on tablets
              md: "50%", // 50% width on medium and above
            },
            border: 1,
            borderRadius: "10px",
            borderColor: "var(--Iron)",
            paddingY: 1,
            paddingX: 2,
            "&::before": {
              display: "none",
            },
            "&::after": {
              display: "none",
            },
            "&:focus-within": {
              borderColor: "var(--lightBlue)", // Border color on focus
            },
          }}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <AppointmentCardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          {paginatedData?.length > 0 ? (
            <div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 lg:px-4 mt-4">
                {paginatedData.map((item, index) => {
                  const { day, month } = formatDateWithoutYear(item.date);
                  return (
                    <div
                      key={item?.appointmentId}
                      className="w-full bg-[var(--White)] p-4 rounded-2xl border flex flex-col justify-between"
                    >
                      <div className="flex flex-row gap-4">
                        <div className="py-2">
                          <div className="uppercase text-center border border-[var(--lightBlue)] rounded-md px-4 py-2 w-[50px] flex flex-col items-center">
                            <p className="text-xl text-[var(--lightBlue)]">
                              {day}
                            </p>
                            <p className="text-md text-[var(--lightBlue)]">
                              {month}
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <ul className="text-[var(--greyP)] py-2 text-sm">
                            <li className="text-[var(--black)] font-[500]">
                              {item?.name}
                            </li>
                            <li className="text-[var(--black)] pt-1">
                              {item?.type === "doctorVideoConsultation" ||
                              item?.type === "doctorVoiceConsultation"
                                ? "Dr. " + item?.doctorName
                                : ""}
                            </li>
                            <li className="capitalize text-[var(--black)] pt-1">
                              {item?.day}, {item?.time}
                            </li>
                            <li className="capitalize text-[var(--black)] pt-1">
                              Payment status:{" "}
                              <span
                                className={`text-sm ${
                                  item?.paymentStatus === "Paid"
                                    ? "text-[var(--applegreen)]"
                                    : "text-[var(--red)]"
                                } font-medium`}
                              >
                                {item?.paymentStatus}
                              </span>
                            </li>
                            <li className="capitalize text-[var(--black)] pt-1">
                              Appointment status:{" "}
                              <button
                                className={`text-sm rounded-md font-medium ${
                                  item?.status === "Completed"
                                    ? "text-[var(--applegreen)]"
                                    : item?.status === "Pending"
                                    ? "text-[var(--pictonblue)]"
                                    : item?.status === "#f7c6c6"
                                    ? "text-[var(--red)]"
                                    : item?.status === "Confirmed"
                                    ? "text-[var(--applegreen)]"
                                    : item?.status === "Scheduled"
                                    ? "text-[var(--applegreen)]"
                                    : item?.status === "Cancelled"
                                    ? "text-[var(--red)]"
                                    : ""
                                }`}
                              >
                                {item.status}
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="py-2">
                          <button
                            className={`text-center px-2 py-1 text-xs text-[var(--White)] border rounded-full ${
                              item?.mode === "online"
                                ? "bg-green-500"
                                : "bg-red-600"
                            }`}
                          >
                            {item?.mode === "online" ? "Online" : "Offline"}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-row gap-2 mt-4">
                        {(item?.status === "Completed" ||
                          item?.status === "Confirmed" ||
                          item?.status === "Cancelled") &&
                          item?.invoiceUrl !== null &&
                          item?.invoiceUrl !== undefined &&
                          item?.invoiceUrl !== "" && (
                            <button
                              
                              onClick={() =>
                                handleDownloadInvoice(item?.invoiceUrl)
                              }
                              className="bg-[#F6F7F9] text-[var(--packageList)] rounded-full font-[500] text-xs px-4 py-2 cursor-pointer"
                            >
                              Download Invoice
                            </button>
                          )}

                        {item?.status !== "Pending" && (
                          <button
                            onClick={() => handleJoin(item)}
                            className="bg-[var(--lightBlue)] text-[var(--White)] rounded-full font-[500] text-xs px-2 py-2 border hover:border-[var(--lightBlue)] hover:bg-[var(--White)] hover:text-[var(--lightBlue)] flex items-center gap-2"
                          >
                            Join Now
                            <span className="flex items-center justify-center">
                              {item?.type === "doctorVideoConsultation" ? (
                                <IoVideocamOutline className="text-sm" />
                              ) : item?.type === "doctorVoiceConsultation" ? (
                                <MdOutlineVoicemail className="text-sm" />
                              ) : (
                                ""
                              )}
                            </span>
                          </button>
                        )}

                        {item?.status === "Confirmed" && !item?.isCancelled && (
                          <button
                            onClick={() =>
                              handleCancleAppointment(item?.appointmentId)
                            }
                            className="bg-[var(--red)] text-[var(--White)] rounded-full font-[500] text-xs px-4 py-2 border hover:border-[var(--red)] hover:bg-[var(--White)] hover:text-[var(--red)]"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Pagination Controls */}

              <div className="flex justify-end md:justify-end items-center mt-6 gap-2 mb-4 ">
                {/* Previous Arrow */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={` lg:px-4 lg:py-2 md:w-[13%]  lg:w-[15%] flex justify-end items-center gap-2   rounded-md ${
                    currentPage === 1
                      ? "text-[var(--greyP)] cursor-not-allowed"
                      : "text-[var(--lightBlue)] "
                  }`}
                >
                  <FaArrowLeft />
                  <span className="hidden lg:inline-block"> Previous</span>
                </button>

                {/* Page Numbers */}
                {generatePageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && setCurrentPage(page)
                    }
                    className={`px-4 py-2 rounded-md hover:bg-gray-300 ${
                      currentPage === page
                        ? "bg-[var(--lightBlue)] text-white"
                        : "bg-gray-200 text-[var(--lightBlue)] "
                    } ${page === "..." ? "cursor-default" : ""}`}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Arrow */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`lg:px-4 lg:py-2  md:w-[10%]  lg:w-[13%] flex items-center gap-2 rounded-md  ${
                    currentPage === totalPages
                      ? "text-[var(--greyP)] cursor-not-allowed"
                      : "text-[var(--lightBlue)] "
                  }`}
                >
                  <span className="hidden lg:inline-block">Next</span>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center py-8">
              <Image
                src={illustration?.empty}
                alt="not found"
                width={300}
                height={300}
                className="w-[240px] h-[240px]"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OnlineConsultations;

{
  /* <div className={`md:mt-2 lg:mt-6 px-2 lg:px-4 w-full grid grid-cols-3 gap-3`}>
  {paginatedData?.length > 0 ? (
    paginatedData.map((item, index) => {
      const { day, month } = formatDateWithoutYear(item.date);
      return (
        <div
          key={item?.appointmentId}
          className="flex flex-col md:flex-row justify-between "
        >
          <div className="w-[100%] bg-[var(--White)] p-4 rounded-2xl  border gap-2  flex flex-col md:flex-row justify-between  ">
            <div className="flex flex-col">
              <div className="flex flex-row gap-4 items-start ">
                <div className="py-2">
                  <div className="uppercase text-center border border-[var(--lightBlue)] rounded-md px-4 py-2 w-[50px] flex flex-col items-center ">
                    <p className="text-xl text-[var(--lightBlue)]">{day}</p>
                    <p className="text-md  text-[var(--lightBlue)]">{month}</p>
                  </div>
                </div>
                <div className="">
                  <ul className="text-[var(--greyP)] py-2 text-sm">
                    <li className="text-[var(--black)] font-[500]">
                      {item?.name}
                    </li>
                    <li className="text-[var(--black)] pt-1">
                      {item?.type === "doctorVideoConsultation" ||
                      item?.type === "doctorVoiceConsultation"
                        ? "Dr." + item?.doctorName
                        : ""}
                    </li>

                    <li className="capitalize text-[var(--black)] pt-1">
                      {item?.day}, {item?.time}
                    </li>
                    <li className="capitalize text-[var(--black)] pt-1">
                      Payment status:{" "}
                      <span
                        className={`text-sm ${
                          item?.paymentStatus === "Paid"
                            ? "text-[var(--applegreen)]"
                            : "text-[var(--red)]"
                        } font-medium`}
                      >
                        {item?.paymentStatus}
                      </span>
                    </li>
                    <li className="capitalize text-[var(--black)] pt-1">
                      Appointment status:{" "}
                      <button
                        className={`text-sm rounded-md font-medium ${
                          item?.status === "Completed"
                            ? "text-[var(--applegreen)] "
                            : item?.status === "Pending"
                            ? "text-[var(--pictonblue)] "
                            : item?.status === "#f7c6c6"
                            ? " text-[var(--red)]"
                            : item?.status === "Confirmed"
                            ? " text-[var(--applegreen)]"
                            : item?.status === "Scheduled"
                            ? "text-[var(--applegreen)] "
                            : item?.status === "Cancelled"
                            ? "text-[var(--red)]"
                            : ""
                        }`}
                      >
                        {item.status}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className=" py-2">
                  <button
                    className={`text-center px-2 py-1 text-xs text-[var(--White)] border rounded-full ${
                      item?.mode === "online" ? "bg-green-500" : "bg-red-600"
                    } `}
                  >
                    {item?.mode === "online" ? "Online" : "Offline"}
                  </button>
                </div>
              </div>
              <div className=" flex flex-row gap-2 justify-start items-center">
                {(item?.status === "Completed" ||
                  item?.status === "Confirmed" ||
                  item?.status === "Cancelled") && (
                  <button
                    disabled
                    className="bg-[#F6F7F9] text-[var(--packageList)] rounded-full font-[500] text-xs px-4 py-2  hover:border-[var(--lightBlue)] hover:bg-[var(--White)] hover:text-[var(--lightBlue)]"
                  >
                    Download Invoice
                  </button>
                )}

                {item?.status !== "Pending" && (
                  <button
                    onClick={() => handleViewDetails(item?.appointmentId)}
                    className="bg-[var(--lightBlue)] text-[var(--White)] rounded-full font-[500] text-xs px-2 py-2 border hover:border-[var(--lightBlue)] hover:bg-[var(--White)] hover:text-[var(--lightBlue)] flex items-center gap-2"
                  >
                    Join Now
                    <span className="flex items-center justify-center">
                      {item?.type === "doctorVideoConsultation" ? (
                        <IoVideocamOutline className="text-sm" />
                      ) : item?.type === "doctorVoiceConsultation" ? (
                        <MdOutlineVoicemail className="text-sm" />
                      ) : (
                        ""
                      )}
                    </span>
                  </button>
                )}
                {item?.status === "Confirmed" && item?.isCancelled === false && (
                  <button
                    onClick={() => handleCancleAppointment(item?.appointmentId)}
                    className="bg-[var(--red)] text-[var(--White)] rounded-full font-[500] text-xs px-4 py-2 border hover:border-[var(--red)] hover:bg-[var(--White)] hover:text-[var(--red)]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <>
      <div className="w-full flex justify-center items-center border">
        <Image
          src={illustration?.empty}
          alt="not found"
          width={100}
          height={100}
          className="w-[300px] h-[300px] "
        />
      </div>
    </>
  )}
</div>; */
}
