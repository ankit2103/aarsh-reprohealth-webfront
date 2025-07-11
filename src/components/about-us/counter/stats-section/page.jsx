"use client";
import Counter from "../page";

const stats = [
  { value: 20, label: "Years of experience" },
  { value: 95, label: "Patient satisfaction rating", suffix: "%" },
  { value: 250, label: "Patients served monthly" },
  { value: 10, label: "Healthcare providers on staff" },
  { value: 22, label: "Convenient locations in the area" },
];

const StatsSection = () => {
  return (
    <div className="w-full px-8 md:px-0">
      <div className="main-container">
        <div className="container">
          <div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg px-0 py-2 sm:px-5 lg:px-8 lg:py-10 flex flex-col md:flex-row justify-evenly gap-2 lg:gap-7 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="text-[var(--navyblue)]">
                  <p className="fontsizebase lg:fontsize4xl font-bold">
                    <Counter value={stat.value} />
                    {stat.value === 95 ? stat.suffix : "+"}
                  </p>
                  <p className=" text-sm ">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
