import React from "react";

function InfoLab({ labData, loading }) {
  function stripHtml(htmlString) {
    if (!htmlString) return ""; // fallback for undefined/null
    return htmlString.replace(/<[^>]*>/g, "");
  }
  // console.log("LabData-------------------", labData, labData?.testDetails);
  return (
    <>
      {loading ? (
        <div>
          <div className="flex flex-col lg:flex-row lg:justify-between mt-1 animate-pulse">
            <h2 className="text-xl font-bold text-gray-300 bg-gray-300 w-24 h-6 rounded"></h2>
          </div>

          <div className="my-3 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          <div className="flex-1 text-center lg:text-left mt-3">
            <div className="pb-2 space-y-2">
              <div className="h-5 bg-gray-300 rounded w-48"></div>
              <div className="h-5 bg-gray-300 rounded w-40"></div>
            </div>

            <h2 className="text-xl font-bold text-gray-300 bg-gray-300 w-40 h-6 rounded mt-1"></h2>

            <div className="flex mt-3 flex-col md:flex-row justify-between">
              <div className="flex flex-col space-y-2 mt-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-4 bg-gray-300 rounded w-56"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row lg:justify-between mt-1 ">
            <h3 className="  text-[var(--listText)] capitalize">About</h3>
          </div>

          <p className="my-3">{stripHtml(labData?.description)}</p>
          <div className="flex-1 text-center lg:text-left">
            <div className="pb-2">
              <h3 className="capitalize  text-md text-[var(--listText)]   mt-2">
                Opening:{" "}
                <span className="text-sm font-light">
                  {" "}
                  {labData?.availabilitySchedule?.openingTime} -{" "}
                  {labData?.availabilitySchedule?.closingTime}
                </span>
              </h3>
              <h3 className="text-md text-[var(--listText)] mt-2">
                From:{" "}
                <span className="text-sm font-light">
                  {" "}
                  {labData?.availabilitySchedule?.startDay} -{" "}
                  {labData?.availabilitySchedule?.endDay}
                </span>
              </h3>
            </div>
            

            

              <div className="w-full flex flex-col gap-3">
              <h3 className="text-md text-[var(--listText)] mt-2">
              Available Tests
            </h3>
                <ul className="w-full flex flex-row flex-wrap gap-2  text-gray-700 mt-2">
                  {labData?.testDetails?.length > 0 &&
                    labData?.testDetails.map((test, index) => {
                      return (
                      <button key={test?.testName?._id}  className="border border-[var(--lightBlue)] text-[var(--lightBlue)] bg-[var(--White)] px-4 py-2 rounded-md hover:bg-[var(--lightBlue)] hover:text-[var(--White)]">{test?.testName?.name}</button>

                       
                      );
                    })}
                </ul>
                
              </div>
           
          </div>
        </>
      )}
    </>
  );
}

export default InfoLab;
