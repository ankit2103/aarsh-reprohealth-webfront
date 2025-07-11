"use client"; // if using in a Next.js app directory with client component

const DoctorInfoTab = ({ doctorInfo, setDoctorInfo, loading }) => {
  function stripHtml(htmlString) {
    if (!htmlString) return ""; // fallback for undefined/null
    return htmlString.replace(/<[^>]*>/g, "");
  }
  return (
    <>
      {loading ? (
        <>
          <div className="bg-gray-100 p-6 rounded-lg animate-pulse space-y-4">
            {/* Title */}
            {/* <div className="h-6 w-1/3 bg-gray-300 rounded"></div> */}

            {/* Biography Section */}
            <div className="h-5 w-1/4 bg-gray-300 rounded mt-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>

            {/* Specialities Section */}
            <div className="h-5 w-1/4 bg-gray-300 rounded mt-4"></div>
            <ul className="space-y-2 pl-6 mt-2">
              <li className="h-4 w-1/2 bg-gray-200 rounded"></li>
              <li className="h-4 w-1/3 bg-gray-200 rounded"></li>
              <li className="h-4 w-1/4 bg-gray-200 rounded"></li>
            </ul>

            {/* Education Section */}
            <div className="h-5 w-1/4 bg-gray-300 rounded mt-4"></div>
            <ul className="space-y-2 pl-6 mt-2">
              <li className="h-4 w-1/3 bg-gray-200 rounded"></li>
              <li className="h-4 w-1/2 bg-gray-200 rounded"></li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="bg-[var(--White)]   ">
            {/* Title */}
           

            {/* Biography Section */}
            <h3 className="text-md text-[var(--listText)]   mt-2">Biography</h3>
            <p className="text-gray-700 mt-2 capitalize">
              {stripHtml(doctorInfo?.description)}{" "}
            </p>

            <div className="w-full flex gap-3 ">
              {/* Specialities Section */}
              {/* <div>
                <h3 className="text-md text-[var(--listText)] mt-2">
                  Specialities
                </h3>
                <ul className="list-disc pl-6 text-gray-700 mt-2">
                  {doctorInfo?.specialization?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div> */}

              {/* Education Section */}
              {/* <div>
                <h3 className="text-lg text-[var(--listText)]  mt-2">
                  Education
                </h3>
                <ul className="list-disc pl-6 text-gray-700 mt-2">
                  <li className="uppercase">
                    {doctorInfo?.qualification?.degree}
                  </li>
                  <li className="capitalize">
                    {doctorInfo?.qualification?.collegeName}
                  </li>
                </ul>
              </div> */}
              {/* Clinc service */}
              <div>
                <h3 className="text-md text-[var(--listText)] mt-2">Clinics</h3>
                <div className="flex flex-row flex-wrap gap-2  text-gray-700 mt-2">
                  {doctorInfo?.clinic?.map((item, index) => (
                   
                      <button key={index}  className="border border-[var(--lightBlue)] text-[var(--lightBlue)] bg-[var(--White)] px-4 py-2 rounded-md hover:bg-[var(--lightBlue)] hover:text-[var(--White)]">{item.clinicName}</button>
                  
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DoctorInfoTab;
