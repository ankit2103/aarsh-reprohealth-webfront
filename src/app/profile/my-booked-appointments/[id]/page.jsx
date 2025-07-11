"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getSpecificBookedAppointmentDetail } from "../../../../utils/user/user.util";
import Image from "next/image";
import { FaClinicMedical } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { PiCalendarPlusBold } from "react-icons/pi";
import doctorImg from "../../../../components/element/logoPathkind.png";
import { useSelector } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { capitalize } from "@mui/material";
import Tabs from "../../../../components/patient-appointment-booking/appointment-summary-tab/Tab/page";
import { get } from "react-hook-form";
import { MdOutlineFileDownload } from "react-icons/md";



const AppointmentSummaryDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state?.user?.v_user_Info);
  const [getData, setGetData] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [type, setType] = useState("");
  const [allType, setAllType] = useState([
    { type: "doctorConsultation", key: "doctor" },
    { type: "labTest", key: "lab" },
    { type: "clinicService", key: "clinic" },
  ]);
  const [specificData, setSpecificData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

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
          setType(result?.data?.appointment?.type);
          setLoading(false);
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

  useEffect(() => {
    if (!getData?.appointment || !type) return;

    const matched = allType.find((item) => item.type === type);

    if (matched?.key) {
      const dataForType = getData?.appointment?.[matched.key];

      // If it's an array, pick the first item. If it's already an object, use as is.
      if (Array.isArray(dataForType)) {
        setSpecificData(dataForType[0] || null);
      } else if (typeof dataForType === "object" && dataForType !== null) {
        setSpecificData(dataForType);
      } else {
        setSpecificData(null);
      }
    }
  }, [getData, type, allType]);

  console.log(
    "Appointment Booked date-----",
    userInfo?.name,
    specificData,
    type
  );

  return (
    <div className="md:mt-2 lg:mt-6 px-2 lg:px-4 w-full">
      <div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3>Patient's Previous Appointment Summary</h3>
            {(getData?.appointment?.status === "Completed" ||
              getData?.appointment?.status === "Confirmed" ||
              getData?.appointment?.status === "Cancelled") && (
              <button
                disabled
                className="bg-[#F6F7F9] text-[var(--packageList)] flex items-center gap-2 rounded-full font-[500] text-xs px-4 py-2 border  hover:border-[var(--packageList)] hover:bg-[var(--White)] hover:text-[var(--packageList)]"
              >
              <MdOutlineFileDownload/>  Download Invoice
              </button>
            )}
          </div>

          {specificData && typeof specificData === "object" && (
            <div className="w-full flex flex-row gap-3 py-4">
              <div className="border w-[100px] h-[100px] rounded-full">
                <Image
                  src={
                    type === "labTest"
                      ? getData?.appointment?.lab?.labPics[0]
                      : type === "doctorConsultation"
                      ? `${specificData?.profilePic}`
                      : type === "clinicService"
                      ? specificData?.clinicPics[0]
                      : doctorImg
                  }
                  alt="not found"
                  width={100}
                  height={100}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div>
                <h3>
                  {`${type === "labTest" ? "" : `Dr.`}`}
                  {specificData?.name}
                </h3>
                <ul>
                  <li>Patient Name: {getData?.appointment?.patientId?.name}</li>
                  <li>
                    Gender/Age: {getData?.appointment?.patientId?.gender},{" "}
                    {type === "labTest" ? "N/A" : ""}
                    {specificData?.details?.medicalHistory?.age}
                  </li>
                  <li>Email: {getData?.appointment?.patientId?.email}</li>
                  <li>
                    Contact No.: {getData?.appointment?.patientId?.contact}
                  </li>
                  <li>
                    {`${
                      type === "labTest" || type === "clinicService"
                        ? ""
                        : `Appointment With Dr.${specificData?.name}`
                    }`}
                    {type === "labTest" || type === "clinicService"
                      ? ""
                      : ` (${specificData?.specialization})`}
                  </li>
                  <li>
                    Date & Time: {formattedDate} –{" "}
                    {getData?.appointment?.startTime}
                  </li>
                  {type === "labTest" && getData?.appointment?.tests?.length > 0
                    ? getData.appointment.tests.map((item, index) => (
                        <li key={index}>Test: {item.name}</li>
                      ))
                    : null}
                  {/* {true && <li>Clinic: SkinGlow Clinic, Indore</li>} */}
                  <li>
                    Payment Status: {getData?.appointment?.paymentStatus} (₹
                    {getData?.appointment?.totalPrice})
                  </li>
                  <li>Appointment Status: {getData?.appointment?.status}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div>
          <Tabs getData={getData} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummaryDetail;

{
  /* {{specificData && Array.isArray(specificData) && specificData.map((item, index) => (
  
    <div key={index} className="w-full flex flex-row gap-3 py-4">
            <div className="border w-[100px] h-[100px] rounded-full ">
              <Image
                src={doctorImg}
                alt="not found"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div>
              <h3>Doctor name</h3>
              <ul>
                <li>
                  Gender/Age:Female, {getData?.details?.medicalHistory?.age}
                </li>
                <li>Email: Michael0809@gmail.com</li>
                <li>Contact Number: 9878998766</li>
                <li>Appointment With: Dr. Riya Sharma (Dermatologist)</li>
                <li>Date & Time: Apr 28, 2025 – 02:00 PM</li>
                {true ? <li>Clinic: SkinGlow Clinic, Indore </li> : null}
                <li>Payment Status: Paid (₹800)</li>
                <li>Appointment Status: Completed</li>
              </ul>
            </div>
          </div>

))}} */
}
