import { useEffect, useState } from "react";
import DoctorInfoTab from "./doctor-info-tab";
import LabStoriesTab from "./lab-stories-tab";
import ConsultQATab from "./consult-qa-tab";
import HealthFeedTab from "./health-feedtab";
import InfoH from "./info-hospital";
import InfoLab from "./info-lab";

const TabsComponentLab = ({ labData, setLabData, loading, setLoading }) => {
  const tabOptions = [
    {
      id: "info",
      title: "Info",
      component: <InfoLab labData={labData} loading={loading} />,
    },
    {
      id: "stories",
      title: "Stories",
      component: <LabStoriesTab  labData={labData} setLabData={setLabData}/>,
    },
  ];

  const [selectedTab, setSelectedTab] = useState("info");

  return (
    <div className="w-full flex flex-col items-start mb-5">
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
              className={`flex-1 text-center py-2 text-sm font-medium rounded-md transition-all
              ${
                selectedTab === tab.id
                  ? "bg-[var(--lightBlue)] text-[var(--White)]  shadow"
                  : "bg-transparent text-[var(--listText)]"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      )}

      {/* Content Section with Grayish Background */}

      <div className="bg-gray-100 w-full  ">
        <div className="bg-white rounded-lg p-4 w-full">
          {tabOptions.find((tab) => tab.id === selectedTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default TabsComponentLab;
