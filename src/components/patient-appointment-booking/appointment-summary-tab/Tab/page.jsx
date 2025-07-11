import { useState } from "react";
import PaymentHistory from "../../payment-history/page";
import Reports from "../../reports/page";

const Tabs= ({ doctorInfo, loading, setLoading }) => {
  const [selectedTab, setSelectedTab] = useState("info");

  const tabOptions = [
    {
      id: "info",
      title: "Payment History",
      component: <PaymentHistory doctorInfo={doctorInfo} loading={loading} />,
    },
    {
      id: "stories",
      title: "Reports",
      component: <Reports doctorInfo={doctorInfo} loading={loading} />,
    },
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
        <div className="bg-gray-200 rounded-lg shadow-sm p-1  my-4 w-[50%] max-w-md flex">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 text-center py-2 text-sm font-medium rounded-md transition-all
                ${
                  selectedTab === tab.id
                    ? "bg-white text-black border border-gray-300 shadow"
                    : "bg-transparent text-gray-600"
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      )}

      {/* Content Section with Grayish Background */}
      <div className="bg-gray-100 w-full rounded-lg shadow-md ">
        <div className="bg-white rounded-lg  w-full">
          {tabOptions.find((tab) => tab.id === selectedTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
