"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaClinicMedical } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { PiCalendarPlusBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import SpecificTestDetail from "../specific-test-detail/page";
import { useAuthenticated } from "../../../hooks/useAuthenticated.hook";

const PatientDetail = ({ getData, loading }) => {
  const userOrderInfo = useSelector(
    (state) => state?.user?.x_user_order_detail
  );
  const isAuthenticated = useAuthenticated();
  const userDetail = useSelector((state) => state?.user?.v_user_info);
  // console.log(
  //   "userOrderInfo----------------",
  //   userOrderInfo,
  //   isAuthenticated,
  //   userDetail
  // );
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState(null);
  const [test, setTest] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [clinic, setClinic] = useState([]);
  const imageSrc =
    getData?.labDetail?.labImages?.[0] ||
    getData?.doctorDetail?.profilePic ||
    getData?.clinicDetail?.clinicPics?.[0];

  const handleGetDirections = () => {
    setShowMap(!showMap);
  };
  const handleNavigate = () => {
    if (userOrderInfo?.labId != null)
      router.push(`/diagnoistic-center-laboratories/${userOrderInfo?.labId}`);
    else if (userOrderInfo?.doctorId != null) {
      router.push(`/medical-specialist/${userOrderInfo?.doctorId}`);
    } else if (userOrderInfo?.clinicId != null) {
      router.push(`/speciality-clinics/${userOrderInfo?.clinicId}`);
    }
  };

  function formatDateWithTime(date, time) {
    if (!date || !time) return "";

    const combinedDateTime = new Date(`${date} ${time}`);
    const options = { year: "numeric", month: "short", day: "numeric" };

    return combinedDateTime.toLocaleDateString("en-US", options);
  }

  // console.log(formattedDate); // Output: Apr 23, 2025 //formatDateWithTime(getData?.appointment?.date, getData?.appointment?.startTime)
  useEffect(() => {
    setFormattedDate(formatDateWithTime(getData?.date, getData?.startTime));
    setTest(getData?.tests);
    setClinic(getData?.clinicDetail);
  }, [getData]);
  // console.log("clinic---------------", clinic);
  if (loading) {
    return (
      <div className="w-full border bg-[var(--White)] rounded-md shadow-md py-4 md:pt-6 px-5 animate-pulse">
        {/* Skeleton Header */}
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
        {/* Skeleton Rows */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
        <div className="h-20 bg-gray-200 rounded w-full mb-4" />
        {/* Skeleton Image and Text block */}
        <div className="flex gap-4">
          <div className="h-[100px] w-[100px] bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full  bg-[var(--White)] rounded-md shadow-md py-4 md:pt-6">
      <div className="flex items-center gap-2 border-b-2 border-[var(--Iron)] px-6 pb-6">
        <div className="w-8 h-8 rounded-full bg-[var(--lightBlue)] text-center flex items-center justify-center px-2">
          <FaClinicMedical className="text-[var(--White)]" />
        </div>

        <span className="capitalize text-xl ">
          {getData?.labDetail
            ? `Lab Visit ${getData?.labDetail?.name}`
            : getData?.type === "SpecialistClinic" && getData?.clinicDetail
            ? `${getData?.clinicDetail.name} Clinic `
            : getData?.type === "Doctor" && getData?.clinicDetail
            ? getData?.clinicDetail[0].clinicName
            : getData?.type === "Doctor" &&
              getData?.mode === "online" &&
              getData?.onlineType === "doctorVideoConsultation"
            ? `Appointment With ${getData?.doctorDetail?.name} (Video Consultation)`
            : getData?.onlineType === "doctorVoiceConsultation"
            ? `Appointment With ${getData?.doctorDetail?.name} (Audio Consultation)`
            : ""}
        </span>
      </div>
      <div className="flex  justify-between px-5 pt-4 ">
        <div className="flex items-center gap-2 ">
          <PiCalendarPlusBold className="text-[var(--white)]" />

          <span className="capitalize  text-sm  md:text-sm">
            On {formattedDate}
          </span>
        </div>
        <div className="flex items-center gap-2 ">
          <GoClock className="text-[var(--white)]" />

          <span className="capitalize  text-sm  md:text-sm">
            At {getData?.startTime}
          </span>
        </div>
      </div>

      <p
        onClick={handleNavigate}
        className=" text-sm  md:text-sm border-b-2 border-[var(--Iron)] text-[var(--lightBlue)] px-5 pt-1 pb-4 cursor-pointer"
      >
        Changes Date & Time
      </p>

      {(getData?.onlineType === "onlineVoiceConsultation" ||
        getData?.onlineType === "onlineVideoConsultation") && (
        <div className="flex gap-2 border-b-2 border-[var(--Iron)] px-5 py-2  ">
          <div className="my-3">
            {" "}
            <h2 className="capitalize text-[var(--darkGrey)] font-medium">
              {getData?.type == "Lab" || userOrderInfo?.labId != null
                ? "Test Details :"
                : getData?.type == "Doctor" || userOrderInfo?.doctorId != null
                ? ""
                : userOrderInfo?.clinicId != null
                ? "Service Detail:"
                : ""}{" "}
            </h2>
            <div className="flex gap-2 ">
              {getData?.type === "Lab" && test?.testDetails?.length > 0
                ? test.testDetails.map((item) => {
                    return (
                      <div className="border p-2 rounded-md bg-[var(--lightBlue)] text-white">
                        <p className="capitalize  text-[var(--White)] font-medium">
                          {item?.testName}
                        </p>

                        <span className="flex items-center text-[var(--White)]">
                          <LiaRupeeSignSolid className="font-semibold" />
                          {item?.testPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    );
                  })
                : getData?.type === "Doctor" && clinic?.length > 0
                ? clinic.map((item) => {
                    return (
                      <div className=" rounded-md  text-[var(--black)] ">
                        <p className="capitalize  text-[var(--darkGrey)] font-semibold">
                          {item?.clinicName}
                        </p>
                        <p className="capitalize  text-[var(--greyP)] font-medium">
                          {item.locality}, {item.city}, {item.state},{" "}
                          {item.pincode}
                        </p>
                        <p
                          className={`text-[var(--lightBlue)] cursor-pointer list-none ${
                            getData?.type === "Doctor" ? "block" : "hidden"
                          }`}
                          onClick={() => {
                            const fullAddress = `${item?.clinicName}, ${item?.locality}, ${item?.city}, ${item?.state}, ${item?.pincode}`;
                            const encodedAddress = encodeURIComponent(
                              fullAddress
                            );
                            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                            window.open(mapsUrl, "_blank");
                          }}
                        >
                          Get Directions
                        </p>
                      </div>
                    );
                  })
                : getData?.type === "SpecialistClinic"
                ? getData?.services && (
                    <div className=" rounded-md  text-[var(--black)] ">
                      <p className="capitalize  text-[var(--darkGrey)] font-semibold">
                        {getData?.services?.serviceName?.name}
                      </p>
                      <p className="capitalize  text-[var(--greyP)] font-medium">
                        Price: {getData?.services?.servicePrice}
                      </p>

                      <p
                        className={`text-[var(--lightBlue)] cursor-pointer list-none  ${
                          getData?.type === "Doctor" ? "block" : "hidden"
                        }`}
                        onClick={() =>
                          window.open(
                            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d545.2329291177393!2d77.63264342561739!3d13.100544243551038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19fe0021fae3%3A0xa32a514b79c59444!2sCasagrand%20Lorenza!5e0!3m2!1sen!2sin&zoom=15&disableDefaultUI=true&mapTypeControl=false&marker=false",
                            "_blank"
                          )
                        }
                      >
                        Get Directions
                      </p>
                    </div>
                  )
                : ""}
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-3 items-center px-5 py-2">
        <div className="w-30 h-30 lg:w-30 my-3 lg:h-auto flex-shrink-0 md:mx-auto lg:mx-0  ">
          {(getData?.labDetail?.labImages?.[0] ||
            getData?.doctorDetail?.profilePic ||
            getData?.clinicDetail?.clinicPics?.[0]) && (
            <Image
              src={
                getData?.labDetail?.labImages?.[0] ||
                getData?.doctorDetail?.profilePic ||
                getData?.clinicDetail?.clinicPics?.[0]
              }
              alt="Doctor"
              width={160}
              height={220}
              className="rounded-full md:h-[100px] md:w-[100px] object-contain "
            />
          )}
          {/* {imageSrc && (
            <Image
              src={imageSrc}
              alt="Doctor"
              width={160}
              height={220}
              className="rounded-lg md:h-[100px] md:w-[100px] object-cover h-full w-full"
            />
          )} */}
        </div>
        <div className="my-3">
          {" "}
          <ul className="text-[var(--greyP)]  text-sm  md:text-sm">
            <li
              className={`${
                getData?.doctorDetail?.name || getData?.clinicDetail?.name
                  ? "uppercase"
                  : "capitalize"
              } text-[var(--darkGrey)] font-semibold `}
            >
              {getData?.doctorDetail?.name || getData?.clinicDetail?.name}
            </li>

            <li
              className={`${
                getData?.doctorDetail?.degree ? "uppercase" : "capitalize"
              } text-[var(--darkGrey)] font-semibold `}
            >
              {getData?.labDetail?.name || getData?.doctorDetail?.degree}
            </li>
            {/* <li>Contact Detail: {getData?.clinicDetail?.contact}</li> */}
            {getData?.type === "Lab" ? (
              <li>
                {getData?.labDetail?.address?.city},{" "}
                {getData?.labDetail?.address?.locality},{" "}
                {getData?.labDetail?.address?.state},{" "}
                {getData?.labDetail?.address?.pincode}
              </li>
            ) : getData?.type === "Doctor" ? (
              <li>{getData?.doctorDetail.specialization?.join(", ")}, </li>
            ) : getData?.type === "SpecialistClinic" ? (
              <li>
                {getData?.clinicDetail?.address?.city},{" "}
                {getData?.clinicDetail?.address?.locality},{" "}
                {getData?.clinicDetail?.address?.state},{" "}
                {getData?.clinicDetail?.address?.pincode}
              </li>
            ) : null}
            <li
              className={`text-[var(--lightBlue)] cursor-pointer list-none  ${
                getData?.type === "Lab" || getData?.type === "SpecialistClinic"
                  ? "block"
                  : "hidden"
              }`}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d545.2329291177393!2d77.63264342561739!3d13.100544243551038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19fe0021fae3%3A0xa32a514b79c59444!2sCasagrand%20Lorenza!5e0!3m2!1sen!2sin&zoom=15&disableDefaultUI=true&mapTypeControl=false&marker=false",
                  "_blank"
                )
              }
            >
              Get Directions
            </li>
          </ul>
        </div>
      </div>
      {isAuthenticated ? (
        <div className="border-t-2 border-[var(--Iron)]">
          <>
            <SpecificTestDetail getData={getData} loading={loading} />
          </>
          
          {/* <button className={`flex items-center gap-2 border`}> <BsPen  className="text-[var(--lightBlue)]"/> <span className={`text-[var(--lightBlue)]`}>Edit Details</span></button> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PatientDetail;

{
  /* <p
                        className={`text-[var(--lightBlue)] cursor-pointer list-none ${
                          getData?.type === "Doctor" ? "block" : "hidden"
                        }`}
                        onClick={() => {
                          const parts = [
                            item?.clinicName,
                            item?.locality,
                            item?.city,
                            item?.state,
                            item?.pincode,
                          ].filter(Boolean); // remove undefined or empty values

                          if (parts.length > 0) {
                            const fullAddress = parts.join(", ");
                            const encodedAddress = encodeURIComponent(
                              fullAddress
                            );
                            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                            window.open(mapsUrl, "_blank");
                          } else {
                            alert("Clinic address is unavailable.");
                          }
                        }}
                      >
                        Get Directions
                      </p> */
}
{
  /* <p
                        className={`text-[var(--lightBlue)] cursor-pointer list-none  ${
                          getData?.type === "Doctor" ? "block" : "hidden"
                        }`}
                        onClick={() =>
                          window.open(
                            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d545.2329291177393!2d77.63264342561739!3d13.100544243551038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19fe0021fae3%3A0xa32a514b79c59444!2sCasagrand%20Lorenza!5e0!3m2!1sen!2sin&zoom=15&disableDefaultUI=true&mapTypeControl=false&marker=false",
                            "_blank"
                          )
                        }
                      >
                        Get Directions
                      </p> */
}
