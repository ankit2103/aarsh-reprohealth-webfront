"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoShareOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import TabsComponent from "../../components/doctor-details/tab-component";
import TimeSlotSelection from "../../components/doctor-details/time-slot-selection";
import imgg from "../../components/element/logoPathkind.png";
import { doctordetailicons } from "../../components/element/icons";
import { useParams } from "next/navigation";
import { fetchDoctorById } from "../../utils/doctor/doctor.util";
import TimeSlotSelectionM from "../../components/doctor-details/time-slot-selection-morning";
import TimeSlotSelectionE from "../../components/doctor-details/time-slot-selection-evening";
import TabsComponentL from "../../components/doctor-details/tab-component-lab";


const labdetail = () => {
    const {id}=useParams();
    console.log("ID for doctor:", id);

  useEffect(()=>{
    const fetchDetailById = async()=>{
      try{
        const result =  await fetchDoctorById({doctorId:id});
        console.log("Doctor api response:", result);
      }
      catch(error){
        console.log("Error in api response of Doctor Detail:", error);
      }
    }
    fetchDetailById();
  },[]);


  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("clinic");
  const options = [
    { id: "lab", title: "lab Visit", fee: "₹400 Fee" },
    { id: "home", title: "Home Visit", fee: "₹700 Fee" },
  ];
  const [selectedHospital, setSelectedHospital] = useState("jnu");

  const hospitalOptions = [
    { id: "jnu", title: "JNU Hospital", time: "7AM to 1PM" },
    { id: "shri_ram", title: "Shri Ram Hospital", time: "5PM to 10PM" },
  ];
  return (
    <div className="w-full ">
      <div className="main-container border">
        <div className="container mx-auto mt-20 lg:mt-24 ">
          {/* Grid Layout */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left Section (col-span-8) */}
            <div className="col-span-12 lg:col-span-8">
              {/* Heading */}
              <h2 className="text-md font-semibold mb-4">
                Laboratory Information
              </h2>

              {/* Card Section */}
              <div className="bg-gray-100 rounded-xl p-6 flex flex-col lg:flex-row gap-1 shadow-md">
                {/* Left: Doctor Image */}
                <div className="w-32 h-32 lg:w-48 my-3 lg:h-auto flex-shrink-0 mx-auto lg:mx-0">
                  <Image
                    src={imgg}
                    alt="Doctor"
                    width={160}
                    height={220}
                    className="rounded-lg md:h-[150px]  md:w-[150px] object-cover h-full w-full"
                  />
                </div>

                {/* Right: Doctor Details */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Top Row: Share Button (Right Aligned) */}
                  <div className="flex justify-end">
                    <button className="text-gray-500 hover:text-[var(--cyanblue)] text-lg">
                      {doctordetailicons.IoShareSocialOutline}
                    </button>
                  </div>

                  {/* Doctor Name & MCI Number */}
                  <div className="flex flex-col lg:flex-row lg:justify-between mt-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      Pathkind Pathology Lab
                    </h2>
                    <p className="text-gray-600 text-sm">
                      MCI Number: <span className="font-medium">KUG865754</span>
                    </p>
                  </div>

                  {/* Specialization & Experience */}
                  <p className="text-gray-700 text-sm mt-3 flex items-center justify-center lg:justify-start ">
                    4B, Silver Complex, Vijay Nager, Indore &nbsp;
                    <span className="text-gray-400">|</span> &nbsp; 
                  </p>

                  {/* College & Degree */}
                  <p className="text-gray-600 text-sm mt-1">
                  Our laboratory is certified under ISO 9001:2015, ensuring that we maintain a high standard of quality management systems for testing and research activities.
                  </p>

                  {/* Assured & Rating */}
                  <div className="flex flex-row items-center justify-center lg:justify-start gap-3 mt-3">
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      <FaCheckCircle />
                      VERIFIED
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                      <FiThumbsUp />
                      95% (530 Patients)
                    </div>
                  </div>

                  {/* Expandable Bio */}
                  {/* <p className="text-gray-700 text-sm mt-4">
                    {isExpanded
                      ? "​Pathkind Labs is a prominent diagnostic service provider in India, offering a comprehensive range of pathology and radiology tests. Established in 2016, the company operates over 70 diagnostic laboratories and more than 2,000 collection centers nationwide."
                      : "​Pathkind Labs is a prominent diagnostic service provider in India, offering a comprehensive range of pathology and radiology tests. Established in..."}
                  </p>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[var(--cyanblue)] font-semibold mt-2 cursor-pointer text-sm"
                  >
                    {isExpanded ? "View Less" : "View Full..."}
                  </button> */}
                </div>
              </div>

              <TabsComponentL/>
            </div>

            {/* Right Section (col-span-4) - Appointment Selection */}
            <div className="col-span-12 lg:col-span-4">
              {/* First Bar - Choose Appointment Type */}
              <h2 className="text-base font-semibold mb-3">
                Choose Appointment Type
              </h2>
              <div className="flex bg-gray-100 rounded-lg shadow-md w-full p-3">
                {options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 w-full border-r last:border-r-0 cursor-pointer p-2"
                  >
                    <input
                      type="radio"
                      name="appointment"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={() => setSelectedOption(option.id)}
                      className="h-4 w-4 text-[var(--cyanblue)] focus:ring-[var(--cyanblue)]"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-[var(--black)] text-sm  font-medium">
                        {option.title}
                      </h3>
                      <p className="text-[var(--cyanblue)] text-sm font-medium">
                        {option.fee}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Second Bar - Hospital Selection */}
              { selectedOption === "lab" ? <div>
              <h2 className="text-base font-semibold mt-4 mb-3">
                Choose Lab Branch
              </h2>
              <div className="flex bg-gray-100 rounded-lg shadow-md w-full p-3">
                {hospitalOptions.map((hospital) => (
                  <label
                    key={hospital.id}
                    className="flex items-center gap-2 w-full border-r last:border-r-0 cursor-pointer p-2"
                  >
                    <input
                      type="radio"
                      name="hospital"
                      value={hospital.id}
                      checked={selectedHospital === hospital.id}
                      onChange={() => setSelectedHospital(hospital.id)}
                      className="h-4 w-4 text-[var(--cyanblue)] focus:ring-[var(--cyanblue)]"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-black text-sm font-medium">
                        {hospital.title}
                      </h3>
                      <p className="text-[var(--cyanblue)] text-sm font-medium">
                        {hospital.time}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <h2 className="text-base font-semibold mb-3 mt-4">
                Choose Time Slot:{" "}
              </h2>
              <div>
                {/* Time Slot */}
                {selectedHospital === "jnu" ? <TimeSlotSelectionM /> : <TimeSlotSelectionE/>}
              </div>
              <div className="rounded-lg shadow-md w-full min-h-[240px] max-h-[240px] p-6">
                
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d545.2329291177393!2d77.63264342561739!3d13.100544243551038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19fe0021fae3%3A0xa32a514b79c59444!2sCasagrand%20Lorenza!5e0!3m2!1sen!2sin&zoom=15&disableDefaultUI=true&mapTypeControl=false&marker=false"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg "
                  ></iframe>
                
              </div>
              </div> : ""}



              <button
                              className="w-full my-4 bg-[var(--lightBlue)] text-white text-xs px-2 py-2 sm:px-3 w-max sm:py-3  md:text-sm md:px-4 md:py-3 lg:px-4 lg:py-3 rounded-md "
                              
                            >
                              Book Appointment
                            </button>
            </div>

            <div className="col-span-12 md:col-span-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default labdetail;
