import { useState } from "react";
import DoctorInfoTab from "./doctor-info-tab";

import ConsultQATab from "./consult-qa-tab";
import HealthFeedTab from "./health-feedtab";
import SpecialistClinicInfo from "./info-hospital";
import SpecialistClinicStoriesTab from "./specialist-clinic-stories-tab";



const TabsComponentSpecialityClinic = ({clinicInfo, setClinicInfo ,loading, setLoading}) => {
  const [selectedTab, setSelectedTab] = useState("info");
  const tabOptions = [
    { id: "info", title: "Info", component: <SpecialistClinicInfo clinicInfo={clinicInfo} loading={loading}/> },
    { id: "stories", title: "Stories", component: <SpecialistClinicStoriesTab clinicInfo={clinicInfo} setClinicInfo={setClinicInfo}/> },
  ];

  return (
    <div className="w-full flex flex-col items-start">
      {/* Tabs Bar */}
      {loading ? (
        <div className="bg-gray-200 rounded-lg shadow-sm p-1 my-4 w-[80%] max-w-md flex animate-pulse">
          <div className="flex-1 py-3 bg-gray-300 rounded-md mx-1 h-8"></div>
          <div className="flex-1 py-3 bg-gray-300 rounded-md mx-1 h-8"></div>
          
        </div>
      ) : (
        <div className="bg-gray-100 rounded-md shadow-sm   my-4 w-[50%] max-w-md flex">
        {tabOptions.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex-1 text-center px-3 py-2 text-sm font-medium rounded-md transform transition-all duration-400 ease-in-out
              ${
                selectedTab === tab.id
                  ? "bg-[var(--lightBlue)] text-[var(--White)]  "
                  : "bg-gray-100 text-[var(--listText)] "
              }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      )}
   

      {/* Content Section with Grayish Background */}
      <div className="bg-gray-100 w-full  ">
        <div className="bg-white rounded-lg  w-full">
          {tabOptions.find((tab) => tab.id === selectedTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default TabsComponentSpecialityClinic;
