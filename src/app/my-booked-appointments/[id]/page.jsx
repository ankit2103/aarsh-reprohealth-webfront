"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getSpecificBookedAppointmentDetail } from "../../../utils/user/user.util";
import PatientDetail from "../../../components/patient-appointment-booking/patient-details/page";
import Image from "next/image";
import { FaClinicMedical } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { PiCalendarPlusBold } from "react-icons/pi";
import doctorImg from "../../../components/element/logoPathkind.png";
import { useSelector } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { capitalize } from "@mui/material";

const AppointmentDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const userInfo = useSelector((state)=>state?.user?.v_user_Info)
  const [getData, setGetData] = useState([]);
  const [formattedDate, setFormattedDate] = useState(null);

  const handleNavigate = () => {};
  function formatDateWithTime(date, time) {
    if (!date || !time) return "";

    const combinedDateTime = new Date(`${date} ${time}`);
    const options = { year: "numeric", month: "short", day: "numeric" };

    return combinedDateTime.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      // alert("Called API");
      try {
        const result = await getSpecificBookedAppointmentDetail({
          appointmentId: id,
        });
        console.log("getSpecificBookedAppointmentDetail Result:", result);
        if (result?.code === 200) {
          setGetData(result?.data);
          // setFormattedDate(result?.data?.appointment?.date);
        }
      } catch (error) {
        console.log("Error fetching appointment details", error);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    setFormattedDate(
      formatDateWithTime(
        getData?.appointment?.date,
        getData?.appointment?.startTime
      )
    );
  }, [getData]);

  console.log("Appointment Booked date-----", userInfo?.name);

  if (!getData) {
    return <div>Loading appointment details...</div>;
  }

  return (
    <div className="w-full  my-10  flex justify-center items-center">
      <div className="w-full">
        <div className="main-container">
          <div className="container ">
            <div className="pt-20 px-0  md:pt-20">
              <div className="flex justify-center md:justify-evenly items-center flex-col sm:flex-col md:flex-row gap-3">
                <div className="w-full md:w-[50%]">
                  <div className="w-full border bg-[var(--White)] rounded-md shadow-lg py-4 md:pt-6">
                    <div className="flex items-center gap-2 border-b-2 border-[var(--Iron)] px-5 pb-6">
                      <div className="w-8 h-8 rounded-full bg-[var(--lightBlue)] text-center flex items-center justify-center">
                        <FaClinicMedical className="text-[var(--White)]" />
                      </div>
                      <span className="capitalize text-xl ">
                        {getData?.appointment?.doctor &&
                        getData?.appointment?.mode == "offline"
                          ? `${getData?.appointment?.mode} Doctor Consultation Booked`
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
                          At {getData?.appointment?.startTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 border-b-2 border-[var(--Iron)] px-5 py-2  ">
                      <div className="w-30 h-30 lg:w-30 my-3 lg:h-auto flex-shrink-0 md:mx-auto lg:mx-0  ">
                        {doctorImg && (
                          <Image
                            src={doctorImg}
                            alt="Doctor"
                            width={160}
                            height={220}
                            className="rounded-lg md:h-[100px] md:w-[100px] object-cover h-full w-full"
                          />
                        )}
                      </div>
                      <div className="my-3">
                        {" "}
                        <h2 className="capitalize text-[var(--darkGrey)] font-semibold">
                          {getData?.appointment?.type === "doctorConsultation"
                            ? "Doctor Name:"
                            : ""}{" "}
                        </h2>
                        <p className="capitalize  text-[var(--greyP)] font-medium">
                          {getData?.appointment?.type === "doctorConsultation"
                            ? getData?.appointment?.doctor?.specialization?.join(
                                ", "
                              )
                            : ""}
                        </p>
                        <div className="flex gap-2 ">
                          {getData?.type == "doctorConsultation" &&
                          test?.testDetails?.length > 0 ? (
                            <div className="border p-2 rounded-md bg-[var(--lightBlue)] text-white">
                              <p className="capitalize  text-[var(--White)] font-medium">
                                {item?.testName}
                              </p>

                              <span className="flex items-center text-[var(--White)]">
                                <LiaRupeeSignSolid className="font-semibold" />
                                {item?.testPrice.toLocaleString("en-IN")}
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2  px-5 py-2  ">
                      <div className="w-30 h-30 lg:w-30 my-3 lg:h-auto flex-shrink-0 md:mx-auto lg:mx-0  ">
                        {doctorImg && (
                          <Image
                            src={doctorImg}
                            alt="Doctor"
                            width={160}
                            height={220}
                            className="rounded-lg md:h-[100px] md:w-[100px] object-cover h-full w-full"
                          />
                        )}
                      </div>
                      <div className="my-3">
                        {" "}
                        <ul className="text-[var(--greyP)]  text-sm  md:text-sm">
                          <li
                            className={`${
                              getData?.appointment?.type ===
                              "doctorConsultation"
                                ? "uppercase"
                                : "capitalize"
                            } text-[var(--darkGrey)] font-semibold `}
                          >
                            {getData?.appointment?.doctorDetail?.name}
                          </li>

                          <li
                            className={`${
                              getData?.doctorDetail?.degree
                                ? "uppercase"
                                : "capitalize"
                            } text-[var(--darkGrey)] font-semibold `}
                          >
                            {getData?.labDetail?.name ||
                              getData?.doctorDetail?.degree}
                          </li>
                          <li
                            className={`text-[var(--darkGrey)] font-semibold `}
                          >
                            Contact Detail: {getData?.clinicDetail?.contact}
                          </li>
                          <li
                            className={`text-[var(--greyP)] font-normal capitalize`}
                          >
                            266/C, 80 Feet Road, CV Raman Hospital Road,
                            Bangalore
                          </li>
                          <li
                            className={`text-[var(--lightBlue)] cursor-pointer list-none  ${
                              getData?.appointment?.type ===
                              "doctorConsultation"
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
                  </div>
                </div>
                <div className="w-full md:w-[50%] ">
                  <div className="flex flex-col">
    
                    <h1 className={`text-2xl rounded-sm text-center ${getData?.appointment?.status==="Pending"? "text-[var(--pictonblue)] bg-[var(--lightblue)]" :""}`}>
                    Appointment {getData?.appointment?.status}
                  </h1>
                  {/* <p className={`text-2xl rounded-sm text-center`}>Patient Name: {userInfo?.salutation}{userInfo?.name}</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
